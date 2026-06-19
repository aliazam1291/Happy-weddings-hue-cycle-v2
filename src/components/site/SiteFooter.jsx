'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight, Mail } from 'lucide-react'
import { SplitTextReveal } from '@/components/motion/SplitTextReveal'
import { Marquee } from '@/components/motion/Marquee'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AWARDS, CONTACT, YOUTUBE, ytThumb, ytWatch } from '@/lib/content'

const SITEMAP = [
  {
    title: 'Studio',
    links: [
      { href: '/about', label: 'About' },
      { href: '/services', label: 'Services' },
      { href: '/blog', label: 'Journal' },
    ],
  },
  {
    title: 'Work',
    links: [
      { href: '/projects', label: 'All projects' },
      { href: '/projects', label: 'Theme weddings' },
      { href: '/projects', label: 'Destination' },
    ],
  },
  {
    title: 'Quick links',
    links: [
      { href: '/services#budget', label: 'Budget anatomy' },
      { href: '/blog', label: 'Free planning guide' },
      { href: '/contact', label: 'FAQ' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: '/contact', label: 'Enquire now' },
      { href: 'mailto:happyweddingsforu@gmail.com', label: 'happyweddingsforu@gmail.com' },
      { href: 'mailto:info@happyweddings.in', label: 'info@happyweddings.in' },
      { href: 'tel:+918827188884', label: '+91 88271-88884' },
      { href: 'tel:07314979427', label: '0731-4979427' },
    ],
  },
]

const SOCIALS = [
  { href: 'https://instagram.com/happyweddingsofficial', label: 'Instagram' },
  { href: 'https://facebook.com/happyweddingsofficial', label: 'Facebook' },
  { href: 'https://www.youtube.com/channel/UCLjcA6--sDfvXAe9qbX6klg', label: 'YouTube' },
  { href: 'https://twitter.com/happyweddings3', label: 'Twitter' },
]

