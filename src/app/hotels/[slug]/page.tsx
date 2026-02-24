'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { hotels, reviews } from '@/data/hotels';
import { MapPin, Star, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HotelDetailPage() {
    const params = useParams();
    const scrollRef = useScrollReveal();
    const hotel = hotels.find(h => h.slug === params.slug);
    const [currentImage, setCurrentImage] = useState(0);

    if (!hotel) {
        return (
            <div className="page-content" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Hotel no encontrado</h1>
                    <p style={{ marginBottom: '2rem' }}>El hotel que buscas no existe.</p>
                    <Link href="/hotels" className="btn btn-primary">Ver Hoteles</Link>
                </div>
            </div>
        );
    }

    const hotelReviews = reviews.filter(r => r.hotelId === hotel.id);
    const allImages = [hotel.image, ...hotel.gallery];

    return (
        <div ref={scrollRef}>
            {/* Hero Gallery */}
            <div className="page-header" style={{ height: '70vh' }}>
                <div
                    className="page-header-bg"
                    style={{
                        backgroundImage: `url(${allImages[currentImage]})`,
                        transition: 'background-image 0.5s ease',
                    }}
                />
                <div className="page-header-content">
                    <span className="badge badge-gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                        {'★'.repeat(hotel.stars)}
                    </span>
                    <h1>{hotel.name}</h1>
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <MapPin size={16} /> {hotel.location}
                    </p>
                </div>
                {/* Gallery Nav */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 3 }}>
                    <button
                        onClick={() => setCurrentImage(i => (i - 1 + allImages.length) % allImages.length)}
                        style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    {allImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                background: currentImage === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)',
                                transition: 'background 0.3s',
                                alignSelf: 'center',
                            }}
                        />
                    ))}
                    <button
                        onClick={() => setCurrentImage(i => (i + 1) % allImages.length)}
                        style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Hotel Info */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-3xl)' }}>
                        {/* Main Content */}
                        <div>
                            <div className="reveal">
                                <h2 style={{ marginBottom: 'var(--space-md)' }}>{hotel.tagline}</h2>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 'var(--space-2xl)' }}>
                                    {hotel.description}
                                </p>
                            </div>

                            {/* Amenities */}
                            <div className="reveal" style={{ marginBottom: 'var(--space-3xl)' }}>
                                <h3 style={{ marginBottom: 'var(--space-lg)' }}>Servicios e Instalaciones</h3>
                                <div className="amenity-list">
                                    {hotel.amenities.map(a => (
                                        <div className="amenity-item" key={a}>
                                            <Check size={16} /> {a}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rooms */}
                            <div className="reveal">
                                <h3 style={{ marginBottom: 'var(--space-lg)' }}>Habitaciones y Suites</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
                                    {hotel.rooms.map(room => (
                                        <div key={room.id} className="card" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', overflow: 'hidden' }}>
                                            <div style={{ overflow: 'hidden' }}>
                                                <img src={room.image} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 220 }} loading="lazy" />
                                            </div>
                                            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <span className="badge badge-outline" style={{ marginBottom: '0.5rem', display: 'inline-block', textTransform: 'capitalize' }}>{room.type}</span>
                                                    <h4 style={{ marginBottom: '0.5rem' }}>{room.name}</h4>
                                                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{room.description}</p>
                                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                                        <span>👥 {room.capacity} huéspedes</span>
                                                        <span>📐 {room.size}m²</span>
                                                        <span>🛏 {room.bedType}</span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                                    <div>
                                                        <span className="price-tag">
                                                            <span className="currency">€</span>{room.basePrice}
                                                            <span className="period"> /noche</span>
                                                        </span>
                                                    </div>
                                                    <Link href="/booking" className="btn btn-primary btn-sm">
                                                        Reservar <ArrowRight size={14} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="card reveal" style={{ padding: 'var(--space-xl)', position: 'sticky', top: 100 }}>
                                <div className="rating-large" style={{ marginBottom: 'var(--space-lg)' }}>
                                    <span className="value">{hotel.rating}</span>
                                    <div>
                                        <div className="stars">{'★'.repeat(5)}</div>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{hotel.reviewCount} reseñas</span>
                                    </div>
                                </div>
                                <div className="divider" style={{ margin: 'var(--space-lg) 0' }} />
                                <div className="price-tag" style={{ marginBottom: 'var(--space-lg)' }}>
                                    <span className="currency">€</span>{hotel.priceFrom}
                                    <span className="period"> /noche desde</span>
                                </div>
                                <Link href="/booking" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--space-md)' }}>
                                    Reservar Ahora
                                </Link>
                                <Link href="/rooms" className="btn btn-secondary" style={{ width: '100%' }}>
                                    Ver Habitaciones 3D
                                </Link>

                                {/* Highlights */}
                                <div className="divider" style={{ margin: 'var(--space-lg) 0' }} />
                                <h4 style={{ marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Destacados</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {hotel.highlights.map(h => (
                                        <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                            <Star size={14} color="var(--color-accent)" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Reviews */}
                    {hotelReviews.length > 0 && (
                        <div style={{ marginTop: 'var(--space-4xl)' }}>
                            <h3 className="reveal" style={{ marginBottom: 'var(--space-xl)' }}>Reseñas de Huéspedes</h3>
                            <div className="grid-3">
                                {hotelReviews.map((review, i) => (
                                    <div className="testimonial-card reveal" key={review.id} style={{ transitionDelay: `${i * 100}ms` }}>
                                        <p>{review.comment}</p>
                                        <div className="testimonial-author">
                                            <div className="avatar">{review.avatar}</div>
                                            <div>
                                                <div className="name">{review.author}</div>
                                                <div className="origin">{review.country}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Map placeholder */}
            <section style={{ background: 'var(--color-bg-alt)', padding: 'var(--space-3xl) 0' }}>
                <div className="container reveal">
                    <h3 style={{ marginBottom: 'var(--space-xl)' }}>Ubicación</h3>
                    <div style={{
                        width: '100%',
                        height: 400,
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        background: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border)',
                    }}>
                        <iframe
                            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${hotel.coordinates.lng}!3d${hotel.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Ubicación de ${hotel.name}`}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
