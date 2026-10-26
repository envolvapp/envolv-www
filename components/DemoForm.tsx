'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { requestDemo } from '@/app/actions'
import type { DemoRequestState } from '@/lib/types'
import { VERTICALS } from '@/lib/content'

const initialState: DemoRequestState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Request a demo'}
    </button>
  )
}

const inputClass =
  'w-full rounded-lg border border-ink-600 bg-ink-950/60 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-400 focus:border-teal-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-teal-500'

const labelClass = 'mb-1.5 block text-sm font-medium text-ink-200'

export default function DemoForm() {
  const [state, formAction] = useFormState(requestDemo, initialState)

  if (state.status === 'ok') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-500/40 bg-brand-500/5 p-10 text-center">
        <CheckCircle2 className="size-8 text-brand-400" aria-hidden="true" />
        <p className="text-lg font-semibold text-white">Request received</p>
        <p className="max-w-sm text-sm text-ink-200">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Honeypot — hidden from humans, irresistible to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Jane Rivera"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="jane@shelter.org"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="org">
          Organization
        </label>
        <input
          id="org"
          name="org"
          required
          autoComplete="organization"
          className={inputClass}
          placeholder="Riverbend Animal Rescue"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="vertical">
            What kind of organization?
          </label>
          <select id="vertical" name="vertical" className={inputClass} defaultValue="">
            <option value="">Select one…</option>
            {VERTICALS.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name}
              </option>
            ))}
            <option value="Other">Something else</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="size">
            How many volunteers?
          </label>
          <select id="size" name="size" className={inputClass} defaultValue="">
            <option value="">Select one…</option>
            {/* Bands match the plan walls (Free 25 / Starter 100 / Growth 250 /
                Professional 1,000), so a lead maps straight to a tier. Values
                carry no commas because they're Notion select options. */}
            <option value="Under 25">Under 25</option>
            <option value="25–100">25–100</option>
            <option value="100–250">100–250</option>
            <option value="250–1000">250–1,000</option>
            <option value="1000+">1,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="notes">
          What are you using today? <span className="text-ink-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className={inputClass}
          placeholder="Spreadsheets, Volgistics, a group text thread…"
        />
      </div>

      {state.status === 'error' && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{state.message}</span>
        </p>
      )}

      <SubmitButton />

      <p className="text-center text-xs text-ink-400">
        We&apos;ll only use this to set up your demo. No list, no drip campaign.
      </p>
    </form>
  )
}
