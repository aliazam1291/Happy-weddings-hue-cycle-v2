/**
 * Photography — served locally from /public/images so nothing depends on a
 * third-party CDN, hotlink policy, or referrer header. Files are licensed
 * Pexels stock placeholders; swap with real studio photography before launch.
 */

const base = '/images'

/** Local picsum-style fallback kept for API compatibility (content.js / posts.js). */
export function img(seed, w = 1200, h = 1500) {
  return `${base}/ceremony.jpg`
}

export const IMAGES = {
  // Hero — grand Indian wedding ceremony
  hero: `${base}/ceremony.jpg`,

  // Brand statement panel
  statement: `${base}/ceremony.jpg`,

  // Founder portrait — warm editorial portrait
  founder: `${base}/founder.jpg`,

  // Featured work — five Indian destination weddings
  stories: [
    { seed: 'udaipur', src: `${base}/udaipur.jpg` },   // Udaipur / Rajasthan
    { seed: 'goa',     src: `${base}/goa.jpg` },        // Goa coastal
    { seed: 'jaipur',  src: `${base}/jaipur.jpg` },     // Jaipur heritage
    { seed: 'kerala',  src: `${base}/kerala.jpg` },     // Kerala tropical
    { seed: 'delhi',   src: `${base}/delhi.jpg` },      // Delhi grand
  ],

  // Service section photography (index-matched to SERVICES in content.js)
  services: [
    `${base}/lights.jpg`,    // [0] Full Planning — string lights grand venue
    `${base}/ceremony.jpg`,  // [1] Destination — Indian ceremony
    `${base}/flowers.jpg`,   // [2] Design & Décor — flowers
    `${base}/dining.jpg`,    // [3] Hospitality — elegant dining
    `${base}/stage.jpg`,     // [4] Entertainment — celebration stage
    `${base}/venue.jpg`,     // [5] Technical — venue setup
    `${base}/delhi.jpg`,     // [6] Travel & Logistics — India destination
  ],

  // Journal / blog post covers
  journal: [
    `${base}/ceremony.jpg`,
    `${base}/udaipur.jpg`,
    `${base}/lights.jpg`,
  ],
}
