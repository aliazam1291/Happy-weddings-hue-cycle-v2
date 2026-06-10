'use client'

import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

const variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: ease.editorial, delay },
  }),
}

export function RevealOnView({ as: Tag = 'div', children, delay = 0, amount = 0.35, className }) {
  const Comp = motion[Tag] || motion.div
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      custom={delay}
      variants={variants}
    >
      {children}
    </Comp>
  )
}
