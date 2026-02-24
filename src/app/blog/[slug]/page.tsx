'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPosts } from '@/data/hotels';
import { Clock, ArrowLeft, Share2 } from 'lucide-react';

export default function BlogPostPage() {
    const params = useParams();
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        return (
            <div className="page-content" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Artículo no encontrado</h1>
                    <p style={{ marginBottom: '2rem' }}>El artículo que buscas no existe.</p>
                    <Link href="/blog" className="btn btn-primary">Ir al Blog</Link>
                </div>
            </div>
        );
    }

    const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

    return (
        <div>
            {/* Hero */}
            <div className="page-header" style={{ height: '60vh' }}>
                <div className="page-header-bg" style={{ backgroundImage: `url(${post.image})` }} />
                <div className="page-header-content">
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                        {post.tags.map(t => (
                            <span key={t} className="badge badge-gold">{t}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>{post.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {post.readTime} min lectura</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="section">
                <div className="container" style={{ maxWidth: 800 }}>
                    <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', marginBottom: 'var(--space-2xl)', fontSize: '0.9rem', fontWeight: 500 }}>
                        <ArrowLeft size={16} /> Volver al Blog
                    </Link>

                    <article>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.9, fontWeight: 400, marginBottom: 'var(--space-2xl)', color: 'var(--color-text)' }}>
                            {post.excerpt}
                        </p>

                        <div style={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                {post.content}
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                La industria de la hospitalidad de lujo está experimentando una transformación sin precedentes.
                                Los viajeros modernos ya no buscan simplemente un lugar donde dormir: buscan experiencias transformadoras
                                que les conecten con la cultura local, les permitan desconectar de la rutina y les ofrezcan momentos
                                de auténtico placer sensorial.
                            </p>
                            <h2 style={{ marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>La Evolución del Lujo</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                El concepto de lujo ha evolucionado significativamente en la última década. Lo que antes se definía
                                por la opulencia material —mármoles, dorados y grandes espacios— ahora se mide por la calidad de
                                las experiencias, la autenticidad de las propuestas y la capacidad de generar conexiones significativas
                                con el entorno.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                En Lumière Hotels, hemos abrazado esta filosofía desde nuestros inicios. Cada una de nuestras
                                propiedades cuenta una historia única, enraizada en su contexto geográfico y cultural, pero
                                siempre comprometida con los más altos estándares de servicio y diseño.
                            </p>
                            <h2 style={{ marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>El Futuro es Ahora</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                La integración de la tecnología en la experiencia hotelera es otro de los grandes retos del sector.
                                Desde la visualización 3D de habitaciones antes de la reserva hasta los sistemas inteligentes de
                                personalización, la tecnología debe ser invisible pero tremendamente efectiva.
                            </p>
                        </div>
                    </article>

                    {/* Share */}
                    <div className="divider" />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {post.tags.map(t => (
                                <span key={t} className="badge badge-outline">{t}</span>
                            ))}
                        </div>
                        <button className="btn btn-secondary btn-sm">
                            <Share2 size={14} /> Compartir
                        </button>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">Sigue Leyendo</span>
                        <h2>Artículos Relacionados</h2>
                    </div>
                    <div className="grid-3">
                        {otherPosts.map(p => (
                            <Link href={`/blog/${p.slug}`} key={p.id}>
                                <div className="card" style={{ height: '100%' }}>
                                    <div style={{ overflow: 'hidden' }}>
                                        <img src={p.image} alt={p.title} className="card-img" loading="lazy" />
                                    </div>
                                    <div className="card-body">
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{p.title}</h3>
                                        <p style={{ fontSize: '0.9rem' }}>{p.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
