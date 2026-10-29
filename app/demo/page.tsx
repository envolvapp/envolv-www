import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import QRCode from 'qrcode'
import { Check } from 'lucide-react'
import DemoLauncher from '@/components/DemoLauncher'
import { DEMO_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Try Envolv — live demo, no signup',
  description:
    'Click around a real Envolv account: the coordinator dashboard and the volunteer app, with a made-up clinic and sample data that resets every night.',
  alternates: { canonical: '/demo' },
}

const TRY_THIS = [
  'Approve last week’s volunteer hours in Reports',
  'Add a shift, then find it in the volunteer app',
  'Clock in as Elena from her Home screen',
  'Message every active volunteer at once',
  'Move an applicant through onboarding',
]

export default async function DemoPage() {
  const volunteerUrl = `${DEMO_URL}/api/demo/enter?as=volunteer`
  // Rendered at build time — a plain SVG, no client-side QR library.
  const qrSvg = await QRCode.toString(volunteerUrl, {
    type: 'svg',
    margin: 1,
    errorCorrectionLevel: 'M',
    color: { dark: '#0d1526', light: '#ffffff' },
  })

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      <header className="border-b border-ink-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            aria-label="Envolv home"
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
          >
            <Image src="/brand/envolv-logo-dark.svg" alt="Envolv" width={109} height={28} priority unoptimized />
          </Link>
          <Link href="/#demo" className="text-sm font-medium text-ink-200 hover:text-white">
            Prefer a guided tour?
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <section>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400">Live demo</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Try Envolv. No signup.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-200">
              Click around a real Envolv account for <strong className="text-white">City Free Clinic</strong> —
              a made-up clinic with made-up volunteers. Change anything you like: nothing you do emails a
              real person, and it all resets every night.
            </p>

            <div className="mt-10 rounded-2xl border border-ink-800 bg-ink-900/60 p-6 sm:p-7">
              <DemoLauncher appUrl={DEMO_URL} />
            </div>
          </section>

          <aside className="space-y-8">
            <div className="hidden rounded-2xl border border-ink-800 bg-ink-900/60 p-6 lg:block">
              <h2 className="font-semibold text-white">On your phone</h2>
              <p className="mt-1 text-sm text-ink-400">
                The volunteer app is built for phones. Scan to open it there.
              </p>
              <div
                className="mt-4 w-40 overflow-hidden rounded-lg"
                role="img"
                aria-label="QR code that opens the Envolv volunteer app demo"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            </div>

            <div>
              <h2 className="font-semibold text-white">Things to try</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-200">
                {TRY_THIS.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 hidden text-sm text-ink-400 lg:block">
                Keep the dashboard open and use <span className="text-ink-200">Open the volunteer app</span> in
                the green bar to see both sides at once.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
