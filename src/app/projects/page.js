import { ProjectsPage } from '@/components/pages/ProjectsPage'

export const metadata = {
  title: 'Wedding Portfolio — Theme, Destination & Classic Weddings | Happy Weddings Indore',
  description:
    'Explore weddings we have planned across Indore, Udaipur, Jaipur, Goa, Bhopal and beyond — theme weddings, palace destination weddings, classic Indian celebrations. Real stories from Happy Weddings.',
  keywords: [
    'wedding portfolio Indore',
    'theme wedding Indore',
    'destination wedding Udaipur',
    'destination wedding Jaipur',
    'destination wedding Goa',
    'classic Indian wedding Indore',
    'wedding case studies India',
    'best weddings Indore',
    'palace wedding Jaipur',
    'lakeside wedding Udaipur',
    'Sangeet night Goa',
    'wedding stories India',
    'Happy Weddings portfolio',
    'wedding planner work Indore',
  ],
  alternates: { canonical: 'https://happyweddings.in/projects' },
  openGraph: {
    title: 'Wedding Portfolio — Happy Weddings Indore',
    description:
      'Theme, destination and classic Indian weddings — each one staged as its own world. A selection of celebrations from Indore, Udaipur, Jaipur, Goa and beyond.',
    url: 'https://happyweddings.in/projects',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <ProjectsPage />
}
