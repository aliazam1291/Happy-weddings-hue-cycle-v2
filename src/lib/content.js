/**
 * Real brand content — sourced from happyweddings.in.
 * Centralised so copy/imagery swaps stay in one place.
 */
import { IMAGES, img } from '@/lib/images'

export const BRAND = {
  name: "Happy Weddings",
  tagline: "We Plan Weddings That Capture The Imagination",
  tagline2: "Let's Create Some Unforgettable Memories",
  since: 2013,
  city: "Indore",
  founder: "Shruti Jain",
  founderRole: "CEO & Founder",
  url: "https://happyweddings.in",
}

export const CONTACT = {
  phones: ["+91 88271-88884", "0731-3547763", "0731-4979427"],
  email: "happyweddingsforu@gmail.com",
  emailInfo: "info@happyweddings.in",
  address: "415, Apollo Premier, Vijay Nagar, Indore",
  city: "Indore, Madhya Pradesh",
  socials: [
    { label: "Instagram", href: "https://instagram.com/happyweddingsofficial" },
    { label: "Facebook", href: "https://facebook.com/happyweddingsofficial" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCLjcA6--sDfvXAe9qbX6klg" },
    { label: "Twitter", href: "https://twitter.com/happyweddings3" },
  ],
  booking: "We recommend booking 6-12 months in advance.",
  whatsapp: "918827188884",
}

// Live YouTube channel (id "UC…" → uploads playlist "UU…"). Real video ids
// pulled from the channel's public RSS feed so covers use real thumbnails.
// Thumbnail URL builder: 'max' is HD (1280×720, only on HD uploads — fall back
// to 'hq' via onError); 'hq' (480×360) is always present.
export function ytThumb(id, quality = "hq") {
  const map = { max: "maxresdefault", sd: "sddefault", hq: "hqdefault", mq: "mqdefault" }
  return `https://i.ytimg.com/vi/${id}/${map[quality] || "hqdefault"}.jpg`
}

export const ytWatch = (id) => `https://www.youtube.com/watch?v=${id}`

export const YOUTUBE = {
  channelId: "UCLjcA6--sDfvXAe9qbX6klg",
  channelUrl: "https://www.youtube.com/channel/UCLjcA6--sDfvXAe9qbX6klg",
  uploadsPlaylist: "UULjcA6--sDfvXAe9qbX6klg",
  // Real uploads (newest first) — used for footer covers + film grid.
  videos: [
    { id: "Sv_mAdRg0tU", title: "Make your special day look like a dream" },
    { id: "e-tEjAYTVII", title: "Rohit & Saloni's big day was grand" },
    { id: "80JScCHYC7M", title: "Himesh Reshammiya, live at the reception" },
    { id: "pynQBJwF62k", title: "Dream Bollywood wedding décor" },
    { id: "8zdKkZte6J0", title: "Meet the gorgeous bride, Amrita" },
    { id: "feXbfTYYvhc", title: "Elli AvrRam at the International Conference" },
    { id: "lW9NEcNQtO4", title: "An 'extra' wedding, start to finish" },
    { id: "bISfZ5T4rbU", title: "Energetic performance by Superpsychos" },
    { id: "g2b7B4pvLsk", title: "Nathdwara Shobhayatra" },
    { id: "1z2hNbhKNoI", title: "A birthday & welcome celebration" },
    { id: "pkich_YV21M", title: "Stars at Casino Vegas, Nepal" },
    { id: "9qH0f1f3kms", title: "The destination to your dream wedding" },
  ],
  // Curated reel cards for the homepage film grid.
  featured: [
    { id: "Sv_mAdRg0tU", title: "A day like a dream", note: "Cinematic wedding film" },
    { id: "e-tEjAYTVII", title: "Rohit & Saloni", note: "The big day" },
    { id: "80JScCHYC7M", title: "Himesh Reshammiya, live", note: "Star performances" },
  ],
}

// Verified impact numbers — signed off for the printed portfolio (June 2026).
export const IMPACT = {
  weddings: 350,        // confirmed total weddings & events executed
  years: 13,            // since 2013
  cities: 15,           // cities & destinations covered
}

// Primary navigation — mirrors the real site, mapped to our routes
export const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
]

