import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Clock,
  FolderInput,
  HeartHandshake,
  Landmark,
  Languages,
  PawPrint,
  Send,
  ShieldCheck,
  ShoppingBasket,
  Smartphone,
  Stethoscope,
} from 'lucide-react'
import Link from 'next/link'
import DemoForm from '@/components/DemoForm'
import LangSwitch from '@/components/LangSwitch'
import Logo from '@/components/Logo'
import Pricing from '@/components/Pricing'
import { COMPARE, COMPARE_SLUGS } from '@/lib/compare'
import {
  AS_OF,
  CLINIC,
  COMPARISON,
  CONTACT_EMAIL,
  ENTERPRISE,
  FEATURES,
  HERO_BADGE,
  MIGRATION_OFFER,
  PRICE_POINTS,
  VERTICALS,
  envolvMonthlyAt,
  href,
  num,
  usd,
  type Lang,
} from '@/lib/content'
import { COPY } from '@/lib/copy'

const ICONS = {
  BadgeCheck,
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

/** Footnote marker in the comparison table, linking to its note. */
function NoteRef({ n }: { n: number }) {
  return (
    <sup className="ml-0.5">
      <a href={`#cmp-note-${n}`} className="rounded px-0.5 text-ink-400 hover:text-heading focus-visible:outline-2 focus-visible:outline-teal-400">
        {n}
      </a>
    </sup>
  )
}

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
          <div className="hidden items-center gap-7 text-sm text-ink-200 md:flex">
            <a className="transition-colors hover:text-heading" href="#clinics">
              {t.nav.clinics}
            </a>
            <a className="transition-colors hover:text-heading" href="#features">
              {t.nav.features}
            </a>
            <a className="transition-colors hover:text-heading" href="#pricing">
              {t.nav.pricing}
            </a>
            <a className="transition-colors hover:text-heading" href="#compare">
              {t.nav.compare}
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

            <p className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-teal-500 uppercase">
              <Stethoscope className="size-4" aria-hidden="true" />
              {t.hero.eyebrow}
            </p>

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

        {/* ── Clinics (the lead audience) ──────────────────────── */}
        <section id="clinics" className="scroll-mt-20 border-t border-ink-800 bg-ink-900/40 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-heading md:text-4xl">{t.clinics.title}</h2>
              <p className="mt-4 text-ink-200">{t.clinics.body}</p>
              <p className="mt-6 text-sm text-ink-400">
                {t.clinics.demoLead}{' '}
                <Link
                  href={href(lang, '/demo')}
                  className="font-medium text-teal-500 underline underline-offset-4 hover:text-teal-400"
                >
                  {t.clinics.demoLink}
                </Link>
              </p>
            </div>

            <div>
              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {CLINIC.points.map((p) => {
                  const Icon = ICONS[p.icon]
                  return (
                    <div key={p.title.en}>
                      <Icon className="size-5 text-brand-400" aria-hidden="true" />
                      <h3 className="mt-3 font-semibold text-heading">{p.title[lang]}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-400">{p.body[lang]}</p>
                    </div>
                  )
                })}
              </div>
              <p className="mt-10 flex gap-3 rounded-2xl border border-ink-800 bg-ink-950/50 p-5 text-sm leading-relaxed text-ink-200">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal-500" aria-hidden="true" />
                <span>{CLINIC.boundary[lang]}</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section id="features" className="scroll-mt-20 border-t border-ink-800 py-24">
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

        {/* ── Other industries ─────────────────────────────────── */}
        <section id="industries" className="scroll-mt-20 border-t border-ink-800 bg-ink-900/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-heading md:text-4xl">
              {t.industries.title}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-200">{t.industries.body}</p>

            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {VERTICALS.filter((v) => !('lead' in v && v.lead)).map((v) => {
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
              <a
                href="#demo"
                className={`group flex flex-col justify-between rounded-2xl border border-dashed border-ink-600 p-6 transition-colors hover:border-teal-500 ${focusRing}`}
              >
                <span>
                  <span className="block font-semibold text-heading">{t.industries.otherTitle}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-400">{t.industries.otherBody}</span>
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-500 group-hover:text-teal-400">
                  {t.requestDemo}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────── */}
        <section id="pricing" className="scroll-mt-20 border-t border-ink-800 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-heading md:text-4xl">
                {t.pricing.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-200">{t.pricing.body}</p>
            </div>
            <Pricing lang={lang} />
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-ink-400">
              {t.pricing.compareLead}{' '}
              {COMPARE_SLUGS.map((slug, i) => (
                <span key={slug}>
                  <Link
                    href={href(lang, `/compare/${slug}`)}
                    className="font-medium text-teal-500 underline underline-offset-4 hover:text-teal-400"
                  >
                    {COMPARE[slug][lang].navLabel}
                  </Link>
                  {i < COMPARE_SLUGS.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ── Comparison — dated and sourced (DECISIONS 2026-10-31) ── */}
        <section id="compare" className="scroll-mt-20 border-t border-ink-800 bg-ink-900/40 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-heading md:text-4xl">
              {t.comparison.title}
            </h2>
            <p className="mt-4 max-w-2xl text-ink-200">{t.comparison.body}</p>
            <p className="mt-3 text-sm text-ink-400">
              {t.comparison.checked} <time dateTime={AS_OF.iso}>{AS_OF.text[lang]}</time>.
            </p>

            <div className="-mx-6 mt-8 overflow-x-auto border-y border-ink-800 bg-ink-950/50 sm:mx-0 sm:rounded-2xl sm:border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">{t.comparison.caption}</caption>
                <thead>
                  <tr className="border-b border-ink-800 bg-ink-900/60">
                    <th scope="col" className="py-4 pr-2.5 pl-4 align-bottom font-medium text-ink-200 sm:px-5">
                      {t.comparison.actives}
                    </th>
                    <th scope="col" className="px-2.5 py-4 align-bottom font-semibold text-teal-500 sm:px-5">
                      {t.comparison.envolv}
                      <NoteRef n={1} />
                    </th>
                    <th scope="col" className="px-2.5 py-4 align-bottom font-medium text-ink-200 sm:px-5">
                      {t.comparison.civic}
                      <NoteRef n={2} />
                      <span className="block text-xs font-normal text-ink-400">{t.comparison.civicNote}</span>
                    </th>
                    <th scope="col" className="py-4 pr-4 pl-2.5 align-bottom font-medium text-ink-200 sm:px-5">
                      {t.comparison.volgistics}
                      <NoteRef n={3} />
                      <span className="block text-xs font-normal text-ink-400">{t.comparison.volgisticsNote}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_POINTS.map((p) => {
                    const e = envolvMonthlyAt(p.actives)
                    return (
                      <tr key={p.actives} className="border-b border-ink-800/70 last:border-0">
                        <th scope="row" className="py-4 pr-2.5 pl-4 font-medium text-ink-200 tabular-nums sm:px-5">
                          {num(p.actives)}
                        </th>
                        <td className="px-2.5 py-4 font-semibold text-heading tabular-nums sm:px-5">
                          {e === null ? t.comparison.from(ENTERPRISE.floor) : usd(e)}
                        </td>
                        <td className="px-2.5 py-4 text-ink-200 tabular-nums sm:px-5">{usd(p.civicChamps)}</td>
                        <td className="py-4 pr-4 pl-2.5 whitespace-nowrap text-ink-200 tabular-nums sm:px-5">
                          {usd(p.volgistics[0])}–{usd(p.volgistics[1])}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <h3 className="sr-only">{t.comparison.notes}</h3>
            <ol className="mt-6 space-y-2.5 text-xs leading-relaxed text-ink-400">
              {COMPARISON.notes.map((note, i) => (
                <li key={note.id} id={`cmp-note-${i + 1}`} className="flex scroll-mt-24 gap-2">
                  <span className="text-ink-200 tabular-nums">{i + 1}.</span>
                  <span>{note.text[lang]}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-ink-400">
              {t.comparison.sources}:{' '}
              {COMPARISON.sources.map((s, i) => (
                <span key={s.url}>
                  <a href={s.url} rel="noopener noreferrer" className="underline underline-offset-2 hover:text-heading">
                    {s.label}
                  </a>
                  {i < COMPARISON.sources.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>

            <p className="mt-10 flex gap-3 rounded-2xl border border-brand-500/50 bg-ink-950/50 p-5 text-sm leading-relaxed text-ink-200">
              <FolderInput className="mt-0.5 size-5 shrink-0 text-brand-400" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-heading">{MIGRATION_OFFER.title[lang]}</strong>{' '}
                {MIGRATION_OFFER.body[lang]}
              </span>
            </p>

            <h3 className="mt-10 text-sm font-semibold text-heading">{t.comparison.readMore}</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3">
              {COMPARE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={href(lang, `/compare/${slug}`)}
                    className={`flex h-full items-center justify-between gap-3 rounded-xl border border-ink-800 bg-ink-950/50 px-4 py-3.5 text-sm font-medium text-heading transition-colors hover:border-teal-500 ${focusRing}`}
                  >
                    {COMPARE[slug][lang].navLabel}
                    <ArrowRight className="size-4 shrink-0 text-teal-500" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Demo request ─────────────────────────────────────── */}
        <section id="demo" className="scroll-mt-20 border-t border-ink-800 py-24">
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
            <Link href={href(lang, '/privacy')} className="text-sm text-ink-400 transition-colors hover:text-heading">
              {t.footer.privacy}
            </Link>
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
