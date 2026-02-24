import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const hotels = await prisma.hotel.findMany({
            include: {
                rooms: true,
                seasons: true,
            },
            orderBy: { rating: 'desc' },
        });

        return NextResponse.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json({ error: 'Error al obtener hoteles' }, { status: 500 });
    }
}
