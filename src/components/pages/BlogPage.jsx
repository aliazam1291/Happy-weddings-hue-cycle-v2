'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { Ornament } from '@/components/motion/Ornament'
import { ease } from '@/lib/motion'
import { POSTS, CATEGORIES } from '@/lib/posts'

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

export function BlogPage() {
  const [cat, setCat] = useState('All')

  const filtered = useMemo(
    () => (cat === 'All' ? POSTS : POSTS.filter((p) => p.category === cat)),
    [cat],
  )

  const [feature, ...rest] = filtered

  return (
    <main>
      <PageHero
        eyebrow="Journal"
        title="Notes from"
        accent="the studio."
        subtitle="Long-form on design, planning and the craft of celebration — written by Shruti Jain and the Happy Weddings team."
      />

      {/* Filter chips */}
      <section
        className="w-full sticky top-20 md:top-24 z-30 border-b backdrop-blur-md"
        style={{
          backgroundColor: 'hsl(34 30% 95% / 0.85)',
          borderColor: 'hsl(24 12% 10% / 0.06)',
        }}
      >
        <div className="container py-4 md:py-5 -mx-2 md:mx-0 overflow-x-auto no-scrollbar">
          <LayoutGroup id="blog-filter">
            <div className="flex flex-nowrap items-center gap-2.5 md:gap-3 px-2 md:px-0">
              {CATEGORIES.map((c) => {
                const active = cat === c
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    data-cursor="link"
                    className="relative shrink-0 inline-flex items-center font-sans text-[0.65rem] md:text-xs uppercase tracking-[0.22em] px-4 md:px-5 py-2.5 md:py-3 transition-colors duration-400 ease-editorial"
                    style={{ color: active ? 'hsl(34 30% 95%)' : 'hsl(24 12% 10% / 0.7)' }}
                  >
                    {active && (
                      <motion.span
                        layoutId="blog-chip"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: 'hsl(24 12% 10%)' }}
                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{c}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </div>
      </section>

      <section className="w-full py-16 md:py-24" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <div className="container">
          <AnimatePresence mode="popLayout">
            {feature ? (
              <FeaturedPost key={feature.slug} post={feature} />
            ) : (
              <EmptyState key={`empty-${cat}`} />
            )}
          </AnimatePresence>

          {rest.length > 0 && <Ornament className="my-16 md:my-20" />}

          <LayoutGroup id="blog-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-20">
              <AnimatePresence mode="popLayout">
                {rest.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, delay: i * 0.04, ease: ease.editorial }}
                  >
                    <PostCard post={p} />
                  </motion.div>
                ))}
                {/* Lead magnet card sits inside the grid as a visual peer */}
                {rest.length >= 3 && (
                  <motion.div
                    key="lead-magnet-card"
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: ease.editorial }}
                  >
                    <LeadMagnetCard />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </div>
      </section>
    </main>
  )
}

/* ── Featured post (large, asymmetric) ──────────────────────────── */
function FeaturedPost({ post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.7, ease: ease.editorial }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start"
    >
      <Link
        href={`/blog/${post.slug}`}
        data-cursor="media"
        className="group relative block lg:col-span-7 overflow-hidden"
        style={{ aspectRatio: '4 / 3' }}
      >
        <img
          src={post.cover}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
          style={{ filter: 'saturate(0.86) brightness(0.95)' }}
        />
        <span
          className="absolute top-5 left-5 inline-flex items-center font-sans text-[0.58rem] uppercase tracking-[0.28em] px-3 py-1.5"
          style={{ backgroundColor: 'hsl(34 30% 95%)', color: 'hsl(24 12% 10%)' }}
        >
          Featured · {post.category}
        </span>
      </Link>

      <div className="lg:col-span-5 lg:pl-2 lg:pt-6">
        <p
          className="font-sans text-[0.6rem] uppercase tracking-[0.28em] mb-5"
          style={{ color: 'hsl(32 31% 46%)' }}
        >
          {fmtDate(post.date)} · {post.readingTime} min read
        </p>
        <Link href={`/blog/${post.slug}`} data-cursor="link" className="group block">
          <h2
            className="font-display font-light tracking-[-0.02em] leading-[1.0] text-balance transition-colors duration-500 group-hover:text-gold"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.4rem)', color: 'hsl(24 12% 10%)' }}
          >
            {post.title}
          </h2>
        </Link>
        <p
          className="mt-6 font-sans font-light text-base leading-relaxed max-w-md"
          style={{ color: 'hsl(24 12% 10% / 0.66)' }}
        >
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          data-cursor="link"
          className="mt-8 inline-flex items-center gap-3 group"
        >
          <span
            className="font-sans text-xs uppercase tracking-[0.22em] transition-colors duration-500 group-hover:text-gold"
            style={{ color: 'hsl(24 12% 10% / 0.75)' }}
          >
            Read the piece
          </span>
          <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </motion.article>
  )
}

