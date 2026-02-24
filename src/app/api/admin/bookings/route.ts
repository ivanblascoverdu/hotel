import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

// GET /api/admin/bookings — All bookings (admin only)
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

        const bookings = await prisma.booking.findMany({
            include: {
                user: { select: { name: true, email: true } },
                room: { include: { hotel: { select: { name: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching admin bookings:', error);
        return NextResponse.json({ error: 'Error al obtener reservas' }, { status: 500 });
    }
}

// PATCH /api/admin/bookings — Update booking status (admin only)
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
        }

        const { bookingId, status } = await request.json();

        if (!bookingId || !status) {
            return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
        }

        const updated = await prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'Error al actualizar reserva' }, { status: 500 });
    }
}