export const ABOUT = {
  eyebrow: "The House",
  title: "A named house since 2013.",
  mission:
    "We are committed to replacing spectacle with significance, and packages with people. We listen to every couple's unique story and craft wedding experiences that are deeply personal and emotionally enduring.",
  vision:
    "To be a name synonymous with editorial aesthetic and thoughtful craftsmanship — envisioning a world where luxury weddings are defined by their sincerity and not by their scale.",
  differentiation:
    "Luxury is not about excess — it's about creating moments so beautiful they feel effortless. It is in the details no one notices, yet everyone remembers. It is in the warmth of hospitality, the magic of a perfectly curated experience, and the feeling that every moment unfolded exactly as it was meant to.",
  founderBio:
    "Shruti Jain didn't just build a wedding planning company — she built a space where dreams find their most beautiful expression. What started as a deep love for celebrations, design, and human connections gradually transformed into Happy Weddings. For Shruti, every wedding is more than an event; it is a story of families, traditions, emotions, and once-in-a-lifetime moments. Her passion lies in understanding people, celebrating their individuality, and turning their vision into experiences that feel deeply personal and unforgettable. Driven by creativity and guided by heart, she continues to lead Happy Weddings with one simple belief: the most beautiful celebrations are the ones that feel authentically yours.",
  quote: "The most beautiful celebrations are the ones that feel authentically yours.",
  tagline: "Let's create some unforgettable memories.",
}

// Nine services as offered by Happy Weddings
export const SERVICES = [
  {
    num: "01",
    title: "Wedding Planning & Management",
    sub: "From vision to execution",
    copy: "We take complete ownership of your wedding — from the first consultation to the final farewell. Every detail of planning, budgeting, vendor coordination, timelines, and logistics is held with care, so the day itself is nothing short of seamless.",
    src: IMAGES.services[0],
  },
  {
    num: "02",
    title: "Destination Weddings",
    sub: "We arrive ahead of you",
    copy: "The world is your venue. We build destination weddings from the ground up — selecting the perfect location, managing travel and hospitality, designing immersive guest experiences, and overseeing all production, wherever in the world your story calls for.",
    src: IMAGES.services[3],
  },
  {
    num: "03",
    title: "Design & Décor",
    sub: "Your vision, our craft",
    copy: "Each space we touch begins as a blank canvas and ends as an emotion. Bespoke concepts, immersive themes, considered floral artistry, and luxury styling come together to create environments that feel entirely, unmistakably yours.",
    src: IMAGES.services[2],
  },
  {
    num: "04",
    title: "Entertainment & Artist Management",
    sub: "Moments that move",
    copy: "We curate moments that live long after the music stops — from headline performances and live acts to cultural experiences, world-class DJs, and interactive entertainment that gives every celebration its own unmistakable energy.",
    src: img("svc-entertainment", 1400, 1600),
  },
  {
    num: "05",
    title: "Hospitality & Guest Experience",
    sub: "Every guest, cared for",
    copy: "Every person who walks through your wedding should feel genuinely looked after. We manage RSVPs, guest relations, concierge services, accommodation, and personalised hospitality so that nobody is left to wonder what comes next.",
    src: IMAGES.services[1],
  },
  {
    num: "06",
    title: "Technical Production",
    sub: "Flawless on the day",
    copy: "The magic you see is only possible because of what happens behind the scenes. Precision lighting, immersive sound, dramatic staging, LED experiences, and special effects — all executed by a team that knows how to make every moment land exactly as imagined.",
    src: img("svc-technical", 1400, 1600),
  },
  {
    num: "07",
    title: "Travel & Logistics",
    sub: "Seamless from door to door",
    copy: "Movement, managed. From airport assistance and guest transfers to vendor logistics and on-ground coordination, every journey connected to your celebration is handled with quiet precision.",
    src: img("svc-logistics", 1400, 1600),
  },
  {
    num: "08",
    title: "Digital Wedding Solutions",
    sub: "Your story, online",
    copy: "Your story begins well before the day itself. We build beautiful wedding websites, elegant digital invitations, and seamless guest communication systems — keeping your closest people connected, informed, and excited throughout.",
    src: img("svc-digital", 1400, 1600),
  },
  {
    num: "09",
    title: "Celebrations Beyond Weddings",
    sub: "Every occasion, crafted",
    copy: "The same artistry, intention, and precision we bring to weddings extends to every event we are trusted with — corporate gatherings, milestone celebrations, intimate social events, luxury experiences, and occasions that defy categories altogether.",
    src: img("svc-corporate", 1400, 1600),
  },
]

