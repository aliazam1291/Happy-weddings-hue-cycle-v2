'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Marquee } from '@/components/motion/Marquee'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { Eyebrow } from '@/components/motion/Eyebrow'
import { Button } from '@/components/ui/button'
import { SplitText } from '@/components/reactbits/SplitText'
import { Mail, Phone, MapPin } from 'lucide-react'
import { CONTACT } from '@/lib/content'
import { IMAGES } from '@/lib/images'

const EASE = [0.22, 1, 0.36, 1]

const CONTACT_ITEMS = [
  { icon: Mail,  label: 'Write',  value: CONTACT.email,    href: `mailto:${CONTACT.email}` },
  { icon: Phone, label: 'Call',   value: CONTACT.phones[0], href: `tel:${CONTACT.phones[0].replace(/[^+\d]/g, '')}` },
  { icon: MapPin, label: 'Studio', value: 'Indore & Nationwide', href: '/contact' },
]

export function InquiryCTA() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'hsl(24 12% 10%)' }}
    >
      {/* Background photography — Udaipur palace at dusk */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <img
          src={IMAGES.stories[0].src}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.22, filter: 'brightness(0.6) saturate(0.75)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, hsl(24 12% 10% / 0.92) 0%, hsl(24 12% 10% / 0.72) 45%, hsl(24 12% 10% / 0.88) 100%)',
          }}
        />
      </div>

      {/* Top marquee strip */}
      <div className="relative z-10 py-6 border-b" style={{ borderColor: 'hsl(34 30% 95% / 0.08)' }}>
        <Marquee duration={55}>
          {['Timeless', 'Intentional', 'Emotional', 'Bespoke', 'Curated'].map((w, i) => (
            <span
              key={i}
              className="font-display italic px-10 select-none"
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                color: i % 3 === 2 ? 'hsl(13 60% 39%)' : 'hsl(34 30% 95% / 0.15)',
                lineHeight: 1,
              }}
            >
              {w}
              <span style={{ color: 'hsl(32 31% 51%)' }}> ✦ </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Main content */}
      <div className="relative z-10 container py-28 md:py-44 flex flex-col items-center text-center">
        <Eyebrow tone="ivory" className="mb-12">Begin</Eyebrow>

        <SplitText
          as="h2"
          text="Ready to tell"
          by="chars"
          stagger={0.035}
          className="block font-display font-light tracking-[-0.03em] text-balance mb-2"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)', lineHeight: 0.95, color: 'hsl(34 30% 95%)' }}
        />
        <SplitText
          as="h2"
          text="your story?"
          by="chars"
          delay={0.28}
          stagger={0.035}
          className="block font-display italic tracking-[-0.03em] text-balance mb-12"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)', lineHeight: 0.95, color: 'hsl(32 31% 51%)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="font-display italic text-xl md:text-2xl mb-16 max-w-lg"
          style={{ color: 'hsl(34 30% 95% / 0.5)' }}
        >
          Every celebration begins with a conversation. We listen first.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        >
          <MagneticButton strength={0.35}>
            <Button asChild variant="outlineLight" size="lg" shape="pill" className="gap-4">
              <Link href="/contact" data-cursor="link" className="group">
                Start a conversation
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Contact info strip — hairline bordered grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-20 w-full max-w-3xl border"
          style={{ borderColor: 'hsl(34 30% 95% / 0.1)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ '--tw-divide-opacity': 1 }}>
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }, idx) => (
              <Link
                key={value}
                href={href}
                data-cursor="link"
                className="group px-7 py-5 flex items-center gap-3 transition-colors duration-500 hover:bg-ivory/5"
                style={{ borderColor: 'hsl(34 30% 95% / 0.1)' }}
              >
                <Icon
                  className="h-4 w-4 shrink-0 transition-colors duration-500 group-hover:text-gold"
                  style={{ color: 'hsl(32 31% 51%)' }}
                  strokeWidth={1.5}
                />
                <div className="leading-tight text-left">
                  <p
                    className="font-sans uppercase tracking-[0.22em] mb-0.5"
                    style={{ fontSize: '0.55rem', color: 'hsl(34 30% 95% / 0.4)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="font-sans text-xs transition-colors duration-500 group-hover:text-ivory"
                    style={{ color: 'hsl(34 30% 95% / 0.7)' }}
                  >
                    {value}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom brand marquee */}
      <div
        className="relative z-10 border-t py-6"
        style={{ borderColor: 'hsl(34 30% 95% / 0.08)' }}
      >
        <Marquee duration={80} reverse>
          {['Happy Weddings', '·', 'Est. 2013', '·', 'Shruti Jain', '·', 'India & Beyond', '·'].map((w, i) => (
            <span
              key={i}
              className="font-sans uppercase tracking-[0.3em] px-6"
              style={{ fontSize: '0.6rem', color: 'hsl(34 30% 95% / 0.18)' }}
            >
              {w}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
