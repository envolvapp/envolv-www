import Link from 'next/link'
import LangSwitch from '@/components/LangSwitch'
import Logo from '@/components/Logo'
import { CONTACT_EMAIL, href, type Lang } from '@/lib/content'
import { COPY } from '@/lib/copy'
import { PRIVACY, UPDATED_ISO, type PrivacyBlock } from '@/lib/privacy'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400'

function Block({ block }: { block: PrivacyBlock }) {
  if ('p' in block) return <p className="mt-4 leading-relaxed text-ink-200">{block.p}</p>
  return (
    <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-ink-200 marker:text-ink-400">
      {block.list.map((item) => (
        <li key={item.lead ?? item.text}>
          {item.lead && <strong className="font-semibold text-heading">{item.lead}</strong>} {item.text}
        </li>
      ))}
    </ul>
  )
}

/** The Privacy Policy, in either language. Routes: /privacy and /es/privacy. */
export default function PrivacyPage({ lang }: { lang: Lang }) {
  const doc = PRIVACY[lang]
  const t = COPY[lang]

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
          <Link href={href(lang, '/')} aria-label={t.home} className={`rounded-md ${focusRing}`}>
            <Logo priority />
          </Link>
          <LangSwitch lang={lang} path="/privacy" />
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight text-heading sm:text-5xl">{doc.title}</h1>
        <p className="mt-3 text-sm text-ink-400">
          {doc.updatedLabel}: <time dateTime={UPDATED_ISO}>{doc.updated}</time>
        </p>

        {doc.intro.map((p) => (
          <p key={p} className="mt-5 text-lg leading-relaxed text-ink-200">
            {p}
          </p>
        ))}

        <nav aria-labelledby="privacy-toc" className="mt-10 rounded-2xl border border-ink-800 bg-ink-900/60 p-6">
          <h2 id="privacy-toc" className="text-sm font-semibold uppercase tracking-wider text-teal-400">
            {doc.tocLabel}
          </h2>
          <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={`rounded text-ink-200 hover:text-heading ${focusRing}`}>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {doc.sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-12 scroll-mt-8">
            <h2 id={`${s.id}-h`} className="text-2xl font-semibold tracking-tight text-heading">
              {s.heading}
            </h2>
            {s.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </section>
        ))}

        <p className="mt-10">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={`inline-flex rounded-md font-semibold text-teal-400 hover:text-heading ${focusRing}`}
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </main>

      <footer className="border-t border-ink-800 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Logo />
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} Envolv, LLC. {t.footer.rights}
          </p>
          <LangSwitch lang={lang} path="/privacy" />
        </div>
      </footer>
    </div>
  )
}