/* ── Standard post card ────────────────────────────────────────── */
function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} data-cursor="link" className="group block">
      <div className="relative overflow-hidden mb-6" style={{ aspectRatio: '4/5' }}>
        <img
          src={post.cover}
          alt={post.title}
          data-cursor="media"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
          style={{ filter: 'saturate(0.88) brightness(0.96)' }}
        />
      </div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-[0.6rem] uppercase tracking-widest" style={{ color: 'hsl(32 31% 46%)' }}>
          {post.category}
        </span>
        <span className="font-sans text-[0.6rem]" style={{ color: 'hsl(24 12% 10% / 0.45)' }}>
          {fmtDate(post.date)} · {post.readingTime} min
        </span>
      </div>
      <h3
        className="font-display text-xl md:text-2xl tracking-[-0.01em] leading-[1.2] text-balance group-hover:text-gold transition-colors duration-500"
        style={{ color: 'hsl(24 12% 10%)' }}
      >
        {post.title}
      </h3>
      <div
        className="mt-4 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-editorial"
        style={{ backgroundColor: 'hsl(32 31% 51% / 0.5)' }}
      />
    </Link>
  )
}

/* ── Lead-magnet card — sits inside the grid as a peer ─────────── */
function LeadMagnetCard() {
  return (
    <div
      className="relative h-full flex flex-col justify-between p-8 md:p-10 overflow-hidden"
      style={{ backgroundColor: 'hsl(24 12% 10%)', color: 'hsl(34 30% 95%)' }}
    >
      <div>
        <p className="font-sans text-[0.6rem] uppercase tracking-widest mb-5" style={{ color: 'hsl(32 31% 60%)' }}>
          Free guide · PDF
        </p>
        <h3
          className="font-display tracking-[-0.02em] leading-[1.05] text-balance mb-4"
          style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2rem)' }}
        >
          The <span className="italic" style={{ color: 'hsl(32 35% 62%)' }}>Happy Weddings</span> planning guide.
        </h3>
        <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: 'hsl(34 30% 95% / 0.65)' }}>
          Twelve years of timelines, vendor questions, and budget patterns — distilled into a 28-page PDF.
        </p>
      </div>
      <LeadMagnetForm />
      <Download
        aria-hidden
        className="absolute -bottom-6 -right-4 h-32 w-32 opacity-10"
        strokeWidth={0.5}
      />
    </div>
  )
}

/* ── Compact email capture used inside the lead-magnet card ────── */
function LeadMagnetForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.editorial }}
        className="font-display italic text-lg"
        style={{ color: 'hsl(32 35% 62%)' }}
      >
        Sent. Check your inbox in a few minutes — and your spam folder, just in case.
      </motion.p>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email.trim()) setSent(true)
      }}
      className="flex items-center gap-3 border-b pb-2"
      style={{ borderColor: 'hsl(34 30% 95% / 0.3)' }}
    >
      <Mail className="h-4 w-4 shrink-0" style={{ color: 'hsl(32 35% 62%)' }} />
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-transparent outline-none font-sans text-sm placeholder:text-ivory/40"
        style={{ color: 'hsl(34 30% 95%)' }}
      />
      <button
        type="submit"
        data-cursor="link"
        className="font-sans text-[0.6rem] uppercase tracking-[0.22em] hover:text-gold transition-colors"
      >
        Send →
      </button>
    </form>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 text-center"
    >
      <p className="font-display italic text-2xl" style={{ color: 'hsl(24 12% 10% / 0.5)' }}>
        Nothing here yet — try another category.
      </p>
    </motion.div>
  )
}
