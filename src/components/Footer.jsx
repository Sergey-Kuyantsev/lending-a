export default function Footer() {
  const navCols = [
    { title: 'Продукт', links: ['Возможности', 'Интеграции', 'Безопасность', 'Обновления'] },
    { title: 'Компания', links: ['О нас', 'Карьера', 'Пресс-кит', 'Блог'] },
    { title: 'Поддержка', links: ['Документация', 'Статус системы', 'Связаться', 'FAQ'] },
  ]

  return (
    <footer style={{
      background: '#080810',
      borderRadius: '4rem 4rem 0 0',
      padding: '5rem 2rem 3rem',
      marginTop: '4rem',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr repeat(3, auto)',
        gap: '3rem',
      }}>
        {/* Brand */}
        <div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
            fontSize: '1.5rem', letterSpacing: '0.15em',
            color: '#C9A84C', textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>AURIS</p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '0.95rem', color: 'rgba(250,248,245,0.45)',
            maxWidth: '220px', lineHeight: 1.6,
            marginBottom: '1.75rem',
          }}>
            Голос встречает интеллект.
          </p>

          {/* Status indicator */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(74, 222, 128, 0.08)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: '9999px', padding: '0.35rem 0.85rem',
          }}>
            <span className="pulse-dot" style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#4ADE80', display: 'inline-block',
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem', letterSpacing: '0.1em',
              color: '#4ADE80', textTransform: 'uppercase',
            }}>Система активна</span>
          </div>
        </div>

        {/* Nav columns */}
        {navCols.map(col => (
          <div key={col.title}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
              fontSize: '0.72rem', letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,245,0.5)', marginBottom: '1.25rem',
            }}>{col.title}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 400,
                    fontSize: '0.82rem', color: 'rgba(250,248,245,0.55)',
                    textDecoration: 'none',
                    transition: 'color 0.25s, transform 0.25s',
                    display: 'inline-block',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(250,248,245,0.55)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1280px', margin: '3rem auto 0',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(250,248,245,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem', color: 'rgba(250,248,245,0.25)',
          letterSpacing: '0.08em',
        }}>© 2025 AURIS AI. Все права защищены.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Политика конфиденциальности', 'Условия использования', 'Cookies'].map(l => (
            <a key={l} href="#" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem', color: 'rgba(250,248,245,0.25)',
              textDecoration: 'none', letterSpacing: '0.06em',
              transition: 'color 0.25s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(201,168,76,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,248,245,0.25)'}
            >{l}</a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}