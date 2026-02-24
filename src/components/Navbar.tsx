'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    const navItems = [
        { href: '/hotels', label: 'Hoteles' },
        { href: '/rooms', label: 'Habitaciones' },
        { href: '/experiences', label: 'Experiencias' },
        { href: '/restaurant', label: 'Restaurante & Spa' },
        { href: '/blog', label: 'Blog' },
        { href: '/about', label: 'Nosotros' },
        { href: '/contact', label: 'Contacto' },
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <Link href="/" className="nav-logo">LUMIÈRE</Link>

                    <div className="nav-links">
                        {navItems.map(item => (
                            <Link key={item.href} href={item.href}>{item.label}</Link>
                        ))}
                    </div>

                    <div className="nav-actions">
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <Link href="/booking" className="nav-cta">Reservar</Link>
                        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                            {menuOpen ? <X size={24} color={scrolled ? 'var(--color-text)' : '#fff'} /> : (
                                <>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                {navItems.map(item => (
                    <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>
                ))}
                <Link href="/booking" className="btn btn-primary" onClick={closeMenu}>Reservar Ahora</Link>
                <button className="theme-toggle" onClick={toggleTheme} style={{ color: 'white' }}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </>
    );
}
