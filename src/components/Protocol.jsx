import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Интеграция',
    desc: 'AURIS подключается к вашей телефонии, CRM и базе знаний за 48 часов. Никакого сложного кода — только конфигурация.',
    bg: '#1A1A24',
    accent: '#C9A84C',
    Canvas: HelixCanvas,
  },
  {
    num: '02',
    title: 'Обучение',
    desc: 'ИИ изучает специфику вашего бизнеса: продукты, скрипты, тональность бренда. Чем больше диалогов — тем точнее ассистент.',
    bg: '#2A2A35',
    accent: '#E2C87A',
    Canvas: ScanCanvas,
  },
  {
    num: '03',
    title: 'Автоматизация',
    desc: 'AURIS берёт на себя входящие звонки, обращения в мессенджерах и чатах. Вы получаете аналитику в реальном времени.',
    bg: '#1E1E2A',
    accent: '#C9A84C',
    Canvas: WaveCanvas,
  },
]

/* ── Canvas 1: Rotating Helix ── */
function HelixCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0
    const draw = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const r = Math.min(cx, cy) * 0.7

      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2 + t
        const x1 = cx + Math.cos(angle) * r
        const y1 = cy + Math.sin(angle) * r * 0.35
        const x2 = cx + Math.cos(angle + Math.PI) * r
        const y2 = cy + Math.sin(angle + Math.PI) * r * 0.35
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        const alpha = 0.05 + 0.25 * Math.abs(Math.sin(angle))
        ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      // outer ring
      ctx.beginPath()
      ctx.ellipse(cx, cy, r, r * 0.35, t * 0.3, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      t += 0.008
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

/* ── Canvas 2: Laser Scan ── */
function ScanCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, scanY = 0
    const COLS = 12, ROWS = 8

    const draw = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cw = canvas.width, ch = canvas.height
      const dotW = cw / COLS, dotH = ch / ROWS

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * dotW + dotW / 2
          const y = r * dotH + dotH / 2
          const dist = Math.abs(y - scanY)
          const alpha = Math.max(0, 0.5 - dist / 60) * 0.9 + 0.06
          ctx.beginPath()
          ctx.arc(x, y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`
          ctx.fill()
        }
      }

      // scan line
      const grad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20)
      grad.addColorStop(0, 'rgba(201,168,76,0)')
      grad.addColorStop(0.5, 'rgba(201,168,76,0.6)')
      grad.addColorStop(1, 'rgba(201,168,76,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 20, cw, 40)

      scanY = (scanY + 1.2) % ch
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

/* ── Canvas 3: EKG Waveform ── */
function WaveCanvas() {
  const svgRef = useRef(null)
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const path = svg.querySelector('path')
    const len = path.getTotalLength()
    path.style.strokeDasharray = len
    path.style.strokeDashoffset = len
    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.8,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 400 120" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
      <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(201,168,76,0.1)" strokeWidth="1" />
      <path
        d="M0,60 L50,60 L70,60 L85,10 L95,110 L110,60 L130,60 L150,60 L165,25 L175,95 L185,60 L210,60 L230,60 L245,15 L255,105 L265,60 L290,60 L310,60 L325,30 L335,90 L345,60 L370,60 L400,60"
        stroke="#C9A84C"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Protocol Card ── */
function ProtocolCard({ step, index }) {
  return (
    <div
      className={`protocol-step-${index}`}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: step.bg,
        borderRadius: '2rem 2rem 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Canvas background */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '3rem',
        opacity: 0.7,
      }}>
        <step.Canvas />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '600px', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem', letterSpacing: '0.2em',
          color: step.accent, textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>{step.num} — Шаг</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic', fontWeight: 700,
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          color: '#FAF8F5', lineHeight: 1.1,
          marginBottom: '1.5rem',
        }}>{step.title}</h2>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
          color: 'rgba(250,248,245,0.65)',
          lineHeight: 1.7, maxWidth: '420px', margin: '0 auto',
        }}>{step.desc}</p>
      </div>
    </div>
  )
}

export default function Protocol() {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = wrapperRef.current.querySelectorAll('[class^="protocol-step-"]')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress
            gsap.set(card, {
              scale: 1 - p * 0.1,
              filter: `blur(${p * 8}px)`,
              opacity: 1 - p * 0.5,
            })
          }
        })
      })
    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="процесс" style={{ background: '#0D0D12' }}>
      <div style={{ textAlign: 'center', padding: '5rem 2rem 3rem' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
          letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>Процесс</p>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FAF8F5',
          letterSpacing: '-0.02em',
        }}>
          Три шага до{' '}
          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#C9A84C' }}>
            автоматизации
          </span>
        </h2>
      </div>
      <div ref={wrapperRef}>
        {steps.map((s, i) => <ProtocolCard key={s.num} step={s} index={i} />)}
      </div>
    </section>
  )
}