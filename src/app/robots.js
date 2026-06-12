export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://happyweddings.in/sitemap.xml',
    host: 'https://happyweddings.in',
  }
}
