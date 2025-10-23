/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://novastart.nl',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/privacy', '/cookies'],
      },
    ],
  },
}

