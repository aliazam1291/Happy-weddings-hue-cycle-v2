'use client'

import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

/**
 * Word-by-word reveal — wraps each word in an overflow:hidden mask
 * and slides it up on view.
 *
 *   <SplitTextReveal as="h1" className="text-display-lg">
 *     A named house, since 2013
 *   </SplitTextReveal>
 */
export function SplitTextReveal({
  as: Tag = 'span',
  children,
  className,
  stagger = 0.06,
  delay = 0,
  duration = 0.95,
  amount = 0.4,
}) {
  const words = String(children).split(/(\s+)/) // keep spaces

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((w, i) => {
          if (w.trim() === '') return <span key={i}>{w}</span>
          return (
            <span
              key={i}
              className="inline-block overflow-hidden align-baseline"
              style={{ lineHeight: 1.16 }}
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '110%' },
                  show: { y: '0%', transition: { duration, ease: ease.editorial } },
                }}
              >
                {w}
              </motion.span>
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}
