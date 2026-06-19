'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { POSTS as ALL_POSTS } from '@/lib/posts'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TiltCard } from '@/components/motion/TiltCard'
import { SpotlightCard } from '@/components/reactbits/SpotlightCard'
import { IMAGES } from '@/lib/images'
import { SplitText } from '@/components/reactbits/SplitText'

const EASE = [0.22, 1, 0.36, 1]

// Show the three most recent posts on the homepage teaser strip.
// Fall back to IMAGES.journal if the post cover is a picsum placeholder.
const JOURNAL_COVERS = IMAGES.journal
const POSTS = [...ALL_POSTS]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3)
  .map((p, i) => ({
    slug: p.slug,
    category: p.category,
    headline: p.title,
    date: new Date(p.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    src: JOURNAL_COVERS[i] || p.cover,
  }))

// Editorial offset rhythm — outer cards anchor, middle card lifts.
const OFFSETS = ['md:translate-y-4', 'md:-translate-y-10', 'md:translate-y-2']

export function JournalSection() {
  return (
    <section
      className="relative w-full py-24 md:py-32"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-6"
            >
              <Badge variant="gold" size="sm">Journal</Badge>
            </motion.div>
            <SplitText
              as="h2"
              by="words"
              text="Notes from the studio."
              accentWords={['studio']}
              className="block font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.8rem,6vw,5rem)]"
              style={{ color: 'hsl(24 12% 10%)' }}
            />
          </div>
          <Link
            href="/blog"
            data-cursor="link"
            className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider transition-colors duration-500"
            style={{ color: 'hsl(24 12% 10% / 0.6)' }}
          >
            All entries
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
          </Link>
        </div>

        {/* Cards — gap-grid with per-card vertical offsets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {POSTS.map((post, i) => (
            <JournalCard key={post.slug} post={post} delay={i * 0.1} offset={OFFSETS[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}

function JournalCard({ post, delay, offset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={`transform ${offset}`}
    >
      <TiltCard intensity={6} glare perspective={1100} scale={1.02}>
        <Card variant="default" shape="soft" hover="glow" className="h-full">
          <Link href={`/blog/${post.slug}`} data-cursor="link" className="group block h-full">
            {/* Image — sits at base depth */}
            <SpotlightCard
              className="overflow-hidden relative"
              style={{ aspectRatio: '4/3', transformStyle: 'preserve-3d' }}
            >
              <img
                src={post.src}
                alt={post.headline}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
              {/* Floating category badge — lifted forward in Z */}
              <div
                className="absolute top-4 left-4"
                style={{ transform: 'translateZ(40px)' }}
              >
                <Badge variant="ink" size="sm">{post.category}</Badge>
              </div>
            </SpotlightCard>

            <CardContent
              className="p-7 md:p-8 pt-7 md:pt-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="flex items-center justify-between mb-4"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span
                  className="font-sans text-[0.6rem]"
                  style={{ color: 'hsl(24 12% 10% / 0.45)' }}
                >
                  {post.date}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-all duration-500 ease-editorial group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'hsl(24 12% 10% / 0.4)' }}
                />
              </div>
              <h3
                className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-[1.2] text-balance group-hover:text-gold transition-colors duration-500"
                style={{ color: 'hsl(24 12% 10%)', transform: 'translateZ(30px)' }}
              >
                {post.headline}
              </h3>
              <Separator
                tone="gold"
                className="mt-5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-editorial"
              />
            </CardContent>
          </Link>
        </Card>
      </TiltCard>
    </motion.div>
  )
}
