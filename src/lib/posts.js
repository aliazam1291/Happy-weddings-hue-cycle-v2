/**
 * Blog content — long-form editorial articles authored by Shruti Jain.
 * Bodies are structured as blocks so the BlogPostPage can render varied
 * typography (drop cap, pull quotes, captioned images, section heads).
 *
 * Block types:
 *  { type: 'p',     text }                  — body paragraph
 *  { type: 'h2',    text }                  — section heading
 *  { type: 'quote', text, by? }             — gold pull quote
 *  { type: 'image', src, caption?, alt? }   — captioned image
 *  { type: 'list',  items: string[] }       — bullet list
 */
import { IMAGES, img } from '@/lib/images'

export const CATEGORIES = [
  'All',
  'Wedding Tips',
  'Real Weddings',
  'Corporate',
  'Party Ideas',
  'Trends',
]

export const POSTS = [
  {
    slug: 'art-of-restraint',
    category: 'Wedding Tips',
    title: 'The art of restraint — why less is always more for luxury weddings',
    excerpt:
      'Three rules from twelve years of weddings: edit the guest list, edit the menu, edit the décor — and watch the celebration become unforgettable.',
    cover: IMAGES.journal[0],
    author: 'Shruti Jain',
    date: '2026-05-12',
    readingTime: 6,
    body: [
      { type: 'p', text: 'The most memorable weddings I have shaped in twelve years have one thing in common: someone in the room had the courage to say no. No to one more vendor. No to one more course. No to one more guest list addition. Every great celebration is the result of an edit.' },
      { type: 'h2', text: 'The guest list is the design brief' },
      { type: 'p', text: 'Before fabric and flowers and food, the guest list is the first design choice you make. Two hundred close friends and family will give you a different wedding than four hundred acquaintances. Neither is wrong — but the décor, the menu, the music and the room all flow downstream from that decision. Make it first, and make it honestly.' },
      { type: 'quote', text: 'A wedding should look like the people inside it — not like a wedding.', by: 'Shruti Jain' },
      { type: 'h2', text: 'Edit the menu like a writer edits a sentence' },
      { type: 'p', text: 'Twelve curated dishes will be remembered. Forty-eight tray-passed canapés will not. The same restraint applies to drinks, desserts and dessert stations. If a guest cannot name three things they ate two months later, the kitchen lost the night.' },
      { type: 'image', src: IMAGES.services[1], caption: 'The hand-picked menu from a 180-guest celebration in Udaipur, 2024.' },
      { type: 'h2', text: 'Décor is a frame, not a focus' },
      { type: 'p', text: 'I have watched couples spend more on chair covers than on photography. The chairs will be unstacked in a warehouse next Tuesday. The photographs are forever. When in doubt about a décor line item, ask: will this be in the album in ten years? If not, cut it and put the money into the parts of the day that will be.' },
      { type: 'p', text: 'Restraint is not minimalism. Our weddings are warm, layered, full of detail. But every detail has earned its place. That is what we mean when we say we craft celebrations.' },
    ],
  },
  {
    slug: 'palace-wedding-udaipur',
    category: 'Real Weddings',
    title: 'Hosting a palace wedding in Udaipur — what we learned',
    excerpt:
      'A three-day celebration on the lake taught us more about logistics, permissions and pacing than any other project that year.',
    cover: IMAGES.journal[1],
    author: 'Shruti Jain',
    date: '2026-04-22',
    readingTime: 8,
    body: [
      { type: 'p', text: 'A palace wedding sells itself in the photographs. What the photographs do not show is the three-month conversation about boats, the permission letters, the second backup generator, and the call we made at 4 a.m. with the floral team. Here is what twelve years of destination weddings had not prepared us for.' },
      { type: 'h2', text: 'The lake is a logistics problem first' },
      { type: 'p', text: 'Everything — guests, food, décor, dhol players, the bride herself — has to cross water. Plan boat schedules with the same rigour as flight schedules. Build in twenty-minute buffers between sailings. And do a full dress rehearsal the day before, in the same boats, with the same crew, at the same time.' },
      { type: 'quote', text: 'Permission, permission, permission. There is no shortcut around the paperwork.' },
      { type: 'h2', text: 'Pacing the three days' },
      { type: 'p', text: 'Day one is arrivals and a low-key welcome. Day two is the marquee Sangeet, Mehndi and the wedding itself. Day three is the reception and the goodbye. Most planners pack day two too tight. We learned to thin the schedule, give every event ninety minutes of breathing room, and let the guests catch their breath.' },
      { type: 'list', items: ['Day 1 — welcome dinner, low key', 'Day 2 — Mehndi morning, Sangeet evening, midnight breakfast', 'Day 3 — wedding ceremony, lunch, reception, send-off'] },
      { type: 'image', src: IMAGES.stories[0].src, caption: 'Sangeet stage on the lake — designed to read in both daylight and torchlight.' },
      { type: 'h2', text: 'What we would do differently' },
      { type: 'p', text: 'Two things. First, a dedicated weather contingency plan, signed off by both families two weeks before. Second, a slower entrance for the bride — three minutes instead of one — so the boat could be photographed properly. Small details. Massive difference.' },
    ],
  },
  {
    slug: 'six-to-twelve-month-timeline',
    category: 'Wedding Tips',
    title: 'Six to twelve months: the timeline that actually works',
    excerpt:
      'Two phases, four checkpoints, one rule: the closer to the date, the less you change. Here is the schedule we use with every family.',
    cover: IMAGES.journal[2],
    author: 'Shruti Jain',
    date: '2026-03-30',
    readingTime: 5,
    body: [
      { type: 'p', text: 'We recommend reaching out six to twelve months ahead — and there is a real reason for that range, not just a hedge. Anything less than six months and venue access becomes a fight. Anything more than twelve and decisions get re-opened too many times. Here is the schedule we use, in two phases.' },
      { type: 'h2', text: 'Phase 1 — Twelve to six months out' },
      { type: 'p', text: 'Lock the date, the venue, and the design direction. That is it. Resist the temptation to start tasting menus or building Pinterest boards for tablescapes. The first phase is about constraints, not choices.' },
      { type: 'quote', text: 'A clear constraint is worth ten Pinterest boards.' },
      { type: 'h2', text: 'Phase 2 — Six to two months out' },
      { type: 'p', text: 'This is where Happy Weddings runs most of its hours. Vendors are signed. The design language is detailed into invitation, table, stage, dance floor and send-off. Choreography begins. Travel is booked. The schedule for the three days takes its final shape.' },
      { type: 'list', items: ['T-6 months — vendor lock', 'T-4 months — design freeze', 'T-2 months — choreography + travel', 'T-2 weeks — no more changes'] },
      { type: 'h2', text: 'The two-week rule' },
      { type: 'p', text: 'No new vendors, no new ideas, no menu swaps in the last two weeks. Anything added after the rehearsal will hurt more than it helps. Trust the plan you made when you had time to think.' },
    ],
  },
  {
    slug: 'corporate-without-corporate',
    category: 'Corporate',
    title: 'Corporate event design without the corporate feel',
    excerpt:
      'The same principles that shape a wedding work for a product launch. Three small swaps make the difference.',
    cover: IMAGES.services[0],
    author: 'Shruti Jain',
    date: '2026-03-15',
    readingTime: 4,
    body: [
      { type: 'p', text: 'When a client books us for a product launch, an award night or a leadership offsite, the brief is usually the same: make it not feel like a corporate event. The fix is rarely the lighting. It is almost always the structure of the evening.' },
      { type: 'h2', text: 'Treat the brand like a guest, not a backdrop' },
      { type: 'p', text: 'The logo wall is the easiest tell. Replace it with one beautiful brand moment — a sculpture, a projection, a printed wall — and the room reads differently the second the doors open.' },
      { type: 'quote', text: 'Corporate functions feel corporate when the brand stops being a guest and starts being the host.' },
      { type: 'h2', text: 'Cut the speeches by half' },
      { type: 'p', text: 'And replace the saved time with a meal, a performance or a moment of genuine surprise. Every event that crossed the line into memorable for us did this. Every event that did not, didn’t.' },
    ],
  },
  {
    slug: 'sangeet-beyond-bollywood',
    category: 'Party Ideas',
    title: 'Sangeet Night ideas that go beyond Bollywood',
    excerpt:
      'Five formats we have run in the last two years — none of them are a film-song medley.',
    cover: IMAGES.services[3],
    author: 'Shruti Jain',
    date: '2026-02-18',
    readingTime: 5,
    body: [
      { type: 'p', text: 'The film-song medley is the default Sangeet format, and there is nothing wrong with it. But our most loved Sangeet evenings have not been that. Here are five we have run.' },
      { type: 'h2', text: 'A Qawwali night' },
      { type: 'p', text: 'A small ensemble, low seating, the bride and groom on the floor with everyone. Spiritual, warm, unforgettable in a way a Bollywood medley cannot be.' },
      { type: 'h2', text: 'A live folk band' },
      { type: 'p', text: 'Rajasthani for an Udaipur celebration; Kerala traditional for a Backwater wedding; Punjabi bhangra for an Indore family. Match the music to the geography, not the playlist.' },
      { type: 'h2', text: 'A choreographed roast' },
      { type: 'p', text: 'Friends and cousins script a series of two-minute roasts of the couple, woven through dance numbers. Funniest Sangeet of the decade for one of our families.' },
      { type: 'h2', text: 'A two-hour DJ' },
      { type: 'p', text: 'No performances at all. The whole family on the floor for two solid hours. Sometimes the best Sangeet is the one that does not have a stage.' },
      { type: 'quote', text: 'The Sangeet is the night the families decide whether they like each other. Design for joy, not for the camera.' },
      { type: 'h2', text: 'A surprise from the parents' },
      { type: 'p', text: 'The mothers and fathers, in secret, prepare one performance for the couple. The bride and groom must not know. Hold that one in a private courtyard if you can. The video will be watched a thousand times.' },
    ],
  },
  {
    slug: 'mughal-décor-direction',
    category: 'Trends',
    title: 'Mughal-inspired décor: the new editorial direction',
    excerpt:
      'Arched openings, gold filigree, carved sandstone — what is driving the return of Mughal motifs in 2026 weddings.',
    cover: IMAGES.services[2],
    author: 'Shruti Jain',
    date: '2026-01-24',
    readingTime: 5,
    body: [
      { type: 'p', text: 'Across our 2026 calendar, three families independently asked for the same starting point: a Mughal arch. Carved sandstone, gold filigree, the cusped opening of an old durbar. The direction is in the air. Here is what it really means in execution.' },
      { type: 'h2', text: 'The motif is the through-line' },
      { type: 'p', text: 'A Mughal arch on the entrance hints at one direction. A Mughal arch on the entrance, the invitation, the menu card and the stage backdrop means the design has a through-line. The motif is the story; the rest is decoration around it.' },
      { type: 'quote', text: 'A repeated motif is the cheapest form of luxury.' },
      { type: 'h2', text: 'Material first' },
      { type: 'p', text: 'Carved foam reads as foam from across the lawn. We use a paper-and-wood lamination that, lit warmly, reads as sandstone in photographs. Cost: similar to foam. Result: night and day. If the budget will not stretch, drop the size before you drop the material.' },
      { type: 'p', text: 'The same logic applies to gold. A flat painted gold reads dead. A leafed gold over a textured base catches the candlelight and feels alive. The texture costs almost nothing once the team knows how to do it.' },
    ],
  },
  {
    slug: 'designing-for-guests',
    category: 'Wedding Tips',
    title: 'Designing for guests, not the camera',
    excerpt:
      'The temptation in a Reels-first world is to design every moment for the lens. The best weddings do the opposite.',
    cover: IMAGES.services[1],
    author: 'Shruti Jain',
    date: '2026-01-08',
    readingTime: 4,
    body: [
      { type: 'p', text: 'A wedding where every flower looks better on camera than in person has lost something quietly important. The guests came to the room, not to the post. They should experience the most beautiful version, not the second-best one.' },
      { type: 'h2', text: 'Light for the room' },
      { type: 'p', text: 'Cinematic lighting tends to be too dim for guests. Camera lighting tends to be too bright. We light for the room first — warm, layered, dimmed at the edges. The cameras are told to follow.' },
      { type: 'quote', text: 'Tell the photographer to chase the wedding. Do not let the wedding chase the photographer.' },
      { type: 'h2', text: 'Two reels are enough' },
      { type: 'p', text: 'A welcome reel and a wedding reel. Anything more and the team will start staging guests instead of capturing them. The strongest album of 2025 came from a family who banned phones for the ceremony and let one photographer run the room.' },
    ],
  },
  {
    slug: 'what-named-house-means',
    category: 'Real Weddings',
    title: 'What we mean by ‘a named house’',
    excerpt:
      'Why the phrase matters to us — and what families can expect from a wedding shaped, end to end, by Shruti.',
    cover: img('founder-portrait', 1200, 900),
    author: 'Shruti Jain',
    date: '2025-12-12',
    readingTime: 5,
    body: [
      { type: 'p', text: 'When I started Happy Weddings in 2013 there were planners and there were agencies and there was a gap. I wanted the warmth and accountability of a named designer, with the operational rigour of a team. A named house is what we built.' },
      { type: 'h2', text: 'It means I am on every wedding' },
      { type: 'p', text: 'Not in name. In person. Every Happy Weddings celebration is shaped by me directly — from the first conversation through to the last farewell. The team scales around me; they do not replace me.' },
      { type: 'quote', text: 'We do not plan to rule the industry. We plan to rule the hearts.' },
      { type: 'h2', text: 'It means we say no a lot' },
      { type: 'p', text: 'Most weeks, two enquiries we cannot give our full attention to. Sometimes more. It is the cost of staying named. We would rather plan eight weddings well a year than thirty weddings adequately.' },
      { type: 'p', text: 'If we say yes, we mean it. That is what we mean by a named house.' },
    ],
  },
]

// Find post + neighbours for the post page
export function getPost(slug) {
  const i = POSTS.findIndex((p) => p.slug === slug)
  if (i < 0) return null
  return {
    post: POSTS[i],
    prev: POSTS[(i - 1 + POSTS.length) % POSTS.length],
    next: POSTS[(i + 1) % POSTS.length],
  }
}

// Three other posts in the same category (or any if not enough) — for "Related"
export function getRelated(slug) {
  const me = POSTS.find((p) => p.slug === slug)
  if (!me) return []
  const sameCat = POSTS.filter((p) => p.slug !== slug && p.category === me.category)
  const others = POSTS.filter((p) => p.slug !== slug && p.category !== me.category)
  return [...sameCat, ...others].slice(0, 3)
}
