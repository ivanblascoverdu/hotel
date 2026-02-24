export interface Hotel {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  location: string;
  country: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  stars: number;
  image: string;
  gallery: string[];
  amenities: string[];
  highlights: string[];
  priceFrom: number;
  rooms: Room[];
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  slug: string;
  type: 'standard' | 'superior' | 'deluxe' | 'suite' | 'presidential';
  description: string;
  capacity: number;
  size: number;
  bedType: string;
  basePrice: number;
  image: string;
  amenities: string[];
  features: string[];
}

export interface Experience {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  price: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  readTime: number;
}

export interface Review {
  id: string;
  hotelId: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  country: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const hotels: Hotel[] = [
  {
    id: 'h1',
    name: 'Lumière Palace',
    slug: 'lumiere-palace-barcelona',
    tagline: 'Donde el Mediterráneo se encuentra con el lujo',
    description: 'Situado en el corazón de Barcelona, Lumière Palace ofrece una experiencia de hospedaje sin igual. Con vistas panorámicas al mar Mediterráneo y a la emblemática arquitectura de Gaudí, nuestro hotel combina la elegancia clásica con el diseño contemporáneo más sofisticado. Cada detalle ha sido cuidadosamente pensado para crear momentos inolvidables.',
    location: 'Barcelona, España',
    country: 'España',
    coordinates: { lat: 41.3851, lng: 2.1734 },
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
    rooms: [
      {
        id: 'r1',
        hotelId: 'h1',
        name: 'Habitación Deluxe',
        slug: 'deluxe',
        type: 'deluxe',
        description: 'Espaciosa habitación con vistas parciales al mar, decorada con materiales nobles y una paleta de colores cálidos.',
        capacity: 2,
        size: 45,
        bedType: 'King Size',
        basePrice: 320,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        amenities: ['Minibar', 'Caja fuerte', 'TV 55"', 'Cafetera Nespresso', 'Albornoz', 'Amenities premium'],
        features: ['Vista parcial al mar', 'Balcón privado', 'Bañera de hidromasaje'],
      },
      {
        id: 'r2',
        hotelId: 'h1',
        name: 'Suite Premium',
        slug: 'suite-premium',
        type: 'suite',
        description: 'Una suite excepcional con salón independiente, vestidor y terraza privada con vistas panorámicas al Mediterráneo.',
        capacity: 3,
        size: 85,
        bedType: 'King Size + Sofá Cama',
        basePrice: 580,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=800&q=80',
        amenities: ['Minibar Premium', 'Caja fuerte', 'TV 65"', 'Cafetera Nespresso', 'Albornoz', 'Amenities Hermès', 'Sala de estar'],
        features: ['Vista panorámica al mar', 'Terraza 30m²', 'Jacuzzi exterior', 'Servicio de mayordomo'],
      },
      {
        id: 'r3',
        hotelId: 'h1',
        name: 'Suite Presidencial',
        slug: 'suite-presidencial',
        type: 'presidential',
        description: 'La joya de Lumière Palace. 200m² de puro lujo con sala de estar, comedor privado, cocina y terraza con piscina privada.',
        capacity: 4,
        size: 200,
        bedType: 'King Size + Twin',
        basePrice: 1200,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        amenities: ['Minibar Premium', 'Caja fuerte XL', 'TV 75"', 'Sistema Sonos', 'Cocina completa', 'Amenities exclusivos', 'Comedor privado'],
        features: ['Vista 360°', 'Piscina privada', 'Mayordomo 24h', 'Check-in privado', 'Transfers incluidos'],
      },
    ],
  },
  {
    id: 'h2',
    name: 'Grand Hotel Aurora',
    slug: 'grand-hotel-aurora-madrid',
    tagline: 'El arte de la hospitalidad en la capital',
    description: 'En pleno centro de Madrid, Grand Hotel Aurora redefine el concepto de lujo urbano. Un edificio histórico del siglo XIX restaurado con exquisito gusto, que combina la grandeza arquitectónica con las comodidades más modernas. A pasos de El Prado y el Retiro.',
    location: 'Madrid, España',
    country: 'España',
    coordinates: { lat: 40.4168, lng: -3.7038 },
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
    rooms: [
      {
        id: 'r4',
        hotelId: 'h2',
        name: 'Habitación Superior',
        slug: 'superior',
        type: 'superior',
        description: 'Habitación elegante con techos altos y molduras originales, combinando herencia histórica con confort moderno.',
        capacity: 2,
        size: 35,
        bedType: 'Queen Size',
        basePrice: 280,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        amenities: ['Minibar', 'Caja fuerte', 'TV 50"', 'Cafetera', 'Albornoz'],
        features: ['Techos altos', 'Decoración de época', 'Vista a la ciudad'],
      },
      {
        id: 'r5',
        hotelId: 'h2',
        name: 'Junior Suite',
        slug: 'junior-suite',
        type: 'suite',
        description: 'Amplia junior suite con zona de estar separada y vistas al jardín interior del hotel.',
        capacity: 2,
        size: 55,
        bedType: 'King Size',
        basePrice: 450,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=800&q=80',
        amenities: ['Minibar Premium', 'Caja fuerte', 'TV 60"', 'Cafetera Nespresso', 'Albornoz', 'Amenities L\'Occitane'],
        features: ['Zona de estar', 'Vista al jardín', 'Baño de mármol'],
      },
    ],
  },
  {
    id: 'h3',
    name: 'Villa Serena Marbella',
    slug: 'villa-serena-marbella',
    tagline: 'Tu refugio de lujo en la Costa del Sol',
    description: 'Villa Serena es un resort boutique exclusivo ubicado en primera línea de playa en Marbella. Con solo 40 suites, cada una diseñada individualmente, ofrece una intimidad y atención al detalle que los grandes hoteles no pueden igualar. Gastronomía, bienestar y naturaleza en perfecta armonía.',
    location: 'Marbella, España',
    country: 'España',
    coordinates: { lat: 36.5099, lng: -4.8862 },
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
    rooms: [
      {
        id: 'r6',
        hotelId: 'h3',
        name: 'Suite Garden',
        slug: 'suite-garden',
        type: 'suite',
        description: 'Suite con acceso directo al jardín tropical y piscina privada. Un oasis de tranquilidad y refinamiento.',
        capacity: 2,
        size: 65,
        bedType: 'King Size',
        basePrice: 420,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
        amenities: ['Minibar Premium', 'Caja fuerte', 'TV 60"', 'Cafetera Nespresso', 'Terraza privada'],
        features: ['Jardín privado', 'Piscina privada', 'Ducha exterior'],
      },
      {
        id: 'r7',
        hotelId: 'h3',
        name: 'Villa Oceanfront',
        slug: 'villa-oceanfront',
        type: 'presidential',
        description: 'Villa independiente de 180m² frente al mar con todas las comodidades de un hogar de lujo y los servicios de un cinco estrellas.',
        capacity: 4,
        size: 180,
        bedType: 'King Size + Twin',
        basePrice: 950,
        image: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80',
        amenities: ['Cocina completa', 'Sala de estar', 'TV 75"', 'Sistema Sonos', 'Jardín 100m²', 'Piscina infinity privada'],
        features: ['Frente al mar', 'Piscina infinity', 'Chef privado disponible', 'Mayordomo'],
      },
    ],
  },
];

export const experiences: Experience[] = [
  { id: 'e1', title: 'Spa & Bienestar', slug: 'spa-bienestar', category: 'Bienestar', description: 'Sumérgete en un mundo de relajación con nuestros tratamientos exclusivos de spa, circuitos termales y terapias holísticas.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', duration: '2-4 horas', price: 120 },
  { id: 'e2', title: 'Gastronomía de Autor', slug: 'gastronomia', category: 'Gastronomía', description: 'Descubre los sabores del Mediterráneo de la mano de nuestros chefs galardonados con estrellas Michelin.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', duration: '3 horas', price: 180 },
  { id: 'e3', title: 'Tour en Velero', slug: 'tour-velero', category: 'Aventura', description: 'Navega por la costa mediterránea en un velero privado con champagne, catering gourmet y puesta de sol.', image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=800&q=80', duration: '5 horas', price: 350 },
  { id: 'e4', title: 'Cata de Vinos', slug: 'cata-vinos', category: 'Gastronomía', description: 'Visita bodegas selectas y degusta los mejores vinos de la región con un sommelier experto.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80', duration: '4 horas', price: 95 },
  { id: 'e5', title: 'Clase de Yoga al Amanecer', slug: 'yoga', category: 'Bienestar', description: 'Comienza el día con una sesión de yoga frente al mar, guiada por instructores certificados internacionalmente.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', duration: '1.5 horas', price: 45 },
  { id: 'e6', title: 'Tour Cultural Privado', slug: 'tour-cultural', category: 'Cultura', description: 'Explora los monumentos y la historia de la ciudad con un guía historiador privado.', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80', duration: '3 horas', price: 150 },
];

export const blogPosts: BlogPost[] = [
  { id: 'b1', title: 'Los 10 mejores destinos de lujo en España para 2025', slug: 'mejores-destinos-lujo-espana', excerpt: 'Descubre los rincones más exclusivos de la península ibérica donde el lujo y la naturaleza se fusionan en experiencias únicas.', content: 'España se ha consolidado como uno de los destinos de lujo más codiciados de Europa...', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80', author: 'María García', date: '2025-01-15', tags: ['viajes', 'lujo', 'España'], readTime: 8 },
  { id: 'b2', title: 'Guía completa del bienestar holístico en hoteles', slug: 'guia-bienestar-holistico', excerpt: 'Aprende cómo los mejores hoteles del mundo están redefiniendo el concepto de bienestar con programas integrales de salud.', content: 'El bienestar holístico va más allá de un simple masaje...', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', author: 'Dr. Carlos Ruiz', date: '2025-01-10', tags: ['bienestar', 'spa', 'salud'], readTime: 12 },
  { id: 'b3', title: 'Gastronomía Michelin: la revolución culinaria en los hoteles', slug: 'gastronomia-michelin-hoteles', excerpt: 'Cómo los hoteles de lujo están atrayendo a los mejores chefs del mundo para ofrecer experiencias gastronómicas inolvidables.', content: 'La revolución gastronómica en los hoteles ha cambiado para siempre...', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', author: 'Chef Antonio López', date: '2025-01-05', tags: ['gastronomía', 'Michelin', 'hoteles'], readTime: 6 },
  { id: 'b4', title: 'Arquitectura hotelera: cuando el diseño se convierte en experiencia', slug: 'arquitectura-hotelera-diseno', excerpt: 'Un recorrido por los hoteles más impresionantes del mundo donde la arquitectura es protagonista.', content: 'Los grandes hoteles siempre han sido escaparates de la arquitectura de su época...', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', author: 'Arq. Laura Fernández', date: '2024-12-28', tags: ['arquitectura', 'diseño', 'hoteles'], readTime: 10 },
];

export const reviews: Review[] = [
  { id: 'rv1', hotelId: 'h1', author: 'Sophie Laurent', avatar: '👩‍💼', rating: 5, comment: 'Una experiencia absolutamente extraordinaria. El servicio es impecable y las vistas desde la suite son de ensueño. Volveremos sin duda.', date: '2025-01-12', country: 'Francia' },
  { id: 'rv2', hotelId: 'h1', author: 'James Mitchell', avatar: '👨‍💻', rating: 5, comment: 'The best hotel I\'ve ever stayed in. The attention to detail is remarkable and the spa is world-class.', date: '2025-01-08', country: 'Reino Unido' },
  { id: 'rv3', hotelId: 'h2', author: 'Ana Martínez', avatar: '👩‍🎨', rating: 5, comment: 'El Grand Hotel Aurora es una joya. La restauración del edificio es magnífica y la gastronomía excepcional.', date: '2025-01-05', country: 'España' },
  { id: 'rv4', hotelId: 'h3', author: 'Marco Rossi', avatar: '👨‍🍳', rating: 5, comment: 'Villa Serena è il paradiso sulla terra. La villa oceanfront è spettacolare, con una piscina infinity che sembra fondersi con il mare.', date: '2024-12-20', country: 'Italia' },
  { id: 'rv5', hotelId: 'h2', author: 'Elena Petrova', avatar: '👩‍⚕️', rating: 4, comment: 'Прекрасный отель с великолепным расположением. Обслуживание на высшем уровне.', date: '2024-12-15', country: 'Rusia' },
  { id: 'rv6', hotelId: 'h3', author: 'Thomas Weber', avatar: '👨‍✈️', rating: 5, comment: 'Ein außergewöhnliches Resort. Die private Villa ist ein Traum und der Service ist erstklassig.', date: '2024-12-10', country: 'Alemania' },
];

export const faqs: FAQ[] = [
  { id: 'f1', question: '¿Cuáles son los horarios de check-in y check-out?', answer: 'El check-in está disponible a partir de las 15:00 y el check-out hasta las 12:00. Ofrecemos early check-in y late check-out sujeto a disponibilidad, sin cargo adicional para huéspedes de suites.', category: 'General' },
  { id: 'f2', question: '¿Puedo cancelar mi reserva?', answer: 'Las cancelaciones realizadas con más de 48 horas de antelación son totalmente gratuitas. Para cancelaciones con menos de 48 horas, se aplicará el cargo de una noche. Las tarifas no reembolsables se indican claramente durante el proceso de reserva.', category: 'Reservas' },
  { id: 'f3', question: '¿Ofrecen servicio de transfer desde el aeropuerto?', answer: 'Sí, ofrecemos servicio de transfer privado en vehículos de lujo desde y hacia los principales aeropuertos. Este servicio tiene un coste adicional excepto para huéspedes de suites presidenciales, donde está incluido.', category: 'Servicios' },
  { id: 'f4', question: '¿Las mascotas están permitidas?', answer: 'Somos un hotel pet-friendly. Aceptamos mascotas de hasta 10 kg con un suplemento de 30€ por noche. Proporcionamos kit de bienvenida para mascotas con cama, comedero y snacks.', category: 'General' },
  { id: 'f5', question: '¿Cómo funciona el programa de fidelidad?', answer: 'Nuestro programa Lumière Rewards ofrece 3 niveles: Silver, Gold y Platinum. Acumula puntos con cada estancia y canjéalos por noches gratis, upgrades y experiencias exclusivas. Registro gratuito en recepción o en nuestra web.', category: 'Programa' },
  { id: 'f6', question: '¿Hay opciones para alérgicos e intolerancias alimentarias?', answer: 'Absolutamente. Todos nuestros restaurantes cuentan con menús adaptados para celíacos, veganos, intolerantes a la lactosa y otras alergias. Infórmenos de sus necesidades al hacer la reserva.', category: 'Gastronomía' },
  { id: 'f7', question: '¿Qué medidas de seguridad sanitaria tienen?', answer: 'Implementamos protocolos avanzados de higiene y desinfección, con certificación internacional. Nuestro personal está completamente vacunado y realizamos controles periódicos de calidad del aire y superficies.', category: 'Seguridad' },
  { id: 'f8', question: '¿Disponen de instalaciones para eventos corporativos?', answer: 'Sí, contamos con salones de eventos de hasta 500 personas, equipados con la última tecnología audiovisual. Ofrecemos servicio integral de organización de eventos, catering personalizado y coordinación logística.', category: 'Eventos' },
];

export function getHotelBySlug(slug: string): Hotel | undefined {
  return hotels.find(h => h.slug === slug);
}

export function getRoomsByHotel(hotelId: string): Room[] {
  const hotel = hotels.find(h => h.id === hotelId);
  return hotel?.rooms || [];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
