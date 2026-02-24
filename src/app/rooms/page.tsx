'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { hotels } from '@/data/hotels';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const RoomViewer = dynamic(() => import('@/components/RoomViewer'), { ssr: false });

export default function RoomsPage() {
    const scrollRef = useScrollReveal();
    const allRooms = hotels.flatMap(h => h.rooms.map(r => ({ ...r, hotelName: h.name })));
    const [show3D, setShow3D] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(allRooms[0]);
    const [filter, setFilter] = useState<string>('all');

    const filteredRooms = filter === 'all' ? allRooms : allRooms.filter(r => r.type === filter);

    return (
        <div ref={scrollRef}>
            <div className="page-header">
                <div className="page-header-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80)' }} />
                <div className="page-header-content">
                    <span className="subtitle" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>
                        Alojamiento
                    </span>
                    <h1>Habitaciones & Suites</h1>
                    <p>Espacios diseñados para el descanso y el placer más refinado</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {/* 3D Viewer Banner */}
                    <div className="reveal" style={{
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'var(--space-2xl)',
                        marginBottom: 'var(--space-3xl)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 'var(--space-lg)',
                    }}>
                        <div>
                            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>🔮 Visualización 3D Interactiva</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                Explora nuestras habitaciones en 3D con rotación 360° y cambio de iluminación
                            </p>
                        </div>
                        <button className="btn btn-primary" onClick={() => setShow3D(!show3D)}>
                            {show3D ? 'Ocultar Visor 3D' : 'Abrir Visor 3D'}
                        </button>
                    </div>

                    {/* 3D Viewer */}
                    {show3D && (
                        <div className="reveal" style={{ marginBottom: 'var(--space-3xl)' }}>
                            <RoomViewer />
                        </div>
                    )}

                    {/* Filters */}
                    <div className="reveal" style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap' }}>
                        {['all', 'standard', 'superior', 'deluxe', 'suite', 'presidential'].map(t => (
                            <button
                                key={t}
                                className={`btn btn-sm ${filter === t ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setFilter(t)}
                            >
                                {t === 'all' ? 'Todas' : t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Room Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
                        {filteredRooms.map((room, i) => (
                            <div key={room.id} className="card reveal" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', overflow: 'hidden', transitionDelay: `${i * 100}ms` }}>
                                <div style={{ overflow: 'hidden', position: 'relative' }}>
                                    <img src={room.image} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 260 }} loading="lazy" />
                                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                                        <span className="badge badge-gold" style={{ textTransform: 'capitalize' }}>{room.type}</span>
                                    </div>
                                </div>
                                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'var(--space-xl)' }}>
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '0.25rem' }}>{room.hotelName}</p>
                                        <h3 style={{ marginBottom: '0.5rem' }}>{room.name}</h3>
                                        <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>{room.description}</p>
                                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                            <span>👥 {room.capacity} huéspedes</span>
                                            <span>📐 {room.size}m²</span>
                                            <span>🛏 {room.bedType}</span>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {room.features.map(f => (
                                                <span key={f} className="badge badge-outline">{f}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                                        <div className="price-tag">
                                            <span className="currency">€</span>{room.basePrice}
                                            <span className="period"> /noche</span>
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
            </section>
        </div>
    );
}
