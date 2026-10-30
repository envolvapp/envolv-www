import DemoPage from '@/components/DemoPage'
import { demoMetadata } from '@/lib/metadata'

export const metadata = demoMetadata('en')

export default function Page() {
  return <DemoPage lang="en" />
}
