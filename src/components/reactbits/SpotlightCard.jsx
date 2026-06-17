'use client'

import { useRef } from 'react'

/**
 * SpotlightCard — ReactBits-style cursor-follow gold glow, themed for the light
 * palette. Tracks the pointer and paints a soft gold radial (soft-light blend)
 * over its content on hover. No deps. Wrap any relatively-positioned surface.
 */
export function SpotlightCard({
  children,
  className = '',
  color = 'hsl(32 31% 51% / 0.4)',
  radius = '16rem',
  style,
  ...props
}) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${e.clientX - r.left}px`)
    el.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`relative group/spot ${className}`}
      style={{ '--sx': '50%', '--sy': '50%', ...style }}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${radius} circle at var(--sx) var(--sy), ${color}, transparent 60%)`,
          mixBlendMode: 'soft-light',
        }}
      />
    </div>
  )
}
