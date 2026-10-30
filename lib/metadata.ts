import type { Metadata, Viewport } from 'next'
import { SITE_URL, href, type Lang } from '@/lib/content'
import { COPY } from '@/lib/copy'

/**
 * hreflang alternates for a language-neutral path ('/' or '/demo'). Every page
 * points at both versions so search engines serve each visitor the right one.
 */
function alternates(lang: Lang, path: string): Metadata['alternates'] {
  return {
    canonical: href(lang, path),
    languages: {
      'en-US': href('en', path),
      'es-US': href('es', path),
      'x-default': href('en', path),
    },
  }
}

/** Site-wide metadata for a language's root layout. */
export function siteMetadata(lang: Lang): Metadata {
  const m = COPY[lang].meta
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    keywords:
      lang === 'es'
        ? [
            'software de gestión de voluntarios',
            'programación de turnos de voluntarios',
            'registro de horas de voluntarios',
            'software para organizaciones sin fines de lucro',
            'voluntarios en español',
          ]
        : [
            'volunteer management software',
            'volunteer scheduling',
            'volunteer hour tracking',
            'nonprofit volunteer software',
            'animal shelter volunteer software',
            'food bank volunteer scheduling',
          ],
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      url: href(lang, '/'),
      siteName: 'Envolv',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      alternateLocale: lang === 'es' ? ['en_US'] : ['es_US'],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.twitterDescription },
    alternates: alternates(lang, '/'),
    // Icons, share images, robots.txt and sitemap.xml come from Next's file
    // conventions in app/: favicon.ico, icon.svg, apple-icon.png,
    // opengraph-image.png, twitter-image.png, robots.ts, sitemap.ts.
  }
}

export function demoMetadata(lang: Lang): Metadata {
  const m = COPY[lang].meta
  return { title: m.demoTitle, description: m.demoDescription, alternates: alternates(lang, '/demo') }
}

/** Browser chrome follows the visitor's light/dark setting, like the page. */
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1526' },
  ],
}
