import PrivacyPage from '@/components/PrivacyPage'
import { privacyMetadata } from '@/lib/metadata'

export const metadata = privacyMetadata('es')

export default function Page() {
  return <PrivacyPage lang="es" />
}
