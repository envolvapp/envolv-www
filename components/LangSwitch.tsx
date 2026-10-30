import Link from 'next/link'
import { Globe } from 'lucide-react'
import { href, type Lang } from '@/lib/content'
import { COPY } from '@/lib/copy'

/** Links to the same page in the other language. `path` is language-neutral, e.g. '/demo'. */
export default function LangSwitch({ lang, path = '/' }: { lang: Lang; path?: string }) {
  const other: Lang = lang === 'en' ? 'es' : 'en'
  const t = COPY[lang].langSwitch
  return (
    <Link
      href={href(other, path)}
      hrefLang={t.hreflang}
      lang={t.hreflang}
      title={t.title}
      className="inline-flex items-center gap-1.5 rounded-md text-sm text-ink-200 transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
    >
      <Globe className="size-4" aria-hidden="true" />
      {t.label}
    </Link>
  )
}
