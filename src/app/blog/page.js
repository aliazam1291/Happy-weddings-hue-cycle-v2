import { BlogPage } from '@/components/pages/BlogPage'

export const metadata = {
  title: 'Wedding Planning Journal — Tips, Guides & Stories | Happy Weddings',
  description:
    'Long-form on wedding design, planning timelines, vendor selection, destination logistics and the craft of celebration — written by Shruti Jain and the Happy Weddings team in Indore.',
  keywords: [
    'wedding planning tips India',
    'wedding planning guide Indore',
    'destination wedding advice India',
    'wedding budget guide India',
    'Sangeet night ideas',
    'wedding decor inspiration India',
    'how to plan a wedding India',
    'Indian wedding planning timeline',
    'wedding vendor selection India',
    'theme wedding ideas India',
    'wedding planning blog India',
    'Shruti Jain wedding blog',
  ],
  alternates: { canonical: 'https://happyweddings.in/blog' },
  openGraph: {
    title: 'Journal — Happy Weddings | Wedding Planning Insights',
    description:
      'Notes from the studio — design, planning, real weddings and quiet opinions. Written between projects, never on a schedule.',
    url: 'https://happyweddings.in/blog',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <BlogPage />
}
