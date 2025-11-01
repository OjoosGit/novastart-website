/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Onderdruk hydration warnings veroorzaakt door browser extensies
  reactStrictMode: true,
  
  // GEEN cache headers - Next.js dynamic pages krijgen automatisch no-cache
  // Dit zorgt voor instant updates van Sanity content
}

module.exports = nextConfig

