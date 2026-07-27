import { useState, useEffect, useCallback } from 'react'

// ─── Custom Hook: Detektor Layar HP ───────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize() // Cek saat pertama kali dimuat
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMobile
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const G   = '#39FF14'
const BG  = '#0D1117'
const C1  = '#161B22'   // card surface
const C2  = '#1C2128'   // card elevated / hover
const BD  = '#21262D'   // border
const T1  = '#E6EDF3'   // text primary
const T2  = '#7D8590'   // text secondary
const T3  = '#484F58'   // text muted

// ─── ASCII Silhouette ─────────────────────────────────────────────────────────
const SHAPE: string[] = [
  '                XXXXXXXX                ',
  '              XXXXXXXXXXXX              ',
  '             XXXXXXXXXXXXXX             ',
  '             XXXXXXXXXXXXXX             ',
  '              XXXXXXXXXXXX              ',
  '                XXXXXXXX                ',
  '                  XXXX                  ',
  '                  XXXX                  ',
  '       XXXXXXXXXXXXXXXXXXXXXXXXXXXX       ',
  '        XXXXXXXXXXXXXXXXXXXXXXXXXX        ',
  '         XXXXXXXXXXXXXXXXXXXXXXXX         ',
  '          XXXXXXXXXXXXXXXXXXXXXX          ',
  '          XXXXXXXXXXXXXXXXXXXXXX          ',
  '           XXXXXXXXXXXXXXXXXXXX           ',
  '            XXXXXXXXXXXXXXXXXX            ',
  '             XXXXXXXXXXXXXXXX             ',
  '             XXXXXXXXXXXXXXXX             ',
  '             XXXXXXXXXXXXXXXX             ',
  '              XXXXXXXXXXXXXX              ',
  '              XXXXXXXXXXXXXX              ',
  '               XXXXX  XXXXX               ',
  '               XXXXX  XXXXX               ',
  '               XXXXX  XXXXX               ',
  '               XXXXX  XXXXX               ',
  '               XXXXX  XXXXX               ',
  '               XXXXX  XXXXX               ',
  '               XXXXX  XXXXX               ',
  '               XXXXX  XXXXX               ',
  '              XXXXXX  XXXXXX              ',
]

const CODE = '01{}[]<>/\\|;:=+-#$@&*~^_░▒'

type Cell = { ch: string; b: number }

const initGrid = (): Cell[][] =>
  SHAPE.map(row =>
    Array.from(row).map(c =>
      c === ' '
        ? { ch: ' ', b: 0 }
        : { ch: CODE[Math.floor(Math.random() * CODE.length)], b: 0.35 + Math.random() * 0.65 }
    )
  )

