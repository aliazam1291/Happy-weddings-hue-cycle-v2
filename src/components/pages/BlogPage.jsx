'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight, Download, Mail, Quote, BookOpen, Clock } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { Ornament } from '@/components/motion/Ornament'
import { TiltCard } from '@/components/motion/TiltCard'
import { ease } from '@/lib/motion'
import { POSTS, CATEGORIES } from '@/lib/posts'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

/* Dummy editorial copy used in the new quadrant blocks. Real content
   will replace this once Shruti's drafts are in. */
const EDITORS_NOTE = {
  issue: 'Issue 07 · Summer 2026',
  intro:
    'This month we sat with three brides on the eve of their weddings and asked the same question: what would you tell yourself a year ago? Their answers are the spine of the issue.',
  signature: 'Shruti Jain',
  role: 'Founder & Editor',
}

const TOPICS = [
  {
    title: 'Planning & timelines',
    body:
      'How we sequence the eighteen months before the day — the calls, the deposits, the unglamorous spreadsheets that hold the celebration together.',
  },
  {
    title: 'Design & restraint',
    body:
      'On editing the palette, the menu and the guest list. The most luxurious thing a wedding can have is room to breathe.',
  },
  {
    title: 'Destinations & permissions',
    body:
      'Goa, Udaipur, Jaipur and the in-between. What a destination wedding actually costs, and what you are paying for when you choose a palace.',
  },
  {
    title: 'Vendors & contracts',
    body:
      'The questions we ask every supplier before we sign — and the line items we have learned, the hard way, never to skip.',
  },
]

