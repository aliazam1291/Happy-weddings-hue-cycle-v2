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
      { href: '/projects', label: 'All projects' },
      { href: '/projects', label: 'Theme weddings' },
      { href: '/projects', label: 'Destination' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: '/contact', label: 'Enquire now' },
      { href: 'mailto:happyweddingsforu@gmail.com', label: 'happyweddingsforu@gmail.com' },
      { href: 'tel:+918827188884', label: '+91 88271-88884' },
      { href: 'tel:+917313547763', label: '0731-3547763' },
    ],
  },
]

const SOCIALS = [
  { href: 'https://instagram.com/happyweddingsofficial', label: 'Instagram' },
  { href: 'https://facebook.com/happyweddingsofficial', label: 'Facebook' },
  { href: 'https://youtube.com/@happyweddingsofficial', label: 'YouTube' },
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

      <div className="container py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
        {/* CTA column */}
        <div className="md:col-span-5">
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
            className="mt-12 md:mt-16 inline-flex items-center gap-3 group"
          >
            <span className="font-display italic text-xl md:text-2xl text-ivory border-b border-gold/50 pb-2 group-hover:border-gold transition-colors">
              happyweddingsforu@gmail.com
            </span>
            <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-gold transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          {/* Studio address */}
          <address className="mt-12 md:mt-16 not-italic font-sans text-xs md:text-sm leading-relaxed text-ivory/55">
            Happy Weddings — Studio<br />
            415, Apollo Premier, Vijay Nagar<br />
            Indore, India
          </address>
        </div>

        {/* Sitemap columns */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-12">
          {SITEMAP.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-ivory/40 mb-6 md:mb-8">{col.title}</p>
              <ul className="space-y-4 md:space-y-5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      data-cursor="link"
                      className="font-display text-lg md:text-xl text-ivory/85 hover:text-gold transition-colors duration-500 ease-editorial"
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

      <div className="container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
          <p className="font-sans text-xs text-ivory/50 tracking-wide leading-relaxed">
            © {new Date().getFullYear()} Happy Weddings by Shruti Jain. A named house.
          </p>
          <div className="flex items-center gap-8 md:gap-12">
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
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <p className="font-sans text-[0.65rem] uppercase tracking-widest text-ivory/30">
            Hue Cycle × Happy Weddings
          </p>
        </div>
      </div>
    </footer>
  )
}
