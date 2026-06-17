'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * SplitText — ReactBits-style staggered text reveal, adapted for this stack.
 * Splits into characters or words and floats each unit up + fades in once the
 * line scrolls into view. Accessible (real text in aria-label, units hidden).
 *
 * Props:
 *   text        string
 *   by          'chars' | 'words'   (default 'chars')
 *   delay       seconds before the first unit
 *   stagger     seconds between units
 *   as          element tag for the wrapper (default 'span')
 *   accentWords string[]  words rendered in `accentColor` (only for by='words')
 *   accentColor css colour for accent words
 */
export function SplitText({
  text = '',
  by = 'chars',
  delay = 0,
  stagger = 0.03,
  as = 'span',
  className,
  style,
  accentWords = [],
  accentColor = 'hsl(32 31% 51%)',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const Wrapper = motion[as] || motion.span

  const units = by === 'words' ? text.split(' ') : Array.from(text)
  const accentSet = new Set(accentWords.map((w) => w.toLowerCase().replace(/[.,!?]/g, '')))

  return (
    <Wrapper ref={ref} className={className} style={style} aria-label={text}>
      {units.map((u, i) => {
        const isAccent =
          by === 'words' && accentSet.has(u.toLowerCase().replace(/[.,!?]/g, ''))
        return (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block whitespace-pre will-change-transform"
            style={isAccent ? { color: accentColor, fontStyle: 'italic' } : undefined}
            initial={{ opacity: 0, y: '0.6em' }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {u}{by === 'words' ? ' ' : ''}
          </motion.span>
        )
      })}
    </Wrapper>
  )
}
