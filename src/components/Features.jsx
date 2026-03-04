import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/* ── Card 1: Diagnostic Shuffler ── */
const shufflerItems = [
  { label: 'Живой диалог', desc: 'Естественная речь без скриптов' },
  { label: 'Новая парадигма', desc: 'Клиентский сервис нового уровня' },
  { label: 'Интеллект 24/7', desc: 'Ни одного пропущенного обращения' },
]

function ShufflerCard() {
  const [items, setItems] = useState(shufflerItems)
  const listRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="feature-card" style={{ minHeight: '320px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.12em', color: '#C9A84C', textTransform: 'uppercase',
        }}>01 — Переосмысление</span>
        <h3 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
          fontSize: '1.05rem', color: '#FAF8F5', marginTop: '0.4rem',
          letterSpacing: '-0.01em',
        }}>Переосмыслите клиентский сервис</h3>
      </div>

      <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map((item, i) => (
          <div key={item.label} style={{
            padding: '0.9rem 1.1rem',
            borderRadius: '1rem',
            background: i === 0
              ? 'rgba(201,168,76,0.15)'
              : 'rgba(250,248,245,0.04)',
            border: i === 0
              ? '1px solid rgba(201,168,76,0.35)'
              : '1px solid rgba(250,248,245,0.08)',
            transition: 'all 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: i === 0 ? 'scale(1)' : `scale(${1 - i * 0.025})`,
          }}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
              fontSize: '0.85rem', color: i === 0 ? '#C9A84C' : '#FAF8F5',
            }}>{item.label}</p>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
              fontSize: '0.75rem', color: 'rgba(250,248,245,0.5)',
              marginTop: '0.2rem',
            }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Card 2: Telemetry Typewriter ── */
const feed = [
  'Входящий звонок от клиента #4721...',
  'Анализ запроса: возврат заказа...',
  'Подбор ответа из базы знаний...',
  'Решение сформировано за 0.3с.',
  'Клиент удовлетворён. Звонок завершён.',
  'Новое обращение: технический вопрос...',
  'Идентификация клиента по голосу...',
  'Персонализированный ответ отправлен.',
]

function TypewriterCard() {
  const [lines, setLines] = useState([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentLine = feed[lineIdx % feed.length]
      if (charIdx < currentLine.length) {
        setLines(prev => {
          const next = [...prev]
          if (next.length === 0 || charIdx === 0) {
            next.push(currentLine.slice(0, charIdx + 1))
          } else {
            next[next.length - 1] = currentLine.slice(0, charIdx + 1)
          }
          return next.slice(-5)
        })
        setCharIdx(c => c + 1)
      } else {
        setTimeout(() => {
          setLineIdx(i => i + 1)
          setCharIdx(0)
        }, 1200)
      }
    }, 38)
    return () => clearTimeout(timeout)
  }, [charIdx, lineIdx])

  return (
    <div className="feature-card" style={{ minHeight: '320px' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
            letterSpacing: '0.12em', color: '#C9A84C', textTransform: 'uppercase',
          }}>02 — Поколение</span>
          <h3 style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
            fontSize: '1.05rem', color: '#FAF8F5', marginTop: '0.4rem',
          }}>ИИ-ассистент нового поколения</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="pulse-dot" style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#4ADE80', display: 'inline-block',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
            color: '#4ADE80', letterSpacing: '0.1em',
          }}>LIVE</span>
        </div>
      </div>

      <div style={{
        background: 'rgba(13,13,18,0.6)', borderRadius: '0.75rem',
        padding: '1rem', fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.72rem', minHeight: '160px',
        border: '1px solid rgba(250,248,245,0.06)',
      }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            color: i === lines.length - 1 ? '#C9A84C' : 'rgba(250,248,245,0.4)',
            marginBottom: '0.3rem', lineHeight: 1.5,
            transition: 'color 0.3s',
          }}>
            <span style={{ color: 'rgba(201,168,76,0.4)', marginRight: '0.5rem' }}>›</span>
            {line}
            {i === lines.length - 1 && (
              <span className="blink-cursor" style={{
                display: 'inline-block', width: '2px', height: '0.85em',
                background: '#C9A84C', marginLeft: '2px', verticalAlign: 'text-bottom',
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Card 3: Cursor Protocol Scheduler ── */
const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function SchedulerCard() {
  const [activeDay, setActiveDay] = useState(null)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const seq = async () => {
      setPhase(0); setActiveDay(null)
      await delay(800)
      for (let i = 0; i < 5; i++) {
        setActiveDay(i)
        await delay(500)
      }
      setPhase(1)
      await delay(1200)
      setPhase(0); setActiveDay(null)
      await delay(1500)
    }
    const run = () => seq().then(run)
    run()
    return () => { }
  }, [])

  return (
    <div className="feature-card" style={{ minHeight: '320px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.12em', color: '#C9A84C', textTransform: 'uppercase',
        }}>03 — Автоматизация</span>
        <h3 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
          fontSize: '1.05rem', color: '#FAF8F5', marginTop: '0.4rem',
        }}>Автоматизация клиентского сервиса</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.35rem', marginBottom: '1rem' }}>
        {days.map((d, i) => (
          <div key={d} style={{
            textAlign: 'center',
            padding: '0.5rem 0.1rem',
            borderRadius: '0.5rem',
            background: activeDay === i
              ? 'rgba(201,168,76,0.2)'
              : 'rgba(250,248,245,0.04)',
            border: activeDay === i
              ? '1px solid rgba(201,168,76,0.5)'
              : '1px solid rgba(250,248,245,0.08)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: activeDay === i ? 'scale(0.95)' : 'scale(1)',
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: activeDay === i ? '#C9A84C' : 'rgba(250,248,245,0.5)',
            }}>{d}</p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem', fontWeight: 700,
              color: activeDay === i ? '#C9A84C' : '#FAF8F5',
              marginTop: '0.2rem',
            }}>∞</p>
          </div>
        ))}
      </div>

      <div style={{
        padding: '0.75rem 1rem', borderRadius: '0.75rem',
        background: phase === 1 ? 'rgba(201,168,76,0.2)' : 'rgba(250,248,245,0.04)',
        border: phase === 1 ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(250,248,245,0.08)',
        transition: 'all 0.4s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
          fontSize: '0.82rem',
          color: phase === 1 ? '#C9A84C' : 'rgba(250,248,245,0.5)',
        }}>Сохранить расписание</span>
        <span style={{ color: phase === 1 ? '#C9A84C' : 'rgba(250,248,245,0.2)', fontSize: '1rem' }}>✓</span>
      </div>
    </div>
  )
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

/* ── Section ── */
export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card', {
        y: 60, opacity: 0,
      }, {
        y: 0, opacity: 1, duration: 0.9,
        stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="возможности" ref={sectionRef} style={{ padding: '7rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
          letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>Возможности</p>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FAF8F5',
          letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          Три инструмента.<br />
          <span style={{
            fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
            color: '#C9A84C',
          }}>Один стандарт.</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        <ShufflerCard />
        <TypewriterCard />
        <SchedulerCard />
      </div>
    </section>
  )
}