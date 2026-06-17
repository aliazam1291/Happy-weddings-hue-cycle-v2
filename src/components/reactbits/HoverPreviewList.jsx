'use client'

import { useRef, useState, useEffect } from 'react'
import { useIsMobile } from '@/lib/motion'

/**
 * HoverPreviewList — an editorial index where hovering a row reveals its image
 * floating beside the cursor (the classic awwwards hover-reveal). Desktop only
 * for the cursor preview; on touch it falls back to a clean list with inline
 * thumbnails. Themed light/gold/ink by the caller's row markup.
 *
 * Props: items [{ id, label, sub, src }], onSelect(item)
 */
export function HoverPreviewList({ items = [], onSelect }) {
  const isMobile = useIsMobile()
  const wrapRef = useRef(null)
  const previewRef = useRef(null)
  const [active, setActive] = useState(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    if (isMobile) return
    const tick = () => {
      raf.current = requestAnimationFrame(tick)
      pos.current.x += (target.current.x - pos.current.x) * 0.16
      pos.current.y += (target.current.y - pos.current.y) * 0.16
      if (previewRef.current) {
        previewRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [isMobile])

  const onMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  // ── Mobile: stacked rows with inline thumbnails ──
  if (isMobile) {
    return (
      <ul className="border-t" style={{ borderColor: 'hsl(24 12% 10% / 0.12)' }}>
        {items.map((it) => (
          <li key={it.id} className="border-b" style={{ borderColor: 'hsl(24 12% 10% / 0.12)' }}>
            <button
              type="button"
              onClick={() => onSelect?.(it)}
              data-cursor="link"
              className="flex w-full items-center gap-4 py-5 text-left"
            >
              <img src={it.src} alt="" className="h-16 w-20 shrink-0 rounded-sm object-cover" style={{ filter: 'grayscale(1) sepia(0.4) saturate(1.2) brightness(0.9)' }} />
              <span className="flex-1">
                <span className="block font-display text-2xl tracking-[-0.01em]" style={{ color: 'hsl(24 12% 10%)' }}>{it.label}</span>
                {it.sub && <span className="block font-sans text-[0.6rem] uppercase tracking-[0.22em] mt-1" style={{ color: 'hsl(24 12% 10% / 0.45)' }}>{it.sub}</span>}
              </span>
              <span className="font-display italic text-gold">→</span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  // ── Desktop: hover-reveal with cursor-following image ──
  return (
    <div ref={wrapRef} onMouseMove={onMove} className="relative" onMouseLeave={() => setActive(null)}>
      <ul className="border-t" style={{ borderColor: 'hsl(24 12% 10% / 0.12)' }}>
        {items.map((it, i) => {
          const dim = active !== null && active !== i
          return (
            <li key={it.id} className="border-b" style={{ borderColor: 'hsl(24 12% 10% / 0.12)' }}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => onSelect?.(it)}
                data-cursor="link"
                className="group/row flex w-full items-baseline justify-between gap-6 py-7 text-left transition-all duration-500"
                style={{ opacity: dim ? 0.35 : 1 }}
              >
                <span className="flex items-baseline gap-6">
                  <span className="font-display italic text-lg shrink-0" style={{ color: 'hsl(32 31% 51%)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-display font-light tracking-[-0.02em] leading-none transition-transform duration-500 group-hover/row:translate-x-3"
                    style={{ fontSize: 'clamp(1.8rem, 3.4vw, 3rem)', color: 'hsl(24 12% 10%)' }}
                  >
                    {it.label}
                  </span>
                </span>
                {it.sub && (
                  <span className="font-sans text-[0.6rem] uppercase tracking-[0.24em] shrink-0" style={{ color: 'hsl(24 12% 10% / 0.45)' }}>
                    {it.sub}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Cursor-following preview */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 overflow-hidden rounded-sm transition-opacity duration-300 will-change-transform"
        style={{
          width: '20rem',
          height: '14rem',
          opacity: active !== null ? 1 : 0,
          boxShadow: '0 1.5rem 3rem -1.5rem hsl(24 14% 4% / 0.6)',
          outline: '1px solid hsl(32 31% 51% / 0.3)',
        }}
      >
        {items.map((it, i) => (
          <img
            key={it.id}
            src={it.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            style={{ opacity: active === i ? 1 : 0, filter: 'grayscale(1) sepia(0.45) saturate(1.3) hue-rotate(-6deg) brightness(0.92)' }}
          />
        ))}
        <span className="pointer-events-none absolute inset-0" style={{ background: 'hsl(32 31% 51% / 0.12)', mixBlendMode: 'multiply' }} />
      </div>
    </div>
  )
}
