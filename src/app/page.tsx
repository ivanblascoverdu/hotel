'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { hotels, experiences, reviews } from '@/data/hotels';
import { MapPin, Star, ArrowRight, ChevronDown, Utensils, Waves, Sparkles } from 'lucide-react';

export default function HomePage() {
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef}>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
          }}
        />
        <div className="hero-content">
          <span className="subtitle">Colección de Hoteles de Lujo</span>
          <h1>Experiencias que trascienden lo extraordinario</h1>
          <p>
            Descubre una colección de hoteles donde cada detalle ha sido pensado
            para crear momentos que perduran en la memoria.
          </p>
          <div className="hero-actions">
            <Link href="/booking" className="btn btn-primary btn-lg">
              Reservar Ahora
            </Link>
            <Link href="/hotels" className="btn btn-white btn-lg">
              Explorar Hoteles
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Descubrir</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ===== SEARCH BAR ===== */}
      <div className="container">
        <div className="search-bar reveal">
          <div className="search-field">
            <label>Destino</label>
            <select>
              <option>Todos los destinos</option>
              <option>Barcelona</option>
              <option>Madrid</option>
              <option>Marbella</option>
            </select>
          </div>
          <div className="search-field">
            <label>Entrada</label>
            <input type="date" />
          </div>
          <div className="search-field">
            <label>Salida</label>
            <input type="date" />
          </div>
          <div className="search-field">
            <label>Huéspedes</label>
            <select>
              <option>1 Adulto</option>
              <option>2 Adultos</option>
              <option>2 Adultos + 1 Niño</option>
              <option>2 Adultos + 2 Niños</option>
            </select>
          </div>
          <Link href="/booking" className="btn btn-primary">
            Buscar
          </Link>
        </div>
      </div>

      {/* ===== FEATURED HOTELS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="subtitle">Nuestros Hoteles</span>
            <h2>Destinos Excepcionales</h2>
            <p>
              Cada hotel de nuestra colección ha sido seleccionado por su carácter
              único, su ubicación privilegiada y su compromiso con la excelencia.
            </p>
          </div>

          <div className="grid-3">
            {hotels.map((hotel, i) => (
              <Link href={`/hotels/${hotel.slug}`} key={hotel.id}>
                <div className="hotel-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="hotel-card-img-wrapper">
                    <img src={hotel.image} alt={hotel.name} className="hotel-card-img" loading="lazy" />
                    <div className="hotel-card-badge">
                      <span className="badge badge-gold">{'★'.repeat(hotel.stars)}</span>
                    </div>
                    <div className="hotel-card-price">
                      Desde <strong>€{hotel.priceFrom}</strong>/noche
                    </div>
                  </div>
                  <div className="hotel-card-body">
                    <h3>{hotel.name}</h3>
                    <div className="hotel-card-location">
                      <MapPin size={14} />
                      {hotel.location}
                    </div>
                    <div className="hotel-card-rating">
                      <span className="score">{hotel.rating}</span>
                      <span className="stars">{'★'.repeat(5)}</span>
                      <span className="count">({hotel.reviewCount} reseñas)</span>
                    </div>
                    <div className="hotel-card-amenities">
                      {hotel.amenities.slice(0, 4).map((a) => (
                        <span key={a}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }} className="reveal">
            <Link href="/hotels" className="btn btn-secondary">
              Ver Todos los Hoteles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCES ===== */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="subtitle">Experiencias</span>
            <h2>Momentos Inolvidables</h2>
            <p>
              Más allá del hospedaje, creamos experiencias que despiertan los
              sentidos y enriquecen el alma.
            </p>
          </div>

          <div className="grid-3">
            {experiences.slice(0, 3).map((exp, i) => (
              <div className="card reveal" key={exp.id} style={{ transitionDelay: `${i * 100}ms` }}>
                <div style={{ overflow: 'hidden' }}>
                  <img src={exp.image} alt={exp.title} className="card-img" loading="lazy" />
                </div>
                <div className="card-body">
                  <span className="badge badge-outline" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>{exp.category}</span>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{exp.title}</h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{exp.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Desde €{exp.price}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{exp.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }} className="reveal">
            <Link href="/experiences" className="btn btn-secondary">
              Todas las Experiencias <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY LUMIÈRE ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="subtitle">¿Por Qué Elegirnos?</span>
            <h2>La Diferencia Lumière</h2>
          </div>

          <div className="grid-3">
            {[
              { icon: <Sparkles size={32} />, title: 'Lujo Auténtico', desc: 'Cada hotel ofrece una experiencia genuina que refleja la cultura y el carácter de su destino.' },
              { icon: <Utensils size={32} />, title: 'Gastronomía Excepcional', desc: 'Restaurantes galardonados con estrellas Michelin y experiencias culinarias de autor.' },
              { icon: <Waves size={32} />, title: 'Bienestar Integral', desc: 'Spa de última generación, programas de bienestar holístico y conexión con la naturaleza.' },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-2xl)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--color-bg-alt)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-lg)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: '1.3rem' }}>{item.title}</h3>
                <p style={{ margin: '0 auto' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="subtitle">Testimonios</span>
            <h2>Lo Que Dicen Nuestros Huéspedes</h2>
          </div>

          <div className="grid-3">
            {reviews.slice(0, 3).map((review, i) => (
              <div className="testimonial-card reveal" key={review.id} style={{ transitionDelay: `${i * 100}ms` }}>
                <p>{review.comment}</p>
                <div className="testimonial-author">
                  <div className="avatar">{review.avatar}</div>
                  <div>
                    <div className="name">{review.author}</div>
                    <div className="origin">{review.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER CTA ===== */}
      <section
        className="section"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
          textAlign: 'center',
        }}
      >
        <div className="container reveal">
          <span
            className="subtitle"
            style={{ color: 'var(--color-accent)' }}
          >
            Exclusivo
          </span>
          <h2 style={{ color: 'white', marginBottom: 'var(--space-md)' }}>
            Únete al Mundo Lumière
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              margin: '0 auto var(--space-2xl)',
              maxWidth: 500,
            }}
          >
            Recibe ofertas exclusivas, inspiración de viaje y acceso anticipado
            a experiencias únicas.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-md)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              placeholder="tu@email.com"
              className="input"
              style={{
                flex: 1,
                minWidth: 250,
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'white',
              }}
            />
            <button className="btn btn-primary">Suscribirse</button>
          </div>
        </div>
      </section>
    </div>
  );
}
