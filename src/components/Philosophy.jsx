import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BG_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80'

export default function Philosophy() {
  const sectionRef = useRef(null)
  const neutralRef = useRef(null)
  const boldRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(neutralRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: neutralRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo(boldRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: boldRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="философия"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '9rem 2rem',
        background: '#0D0D12',
        overflow: 'hidden',
      }}
    >
      {/* Parallax texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${BG_IMAGE}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.06,
      }} />

      {/* Gold horizontal rule */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '900px', margin: '0 auto',
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.15em', color: 'rgba(201,168,76,0.7)',
          textTransform: 'uppercase', marginBottom: '2.5rem',
        }}>Философия</p>

        {/* Neutral statement */}
        <div ref={neutralRef} style={{ marginBottom: '2.5rem' }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400, fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: 'rgba(250,248,245,0.45)',
            lineHeight: 1.7,
            borderLeft: '2px solid rgba(201,168,76,0.25)',
            paddingLeft: '1.5rem',
          }}>
            Большинство колл-центров фокусируется на:<br />
            количестве обработанных звонков, скорости ответа<br />
            и снижении операционных затрат.
          </p>
        </div>

        {/* Bold differentiated statement */}
        <div ref={boldRef}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.3rem, 3.5vw, 1.9rem)',
            color: '#FAF8F5', lineHeight: 1.35,
            letterSpacing: '-0.02em',
          }}>
            Мы фокусируемся на:
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic', fontWeight: 700,
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            lineHeight: 1.05,
            background: 'linear-gradient(135deg, #C9A84C, #E2C87A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginTop: '0.25rem',
          }}>
            качестве каждого диалога.
          </p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300, fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'rgba(250,248,245,0.5)',
            marginTop: '1.75rem', maxWidth: '520px', lineHeight: 1.7,
          }}>
            Потому что один грамотный разговор стоит дороже тысячи формальных ответов. AURIS делает каждое обращение точным, живым и результативным.
          </p>
        </div>
      </div>

      {/* Bottom gold rule */}
      <div style={{
        position: 'absolute', bottom: 0, left: '10%', right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />
    </section>
  )
}