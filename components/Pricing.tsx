'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import {
  ENTERPRISE,
  FREE_TIER,
  PLAN_RULES,
  TIERS,
  seatsLabel,
  volunteersLabel,
  type Lang,
} from '@/lib/content'
import { COPY } from '@/lib/copy'
import { cn } from '@/lib/utils'

const outlineButton =
  'shrink-0 rounded-lg border border-ink-600 px-4 py-2.5 text-center text-sm font-semibold text-heading transition-colors hover:border-teal-500 hover:text-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400'

export default function Pricing({ lang }: { lang: Lang }) {
  const [annual, setAnnual] = useState(false)
  const t = COPY[lang].pricing

  return (
    <div>
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className={cn('text-sm transition-colors', annual ? 'text-ink-400' : 'text-ink-100')}>
          {t.monthly}
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label={t.toggleLabel}
          onClick={() => setAnnual((v) => !v)}
          className={cn(
            'relative h-7 w-13 shrink-0 rounded-full border transition-colors',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400',
            annual ? 'border-brand-500 bg-brand-600' : 'border-ink-600 bg-ink-800',
          )}
        >
          <span
            className={cn(
              'absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all',
              annual ? 'left-[1.6rem]' : 'left-[0.15rem]',
            )}
          />
        </button>

        <span className={cn('text-sm transition-colors', annual ? 'text-ink-100' : 'text-ink-400')}>
          {t.annually}{' '}
          <span className="rounded-full bg-accent-500/15 px-2 py-0.5 text-xs font-medium text-accent-500">
            {t.save}
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
                {t.mostPopular}
              </span>
            )}

            <h3 className="text-lg font-semibold text-heading">{tier.name}</h3>
            <p className="mt-1 text-sm text-ink-400">{tier.tagline[lang]}</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-heading tabular-nums">
                ${annual ? tier.annualMonthly : tier.monthly}
              </span>
              <span className="text-sm text-ink-400">{t.perMonth}</span>
            </div>
            <p className="mt-1 h-5 text-xs text-ink-400">
              {annual ? t.billedAnnually : t.billedMonthly}
            </p>

            <div className="mt-6 space-y-1 border-t border-ink-700 pt-5 text-sm text-ink-200">
              <p className="font-medium text-heading">{volunteersLabel(tier.limit, lang)}</p>
              <p>{seatsLabel(tier.seats, lang)}</p>
            </div>

            {tier.includes && (
              <p className="mt-5 text-xs font-semibold tracking-wide text-ink-400 uppercase">
                {tier.includes[lang]}
              </p>
            )}
            <ul className={cn('flex-1 space-y-3 text-sm text-ink-200', tier.includes ? 'mt-3' : 'mt-5')}>
              {tier.features.map((f) => (
                <li key={f.en} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                  <span>{f[lang]}</span>
                </li>
              ))}
            </ul>

            <a
              href="#demo"
              className={cn(
                'mt-7 rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400',
                tier.featured
                  ? 'bg-brand-600 text-on-brand hover:bg-brand-500'
                  : 'border border-ink-600 text-heading hover:border-teal-500 hover:text-teal-400',
              )}
            >
              {COPY[lang].requestDemo}
            </a>
          </div>
        ))}
      </div>

      {/* Enterprise — above the top wall, priced per program */}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink-700 bg-ink-900/50 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-heading">
            {ENTERPRISE.name} — {t.custom}, {t.from(ENTERPRISE.floor)}
            <span className="ml-3 font-normal text-ink-200">{t.over(ENTERPRISE.over)}</span>
          </p>
          <p className="mt-1 text-sm text-ink-400">
            {ENTERPRISE.tagline[lang]} {ENTERPRISE.summary[lang]}
          </p>
        </div>
        <a href="#demo" className={outlineButton}>
          {t.letsTalk}
        </a>
      </div>

      {/* Free plan — the on-ramp, rendered as a strip rather than a card */}
      <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-ink-600 bg-ink-900/30 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-heading">
            {FREE_TIER.name} — {t.free}
            <span className="ml-3 font-normal text-ink-200">
              {volunteersLabel(FREE_TIER.limit, lang)} · {seatsLabel(FREE_TIER.seats, lang)}
            </span>
          </p>
          <p className="mt-1 text-sm text-ink-400">{FREE_TIER.blurb[lang]}</p>
        </div>
        <a href="#demo" className={outlineButton}>
          {t.requestFree}
        </a>
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-400">
        {PLAN_RULES.includes[lang]} {PLAN_RULES.counting[lang]}
      </p>
    </div>
  )
}
