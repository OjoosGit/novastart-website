import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity.client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Static pages
  const staticPages = [
    '',
    '/wat-we-bieden',
    '/waar-we-voor-staan',
    '/wie-we-zijn',
    '/kennismaken-en-aanmelden',
    '/voor-ouders',
    '/kwaliteit',
    '/samenwerkingen',
    '/contact',
  ]

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic program pages
  let programRoutes: MetadataRoute.Sitemap = []
  try {
    const programs = await client.fetch(
      `*[_type == "program"]{ "slug": slug.current, _updatedAt }`
    )
    programRoutes = programs.map((program: any) => ({
      url: `${baseUrl}/wat-we-bieden/${program.slug}`,
      lastModified: new Date(program._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching programs for sitemap:', error)
  }

  return [...staticRoutes, ...programRoutes]
}

