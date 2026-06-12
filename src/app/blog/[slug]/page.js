import { BlogPostPage } from '@/components/pages/BlogPostPage'
import { POSTS, getPost } from '@/lib/posts'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const data = getPost(params.slug)
  if (!data) return { title: 'Journal — Happy Weddings Indore' }
  return {
    title: `${data.post.title} — Happy Weddings Journal`,
    description: data.post.excerpt,
    keywords: [
      'wedding planning India',
      'wedding tips Indore',
      data.post.category,
      'Happy Weddings journal',
      'Shruti Jain wedding advice',
    ],
    alternates: { canonical: `https://happyweddings.in/blog/${data.post.slug}` },
    openGraph: {
      title: data.post.title,
      description: data.post.excerpt,
      url: `https://happyweddings.in/blog/${data.post.slug}`,
      type: 'article',
      publishedTime: data.post.date,
      authors: ['Shruti Jain'],
      tags: [data.post.category, 'wedding planning', 'Happy Weddings'],
      images: [
        {
          url: data.post.cover,
          width: 1200,
          height: 630,
          alt: data.post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.post.title,
      description: data.post.excerpt,
      images: [data.post.cover],
    },
  }
}

export default function Page({ params }) {
  return <BlogPostPage slug={params.slug} />
}
