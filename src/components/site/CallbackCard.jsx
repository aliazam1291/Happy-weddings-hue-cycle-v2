'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CONTACT } from '@/lib/content'
import { ease } from '@/lib/motion'

const WHEN_OPTIONS = ['Today', 'Tomorrow', 'This week']

const waNumber = (CONTACT.phones[0] || '+91 88271-88884').replace(/[^\d]/g, '')

function buildWhatsAppLink(context) {
  const msg = context
    ? `Hi Happy Weddings, I would like to enquire — ${context}`
    : 'Hi Happy Weddings, I would like to enquire about planning a celebration.'
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`
}

/**
 * Reusable lead-capture card used inside ProjectDialog, About CTA, Service rows.
 * Three-field "get a callback" form + click-to-call + WhatsApp.
 *
 * Props:
 *   - context: short string used in pre-filled WhatsApp message
 *   - tone: 'ink' (dark bg) | 'ivory' (light bg, default)
 *   - compact: tighten paddings (for dialogs)
 */
export function CallbackCard({ context, tone = 'ivory', compact = false }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [when, setWhen] = useState(WHEN_OPTIONS[0])
  const [sent, setSent] = useState(false)

  const dark = tone === 'ink'
  const bg = dark ? 'hsl(24 12% 10%)' : 'hsl(33 32% 90%)'
  const fg = dark ? 'hsl(34 30% 95%)' : 'hsl(24 12% 10%)'
  const subtle = dark ? 'hsl(34 30% 95% / 0.55)' : 'hsl(24 12% 10% / 0.55)'
  const border = dark ? 'hsl(34 30% 95% / 0.18)' : 'hsl(24 12% 10% / 0.12)'

  const padding = compact ? 'p-6 md:p-7' : 'p-7 md:p-9'

  return (
    <div
      className={`relative ${padding}`}
      style={{ backgroundColor: bg, color: fg }}
    >
      <p
        className="font-sans text-[0.6rem] uppercase tracking-[0.32em] mb-3"
        style={{ color: dark ? 'hsl(32 35% 62%)' : 'hsl(32 31% 46%)' }}
      >
        — Get a callback
      </p>
      <h3
        className="font-display tracking-[-0.01em] leading-[1.05] mb-5"
        style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)' }}
      >
        We'll call you at a time that suits.
      </h3>

      {sent ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ease.editorial }}
        >
          <p
            className="font-display italic text-lg leading-snug"
            style={{ color: dark ? 'hsl(32 35% 62%)' : 'hsl(32 31% 46%)' }}
          >
            Thank you, {name || 'there'}. Shruti or someone from the studio will call you {when.toLowerCase()}.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (name.trim() && phone.trim()) setSent(true)
          }}
          className="flex flex-col gap-4"
        >
          <Input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={dark ? 'border-b-ivory/20 text-ivory placeholder:text-ivory/40 focus:border-gold' : ''}
            style={dark ? { color: fg } : undefined}
          />
          <Input
            type="tel"
            required
            placeholder="Phone (with country code)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={dark ? 'border-b-ivory/20 text-ivory placeholder:text-ivory/40 focus:border-gold' : ''}
            style={dark ? { color: fg } : undefined}
          />

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span
              className="font-sans text-[0.58rem] uppercase tracking-[0.28em] mr-1"
              style={{ color: subtle }}
            >
              Best time:
            </span>
            {WHEN_OPTIONS.map((opt) => {
              const active = when === opt
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setWhen(opt)}
                  data-cursor="link"
                  className="font-sans text-[0.62rem] uppercase tracking-[0.22em] px-3 py-1.5 transition-colors duration-300"
                  style={{
                    color: active ? (dark ? 'hsl(24 12% 10%)' : 'hsl(34 30% 95%)') : fg,
                    backgroundColor: active
                      ? dark
                        ? 'hsl(32 35% 62%)'
                        : 'hsl(24 12% 10%)'
                      : 'transparent',
                    border: `1px solid ${active ? 'transparent' : border}`,
                  }}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          <Button
            type="submit"
            variant={dark ? 'solid' : 'ink'}
            size="default"
            shape="soft"
            className="mt-3"
          >
            Request callback
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </form>
      )}

      <Separator
        tone={dark ? 'ivory' : 'gold'}
        className="my-6 opacity-40"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`tel:${(CONTACT.phones[0] || '').replace(/\s+/g, '')}`}
          data-cursor="link"
          className="group flex-1 inline-flex items-center justify-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.22em] py-3 transition-colors duration-300"
          style={{
            border: `1px solid ${border}`,
            color: fg,
          }}
        >
          <Phone className="h-3.5 w-3.5" />
          Call us now
        </a>
        <a
          href={buildWhatsAppLink(context)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="group flex-1 inline-flex items-center justify-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.22em] py-3 transition-colors duration-300"
          style={{
            backgroundColor: dark ? 'hsl(32 35% 62%)' : 'hsl(32 31% 51%)',
            color: dark ? 'hsl(24 12% 10%)' : 'hsl(34 30% 95%)',
          }}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
      </div>

      <p
        className="mt-5 font-sans text-[0.58rem] uppercase tracking-[0.22em]"
        style={{ color: subtle }}
      >
        Booking a free consultation · No obligation · {CONTACT.booking?.replace(/^We recommend\s*/, '') || 'Reply within 24 hours'}
      </p>
    </div>
  )
}

export { buildWhatsAppLink }
