'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Award, Heart, Leaf, Globe } from 'lucide-react';

const timeline = [
    { year: '2005', title: 'Fundación', desc: 'Nace Lumière Hotels con la apertura de nuestro primer hotel boutique en Barcelona.' },
    { year: '2010', title: 'Expansión Nacional', desc: 'Apertura del Grand Hotel Aurora en Madrid, consolidando nuestra presencia en España.' },
    { year: '2015', title: 'Primera Estrella Michelin', desc: 'Nuestro restaurante Étoile recibe su primera estrella Michelin, un hito gastronómico.' },
    { year: '2018', title: 'Villa Serena', desc: 'Inauguración de nuestro resort boutique en Marbella, redefiniendo el lujo costero.' },
    { year: '2023', title: 'Sostenibilidad', desc: 'Implementación de nuestro programa de sostenibilidad integral en todas las propiedades.' },
    { year: '2025', title: 'El Futuro', desc: 'Nuevos destinos internacionales y plataforma digital de experiencias de nueva generación.' },
];

const values = [
    { icon: <Award size={28} />, title: 'Excelencia', desc: 'Cada detalle, desde la elección del hilo de las sábanas hasta la formación de nuestro equipo, persigue la perfección.' },
    { icon: <Heart size={28} />, title: 'Pasión', desc: 'Creemos que la verdadera hospitalidad nace del corazón. Nuestro equipo vive la vocación de servicio.' },
    { icon: <Leaf size={28} />, title: 'Sostenibilidad', desc: 'Comprometidos con un turismo responsable que preserve el patrimonio natural y cultural de cada destino.' },
    { icon: <Globe size={28} />, title: 'Autenticidad', desc: 'Cada hotel refleja la esencia de su entorno, ofreciendo experiencias genuinas y culturalmente enriquecedoras.' },
];

export default function AboutPage() {
    const scrollRef = useScrollReveal();

    return (
        <div ref={scrollRef}>
            <div className="page-header">
                <div className="page-header-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80)' }} />
                <div className="page-header-content">
                    <span className="subtitle" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>Nuestra Historia</span>
                    <h1>Sobre Nosotros</h1>
                    <p>Dos décadas creando experiencias que trascienden lo ordinario</p>
                </div>
            </div>

            {/* Story */}
            <section className="section">
                <div className="container" style={{ maxWidth: 800 }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
                        <h2 style={{ marginBottom: 'var(--space-lg)' }}>La Historia de Lumière</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.9, margin: '0 auto' }}>
                            Lumière Hotels nació de un sueño: crear espacios donde el lujo no fuera ostentación,
                            sino una expresión de cuidado, belleza y autenticidad. Desde nuestro primer hotel
                            en Barcelona, hemos construido una colección que celebra lo mejor de cada destino,
                            combinando la elegancia atemporal con la innovación más vanguardista.
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
                <div className="container" style={{ maxWidth: 700 }}>
                    <div className="section-header reveal">
                        <span className="subtitle">Trayectoria</span>
                        <h2>Nuestra Evolución</h2>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--color-border)', transform: 'translateX(-50%)' }} />
                        {timeline.map((item, i) => (
                            <div key={item.year} className="reveal" style={{
                                display: 'flex',
                                alignItems: i % 2 === 0 ? 'flex-end' : 'flex-start',
                                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                                gap: 'var(--space-xl)',
                                marginBottom: 'var(--space-2xl)',
                                transitionDelay: `${i * 100}ms`,
                            }}>
                                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                                    <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700 }}>{item.year}</span>
                                    <h4 style={{ marginBottom: '0.25rem' }}>{item.title}</h4>
                                    <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
                                </div>
                                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--color-accent)', border: '3px solid var(--color-bg-alt)', flexShrink: 0, zIndex: 1 }} />
                                <div style={{ flex: 1 }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Filosofía</span>
                        <h2>Nuestros Valores</h2>
                    </div>
                    <div className="grid-4">
                        {values.map((v, i) => (
                            <div key={v.title} className="reveal" style={{ textAlign: 'center', padding: 'var(--space-xl)', transitionDelay: `${i * 100}ms` }}>
                                <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-md)', color: 'var(--color-accent)' }}>
                                    {v.icon}
                                </div>
                                <h4 style={{ marginBottom: '0.5rem' }}>{v.title}</h4>
                                <p style={{ fontSize: '0.9rem' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)' }}>
                <div className="container">
                    <div className="grid-4 reveal" style={{ textAlign: 'center' }}>
                        {[
                            { value: '3', label: 'Hoteles' },
                            { value: '85+', label: 'Habitaciones' },
                            { value: '15K+', label: 'Huéspedes / año' },
                            { value: '4.9', label: 'Valoración media' },
                        ].map(s => (
                            <div key={s.label}>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>{s.value}</div>
                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
