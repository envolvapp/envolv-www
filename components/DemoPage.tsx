import Link from 'next/link'
import QRCode from 'qrcode'
import { Check } from 'lucide-react'
import DemoLauncher from '@/components/DemoLauncher'
import LangSwitch from '@/components/LangSwitch'
import Logo from '@/components/Logo'
import { DEMO_URL, href, type Lang } from '@/lib/content'
import { COPY } from '@/lib/copy'

/** The live-demo chooser, in either language. Routes: /demo and /es/demo. */
export default async function DemoPage({ lang }: { lang: Lang }) {
  const t = COPY[lang].live
  const volunteerUrl = `${DEMO_URL}/api/demo/enter?as=volunteer`
  // Rendered at build time — a plain SVG, no client-side QR library. Dark on
  // white in both color schemes: phone cameras read that most reliably.
  const qrSvg = await QRCode.toString(volunteerUrl, {
    type: 'svg',
    margin: 1,
    errorCorrectionLevel: 'M',
    color: { dark: '#0d1526', light: '#ffffff' },
  })

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      <header className="border-b border-ink-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href={href(lang, '/')}
            aria-label={COPY[lang].home}
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
          >
            <Logo priority />
          </Link>
          <div className="flex items-center gap-5">
            <LangSwitch lang={lang} path="/demo" />
            <Link
              href={`${href(lang, '/')}#demo`}
              className="hidden text-sm font-medium text-ink-200 hover:text-heading sm:inline"
            >
              {t.guided}
            </Link>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <section>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400">{t.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-heading sm:text-5xl">{t.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-200">
              {t.introStart} <strong className="text-heading">{t.org}</strong> {t.introEnd}
            </p>
            {lang === 'es' && <p className="mt-3 max-w-xl text-sm text-ink-400">{t.appLanguageNote}</p>}

            <div className="mt-10 rounded-2xl border border-ink-800 bg-ink-900/60 p-6 sm:p-7">
              <DemoLauncher appUrl={DEMO_URL} lang={lang} />
            </div>
          </section>

          <aside className="space-y-8">
            <div className="hidden rounded-2xl border border-ink-800 bg-ink-900/60 p-6 lg:block">
              <h2 className="font-semibold text-heading">{t.phoneTitle}</h2>
              <p className="mt-1 text-sm text-ink-400">{t.phoneBody}</p>
              <div
                className="mt-4 w-40 overflow-hidden rounded-lg"
                role="img"
                aria-label={t.qrLabel}
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            </div>

            <div>
              <h2 className="font-semibold text-heading">{t.tryTitle}</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-200">
                {t.tryThis.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 hidden text-sm text-ink-400 lg:block">
                {t.sideBySideStart} <span className="text-ink-200">{t.sideBySideButton}</span>{' '}
                {t.sideBySideEnd}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
