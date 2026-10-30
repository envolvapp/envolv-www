import '../globals.css'
import { siteMetadata } from '@/lib/metadata'

export { viewport } from '@/lib/metadata'
export const metadata = siteMetadata('en')

/**
 * Root layout for the English site (/, /demo). English and Spanish each get their
 * own root layout (route groups) so <html lang> is right in the static HTML.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
