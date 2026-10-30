import DemoPage from '@/components/DemoPage'
import { demoMetadata } from '@/lib/metadata'

export const metadata = demoMetadata('es')

export default function Page() {
  return <DemoPage lang="es" />
}
