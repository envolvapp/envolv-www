import '../globals.css'
import { siteMetadata } from '@/lib/metadata'

export { viewport } from '@/lib/metadata'
export const metadata = siteMetadata('es')

/**
 * Root layout for the Spanish site (/es, /es/demo). English and Spanish each get their
 * own root layout (route groups) so <html lang> is right in the static HTML.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
