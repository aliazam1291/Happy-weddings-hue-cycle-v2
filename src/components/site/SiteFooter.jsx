'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SplitTextReveal } from '@/components/motion/SplitTextReveal'
import { Marquee } from '@/components/motion/Marquee'

const SITEMAP = [
  {
    title: 'Studio',
    links: [
      { href: '/about', label: 'About' },
      { href: '/services', label: 'Services' },
      { href: '/journal', label: 'Journal' },
    ],
  },
  {
    title: 'Work',
    links: [
      { href: '/work', label: 'All weddings' },
      { href: '/work?filter=destination', label: 'Destination' },
      { href: '/work?filter=editorial', label: 'Editorial' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: '/contact', label: 'Begin a conversation' },
      { href: 'mailto:hello@happyweddings.in', label: 'hello@happyweddings.in' },
      { href: 'tel:+910000000000', label: '+91 00000 00000' },
    ],
  },
]

const SOCIALS = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Pinterest' },
  { href: '#', label: 'Vimeo' },
]

export function SiteFooter() {
  return (
    <footer className="relative bg-ink text-ivory">
      {/* Big editorial mark, marquee-style */}
      <div className="py-16 border-b border-ivory/10 overflow-hidden">
        <Marquee duration={48}>
          <span className="font-display italic text-[18vw] leading-none text-ivory/95 px-12">
            Happy Weddings
          </span>
          <span className="font-display text-[18vw] leading-none text-gold px-12">✦</span>
          <span className="font-display text-[18vw] leading-none text-ivory/15 px-12">
            since 2013
          </span>
          <span className="font-display text-[18vw] leading-none text-gold px-12">✦</span>
        </Marquee>
      </div>

      <div className="container py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* CTA column */}
        <div className="md:col-span-5">
          <p className="eyebrow text-gold mb-8">— Begin</p>
          <SplitTextReveal
            as="h2"
            className="font-display text-display-md text-ivory tracking-editorial text-balance"
          >
            Let&apos;s shape something timeless.
          </SplitTextReveal>
          <Link
            href="/contact"
            data-cursor="link"
            className="mt-10 inline-flex items-center gap-3 group"
          >
            <span className="font-display italic text-3xl text-ivory border-b border-gold/50 pb-1 group-hover:border-gold transition-colors">
              hello@happyweddings.in
            </span>
            <ArrowUpRight className="h-6 w-6 text-gold transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Sitemap columns */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {SITEMAP.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-ivory/40 mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      data-cursor="link"
                      className="font-display text-lg text-ivory/85 hover:text-gold transition-colors duration-500 ease-editorial"
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

      {/* Terracotta accent rule — the 1% punctuation */}
      <div className="h-px bg-terracotta/70 mx-6" />

      <div className="container py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <p className="font-sans text-xs text-ivory/50 tracking-wide">
          © {new Date().getFullYear()} Happy Weddings by Shruti Jain. A named house.
        </p>
        <div className="flex items-center gap-8">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              data-cursor="link"
              className="font-sans text-xs uppercase tracking-wider text-ivory/65 hover:text-gold transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="font-sans text-[0.65rem] uppercase tracking-widest text-ivory/30">
          Hue Cycle × Happy Weddings
        </p>
      </div>
    </footer>
  )
}
