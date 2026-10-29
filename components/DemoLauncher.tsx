'use client'

import { useState } from 'react'
import { ArrowRight, LayoutDashboard, Smartphone } from 'lucide-react'
import { recordDemoVisit } from '@/app/demo/actions'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'w-full rounded-lg border border-ink-600 bg-ink-950/60 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-400 focus:border-teal-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-teal-500'

/**
 * Optional email + the two ways into the demo app. The volunteer app opens in
 * a phone-sized window on a desktop (it's built for phones); everything else
 * navigates normally.
 */
export default function DemoLauncher({ appUrl }: { appUrl: string }) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [opening, setOpening] = useState<'admin' | 'volunteer' | null>(null)

  async function open(view: 'admin' | 'volunteer') {
    setError(null)
    const address = email.trim()
    if (address && !EMAIL_RE.test(address)) {
      setError('That email doesn’t look right — fix it, or leave the box empty.')
      return
    }
    const url = `${appUrl}/api/demo/enter?as=${view}`
    const record = () =>
      address
        ? recordDemoVisit({ email: address, view, company_website: honeypot }).catch(() => {})
        : Promise.resolve()

    if (view === 'volunteer' && window.innerWidth >= 900) {
      // Open synchronously inside the click so pop-up blockers allow it; this
      // page stays open, so the email capture can finish in the background.
      const h = Math.min(860, window.screen.availHeight - 40)
      const left = Math.max(0, window.screenX + window.outerWidth - 444)
      const win = window.open(url, 'envolv-demo-volunteer', `popup=yes,width=420,height=${h},left=${left},top=40`)
      void record()
      if (!win) window.location.href = url
      return
    }

    setOpening(view)
    await record()
    window.location.href = url
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium text-ink-200">
          Your email <span className="text-ink-400">(optional)</span>
        </label>
        <input
          id="demo-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="jane@shelter.org"
        />
        <p className="mt-1.5 text-xs text-ink-400">
          Leave it and one of the founders will follow up once. No list, no drip campaign.
        </p>
        {/* Honeypot — hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
          <label htmlFor="demo-company-website">Company website</label>
          <input
            id="demo-company-website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => open('admin')}
          disabled={opening !== null}
          className="group flex flex-col items-start gap-2 rounded-xl border border-brand-500/50 bg-brand-500/10 p-5 text-left transition-colors hover:border-brand-400 hover:bg-brand-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 disabled:cursor-wait disabled:opacity-70"
        >
          <LayoutDashboard className="size-5 text-brand-400" aria-hidden="true" />
          <span className="font-semibold text-white">Coordinator dashboard</span>
          <span className="text-sm leading-relaxed text-ink-200">
            Volunteers, shifts, onboarding, hours, messages and reports.
          </span>
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400">
            {opening === 'admin' ? 'Opening…' : 'Open the dashboard'}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => open('volunteer')}
          disabled={opening !== null}
          className="group flex flex-col items-start gap-2 rounded-xl border border-ink-600 bg-ink-900/60 p-5 text-left transition-colors hover:border-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 disabled:cursor-wait disabled:opacity-70"
        >
          <Smartphone className="size-5 text-teal-400" aria-hidden="true" />
          <span className="font-semibold text-white">Volunteer app</span>
          <span className="text-sm leading-relaxed text-ink-200">
            What Elena, one of the clinic’s volunteers, sees on her phone.
          </span>
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400">
            {opening === 'volunteer' ? 'Opening…' : 'Open the volunteer app'}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  )
}
