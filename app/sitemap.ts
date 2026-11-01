import type { MetadataRoute } from 'next'
import { COMPARE_SLUGS } from '@/lib/compare'
import { SITE_URL } from '@/lib/content'

// Every page exists in English (/) and Spanish (/es). Add both when the site
// grows a new route.
const PAGES = [
  { path: '', priority: 1 },
  { path: '/demo', priority: 0.8 },
  ...COMPARE_SLUGS.map((slug) => ({ path: `/compare/${slug}`, priority: 0.6 })),
  { path: '/privacy', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) => {
    const languages = { 'en-US': `${SITE_URL}${path || '/'}`, 'es-US': `${SITE_URL}/es${path}` }
    return [
      { url: languages['en-US'], changeFrequency: 'monthly' as const, priority, alternates: { languages } },
      { url: languages['es-US'], changeFrequency: 'monthly' as const, priority, alternates: { languages } },
    ]
  })
}