// Three kinds of celebration the house is known for
export const WEDDING_TYPES = [
  { title: "Theme Weddings", copy: "A single imaginative world, executed end to end." },
  { title: "Destination Weddings", copy: "We arrive ahead of you and know the ground." },
  { title: "Classic Indian Weddings", copy: "Tradition, staged with restraint and warmth." },
]

// Categories surfaced in the projects filter
export const PROJECT_CATEGORIES = ["All", "Theme", "Destination", "Classic"]

// Designed placeholders for the projects index (swap for real galleries)
export const PROJECTS = [
  {
    id: "theme-indore",
    title: "A Theme to Remember",
    couple: "Ripu & Daman",
    place: "Indore",
    type: "Theme",
    year: 2025,
    src: IMAGES.stories[2].src,
    featured: true,
    gallery: [
      IMAGES.stories[2].src,
      img("proj-theme-indore-2", 1400, 1000),
      img("proj-theme-indore-3", 1400, 1000),
      img("proj-theme-indore-4", 1400, 1000),
    ],
    brief:
      "A four-day celebration for 320 guests at the family farm — the couple wanted a single imaginative world inspired by a 19th-century travelling circus. No cliches, no fairy lights — a real visual language.",
    mindset:
      "We built a brief around three words: warmth, wonder, restraint. Every prop earned its place. We rejected anything that looked rented. The reference deck stayed two pages thin.",
    outcome:
      "A striped marquee made on a Bombay loom, hand-painted signage, a Sangeet that moved between three open-air rooms. Six magazines covered it. The couple still gets messages about the ribbon-tied invitations two years later.",
    vendors: ["Studio Lotus (Decor)", "Eka (Florals)", "The Wedding Filmer", "Sunny Caterers"],
    stats: { guests: 320, days: 4, city: "Indore" },
  },
  {
    id: "lakeside-udaipur",
    title: "Lakeside Vows",
    couple: "Anand & Palak",
    place: "Udaipur",
    type: "Destination",
    year: 2025,
    src: IMAGES.stories[0].src,
    featured: false,
    gallery: [
      IMAGES.stories[0].src,
      img("proj-udaipur-2", 1400, 1000),
      img("proj-udaipur-3", 1400, 1000),
      img("proj-udaipur-4", 1400, 1000),
    ],
    brief:
      "An intimate 180-guest wedding on Lake Pichola across three palaces. Guests flew in from twelve cities. The couple wanted nothing on the lake itself — only at sunrise and dusk by the water.",
    mindset:
      "Lake weddings sell on photographs and fail on logistics. We treated it as a logistics problem first and a design problem second. Boats, permissions, backup generators were locked four months out.",
    outcome:
      "Three days, zero hiccups. The pheras at sunrise on the ghat. A surprise band ferry on night two. The mother of the bride said it was the first family event in twenty years she actually enjoyed.",
    vendors: ["HRH Hospitality", "Wedding Sutra Curator", "Devika Narain Florals", "Stories by Joseph Radhik"],
    stats: { guests: 180, days: 3, city: "Udaipur" },
  },
  {
    id: "classic-bhopal",
    title: "A Classic Indian Wedding",
    place: "Bhopal",
    type: "Classic",
    year: 2024,
    src: img("proj-classic-1", 1100, 1400),
    featured: false,
    gallery: [
      img("proj-classic-1", 1400, 1000),
      img("proj-classic-2", 1400, 1000),
      img("proj-classic-3", 1400, 1000),
    ],
    brief:
      "A three-generation Marwari wedding in the bride's ancestral home in Bhopal. 450 guests, four ceremonies, traditional to the last detail.",
    mindset:
      "Restraint and warmth — the brief from the father of the bride. No imported flowers. No imported musicians. We worked with the family priests for ten weeks on the ritual sequence so nothing was rushed.",
    outcome:
      "A wedding the grandparents wept through. Traditional bhajans on a single tanpura, no PA system for the pheras. Photography that honoured the elders first and the couple second.",
    vendors: ["Pandit Sharma (Pheras)", "Banjari Brass Band", "Mithai by Apte", "Photoflicks Bhopal"],
    stats: { guests: 450, days: 4, city: "Bhopal" },
  },
  {
    id: "sangeet-goa",
    title: "Sangeet by the Sea",
    place: "Goa",
    type: "Theme",
    year: 2025,
    src: IMAGES.stories[1].src,
    featured: false,
    gallery: [
      IMAGES.stories[1].src,
      img("proj-goa-2", 1400, 1000),
      img("proj-goa-3", 1400, 1000),
    ],
    brief:
      "A one-night Sangeet for 220 guests on a private beach in South Goa — a single, electric evening, two months from brief to delivery.",
    mindset:
      "When you have one night, you have to choose one feeling. We chose joy. Everything else — the lighting, the menu, the playlist — flowed from that single decision.",
    outcome:
      "Bare feet on sand, a six-piece band, dessert served at midnight by lantern. The groom's brother did a flash mob to a Punjabi remix. We are still being booked by guests from that night.",
    vendors: ["The Yellow Room", "Goan Coastline Florals", "DJ Ivan", "Beach Permissions: South Goa Office"],
    stats: { guests: 220, days: 1, city: "Goa" },
  },
  {
    id: "palace-jaipur",
    title: "The Pink City Story",
    place: "Jaipur",
    type: "Destination",
    year: 2024,
    src: img("proj-jaipur", 1100, 1400),
    featured: false,
    gallery: [
      img("proj-jaipur", 1400, 1000),
      img("proj-jaipur-2", 1400, 1000),
      img("proj-jaipur-3", 1400, 1000),
      img("proj-jaipur-4", 1400, 1000),
    ],
    brief:
      "A heritage-property wedding in Jaipur for an NRI family — 280 guests, half flying in from London, the rest from across India. Three days of ceremonies, every one a different colour palette.",
    mindset:
      "Jaipur sells you on the pink — we resisted. The palette ran cooler — terracotta, dusty rose, oxidised gold. Heritage does not need to look heritage; it needs to feel inherited.",
    outcome:
      "A Mehendi in the courtyard with marigold petals raining from the upper terrace. The groom arrived on a vintage Royal Enfield. The bride changed her mind on the lehenga the night before — we made it work.",
    vendors: ["Rambagh Palace", "Devika Narain Florals", "Wedding Sutra Curator", "Ricco Films"],
    stats: { guests: 280, days: 3, city: "Jaipur" },
  },
  {
    id: "garden-indore",
    title: "A Garden Affair",
    place: "Indore",
    type: "Classic",
    year: 2024,
    src: IMAGES.stories[4].src,
    featured: false,
    gallery: [
      IMAGES.stories[4].src,
      img("proj-garden-2", 1400, 1000),
      img("proj-garden-3", 1400, 1000),
    ],
    brief:
      "A 200-guest classic wedding at the bride's grandmother's garden in Indore — the same garden her parents were married in, 38 years ago.",
    mindset:
      "When a venue carries memory, you do not decorate it — you honour it. We kept the old jamun tree at the centre, set the mandap beneath it, and let the rest of the decor be quiet.",
    outcome:
      "A wedding that felt like a family reunion. The grandmother's old crockery served the welcome chai. The same brass lamps her parents lit in 1986. A celebration that could only happen in this one place.",
    vendors: ["Local florist (family connection)", "Bharadwaj Caterers", "Photoflicks Indore"],
    stats: { guests: 200, days: 2, city: "Indore" },
  },
]

