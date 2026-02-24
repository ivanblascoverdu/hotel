import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email';
import Stripe from 'stripe';

export async function POST(request: Request) {
    const body = await request.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('⚠️ Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;

        if (bookingId) {
            // Update booking status to CONFIRMED
            const booking = await prisma.booking.update({
                where: { id: bookingId },
                data: { status: 'CONFIRMED' },
                include: {
                    room: { include: { hotel: true } },
                    user: true,
                },
            });

            console.log(`✅ Booking ${bookingId} confirmed via Stripe`);

            // Send confirmation emails
            const emailData = {
                guestName: booking.guestName || booking.user.name || 'Huésped',
                guestEmail: booking.guestEmail || booking.user.email,
                hotelName: booking.room.hotel.name,
                roomName: booking.room.name,
                checkIn: booking.checkIn.toISOString().split('T')[0],
                checkOut: booking.checkOut.toISOString().split('T')[0],
                totalPrice: booking.totalPrice,
                bookingId: booking.id,
                extras: booking.extras,
            };

            await Promise.all([
                sendBookingConfirmation(emailData),
                sendAdminNotification(emailData),
            ]);
        }
    }

    if (event.type === 'checkout.session.expired') {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;

        if (bookingId) {
            await prisma.booking.update({
                where: { id: bookingId },
                data: { status: 'CANCELLED' },
            });
            console.log(`❌ Booking ${bookingId} cancelled — payment expired`);
        }
    }

    return NextResponse.json({ received: true });
}
