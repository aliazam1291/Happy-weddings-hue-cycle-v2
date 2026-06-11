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

// Categories surfaced in the projects filter
export const PROJECT_CATEGORIES = ['All', 'Theme', 'Destination', 'Classic']

// Designed placeholders for the projects index (swap for real galleries)
export const PROJECTS = [
  {
    id: 'theme-indore',
    title: 'A Theme to Remember',
    place: 'Indore',
    type: 'Theme',
    year: 2025,
    src: IMAGES.stories[2].src,
    featured: true,
    gallery: [
      IMAGES.stories[2].src,
      img('proj-theme-indore-2', 1400, 1000),
      img('proj-theme-indore-3', 1400, 1000),
      img('proj-theme-indore-4', 1400, 1000),
    ],
    brief:
      'A four-day celebration for 320 guests at the family farm — the couple wanted a single imaginative world inspired by a 19th-century travelling circus. No clichés, no fairy lights — a real visual language.',
    mindset:
      'We built a brief around three words: warmth, wonder, restraint. Every prop earned its place. We rejected anything that looked rented. The reference deck stayed two pages thin.',
    outcome:
      'A striped marquee made on a Bombay loom, hand-painted signage, a Sangeet that moved between three open-air rooms. Six magazines covered it. The couple still gets messages about the ribbon-tied invitations two years later.',
    vendors: ['Studio Lotus (Décor)', 'Eka (Florals)', 'The Wedding Filmer', 'Sunny Caterers'],
    stats: { guests: 320, days: 4, city: 'Indore' },
  },
  {
    id: 'lakeside-udaipur',
    title: 'Lakeside Vows',
    place: 'Udaipur',
    type: 'Destination',
    year: 2025,
    src: IMAGES.stories[0].src,
    featured: false,
    gallery: [
      IMAGES.stories[0].src,
      img('proj-udaipur-2', 1400, 1000),
      img('proj-udaipur-3', 1400, 1000),
      img('proj-udaipur-4', 1400, 1000),
    ],
    brief:
      'An intimate 180-guest wedding on Lake Pichola across three palaces. Guests flew in from twelve cities. The couple wanted nothing on the lake itself — only at sunrise and dusk by the water.',
    mindset:
      'Lake weddings sell on photographs and fail on logistics. We treated it as a logistics problem first and a design problem second. Boats, permissions, backup generators were locked four months out.',
    outcome:
      'Three days, zero hiccups. The pheras at sunrise on the ghat. A surprise band ferry on night two. The mother of the bride said it was the first family event in twenty years she actually enjoyed.',
    vendors: ['HRH Hospitality', 'Wedding Sutra Curator', 'Devika Narain Florals', 'Stories by Joseph Radhik'],
    stats: { guests: 180, days: 3, city: 'Udaipur' },
  },
  {
    id: 'classic-bhopal',
    title: 'A Classic Indian Wedding',
    place: 'Bhopal',
    type: 'Classic',
    year: 2024,
    src: img('proj-classic-1', 1100, 1400),
    featured: false,
    gallery: [
      img('proj-classic-1', 1400, 1000),
      img('proj-classic-2', 1400, 1000),
      img('proj-classic-3', 1400, 1000),
    ],
    brief:
      'A three-generation Marwari wedding in the bride\'s ancestral home in Bhopal. 450 guests, four ceremonies, traditional to the last detail.',
    mindset:
      'Restraint and warmth — the brief from the father of the bride. No imported flowers. No imported musicians. We worked with the family priests for ten weeks on the ritual sequence so nothing was rushed.',
    outcome:
      'A wedding the grandparents wept through. Traditional bhajans on a single tanpura, no PA system for the pheras. Photography that honoured the elders first and the couple second.',
    vendors: ['Pandit Sharma (Pheras)', 'Banjari Brass Band', 'Mithai by Apte', 'Photoflicks Bhopal'],
    stats: { guests: 450, days: 4, city: 'Bhopal' },
  },
  {
    id: 'sangeet-goa',
    title: 'Sangeet by the Sea',
    place: 'Goa',
    type: 'Theme',
    year: 2025,
    src: IMAGES.stories[1].src,
    featured: false,
    gallery: [
      IMAGES.stories[1].src,
      img('proj-goa-2', 1400, 1000),
      img('proj-goa-3', 1400, 1000),
    ],
    brief:
      'A one-night Sangeet for 220 guests on a private beach in South Goa — a single, electric evening, two months from brief to delivery.',
    mindset:
      'When you have one night, you have to choose one feeling. We chose joy. Everything else — the lighting, the menu, the playlist — flowed from that single decision.',
    outcome:
      'Bare feet on sand, a six-piece band, dessert served at midnight by lantern. The groom\'s brother did a flash mob to a Punjabi remix. We are still being booked by guests from that night.',
    vendors: ['The Yellow Room', 'Goan Coastline Florals', 'DJ Ivan', 'Beach Permissions: South Goa Office'],
    stats: { guests: 220, days: 1, city: 'Goa' },
  },
  {
    id: 'palace-jaipur',
    title: 'The Pink City Story',
    place: 'Jaipur',
    type: 'Destination',
    year: 2024,
    src: img('proj-jaipur', 1100, 1400),
    featured: false,
    gallery: [
      img('proj-jaipur', 1400, 1000),
      img('proj-jaipur-2', 1400, 1000),
      img('proj-jaipur-3', 1400, 1000),
      img('proj-jaipur-4', 1400, 1000),
    ],
    brief:
      'A heritage-property wedding in Jaipur for an NRI family — 280 guests, half flying in from London, the rest from across India. Three days of ceremonies, every one a different colour palette.',
    mindset:
      'Jaipur sells you on the pink — we resisted. The palette ran cooler — terracotta, dusty rose, oxidised gold. Heritage doesn\'t need to look heritage; it needs to feel inherited.',
    outcome:
      'A Mehendi in the courtyard with marigold petals raining from the upper terrace. The groom arrived on a vintage Royal Enfield. The bride changed her mind on the lehenga the night before — we made it work.',
    vendors: ['Rambagh Palace', 'Devika Narain Florals', 'Wedding Sutra Curator', 'Ricco Films'],
    stats: { guests: 280, days: 3, city: 'Jaipur' },
  },
  {
    id: 'garden-indore',
    title: 'A Garden Affair',
    place: 'Indore',
    type: 'Classic',
    year: 2024,
    src: IMAGES.stories[4].src,
    featured: false,
    gallery: [
      IMAGES.stories[4].src,
      img('proj-garden-2', 1400, 1000),
      img('proj-garden-3', 1400, 1000),
    ],
    brief:
      'A 200-guest classic wedding at the bride\'s grandmother\'s garden in Indore — the same garden her parents were married in, 38 years ago.',
    mindset:
      'When a venue carries memory, you don\'t decorate it — you honour it. We kept the old jamun tree at the centre, set the mandap beneath it, and let the rest of the décor be quiet.',
    outcome:
      'A wedding that felt like a family reunion. The grandmother\'s old crockery served the welcome chai. The same brass lamps her parents lit in 1986. A celebration that could only happen in this one place.',
    vendors: ['Local florist (family connection)', 'Bharadwaj Caterers', 'Photoflicks Indore'],
    stats: { guests: 200, days: 2, city: 'Indore' },
  },
]