export function BlogPage() {
  const [cat, setCat] = useState('All')

  const filtered = useMemo(
    () => (cat === 'All' ? POSTS : POSTS.filter((p) => p.category === cat)),
    [cat],
  )

  const [feature, ...rest] = filtered

  return (
    <TooltipProvider delayDuration={120}>
      <main>
        <PageHero
          eyebrow="Journal"
          title="Notes from"
          accent="the studio."
          subtitle="Long-form on design, planning and the craft of celebration — written by Shruti Jain and the Happy Weddings team."
        />

        <EditorsLetter />

        {/* Filter — shadcn Tabs, editorial underline */}
        <section
          className="w-full sticky top-20 md:top-24 z-30 border-b backdrop-blur-md"
          style={{
            backgroundColor: 'hsl(34 30% 95% / 0.85)',
            borderColor: 'hsl(24 12% 10% / 0.06)',
          }}
        >
          <div className="container py-3 md:py-4 -mx-4 md:mx-0">
            <Tabs value={cat} onValueChange={setCat}>
              <div className="overflow-x-auto no-scrollbar">
                <TabsList className="flex flex-nowrap gap-6 md:gap-10 border-b-0 px-4 md:px-0">
                  {CATEGORIES.map((c) => (
                    <TabsTrigger
                      key={c}
                      value={c}
                      className="shrink-0 py-3 md:py-4 tracking-[0.22em]"
                    >
                      {c}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </div>
        </section>

        {/* Feature + Topics quadrant */}
        <section
          className="w-full pt-16 md:pt-24 pb-16 md:pb-20"
          style={{ backgroundColor: 'hsl(34 30% 95%)' }}
        >
          <div className="container">
            <AnimatePresence mode="wait">
              {feature ? (
                <FeatureWithTopics key={feature.slug} post={feature} />
              ) : (
                <EmptyState key={`empty-${cat}`} />
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Post grid — offset rhythm, generous negative space */}
        <section
          className="w-full pb-24 md:pb-32"
          style={{ backgroundColor: 'hsl(34 30% 95%)' }}
        >
          <div className="container">
            {rest.length > 0 && (
              <div className="flex items-end justify-between gap-8 mb-12 md:mb-20">
                <div>
                  <p
                    className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-3 md:mb-4"
                    style={{ color: 'hsl(32 31% 46%)' }}
                  >
                    — More entries
                  </p>
                  <h2
                    className="font-display font-light tracking-[-0.02em] leading-[0.95]"
                    style={{
                      fontSize: 'clamp(2rem, 4.4vw, 3.4rem)',
                      color: 'hsl(24 12% 10%)',
                    }}
                  >
                    From the{' '}
                    <span className="italic" style={{ color: 'hsl(32 31% 51%)' }}>
                      archive.
                    </span>
                  </h2>
                </div>
                <p
                  className="hidden md:block max-w-xs font-sans font-light text-sm leading-relaxed"
                  style={{ color: 'hsl(24 12% 10% / 0.6)' }}
                >
                  Long-form pieces, real weddings and quiet opinions — written between projects, never on a schedule.
                </p>
              </div>
            )}

            <LayoutGroup id="blog-grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-28">
                <AnimatePresence mode="sync">
                  {rest.map((p, i) => (
                    <motion.div
                      key={p.slug}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.05,
                        ease: ease.editorial,
                      }}
                      /* Editorial offset rhythm — every third card sinks,
                         every second lifts. Disabled on mobile to keep the
                         vertical flow clean on small screens. */
                      className={
                        i % 3 === 1
                          ? 'md:-translate-y-10 lg:-translate-y-16'
                          : i % 3 === 2
                            ? 'md:translate-y-6 lg:translate-y-10'
                            : ''
                      }
                    >
                      <PostCard post={p} />
                    </motion.div>
                  ))}
                  {rest.length >= 3 && (
                    <motion.div
                      key="lead-magnet-card"
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: ease.editorial }}
                      className="md:translate-y-4 lg:translate-y-6"
                    >
                      <LeadMagnetCard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </LayoutGroup>
          </div>
        </section>

        <NewsletterBlock />
      </main>
    </TooltipProvider>
  )
}

/* ── Editor's letter — asymmetric quadrant (4/12 + 7/12) ───────── */
function EditorsLetter() {
  return (
    <section
      className="w-full py-20 md:py-32"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: ease.editorial }}
            className="lg:col-span-4 lg:pt-6"
          >
            <Badge variant="gold" size="sm">
              Editor&apos;s Letter
            </Badge>
            <p
              className="mt-6 font-sans text-[0.6rem] uppercase tracking-[0.28em]"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              {EDITORS_NOTE.issue}
            </p>
            <Separator tone="gold" className="mt-6 w-16" />
            <p
              className="mt-6 font-display italic text-lg leading-snug max-w-[22ch]"
              style={{ color: 'hsl(24 12% 10% / 0.7)' }}
            >
              A short note before you read on.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: ease.editorial, delay: 0.1 }}
            className="lg:col-span-7 lg:col-start-6 relative"
          >
            <Quote
              aria-hidden
              className="absolute -top-6 -left-3 md:-top-10 md:-left-10 h-14 w-14 md:h-20 md:w-20 opacity-15"
              style={{ color: 'hsl(32 31% 51%)' }}
              strokeWidth={0.8}
            />
            <p
              className="font-display font-light tracking-[-0.01em] leading-[1.15]"
              style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)',
                color: 'hsl(24 12% 10%)',
              }}
            >
              {EDITORS_NOTE.intro}
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div
                className="h-px flex-1 max-w-[5rem]"
                style={{ backgroundColor: 'hsl(32 31% 51% / 0.5)' }}
              />
              <div>
                <p
                  className="font-display italic text-lg"
                  style={{ color: 'hsl(24 12% 10%)' }}
                >
                  {EDITORS_NOTE.signature}
                </p>
                <p
                  className="font-sans text-[0.6rem] uppercase tracking-[0.28em] mt-1"
                  style={{ color: 'hsl(24 12% 10% / 0.5)' }}
                >
                  {EDITORS_NOTE.role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Featured post + topics accordion sidebar (quadrant) ───────── */
function FeatureWithTopics({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8, ease: ease.editorial }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start"
    >
      {/* Featured article — image left, body underneath on mobile */}
      <article className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        <Link
          href={`/blog/${post.slug}`}
          data-cursor="media"
          className="group relative block md:col-span-12 overflow-hidden"
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
            style={{
              backgroundColor: 'hsl(34 30% 95%)',
              color: 'hsl(24 12% 10%)',
            }}
          >
            Featured · {post.category}
          </span>
        </Link>

        <div className="md:col-span-10 md:pt-2">
          <div className="flex items-center gap-4 mb-5">
            <p
              className="font-sans text-[0.6rem] uppercase tracking-[0.28em]"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              {fmtDate(post.date)}
            </p>
            <span style={{ color: 'hsl(24 12% 10% / 0.3)' }}>·</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] uppercase tracking-[0.28em] cursor-help"
                  style={{ color: 'hsl(32 31% 46%)' }}
                >
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min read
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Approx. {Math.round(post.readingTime * 220)} words
              </TooltipContent>
            </Tooltip>
          </div>

          <Link href={`/blog/${post.slug}`} data-cursor="link" className="group block">
            <h2
              className="font-display font-light tracking-[-0.02em] leading-[1.0] text-balance transition-colors duration-500 group-hover:text-gold"
              style={{
                fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
                color: 'hsl(24 12% 10%)',
              }}
            >
              {post.title}
            </h2>
          </Link>
          <p
            className="mt-6 font-sans font-light text-base md:text-lg leading-relaxed max-w-xl"
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
      </article>

      {/* Topics — Accordion in the upper-right quadrant, sticky on desktop */}
      <aside className="lg:col-span-4 lg:pl-4 lg:sticky lg:top-44">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <BookOpen className="h-4 w-4" style={{ color: 'hsl(32 31% 51%)' }} />
          <p
            className="font-sans text-[0.6rem] uppercase tracking-[0.32em]"
            style={{ color: 'hsl(32 31% 46%)' }}
          >
            In this issue
          </p>
        </div>
        <Accordion type="single" collapsible defaultValue="item-0">
          {TOPICS.map((t, i) => (
            <AccordionItem key={t.title} value={`item-${i}`}>
              <AccordionTrigger className="text-lg md:text-xl py-5 md:py-6">
                {t.title}
              </AccordionTrigger>
              <AccordionContent>{t.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
    </motion.div>
  )
}

/* ── Standard post card ────────────────────────────────────────── */
function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} data-cursor="link" className="group block">
      <TiltCard intensity={4} glare={false} perspective={1200} scale={1.012}>
        <div
          className="relative overflow-hidden mb-6"
          style={{ aspectRatio: '4/5' }}
        >
          <img
            src={post.cover}
            alt={post.title}
            data-cursor="media"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
            style={{ filter: 'saturate(0.88) brightness(0.96)' }}
          />
          <span
            className="absolute bottom-4 left-4 inline-flex items-center font-sans text-[0.55rem] uppercase tracking-[0.28em] px-2.5 py-1"
            style={{
              backgroundColor: 'hsl(34 30% 95% / 0.92)',
              color: 'hsl(24 12% 10%)',
            }}
          >
            {post.category}
          </span>
        </div>
      </TiltCard>
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-sans text-[0.6rem] uppercase tracking-widest"
          style={{ color: 'hsl(32 31% 46%)' }}
        >
          {fmtDate(post.date)}
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="inline-flex items-center gap-1 font-sans text-[0.6rem] cursor-help"
              style={{ color: 'hsl(24 12% 10% / 0.45)' }}
            >
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </span>
          </TooltipTrigger>
          <TooltipContent>{post.readingTime} minute read</TooltipContent>
        </Tooltip>
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
        <p
          className="font-sans text-[0.6rem] uppercase tracking-widest mb-5"
          style={{ color: 'hsl(32 31% 60%)' }}
        >
          Free guide · PDF
        </p>
        <h3
          className="font-display tracking-[-0.02em] leading-[1.05] text-balance mb-4"
          style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2rem)' }}
        >
          The{' '}
          <span className="italic" style={{ color: 'hsl(32 35% 62%)' }}>
            Happy Weddings
          </span>{' '}
          planning guide.
        </h3>
        <p
          className="font-sans text-sm leading-relaxed mb-8"
          style={{ color: 'hsl(34 30% 95% / 0.65)' }}
        >
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

/* ── Newsletter block — bottom quadrant, generous negative space ── */
function NewsletterBlock() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section
      className="w-full py-24 md:py-40 border-t"
      style={{
        backgroundColor: 'hsl(34 30% 95%)',
        borderColor: 'hsl(24 12% 10% / 0.08)',
      }}
    >
      <div className="container">
        <Ornament className="mb-16 md:mb-24" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="lg:col-span-7 lg:col-start-2">
            <p
              className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-6"
              style={{ color: 'hsl(32 31% 46%)' }}
            >
              — The mailing list
            </p>
            <h2
              className="font-display font-light tracking-[-0.02em] leading-[0.95] text-balance"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                color: 'hsl(24 12% 10%)',
              }}
            >
              One letter a month.{' '}
              <span className="italic" style={{ color: 'hsl(32 31% 51%)' }}>
                No noise.
              </span>
            </h2>
            <p
              className="mt-8 max-w-md font-sans font-light text-base leading-relaxed"
              style={{ color: 'hsl(24 12% 10% / 0.66)' }}
            >
              A short note from Shruti on what we are designing, reading and quietly arguing about that month. Unsubscribe with one click.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            {sent ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: ease.editorial }}
                className="font-display italic text-xl"
                style={{ color: 'hsl(32 31% 46%)' }}
              >
                You&apos;re on the list. The next letter goes out on the first of the month.
              </motion.p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSent(true)
                }}
                className="flex flex-col gap-5"
              >
                <Input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="ink" size="default" shape="soft">
                  Subscribe
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
                <p
                  className="font-sans text-[0.6rem] uppercase tracking-[0.22em]"
                  style={{ color: 'hsl(24 12% 10% / 0.45)' }}
                >
                  Four thousand readers · Monthly · Free
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
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
      <p
        className="font-display italic text-2xl"
        style={{ color: 'hsl(24 12% 10% / 0.5)' }}
      >
        Nothing here yet — try another category.
      </p>
    </motion.div>
  )
}
