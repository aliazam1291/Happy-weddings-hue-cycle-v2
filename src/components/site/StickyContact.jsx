'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { CONTACT } from '@/lib/content'

/**
 * Persistent WhatsApp + Call floating buttons. Slide in after the user has
 * scrolled past the hero, so they don't compete with the opening moment.
 * On mobile both buttons show; on desktop the call button hides (users click
 * the number in the header instead).
 */
export function StickyContact() {
  const [shown, setShown] = useState(false)
  const phoneDigits = CONTACT.phones[0].replace(/[^+\d]/g, '')
  const waMsg = encodeURIComponent(
    'Hi Happy Weddings, I would like to enquire about planning a celebration.'
  )

  useEffect(() => {
    const fn = () => setShown(window.scrollY > window.innerHeight * 0.6)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 flex flex-col gap-3"
          aria-label="Quick contact"
        >
          <a
            href={`https://wa.me/${phoneDigits.replace('+', '')}?text=${waMsg}`}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            aria-label="Chat on WhatsApp"
            className="group inline-flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg transition-transform hover:scale-110"
            style={{ backgroundColor: '#25D366', color: 'white' }}
          >
            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
            <span className="sr-only">WhatsApp</span>
          </a>
          <a
            href={`tel:${phoneDigits}`}
            data-cursor="link"
            aria-label="Call us"
            className="md:hidden inline-flex items-center justify-center h-12 w-12 rounded-full shadow-lg transition-transform hover:scale-110"
            style={{ backgroundColor: 'hsl(32 31% 51%)', color: 'hsl(34 30% 95%)' }}
          >
            <Phone className="h-5 w-5" strokeWidth={2} />
            <span className="sr-only">Call</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
