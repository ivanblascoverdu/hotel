'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Check, ArrowRight, ArrowLeft, Calendar, Users, CreditCard, Coffee, Car, Waves, Loader2 } from 'lucide-react';

interface Room {
    id: string;
    name: string;
    slug: string;
    type: string;
    description: string;
    capacity: number;
    size: number;
    bedType: string;
    basePrice: number;
    image: string;
    amenities: string[];
    features: string[];
}

interface Hotel {
    id: string;
    name: string;
    slug: string;
    location: string;
    rooms: Room[];
}

const extras = [
    { id: 'breakfast', name: 'Desayuno Buffet', price: 35, icon: <Coffee size={18} />, desc: 'Desayuno gourmet con productos locales' },
    { id: 'parking', name: 'Parking Privado', price: 25, icon: <Car size={18} />, desc: 'Plaza privada en parking subterráneo' },
    { id: 'spa', name: 'Acceso Spa', price: 60, icon: <Waves size={18} />, desc: 'Circuito termal completo por persona' },
];

const seasonMultipliers: Record<string, number> = {
    baja: 0.8,
    media: 1,
    alta: 1.3,
    especial: 1.6,
};

export default function BookingPage() {
    const { data: session } = useSession();
    const scrollRef = useScrollReveal();
    const [step, setStep] = useState(1);
    const [selectedHotel, setSelectedHotel] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [season, setSeason] = useState('media');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState('');

    // Fetch hotels from the database API
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [hotelsLoading, setHotelsLoading] = useState(true);

    useEffect(() => {
        async function fetchHotels() {
            try {
                const res = await fetch('/api/hotels');
                if (res.ok) {
                    const data = await res.json();
                    setHotels(data);
                }
            } catch (error) {
                console.error('Error fetching hotels:', error);
            } finally {
                setHotelsLoading(false);
            }
        }
        fetchHotels();
    }, []);

    const handlePayment = async () => {
        if (!session?.user) {
            window.location.href = '/account';
            return;
        }

        setPaymentLoading(true);
        setPaymentError('');

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: selectedRoom,
                    checkIn,
                    checkOut,
                    adults,
                    children,
                    extras: selectedExtras,
                    totalPrice: Math.round(total * 100), // cents
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setPaymentError(data.error || 'Error al crear la reserva');
                setPaymentLoading(false);
                return;
            }

            // Redirect to Stripe Checkout
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            }
        } catch {
            setPaymentError('Error de conexión. Inténtalo de nuevo.');
            setPaymentLoading(false);
        }
    };

    const hotel = hotels.find(h => h.id === selectedHotel);
    const room = hotel?.rooms.find(r => r.id === selectedRoom);

    const nights = checkIn && checkOut
        ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
        : 1;

    const basePrice = room ? room.basePrice * seasonMultipliers[season] : 0;
    const extrasTotal = selectedExtras.reduce((sum, id) => {
        const extra = extras.find(e => e.id === id);
        return sum + (extra?.price || 0) * nights;
    }, 0);
    const subtotal = basePrice * nights + extrasTotal;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const toggleExtra = (id: string) => {
        setSelectedExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
    };

    // Date validation
    const today = new Date().toISOString().split('T')[0];
    const isDateValid = checkIn && checkOut && checkIn >= today && checkOut > checkIn;

    const steps = [
        { num: 1, label: 'Fechas y Huéspedes' },
        { num: 2, label: 'Habitación' },
        { num: 3, label: 'Extras' },
        { num: 4, label: 'Confirmar' },
    ];

    return (
        <div ref={scrollRef}>
            <div className="page-header" style={{ minHeight: 300, height: '35vh' }}>
                <div className="page-header-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80)' }} />
                <div className="page-header-content">
                    <h1>Reservar</h1>
                    <p>Tu experiencia de lujo comienza aquí</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="booking-wizard">
                        {/* Progress Steps */}
                        <div className="booking-steps reveal">
                            {steps.map((s, i) => (
                                <React.Fragment key={s.num}>
                                    <div className={`booking-step ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}>
                                        <div className="booking-step-number">
                                            {step > s.num ? <Check size={16} /> : s.num}
                                        </div>
                                        <span className="booking-step-label">{s.label}</span>
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className={`booking-step-line ${step > s.num ? 'completed' : ''}`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Step 1: Dates & Guests */}
                        {step === 1 && (
                            <div className="card reveal" style={{ padding: 'var(--space-2xl)' }}>
                                <h2 style={{ marginBottom: 'var(--space-xl)' }}>
                                    <Calendar size={24} style={{ verticalAlign: 'middle', marginRight: 8, color: 'var(--color-accent)' }} />
                                    Fechas y Huéspedes
                                </h2>

                                {hotelsLoading ? (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-3xl)', gap: 'var(--space-md)' }}>
                                        <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-accent)' }} />
                                        <span>Cargando hoteles...</span>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                                            <div className="input-group">
                                                <label>Hotel</label>
                                                <select className="select" value={selectedHotel} onChange={e => { setSelectedHotel(e.target.value); setSelectedRoom(''); }}>
                                                    <option value="">Seleccionar hotel</option>
                                                    {hotels.map(h => <option key={h.id} value={h.id}>{h.name} — {h.location}</option>)}
                                                </select>
                                            </div>
                                            <div className="input-group">
                                                <label>Temporada</label>
                                                <select className="select" value={season} onChange={e => setSeason(e.target.value)}>
                                                    <option value="baja">Baja (Nov-Mar) -20%</option>
                                                    <option value="media">Media (Abr-Jun, Oct)</option>
                                                    <option value="alta">Alta (Jul-Sep) +30%</option>
                                                    <option value="especial">Especial (Festivos) +60%</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                                            <div className="input-group">
                                                <label>Fecha de Entrada</label>
                                                <input type="date" className="input" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)} />
                                            </div>
                                            <div className="input-group">
                                                <label>Fecha de Salida</label>
                                                <input type="date" className="input" value={checkOut} min={checkIn || today} onChange={e => setCheckOut(e.target.value)} />
                                            </div>
                                        </div>

                                        {checkIn && checkOut && !isDateValid && (
                                            <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: 'var(--space-md)' }}>
                                                La fecha de salida debe ser posterior a la fecha de entrada, y las fechas no pueden ser pasadas.
                                            </p>
                                        )}

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
                                            <div className="input-group">
                                                <label>Adultos</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                                    <button className="btn btn-secondary btn-sm" onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>
                                                    <span style={{ fontWeight: 700, fontSize: '1.2rem', minWidth: 30, textAlign: 'center' }}>{adults}</span>
                                                    <button className="btn btn-secondary btn-sm" onClick={() => setAdults(Math.min(6, adults + 1))}>+</button>
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <label>Niños</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                                    <button className="btn btn-secondary btn-sm" onClick={() => setChildren(Math.max(0, children - 1))}>−</button>
                                                    <span style={{ fontWeight: 700, fontSize: '1.2rem', minWidth: 30, textAlign: 'center' }}>{children}</span>
                                                    <button className="btn btn-secondary btn-sm" onClick={() => setChildren(Math.min(4, children + 1))}>+</button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-primary btn-lg"
                                            style={{ width: '100%' }}
                                            onClick={() => setStep(2)}
                                            disabled={!selectedHotel || !isDateValid}
                                        >
                                            Siguiente: Elegir Habitación <ArrowRight size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Step 2: Room Selection */}
                        {step === 2 && hotel && (
                            <div className="wizard-step-enter">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setStep(1)}>
                                        <ArrowLeft size={14} /> Atrás
                                    </button>
                                    <h2 style={{ margin: 0 }}>
                                        <Users size={24} style={{ verticalAlign: 'middle', marginRight: 8, color: 'var(--color-accent)' }} />
                                        Seleccionar Habitación
                                    </h2>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                                    {hotel.rooms.map(r => (
                                        <div
                                            key={r.id}
                                            className="card"
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: '280px 1fr',
                                                cursor: 'pointer',
                                                border: selectedRoom === r.id ? '2px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                                                boxShadow: selectedRoom === r.id ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                                            }}
                                            onClick={() => setSelectedRoom(r.id)}
                                        >
                                            <div style={{ overflow: 'hidden' }}>
                                                <img src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 200 }} />
                                            </div>
                                            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <div>
                                                            <h3 style={{ marginBottom: '0.25rem' }}>{r.name}</h3>
                                                            <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>{r.description}</p>
                                                        </div>
                                                        {selectedRoom === r.id && (
                                                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                                                                <Check size={16} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                                        <span>👥 {r.capacity}</span>
                                                        <span>📐 {r.size}m²</span>
                                                        <span>🛏 {r.bedType}</span>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '1rem' }}>
                                                    <span className="price-tag">
                                                        <span className="currency">€</span>{Math.round(r.basePrice * seasonMultipliers[season])}
                                                        <span className="period"> /noche</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%', marginTop: 'var(--space-xl)' }}
                                    onClick={() => setStep(3)}
                                    disabled={!selectedRoom}
                                >
                                    Siguiente: Extras <ArrowRight size={16} />
                                </button>
                            </div>
                        )}

                        {/* Step 3: Extras */}
                        {step === 3 && (
                            <div className="wizard-step-enter">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setStep(2)}>
                                        <ArrowLeft size={14} /> Atrás
                                    </button>
                                    <h2 style={{ margin: 0 }}>Personaliza tu Estancia</h2>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
                                    {extras.map(extra => (
                                        <div
                                            key={extra.id}
                                            className="card"
                                            style={{
                                                padding: 'var(--space-lg)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-lg)',
                                                cursor: 'pointer',
                                                border: selectedExtras.includes(extra.id) ? '2px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                                                boxShadow: selectedExtras.includes(extra.id) ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                                            }}
                                            onClick={() => toggleExtra(extra.id)}
                                        >
                                            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: selectedExtras.includes(extra.id) ? 'var(--color-accent)' : 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedExtras.includes(extra.id) ? 'var(--color-primary)' : 'var(--color-accent)', transition: 'all 0.3s', flexShrink: 0 }}>
                                                {extra.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '1rem', marginBottom: '0.15rem' }}>{extra.name}</h4>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{extra.desc}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: 700, color: 'var(--color-accent)', fontSize: '1.1rem' }}>€{extra.price}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>/noche</div>
                                            </div>
                                            <div style={{ width: 24, height: 24, borderRadius: 'var(--radius-sm)', border: `2px solid ${selectedExtras.includes(extra.id) ? 'var(--color-accent)' : 'var(--color-border)'}`, background: selectedExtras.includes(extra.id) ? 'var(--color-accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedExtras.includes(extra.id) ? 'var(--color-primary)' : 'transparent', transition: 'all 0.3s' }}>
                                                <Check size={14} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%' }}
                                    onClick={() => setStep(4)}
                                >
                                    Siguiente: Confirmar Reserva <ArrowRight size={16} />
                                </button>
                            </div>
                        )}

                        {/* Step 4: Confirmation */}
                        {step === 4 && (
                            <div className="wizard-step-enter">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setStep(3)}>
                                        <ArrowLeft size={14} /> Atrás
                                    </button>
                                    <h2 style={{ margin: 0 }}>
                                        <CreditCard size={24} style={{ verticalAlign: 'middle', marginRight: 8, color: 'var(--color-accent)' }} />
                                        Resumen de Reserva
                                    </h2>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)' }}>
                                    {/* Details */}
                                    <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                        <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.15rem' }}>Detalles de la Estancia</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>Hotel</span>
                                                <span style={{ fontWeight: 600 }}>{hotel?.name}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>Habitación</span>
                                                <span style={{ fontWeight: 600 }}>{room?.name}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>Check-in</span>
                                                <span style={{ fontWeight: 600 }}>{checkIn}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>Check-out</span>
                                                <span style={{ fontWeight: 600 }}>{checkOut}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>Noches</span>
                                                <span style={{ fontWeight: 600 }}>{nights}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>Huéspedes</span>
                                                <span style={{ fontWeight: 600 }}>{adults} adultos{children > 0 ? `, ${children} niños` : ''}</span>
                                            </div>
                                            {selectedExtras.length > 0 && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'var(--color-text-muted)' }}>Extras</span>
                                                    <span style={{ fontWeight: 600 }}>{selectedExtras.map(id => extras.find(e => e.id === id)?.name).join(', ')}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price Summary */}
                                    <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                        <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.15rem' }}>Desglose de Precio</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>€{Math.round(basePrice)} × {nights} noches</span>
                                                <span>€{Math.round(basePrice * nights)}</span>
                                            </div>
                                            {selectedExtras.map(id => {
                                                const extra = extras.find(e => e.id === id);
                                                return extra ? (
                                                    <div key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: 'var(--color-text-muted)' }}>{extra.name} × {nights} noches</span>
                                                        <span>€{extra.price * nights}</span>
                                                    </div>
                                                ) : null;
                                            })}
                                            <div className="divider" style={{ margin: 'var(--space-sm) 0' }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                                                <span>€{Math.round(subtotal)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>IVA (10%)</span>
                                                <span>€{Math.round(tax)}</span>
                                            </div>
                                            <div className="divider" style={{ margin: 'var(--space-sm) 0' }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem' }}>
                                                <span style={{ fontWeight: 700 }}>Total</span>
                                                <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>€{Math.round(total)}</span>
                                            </div>
                                        </div>

                                        {paymentError && (
                                            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--space-sm) var(--space-md)', marginTop: 'var(--space-md)', color: '#ef4444', fontSize: '0.9rem' }}>
                                                {paymentError}
                                            </div>
                                        )}
                                        <button
                                            className="btn btn-primary btn-lg"
                                            style={{ width: '100%', marginTop: 'var(--space-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                            onClick={handlePayment}
                                            disabled={paymentLoading}
                                        >
                                            {paymentLoading ? (
                                                <><Loader2 size={18} className="animate-spin" /> Procesando...</>
                                            ) : (
                                                <>{!session?.user ? '🔐 Iniciar Sesión para Pagar' : '💳 Confirmar y Pagar'}</>
                                            )}
                                        </button>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-md)' }}>
                                            Pago seguro con Stripe. Cancelación gratuita hasta 48h antes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
