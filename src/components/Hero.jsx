import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80'

export default function Hero() {
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([line1Ref.current, line2Ref.current, subRef.current, ctaRef.current], {
        y: 40, opacity: 0
      })
      gsap.to([line1Ref.current, line2Ref.current, subRef.current, ctaRef.current], {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${HERO_IMAGE}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, #0D0D12 0%, #0D0D12 20%, rgba(13,13,18,0.7) 60%, rgba(13,13,18,0.2) 100%)',
      }} />

      {/* Gold accent line top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
        opacity: 0.6,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '0 2.5rem 5rem',
        maxWidth: '900px',
      }}>
        {/* Badge */}
        <div ref={line1Ref} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem', letterSpacing: '0.15em',
          color: '#C9A84C', textTransform: 'uppercase',
          marginBottom: '1.5rem',
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '9999px',
          padding: '0.4rem 1rem',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#C9A84C', display: 'inline-block',
          }} className="pulse-dot" />
          Голосовой ИИ — Новое поколение
        </div>

        {/* Hero headline */}
        <div ref={line2Ref}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#FAF8F5',
            textTransform: 'uppercase',
          }}>
            Сервис встречает
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            lineHeight: 0.95,
            background: 'linear-gradient(135deg, #C9A84C, #E2C87A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Интеллект.
          </p>
        </div>

        {/* Subline */}
        <p ref={subRef} style={{
          marginTop: '1.75rem',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          color: 'rgba(250,248,245,0.65)',
          maxWidth: '480px',
          lineHeight: 1.65,
          letterSpacing: '0.02em',
        }}>
          Голосовые ИИ-ассистенты AURIS берут на себя клиентский сервис — 24/7, без ошибок, без ожидания.
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#pricing" className="btn-primary">
            <span>Забронировать консультацию</span>
          </a>
          <a href="#возможности" className="btn-outline">
            <span>Узнать больше</span>
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2rem', right: '2.5rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem', letterSpacing: '0.15em',
        color: 'rgba(250,248,245,0.4)',
        textTransform: 'uppercase',
      }}>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, #C9A84C, transparent)',
        }} />
        Скролл
      </div>
    </section>
  )
}