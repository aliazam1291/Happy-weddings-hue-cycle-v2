'use client'

import { useEffect, useRef } from 'react'

/** Animated film grain — offscreen 200×200 canvas scaled up, redrawn at 12fps */
export function FilmGrain({ opacity = 0.036 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const off = document.createElement('canvas')
    const S = 220
    off.width = S
    off.height = S
    const oCtx = off.getContext('2d')

    let raf, last = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const tick = (t) => {
      raf = requestAnimationFrame(tick)
      if (t - last < 80) return
      last = t
      const img = oCtx.createImageData(S, S)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() * 255) | 0
        d[i]     = n
        d[i + 1] = (n * 0.93 + 8) | 0
        d[i + 2] = (n * 0.82 + 12) | 0
        d[i + 3] = 255
      }
      oCtx.putImageData(img, 0, 0)
      ctx.drawImage(off, 0, 0, canvas.width, canvas.height)
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[7000]"
      style={{ opacity, mixBlendMode: 'overlay', imageRendering: 'pixelated' }}
    />
  )
}
