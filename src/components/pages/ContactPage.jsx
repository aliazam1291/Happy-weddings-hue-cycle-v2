'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/pages/PageHero'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { ease } from '@/lib/motion'
import { CONTACT, BRAND } from '@/lib/content'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const CELEBRATIONS = ['Theme wedding', 'Destination wedding', 'Classic Indian wedding', 'Sangeet / event', 'Not sure yet']
const GUEST_RANGES = ['Under 150', '150 – 350', '350 – 600', '600+']

const initial = { name: '', email: '', phone: '', celebration: '', guests: '', date: '', message: '' }

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})

  const set = (key) => (eOrVal) => {
    const v = typeof eOrVal === 'string' ? eOrVal : eOrVal.target.value
    setValues((s) => ({ ...s, [key]: v }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!values.name.trim()) e.name = 'Please tell us your name.'
    if (!values.email.trim()) e.email = 'We need an email to reply.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'That email looks off.'
    if (!values.celebration) e.celebration = 'Pick the closest fit.'
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      toast.error('A few details need a second look.')
      return
    }
    // Wire to a real endpoint later — for now, acknowledge.
    setSent(true)
    toast.success('Enquiry sent — we\'ll be in touch within 24 hours.')
  }

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
              <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <FormField id="name" label="Your name" error={errors.name}>
                  <Input id="name" value={values.name} onChange={set('name')} placeholder="Riya & Aarav" aria-invalid={!!errors.name} />
                </FormField>

                <FormField id="email" label="Email" error={errors.email}>
                  <Input id="email" type="email" value={values.email} onChange={set('email')} placeholder="you@email.com" aria-invalid={!!errors.email} />
                </FormField>

                <FormField id="phone" label="Phone">
                  <Input id="phone" type="tel" value={values.phone} onChange={set('phone')} placeholder="+91 …" />
                </FormField>

                <FormField id="date" label="Wedding date (approx.)">
                  <Input id="date" type="date" value={values.date} onChange={set('date')} className="text-ink/80" />
                </FormField>

                <FormField id="celebration" label="Celebration" error={errors.celebration}>
                  <Select value={values.celebration} onValueChange={set('celebration')}>
                    <SelectTrigger aria-invalid={!!errors.celebration}>
                      <SelectValue placeholder="Choose a fit" />
                    </SelectTrigger>
                    <SelectContent>
                      {CELEBRATIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField id="guests" label="Guests (approx.)">
                  <Select value={values.guests} onValueChange={set('guests')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Guest range" />
                    </SelectTrigger>
                    <SelectContent>
                      {GUEST_RANGES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormField>

                <div className="sm:col-span-2">
                  <FormField id="message" label="Tell us about your celebration">
                    <Textarea id="message" rows={3} value={values.message} onChange={set('message')} placeholder="The world you imagine, your must-haves, anything you don't want…" />
                  </FormField>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <MagneticButton strength={0.3}>
                    <button
                      type="submit"
                      data-cursor="link"
                      className="group inline-flex items-center gap-4 font-sans text-xs uppercase tracking-[0.22em] px-10 py-5 border border-ink/30 text-ink hover:bg-gold hover:border-gold hover:text-ivory transition-all duration-500"
                    >
                      Send enquiry
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </button>
                  </MagneticButton>
                  <p className="mt-5 font-sans text-[0.62rem] uppercase tracking-[0.2em]" style={{ color: 'hsl(24 12% 10% / 0.4)' }}>
                    We reply within 24 hours · No spam, ever
                  </p>
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

function FormField({ id, label, error, children }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 font-sans text-[0.7rem] tracking-wide"
          style={{ color: 'hsl(13 60% 39%)' }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
