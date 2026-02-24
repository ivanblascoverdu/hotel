import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';

// GET /api/bookings — List user's bookings
export async function GET(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        const bookings = await prisma.booking.findMany({
            where: { userId: user.id },
            include: {
                room: {
                    include: { hotel: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Error al obtener reservas' }, { status: 500 });
    }
}

// POST /api/bookings — Create booking + Stripe Checkout
export async function POST(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        const body = await request.json();
        const { roomId, checkIn, checkOut, adults, children, extras, totalPrice } = body;

        if (!roomId || !checkIn || !checkOut || !totalPrice) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // Get room and hotel info for Stripe description
        const room = await prisma.room.findUnique({
            where: { id: roomId },
            include: { hotel: true },
        });

        if (!room) {
            return NextResponse.json({ error: 'Habitación no encontrada' }, { status: 404 });
        }

        // Check for overlapping bookings
        const overlapping = await prisma.booking.findFirst({
            where: {
                roomId,
                status: { in: ['PENDING', 'CONFIRMED'] },
                OR: [
                    { checkIn: { lt: new Date(checkOut) }, checkOut: { gt: new Date(checkIn) } },
                ],
            },
        });

        if (overlapping) {
            return NextResponse.json(
                { error: 'La habitación no está disponible para esas fechas' },
                { status: 409 }
            );
        }

        // Create booking with PENDING status
        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                roomId,
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                adults: adults || 2,
                children: children || 0,
                extras: extras || [],
                totalPrice: totalPrice, // in cents
                status: 'PENDING',
                guestName: user.name || session.user.email,
                guestEmail: session.user.email!,
            },
        });

        // Create Stripe Checkout Session
        const nights = Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
        );

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: session.user.email!,
            metadata: {
                bookingId: booking.id,
            },
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `${room.name} — ${room.hotel.name}`,
                            description: `${nights} noches · ${checkIn} → ${checkOut}`,
                            images: [room.image],
                        },
                        unit_amount: totalPrice,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXTAUTH_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/booking?cancelled=true`,
        });

        // Update booking with Stripe session ID
        await prisma.booking.update({
            where: { id: booking.id },
            data: { stripeSessionId: checkoutSession.id },
        });

        return NextResponse.json({
            bookingId: booking.id,
            checkoutUrl: checkoutSession.url,
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Error al crear la reserva' }, { status: 500 });
    }
}
