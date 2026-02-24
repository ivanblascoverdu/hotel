'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { blogPosts } from '@/data/hotels';
import { Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
    const scrollRef = useScrollReveal();

    return (
        <div ref={scrollRef}>
            <div className="page-header">
                <div className="page-header-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=80)' }} />
                <div className="page-header-content">
                    <span className="subtitle" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>Inspiración</span>
                    <h1>Blog Lumière</h1>
                    <p>Historias, guías y descubrimientos del mundo del lujo y los viajes</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {/* Featured Post */}
                    <Link href={`/blog/${blogPosts[0].slug}`}>
                        <div className="reveal" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 0,
                            borderRadius: 'var(--radius-xl)',
                            overflow: 'hidden',
                            marginBottom: 'var(--space-3xl)',
                            background: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border-light)',
                            boxShadow: 'var(--shadow-md)',
                            transition: 'all 0.3s ease',
                        }}>
                            <div style={{ overflow: 'hidden' }}>
                                <img src={blogPosts[0].image} alt={blogPosts[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 360, transition: 'transform 0.6s' }} loading="lazy" />
                            </div>
                            <div style={{ padding: 'var(--space-2xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <span className="badge badge-gold" style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>Destacado</span>
                                <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{blogPosts[0].title}</h2>
                                <p style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>{blogPosts[0].excerpt}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                                    <span>{blogPosts[0].author}</span>
                                    <span>•</span>
                                    <span>{new Date(blogPosts[0].date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    <span>•</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {blogPosts[0].readTime} min</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Post Grid */}
                    <div className="grid-3">
                        {blogPosts.slice(1).map((post, i) => (
                            <Link href={`/blog/${post.slug}`} key={post.id}>
                                <div className="card reveal" style={{ transitionDelay: `${i * 100}ms`, height: '100%' }}>
                                    <div style={{ overflow: 'hidden' }}>
                                        <img src={post.image} alt={post.title} className="card-img" loading="lazy" />
                                    </div>
                                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                            {post.tags.map(t => (
                                                <span key={t} className="badge badge-outline">{t}</span>
                                            ))}
                                        </div>
                                        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{post.title}</h3>
                                        <p style={{ fontSize: '0.9rem', flex: 1 }}>{post.excerpt}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                            <span>{post.author}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {post.readTime} min</span>
                                        </div>
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