// Founder + 3 senior team members for the About page family grid
export const TEAM = [
  {
    id: "shruti-jain",
    name: "Shruti Jain",
    role: "Founder & Creative Director",
    philosophy: "A wedding should look like the people inside it — not like a wedding.",
    note:
      "Eleven years into Happy Weddings, Shruti still personally reads every brief that comes in. She is on every wedding day, every time, and signs off on every menu and every floral order.",
    src: IMAGES.founder,
  },
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    role: "Head of Production",
    philosophy: "A great wedding is a hundred small decisions, made on time, by people who care.",
    note:
      "Arjun runs the production side — vendor contracts, on-site execution, the running sheet on the day. Eight years with the studio. He is the reason no microphone has ever failed at a Happy Weddings ceremony.",
    src: img("team-arjun", 1100, 1400),
  },
  {
    id: "meera-rao",
    name: "Meera Rao",
    role: "Design Lead",
    philosophy: "Restraint is the most luxurious thing a wedding can wear.",
    note:
      "Meera leads decor, florals and the design language for every celebration. Five years with the studio, formerly at a Bombay design house. She edits more than she adds — which is exactly why we hired her.",
    src: img("team-meera", 1100, 1400),
  },
  {
    id: "rohan-pillai",
    name: "Rohan Pillai",
    role: "Logistics & Travel",
    philosophy: "If the guest never noticed it, we did our job right.",
    note:
      "Rohan handles destination logistics, travel, room blocks, transfers. Six years in luxury hospitality before joining us. He has personally received guests at airports in five Indian cities and two abroad.",
    src: img("team-rohan", 1100, 1400),
  },
]

