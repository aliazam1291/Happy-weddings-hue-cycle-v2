'use client'

import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

/**
 * Clip-path image reveal — the image is "uncovered" from the bottom
 * while a faint scale settles. Designed for editorial imagery.
 */
export function ImageReveal({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  duration = 1.25,
  scaleFrom = 1.15,
  delay = 0,
  amount = 0.3,
  children,
  ...rest
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: 'inset(100% 0 0 0)' },
          show: {
            clipPath: 'inset(0% 0 0 0)',
            transition: { duration, ease: ease.editorial, delay },
          },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          variants={{
            hidden: { scale: scaleFrom },
            show: {
              scale: 1,
              transition: { duration: duration + 0.6, ease: ease.editorial, delay },
            },
          }}
          data-cursor="media"
        />
      </motion.div>
      {children}
    </motion.div>
  )
}
