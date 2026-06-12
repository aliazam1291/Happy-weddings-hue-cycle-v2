import { AboutPage } from '@/components/pages/AboutPage'

export const metadata = {
  title: 'About Us — Happy Weddings Indore | Shruti Jain',
  description:
    'Meet Shruti Jain and the Happy Weddings team — Indore\'s premier wedding planning studio since 2013. Our story, philosophy, awards and the family behind every celebration.',
  keywords: [
    'about Happy Weddings Indore',
    'Shruti Jain wedding planner',
    'wedding planner founder Indore',
    'Happy Weddings story',
    'wedding planning team Indore',
    'award winning wedding planner Indore',
    'ThreeBestRated wedding planner Indore',
    'WeddingSutra favourite Indore',
  ],
  alternates: { canonical: 'https://happyweddings.in/about' },
  openGraph: {
    title: 'About Happy Weddings — Shruti Jain, Indore',
    description:
      'A named house since 2013. Wedding is a bond, a memory, and a union to be cherished forever — we celebrate it like family. Meet the team behind the celebrations.',
    url: 'https://happyweddings.in/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <AboutPage />
}
