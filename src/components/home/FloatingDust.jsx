'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const COUNT = 55

function mkParticle(W, H) {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.4 + 0.4,
    a: Math.random() * 0.55 + 0.08,
    vx: (Math.random() - 0.5) * 0.28,
    vy: -Math.random() * 0.38 - 0.08,
    h: Math.random() * 18 + 32, // warm gold hue 32-50
  }
}

/** Warm golden dust particles drifting upward */
export function FloatingDust({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    let pts = Array.from({ length: COUNT }, () => mkParticle(W, H))
    let raf

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * W }
        if (p.x < -6) p.x = W + 6
        if (p.x > W + 6) p.x = -6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.h}, 38%, 68%, ${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  )
}
