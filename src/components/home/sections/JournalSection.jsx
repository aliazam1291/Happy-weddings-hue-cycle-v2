'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { IMAGES } from '@/lib/images'

const EASE = [0.22, 1, 0.36, 1]

const POSTS = [
  {
    id: 1,
    category: 'Design',
    headline: 'The art of restraint — why less is always more for luxury weddings',
    date: 'June 2024',
    src: IMAGES.journal[0],
  },
  {
    id: 2,
    category: 'Destinations',
    headline: 'A guide to hosting a palace wedding in Udaipur',
    date: 'May 2024',
    src: IMAGES.journal[1],
  },
  {
    id: 3,
    category: 'Planning',
    headline: 'The eighteen-month timeline: when to decide what',
    date: 'April 2024',
    src: IMAGES.journal[2],
  },
]

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
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-sans text-[0.65rem] uppercase tracking-[0.3em] mb-6"
              style={{ color: 'hsl(32 31% 51%)' }}
            >
              — Journal
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '108%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.0, ease: EASE }}
                className="font-display font-light leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: 'hsl(24 12% 10%)' }}
              >
                Notes from the{' '}
                <span className="italic" style={{ color: 'hsl(32 31% 51%)' }}>studio.</span>
              </motion.h2>
            </div>
          </div>
          <Link
            href="/journal"
            data-cursor="link"
            className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider transition-colors duration-500"
            style={{ color: 'hsl(24 12% 10% / 0.6)' }}
          >
            All entries
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'hsl(24 12% 10% / 0.08)' }}>
          {POSTS.map((post, i) => (
            <JournalCard key={post.id} post={post} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function JournalCard({ post, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      <Link
        href="/journal"
        data-cursor="link"
        className="group block"
        style={{ backgroundColor: 'hsl(34 30% 95%)' }}
      >
        {/* Image placeholder */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '4/3' }}
        >
          <img
            src={post.src}
            alt={post.headline}
            data-cursor="media"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
            style={{ filter: 'grayscale(0.2) brightness(0.95)' }}
          />
        </div>

        {/* Content */}
        <div className="p-7 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <span
              className="font-sans text-[0.6rem] uppercase tracking-widest"
              style={{ color: 'hsl(32 31% 51%)' }}
            >
              {post.category}
            </span>
            <span
              className="font-sans text-[0.6rem]"
              style={{ color: 'hsl(24 12% 10% / 0.45)' }}
            >
              {post.date}
            </span>
          </div>
          <h3
            className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-[1.2] text-balance group-hover:text-gold transition-colors duration-500"
            style={{ color: 'hsl(24 12% 10%)' }}
          >
            {post.headline}
          </h3>
          <div
            className="mt-5 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-editorial"
            style={{ backgroundColor: 'hsl(32 31% 51% / 0.5)' }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
