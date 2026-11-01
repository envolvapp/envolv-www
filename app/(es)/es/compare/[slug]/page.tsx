import { notFound } from 'next/navigation'
import ComparePage from '@/components/ComparePage'
import { COMPARE_SLUGS, isCompareSlug } from '@/lib/compare'
import { compareMetadata } from '@/lib/metadata'

type Props = { params: { slug: string } }

// The three comparison pages are fully static; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return COMPARE_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props) {
  return isCompareSlug(params.slug) ? compareMetadata('es', params.slug) : {}
}

export default function Page({ params }: Props) {
  if (!isCompareSlug(params.slug)) notFound()
  return <ComparePage lang="es" slug={params.slug} />
}
