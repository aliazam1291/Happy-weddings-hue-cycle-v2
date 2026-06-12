import { HomePage } from '@/components/home/HomePage'

export const metadata = {
  title: 'Happy Weddings — Wedding Planner in Indore | Shruti Jain',
  description:
    "We plan weddings that capture the imagination. Happy Weddings is Indore's leading wedding planning company — theme weddings, destination weddings, classic Indian celebrations — since 2013. Call +91 88271-88884.",
  alternates: { canonical: 'https://happyweddings.in' },
  openGraph: {
    title: 'Happy Weddings — Wedding Planner in Indore | Shruti Jain',
    description:
      "Indore's most sought-after wedding studio. Glorious, colourful, lively celebrations planned with supreme perfection. Theme · Destination · Classic Indian.",
    url: 'https://happyweddings.in',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Home() {
  return <HomePage />
}
