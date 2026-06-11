/**
 * Real brand content — sourced from happyweddings.in.
 * Centralised so copy/imagery swaps stay in one place.
 */
import { IMAGES, img } from '@/lib/images'

export const BRAND = {
  name: 'Happy Weddings',
  tagline: 'We Plan Weddings That Capture The Imagination',
  since: 2013,
  city: 'Indore',
  founder: 'Shruti Jain',
  founderRole: 'CEO & Founder',
}

export const CONTACT = {
  phones: ['+91 88271-88884', '0731-3547763'],
  email: 'happyweddingsforu@gmail.com',
  address: '415, Apollo Premier, Vijay Nagar, Indore',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/happyweddingsofficial' },
    { label: 'Facebook', href: 'https://facebook.com/happyweddingsofficial' },
    { label: 'YouTube', href: 'https://youtube.com/@happyweddingsofficial' },
  ],
  booking: 'We recommend booking 6–12 months in advance.',
}

// Primary navigation — mirrors the real site, mapped to our routes
export const NAV = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
]

export const ABOUT = {
  eyebrow: 'The House',
  title: 'A named house since 2013.',
  mission:
    'We don’t plan to rule the industry — we plan to rule the hearts. Hassle-free wedding planning at the most competent rates, customised to your taste while keeping every moment extravagant. Making each wedding we plan immortal is our mission.',
  vision:
    'To deliver immaculate services shaped around each family’s wishes — and, in doing so, to nurture long-standing associations founded on conviction and consistency.',
  founderBio:
    'Shruti Jain founded Happy Weddings in 2013. An innovator and a purist with an ardent eye for every wedding detail, she has been fascinated by weddings since childhood. Her prompt planning, decisive judgement and customer-first ideology shape celebrations that are lively, colourful and ever-remembering.',
  quote: 'A wedding should look like the people inside it — not like a wedding.',
}

// The seven real services + supporting craft
export const SERVICES = [
  {
    num: '01',
    title: 'Production & Entertainment',
    sub: 'The invitation to the first dance',
    copy: 'Choose from an extensive collection of invitation cards with impressive matter in your preferred language — then a full programme of entertainment that carries the celebration.',
    src: IMAGES.services[0],
  },
  {
    num: '02',
    title: 'Décor & Lighting',
    sub: 'Crafted to your vision',
    copy: 'From elegant centrepieces to captivating lighting, our designers craft every detail to reflect your unique vision — one design language across the whole celebration.',
    src: IMAGES.services[2],
  },
  {
    num: '03',
    title: 'Technical & Production',
    sub: 'Handled with love',
    copy: 'No more failed mics or speakers louder than needed. Our technical team manages sound, stage and production so the day runs without a hitch.',
    src: img('svc-technical', 1400, 1600),
  },
  {
    num: '04',
    title: 'Food & Beverages',
    sub: 'A table to remember',
    copy: 'Menus curated with hand-picked caterers — flavours and presentation that suit your theme and your guests, from welcome to send-off.',
    src: IMAGES.services[1],
  },
  {
    num: '05',
    title: 'Choreography',
    sub: 'Train your feet',
    copy: 'Dance with our hand-picked choreographers. Our entertainers take care of Sangeet Nights so every performance lands.',
    src: img('svc-choreo', 1400, 1600),
  },
  {
    num: '06',
    title: 'Travel & Logistics',
    sub: 'Simply decide the date',
    copy: 'Decide the date and destination — we arrange travel, luggage, and airport & venue pickups so you and your guests arrive without friction.',
    src: IMAGES.services[3],
  },
  {
    num: '07',
    title: 'Special Effects',
    sub: 'Simply wow',
    copy: 'Considered special effects for the Sangeet, Varmala and Ring Ceremony — and wherever else a moment deserves to be unforgettable.',
    src: img('svc-effects', 1400, 1600),
  },
]

// Three kinds of celebration the house is known for
export const WEDDING_TYPES = [
  { title: 'Theme Weddings', copy: 'A single imaginative world, executed end to end.' },
  { title: 'Destination Weddings', copy: 'We arrive ahead of you and know the ground.' },
  { title: 'Classic Indian Weddings', copy: 'Tradition, staged with restraint and warmth.' },
]

// Designed placeholders for the projects index (swap for real galleries)
export const PROJECTS = [
  { id: 'theme-indore', title: 'A Theme to Remember', place: 'Indore', type: 'Theme', src: IMAGES.stories[2].src },
  { id: 'lakeside-udaipur', title: 'Lakeside Vows', place: 'Udaipur', type: 'Destination', src: IMAGES.stories[0].src },
  { id: 'classic-bhopal', title: 'A Classic Indian Wedding', place: 'Bhopal', type: 'Classic', src: img('proj-classic-1', 1100, 1400) },
  { id: 'sangeet-goa', title: 'Sangeet by the Sea', place: 'Goa', type: 'Theme', src: IMAGES.stories[1].src },
  { id: 'palace-jaipur', title: 'The Pink City Story', place: 'Jaipur', type: 'Destination', src: img('proj-jaipur', 1100, 1400) },
  { id: 'garden-indore', title: 'A Garden Affair', place: 'Indore', type: 'Classic', src: IMAGES.stories[4].src },
]
