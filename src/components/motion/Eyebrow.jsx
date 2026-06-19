'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Standardised section eyebrow — the small uppercase "— Label" that opens
 * almost every section. Centralising it kills the drift that had crept in
 * (gold at 46% vs 51% vs 62%, sizes from 0.55rem to 0.65rem) and guarantees
 * one legible size + one canonical gold everywhere.
 *
 * tone:   'ink' (light grounds) · 'gold' (accent) · 'ivory' (dark grounds)
 * dash:   render the leading "— " (default true)
 * animate: gentle reveal-on-view (default true); pass false inside pinned
 *          sections where whileInView is unreliable.
 */
export function Eyebrow({
  children,
  tone = 'ink',
  dash = true,
  animate = true,
  className = '',
  style = {},
}) {
  const color =
    tone === 'gold'
      ? 'hsl(var(--gold))'
      : tone === 'ivory'
        ? 'hsl(34 30% 95% / 0.72)'
        : 'hsl(24 12% 10% / 0.62)'

  const classes = cn('font-sans uppercase', className)
  const css = { fontSize: '0.68rem', letterSpacing: '0.3em', lineHeight: 1, color, ...style }
  const content = (
    <>
      {dash && <span aria-hidden>— </span>}
      {children}
    </>
  )

  if (!animate) {
    return (
      <p className={classes} style={css}>
        {content}
      </p>
    )
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={classes}
      style={css}
    >
      {content}
    </motion.p>
  )
}
