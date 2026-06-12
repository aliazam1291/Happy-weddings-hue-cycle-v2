'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsTouch } from '@/lib/motion'

/**
 * Rose-petal cursor trail — small gold petal shapes spawn at the cursor
 * position as the mouse moves and drift downward with a gentle fade.
 * Desktop-only; disabled on touch devices and when motion is reduced.
 */
export function PetalCursor() {
  const isTouch = useIsTouch()
  const [petals, setPetals] = useState([])
  const idRef = useRef(0)
  const lastTimeRef = useRef(0)
  const lastPosRef = useRef({ x: -999, y: -999 })

  useEffect(() => {
    if (isTouch) return

    const onMove = (e) => {
      const now = performance.now()
      if (now - lastTimeRef.current < 72) return

      const { x: lx, y: ly } = lastPosRef.current
      const dx = e.clientX - lx
      const dy = e.clientY - ly
      if (dx * dx + dy * dy < 64) return

      lastTimeRef.current = now
      lastPosRef.current = { x: e.clientX, y: e.clientY }

      const id = ++idRef.current
      setPetals(p => [...p.slice(-20), { id, x: e.clientX, y: e.clientY }])
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [isTouch])

  if (isTouch) return null

  return (
    <div aria-hidden className="pointer-events-none">
      <AnimatePresence>
        {petals.map(({ id, x, y }) => {
          const angle = (id * 137.508) % 360
          const drift = ((id * 61) % 60) - 30
          const size = 5 + (id % 4)
          const lighter = id % 3 === 0

          return (
            <motion.span
              key={id}
              className="fixed z-[9980] pointer-events-none"
              style={{
                left: x - size / 2,
                top: y - (size * 1.6) / 2,
                width: size,
                height: size * 1.6,
                backgroundColor: lighter ? 'hsl(34 40% 72%)' : 'hsl(32 31% 51%)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                rotate: `${angle}deg`,
              }}
              initial={{ opacity: 0.52, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0.25, x: drift, y: 52 }}
              transition={{ duration: 1.75, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() =>
                setPetals(p => p.filter(i => i.id !== id))
              }
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
