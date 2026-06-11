'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * TiltCard — 3D parallax wrapper. Tracks pointer position relative to the
 * card's bounding box and feeds it to rotateX/rotateY motion values via
 * spring smoothing. Children can opt into deeper parallax by adding
 * `data-tilt-depth="N"` (N = px of additional Z-translation on hover).
 *
 * The wrapper preserves layout — it just adds transform-style: preserve-3d
 * and a perspective on the parent so its descendants can sit at different
 * Z depths.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
  perspective = 1000,
  scale = 1.015,
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity])
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity])
  const glareX = useTransform(sx, [-0.5, 0.5], ['25%', '75%'])
  const glareY = useTransform(sy, [-0.5, 0.5], ['25%', '75%'])

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective }}
      className={cn('relative', className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative will-change-transform"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-editorial group-hover:opacity-100"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx} ${gy}, hsl(34 30% 95% / 0.35), transparent 55%)`,
              ),
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
