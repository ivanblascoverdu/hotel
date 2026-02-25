import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { sendCancellationEmail } from '@/lib/email';

// GET /api/bookings/[id] — Get single booking
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                room: { include: { hotel: true } },
                user: { select: { name: true, email: true } },
            },
        });

        if (!booking) {
            return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
        }

        // Ownership check: user can only view their own bookings (unless admin)
        const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!currentUser) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
        }
        if (currentUser.role !== 'ADMIN' && booking.userId !== currentUser.id) {
            return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        return NextResponse.json({ error: 'Error al obtener la reserva' }, { status: 500 });
    }
}

// PATCH /api/bookings/[id] — Cancel booking
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const body = await request.json();
        const { status } = body;

        if (status !== 'CANCELLED') {
            return NextResponse.json({ error: 'Solo se permite cancelar la reserva' }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: { room: { include: { hotel: true } } },
        });

        if (!booking) {
            return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
        }

        // Check if cancellation is allowed (> 48h before check-in)
        const hoursUntilCheckIn = (booking.checkIn.getTime() - Date.now()) / (1000 * 60 * 60);
        if (hoursUntilCheckIn < 48) {
            return NextResponse.json(
                { error: 'No se puede cancelar con menos de 48 horas de antelación' },
                { status: 400 }
            );
        }

        const updated = await prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });

        // Send cancellation email
        await sendCancellationEmail({
            guestName: booking.guestName || 'Huésped',
            guestEmail: booking.guestEmail || session.user.email!,
            hotelName: booking.room.hotel.name,
            roomName: booking.room.name,
            checkIn: booking.checkIn.toISOString().split('T')[0],
            checkOut: booking.checkOut.toISOString().split('T')[0],
            totalPrice: booking.totalPrice,
            bookingId: booking.id,
            extras: booking.extras,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json({ error: 'Error al cancelar la reserva' }, { status: 500 });
    }
}
