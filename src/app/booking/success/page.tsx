'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, Calendar } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-alt)' }}>
            <div className="card" style={{ maxWidth: 560, width: '100%', padding: 'var(--space-3xl)', textAlign: 'center', margin: 'var(--space-2xl)' }}>
                <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #059669, #10B981)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-xl)',
                    boxShadow: '0 12px 24px rgba(5, 150, 105, 0.3)',
                }}>
                    <Check size={36} color="white" />
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>¡Reserva Confirmada!</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: 'var(--space-2xl)' }}>
                    Tu pago ha sido procesado correctamente. Recibirás un email de confirmación con todos los detalles de tu estancia.
                </p>

                <div style={{
                    background: 'var(--color-bg-alt)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-xl)',
                    marginBottom: 'var(--space-2xl)',
                    textAlign: 'left',
                }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={18} style={{ color: 'var(--color-accent)' }} /> Próximos pasos
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', padding: 0 }}>
                        {[
                            'Recibirás un email de confirmación en minutos',
                            '48h antes recibirás información de check-in',
                            'Puedes gestionar tu reserva desde tu cuenta',
                            'Cancelación gratuita hasta 48h antes del check-in',
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem' }}>
                                <Check size={16} style={{ color: '#059669', flexShrink: 0, marginTop: 2 }} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/account" className="btn btn-primary">
                        Ver Mis Reservas
                    </Link>
                    <Link href="/" className="btn btn-secondary">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function BookingSuccessPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loading-spinner" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