function AsciiSilhouette() {
  const [grid, setGrid] = useState(initGrid)

  useEffect(() => {
    const t = setInterval(() => {
      setGrid(g =>
        g.map(row =>
          row.map(cell =>
            cell.ch === ' ' || Math.random() > 0.25
              ? cell
              : { ch: CODE[Math.floor(Math.random() * CODE.length)], b: 0.2 + Math.random() * 0.8 }
          )
        )
      )
    }, 110)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10.5px',
        lineHeight: '1.22',
        userSelect: 'none',
        letterSpacing: '0',
      }}
    >
      {grid.map((row, ri) => (
        <div key={ri} style={{ display: 'flex' }}>
          {row.map((cell, ci) =>
            cell.ch === ' ' ? (
              <span key={ci} style={{ display: 'inline-block', width: '6.3px' }}> </span>
            ) : (
              <span
                key={ci}
                style={{
                  display: 'inline-block',
                  width: '6.3px',
                  color: `rgba(57,255,20,${cell.b})`,
                  textShadow:
                    cell.b > 0.6
                      ? `0 0 6px rgba(57,255,20,${cell.b * 0.8}),0 0 14px rgba(57,255,20,${cell.b * 0.35})`
                      : `0 0 4px rgba(57,255,20,${cell.b * 0.5})`,
                }}
              >
                {cell.ch}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const tech = [
  { name: 'Linux (Ubuntu/Kali)', color: '#FCC624' },
  { name: 'Python & Java',       color: '#3776AB' },
  { name: 'Docker',              color: '#2496ED' },
  { name: 'GitHub Actions',      color: '#2088FF' },
  { name: 'MikroTik',            color: '#00A65A' },
  { name: 'Grafana',             color: '#F46800' },
  { name: 'Uptime Kuma',         color: '#52C41A' },
  { name: 'Nginx',               color: '#009639' },
  { name: 'IP Routing & VLAN',   color: '#1BA0D7' },
  { name: 'Firewall & Port Map', color: '#E6522C' },
  { name: 'IoT (ESP32/MQTT)',    color: '#7B42BC' },
  { name: 'Git',                 color: '#F05032' },
  { name: 'CI/CD Pipelines',      color: '#2496ED' },
  { name: 'Kubernetes',            color: '#326CE5' },
]

const experience = [
  {
    company:   'PT. Quantum Tera Network',
    role:      'Network Operation Center (NOC)',
    period:    'December 2025 — Present',
    branch:    'main',
    color:     '#F6821F',
    current:   true,
    tags:      ['MikroTik', 'VLAN', 'IP Routing', 'Troubleshooting'],
    blurb:     'Monitoring network infrastructure, handling trouble tickets, and configuring devices using MikroTik including VLAN implementation and IP routing.',
  },
  {
    company:   'Jaya Integrasi Nusantara',
    role:      'DevOps Engineer',
    period:    'October 2024 — November 2025',
    branch:    'feat/ci-cd',
    color:     '#2496ED',
    current:   false,
    tags:      ['Docker', 'GitHub Actions', 'Grafana', 'Server Consolidation'],
    blurb:     'Deployed applications using Docker & GitHub Actions. Managed the consolidation of 3 servers into a single server with conflict-free port mapping, and monitored services utilizing Grafana and Uptime Kuma.',
  },
  {
    company:   'PT. Gading Bhakti Utama',
    role:      'Field Work Practice (Internship)',
    period:    'May 2023 — July 2023',
    branch:    'feat/install',
    color:     '#E4002B',
    current:   false,
    tags:      ['Networking', 'Hardware Install', 'Config'],
    blurb:     'Responsible for network installation and assisting in the physical setup and configuration of system devices.',
  },
]

// Activity grid (fake GitHub contributions)
const buildActivity = () =>
  Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.random())
  )

const ACTIVITY = buildActivity()

const actColor = (v: number) => {
  if (v < 0.25) return '#161B22'
  if (v < 0.5)  return 'rgba(57,255,20,0.25)'
  if (v < 0.75) return 'rgba(57,255,20,0.55)'
  return 'rgba(57,255,20,0.85)'
}

// ─── Card shell ───────────────────────────────────────────────────────────────
function Card({
  children,
  style,
  hover = false,
  id,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  hover?: boolean
  id?: string
}) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()
  
  return (
    <div
      id={id}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: C1,
        border: `1px solid ${hovered ? '#30363D' : BD}`,
        borderRadius: '16px',
        padding: isMobile ? '24px' : '32px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 0 0 1px rgba(57,255,20,0.06)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.65rem',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: T3,
      marginBottom: '20px',
    }}>
      {children}
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile()
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '0 16px' : '0 32px',
      background: scrolled ? 'rgba(13,17,23,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${BD}` : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', display: 'flex', gap: 4 }}>
        <span style={{ color: T3 }}>~/</span>
        <span style={{ color: G }}>arya.ryan</span>
      </div>
      <nav style={{ display: 'flex', gap: isMobile ? 12 : 28 }}>
        {['stack', 'experience', 'contact'].map(s => (
          <a key={s} href={`#${s}`} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            color: T3, textDecoration: 'none', transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = T1)}
          onMouseLeave={e => (e.currentTarget.style.color = T3)}
          >
            {s}
          </a>
        ))}
      </nav>
    </header>
  )
}

