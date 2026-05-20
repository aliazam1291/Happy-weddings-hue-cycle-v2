'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Video data — replace src/poster/url with real assets ──────────────── */
const VIDEOS = [
  {
    id: 1,
    title: 'Heritage Garden Wedding',
    subtitle: 'Udaipur Estate · 2024',
    poster: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    cta: 'View Full Film',
    url: '#portfolio',
  },
  {
    id: 2,
    title: 'Rooftop Soirée',
    subtitle: 'Mumbai Penthouse · 2024',
    poster: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    cta: 'View Full Film',
    url: '#portfolio',
  },
  {
    id: 3,
    title: 'Desert Dusk Ceremony',
    subtitle: 'Jaisalmer Dunes · 2023',
    poster: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    cta: 'View Full Film',
    url: '#portfolio',
  },
  {
    id: 4,
    title: 'Palace Sangeet Night',
    subtitle: 'Jodhpur Fort · 2024',
    poster: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    cta: 'View Full Film',
    url: '#portfolio',
  },
  {
    id: 5,
    title: 'Garden Mandap',
    subtitle: 'Coorg Estate · 2024',
    poster: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    cta: 'View Full Film',
    url: '#portfolio',
  },
  {
    id: 6,
    title: 'Backwater Blessing',
    subtitle: 'Kerala Houseboat · 2023',
    poster: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    cta: 'View Full Film',
    url: '#portfolio',
  },
]

const COUNT = VIDEOS.length
const ANGLE_STEP = 360 / COUNT

export default function VideoGallerySection() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const [active, setActive] = useState(null)

  /* ── GSAP scroll-driven Y-rotation ─────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Pin section and rotate carousel as user scrolls */
      gsap.to(trackRef.current, {
        rotateY: -360,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=280%',
          scrub: 1.4,
          pin: true,
        },
      })

      /* Fade-in on first entry */
      gsap.from(trackRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* Lock body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  return (
    <>
      <section ref={sectionRef} className="vg-section">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="vg-header">
          <p className="vg-kicker">Signature Moments</p>
          <h2 className="vg-title">Stories that outlast the day.</h2>
          <p className="vg-sub">
            Scroll to journey through our most evocative celebrations.
          </p>
        </div>

        {/* ── 3-D circular stage ──────────────────────────────────────── */}
        <div className="vg-stage">
          <div ref={trackRef} className="vg-track">
            {VIDEOS.map((v, i) => {
              const angle = i * ANGLE_STEP
              return (
                <button
                  key={v.id}
                  className="vg-card"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(32vw)`,
                  }}
                  onClick={() => setActive(v)}
                  aria-label={`Play ${v.title}`}
                >
                  <img
                    src={v.poster}
                    alt={v.title}
                    className="vg-card__poster"
                    draggable={false}
                  />
                  <div className="vg-card__overlay">
                    <span className="vg-card__play">▶</span>
                    <p className="vg-card__title">{v.title}</p>
                    <p className="vg-card__sub">{v.subtitle}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <p className="vg-scroll-hint">↓ Scroll to rotate</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CURVED SCREEN MODAL
      ═══════════════════════════════════════════════════════════════ */}
      {active && (
        <div className="vg-modal" onClick={() => setActive(null)}>
          <div className="vg-modal__inner" onClick={e => e.stopPropagation()}>

            {/* curved screen */}
            <div className="vg-screen">
              <div className="vg-screen__curve">
                <video
                  className="vg-screen__video"
                  src={active.src}
                  poster={active.poster}
                  autoPlay
                  controls
                  playsInline
                />
              </div>
            </div>

            {/* info + CTA */}
            <div className="vg-modal__info">
              <p className="vg-modal__kicker">{active.subtitle}</p>
              <h3 className="vg-modal__title">{active.title}</h3>
              <a
                href={active.url}
                className="vg-modal__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                {active.cta} ↗
              </a>
            </div>

            <button
              className="vg-modal__close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