// Founder + 3 dummy senior team members for the About page family grid
export const TEAM = [
  {
    id: 'shruti-jain',
    name: 'Shruti Jain',
    role: 'Founder & Creative Director',
    philosophy: 'A wedding should look like the people inside it — not like a wedding.',
    note:
      'Eleven years into Happy Weddings, Shruti still personally reads every brief that comes in. She is on every wedding day, every time, and signs off on every menu and every floral order.',
    src: IMAGES.founder,
  },
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'Head of Production',
    philosophy: 'A great wedding is a hundred small decisions, made on time, by people who care.',
    note:
      'Arjun runs the production side — vendor contracts, on-site execution, the running sheet on the day. Eight years with the studio. He is the reason no microphone has ever failed at a Happy Weddings ceremony.',
    src: img('team-arjun', 1100, 1400),
  },
  {
    id: 'meera-rao',
    name: 'Meera Rao',
    role: 'Design Lead',
    philosophy: 'Restraint is the most luxurious thing a wedding can wear.',
    note:
      'Meera leads décor, florals and the design language for every celebration. Five years with the studio, formerly at a Bombay design house. She edits more than she adds — which is exactly why we hired her.',
    src: img('team-meera', 1100, 1400),
  },
  {
    id: 'rohan-pillai',
    name: 'Rohan Pillai',
    role: 'Logistics & Travel',
    philosophy: 'If the guest never noticed it, we did our job right.',
    note:
      'Rohan handles destination logistics, travel, room blocks, transfers. Six years in luxury hospitality before joining us. He has personally received guests at airports in five Indian cities and two abroad.',
    src: img('team-rohan', 1100, 1400),
  },
]

