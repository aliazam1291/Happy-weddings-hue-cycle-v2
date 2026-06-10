/**
 * Dummy imagery — swap these URLs for real photography later.
 * Using picsum.photos with fixed seeds so layouts stay stable between reloads.
 * A warm grayscale + slight blur keeps them feeling editorial against the palette.
 */
const base = 'https://picsum.photos/seed'

export function img(seed, w = 1200, h = 1500) {
  return `${base}/hw-${seed}/${w}/${h}`
}

// Curated seeds per section
export const IMAGES = {
  hero: img('hero-veil', 2000, 1300),
  statement: img('statement', 1400, 1400),
  founder: img('founder-portrait', 1200, 1600),
  stories: [
    { seed: 'udaipur', src: img('udaipur', 1100, 1400) },
    { seed: 'goa', src: img('goa', 1100, 1400) },
    { seed: 'jaipur', src: img('jaipur', 1100, 1400) },
    { seed: 'kerala', src: img('kerala', 1100, 1400) },
    { seed: 'delhi', src: img('delhi', 1100, 1400) },
  ],
  services: [
    img('full-planning', 1400, 1600),
    img('destination', 1400, 1600),
    img('design-decor', 1400, 1600),
    img('curation', 1400, 1600),
  ],
  journal: [
    img('journal-restraint', 1200, 900),
    img('journal-udaipur', 1200, 900),
    img('journal-timeline', 1200, 900),
  ],
}
