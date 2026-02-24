'use client';

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { faqs } from '@/data/hotels';
import { ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
    const scrollRef = useScrollReveal();
    const [openId, setOpenId] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todas');

    const categories = ['Todas', ...new Set(faqs.map(f => f.category))];
    const filtered = faqs.filter(f => {
        const matchesSearch = search === '' || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'Todas' || f.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div ref={scrollRef}>
            <div className="page-header">
                <div className="page-header-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1920&q=80)' }} />
                <div className="page-header-content">
                    <span className="subtitle" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>Ayuda</span>
                    <h1>Preguntas Frecuentes</h1>
                    <p>Todo lo que necesitas saber para tu estancia perfecta</p>
                </div>
            </div>

            <section className="section">
                <div className="container" style={{ maxWidth: 800 }}>
                    {/* Search */}
                    <div className="reveal" style={{ position: 'relative', marginBottom: 'var(--space-2xl)' }}>
                        <Search size={18} style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        <input
                            className="input"
                            placeholder="Buscar preguntas..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ paddingLeft: 48 }}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="reveal" style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {categories.map(c => (
                            <button key={c} className={`btn btn-sm ${activeCategory === c ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveCategory(c)}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="reveal">
                        {filtered.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                                <p style={{ fontSize: '1.1rem' }}>No se encontraron preguntas que coincidan con tu búsqueda.</p>
                            </div>
                        ) : (
                            filtered.map(faq => (
                                <div key={faq.id} className={`accordion-item ${openId === faq.id ? 'open' : ''}`}>
                                    <button className="accordion-header" onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
                                        <span>{faq.question}</span>
                                        <ChevronDown size={20} className="accordion-icon" />
                                    </button>
                                    <div className="accordion-body">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
