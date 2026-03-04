import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Базовый',
    price: 'от 29 900 ₽',
    period: '/ месяц',
    desc: 'Для малого бизнеса и стартапов.',
    features: ['До 500 звонков в месяц', '1 голосовой сценарий', 'Базовая аналитика', 'Email-поддержка', 'Подключение за 48ч'],
    cta: 'Начать',
    featured: false,
  },
  {
    name: 'Профессиональный',
    price: 'от 89 900 ₽',
    period: '/ месяц',
    desc: 'Для растущих компаний с высокой нагрузкой.',
    features: ['До 5 000 звонков в месяц', '5 голосовых сценариев', 'Расширенная аналитика', 'Интеграция с CRM', 'Приоритетная поддержка 24/7'],
    cta: 'Забронировать консультацию',
    featured: true,
  },
  {
    name: 'Корпоративный',
    price: 'Индивидуально',
    period: '',
    desc: 'Полная кастомизация под ваши процессы.',
    features: ['Неограниченные звонки', 'Любые сценарии', 'Белый лейбл', 'Dedicated менеджер', 'SLA 99.9%'],
    cta: 'Связаться с нами',
    featured: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card', {
        y: 60, opacity: 0,
      }, {
        y: 0, opacity: 1, duration: 0.9,
        stagger: 0.12, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="тарифы" ref={sectionRef} style={{ padding: '7rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
          letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>Тарифы</p>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FAF8F5',
          letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          Выберите свой формат.{' '}
          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#C9A84C' }}>
            Начните сегодня.
          </span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        alignItems: 'center',
      }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="pricing-card"
            style={{
              background: plan.featured ? '#C9A84C' : 'rgba(42, 42, 53, 0.5)',
              border: plan.featured ? 'none' : '1px solid rgba(201, 168, 76, 0.12)',
              borderRadius: '2rem',
              padding: plan.featured ? '3rem 2rem' : '2.5rem 2rem',
              color: plan.featured ? '#0D0D12' : '#FAF8F5',
              backdropFilter: 'blur(12px)',
              boxShadow: plan.featured ? '0 32px 80px rgba(201, 168, 76, 0.3)' : 'none',
              transform: plan.featured ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s',
            }}
          >
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: plan.featured ? 'rgba(13,13,18,0.6)' : 'rgba(201,168,76,0.7)',
              marginBottom: '0.75rem',
            }}>{plan.featured ? '★ Популярный' : 'Тариф'}</p>

            <h3 style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
              fontSize: '1.3rem', marginBottom: '0.5rem',
              letterSpacing: '-0.01em',
            }}>{plan.name}</h3>

            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
              fontSize: '0.82rem',
              color: plan.featured ? 'rgba(13,13,18,0.65)' : 'rgba(250,248,245,0.5)',
              marginBottom: '1.5rem', lineHeight: 1.5,
            }}>{plan.desc}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '2rem' }}>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
                fontSize: '1.8rem', letterSpacing: '-0.03em',
              }}>{plan.price}</p>
              {plan.period && (
                <span style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
                  fontSize: '0.82rem',
                  color: plan.featured ? 'rgba(13,13,18,0.6)' : 'rgba(250,248,245,0.4)',
                }}>{plan.period}</span>
              )}
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={14} style={{ color: plan.featured ? '#0D0D12' : '#C9A84C', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 400,
                    fontSize: '0.82rem',
                    color: plan.featured ? 'rgba(13,13,18,0.8)' : 'rgba(250,248,245,0.75)',
                  }}>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              style={{
                display: 'block', textAlign: 'center',
                padding: '0.875rem 1.5rem',
                borderRadius: '9999px',
                background: plan.featured ? '#0D0D12' : 'transparent',
                border: plan.featured ? 'none' : '1px solid rgba(201,168,76,0.3)',
                color: plan.featured ? '#C9A84C' : '#C9A84C',
                fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                fontSize: '0.8rem', letterSpacing: '0.06em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}