'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { ease } from '@/lib/motion'
import { Ornament } from '@/components/motion/Ornament'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const REVIEWS = [
  {
    name: 'Riya & Aarav Mehta',
    place: 'Indore · 2025',
    body:
      'Shruti and her team felt like family by the end. The Sangeet décor was exactly what we imagined and the choreography stole the night. Every vendor showed up on time, every detail was thought through.',
    stars: 5,
  },
  {
    name: 'Tanvi Khurana',
    place: 'Udaipur · 2024',
    body:
      'We were nervous about a destination wedding, but they had the ground covered before we arrived. Travel, stay, ceremony — everything ran without us lifting a finger. Worth every rupee.',
    stars: 5,
  },
  {
    name: 'Aditya & Sneha',
    place: 'Indore · 2024',
    body:
      'Classic Indian wedding, three days, hundreds of guests — handled with restraint and warmth. The food, the lighting, the special effects on the Varmala — guests still talk about it.',
    stars: 5,
  },
  {
    name: 'Karan Bhandari',
    place: 'Bhopal · 2023',
    body:
      'I run a business and don\'t have patience for delays. Happy Weddings briefed me weekly and never missed a deadline. Genuinely the most professional planners we met.',
    stars: 5,
  },
]

// Stack offsets per relative depth (0 = active, 1 = first behind, etc.)
const STACK = [
  { y: 0, x: 0, scale: 1, rotate: 0, opacity: 1, blur: 0 },
  { y: 22, x: 14, scale: 0.96, rotate: 2.5, opacity: 0.85, blur: 0.3 },
  { y: 44, x: 28, scale: 0.92, rotate: 5, opacity: 0.55, blur: 0.6 },
  { y: 66, x: 42, scale: 0.88, rotate: 7.5, opacity: 0.0, blur: 1 },
]

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = () => {
    setDirection(1)
    setIdx((i) => (i + 1) % REVIEWS.length)
  }
  const prev = () => {
    setDirection(-1)
    setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)
  }

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: ease.editorial }}
          className="flex justify-center mb-4"
        >
          <Badge variant="gold" size="sm" shape="pill">Said by families</Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.1, ease: ease.editorial }}
          className="font-display font-light leading-[1.02] tracking-[-0.02em] text-center mb-2"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', color: 'hsl(24 12% 10%)' }}
        >
          What we have <span className="italic" style={{ color: 'hsl(32 31% 46%)' }}>heard back.</span>
        </motion.h2>

        <Ornament className="my-8 md:my-10" />

        {/* Stacked card deck */}
        <div className="relative max-w-2xl mx-auto" style={{ perspective: 1400 }}>
          {/* Reserve height so layout doesn't jump */}
          <div className="relative h-[430px] sm:h-[400px] md:h-[380px]">
            {REVIEWS.map((review, i) => {
              const depth = (i - idx + REVIEWS.length) % REVIEWS.length
              const pos = STACK[Math.min(depth, STACK.length - 1)]
              const isActive = depth === 0

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{ zIndex: REVIEWS.length - depth, transformStyle: 'preserve-3d' }}
                  initial={false}
                  animate={{
                    y: pos.y,
                    x: pos.x,
                    scale: pos.scale,
                    rotate: pos.rotate,
                    opacity: pos.opacity,
                    filter: `blur(${pos.blur}px)`,
                  }}
                  transition={{ duration: 0.75, ease: ease.editorial }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -90) next()
                    else if (info.offset.x > 90) prev()
                  }}
                >
                  <Card
                    variant="default"
                    shape="soft"
                    className="h-full shadow-[0_30px_80px_-40px_hsl(24_12%_10%/0.35)]"
                  >
                    <Quote
                      aria-hidden
                      className="absolute -top-4 -left-3 md:-top-7 md:-left-6 w-12 h-12 md:w-20 md:h-20"
                      style={{ color: 'hsl(32 31% 51% / 0.22)' }}
                      strokeWidth={1}
                    />
                    <CardContent className="p-8 md:p-12 pt-10 md:pt-14 h-full flex flex-col">
                      <AnimatePresence mode="wait" initial={false}>
                        {isActive && (
                          <motion.div
                            key={`content-${i}`}
                            initial={{ opacity: 0, y: direction * 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: direction * -14 }}
                            transition={{ duration: 0.45, ease: ease.editorial }}
                            className="flex flex-col h-full text-center"
                          >
                            <div className="flex items-center justify-center gap-1.5 mb-5" aria-label={`${review.stars} stars`}>
                              {Array.from({ length: review.stars }).map((_, s) => (
                                <Star key={s} className="h-4 w-4 fill-current" style={{ color: 'hsl(32 31% 51%)' }} strokeWidth={0} />
                              ))}
                            </div>
                            <p
                              className="font-display italic leading-[1.35] text-balance flex-1"
                              style={{ fontSize: 'clamp(1.05rem, 2.1vw, 1.5rem)', color: 'hsl(24 12% 10% / 0.85)' }}
                            >
                              &ldquo;{review.body}&rdquo;
                            </p>
                            <footer className="mt-7 flex flex-col items-center gap-2.5">
                              <p className="font-display text-lg" style={{ color: 'hsl(24 12% 10%)' }}>{review.name}</p>
                              <Badge variant="default" size="sm" shape="pill">{review.place}</Badge>
                            </footer>
                          </motion.div>
                        )}
                        {!isActive && (
                          <div
                            key={`ghost-${i}`}
                            className="flex flex-col h-full text-center justify-center"
                            aria-hidden
                          >
                            <p
                              className="font-display italic leading-[1.35] line-clamp-3"
                              style={{ fontSize: 'clamp(1.05rem, 2.1vw, 1.5rem)', color: 'hsl(24 12% 10% / 0.6)' }}
                            >
                              &ldquo;{review.body}&rdquo;
                            </p>
                          </div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-14 md:mt-20 flex items-center justify-center gap-6">
          <Button
            onClick={prev}
            variant="default"
            size="sm"
            shape="pill"
            aria-label="Previous review"
            className="h-11 w-11 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > idx ? 1 : -1)
                  setIdx(i)
                }}
                aria-label={`Review ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-500 ease-editorial"
                style={{
                  width: i === idx ? 28 : 8,
                  backgroundColor: i === idx ? 'hsl(32 31% 51%)' : 'hsl(24 12% 10% / 0.18)',
                }}
              />
            ))}
          </div>
          <Button
            onClick={next}
            variant="default"
            size="sm"
            shape="pill"
            aria-label="Next review"
            className="h-11 w-11 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
