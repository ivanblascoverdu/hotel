import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>LUMIÈRE</h3>
                        <p>
                            Una colección de hoteles excepcionales donde el lujo se encuentra
                            con la autenticidad. Cada propiedad es una puerta a experiencias
                            únicas en los destinos más codiciados.
                        </p>
                        <div className="footer-social" style={{ marginTop: '1.5rem' }}>
                            <a href="#" aria-label="Instagram">📷</a>
                            <a href="#" aria-label="Facebook">📘</a>
                            <a href="#" aria-label="Twitter">🐦</a>
                            <a href="#" aria-label="LinkedIn">💼</a>
                        </div>
                    </div>

                    <div>
                        <h4>Explora</h4>
                        <div className="footer-links">
                            <Link href="/hotels">Nuestros Hoteles</Link>
                            <Link href="/rooms">Habitaciones</Link>
                            <Link href="/experiences">Experiencias</Link>
                            <Link href="/restaurant">Restaurante & Spa</Link>
                            <Link href="/blog">Blog</Link>
                        </div>
                    </div>

                    <div>
                        <h4>Compañía</h4>
                        <div className="footer-links">
                            <Link href="/about">Sobre Nosotros</Link>
                            <Link href="/contact">Contacto</Link>
                            <Link href="/faq">Preguntas Frecuentes</Link>
                            <Link href="/account">Mi Cuenta</Link>
                            <Link href="/admin">Admin</Link>
                        </div>
                    </div>

                    <div>
                        <h4>Newsletter</h4>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Recibe ofertas exclusivas y novedades
                        </p>
                        <div className="footer-newsletter">
                            <input type="email" className="input" placeholder="tu@email.com" />
                            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>Suscribirse</button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 Lumière Hotels. Todos los derechos reservados.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Privacidad</a>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Términos</a>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
