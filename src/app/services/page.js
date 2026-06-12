import { ServicesPage } from '@/components/pages/ServicesPage'

export const metadata = {
  title: 'Wedding Planning Services Indore — Production, Décor, Choreography & More',
  description:
    'Complete wedding management under one roof — production & entertainment, décor & lighting, food & beverages, choreography, special effects, travel & logistics. Happy Weddings, Indore. Call +91 88271-88884.',
  keywords: [
    'wedding planning services Indore',
    'wedding production entertainment Indore',
    'wedding decor lighting Indore',
    'wedding choreography Sangeet Indore',
    'wedding food catering Indore',
    'wedding special effects Indore',
    'destination wedding travel logistics India',
    'complete wedding management Indore',
    'wedding technical production Indore',
    'wedding planner packages Indore',
    'budget wedding planner Indore',
    'wedding invitation cards Indore',
  ],
  alternates: { canonical: 'https://happyweddings.in/services' },
  openGraph: {
    title: 'Wedding Services — Happy Weddings Indore',
    description:
      'Everything under one roof — from the invitation to the last special effect. Seven core services, one studio, unlimited dedication.',
    url: 'https://happyweddings.in/services',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <ServicesPage />
}
