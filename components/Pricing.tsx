'use client'

import { useState } from 'react'
import { Check, CircleDashed } from 'lucide-react'
import { FREE_TIER, TIERS } from '@/lib/content'
import { cn } from '@/lib/utils'
import SoonBadge from '@/components/SoonBadge'

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <div>
      <div className="mb-10 flex items-center justify-center gap-4">
        <span
          className={cn(
            'text-sm transition-colors',
            annual ? 'text-ink-400' : 'text-ink-100',
          )}
        >
          Monthly
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Bill annually and save about 17 percent"
          onClick={() => setAnnual((v) => !v)}
          className={cn(
            'relative h-7 w-13 shrink-0 rounded-full border transition-colors',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400',
            annual ? 'border-brand-500 bg-brand-600' : 'border-ink-600 bg-ink-800',
          )}
        >
          <span
            className={cn(
              'absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition-all',
              annual ? 'left-[1.6rem]' : 'left-[0.15rem]',
            )}
          />
        </button>

        <span
          className={cn(
            'text-sm transition-colors',
            annual ? 'text-ink-100' : 'text-ink-400',
          )}
        >
          Annually{' '}
          <span className="rounded-full bg-accent-500/15 px-2 py-0.5 text-xs font-medium text-accent-500">
            save ~17%
          </span>
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              'flex flex-col rounded-2xl border p-7',
              tier.featured
                ? 'border-brand-500/70 bg-ink-900 shadow-[0_0_0_1px_rgba(1,136,122,0.2),0_20px_50px_-20px_rgba(1,136,122,0.45)]'
                : 'border-ink-700 bg-ink-900/50',
            )}
          >
            {tier.featured && (
              <span className="mb-3 w-fit rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-accent-500 uppercase">
                Most popular
              </span>
            )}

            <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
            <p className="mt-1 text-sm text-ink-400">{tier.tagline}</p>

            {tier.custom ? (
              <>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-white">
                    Custom
                  </span>
                </div>
                <p className="mt-1 h-5 text-xs text-ink-400">
                  {tier.customNote ?? 'priced for your program'}
                </p>
              </>
            ) : (
              <>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-white tabular-nums">
                    ${annual ? tier.annualMonthly : tier.monthly}
                  </span>
                  <span className="text-sm text-ink-400">/month</span>
                </div>
                <p className="mt-1 h-5 text-xs text-ink-400">
                  {annual ? 'billed annually' : 'billed monthly'}
                </p>
              </>
            )}

            <div className="mt-6 space-y-1 border-t border-ink-700 pt-5 text-sm text-ink-200">
              <p className="font-medium text-white">{tier.volunteers}</p>
              <p>{tier.seats}</p>
            </div>

            <ul className="mt-5 flex-1 space-y-3 text-sm text-ink-200">
              {tier.features.map((f) =>
                typeof f === 'string' ? (
                  <li key={f} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-brand-400"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ) : (
                  <li key={f.text} className="flex gap-2.5 text-ink-400">
                    <CircleDashed
                      className="mt-0.5 size-4 shrink-0 text-ink-600"
                      aria-hidden="true"
                    />
                    <span>
                      {f.text}
                      <SoonBadge />
                    </span>
                  </li>
                ),
              )}
            </ul>

            <a
              href="#demo"
              className={cn(
                'mt-7 rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400',
                tier.featured
                  ? 'bg-brand-600 text-white hover:bg-brand-500'
                  : 'border border-ink-600 text-white hover:border-teal-500 hover:text-teal-400',
              )}
            >
              {tier.custom ? "Let's talk" : 'Request a demo'}
            </a>
          </div>
        ))}
      </div>

      {/* Free plan — the on-ramp, rendered as a strip rather than a fifth card */}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-ink-600 bg-ink-900/30 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-white">
            {FREE_TIER.name} — $0/month
            <span className="ml-3 font-normal text-ink-200">
              {FREE_TIER.volunteers} · {FREE_TIER.seats}
            </span>
          </p>
          <p className="mt-1 text-sm text-ink-400">{FREE_TIER.blurb}</p>
        </div>
        <a
          href="#demo"
          className="shrink-0 rounded-lg border border-ink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-teal-500 hover:text-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        >
          Request a free account
        </a>
      </div>

      <p className="mt-8 text-center text-sm text-ink-400">
        Every plan includes the volunteer mobile app, the self-service portal, and
        bilingual EN/ES. No setup fees, no contracts. Limits count active
        volunteers — archived profiles are always free.
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-ink-400">
        Items marked
        <SoonBadge className="mr-1.5 ml-1.5" />
        are on our roadmap and not live yet. Ask on your demo and we&apos;ll tell
        you exactly where each one stands.
      </p>
    </div>
  )
}
