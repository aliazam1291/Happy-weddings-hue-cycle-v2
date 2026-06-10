'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/pages/PageHero'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { ease } from '@/lib/motion'
import { CONTACT, BRAND } from '@/lib/content'

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'date', label: 'Wedding date (approx.)', type: 'text' },
]

export function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <main>
      <PageHero
        eyebrow="Enquire"
        title="Let’s plan"
        accent="something immortal."
        subtitle={`Every celebration begins with a conversation. ${CONTACT.booking}`}
      />

      <section className="w-full" style={{ backgroundColor: 'hsl(34 30% 95%)' }}>
        <div className="container py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Details */}
          <div className="lg:col-span-5">
            <p className="font-sans text-[0.62rem] uppercase tracking-[0.3em] mb-8" style={{ color: 'hsl(32 31% 46%)' }}>
              — {BRAND.city}
            </p>
            <div className="space-y-8">
              <Detail label="Studio" value={CONTACT.address} />
              <Detail label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <Detail label="Phone" value={CONTACT.phones.join(' · ')} href={`tel:${CONTACT.phones[0].replace(/[^+\d]/g, '')}`} />
              <div>
                <p className="font-sans text-[0.6rem] uppercase tracking-widest mb-3" style={{ color: 'hsl(24 12% 10% / 0.4)' }}>Follow</p>
                <div className="flex flex-wrap gap-5">
                  {CONTACT.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor="link" className="font-sans text-sm hover:text-gold transition-colors" style={{ color: 'hsl(24 12% 10% / 0.7)' }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: ease.editorial }}
                className="h-full flex flex-col justify-center py-10"
              >
                <p className="font-display italic text-3xl md:text-4xl mb-4" style={{ color: 'hsl(24 12% 10%)' }}>
                  Thank you.
                </p>
                <p className="font-sans font-light text-base max-w-md" style={{ color: 'hsl(24 12% 10% / 0.6)' }}>
                  We&apos;ve received your note and will be in touch shortly. For anything urgent, call {CONTACT.phones[0]}.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true) }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9"
              >
                {FIELDS.map((f) => (
                  <Field key={f.name} {...f} />
                ))}
                <div className="sm:col-span-2">
                  <Field name="message" label="Tell us about your celebration" type="textarea" />
                </div>
                <div className="sm:col-span-2">
                  <MagneticButton strength={0.3}>
                    <button type="submit" data-cursor="link" className="group inline-flex items-center gap-4 font-sans text-xs uppercase tracking-[0.22em] px-10 py-5 border border-ink/30 text-ink hover:bg-gold hover:border-gold hover:text-ivory transition-all duration-500">
                      Send enquiry
                      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function Detail({ label, value, href }) {
  const inner = (
    <p className="font-display text-xl md:text-2xl leading-snug" style={{ color: 'hsl(24 12% 10% / 0.85)' }}>{value}</p>
  )
  return (
    <div>
      <p className="font-sans text-[0.6rem] uppercase tracking-widest mb-2" style={{ color: 'hsl(24 12% 10% / 0.4)' }}>{label}</p>
      {href ? <a href={href} data-cursor="link" className="hover:text-gold transition-colors">{inner}</a> : inner}
    </div>
  )
}

function Field({ name, label, type }) {
  const base =
    'w-full bg-transparent border-b border-ink/20 pb-2 font-sans text-base text-ink placeholder:text-ink/30 focus:border-gold focus:outline-none transition-colors'
  return (
    <label className="block">
      <span className="block font-sans text-[0.6rem] uppercase tracking-widest mb-3" style={{ color: 'hsl(24 12% 10% / 0.5)' }}>{label}</span>
      {type === 'textarea' ? (
        <textarea name={name} rows={3} className={base} />
      ) : (
        <input name={name} type={type} className={base} />
      )}
    </label>
  )
}
