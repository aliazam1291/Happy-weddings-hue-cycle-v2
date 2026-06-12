import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CursorProvider } from '@/components/providers/CursorProvider'
import { SiteNav } from '@/components/site/SiteNav'
import { SiteFooter } from '@/components/site/SiteFooter'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { StickyContact } from '@/components/site/StickyContact'
import { JsonLd } from '@/components/site/JsonLd'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const BASE_URL = 'https://happyweddings.in'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Happy Weddings — Wedding Planner in Indore | Shruti Jain',
    template: '%s | Happy Weddings Indore',
  },
  description:
    'Happy Weddings is Indore\'s premier wedding planning company by Shruti Jain. Theme weddings, destination weddings, classic Indian weddings — planned with supreme perfection since 2013. Call +91 88271-88884.',
  keywords: [
    'wedding planner Indore',
    'best wedding planner Indore',
    'wedding planning company Indore',
    'destination wedding planner India',
    'theme wedding planner Indore',
    'Shruti Jain wedding planner',
    'luxury wedding planner Indore',
    'wedding planner Madhya Pradesh',
    'Sangeet night choreography Indore',
    'wedding decor lighting Indore',
    'Indian wedding planning services',
    'wedding management company Indore',
    'happy weddings Indore',
    'wedding event planner central India',
    'destination wedding Udaipur Jaipur Goa',
    'wedding special effects Indore',
    'complete wedding management',
    'wedding planner Vijay Nagar Indore',
  ],
  authors: [{ name: 'Shruti Jain', url: BASE_URL }],
  creator: 'Happy Weddings',
  publisher: 'Happy Weddings',
  category: 'Wedding Planning',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Happy Weddings',
    title: 'Happy Weddings — Wedding Planner in Indore | Shruti Jain',
    description:
      'Indore\'s most sought-after wedding planning studio. Theme, destination and classic Indian weddings — planned with attention to detail, creativity and dedication since 2013.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Happy Weddings — Wedding Planning Studio, Indore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Weddings — Wedding Planner in Indore',
    description:
      'Theme, destination and classic Indian weddings by Shruti Jain. Based in Indore, celebrating across India.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: '',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <JsonLd />
        <SmoothScrollProvider>
          <CursorProvider>
            <ScrollProgress />
            <SiteNav />
            <main className="relative">{children}</main>
            <SiteFooter />
            <StickyContact />
          </CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
