import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import LangSwitch from '@/components/LangSwitch'
import Logo from '@/components/Logo'
import { AS_OF, href, type Lang } from '@/lib/content'
import { COMPARE, COMPARE_SLUGS, type CompareSlug, type CompareTable } from '@/lib/compare'
import { COPY } from '@/lib/copy'
import { cn } from '@/lib/utils'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400'

/**
 * A comparison table. `stack` turns each row into a card below the `sm`
 * breakpoint, for tables whose cells are sentences; short price tables stay
 * tables at every width. Column 1 (after the row labels) is always Envolv.
 */
function Table({ table, stack = false, rowHeader }: { table: CompareTable; stack?: boolean; rowHeader: string }) {
  return (
    <figure className="mt-6">
      <div className={cn('overflow-x-auto rounded-2xl border border-ink-800', stack && 'hidden sm:block')}>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr className="border-b border-ink-800 bg-ink-900/60">
              {table.head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={cn(
                    'px-4 py-3.5 align-bottom sm:px-5',
                    i === 1 ? 'font-semibold text-teal-500' : 'font-medium text-ink-200',
                  )}
                >
                  {h || <span className="sr-only">{rowHeader}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map(([label, ...cells]) => (
              <tr key={label} className="border-b border-ink-800/70 align-top last:border-0">
                <th scope="row" className="px-4 py-3.5 font-medium text-ink-200 tabular-nums sm:px-5">
                  {label}
                </th>
                {cells.map((c, i) => (
                  <td
                    key={i}
                    className={cn(
                      'px-4 py-3.5 tabular-nums sm:px-5',
                      i === 0 ? 'font-medium text-heading' : 'text-ink-200',
                    )}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {stack && (
        <dl className="space-y-3 sm:hidden">
          {table.rows.map(([label, ...cells]) => (
            <div key={label} className="rounded-xl border border-ink-800 bg-ink-900/40 p-4">
              <dt className="text-sm font-semibold text-heading">{label}</dt>
              {cells.map((c, i) => (
                <dd key={i} className="mt-2 text-sm leading-relaxed">
                  <span className={cn('font-medium', i === 0 ? 'text-teal-500' : 'text-ink-200')}>
                    {table.head[i + 1]}:
                  </span>{' '}
                  <span className={i === 0 ? 'text-heading' : 'text-ink-200'}>{c}</span>
                </dd>
              ))}
            </div>
          ))}
        </dl>
      )}

      {table.note && <figcaption className="mt-3 text-xs leading-relaxed text-ink-400">{table.note}</figcaption>}
    </figure>
  )
}

/**
 * A dedicated, dated, sourced comparison page, in either language.
 * Routes: /compare/[slug] and /es/compare/[slug]. Content: lib/compare.ts.
 */
export default function ComparePage({ lang, slug }: { lang: Lang; slug: CompareSlug }) {
  const doc = COMPARE[slug][lang]
  const t = COPY[lang]
  const path = `/compare/${slug}`
  const home = href(lang, '/')
  const others = COMPARE_SLUGS.filter((s) => s !== slug)

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-brand"
      >
        {t.skip}
      </a>

      <header className="border-b border-ink-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href={home} aria-label={t.home} className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400">
            <Logo priority />
          </Link>
          <div className="flex items-center gap-5">
            <LangSwitch lang={lang} path={path} />
            <Link
              href={`${home}#demo`}
              className={`hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-500 sm:inline-block ${focusRing}`}
            >
              {t.requestDemo}
            </Link>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-500">{t.compare.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-heading sm:text-5xl">{doc.title}</h1>
        <p className="mt-4 text-sm text-ink-400">
          {t.compare.checked} <time dateTime={AS_OF.iso}>{AS_OF.text[lang]}</time>
        </p>
        {doc.intro.map((p) => (
          <p key={p} className="mt-5 text-lg leading-relaxed text-ink-200">
            {p}
          </p>
        ))}

        {doc.prices && (
          <section aria-labelledby="prices-h" className="mt-14">
            <h2 id="prices-h" className="text-2xl font-semibold tracking-tight text-heading">
              {doc.prices.title}
            </h2>
            <Table table={doc.prices.table} rowHeader={t.compare.feature} />
            {doc.prices.body?.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-ink-200">
                {p}
              </p>
            ))}
          </section>
        )}

        <section aria-labelledby="glance-h" className="mt-14">
          <h2 id="glance-h" className="text-2xl font-semibold tracking-tight text-heading">
            {t.compare.glance}
          </h2>
          <Table table={doc.glance} stack rowHeader={t.compare.feature} />
        </section>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <section aria-labelledby="wins-h" className="rounded-2xl border border-ink-800 bg-ink-900/40 p-6 sm:p-7">
            <h2 id="wins-h" className="text-xl font-semibold tracking-tight text-heading">
              {t.compare.wins(doc.competitor)}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-200">
              {doc.wins.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="envolv-h" className="rounded-2xl border border-brand-500/50 bg-ink-900 p-6 sm:p-7">
            <h2 id="envolv-h" className="text-xl font-semibold tracking-tight text-heading">
              {t.compare.envolv}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-200">
              {doc.envolv.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="switch-h" className="mt-14">
          <h2 id="switch-h" className="text-2xl font-semibold tracking-tight text-heading">
            {t.compare.switching}
          </h2>
          {doc.switching.map((p) => (
            <p key={p} className="mt-4 leading-relaxed text-ink-200">
              {p}
            </p>
          ))}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`${home}#demo`}
              className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-500 ${focusRing}`}
            >
              {t.requestDemo}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={`${home}#pricing`}
              className={`inline-flex items-center justify-center rounded-lg border border-ink-600 px-6 py-3 text-sm font-semibold text-heading transition-colors hover:border-teal-500 hover:text-teal-400 ${focusRing}`}
            >
              {t.compare.seePricing}
            </Link>
            <Link
              href={href(lang, '/demo')}
              className="px-2 py-3 text-center text-sm font-medium text-teal-500 underline underline-offset-4 hover:text-teal-400"
            >
              {t.demo.tryLive}
            </Link>
          </div>
        </section>

        <section aria-labelledby="sources-h" className="mt-14 border-t border-ink-800 pt-8">
          <h2 id="sources-h" className="text-sm font-semibold uppercase tracking-wider text-ink-200">
            {t.compare.sources}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {doc.sources.map((s) => (
              <li key={s.url} className="leading-relaxed">
                <a href={s.url} rel="noopener noreferrer" className="text-teal-500 underline underline-offset-2 hover:text-teal-400">
                  {s.label}
                </a>{' '}
                <span className="break-all text-ink-400">— {s.url.replace(/^https:\/\//, '')}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-400">
            {t.compare.checked} <time dateTime={AS_OF.iso}>{AS_OF.text[lang]}</time>.
          </p>
        </section>

        <nav aria-labelledby="others-h" className="mt-12">
          <h2 id="others-h" className="text-sm font-semibold uppercase tracking-wider text-ink-200">
            {t.compare.others}
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {others.map((s) => (
              <li key={s}>
                <Link
                  href={href(lang, `/compare/${s}`)}
                  className={`flex items-center justify-between gap-3 rounded-xl border border-ink-800 bg-ink-900/40 px-4 py-3.5 text-sm font-medium text-heading transition-colors hover:border-teal-500 ${focusRing}`}
                >
                  {COMPARE[s][lang].navLabel}
                  <ArrowRight className="size-4 shrink-0 text-teal-500" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="border-t border-ink-800 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Logo />
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} Envolv, LLC. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <LangSwitch lang={lang} path={path} />
            <Link href={href(lang, '/privacy')} className="text-sm text-ink-400 transition-colors hover:text-heading">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
