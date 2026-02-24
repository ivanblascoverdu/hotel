'use client';

import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { User, Mail, Lock, LogOut, Calendar, MapPin, CreditCard, Clock } from 'lucide-react';

export default function AccountPage() {
    const { data: session, status } = useSession();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState<any[]>([]);

    // Login form
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Register form
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    useEffect(() => {
        if (session?.user) {
            fetchBookings();
        }
    }, [session]);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/bookings');
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn('credentials', {
            email: loginEmail,
            password: loginPassword,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
        }
        setLoading(false);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                setLoading(false);
                return;
            }

            // Auto-login after register
            await signIn('credentials', {
                email: regEmail,
                password: regPassword,
                redirect: false,
            });
        } catch {
            setError('Error al crear la cuenta');
        }
        setLoading(false);
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) return;

        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'CANCELLED' }),
            });

            if (res.ok) {
                fetchBookings();
            } else {
                const data = await res.json();
                alert(data.error || 'Error al cancelar');
            }
        } catch {
            alert('Error al cancelar la reserva');
        }
    };

    const statusLabels: Record<string, { label: string; color: string }> = {
        PENDING: { label: 'Pendiente', color: '#f59e0b' },
        CONFIRMED: { label: 'Confirmada', color: '#059669' },
        CANCELLED: { label: 'Cancelada', color: '#ef4444' },
        COMPLETED: { label: 'Completada', color: '#6366f1' },
    };

    // Loading state
    if (status === 'loading') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loading-spinner" />
            </div>
        );
    }

    // Not logged in — show login/register form
    if (!session?.user) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-alt)', padding: 'var(--space-xl)' }}>
                <div className="card" style={{ maxWidth: 440, width: '100%', padding: 'var(--space-2xl)' }}>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                        <h1 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-xs)' }}>
                            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            {isLogin ? 'Accede a tu cuenta para gestionar reservas' : 'Únete a Lumière Hotels'}
                        </p>
                    </div>

                    {error && (
                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--space-sm) var(--space-md)', marginBottom: 'var(--space-lg)', color: '#ef4444', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    {isLogin ? (
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-xs)', fontWeight: 500, fontSize: '0.9rem' }}>
                                    <Mail size={16} /> Email
                                </label>
                                <input type="email" className="form-input" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="tu@email.com" required />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-xs)', fontWeight: 500, fontSize: '0.9rem' }}>
                                    <Lock size={16} /> Contraseña
                                </label>
                                <input type="password" className="form-input" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" required />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: 'var(--space-sm)' }}>
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-xs)', fontWeight: 500, fontSize: '0.9rem' }}>
                                    <User size={16} /> Nombre completo
                                </label>
                                <input type="text" className="form-input" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Tu nombre" required />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-xs)', fontWeight: 500, fontSize: '0.9rem' }}>
                                    <Mail size={16} /> Email
                                </label>
                                <input type="email" className="form-input" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="tu@email.com" required />
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-xs)', fontWeight: 500, fontSize: '0.9rem' }}>
                                    <Lock size={16} /> Contraseña
                                </label>
                                <input type="password" className="form-input" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required minLength={6} />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: 'var(--space-sm)' }}>
                                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </button>
                        </form>
                    )}

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
                        <button onClick={() => { setIsLogin(!isLogin); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 500 }}>
                            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Logged in — show dashboard
    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-alt)', padding: 'var(--space-3xl) var(--space-xl)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-xs)' }}>Hola, {session.user.name || 'Huésped'} 👋</h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>{session.user.email}</p>
                    </div>
                    <button onClick={() => signOut()} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LogOut size={18} /> Cerrar Sesión
                    </button>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
                    {[
                        { label: 'Total Reservas', value: bookings.length, icon: Calendar },
                        { label: 'Activas', value: bookings.filter(b => ['CONFIRMED', 'PENDING'].includes(b.status)).length, icon: Clock },
                        { label: 'Completadas', value: bookings.filter(b => b.status === 'COMPLETED').length, icon: CreditCard },
                    ].map((stat, i) => (
                        <div key={i} className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
                            <stat.icon size={24} style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Bookings List */}
                <h2 style={{ fontSize: '1.4rem', marginBottom: 'var(--space-lg)' }}>Mis Reservas</h2>

                {bookings.length === 0 ? (
                    <div className="card" style={{ padding: 'var(--space-3xl)', textAlign: 'center' }}>
                        <Calendar size={48} style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }} />
                        <h3>No tienes reservas todavía</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>Explora nuestros hoteles y haz tu primera reserva</p>
                        <a href="/hotels" className="btn btn-primary">Ver Hoteles</a>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {bookings.map((booking) => {
                            const status = statusLabels[booking.status] || { label: booking.status, color: '#888' };
                            const checkIn = new Date(booking.checkIn).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
                            const checkOut = new Date(booking.checkOut).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

                            return (
                                <div key={booking.id} className="card" style={{ padding: 'var(--space-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                                    <div style={{ flex: 1, minWidth: 200 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{booking.room?.hotel?.name}</h3>
                                            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: `${status.color}22`, color: status.color, fontWeight: 600 }}>
                                                {status.label}
                                            </span>
                                        </div>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>{booking.room?.name}</p>
                                        <div style={{ display: 'flex', gap: 'var(--space-lg)', marginTop: 'var(--space-sm)', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Calendar size={14} /> {checkIn} → {checkOut}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                                            €{(booking.totalPrice / 100).toFixed(2)}
                                        </div>
                                        {['PENDING', 'CONFIRMED'].includes(booking.status) && (
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '4px 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'var(--space-xs)' }}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
