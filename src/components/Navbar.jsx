import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navStyle = {
    position: 'fixed',
    top: '1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    width: 'calc(100% - 2.5rem)',
    maxWidth: '1100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    background: scrolled ? 'rgba(13, 13, 18, 0.75)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    border: scrolled ? '1px solid rgba(201, 168, 76, 0.15)' : '1px solid transparent',
    boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
  }

  const logoStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 800,
    fontSize: '1.2rem',
    letterSpacing: '0.15em',
    color: '#C9A84C',
    textDecoration: 'none',
    textTransform: 'uppercase',
  }

  const links = ['Возможности', 'Философия', 'Процесс', 'Тарифы']

  return (
    <nav style={navStyle}>
      <a href="#hero" style={logoStyle}>AURIS</a>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
        ))}
      </div>

      <a href="#pricing" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.75rem' }}>
        <span>Забронировать</span>
      </a>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  )
}