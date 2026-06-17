/**
 * JSON-LD structured data — helps Google understand the business entity,
 * enables rich snippets, and supports the Knowledge Panel for local search.
 * Rendered server-side in layout so it's always present.
 */
export function JsonLd() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EventPlanner'],
    name: 'Happy Weddings',
    alternateName: 'Happy Weddings by Shruti Jain',
    description:
      'Indore\'s premier wedding planning company — theme weddings, destination weddings and classic Indian celebrations planned with supreme perfection since 2013.',
    url: 'https://happyweddings.in',
    logo: 'https://happyweddings.in/logo.svg',
    image: 'https://happyweddings.in/og-image.jpg',
    foundingDate: '2013',
    founder: {
      '@type': 'Person',
      name: 'Shruti Jain',
      jobTitle: 'CEO & Founder',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '415, Apollo Premier, Vijay Nagar',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      postalCode: '452010',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.7242,
      longitude: 75.8839,
    },
    telephone: ['+91-88271-88884', '0731-3547763', '0731-4979427'],
    email: 'happyweddingsforu@gmail.com',
    sameAs: [
      'https://instagram.com/happyweddingsofficial',
      'https://facebook.com/happyweddingsofficial',
      'https://www.youtube.com/channel/UCLjcA6--sDfvXAe9qbX6klg',
      'https://twitter.com/happyweddings3',
    ],
    openingHours: 'Mo-Sa 10:00-19:00',
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Bank Transfer, UPI',
    areaServed: [
      'Indore',
      'Bhopal',
      'Ujjain',
      'Madhya Pradesh',
      'Udaipur',
      'Jaipur',
      'Goa',
      'India',
    ],
    serviceType: [
      'Wedding Planning',
      'Theme Wedding',
      'Destination Wedding',
      'Classic Indian Wedding',
      'Sangeet Night',
      'Wedding Décor',
      'Wedding Choreography',
      'Wedding Production',
    ],
    hasMap: 'https://maps.google.com/?q=415+Apollo+Premier+Vijay+Nagar+Indore',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Happy Weddings',
    url: 'https://happyweddings.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://happyweddings.in/logo.svg',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-88271-88884',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
      },
    ],
    sameAs: [
      'https://instagram.com/happyweddingsofficial',
      'https://facebook.com/happyweddingsofficial',
      'https://www.youtube.com/channel/UCLjcA6--sDfvXAe9qbX6klg',
      'https://twitter.com/happyweddings3',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  )
}
