import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ─── Admin User ────────────────────────────────────────
    const adminPassword = await hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL || 'admin@lumierehotels.com' },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL || 'admin@lumierehotels.com',
            name: 'Admin Lumière',
            passwordHash: adminPassword,
            role: 'ADMIN',
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // ─── Hotels ────────────────────────────────────────────
    const hotel1 = await prisma.hotel.upsert({
        where: { slug: 'lumiere-palace-barcelona' },
        update: {},
        create: {
            name: 'Lumière Palace',
            slug: 'lumiere-palace-barcelona',
            tagline: 'Donde el Mediterráneo se encuentra con el lujo',
            description: 'Situado en el corazón de Barcelona, Lumière Palace ofrece una experiencia de hospedaje sin igual. Con vistas panorámicas al mar Mediterráneo y a la emblemática arquitectura de Gaudí, nuestro hotel combina la elegancia clásica con el diseño contemporáneo más sofisticado.',
            location: 'Barcelona, España',
            country: 'España',
            lat: 41.3851,
            lng: 2.1734,
            rating: 4.9,
            reviewCount: 1247,
            stars: 5,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
                'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
            ],
            amenities: ['Spa', 'Piscina Infinity', 'Restaurante Michelin', 'Gimnasio', 'Concierge 24h', 'WiFi Premium', 'Parking', 'Bar Rooftop'],
            highlights: ['Vista al mar', 'Terraza privada', 'Servicio de mayordomo'],
            priceFrom: 320,
        },
    });

    const hotel2 = await prisma.hotel.upsert({
        where: { slug: 'grand-hotel-aurora-madrid' },
        update: {},
        create: {
            name: 'Grand Hotel Aurora',
            slug: 'grand-hotel-aurora-madrid',
            tagline: 'El arte de la hospitalidad en la capital',
            description: 'En pleno centro de Madrid, Grand Hotel Aurora redefine el concepto de lujo urbano. Un edificio histórico del siglo XIX restaurado con exquisito gusto.',
            location: 'Madrid, España',
            country: 'España',
            lat: 40.4168,
            lng: -3.7038,
            rating: 4.8,
            reviewCount: 983,
            stars: 5,
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
                'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
                'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
                'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
            ],
            amenities: ['Spa', 'Piscina Interior', 'Restaurante Gourmet', 'Gimnasio', 'Concierge 24h', 'WiFi Premium', 'Parking', 'Salones de evento'],
            highlights: ['Edificio histórico', 'Ubicación céntrica', 'Gastronomía de autor'],
            priceFrom: 280,
        },
    });

    const hotel3 = await prisma.hotel.upsert({
        where: { slug: 'villa-serena-marbella' },
        update: {},
        create: {
            name: 'Villa Serena Marbella',
            slug: 'villa-serena-marbella',
            tagline: 'Tu refugio de lujo en la Costa del Sol',
            description: 'Villa Serena es un resort boutique exclusivo ubicado en primera línea de playa en Marbella. Con solo 40 suites, ofrece una intimidad y atención al detalle únicos.',
            location: 'Marbella, España',
            country: 'España',
            lat: 36.5099,
            lng: -4.8862,
            rating: 4.95,
            reviewCount: 567,
            stars: 5,
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
                'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
                'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            ],
            amenities: ['Spa Holístico', 'Piscina Infinity', 'Restaurante en la playa', 'Yoga', 'Concierge 24h', 'WiFi Premium', 'Club de Playa', 'Campo de Golf'],
            highlights: ['Primera línea de playa', 'Solo 40 suites', 'Spa holístico'],
            priceFrom: 420,
        },
    });

    // ─── Rooms ────────────────────────────────────────────
    const roomsData = [
        { hotelId: hotel1.id, name: 'Habitación Deluxe', slug: 'deluxe', type: 'deluxe', description: 'Espaciosa habitación con vistas parciales al mar, decorada con materiales nobles.', capacity: 2, size: 45, bedType: 'King Size', basePrice: 320, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', amenities: ['Minibar', 'Caja fuerte', 'TV 55"', 'Cafetera Nespresso', 'Albornoz'], features: ['Vista parcial al mar', 'Balcón privado', 'Bañera de hidromasaje'] },
        { hotelId: hotel1.id, name: 'Suite Premium', slug: 'suite-premium', type: 'suite', description: 'Suite excepcional con salón independiente y terraza privada con vistas panorámicas.', capacity: 3, size: 85, bedType: 'King Size + Sofá Cama', basePrice: 580, image: 'https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=800&q=80', amenities: ['Minibar Premium', 'TV 65"', 'Cafetera Nespresso', 'Amenities Hermès'], features: ['Vista panorámica al mar', 'Terraza 30m²', 'Jacuzzi exterior'] },
        { hotelId: hotel1.id, name: 'Suite Presidencial', slug: 'suite-presidencial', type: 'presidential', description: '200m² de puro lujo con sala de estar, comedor privado y terraza con piscina privada.', capacity: 4, size: 200, bedType: 'King Size + Twin', basePrice: 1200, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', amenities: ['Minibar Premium', 'TV 75"', 'Sistema Sonos', 'Cocina completa'], features: ['Vista 360°', 'Piscina privada', 'Mayordomo 24h', 'Transfers incluidos'] },
        { hotelId: hotel2.id, name: 'Habitación Superior', slug: 'superior', type: 'superior', description: 'Habitación elegante con techos altos y molduras originales del siglo XIX.', capacity: 2, size: 35, bedType: 'Queen Size', basePrice: 280, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', amenities: ['Minibar', 'Caja fuerte', 'TV 50"', 'Cafetera'], features: ['Techos altos', 'Decoración de época', 'Vista a la ciudad'] },
        { hotelId: hotel2.id, name: 'Junior Suite', slug: 'junior-suite', type: 'suite', description: 'Amplia junior suite con zona de estar separada y vistas al jardín interior.', capacity: 2, size: 55, bedType: 'King Size', basePrice: 450, image: 'https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=800&q=80', amenities: ['Minibar Premium', 'TV 60"', 'Cafetera Nespresso', "Amenities L'Occitane"], features: ['Zona de estar', 'Vista al jardín', 'Baño de mármol'] },
        { hotelId: hotel3.id, name: 'Suite Garden', slug: 'suite-garden', type: 'suite', description: 'Suite con acceso directo al jardín tropical y piscina privada.', capacity: 2, size: 65, bedType: 'King Size', basePrice: 420, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', amenities: ['Minibar Premium', 'TV 60"', 'Cafetera Nespresso', 'Terraza privada'], features: ['Jardín privado', 'Piscina privada', 'Ducha exterior'] },
        { hotelId: hotel3.id, name: 'Villa Oceanfront', slug: 'villa-oceanfront', type: 'presidential', description: 'Villa independiente de 180m² frente al mar con todas las comodidades de lujo.', capacity: 4, size: 180, bedType: 'King Size + Twin', basePrice: 950, image: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80', amenities: ['Cocina completa', 'TV 75"', 'Sistema Sonos', 'Piscina infinity privada'], features: ['Frente al mar', 'Piscina infinity', 'Chef privado disponible'] },
    ];

    for (const room of roomsData) {
        await prisma.room.upsert({
            where: { hotelId_slug: { hotelId: room.hotelId, slug: room.slug } },
            update: {},
            create: room,
        });
    }
    console.log('✅ Hotels & rooms seeded');

    // ─── Seasons ──────────────────────────────────────────
    for (const hotel of [hotel1, hotel2, hotel3]) {
        await prisma.season.createMany({
            data: [
                { hotelId: hotel.id, name: 'Baja', startDate: new Date('2025-11-01'), endDate: new Date('2026-03-31'), multiplier: 0.8 },
                { hotelId: hotel.id, name: 'Media', startDate: new Date('2025-04-01'), endDate: new Date('2025-06-30'), multiplier: 1.0 },
                { hotelId: hotel.id, name: 'Alta', startDate: new Date('2025-07-01'), endDate: new Date('2025-09-30'), multiplier: 1.3 },
                { hotelId: hotel.id, name: 'Especial', startDate: new Date('2025-12-20'), endDate: new Date('2026-01-06'), multiplier: 1.6 },
            ],
            skipDuplicates: true,
        });
    }
    console.log('✅ Seasons seeded');

    // ─── Experiences ──────────────────────────────────────
    const experiencesData = [
        { title: 'Spa & Bienestar', slug: 'spa-bienestar', category: 'Bienestar', description: 'Sumérgete en un mundo de relajación con nuestros tratamientos exclusivos de spa.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', duration: '2-4 horas', price: 120 },
        { title: 'Gastronomía de Autor', slug: 'gastronomia', category: 'Gastronomía', description: 'Descubre los sabores del Mediterráneo de la mano de nuestros chefs Michelin.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', duration: '3 horas', price: 180 },
        { title: 'Tour en Velero', slug: 'tour-velero', category: 'Aventura', description: 'Navega por la costa mediterránea en un velero privado con champagne.', image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=800&q=80', duration: '5 horas', price: 350 },
        { title: 'Cata de Vinos', slug: 'cata-vinos', category: 'Gastronomía', description: 'Visita bodegas selectas y degusta los mejores vinos de la región.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80', duration: '4 horas', price: 95 },
        { title: 'Yoga al Amanecer', slug: 'yoga', category: 'Bienestar', description: 'Comienza el día con una sesión de yoga frente al mar.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', duration: '1.5 horas', price: 45 },
        { title: 'Tour Cultural Privado', slug: 'tour-cultural', category: 'Cultura', description: 'Explora los monumentos y la historia de la ciudad con un guía privado.', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80', duration: '3 horas', price: 150 },
    ];

    for (const exp of experiencesData) {
        await prisma.experience.upsert({
            where: { slug: exp.slug },
            update: {},
            create: exp,
        });
    }
    console.log('✅ Experiences seeded');

    // ─── Blog Posts ───────────────────────────────────────
    const blogData = [
        { title: 'Los 10 mejores destinos de lujo en España para 2025', slug: 'mejores-destinos-lujo-espana', excerpt: 'Descubre los rincones más exclusivos de la península ibérica.', content: 'España se ha consolidado como uno de los destinos de lujo más codiciados de Europa. La industria de la hospitalidad de lujo está experimentando una transformación sin precedentes.', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80', author: 'María García', tags: ['viajes', 'lujo', 'España'], readTime: 8, published: true },
        { title: 'Guía completa del bienestar holístico en hoteles', slug: 'guia-bienestar-holistico', excerpt: 'Aprende cómo los mejores hoteles están redefiniendo el concepto de bienestar.', content: 'El bienestar holístico va más allá de un simple masaje. Los viajeros modernos buscan experiencias transformadoras.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', author: 'Dr. Carlos Ruiz', tags: ['bienestar', 'spa', 'salud'], readTime: 12, published: true },
        { title: 'Gastronomía Michelin: la revolución culinaria en los hoteles', slug: 'gastronomia-michelin-hoteles', excerpt: 'Cómo los hoteles de lujo están atrayendo a los mejores chefs del mundo.', content: 'La revolución gastronómica en los hoteles ha cambiado para siempre el panorama culinario.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', author: 'Chef Antonio López', tags: ['gastronomía', 'Michelin', 'hoteles'], readTime: 6, published: true },
        { title: 'Arquitectura hotelera: cuando el diseño se convierte en experiencia', slug: 'arquitectura-hotelera-diseno', excerpt: 'Un recorrido por los hoteles más impresionantes del mundo.', content: 'Los grandes hoteles siempre han sido escaparates de la arquitectura de su época.', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', author: 'Arq. Laura Fernández', tags: ['arquitectura', 'diseño', 'hoteles'], readTime: 10, published: true },
    ];

    for (const post of blogData) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {},
            create: post,
        });
    }
    console.log('✅ Blog posts seeded');

    // ─── FAQs ─────────────────────────────────────────────
    const faqData = [
        { question: '¿Cuáles son los horarios de check-in y check-out?', answer: 'El check-in está disponible a partir de las 15:00 y el check-out hasta las 12:00. Ofrecemos early check-in y late check-out sujeto a disponibilidad.', category: 'General', order: 1 },
        { question: '¿Puedo cancelar mi reserva?', answer: 'Las cancelaciones realizadas con más de 48 horas de antelación son totalmente gratuitas. Para cancelaciones con menos de 48 horas, se aplicará el cargo de una noche.', category: 'Reservas', order: 2 },
        { question: '¿Ofrecen servicio de transfer desde el aeropuerto?', answer: 'Sí, ofrecemos servicio de transfer privado en vehículos de lujo desde y hacia los principales aeropuertos.', category: 'Servicios', order: 3 },
        { question: '¿Las mascotas están permitidas?', answer: 'Somos un hotel pet-friendly. Aceptamos mascotas de hasta 10 kg con un suplemento de 30€ por noche.', category: 'General', order: 4 },
        { question: '¿Cómo funciona el programa de fidelidad?', answer: 'Nuestro programa Lumière Rewards ofrece 3 niveles: Silver, Gold y Platinum. Acumula puntos con cada estancia.', category: 'Programa', order: 5 },
        { question: '¿Hay opciones para alérgicos e intolerancias alimentarias?', answer: 'Absolutamente. Todos nuestros restaurantes cuentan con menús adaptados para celíacos, veganos e intolerancias.', category: 'Gastronomía', order: 6 },
        { question: '¿Disponen de instalaciones para eventos corporativos?', answer: 'Sí, contamos con salones de eventos de hasta 500 personas con última tecnología audiovisual.', category: 'Eventos', order: 7 },
    ];

    for (const [i, faq] of faqData.entries()) {
        await prisma.fAQ.create({ data: faq });
    }
    console.log('✅ FAQs seeded');

    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
