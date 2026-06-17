import { NextResponse } from 'next/server'
import { getInstagramPosts } from '@/lib/instagram'

// Revalidate hourly — IG CDN image URLs are time-limited.
export const revalidate = 3600

export async function GET() {
  const posts = await getInstagramPosts(12)
  return NextResponse.json(
    { posts, connected: posts.length > 0 },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
  )
}
