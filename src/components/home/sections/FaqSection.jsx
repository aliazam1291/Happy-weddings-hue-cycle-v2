'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { ease } from '@/lib/motion'
import { Ornament } from '@/components/motion/Ornament'

const FAQS = [
  {
    q: 'When should we book Happy Weddings?',
    a: 'We recommend reaching out six to twelve months ahead. Larger or destination weddings benefit from earlier conversations so we can hold venues and the right vendors before they fill up.',
  },
  {
    q: 'Do you only plan weddings in Indore?',
    a: 'Indore is our home studio, but we plan across India and overseas — Udaipur, Goa, Jaipur, Kerala and beyond. We arrive on the ground ahead of you and know the local crews.',
  },
  {
    q: 'What kinds of celebrations do you take on?',
    a: 'Theme weddings, destination weddings and classic Indian weddings are our three core offerings. We also handle Sangeet, Mehndi, Varmala and Ring Ceremonies as standalone events.',
  },
  {
    q: 'Is Shruti personally involved in every wedding?',
    a: 'Yes. Every Happy Weddings celebration is shaped by Shruti directly — from the first conversation through to the final send-off. The team scales around her, never replaces her.',
  },
  {
    q: 'How do payments work?',
    a: 'After a free consultation we share a tailored quote based on scope, scale and city. Bookings are confirmed with a retainer; the balance is staged across milestones.',
  },
  {
    q: 'Can we see real work before deciding?',
    a: 'Of course. Our Projects page and our YouTube channel hold films and stills from recent weddings. We are also happy to share full case studies on request.',
  },
]

export function FaqSection() {
  return (
    <section
      className="relative w-full py-20 md:py-28"
      style={{ backgroundColor: 'hsl(34 30% 95%)' }}
    >
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: ease.editorial }}
          className="font-sans text-[0.62rem] uppercase tracking-[0.32em] text-center mb-4"
          style={{ color: 'hsl(32 31% 46%)' }}
        >
          — FAQ Corner
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.1, ease: ease.editorial }}
          className="font-display font-light leading-[1.02] tracking-[-0.02em] text-center"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', color: 'hsl(24 12% 10%)' }}
        >
          Honest <span className="italic" style={{ color: 'hsl(32 31% 46%)' }}>answers.</span>
        </motion.h2>

        <Ornament className="my-8 md:my-10" />

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: ease.editorial }}
            >
              <AccordionItem value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p
                    className="font-sans font-light text-base leading-relaxed pb-7 max-w-2xl"
                    style={{ color: 'hsl(24 12% 10% / 0.7)' }}
                  >
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
