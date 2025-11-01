import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Novastart - Onderwijs voor jongeren in Heerlen',
    short_name: 'Novastart',
    description: 'Novastart biedt onderwijstrajecten voor jongeren die zijn vastgelopen in het reguliere onderwijs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#1E88E5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}



