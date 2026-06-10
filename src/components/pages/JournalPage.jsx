'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/pages/PageHero'
import { ease } from '@/lib/motion'
import { IMAGES } from '@/lib/images'

const POSTS = [
  { id: 1, category: 'Design', headline: 'The art of restraint — why less is always more', date: 'May 2026', src: IMAGES.journal[0] },
  { id: 2, category: 'Destinations', headline: 'Hosting a theme wedding that still feels personal', date: 'April 2026', src: IMAGES.journal[1] },
  { id: 3, category: 'Planning', headline: 'Six to twelve months: the timeline that works', date: 'March 2026', src: IMAGES.journal[2] },
]

export function JournalPage() {
  return (
    <main>
      <PageHero
        eyebrow="Journal"
        title="Notes from"
        accent="the studio."
        subtitle="Thoughts on design, planning and the craft of celebration — from the team at Happy Weddings."
      />

      <section className="w-full py-16 md:py-24" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'hsl(24 12% 10% / 0.08)' }}>
          {POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: ease.editorial }}
            >
              <Link href="/journal" data-cursor="link" className="group block" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img src={post.src} alt={post.headline} data-cursor="media" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]" style={{ filter: 'saturate(0.88) brightness(0.96)' }} />
                </div>
                <div className="p-7 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-[0.6rem] uppercase tracking-widest" style={{ color: 'hsl(32 31% 46%)' }}>{post.category}</span>
                    <span className="font-sans text-[0.6rem]" style={{ color: 'hsl(24 12% 10% / 0.45)' }}>{post.date}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-[1.2] text-balance group-hover:text-gold transition-colors duration-500" style={{ color: 'hsl(24 12% 10%)' }}>
                    {post.headline}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
