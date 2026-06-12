'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { CONTACT } from '@/lib/content'

/**
 * Persistent WhatsApp + Call floating buttons. Slide in after the user has
 * scrolled past the hero so they don't compete with the opening moment.
 *
 * The WhatsApp message is pre-filled based on the current pathname — couples
 * looking at /services get a different opening line than couples on /projects,
 * which makes the first reply more personal and converts better.
 *
 * Click-to-call now shows on desktop too (high-trust signal in the Indian
 * luxury market — older decision-makers strongly prefer phone).
 */

function buildContextMessage(pathname) {
  if (!pathname) return 'Hi Happy Weddings, I would like to enquire about planning a celebration.'
  if (pathname.startsWith('/projects')) {
    return 'Hi Happy Weddings, I was browsing your projects and would like to discuss a wedding like one of yours.'
  }
  if (pathname.startsWith('/services')) {
    return 'Hi Happy Weddings, I have a question about your services and would like to talk.'
  }
  if (pathname.startsWith('/about')) {
    return 'Hi Happy Weddings, I just read your story and would like to start a conversation.'
  }
  if (pathname.startsWith('/blog')) {
    return 'Hi Happy Weddings, I came from your Journal — could we talk about an upcoming wedding?'
  }
  if (pathname.startsWith('/contact')) {
    return 'Hi Happy Weddings, I would like to book a free consultation.'
  }
  return 'Hi Happy Weddings, I would like to enquire about planning a celebration.'
}

export function StickyContact() {
  const [shown, setShown] = useState(false)
  const pathname = usePathname()
  const phoneDigits = CONTACT.phones[0].replace(/[^+\d]/g, '')
  const waNumber = CONTACT.whatsapp || phoneDigits.replace('+', '')
  const waMsg = encodeURIComponent(buildContextMessage(pathname))

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
            href={`https://wa.me/${waNumber}?text=${waMsg}`}
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
            className="inline-flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg transition-transform hover:scale-110"
            style={{ backgroundColor: 'hsl(32 31% 51%)', color: 'hsl(34 30% 95%)' }}
          >
            <Phone className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
            <span className="sr-only">Call</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
