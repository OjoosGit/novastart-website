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
  
  // Cache headers voor snellere content updates
  async headers() {
    return [
      {
        // Pas toe op alle pagina's
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // s-maxage=10: CDN cached 10 seconden
            // stale-while-revalidate=59: Serve stale content terwijl revalidating
            value: 'public, s-maxage=10, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

