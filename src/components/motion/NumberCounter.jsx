'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function NumberCounter({ to = 100, duration = 1800, suffix = '', className = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(prefersReducedMotion() ? to : 0)
  const [done, setDone] = useState(prefersReducedMotion())

  useEffect(() => {
    if (done) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect()
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(to * eased))
            if (t < 1) requestAnimationFrame(tick)
            else setDone(true)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration, done])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
