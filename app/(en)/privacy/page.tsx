import PrivacyPage from '@/components/PrivacyPage'
import { privacyMetadata } from '@/lib/metadata'

export const metadata = privacyMetadata('en')

export default function Page() {
  return <PrivacyPage lang="en" />
}
