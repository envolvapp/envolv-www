import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/content'

// One page today. Add an entry here when the site grows a new route.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: 'monthly', priority: 1 }]
}
