'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { experiences } from '@/data/hotels';
import { ArrowRight } from 'lucide-react';

export default function ExperiencesPage() {
    const scrollRef = useScrollReveal();
    const [filter, setFilter] = useState('Todas');
    const categories = ['Todas', ...new Set(experiences.map(e => e.category))];
    const filtered = filter === 'Todas' ? experiences : experiences.filter(e => e.category === filter);

    return (
        <div ref={scrollRef}>
            <div className="page-header">
                <div className="page-header-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80)' }} />
                <div className="page-header-content">
                    <span className="subtitle" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>Vive</span>
                    <h1>Experiencias Únicas</h1>
                    <p>Momentos que transforman un viaje en un recuerdo para siempre</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="reveal" style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {categories.map(c => (
                            <button key={c} className={`btn btn-sm ${filter === c ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(c)}>
                                {c}
                            </button>
                        ))}
                    </div>

                    <div className="grid-3">
                        {filtered.map((exp, i) => (
                            <div className="card reveal" key={exp.id} style={{ transitionDelay: `${i * 100}ms` }}>
                                <div style={{ overflow: 'hidden' }}>
                                    <img src={exp.image} alt={exp.title} className="card-img" loading="lazy" />
                                </div>
                                <div className="card-body">
                                    <span className="badge badge-outline" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>{exp.category}</span>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{exp.title}</h3>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{exp.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.1rem' }}>€{exp.price}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '0.25rem' }}>/persona</span>
                                        </div>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>⏱ {exp.duration}</span>
                                    </div>
                                    <Link href="/booking" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '1rem' }}>
                                        Reservar Experiencia <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