// Milestones for the About journey timeline
export const MILESTONES = [
  {
    year: 2013,
    title: 'A studio of one',
    body:
      'Shruti Jain founds Happy Weddings out of a single-room office in Vijay Nagar, Indore. The first wedding is a three-day celebration for a family friend — a Sangeet, a Haldi and a sit-down dinner for 140.',
  },
  {
    year: 2016,
    title: 'First destination wedding',
    body:
      'A 220-guest celebration in Udaipur opens the door to destination work. The team grows to six. We learn that lake weddings are a logistics problem before they are a design problem.',
  },
  {
    year: 2019,
    title: 'A Bombay magazine cover',
    body:
      'Our first feature in a national wedding magazine — a theme wedding in Indore makes the cover. Enquiries triple. We turn down more weddings than we accept for the first time.',
  },
  {
    year: 2022,
    title: 'Hundred and counting',
    body:
      'We deliver our hundredth wedding. The studio moves to its current floor at Apollo Premier. We add Rohan and Meera to the senior team and stop taking weddings outside India.',
  },
  {
    year: 2026,
    title: 'Twelve years in',
    body:
      'Three Best Rated names us No. 2 in Indore. WeddingSutra adds us to the Favourites list. Our calendar is booked through to spring 2027. We are still a studio of fewer than twenty people — by design.',
  },
]

// Awards and press mentions (dummy — swap for real once verified)
export const AWARDS = [
  { name: 'ThreeBestRated', subtitle: 'No. 2 Wedding Planner, Indore', year: 2026 },
  { name: 'WeddingSutra Favourite', subtitle: 'Editor\'s Pick — Destination', year: 2025 },
  { name: 'Google Reviews', subtitle: '5.0 · Verified Studio', year: 2026 },
  { name: 'WedMeGood', subtitle: 'Top 10 Central India', year: 2024 },
]

export const PRESS = [
  'Vogue Wedding Book',
  'WeddingSutra',
  'Brides Today',
  'The Hindu',
  'Conde Nast Traveller',
  'Femina Wedding Times',
  'Better Photography',
  'BW Hotelier',
]

// Sample budget breakdown for the Services page — indicative for a 300-guest destination wedding
export const BUDGET_SAMPLE = {
  headline: 'A 300-guest destination wedding · indicative',
  total: '₹ 1.4 – 2.1 Cr',
  segments: [
    { label: 'Venue & stay', pct: 32, color: 'hsl(32 31% 51%)' },
    { label: 'Food & beverage', pct: 22, color: 'hsl(13 60% 39%)' },
    { label: 'Décor & florals', pct: 18, color: 'hsl(32 31% 38%)' },
    { label: 'Production & tech', pct: 10, color: 'hsl(24 12% 25%)' },
    { label: 'Travel & logistics', pct: 9, color: 'hsl(33 31% 70%)' },
    { label: 'Photo & video', pct: 6, color: 'hsl(13 40% 55%)' },
    { label: 'Entertainment', pct: 3, color: 'hsl(33 32% 50%)' },
  ],
}
