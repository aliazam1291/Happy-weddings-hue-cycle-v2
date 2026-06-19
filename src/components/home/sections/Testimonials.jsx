'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { ease } from '@/lib/motion'
import { Ornament } from '@/components/motion/Ornament'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CardSwap } from '@/components/reactbits/CardSwap'
import { SplitText } from '@/components/reactbits/SplitText'
import { IMAGES } from '@/lib/images'

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

function ReviewCard({ review }) {
  return (
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
      <CardContent className="p-8 md:p-12 pt-10 md:pt-14 h-full flex flex-col text-center">
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
      </CardContent>
    </Card>
  )
}

export function Testimonials() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      {/* Faint photographic warmth — barely visible, adds depth not distraction */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <img
          src={IMAGES.stories[0].src}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.06, filter: 'brightness(0.7) saturate(0.5)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, hsl(34 30% 95% / 0.9) 70%)' }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: ease.editorial }}
          className="flex justify-center mb-4"
        >
          <Badge variant="gold" size="sm" shape="pill">Said by families</Badge>
        </motion.div>

        <SplitText
          as="h2"
          by="words"
          text="What we have heard back."
          accentWords={['heard', 'back']}
          accentColor="hsl(32 31% 46%)"
          className="block font-display font-light leading-[1.02] tracking-[-0.02em] text-center mb-2 text-[clamp(2rem,5vw,3.6rem)]"
          style={{ color: 'hsl(24 12% 10%)' }}
        />

        <Ornament className="my-8 md:my-10" />

        {/* ReactBits-style auto-cycling card stack */}
        <CardSwap
          className="max-w-2xl mx-auto"
          height="clamp(23.75rem, 60vw, 26.875rem)"
          interval={4800}
          cards={REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        />
      </div>
    </section>
  )
}
