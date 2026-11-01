import type { Metadata, Viewport } from 'next'
import { COMPARE, type CompareSlug } from '@/lib/compare'
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

export function privacyMetadata(lang: Lang): Metadata {
  const m = COPY[lang].meta
  return { title: m.privacyTitle, description: m.privacyDescription, alternates: alternates(lang, '/privacy') }
}

/**
 * The share image from app/opengraph-image.png (and the identical
 * twitter-image.png). A page that sets its own `openGraph` loses the
 * file-convention image, so those pages name it here. Alt text = the
 * .alt.txt files next to the images.
 */
const SHARE_IMAGE = {
  width: 1200,
  height: 630,
  alt: 'Envolv logo with the tagline "Get involved." and the line: volunteer management your volunteers will actually use, free for up to 25 volunteers.',
}

/** A comparison page (lib/compare.ts). Its own share title, so a link doesn't preview as the home page. */
export function compareMetadata(lang: Lang, slug: CompareSlug): Metadata {
  const doc = COMPARE[slug][lang]
  const path = `/compare/${slug}`
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    alternates: alternates(lang, path),
    openGraph: {
      title: doc.metaTitle,
      description: doc.metaDescription,
      url: href(lang, path),
      siteName: 'Envolv',
      type: 'article',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      alternateLocale: lang === 'es' ? ['en_US'] : ['es_US'],
      images: [{ url: '/opengraph-image.png', ...SHARE_IMAGE }],
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.metaTitle,
      description: doc.metaDescription,
      images: [{ url: '/twitter-image.png', ...SHARE_IMAGE }],
    },
  }
}

/** Browser chrome follows the visitor's light/dark setting, like the page. */
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1526' },
  ],
}
