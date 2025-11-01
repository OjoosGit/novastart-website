import { MetadataRoute } from 'next'
import { createClient } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://novastart-website.vercel.app'

  // Static pages
  const staticPages = [
    '',
    '/wat-we-bieden',
    '/waar-we-voor-staan',
    '/wie-we-zijn',
    '/kennismaken-en-aanmelden',
    '/voor-ouders',
    '/veelgestelde-vragen',
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

  // Dynamic program pages - only if Sanity is properly configured
  let programRoutes: MetadataRoute.Sitemap = []
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  
  if (projectId && dataset) {
    try {
      const client = createClient({
        projectId,
        dataset,
        apiVersion: '2024-01-01',
        useCdn: true,
      })
      
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
  }

  return [...staticRoutes, ...programRoutes]
}

