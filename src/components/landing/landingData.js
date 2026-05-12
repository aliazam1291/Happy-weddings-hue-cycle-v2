export const navItems = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Services', href: '#services' },
  { label: 'Itinerary', href: '#itinerary' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Concierge', href: '#concierge' },
]

export const services = [
  {
    title: 'Production',
    text: 'Run-of-show, vendor leadership, permits, technical planning, and quiet command on the event floor.',
  },
  {
    title: 'Decor',
    text: 'Floral architecture, tablescapes, textiles, lighting language, and spatial styling with a heritage lens.',
  },
  {
    title: 'Hospitality',
    text: 'Arrival rituals, guest movement, concierge desks, welcome amenities, and family protocol.',
  },
  {
    title: 'Entertainment',
    text: 'Artists, sound, stage design, transitions, after-parties, and immersive moments built into the schedule.',
  },
  {
    title: 'Venue',
    text: 'Private estates, palace hotels, coastal properties, and purpose-built environments matched to the brief.',
  },
  {
    title: 'Logistics',
    text: 'Transport, accommodation, load-in plans, risk registers, and crew coordination across every celebration day.',
  },
]

export const itineraryDays = [
  {
    day: 'Day 1',
    short: 'Arrival',
    title: 'Arrival Courtyard',
    mood: 'Marigold, welcome music, handwritten room drops',
    image: '/svgs/main-element.svg',
    stats: ['148 guests', '4 venues', '32 crew'],
    items: [
      { time: '11:00', title: 'Airport concierge', note: 'Host desks, luggage tagging, cold towels, and rooming flow.' },
      { time: '16:30', title: 'Mehendi garden', note: 'Low seating, folk percussion, shaded floral pavilions.' },
      { time: '20:00', title: 'Welcome dinner', note: 'Candlelit thali service with speeches kept tight and warm.' },
    ],
  },
  {
    day: 'Day 2',
    short: 'Revelry',
    title: 'Haldi to After Hours',
    mood: 'Poolside turmeric, couture stage, late-night lounge',
    image: '/svgs/footer.svg',
    stats: ['9 artist cues', '18 family entries', '2 stage flips'],
    items: [
      { time: '10:30', title: 'Haldi ritual', note: 'Poolside layout with controlled splash zones and camera lanes.' },
      { time: '17:00', title: 'Sangeet rehearsals', note: 'Family entrances, lighting marks, and artist sound checks.' },
      { time: '22:45', title: 'After hours', note: 'A smaller graphite-and-gold lounge with late supper service.' },
    ],
  },
  {
    day: 'Day 3',
    short: 'Ceremony',
    title: 'The Wedding Day',
    mood: 'Baraat movement, golden-hour mandap, formal dinner',
    image: '/svgs/main-arch.svg',
    stats: ['42 min ceremony', '6 processions', '1 room reveal'],
    items: [
      { time: '15:45', title: 'Baraat formation', note: 'Staggered family arrival, dhol cues, traffic control.' },
      { time: '17:20', title: 'Mandap ceremony', note: 'Sunset orientation, floral canopy, discreet guest hospitality.' },
      { time: '20:30', title: 'Reception reveal', note: 'Champagne room transition, dinner service, and farewell suite.' },
    ],
  },
]

export const portfolioItems = [
  { title: 'Udaipur Palace Wedding', type: 'Social', tone: 'Heritage', scope: '3-day destination', asset: '/svgs/main-arch.svg', tall: true },
  { title: 'Goa Coastal Sundowner', type: 'Social', tone: 'Resort', scope: 'Beach ceremony', asset: '/svgs/footer.svg' },
  { title: 'Delhi Couture Sangeet', type: 'Social', tone: 'Editorial', scope: 'Stage production', asset: '/svgs/main-element.svg', wide: true },
  { title: 'Founder Summit Gala', type: 'Corporate', tone: 'Formal', scope: 'Black-tie dinner', asset: '/svgs/main-element.svg', tall: true },
  { title: 'Luxury Brand Launch', type: 'Corporate', tone: 'Gallery', scope: 'Press experience', asset: '/svgs/main-arch.svg' },
  { title: 'Leadership Retreat', type: 'Corporate', tone: 'Private', scope: '2-day offsite', asset: '/svgs/footer.svg', wide: true },
]

export const conciergeSteps = [
  {
    label: 'Event Type',
    options: ['Wedding', 'Social Celebration', 'Corporate Experience'],
  },
  {
    label: 'Vision',
    options: ['Heritage Palace', 'Modern Editorial', 'Destination Weekend'],
  },
  {
    label: 'Contact',
    options: ['Schedule Call', 'Request Proposal', 'Share Brief'],
  },
]
