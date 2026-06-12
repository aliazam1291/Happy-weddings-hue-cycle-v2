'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Marquee } from '@/components/motion/Marquee'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin } from 'lucide-react'
import { CONTACT } from '@/lib/content'

const EASE = [0.22, 1, 0.36, 1]

export function InquiryCTA() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'hsl(33 32% 90%)' }}
    >
      {/* Marquee strip top */}
      <div className="py-6 border-b border-ink/10">
        <Marquee duration={55}>
          {['Timeless', 'Intentional', 'Emotional', 'Bespoke', 'Curated'].map((w, i) => (
            <span
              key={i}
              className="font-display italic px-10 select-none"
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                color: i % 3 === 2 ? 'hsl(13 60% 39%)' : 'hsl(24 12% 10% / 0.16)',
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
      <div className="container py-28 md:py-40 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12"
        >
          <Badge variant="gold" size="sm" shape="pill">Begin</Badge>
        </motion.div>

        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="font-display font-light tracking-[-0.03em] text-balance"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)', lineHeight: 0.95, color: 'hsl(24 12% 10%)' }}
          >
            Ready to tell
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            className="font-display italic tracking-[-0.03em] text-balance"
            style={{
              fontSize: 'clamp(3.2rem, 9vw, 8rem)',
              lineHeight: 0.95,
              color: 'hsl(32 31% 51%)',
            }}
          >
            your story?
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="font-display italic text-xl md:text-2xl mb-16 max-w-lg"
          style={{ color: 'hsl(24 12% 10% / 0.5)' }}
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
            <Button asChild variant="ink" size="lg" shape="pill" className="gap-4">
              <Link href="/contact" data-cursor="link" className="group">
                Start a conversation
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Info strip — three small cards with staggered negative offsets */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl"
        >
          {[
            { icon: Mail, label: 'Write', value: CONTACT.email, href: `mailto:${CONTACT.email}`, offset: 'md:-translate-y-4' },
            { icon: Phone, label: 'Call', value: CONTACT.phones[0], href: `tel:${CONTACT.phones[0].replace(/[^+\d]/g, '')}`, offset: 'md:translate-y-2' },
            { icon: MapPin, label: 'Studio', value: 'Indore & Nationwide', href: '/contact', offset: 'md:-translate-y-2' },
          ].map(({ icon: Icon, label, value, href, offset }) => (
            <Link key={value} href={href} data-cursor="link" className={`transform ${offset}`}>
              <Card
                variant="ghost"
                shape="soft"
                hover="glow"
                className="px-5 py-4 flex items-center gap-3 transition-colors duration-500 hover:border-gold/30"
              >
                <Icon className="h-4 w-4 shrink-0" style={{ color: 'hsl(32 31% 46%)' }} strokeWidth={1.5} />
                <div className="leading-tight text-left">
                  <p
                    className="font-sans text-[0.55rem] uppercase tracking-[0.22em] mb-0.5"
                    style={{ color: 'hsl(24 12% 10% / 0.45)' }}
                  >
                    {label}
                  </p>
                  <p className="font-sans text-xs" style={{ color: 'hsl(24 12% 10% / 0.75)' }}>
                    {value}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom brand line */}
      <div className="border-t border-ink/10 py-6">
        <Marquee duration={80} reverse>
          {['Happy Weddings', '·', 'Est. 2013', '·', 'Shruti Jain', '·', 'India & Beyond', '·'].map((w, i) => (
            <span
              key={i}
              className="font-sans text-[0.6rem] uppercase tracking-[0.3em] px-6"
              style={{ color: 'hsl(24 12% 10% / 0.2)' }}
            >
              {w}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
