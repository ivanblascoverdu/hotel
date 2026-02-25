'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { BarChart3, Bed, Calendar, DollarSign, Users, FileText, Settings, TrendingUp, Clock, Eye, Loader2 } from 'lucide-react';

interface Booking {
    id: string;
    guestName: string | null;
    guestEmail: string | null;
    checkIn: string;
    checkOut: string;
    status: string;
    totalPrice: number;
    createdAt: string;
    user: { name: string | null; email: string } | null;
    room: { name: string; hotel: { name: string } };
}

interface Stats {
    monthlyRevenue: number;
    activeBookings: number;
    occupancy: number;
    totalUsers: number;
    recentBookings: Booking[];
    monthlyChart: { month: string; revenue: number }[];
}

const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'reservations', label: 'Reservas', icon: <Calendar size={18} /> },
    { id: 'rooms', label: 'Habitaciones', icon: <Bed size={18} /> },
    { id: 'blog', label: 'Blog', icon: <FileText size={18} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={18} /> },
];

const statusLabels: Record<string, string> = {
    CONFIRMED: 'Confirmada',
    PENDING: 'Pendiente',
    CANCELLED: 'Cancelada',
    COMPLETED: 'Completada',
};

export default function AdminPage() {
    const { data: session, status: authStatus } = useSession();
    const router = useRouter();
    const scrollRef = useScrollReveal();
    const [activeTab, setActiveTab] = useState('dashboard');

    const [stats, setStats] = useState<Stats | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Auth check — redirect non-admin users
    useEffect(() => {
        if (authStatus === 'loading') return;
        if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
            router.push('/account');
        }
    }, [session, authStatus, router]);

    // Fetch dashboard data
    useEffect(() => {
        if (authStatus !== 'authenticated') return;
        if ((session?.user as { role?: string })?.role !== 'ADMIN') return;

        async function fetchData() {
            setLoading(true);
            setError('');
            try {
                const [statsRes, bookingsRes] = await Promise.all([
                    fetch('/api/admin/stats'),
                    fetch('/api/admin/bookings'),
                ]);

                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }
                if (bookingsRes.ok) {
                    const bookingsData = await bookingsRes.json();
                    setBookings(bookingsData);
                }

                if (!statsRes.ok && !bookingsRes.ok) {
                    setError('Error al cargar los datos del panel');
                }
            } catch {
                setError('Error de conexión');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [authStatus, session]);

    // Show loading while checking auth
    if (authStatus === 'loading' || (!session?.user)) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-accent)' }} />
            </div>
        );
    }

    if ((session.user as { role?: string }).role !== 'ADMIN') {
        return null; // Will redirect
    }

    const formatStatus = (s: string) => statusLabels[s] || s;
    const getStatusStyle = (s: string) => {
        if (s === 'CONFIRMED' || s === 'COMPLETED') return 'badge-gold';
        if (s === 'CANCELLED') return '';
        return 'badge-outline';
    };
    const getStatusCustomStyle = (s: string) => {
        if (s === 'CANCELLED') return { background: '#FEE2E2', color: '#DC2626', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 as const };
        return {};
    };

    return (
        <div ref={scrollRef} className="page-content">
            <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--nav-height))' }}>
                {/* Sidebar */}
                <aside style={{
                    width: 260,
                    background: 'var(--color-primary)',
                    padding: 'var(--space-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-xs)',
                    flexShrink: 0,
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'white',
                        fontSize: '1.4rem',
                        padding: 'var(--space-md) var(--space-sm)',
                        marginBottom: 'var(--space-lg)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: 'var(--space-lg)',
                    }}>
                        Panel Admin
                    </h3>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-sm)',
                                padding: '12px var(--space-md)',
                                borderRadius: 'var(--radius-md)',
                                color: activeTab === tab.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)',
                                background: activeTab === tab.id ? 'var(--color-accent)' : 'transparent',
                                fontWeight: activeTab === tab.id ? 600 : 400,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                border: 'none',
                                width: '100%',
                                textAlign: 'left',
                            }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Main Content */}
                <div style={{ flex: 1, padding: 'var(--space-2xl)', background: 'var(--color-bg-alt)', overflow: 'auto' }}>
                    {loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 'var(--space-md)' }}>
                            <Loader2 size={28} className="animate-spin" style={{ color: 'var(--color-accent)' }} />
                            <span>Cargando datos...</span>
                        </div>
                    ) : error ? (
                        <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
                            <p style={{ color: '#ef4444' }}>{error}</p>
                            <button className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }} onClick={() => window.location.reload()}>
                                Reintentar
                            </button>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'dashboard' && (
                                <div>
                                    <h1 style={{ marginBottom: 'var(--space-2xl)', fontSize: '1.8rem' }}>Dashboard</h1>

                                    {/* KPI Cards */}
                                    <div className="grid-4 reveal" style={{ marginBottom: 'var(--space-2xl)' }}>
                                        {[
                                            { label: 'Ingresos Mes', value: `€${stats?.monthlyRevenue?.toLocaleString('es-ES') || '0'}`, icon: <DollarSign size={20} />, color: '#059669' },
                                            { label: 'Reservas Activas', value: String(stats?.activeBookings || 0), icon: <Calendar size={20} />, color: 'var(--color-accent)' },
                                            { label: 'Ocupación', value: `${stats?.occupancy || 0}%`, icon: <Bed size={20} />, color: '#8B5CF6' },
                                            { label: 'Usuarios', value: String(stats?.totalUsers || 0), icon: <Users size={20} />, color: '#3B82F6' },
                                        ].map(kpi => (
                                            <div key={kpi.label} className="card" style={{ padding: 'var(--space-lg)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color }}>
                                                        {kpi.icon}
                                                    </div>
                                                </div>
                                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>{kpi.value}</div>
                                                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{kpi.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Revenue Chart */}
                                    {stats?.monthlyChart && (
                                        <div className="card reveal" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
                                            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Ingresos Mensuales</h3>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-sm)', height: 200 }}>
                                                {stats.monthlyChart.map((m, i) => {
                                                    const maxRevenue = Math.max(...stats.monthlyChart.map(c => c.revenue), 1);
                                                    const height = Math.max(4, (m.revenue / maxRevenue) * 100);
                                                    return (
                                                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                                            <div style={{
                                                                width: '100%',
                                                                height: `${height}%`,
                                                                background: i === stats.monthlyChart.length - 1 ? 'var(--color-accent)' : 'var(--color-bg-alt)',
                                                                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                                                                transition: 'all 0.3s',
                                                                minHeight: 4,
                                                            }} />
                                                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                                                {m.month}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Recent Reservations */}
                                    <div className="card reveal" style={{ padding: 'var(--space-xl)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                                            <h3>Últimas Reservas</h3>
                                            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('reservations')}>Ver Todas</button>
                                        </div>
                                        {(stats?.recentBookings?.length || 0) > 0 ? (
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                                    <thead>
                                                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                                            <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Huésped</th>
                                                            <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hotel</th>
                                                            <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fechas</th>
                                                            <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
                                                            <th style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {stats?.recentBookings.slice(0, 5).map(res => (
                                                            <tr key={res.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                                                <td style={{ padding: '12px 8px' }}>{res.guestName || res.user?.name || res.user?.email || '—'}</td>
                                                                <td style={{ padding: '12px 8px' }}>{res.room?.hotel?.name || '—'}</td>
                                                                <td style={{ padding: '12px 8px', color: 'var(--color-text-muted)' }}>
                                                                    {new Date(res.checkIn).toLocaleDateString('es-ES')} → {new Date(res.checkOut).toLocaleDateString('es-ES')}
                                                                </td>
                                                                <td style={{ padding: '12px 8px' }}>
                                                                    <span className={`badge ${getStatusStyle(res.status)}`} style={getStatusCustomStyle(res.status)}>
                                                                        {formatStatus(res.status)}
                                                                    </span>
                                                                </td>
                                                                <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 600 }}>€{(res.totalPrice / 100).toFixed(0)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--space-xl)' }}>
                                                No hay reservas recientes.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reservations' && (
                                <div>
                                    <h1 style={{ marginBottom: 'var(--space-2xl)', fontSize: '1.8rem' }}>Gestión de Reservas</h1>
                                    <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                        {bookings.length > 0 ? (
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                                    <thead>
                                                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                                            {['Huésped', 'Hotel', 'Habitación', 'Check-in', 'Check-out', 'Estado', 'Total'].map(h => (
                                                                <th key={h} style={{ textAlign: h === 'Total' ? 'right' : 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bookings.map(res => (
                                                            <tr key={res.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                                                <td style={{ padding: '12px 8px' }}>{res.guestName || res.user?.name || res.user?.email || '—'}</td>
                                                                <td style={{ padding: '12px 8px' }}>{res.room?.hotel?.name || '—'}</td>
                                                                <td style={{ padding: '12px 8px' }}>{res.room?.name || '—'}</td>
                                                                <td style={{ padding: '12px 8px' }}>{new Date(res.checkIn).toLocaleDateString('es-ES')}</td>
                                                                <td style={{ padding: '12px 8px' }}>{new Date(res.checkOut).toLocaleDateString('es-ES')}</td>
                                                                <td style={{ padding: '12px 8px' }}>
                                                                    <span className={`badge ${getStatusStyle(res.status)}`} style={getStatusCustomStyle(res.status)}>
                                                                        {formatStatus(res.status)}
                                                                    </span>
                                                                </td>
                                                                <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 600 }}>€{(res.totalPrice / 100).toFixed(0)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--space-xl)' }}>
                                                No hay reservas registradas.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'rooms' && (
                                <div>
                                    <h1 style={{ marginBottom: 'var(--space-2xl)', fontSize: '1.8rem' }}>Gestión de Habitaciones</h1>
                                    <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                        <p style={{ marginBottom: 'var(--space-lg)' }}>Panel de gestión de habitaciones, precios y disponibilidad.</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                            {['Lumière Palace — 3 habitaciones', 'Grand Hotel Aurora — 2 habitaciones', 'Villa Serena — 2 habitaciones'].map(h => (
                                                <div key={h} style={{ padding: 'var(--space-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: 600 }}>{h}</span>
                                                    <button className="btn btn-secondary btn-sm">Gestionar</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'blog' && (
                                <div>
                                    <h1 style={{ marginBottom: 'var(--space-2xl)', fontSize: '1.8rem' }}>Gestión del Blog</h1>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-lg)' }}>
                                        <button className="btn btn-primary">+ Nuevo Artículo</button>
                                    </div>
                                    <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                            {[
                                                { title: 'Los 10 mejores destinos de lujo en España', status: 'Publicado', date: '15 Ene 2025' },
                                                { title: 'Guía completa del bienestar holístico', status: 'Publicado', date: '10 Ene 2025' },
                                                { title: 'Gastronomía Michelin en hoteles', status: 'Borrador', date: '5 Ene 2025' },
                                            ].map(post => (
                                                <div key={post.title} style={{ padding: 'var(--space-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                                                    <span style={{ fontWeight: 600 }}>{post.title}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                                        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{post.date}</span>
                                                        <span className={`badge ${post.status === 'Publicado' ? 'badge-gold' : 'badge-outline'}`}>{post.status}</span>
                                                        <button className="btn btn-secondary btn-sm">Editar</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div>
                                    <h1 style={{ marginBottom: 'var(--space-2xl)', fontSize: '1.8rem' }}>Configuración</h1>
                                    <div className="card" style={{ padding: 'var(--space-xl)', maxWidth: 600 }}>
                                        <h3 style={{ marginBottom: 'var(--space-lg)' }}>Información General</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                            <div className="input-group">
                                                <label>Nombre de la Cadena</label>
                                                <input className="input" defaultValue="Lumière Hotels" />
                                            </div>
                                            <div className="input-group">
                                                <label>Email de Contacto</label>
                                                <input className="input" defaultValue="info@lumierehotels.com" />
                                            </div>
                                            <div className="input-group">
                                                <label>Teléfono</label>
                                                <input className="input" defaultValue="+34 900 123 456" />
                                            </div>
                                            <div className="input-group">
                                                <label>Moneda Predeterminada</label>
                                                <select className="select">
                                                    <option>EUR (€)</option>
                                                    <option>USD ($)</option>
                                                    <option>GBP (£)</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-md)' }}>Guardar Cambios</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
