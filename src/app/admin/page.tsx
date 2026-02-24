'use client';

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { BarChart3, Bed, Calendar, DollarSign, Users, FileText, Settings, TrendingUp, Clock, Eye } from 'lucide-react';

const mockReservations = [
    { id: 'BK001', guest: 'Sophie Laurent', hotel: 'Lumière Palace', room: 'Suite Premium', checkIn: '2025-03-15', checkOut: '2025-03-19', status: 'Confirmada', total: 2320 },
    { id: 'BK002', guest: 'James Mitchell', hotel: 'Villa Serena', room: 'Villa Oceanfront', checkIn: '2025-03-20', checkOut: '2025-03-25', status: 'Confirmada', total: 4750 },
    { id: 'BK003', guest: 'Ana Martínez', hotel: 'Grand Hotel Aurora', room: 'Junior Suite', checkIn: '2025-03-18', checkOut: '2025-03-20', status: 'Pendiente', total: 900 },
    { id: 'BK004', guest: 'Marco Rossi', hotel: 'Lumière Palace', room: 'Suite Presidencial', checkIn: '2025-04-01', checkOut: '2025-04-05', status: 'Confirmada', total: 4800 },
    { id: 'BK005', guest: 'Elena Petrova', hotel: 'Villa Serena', room: 'Suite Garden', checkIn: '2025-04-10', checkOut: '2025-04-13', status: 'Cancelada', total: 1260 },
];

const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'reservations', label: 'Reservas', icon: <Calendar size={18} /> },
    { id: 'rooms', label: 'Habitaciones', icon: <Bed size={18} /> },
    { id: 'blog', label: 'Blog', icon: <FileText size={18} /> },
    { id: 'settings', label: 'Configuración', icon: <Settings size={18} /> },
];

export default function AdminPage() {
    const scrollRef = useScrollReveal();
    const [activeTab, setActiveTab] = useState('dashboard');

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
                    {activeTab === 'dashboard' && (
                        <div>
                            <h1 style={{ marginBottom: 'var(--space-2xl)', fontSize: '1.8rem' }}>Dashboard</h1>

                            {/* KPI Cards */}
                            <div className="grid-4 reveal" style={{ marginBottom: 'var(--space-2xl)' }}>
                                {[
                                    { label: 'Ingresos Mes', value: '€45,320', change: '+12.5%', icon: <DollarSign size={20} />, color: '#059669' },
                                    { label: 'Reservas Activas', value: '23', change: '+3', icon: <Calendar size={20} />, color: 'var(--color-accent)' },
                                    { label: 'Ocupación', value: '78%', change: '+5%', icon: <Bed size={20} />, color: '#8B5CF6' },
                                    { label: 'Visitas Web', value: '12.4K', change: '+18%', icon: <Eye size={20} />, color: '#3B82F6' },
                                ].map(kpi => (
                                    <div key={kpi.label} className="card" style={{ padding: 'var(--space-lg)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color }}>
                                                {kpi.icon}
                                            </div>
                                            <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <TrendingUp size={14} /> {kpi.change}
                                            </span>
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>{kpi.value}</div>
                                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{kpi.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Revenue Chart Placeholder */}
                            <div className="card reveal" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
                                <h3 style={{ marginBottom: 'var(--space-lg)' }}>Ingresos Mensuales</h3>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-sm)', height: 200 }}>
                                    {[65, 45, 78, 82, 90, 72, 85, 95, 88, 92, 98, 100].map((h, i) => (
                                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                            <div style={{
                                                width: '100%',
                                                height: `${h}%`,
                                                background: i === 11 ? 'var(--color-accent)' : 'var(--color-bg-alt)',
                                                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                                                transition: 'all 0.3s',
                                                minHeight: 4,
                                            }} />
                                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                                {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Reservations */}
                            <div className="card reveal" style={{ padding: 'var(--space-xl)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                                    <h3>Últimas Reservas</h3>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('reservations')}>Ver Todas</button>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                                <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ID</th>
                                                <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Huésped</th>
                                                <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hotel</th>
                                                <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fechas</th>
                                                <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estado</th>
                                                <th style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockReservations.slice(0, 4).map(res => (
                                                <tr key={res.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                                    <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-accent)' }}>{res.id}</td>
                                                    <td style={{ padding: '12px 8px' }}>{res.guest}</td>
                                                    <td style={{ padding: '12px 8px' }}>{res.hotel}</td>
                                                    <td style={{ padding: '12px 8px', color: 'var(--color-text-muted)' }}>{res.checkIn} → {res.checkOut}</td>
                                                    <td style={{ padding: '12px 8px' }}>
                                                        <span className={`badge ${res.status === 'Confirmada' ? 'badge-gold' : res.status === 'Cancelada' ? '' : 'badge-outline'}`}
                                                            style={res.status === 'Cancelada' ? { background: '#FEE2E2', color: '#DC2626', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 } : {}}>
                                                            {res.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 600 }}>€{res.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reservations' && (
                        <div>
                            <h1 style={{ marginBottom: 'var(--space-2xl)', fontSize: '1.8rem' }}>Gestión de Reservas</h1>
                            <div className="card" style={{ padding: 'var(--space-xl)' }}>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                                {['ID', 'Huésped', 'Hotel', 'Habitación', 'Check-in', 'Check-out', 'Estado', 'Total'].map(h => (
                                                    <th key={h} style={{ textAlign: h === 'Total' ? 'right' : 'left', padding: '12px 8px', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockReservations.map(res => (
                                                <tr key={res.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                                                    <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-accent)' }}>{res.id}</td>
                                                    <td style={{ padding: '12px 8px' }}>{res.guest}</td>
                                                    <td style={{ padding: '12px 8px' }}>{res.hotel}</td>
                                                    <td style={{ padding: '12px 8px' }}>{res.room}</td>
                                                    <td style={{ padding: '12px 8px' }}>{res.checkIn}</td>
                                                    <td style={{ padding: '12px 8px' }}>{res.checkOut}</td>
                                                    <td style={{ padding: '12px 8px' }}>
                                                        <span className={`badge ${res.status === 'Confirmada' ? 'badge-gold' : res.status === 'Cancelada' ? '' : 'badge-outline'}`}
                                                            style={res.status === 'Cancelada' ? { background: '#FEE2E2', color: '#DC2626', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 } : {}}>
                                                            {res.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 600 }}>€{res.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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
                </div>
            </div>
        </div>
    );
}
