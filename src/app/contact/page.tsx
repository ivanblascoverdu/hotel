'use client';

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
    const scrollRef = useScrollReveal();
    const [sent, setSent] = useState(false);

    return (
        <div ref={scrollRef}>
            <div className="page-header">
                <div className="page-header-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1920&q=80)' }} />
                <div className="page-header-content">
                    <span className="subtitle" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>Contacto</span>
                    <h1>Ponte en Contacto</h1>
                    <p>Estamos aquí para hacer de tu estancia una experiencia perfecta</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3xl)' }}>
                        {/* Contact Form */}
                        <div className="reveal">
                            <h2 style={{ marginBottom: 'var(--space-md)' }}>Escríbenos</h2>
                            <p style={{ marginBottom: 'var(--space-2xl)' }}>
                                Completa el formulario y nuestro equipo te responderá en menos de 24 horas.
                            </p>

                            {sent ? (
                                <div style={{ padding: 'var(--space-2xl)', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
                                    <h3>¡Mensaje Enviado!</h3>
                                    <p style={{ marginTop: '0.5rem' }}>Te responderemos en las próximas 24 horas.</p>
                                </div>
                            ) : (
                                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                        <div className="input-group">
                                            <label>Nombre</label>
                                            <input className="input" placeholder="Tu nombre" required />
                                        </div>
                                        <div className="input-group">
                                            <label>Apellidos</label>
                                            <input className="input" placeholder="Tus apellidos" required />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label>Email</label>
                                        <input type="email" className="input" placeholder="tu@email.com" required />
                                    </div>
                                    <div className="input-group">
                                        <label>Teléfono</label>
                                        <input type="tel" className="input" placeholder="+34 600 000 000" />
                                    </div>
                                    <div className="input-group">
                                        <label>Asunto</label>
                                        <select className="select">
                                            <option>Información general</option>
                                            <option>Reservas</option>
                                            <option>Eventos corporativos</option>
                                            <option>Prensa</option>
                                            <option>Colaboraciones</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Mensaje</label>
                                        <textarea className="textarea" placeholder="¿En qué podemos ayudarte?" rows={5} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Enviar Mensaje <Send size={16} />
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="reveal" style={{ transitionDelay: '200ms' }}>
                            <h2 style={{ marginBottom: 'var(--space-2xl)' }}>Información</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
                                {[
                                    { icon: <Mail size={20} />, title: 'Email', info: 'reservas@lumierehotels.com', sub: 'info@lumierehotels.com' },
                                    { icon: <Phone size={20} />, title: 'Teléfono', info: '+34 900 123 456', sub: 'Lun - Dom, 8:00 - 22:00' },
                                    { icon: <MapPin size={20} />, title: 'Oficina Central', info: 'Paseo de Gracia, 120', sub: '08008 Barcelona, España' },
                                    { icon: <Clock size={20} />, title: 'Horario Atención', info: 'Lunes a Viernes: 8:00 - 22:00', sub: 'Fines de semana: 9:00 - 21:00' },
                                ].map(item => (
                                    <div key={item.title} style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginBottom: '0.1rem' }}>{item.info}</p>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map */}
                            <div style={{ marginTop: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 300 }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d2.1734!3d41.3851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Oficina central Lumière Hotels"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
