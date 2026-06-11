'use client'

import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

/**
 * Small gold Mughal-style fleuret with a hairline rule on each side.
 * Use between sections as a quiet decorative breath. Animates in on view.
 *
 *   <Ornament />
 *   <Ornament tone="ivory" />     // for dark backgrounds (footer)
 *   <Ornament size="lg" />
 */
export function Ornament({ tone = 'gold', size = 'md', className = '' }) {
  const stroke = tone === 'ivory' ? 'hsl(34 30% 95% / 0.6)' : 'hsl(32 31% 51% / 0.7)'
  const accent = tone === 'ivory' ? 'hsl(34 30% 95% / 0.85)' : 'hsl(32 31% 51%)'
  const ruleWidth = size === 'lg' ? 90 : size === 'sm' ? 36 : 56
  const motifH = size === 'lg' ? 22 : size === 'sm' ? 13 : 17

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.9, ease: ease.editorial }}
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden
    >
      <span className="block h-px" style={{ width: ruleWidth, backgroundColor: stroke }} />
      <svg width={motifH * 1.5} height={motifH} viewBox="0 0 30 20" fill="none">
        {/* central diamond keystone */}
        <path d="M15 2 L19 10 L15 18 L11 10 Z" stroke={accent} strokeWidth="0.9" fill="none" />
        <circle cx="15" cy="10" r="1.4" fill={accent} />
        {/* side leaflets */}
        <path d="M10 10 Q6 6 1 10 Q6 14 10 10 Z" stroke={stroke} strokeWidth="0.7" fill="none" />
        <path d="M20 10 Q24 6 29 10 Q24 14 20 10 Z" stroke={stroke} strokeWidth="0.7" fill="none" />
      </svg>
      <span className="block h-px" style={{ width: ruleWidth, backgroundColor: stroke }} />
    </motion.div>
  )
}

/**
 * A larger swan-pair motif — for hero/section accents. Inspired by the existing
 * /public/svgs/swan.svg vocabulary the brand has used before.
 */
export function SwanPair({ className = '', size = 64, tone = 'gold' }) {
  const stroke = tone === 'ivory' ? 'hsl(34 30% 95% / 0.65)' : 'hsl(32 31% 51% / 0.7)'
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: ease.editorial }}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* left swan — neck curls right */}
      <path d="M30 50 C30 30 38 20 48 26 C42 22 32 24 26 32 C22 38 22 48 30 50 Z" stroke={stroke} strokeWidth="0.9" fill="none" />
      <circle cx="48.5" cy="25" r="1.4" fill={stroke} />
      {/* right swan — neck curls left (mirror) */}
      <path d="M70 50 C70 30 62 20 52 26 C58 22 68 24 74 32 C78 38 78 48 70 50 Z" stroke={stroke} strokeWidth="0.9" fill="none" />
      <circle cx="51.5" cy="25" r="1.4" fill={stroke} />
      {/* central pearl */}
      <circle cx="50" cy="18" r="1.8" fill={stroke} />
    </motion.svg>
  )
}

/**
 * A tiny six-petalled rosette — drop into corners or numerals as quiet accent.
 */
export function Rosette({ className = '', size = 28, tone = 'gold' }) {
  const stroke = tone === 'ivory' ? 'hsl(34 30% 95% / 0.6)' : 'hsl(32 31% 51% / 0.6)'
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <circle cx="20" cy="20" r="18" stroke={stroke} strokeWidth="0.6" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="20" cy="10" rx="3.2" ry="6" stroke={stroke} strokeWidth="0.7" fill="none" transform={`rotate(${a} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="1.8" fill={stroke} />
    </svg>
  )
}