// ─── Hero card ────────────────────────────────────────────────────────────────
function HeroCard() {
  const isMobile = useIsMobile()
  const stats = [
    { v: '3+',   l: 'years exp' },
    { v: '3 Certs',   l: 'certified' },
    { v: '100%', l: 'uptime SLA'  },
    { v: '3 to 1',   l: 'server migration' },
  ]

  return (
    <Card style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        minHeight: 480,
      }}>
        {/* Left – text */}
        <div style={{ padding: isMobile ? '32px 24px' : '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <span style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%', background: G,
                  animation: 'pulse-ring 1.8s ease-out infinite',
                }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: G, display: 'block', position: 'relative' }} />
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: G, letterSpacing: '0.12em' }}>
                AVAILABLE FOR SENIOR ROLES
              </span>
            </div>

            <h1 style={{
              margin: '0 0 6px',
              fontSize: isMobile ? '2.4rem' : 'clamp(2.6rem, 3.5vw, 3.8rem)',
              fontWeight: 800,
              color: T1,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}>
              Arya Ryan<br/>Akbar Fadillah
            </h1>

            <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: T2 }}>
                DevOps Engineer
              </span>
              <span style={{ color: BD }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: T3 }}>
                Network Operation Center
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: T2, lineHeight: 1.72, maxWidth: 360, margin: '0 0 32px' }}>
              Bridging the gap between automated server infrastructure and real-time network operations. Passionate about AI integration and seamless CI/CD pipelines.
            </p>
          </div>

          {/* Stats */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12, marginBottom: 28 }}>
              {stats.map(s => (
                <div key={s.l} style={{ borderTop: `1px solid ${BD}`, paddingTop: 12 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: T1 }}>{s.v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: T3, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="#experience" style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.76rem',
                color: '#0D1117', background: G,
                padding: '9px 20px', borderRadius: 8,
                textDecoration: 'none', fontWeight: 700, letterSpacing: '0.04em',
                boxShadow: `0 0 18px rgba(57,255,20,0.35)`,
                transition: 'box-shadow 0.2s',
                textAlign: 'center', flex: isMobile ? '1' : 'none'
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(57,255,20,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 18px rgba(57,255,20,0.35)')}
              >
                View experience
              </a>
              <a href="#contact" style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.76rem',
                color: T2, border: `1px solid ${BD}`,
                padding: '9px 20px', borderRadius: 8,
                textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s',
                textAlign: 'center', flex: isMobile ? '1' : 'none'
              }}
              onMouseEnter={e => { e.currentTarget.style.color = T1; e.currentTarget.style.borderColor = '#30363D' }}
              onMouseLeave={e => { e.currentTarget.style.color = T2; e.currentTarget.style.borderColor = BD }}
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        {/* Right – ASCII silhouette */}
        <div style={{
          background: '#0a0d0a',
          borderLeft: isMobile ? 'none' : `1px solid ${BD}`,
          borderTop: isMobile ? `1px solid ${BD}` : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? 320 : 'auto',
          padding: isMobile ? '24px 0' : 0,
        }}>
          {/* Ambient glow behind silhouette */}
          <div style={{
            position: 'absolute',
            width: 260, height: 320,
            background: 'radial-gradient(ellipse, rgba(57,255,20,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Subtle grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(57,255,20,0.025) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(57,255,20,0.025) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }} />
          {/* Scanline overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
            pointerEvents: 'none',
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <AsciiSilhouette />
          </div>
          
          {/* Terminal line at bottom */}
          <div style={{
            position: 'absolute', bottom: 18, left: 20, right: 20,
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(57,255,20,0.35)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span>root@homelab:~$</span>
            <span style={{ color: 'rgba(57,255,20,0.6)' }}>./run --silent</span>
            <span className="cursor" style={{ width: 6, height: 12, background: 'rgba(57,255,20,0.6)', display: 'inline-block', verticalAlign: 'middle', borderRadius: 1 }} />
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Tech Stack card ──────────────────────────────────────────────────────────
function TechCard() {
  const [hov, setHov] = useState<number | null>(null)
  const isMobile = useIsMobile()
  
  return (
    <Card id="stack">
      <Label>// tech.stack</Label>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 6 }}>
        {tech.map((t, i) => (
          <div
            key={t.name}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 10px', borderRadius: 8,
              background: hov === i ? C2 : 'transparent',
              transition: 'background 0.15s',
              cursor: 'default',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
              background: t.color,
              boxShadow: hov === i ? `0 0 8px ${t.color}` : 'none',
              transition: 'box-shadow 0.15s',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: hov === i ? T1 : T2,
              transition: 'color 0.15s',
            }}>
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── Experience / Git Timeline card ───────────────────────────────────────────
function ExperienceCard() {
  const [open, setOpen] = useState<number>(0)

  return (
    <Card id="experience">
      <Label>// git log --graph --oneline</Label>

      {/* Branch header */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: T3, marginBottom: 20, paddingLeft: 20 }}>
        * HEAD → <span style={{ color: G }}>main</span>, origin/main
      </div>

      {/* Kontainer utama dengan padding kiri 28px */}
      <div style={{ position: 'relative', paddingLeft: 28 }}>
        
        {/* Main branch line (Posisi X: 8px, Lebar: 2px. Titik tengahnya = 9px) */}
        <div style={{
          position: 'absolute', left: 8, top: 6, bottom: 6,
          width: 2,
          background: `linear-gradient(to bottom, ${G}, rgba(57,255,20,0.2))`,
        }} />

        {experience.map((e, i) => (
          <div key={e.company} style={{ position: 'relative', marginBottom: i < experience.length - 1 ? 24 : 0 }}>
            
            {/* Commit dot (Diposisikan agar titik tengahnya tepat di 9px juga!) */}
            <div style={{
              position: 'absolute', left: -19, top: 16,
              width: 14, height: 14, borderRadius: '50%',
              border: `2px solid ${e.color}`,
              background: e.current ? e.color : BG,
              boxShadow: e.current ? `0 0 10px ${e.color}80` : 'none',
              zIndex: 1,
              transform: 'translateX(-50%)', 
            }} />

            {/* Card */}
            <div
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                background: open === i ? C2 : 'transparent',
                border: `1px solid ${open === i ? '#30363D' : 'transparent'}`,
                borderRadius: 10, padding: '14px 16px',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e2 => { if (open !== i) e2.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
              onMouseLeave={e2 => { if (open !== i) e2.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: T1 }}>{e.company}</span>
                    {e.current && (
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                        color: '#0D1117', background: G,
                        padding: '2px 7px', borderRadius: 4, fontWeight: 700,
                      }}>CURRENT</span>
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: e.color }}>{e.role}</div>
                </div>
                <div style={{ textAlign: 'left', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: T3 }}>{e.period}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: T3, opacity: 0.6, marginTop: 2 }}>
                    ⎇ {e.branch}
                  </div>
                </div>
              </div>

              {open === i && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BD}` }}>
                  <p style={{ fontSize: '0.83rem', color: T2, lineHeight: 1.7, margin: '0 0 12px' }}>{e.blurb}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {e.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: e.color, background: `${e.color}14`,
                        border: `1px solid ${e.color}28`,
                        padding: '3px 9px', borderRadius: 5,
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Root commit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20, paddingLeft: 4 }}>
          <div style={{
            position: 'absolute', left: 4, width: 10, height: 10, borderRadius: '50%',
            background: '#21262D', border: `1px solid ${T3}`,
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: T3 }}>
            a1b2c3d  Init: began networking studies at SMK Plus Pratama Adi (2022)
          </span>
        </div>
      </div>
    </Card>
  )
}

// ─── Status card ──────────────────────────────────────────────────────────────
function StatusCard() {
  return (
    <Card hover style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200 }}>
      <div>
        <Label>// status</Label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%', background: G,
              animation: 'pulse-ring 2s ease-out infinite',
            }} />
            <span style={{ display: 'block', width: 10, height: 10, borderRadius: '50%', background: G, position: 'relative' }} />
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: G }}>Open to work</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: T2, lineHeight: 1.65, margin: 0 }}>
          Passionate about building automated CI/CD pipelines and maintaining reliable network infrastructure.
        </p>
      </div>
      <div style={{ marginTop: 20, borderTop: `1px solid ${BD}`, paddingTop: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: T3 }}>Preferred location</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: T2, marginTop: 4 }}>Bandung · Tangerang · Remote</div>
      </div>
    </Card>
  )
}

// ─── Activity card ────────────────────────────────────────────────────────────
function ActivityCard() {
  return (
    <Card hover>
      <Label>// contributions — past year</Label>
      <div style={{ display: 'flex', gap: 3, flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '8px' }}>
        {ACTIVITY.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {week.map((v, di) => (
              <div
                key={di}
                style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: actColor(v),
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: T3 }}>
        Contributions — Docker, GitHub Actions, MikroTik, Python
      </div>
    </Card>
  )
}

// ─── Contact card ─────────────────────────────────────────────────────────────
// ─── Contact card ─────────────────────────────────────────────────────────────
function ContactCard() {
  const links = [
    { label: 'email',    value: 'aryaryan711@gmail.com',  url: 'mailto:aryaryan711@gmail.com', color: G },
    { label: 'github',   value: 'github.com/Aryaraf',     url: 'https://github.com/Aryaraf', color: T2 },
    { label: 'linkedin', value: '/in/arya-ryan-akbar-fadillah',           url: 'https://www.linkedin.com/in/arya-ryan-akbar-fadillah', color: T2 },
    { label: 'whatsapp', value: '+62 8956 0771 7000',     url: 'https://wa.me/62895607717000', color: T2 },
  ]
  return (
    <Card id="contact" hover style={{ minHeight: '100%' }}>
      <Label>// contact</Label>
      <h3 style={{ margin: '0 0 20px', fontSize: '1.15rem', fontWeight: 700, color: T1, lineHeight: 1.4 }}>
        Let's build something{' '}
        <span style={{ color: G }}>resilient.</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map(l => (
          <div key={l.label}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: T3, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
              {l.label}
            </div>
            <a 
              href={l.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.73rem',
                color: l.color, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <span style={{ color: T3 }}>→</span>
              {l.value}
            </a>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── Certs card ───────────────────────────────────────────────────────────────
function CertsCard() {
  const certs = [
    { name: 'MTCNA — MikroTik Certified Network Associate', issuer: 'MikroTik', year: 'Valid', color: '#00A65A' },
    { name: 'CSCU — Certified Secure Computer User', issuer: 'EC-Council', year: 'Valid', color: '#E4002B' },
    { name: 'Computer Competency Test Certificate', issuer: 'BNSP/SMK', year: 'Valid', color: '#FCC624' },
    { name: 'English Proficiency Certificate', issuer: 'Institution', year: 'Valid', color: '#2496ED' },
  ]
  return (
    <Card hover>
      <Label>// certifications</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {certs.map(c => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: `${c.color}18`, border: `1px solid ${c.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: c.color, fontWeight: 700,
            }}>
              {c.issuer.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: T1, lineHeight: 1.3 }}>{c.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: T3, marginTop: 2 }}>
                {c.issuer} · {c.year}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── App Main Layout ──────────────────────────────────────────────────────────
export default function App() {
  const isMobile = useIsMobile() // <-- Deteksi layar HP dipanggil di sini!

  return (
    <div style={{ background: BG, minHeight: '100vh', color: T1 }}>
      <Nav />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '80px 16px 40px' : '80px 24px 60px' }}>
        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)',
          gap: 16,
        }}>

          {/* Row 1: Hero — full width */}
          <div style={{ gridColumn: '1 / -1' }}>
            <HeroCard />
          </div>

          {/* Row 2: Tech Stack + Experience */}
          <div style={{ gridColumn: isMobile ? '1 / -1' : '1 / 6' }}>
            <TechCard />
          </div>
          <div style={{ gridColumn: isMobile ? '1 / -1' : '6 / 13' }}>
            <ExperienceCard />
          </div>

          {/* Row 3: Status + Activity + Contact */}
          <div style={{ gridColumn: isMobile ? '1 / -1' : '1 / 4' }}>
            <StatusCard />
          </div>
          <div style={{ gridColumn: isMobile ? '1 / -1' : '4 / 9', overflow: 'hidden' }}>
            <ActivityCard />
          </div>
          <div style={{ gridColumn: isMobile ? '1 / -1' : '9 / 13' }}>
            <ContactCard />
          </div>

          {/* Row 4: Certifications (full width) */}
          <div style={{ gridColumn: '1 / -1' }}>
            <CertsCard />
          </div>

        </div>

        {/* Footer */}
        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: `1px solid ${BD}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: T3 }}>
            © 2026 Arya Ryan Akbar Fadillah. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: T3 }}>
            <span style={{ color: G, opacity: 0.5 }}>●</span> All systems nominal
          </span>
        </div>
      </main>
    </div>
  )
}