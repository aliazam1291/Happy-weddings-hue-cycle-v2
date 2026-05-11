'use client'

import ParallaxScene from '../components/ParallaxScene'
import ServicesSection from '../components/ServicesSection'

export default function Home() {
  return (
    <main style={{ background: 'var(--warm-white)' }}>
      <ParallaxScene />
      <ServicesSection />

      {/* CTA Strip */}
      <section
        style={{
          background: '#3a3028',
          padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 100px)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(10px, 1vw, 12px)',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          Begin your journey
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(28px, 4.5vw, 64px)',
            color: '#faf6f0',
            marginBottom: '2.5rem',
            lineHeight: 1.1,
          }}
        >
          Let's craft something<br />
          <em style={{ fontStyle: 'italic' }}>extraordinary.</em>
        </h2>
        <a
          href="#"
          style={{
            display: 'inline-block',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#3a3028',
            background: 'var(--gold)',
            padding: '14px 40px',
            textDecoration: 'none',
            transition: 'opacity 0.3s',
          }}
          onMouseOver={e => e.target.style.opacity = '0.85'}
          onMouseOut={e => e.target.style.opacity = '1'}
        >
          Schedule a Consultation
        </a>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '2rem clamp(24px, 6vw, 100px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderTop: '1px solid rgba(58,48,40,0.08)',
        }}
      >
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '18px',
          color: '#3a3028',
          letterSpacing: '0.02em',
        }}>
          Happy <em>Weddings</em>
        </span>
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: '11px',
          color: '#b0a8a0',
          letterSpacing: '0.2em',
        }}>
          © 2025 · All rights reserved
        </span>
      </footer>
    </main>
  )
}
