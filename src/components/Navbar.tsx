'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, User, LogOut, CalendarDays, Shield } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { data: session, status } = useSession();
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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

    const isAdmin = (session?.user as { role?: string })?.role === 'ADMIN';

    const userInitial = session?.user?.name
        ? session.user.name.charAt(0).toUpperCase()
        : session?.user?.email?.charAt(0).toUpperCase() || '?';

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

                        {/* User Auth Button */}
                        {status === 'loading' ? (
                            <div className="nav-user-skeleton" />
                        ) : session?.user ? (
                            <div className="nav-user-wrapper" ref={userMenuRef}>
                                <button
                                    className="nav-user-btn"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    aria-label="User menu"
                                >
                                    {session.user.image ? (
                                        <img
                                            src={session.user.image}
                                            alt={session.user.name || 'User'}
                                            className="nav-user-avatar"
                                        />
                                    ) : (
                                        <span className="nav-user-initial">{userInitial}</span>
                                    )}
                                </button>

                                {userMenuOpen && (
                                    <div className="nav-user-dropdown">
                                        <div className="nav-user-dropdown-header">
                                            <span className="nav-user-dropdown-name">{session.user.name || 'Usuario'}</span>
                                            <span className="nav-user-dropdown-email">{session.user.email}</span>
                                        </div>
                                        <div className="nav-user-dropdown-divider" />
                                        <Link href="/account" className="nav-user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                            <CalendarDays size={16} />
                                            Mis Reservas
                                        </Link>
                                        {isAdmin && (
                                            <Link href="/admin" className="nav-user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                                <Shield size={16} />
                                                Panel Admin
                                            </Link>
                                        )}
                                        <div className="nav-user-dropdown-divider" />
                                        <button
                                            className="nav-user-dropdown-item nav-user-logout"
                                            onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                                        >
                                            <LogOut size={16} />
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/account" className="nav-login-btn">
                                <User size={16} />
                                <span>Entrar</span>
                            </Link>
                        )}

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

                {/* Mobile Auth Links */}
                {session?.user ? (
                    <>
                        <Link href="/account" className="mobile-menu-user" onClick={closeMenu}>
                            <User size={18} />
                            {session.user.name || 'Mi Cuenta'}
                        </Link>
                        {isAdmin && (
                            <Link href="/admin" onClick={closeMenu}>Panel Admin</Link>
                        )}
                        <button
                            className="mobile-menu-logout"
                            onClick={() => { closeMenu(); signOut({ callbackUrl: '/' }); }}
                        >
                            <LogOut size={18} />
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <Link href="/account" onClick={closeMenu}>
                        <User size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        Iniciar Sesión
                    </Link>
                )}

                <Link href="/booking" className="btn btn-primary" onClick={closeMenu}>Reservar Ahora</Link>
                <button className="theme-toggle" onClick={toggleTheme} style={{ color: 'white' }}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </>
    );
}
