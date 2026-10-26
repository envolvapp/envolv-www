import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  HeartHandshake,
  Landmark,
  Languages,
  PawPrint,
  Send,
  ShoppingBasket,
  Minus,
  Smartphone,
  Stethoscope,
  X,
  Check,
  CircleDashed,
} from 'lucide-react'
import DemoForm from '@/components/DemoForm'
import Pricing from '@/components/Pricing'
import SoonBadge from '@/components/SoonBadge'
import { COMPARISON, DEMO_URL, FEATURES, VERTICALS } from '@/lib/content'

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

function Logo() {
  return (
    <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
      <span className="grid size-7 place-items-center rounded-lg bg-brand-500 text-sm font-bold text-white">
        E
      </span>
      Envolv
    </span>
  )
}

export default function Home() {
  return (
    <>
      {/* Skip link — keyboard users shouldn't have to tab the whole nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-ink-800/70 bg-ink-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="hidden items-center gap-8 text-sm text-ink-200 md:flex">
            <a className="transition-colors hover:text-white" href="#features">
              Features
            </a>
            <a className="transition-colors hover:text-white" href="#industries">
              Industries
            </a>
            <a className="transition-colors hover:text-white" href="#pricing">
              Pricing
            </a>
          </div>
          <a
            href="#demo"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          >
            Request a demo
          </a>
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
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-3.5 py-1.5 text-xs text-ink-200">
              <span className="size-1.5 rounded-full bg-teal-500" />
              Live today at a free medical clinic — and built for what&apos;s next
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
              Volunteer management your volunteers will{' '}
              <span className="text-teal-500">actually use</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
              The tools running most volunteer programs were designed before the
              smartphone. Envolv is mobile-first: volunteers claim shifts and
              clock in from an app on their phone, and reminders go out on
              their own — while you get the schedule, the hours, and the
              reports without chasing anyone.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                Request a demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-teal-500 hover:text-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                See it live
              </a>
            </div>

            <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-ink-800 pt-8 sm:grid-cols-4">
              {[
                ['Free', 'to start, up to 25 volunteers'],
                ['6', 'industries we’re built for'],
                ['EN / ES', 'bilingual by default'],
                ['0', 'setup fees or contracts'],
              ].map(([stat, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-bold text-white tabular-nums">{stat}</dt>
                  <dd className="mt-1 text-sm text-ink-400">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section id="features" className="border-t border-ink-800 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Everything the coordinator does by hand today
            </h2>
            <p className="mt-4 max-w-2xl text-ink-200">
              Scheduling, hour tracking, onboarding, and messaging in one place —
              so the program runs without living inside one person&apos;s inbox.
            </p>

            <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => {
                const Icon = ICONS[f.icon]
                return (
                  <div key={f.title}>
                    <Icon className="size-6 text-brand-400" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">
                      {f.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Industries ───────────────────────────────────────── */}
        <section id="industries" className="border-t border-ink-800 bg-ink-900/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
              Not a blank slate you have to configure
            </h2>
            <p className="mt-4 max-w-2xl text-ink-200">
              Generic tools hand you an empty database and wish you luck. We set
              Envolv up around your roles, shifts, and requirements with you —
              and ready-made templates for each of these industries are on the
              way.
            </p>

            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {VERTICALS.map((v) => {
                const Icon = ICONS[v.icon]
                return (
                  <div
                    key={v.name}
                    className="rounded-2xl border border-ink-800 bg-ink-950/50 p-6 transition-colors hover:border-brand-500/50"
                  >
                    <Icon className="size-5 text-brand-400" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold text-white">{v.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">
                      {v.blurb}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Comparison ───────────────────────────────────────── */}
        <section className="border-t border-ink-800 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Modern software, legacy pricing
            </h2>
            <p className="mt-4 max-w-2xl text-ink-200">
              The market makes you choose: modern platforms that lock you into
              annual contracts north of $143/mo, or 25-year-old software that
              nickel-and-dimes you per add-on and per admin. Envolv is the
              modern product without the modern price.
            </p>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-ink-800">
              <table className="w-full min-w-[42rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-800 bg-ink-900/60">
                    <th scope="col" className="px-5 py-4 font-medium text-ink-400">
                      &nbsp;
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold text-teal-500">
                      Envolv
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium text-ink-200">
                      Modern platforms
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium text-ink-200">
                      Legacy à la carte
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.rows.map((row) => (
                    <tr key={row.label} className="border-b border-ink-800/70 last:border-0">
                      <th
                        scope="row"
                        className="px-5 py-4 font-medium text-ink-200"
                      >
                        {row.label}
                      </th>
                      <td
                        className={
                          row.envolvSoon ? 'px-5 py-4 text-ink-200' : 'px-5 py-4 text-white'
                        }
                      >
                        <span className="flex items-start gap-2">
                          {row.envolvSoon ? (
                            <CircleDashed
                              className="mt-0.5 size-4 shrink-0 text-ink-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-brand-400"
                              aria-hidden="true"
                            />
                          )}
                          <span>
                            {row.envolv}
                            {row.envolvSoon && <SoonBadge />}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-ink-400">
                        <span className="flex items-start gap-2">
                          <Minus
                            className="mt-0.5 size-4 shrink-0 text-ink-600"
                            aria-hidden="true"
                          />
                          {row.modern}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-ink-400">
                        <span className="flex items-start gap-2">
                          <X
                            className="mt-0.5 size-4 shrink-0 text-ink-600"
                            aria-hidden="true"
                          />
                          {row.legacy}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-ink-400">{COMPARISON.note}</p>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────── */}
        <section id="pricing" className="border-t border-ink-800 bg-ink-900/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Simple pricing, no surprises
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-200">
                Pick the tier that matches your volunteer count. Move up or down
                whenever it changes.
              </p>
            </div>
            <Pricing />
          </div>
        </section>

        {/* ── Demo request ─────────────────────────────────────── */}
        <section id="demo" className="border-t border-ink-800 py-24">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                See it with your own shifts
              </h2>
              <p className="mt-4 text-ink-200">
                Tell us how your program runs and we&apos;ll walk you through Envolv
                set up for it — not a canned tour. Twenty minutes, no slide deck.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-ink-200">
                {[
                  'A live walkthrough of admin + volunteer app',
                  'Envolv set up with your roles and shifts',
                  'A straight answer on whether we fit',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-brand-400"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-ink-400">
                In a hurry?{' '}
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-500 underline underline-offset-4 hover:text-teal-400"
                >
                  Poke around the live demo
                </a>{' '}
                — real software, fake volunteers.
              </p>
            </div>

            <div className="rounded-2xl border border-ink-800 bg-ink-900/60 p-7">
              <DemoForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-800 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Logo />
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} Envolv, LLC. All rights reserved.
          </p>
          <a
            href="mailto:hello@envolv.org"
            className="text-sm text-ink-400 transition-colors hover:text-white"
          >
            hello@envolv.org
          </a>
        </div>
      </footer>
    </>
  )
}