export function SiteFooter() {
  return (
    <footer className="relative bg-ink text-ivory">
      {/* Big editorial mark, marquee-style */}
      <div className="py-20 md:py-32 border-b border-ivory/10 overflow-hidden">
        <Marquee duration={48}>
          <span className="font-display italic text-[12vw] md:text-[16vw] leading-none text-ivory/95 px-8 md:px-12">
            Happy Weddings
          </span>
          <span className="font-display text-[12vw] md:text-[16vw] leading-none text-gold px-8 md:px-12">✦</span>
          <span className="font-display text-[12vw] md:text-[16vw] leading-none text-ivory/15 px-8 md:px-12">
            since 2013
          </span>
          <span className="font-display text-[12vw] md:text-[16vw] leading-none text-gold px-8 md:px-12">✦</span>
        </Marquee>
      </div>

      {/* Season nudge — calendar-driven urgency for the Indian wedding market */}
      <SeasonNudge />

      <div className="container py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-14 md:gap-16">
        {/* CTA + Newsletter column */}
        <div className="lg:col-span-5">
          <p className="eyebrow text-gold mb-6 md:mb-8">— Begin</p>
          <SplitTextReveal
            as="h2"
            className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory tracking-editorial text-balance leading-tight"
          >
            Let&apos;s plan a wedding that captures the imagination.
          </SplitTextReveal>
          <Link
            href="/contact"
            data-cursor="link"
            className="mt-10 md:mt-12 inline-flex items-center gap-3 group"
          >
            <span className="font-display italic text-base md:text-2xl text-ivory border-b border-gold/50 pb-2 group-hover:border-gold transition-colors break-all">
              happyweddingsforu@gmail.com
            </span>
            <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-gold transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          {/* Newsletter */}
          <NewsletterForm />

          {/* Studio address */}
          <address className="mt-12 md:mt-14 not-italic font-sans text-xs md:text-sm leading-relaxed text-ivory/55">
            Happy Weddings — Studio<br />
            {CONTACT.address}
          </address>
        </div>

        {/* Sitemap columns */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-10 md:gap-8">
          {SITEMAP.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-ivory/40 mb-6 md:mb-8">{col.title}</p>
              <ul className="space-y-4 md:space-y-5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      data-cursor="link"
                      className="font-display text-base md:text-lg text-ivory/85 hover:text-gold transition-colors duration-500 ease-editorial leading-snug"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram tile strip */}
      <FilmStrip />

      <InstagramStrip />

      {/* Awards row */}
      <RecognitionRow />

      {/* Terracotta accent rule — the 1% punctuation */}
      <div className="h-px bg-terracotta/70 mx-6" />

      <div className="container py-10 md:py-14">
        {/* Shruti signature */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10 md:mb-12">
          <div>
            <p className="font-display italic text-2xl md:text-3xl text-gold mb-1">
              — Shruti
            </p>
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.28em] text-ivory/45">
              Founder · still reads every brief that comes in
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-9">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="font-sans text-[0.65rem] uppercase tracking-[0.24em] text-ivory/65 hover:text-gold transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-sans text-xs text-ivory/50 tracking-wide leading-relaxed">
            © {new Date().getFullYear()} Happy Weddings by Shruti Jain. A named house.
          </p>
          <p className="font-sans text-[0.65rem] uppercase tracking-widest text-ivory/30">
            Hue Cycle × Happy Weddings
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ── Season nudge — the urgency strip ──────────────────────────── */
function SeasonNudge() {
  return (
    <div
      className="border-b"
      style={{
        backgroundColor: 'hsl(24 12% 13%)',
        borderColor: 'hsl(34 30% 95% / 0.08)',
      }}
    >
      <div className="container py-5 md:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'hsl(32 35% 62%)' }}
            />
            <p
              className="font-sans text-[0.65rem] uppercase tracking-[0.28em]"
              style={{ color: 'hsl(34 30% 95% / 0.75)' }}
            >
              <span style={{ color: 'hsl(32 35% 62%)' }}>Booking now</span> — Wedding season Nov 2026 to Feb 2027
            </p>
          </div>
          <Link
            href="/contact"
            data-cursor="link"
            className="group inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.22em] hover:text-gold transition-colors"
            style={{ color: 'hsl(34 30% 95% / 0.65)' }}
          >
            11 slots left this year
            <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ── Newsletter inline form ────────────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <p
        className="mt-10 md:mt-12 font-display italic text-lg"
        style={{ color: 'hsl(32 35% 62%)' }}
      >
        On the list. The next letter goes out on the first.
      </p>
    )
  }

  return (
    <div className="mt-10 md:mt-12">
      <p className="font-sans text-[0.58rem] uppercase tracking-[0.32em] mb-4 text-ivory/55">
        — A monthly note from Shruti
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (email.trim()) setSent(true)
        }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-ivory/20 text-ivory placeholder:text-ivory/35 focus:border-gold"
        />
        <Button type="submit" variant="solid" size="default" shape="soft" className="shrink-0">
          <Mail className="h-3.5 w-3.5" />
          Subscribe
        </Button>
      </form>
    </div>
  )
}

/* ── Film strip — marquee of real covers from the YouTube channel ── */
function FilmStrip() {
  const tiles = YOUTUBE.videos
  return (
    <div className="border-t border-b border-ivory/10 overflow-hidden">
      <div className="container py-8 md:py-10">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <p className="font-sans text-[0.58rem] uppercase tracking-[0.32em] text-ivory/55">
            — Watch our films
          </p>
          <a
            href={YOUTUBE.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="group inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.22em] text-ivory/65 hover:text-gold transition-colors"
          >
            See all on YouTube
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
      <Marquee duration={55}>
        <div className="flex items-center gap-3 md:gap-4 px-3">
          {tiles.concat(tiles).map((v, i) => (
            <a
              key={`${v.id}-${i}`}
              href={ytWatch(v.id)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="media"
              data-cursor-label="Play"
              title={v.title}
              className="relative block shrink-0 overflow-hidden group"
              style={{ width: 'clamp(9rem, 18vw, 14rem)', aspectRatio: '16 / 9' }}
            >
              <img
                src={ytThumb(v.id, 'max')}
                alt={v.title}
                onError={(e) => { e.currentTarget.src = ytThumb(v.id, 'hq') }}
                className="h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
                style={{ filter: 'grayscale(0.25) brightness(0.82)' }}
              />
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 45%, hsl(24 14% 6% / 0.7) 100%)' }}
              />
              <span className="pointer-events-none absolute bottom-2.5 left-3 right-3 font-sans text-[0.56rem] leading-snug text-ivory/85 line-clamp-2">
                {v.title}
              </span>
            </a>
          ))}
        </div>
      </Marquee>
      <div className="py-6" />
    </div>
  )
}

/* ── Instagram strip — live posts via /api/instagram (real covers when a
   token is configured), graceful follow-CTA otherwise ──────────────── */
function InstagramStrip() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let active = true
    fetch('/api/instagram')
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => { if (active) setPosts(Array.isArray(d.posts) ? d.posts : []) })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const handle = (
    <a
      href="https://instagram.com/happyweddingsofficial"
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      className="group inline-flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.22em] text-ivory/65 hover:text-gold transition-colors"
    >
      @happyweddingsofficial
      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )

  // No token configured yet → clean follow bar instead of broken tiles.
  if (!posts.length) {
    return (
      <div className="border-t border-ivory/10">
        <div className="container py-7 md:py-9 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-sans text-[0.58rem] uppercase tracking-[0.32em] text-ivory/55">
            — Follow us on Instagram
          </p>
          {handle}
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-ivory/10 overflow-hidden">
      <div className="container py-8 md:py-10">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <p className="font-sans text-[0.58rem] uppercase tracking-[0.32em] text-ivory/55">
            — On Instagram
          </p>
          {handle}
        </div>
      </div>
      <Marquee duration={60}>
        <div className="flex items-center gap-3 md:gap-4 px-3">
          {posts.concat(posts).map((p, i) => (
            <a
              key={`${p.id}-${i}`}
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="media"
              data-cursor-label="View"
              title={p.caption}
              className="relative block shrink-0 overflow-hidden group"
              style={{ width: 'clamp(6.875rem, 14vw, 11.25rem)', aspectRatio: '1 / 1' }}
            >
              <img
                src={p.image}
                alt={p.caption || 'Instagram post'}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.06]"
                style={{ filter: 'grayscale(0.25) brightness(0.9)' }}
              />
            </a>
          ))}
        </div>
      </Marquee>
      <div className="py-6" />
    </div>
  )
}

/* ── Recognition / awards row ──────────────────────────────────── */
function RecognitionRow() {
  return (
    <div className="container py-10 md:py-12 border-b border-ivory/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="font-sans text-[0.58rem] uppercase tracking-[0.32em] text-ivory/55">
          — Recognised by
        </p>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {AWARDS.slice(0, 4).map((a) => (
            <Badge
              key={a.name}
              variant="outline"
              size="sm"
              className="border-ivory/25 text-ivory/70"
            >
              {a.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
