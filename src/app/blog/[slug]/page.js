import { BlogPostPage } from '@/components/pages/BlogPostPage'
import { POSTS, getPost } from '@/lib/posts'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const data = getPost(params.slug)
  if (!data) return { title: 'Journal — Happy Weddings' }
  return {
    title: `${data.post.title} — Happy Weddings`,
    description: data.post.excerpt,
  }
}

export default function Page({ params }) {
  return <BlogPostPage slug={params.slug} />
}
