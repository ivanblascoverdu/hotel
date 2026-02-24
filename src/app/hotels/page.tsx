'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { hotels } from '@/data/hotels';
import { MapPin } from 'lucide-react';

export default function HotelsPage() {
    const scrollRef = useScrollReveal();

    return (
        <div ref={scrollRef}>
            {/* Page Header */}
            <div className="page-header">
                <div
                    className="page-header-bg"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80)' }}
                />
                <div className="page-header-content">
                    <span className="subtitle" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>
                        Nuestra Colección
                    </span>
                    <h1>Nuestros Hoteles</h1>
                    <p>Cada hotel es una puerta a un mundo de experiencias exclusivas</p>
                </div>
            </div>

            {/* Hotels Grid */}
            <section className="section">
                <div className="container">
                    <div className="grid-3">
                        {hotels.map((hotel, i) => (
                            <Link href={`/hotels/${hotel.slug}`} key={hotel.id}>
                                <div className="hotel-card reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                                    <div className="hotel-card-img-wrapper">
                                        <img src={hotel.image} alt={hotel.name} className="hotel-card-img" loading="lazy" />
                                        <div className="hotel-card-badge">
                                            <span className="badge badge-gold">{'★'.repeat(hotel.stars)}</span>
                                        </div>
                                        <div className="hotel-card-price">
                                            Desde <strong>€{hotel.priceFrom}</strong>/noche
                                        </div>
                                    </div>
                                    <div className="hotel-card-body">
                                        <h3>{hotel.name}</h3>
                                        <div className="hotel-card-location">
                                            <MapPin size={14} />
                                            {hotel.location}
                                        </div>
                                        <div className="hotel-card-rating">
                                            <span className="score">{hotel.rating}</span>
                                            <span className="stars">{'★'.repeat(5)}</span>
                                            <span className="count">({hotel.reviewCount} reseñas)</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                            {hotel.tagline}
                                        </p>
                                        <div className="hotel-card-amenities">
                                            {hotel.amenities.slice(0, 5).map((a) => (
                                                <span key={a}>{a}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
