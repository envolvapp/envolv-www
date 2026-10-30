import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Clock,
  HeartHandshake,
  Landmark,
  Languages,
  Minus,
  PawPrint,
  Send,
  ShoppingBasket,
  Smartphone,
  Stethoscope,
  X,
} from 'lucide-react'
import Link from 'next/link'
import DemoForm from '@/components/DemoForm'
import LangSwitch from '@/components/LangSwitch'
import Logo from '@/components/Logo'
import Pricing from '@/components/Pricing'
import {
  COMPARISON,
  CONTACT_EMAIL,
  FEATURES,
  HERO_BADGE,
  VERTICALS,
  href,
  type Lang,
} from '@/lib/content'
import { COPY } from '@/lib/copy'

const ICONS = {
  PawPrint,
  ShoppingBasket,
  HeartHandshake,
  Landmark,
  Stethoscope,
  Building2,
  Smartphone,
  CalendarCheck,
  Clock,
  ClipboardCheck,
  Send,
  Languages,
}

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400'

/** The landing page, in either language. Routes: / (en) and /es (es). */
export default function HomePage({ lang }: { lang: Lang }) {
  const t = COPY[lang]

  return (
    <>
      {/* Skip link — keyboard users shouldn't have to tab the whole nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-brand"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-ink-800/70 bg-ink-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a
            href="#main"
            aria-label={t.backToTop}
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
          >
            <Logo priority />
          </a>
          <div className="hidden items-center gap-8 text-sm text-ink-200 md:flex">
            <a className="transition-colors hover:text-heading" href="#features">
              {t.nav.features}
            </a>
            <a className="transition-colors hover:text-heading" href="#industries">
              {t.nav.industries}
            </a>
            <a className="transition-colors hover:text-heading" href="#pricing">
              {t.nav.pricing}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <LangSwitch lang={lang} />
            <a
              href="#demo"
              className={`hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-500 sm:inline-block ${focusRing}`}
            >
              {t.requestDemo}
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 h-[28rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(1,136,122,0.22),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
            {HERO_BADGE.show && (
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-3.5 py-1.5 text-xs text-ink-200">
                <span className="size-1.5 rounded-full bg-teal-500" />
                {HERO_BADGE.text[lang]}
              </p>
            )}

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-heading md:text-6xl">
              {t.hero.titleStart} <span className="text-teal-500">{t.hero.titleHighlight}</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">{t.hero.body}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-500 ${focusRing}`}
              >
                {t.requestDemo}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <Link
                href={href(lang, '/demo')}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border border-ink-600 px-6 py-3 text-sm font-semibold text-heading transition-colors hover:border-teal-500 hover:text-teal-400 ${focusRing}`}
              >
                {t.hero.seeLive}
              </Link>
            </div>

            <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-ink-800 pt-8 sm:grid-cols-4">
              {t.hero.stats.map(([stat, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-bold text-heading tabular-nums">{stat}</dt>
                  <dd className="mt-1 text-sm text-ink-400">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section id="features" className="border-t border-ink-800 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-4xl">
              {t.features.title}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-200">{t.features.body}</p>

            <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => {
                const Icon = ICONS[f.icon]
                return (
                  <div key={f.title.en}>
                    <Icon className="size-6 text-brand-400" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold text-heading">{f.title[lang]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">{f.body[lang]}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Industries ───────────────────────────────────────── */}
        <section id="industries" className="border-t border-ink-800 bg-ink-900/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-4xl">
              {t.industries.title}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-200">{t.industries.body}</p>

            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {VERTICALS.map((v) => {
                const Icon = ICONS[v.icon]
                return (
                  <div
                    key={v.value}
                    className="rounded-2xl border border-ink-800 bg-ink-950/50 p-6 transition-colors hover:border-brand-500/50"
                  >
                    <Icon className="size-5 text-brand-400" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold text-heading">{v.name[lang]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">{v.blurb[lang]}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Comparison ───────────────────────────────────────── */}
        <section className="border-t border-ink-800 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-heading md:text-4xl">
              {t.comparison.title}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-200">{t.comparison.body}</p>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-ink-800">
              <table className="w-full min-w-[42rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-800 bg-ink-900/60">
                    <th scope="col" className="px-5 py-4 font-medium text-ink-400">
                      &nbsp;
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold text-teal-500">
                      {t.comparison.envolv}
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium text-ink-200">
                      {t.comparison.modern}
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium text-ink-200">
                      {t.comparison.legacy}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.rows.map((row) => (
                    <tr key={row.label.en} className="border-b border-ink-800/70 last:border-0">
                      <th scope="row" className="px-5 py-4 font-medium text-ink-200">
                        {row.label[lang]}
                      </th>
                      <td className="px-5 py-4 text-heading">
                        <span className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                          {row.envolv[lang]}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-ink-400">
                        <span className="flex items-start gap-2">
                          <Minus className="mt-0.5 size-4 shrink-0 text-ink-600" aria-hidden="true" />
                          {row.modern[lang]}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-ink-400">
                        <span className="flex items-start gap-2">
                          <X className="mt-0.5 size-4 shrink-0 text-ink-600" aria-hidden="true" />
                          {row.legacy[lang]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-ink-400">{COMPARISON.note[lang]}</p>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────── */}
        <section id="pricing" className="border-t border-ink-800 bg-ink-900/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-heading md:text-4xl">
                {t.pricing.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-200">{t.pricing.body}</p>
            </div>
            <Pricing lang={lang} />
          </div>
        </section>

        {/* ── Demo request ─────────────────────────────────────── */}
        <section id="demo" className="border-t border-ink-800 py-24">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-heading md:text-4xl">
                {t.demo.title}
              </h2>
              <p className="mt-4 text-ink-200">{t.demo.body}</p>

              <ul className="mt-8 space-y-3 text-sm text-ink-200">
                {t.demo.bullets.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-ink-400">
                {t.demo.hurry}{' '}
                <Link
                  href={href(lang, '/demo')}
                  className="font-medium text-teal-500 underline underline-offset-4 hover:text-teal-400"
                >
                  {t.demo.tryLive}
                </Link>{' '}
                {t.demo.noSignup}
              </p>
            </div>

            <div className="rounded-2xl border border-ink-800 bg-ink-900/60 p-7">
              <DemoForm lang={lang} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-800 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Logo />
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} Envolv, LLC. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <LangSwitch lang={lang} />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-ink-400 transition-colors hover:text-heading"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
