/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: `output: 'export'` and `trailingSlash: true` were removed. With the
  // App Router, `trailingSlash: true` broke client-side <Link> navigation — the
  // RSC payload fetch 404'd on the trailing slash and dumped users into the
  // not-found boundary (blank page). Pages only worked on a hard reload.
  // Re-add both at build time only if you need a static export for static hosting.
  images: {
    unoptimized: true,
  },
}
module.exports = nextConfig
