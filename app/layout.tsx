import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Envolv — Volunteer management that volunteers actually use',
  description:
    'Mobile-first volunteer management for shelters, food banks, nonprofits, museums, and clinics. Scheduling, hour tracking, onboarding, and messaging. Free up to 25 volunteers; paid plans from $29/month.',
  keywords: [
    'volunteer management software',
    'volunteer scheduling',
    'volunteer hour tracking',
    'nonprofit volunteer software',
    'animal shelter volunteer software',
    'food bank volunteer scheduling',
  ],
  openGraph: {
    title: 'Envolv — Volunteer management that volunteers actually use',
    description:
      'Mobile-first volunteer scheduling, hour tracking, and onboarding for shelters, food banks, nonprofits, museums, and clinics. Free up to 25 volunteers.',
    url: SITE_URL,
    siteName: 'Envolv',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Envolv — Volunteer management that volunteers actually use',
    description:
      'Mobile-first volunteer scheduling, hour tracking, and onboarding. Free up to 25 volunteers.',
  },
  alternates: { canonical: '/' },
  // Icons, share images, robots.txt and sitemap.xml come from Next's file
  // conventions in app/: favicon.ico, icon.svg, apple-icon.png,
  // opengraph-image.png, twitter-image.png, robots.ts, sitemap.ts.
}

export const viewport: Viewport = {
  themeColor: '#0d1526',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
