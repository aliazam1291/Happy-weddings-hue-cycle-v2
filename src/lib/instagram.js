/**
 * Instagram feed — via the official Instagram Graph API (Instagram Login).
 *
 * Set INSTAGRAM_ACCESS_TOKEN in the environment to a long-lived access token
 * for the connected Instagram Business/Creator account (@happyweddingsofficial).
 * Without a token this returns [] and the UI falls back to a follow CTA — it
 * never shows broken tiles.
 *
 * Token setup (10 min): https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
 *   1. Create a Meta app → add "Instagram" product.
 *   2. Connect the IG Business account, generate a long-lived user token.
 *   3. Put it in wedding-parallax/.env.local as INSTAGRAM_ACCESS_TOKEN=...
 * Long-lived tokens last ~60 days; refresh via the Graph API before expiry.
 *
 * The Basic Display API was deprecated on 2024-12-04; this uses the current
 * graph.instagram.com endpoint, which the new token works against.
 */
const GRAPH = 'https://graph.instagram.com'

export async function getInstagramPosts(limit = 12) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []

  const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
  const url = `${GRAPH}/me/media?fields=${fields}&limit=${limit}&access_token=${token}`

  try {
    // Cache for an hour: IG media_url CDN links are time-limited, so re-fetching
    // hourly keeps them fresh without hammering the API.
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    const items = Array.isArray(json?.data) ? json.data : []

    return items
      .map((m) => ({
        id: m.id,
        // videos/reels expose a still in thumbnail_url; images use media_url
        image: m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url,
        permalink: m.permalink,
        caption: (m.caption || '').replace(/\s+/g, ' ').trim().slice(0, 120),
      }))
      .filter((m) => m.image && m.permalink)
  } catch {
    return []
  }
}
