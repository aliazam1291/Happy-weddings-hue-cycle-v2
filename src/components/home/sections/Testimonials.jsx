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

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const review = REVIEWS[idx]

  const next = () => setIdx((i) => (i + 1) % REVIEWS.length)
  const prev = () => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)

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

        {/* Quote card — sits below header but a ghost echo card offsets behind */}
        <div className="relative max-w-3xl mx-auto">
          {/* Ghost echo card — offset behind for editorial layering */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 border border-gold/30 rounded-sm pointer-events-none"
          />

          <Card variant="default" shape="soft" className="relative">
            <Quote
              aria-hidden
              className="absolute -top-5 -left-3 md:-top-8 md:-left-6 w-14 h-14 md:w-20 md:h-20"
              style={{ color: 'hsl(32 31% 51% / 0.22)' }}
              strokeWidth={1}
            />
            <CardContent className="p-8 md:p-14 pt-10 md:pt-16">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: ease.editorial }}
                  className="relative z-10 text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-6" aria-label={`${review.stars} stars`}>
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" style={{ color: 'hsl(32 31% 51%)' }} strokeWidth={0} />
                    ))}
                  </div>
                  <p
                    className="font-display italic leading-[1.35] text-balance"
                    style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.7rem)', color: 'hsl(24 12% 10% / 0.82)' }}
                  >
                    &ldquo;{review.body}&rdquo;
                  </p>
                  <footer className="mt-8 flex flex-col items-center gap-3">
                    <p className="font-display text-lg" style={{ color: 'hsl(24 12% 10%)' }}>{review.name}</p>
                    <Badge variant="default" size="sm" shape="pill">
                      {review.place}
                    </Badge>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="mt-12 md:mt-16 flex items-center justify-center gap-6">
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
                onClick={() => setIdx(i)}
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
