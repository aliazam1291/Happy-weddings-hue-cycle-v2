'use client'

const services = [
  {
    num: '01',
    title: 'Full-Day Coordination',
    desc: 'From sunrise setup to the last dance — we orchestrate every moment with quiet precision.',
  },
  {
    num: '02',
    title: 'Floral & Décor',
    desc: 'Bespoke botanical installations crafted from rare blooms, draped in your chosen palette.',
  },
  {
    num: '03',
    title: 'Venue Curation',
    desc: 'Access to 200+ exclusive venues across India — heritage palaces, garden estates, and coastal retreats.',
  },
  {
    num: '04',
    title: 'Guest Experience',
    desc: 'Curated welcome kits, bespoke menus, and seamless hospitality for every guest.',
  },
]

export default function ServicesSection() {
  return (
    <section
      className="relative w-full"
      style={{
        background: 'var(--warm-white)',
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 100px)',
      }}
    >
      {/* Section label */}
      <p
        className="mb-16 tracking-widest uppercase"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(10px, 1vw, 12px)',
          color: 'var(--dusty-rose)',
          letterSpacing: '0.4em',
        }}
      >
        Our Services
      </p>

      {/* Headline */}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(32px, 5vw, 72px)',
          lineHeight: 1.1,
          color: '#3a3028',
          maxWidth: '650px',
          marginBottom: 'clamp(48px, 6vw, 96px)',
        }}
      >
        Every detail,<br />
        <em style={{ fontStyle: 'italic' }}>thoughtfully woven.</em>
      </h2>

      {/* Service cards */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(24px, 3vw, 48px)',
        }}
      >
        {services.map((s) => (
          <div
            key={s.num}
            style={{
              borderTop: '1px solid rgba(58, 48, 40, 0.12)',
              paddingTop: '2rem',
            }}
          >
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 200,
                fontSize: '11px',
                color: 'var(--dusty-rose)',
                letterSpacing: '0.3em',
                display: 'block',
                marginBottom: '1.2rem',
              }}
            >
              {s.num}
            </span>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: 'clamp(20px, 2vw, 28px)',
                color: '#3a3028',
                marginBottom: '0.8rem',
                lineHeight: 1.2,
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(13px, 1vw, 15px)',
                color: '#7a6e66',
                lineHeight: 1.7,
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
