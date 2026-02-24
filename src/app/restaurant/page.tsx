'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const menuItems = [
    {
        category: 'Entrantes', items: [
            { name: 'Tartar de atún rojo con aguacate', desc: 'Sésamo negro, jengibre encurtido y ponzu', price: 28 },
            { name: 'Carpaccio de vieiras', desc: 'Trufa negra, parmesano y aceite de oliva virgen', price: 32 },
            { name: 'Ceviche de lubina', desc: 'Leche de tigre, maíz crujiente y cilantro', price: 26 },
        ]
    },
    {
        category: 'Principales', items: [
            { name: 'Lomo de rodaballo a la brasa', desc: 'Salsa de champagne, espárragos verdes y patata confitada', price: 42 },
            { name: 'Wagyu A5 a la parrilla', desc: 'Puré de tuétano, reducción de Oporto y verduras baby', price: 68 },
            { name: 'Risotto de boletus y trufa', desc: 'Parmigiano Reggiano 36 meses, foie gras torchon', price: 38 },
        ]
    },
    {
        category: 'Postres', items: [
            { name: 'Esfera de chocolate Valrhona', desc: 'Crema de vainilla de Tahití y oro comestible', price: 18 },
            { name: 'Tarta de limón deconstruida', desc: 'Merengue flambeado, sorbete de yuzu', price: 16 },
        ]
    },
];

const spaServices = [
    { name: 'Masaje Signature Lumière', duration: '90 min', price: 180, desc: 'Masaje corporal completo con aceites esenciales premium y técnicas orientales.' },
    { name: 'Ritual Mediterráneo', duration: '120 min', price: 240, desc: 'Exfoliación con sales del Mar Muerto, envolvimiento de algas y masaje relajante.' },
    { name: 'Facial Rejuvenecedor', duration: '60 min', price: 150, desc: 'Tratamiento facial con activos de última generación para una piel radiante.' },
    { name: 'Circuito Termal', duration: '2 horas', price: 60, desc: 'Acceso a piscina climatizada, jacuzzi, sauna, baño turco y zona de relax.' },
];

export default function RestaurantPage() {
    const scrollRef = useScrollReveal();

    return (
        <div ref={scrollRef}>
            <div className="page-header">
                <div className="page-header-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)' }} />
                <div className="page-header-content">
                    <span className="subtitle" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>Gastronomía & Bienestar</span>
                    <h1>Restaurante & Spa</h1>
                    <p>Una sinfonía de sabores y un santuario de bienestar</p>
                </div>
            </div>

            {/* Restaurant */}
            <section className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Gastronomía</span>
                        <h2>Restaurante Étoile ★</h2>
                        <p>Cocina de autor con estrella Michelin, donde los mejores productos del Mediterráneo se transforman en arte culinario</p>
                    </div>

                    <div style={{ maxWidth: 700, margin: '0 auto' }}>
                        {menuItems.map((cat, ci) => (
                            <div key={cat.category} className="reveal" style={{ marginBottom: 'var(--space-2xl)', transitionDelay: `${ci * 100}ms` }}>
                                <h3 style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-lg)', fontSize: '1.3rem' }}>{cat.category}</h3>
                                {cat.items.map(item => (
                                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-lg)', borderBottom: '1px solid var(--color-border-light)' }}>
                                        <div>
                                            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{item.desc}</p>
                                        </div>
                                        <span style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '1.1rem', whiteSpace: 'nowrap', marginLeft: '2rem' }}>€{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="reveal" style={{ textAlign: 'center' }}>
                        <Link href="/booking" className="btn btn-primary">Reservar Mesa</Link>
                    </div>
                </div>
            </section>

            {/* Spa */}
            <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Bienestar</span>
                        <h2>Spa & Wellness</h2>
                        <p>Un espacio dedicado a la armonía del cuerpo y la mente, con tratamientos que combinan técnicas ancestrales y tecnología de vanguardia</p>
                    </div>

                    <div className="grid-2">
                        {spaServices.map((svc, i) => (
                            <div key={svc.name} className="card reveal" style={{ padding: 'var(--space-xl)', transitionDelay: `${i * 100}ms` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{svc.name}</h3>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>⏱ {svc.duration}</span>
                                    </div>
                                    <span style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '1.2rem' }}>€{svc.price}</span>
                                </div>
                                <p style={{ fontSize: '0.9rem' }}>{svc.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