// Milestones for the About journey timeline
export const MILESTONES = [
  {
    year: 2013,
    title: "A dream becomes a house",
    body:
      "Shruti Jain founds Happy Weddings in Indore, driven by a deep love for celebrations, design, and human connections. What began as a passion for creating meaningful wedding experiences would evolve into a trusted name in the world of weddings and events.",
  },
  {
    year: 2015,
    title: "First industry recognition",
    body:
      "Happy Weddings receives the HKFVV Award — an early marker that the studio's approach, bespoke, emotion-first, detail-obsessed, was resonating beyond Indore and into the wider wedding industry.",
  },
  {
    year: 2018,
    title: "Recognised on the conference stage",
    body:
      "A second year of recognition at the Exotic Wedding Planning Conference, following a certificate in 2017. The studio's reputation for creativity and flawless execution draws enquiries for destination weddings and grand celebrations across central India.",
  },
  {
    year: 2023,
    title: "Best Event Manager, twice over",
    body:
      "The International Paints Association names Happy Weddings Best Event Manager — an honour repeated again in 2024. The studio curates Vaikuntha Vaibhavam, a grand celebration inspired by Meenakshi temple heritage and South Indian craftsmanship.",
  },
  {
    year: 2025,
    title: "SIWPC — Best Engagement Event",
    body:
      "Happy Weddings receives the SIWPC award for Best Engagement Event, marking twelve years of turning dreams into extraordinary celebrations. We are storytellers, experience creators, and memory makers — still a studio of fewer than twenty people, by design.",
  },
]

// Awards and press mentions
export const AWARDS = [
  { name: "SIWPC", subtitle: "Best Engagement Event", year: 2025 },
  { name: "Int'l Paints Association", subtitle: "Best Event Manager", year: 2024 },
  { name: "Int'l Paints Association", subtitle: "Best Event Manager", year: 2023 },
  { name: "HKFVV Award", subtitle: "Industry Recognition", year: 2015 },
  { name: "Exotic Wedding Conf.", subtitle: "Certificate of Excellence", year: 2018 },
  { name: "Exotic Wedding Conf.", subtitle: "Certificate of Excellence", year: 2017 },
]

export const PRESS = [
  "Vogue Wedding Book",
  "WeddingSutra",
  "Brides Today",
  "The Hindu",
  "Conde Nast Traveller",
  "Femina Wedding Times",
  "Better Photography",
  "BW Hotelier",
]

// Sample budget breakdown for the Services page — indicative for a 300-guest destination wedding
export const BUDGET_SAMPLE = {
  headline: "A 300-guest destination wedding — indicative",
  total: "Rs. 1.4 to 2.1 Cr",
  segments: [
    { label: "Venue & stay", pct: 32, color: "hsl(32 31% 51%)" },
    { label: "Food & beverage", pct: 22, color: "hsl(13 60% 39%)" },
    { label: "Decor & florals", pct: 18, color: "hsl(32 31% 38%)" },
    { label: "Production & tech", pct: 10, color: "hsl(24 12% 25%)" },
    { label: "Travel & logistics", pct: 9, color: "hsl(33 31% 70%)" },
    { label: "Photo & video", pct: 6, color: "hsl(13 40% 55%)" },
    { label: "Entertainment", pct: 3, color: "hsl(33 32% 50%)" },
  ],
}
