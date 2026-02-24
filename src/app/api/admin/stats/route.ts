import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

// GET /api/admin/stats — Dashboard KPIs (admin only)
export async function GET() {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
        }

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Revenue this month
        const monthlyBookings = await prisma.booking.findMany({
            where: {
                status: 'CONFIRMED',
                createdAt: { gte: startOfMonth },
            },
        });
        const monthlyRevenue = monthlyBookings.reduce((sum: number, b: { totalPrice: number }) => sum + b.totalPrice, 0);

        // Active bookings
        const activeBookings = await prisma.booking.count({
            where: { status: { in: ['CONFIRMED', 'PENDING'] } },
        });

        // Total rooms and rooms booked today
        const totalRooms = await prisma.room.count();
        const bookedToday = await prisma.booking.count({
            where: {
                status: 'CONFIRMED',
                checkIn: { lte: now },
                checkOut: { gt: now },
            },
        });
        const occupancy = totalRooms > 0 ? Math.round((bookedToday / totalRooms) * 100) : 0;

        // Total users
        const totalUsers = await prisma.user.count({ where: { role: 'USER' } });

        // Recent bookings
        const recentBookings = await prisma.booking.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                room: { include: { hotel: { select: { name: true } } } },
            },
        });

        // Monthly revenue for chart (last 12 months)
        const monthlyChart = [];
        for (let i = 11; i >= 0; i--) {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
            const revenue = await prisma.booking.aggregate({
                _sum: { totalPrice: true },
                where: {
                    status: 'CONFIRMED',
                    createdAt: { gte: start, lt: end },
                },
            });
            monthlyChart.push({
                month: start.toLocaleString('es-ES', { month: 'short' }),
                revenue: (revenue._sum.totalPrice || 0) / 100,
            });
        }

        return NextResponse.json({
            monthlyRevenue: monthlyRevenue / 100,
            activeBookings,
            occupancy,
            totalUsers,
            recentBookings,
            monthlyChart,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Error al obtener estadísticas' }, { status: 500 });
    }
}
