import { ContactPage } from '@/components/pages/ContactPage'

export const metadata = {
  title: 'Contact & Book a Free Consultation — Happy Weddings Indore',
  description:
    "Book a free wedding consultation with Happy Weddings, Indore's leading wedding planner. Call +91 88271-88884, WhatsApp us, or email happyweddingsforu@gmail.com. 415 Apollo Premier, Vijay Nagar, Indore.",
  keywords: [
    'contact Happy Weddings Indore',
    'book wedding planner Indore',
    'wedding consultation Indore',
    'wedding planner phone number Indore',
    'Happy Weddings phone number',
    'wedding enquiry Indore',
    'wedding planner WhatsApp India',
    'wedding planner near me Indore',
    'Vijay Nagar Indore wedding planner',
    'free wedding consultation India',
  ],
  alternates: { canonical: 'https://happyweddings.in/contact' },
  openGraph: {
    title: "Contact Happy Weddings — Let's Begin",
    description:
      'The first conversation is free, no-obligation, and one hour long. Call +91 88271-88884 or WhatsApp us. 415 Apollo Premier, Vijay Nagar, Indore.',
    url: 'https://happyweddings.in/contact',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return <ContactPage />
}
