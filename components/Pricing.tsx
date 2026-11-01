'use client'

import { useState } from 'react'
import { Archive, Check, LifeBuoy, TrendingUp, UserCheck, UserPlus, UsersRound } from 'lucide-react'
import {
  BANDS,
  ENTERPRISE,
  FREE_TIER,
  PAID_FEATURES,
  PLAN_RULES,
  TRIAL,
  activeLabel,
  adminsLabel,
  bandRange,
  usd,
  type Lang,
} from '@/lib/content'
import { COPY } from '@/lib/copy'
import { cn } from '@/lib/utils'

const METER_ICONS = { UserCheck, UserPlus, Archive, TrendingUp }

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400'

const outlineButton = cn(
  'shrink-0 rounded-lg border border-ink-600 px-4 py-2.5 text-center text-sm font-semibold text-heading transition-colors hover:border-teal-500 hover:text-teal-400',
  focusRing,
)

/**
 * One plan, priced in bands by active volunteers (2026-10-31). A band
 * selector (native radio buttons — arrow keys move between bands) drives one
 * price card; Enterprise and Free sit underneath as strips. Every number comes
 * from lib/content.ts.
 */
export default function Pricing({ lang }: { lang: Lang }) {
  const [annual, setAnnual] = useState(false)
  const [selected, setSelected] = useState(0)
  const t = COPY[lang].pricing
  const band = BANDS[selected]
  const price = annual ? band.annualMonthly : band.monthly

  return (
    <div>
      {/* Monthly / annual */}
      <div className="mb-8 flex items-center justify-center gap-4">
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
            focusRing,
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
          <span className="rounded-full bg-accent-500/15 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-accent-500">
            {t.save}
          </span>
        </span>
      </div>

      {/* Band selector */}
      <fieldset className="mx-auto max-w-3xl">
        <legend className="mb-3 w-full text-center text-sm font-medium text-ink-200">{t.bandLegend}</legend>
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-ink-700 bg-ink-900/60 p-1.5 sm:grid-cols-4">
          {BANDS.map((b, i) => {
            const checked = i === selected
            return (
              <label
                key={b.name}
                className={cn(
                  'relative flex cursor-pointer flex-col items-center rounded-xl px-3 py-2.5 text-center transition-colors',
                  'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-400',
                  checked
                    ? 'bg-brand-600 text-on-brand shadow-sm'
                    : 'text-ink-200 hover:bg-ink-800 hover:text-heading',
                )}
              >
                <input
                  type="radio"
                  name="band"
                  value={b.name}
                  checked={checked}
                  onChange={() => setSelected(i)}
                  className="sr-only"
                />
                <span className="text-sm font-semibold tabular-nums">{bandRange(b, lang)}</span>
                <span className={cn('text-xs', checked ? 'text-on-brand' : 'text-ink-400')}>{b.name}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* The chosen band */}
      <div className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-brand-500/60 bg-ink-900 shadow-[0_0_0_1px_rgba(1,136,122,0.15),0_20px_50px_-24px_rgba(1,136,122,0.45)] lg:grid lg:grid-cols-[5fr_6fr]">
        <div className="p-7 sm:p-9">
          <p className="text-sm font-semibold tracking-wide text-teal-500 uppercase">{band.name}</p>
          <p className="mt-1 text-ink-200">
            {bandRange(band, lang)} {t.activeVolunteers}
          </p>

          <div aria-live="polite" aria-atomic="true">
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-heading tabular-nums">{usd(price)}</span>
              <span className="text-sm text-ink-400">{t.perMonth}</span>
            </p>
            <p className="mt-1 text-xs text-ink-400">
              {annual ? t.billedAnnually(usd(band.annualMonthly * 12)) : t.billedMonthly}
            </p>
          </div>

          <p className="mt-5 text-sm font-medium text-heading">{PLAN_RULES.short[lang]}</p>

          <ul className="mt-5 space-y-2.5 border-t border-ink-700 pt-5 text-sm text-ink-200">
            <li className="flex gap-2.5">
              <UsersRound className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
              {adminsLabel('unlimited', lang)}
            </li>
            <li className="flex gap-2.5">
              <LifeBuoy className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
              {band.support[lang]}
            </li>
          </ul>

          <a
            href="#demo"
            className={cn(
              'mt-7 block rounded-lg bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-on-brand transition-colors hover:bg-brand-500',
              focusRing,
            )}
          >
            {t.requestTrial}
          </a>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">{TRIAL.text[lang]}</p>
        </div>

        <div className="border-t border-ink-700 bg-ink-950/40 p-7 sm:p-9 lg:border-t-0 lg:border-l">
          <h3 className="text-sm font-semibold text-heading">{t.included}</h3>
          <ul className="mt-5 grid gap-3.5 text-sm text-ink-200 sm:grid-cols-2 lg:grid-cols-1">
            {PAID_FEATURES.map((f) => (
              <li key={f.en} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span>{f[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The meter, in plain words */}
      <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-ink-700 bg-ink-900/50 p-7 sm:p-8">
        <h3 className="font-semibold text-heading">{t.meterTitle}</h3>
        <dl className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLAN_RULES.points.map((p) => {
            const Icon = METER_ICONS[p.icon]
            return (
              <div key={p.title.en}>
                <dt className="flex items-center gap-2 text-sm font-semibold text-heading">
                  <Icon className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
                  {p.title[lang]}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-400">{p.body[lang]}</dd>
              </div>
            )
          })}
        </dl>
        <p className="mt-6 border-t border-ink-700 pt-5 text-xs leading-relaxed text-ink-400">
          {PLAN_RULES.bandChanges[lang]}
        </p>
      </div>

      {/* Enterprise — above the top wall */}
      <div className="mx-auto mt-6 flex max-w-5xl flex-col items-start justify-between gap-4 rounded-2xl border border-ink-700 bg-ink-900/50 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-heading">
            {ENTERPRISE.name} — {t.from(ENTERPRISE.floor)}
            <span className="block font-normal text-ink-200 sm:ml-3 sm:inline">{t.over(ENTERPRISE.over)}</span>
          </p>
          <p className="mt-1 text-sm text-ink-400">
            {ENTERPRISE.tagline[lang]} {ENTERPRISE.summary[lang]}
          </p>
        </div>
        <a href="#demo" className={outlineButton}>
          {t.letsTalk}
        </a>
      </div>

      {/* Free — for small programs, and where an unconverted trial lands */}
      <div className="mx-auto mt-4 flex max-w-5xl flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-ink-600 bg-ink-900/30 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-heading">
            {FREE_TIER.name} — {t.free}
            <span className="block font-normal text-ink-200 sm:ml-3 sm:inline">
              {activeLabel(FREE_TIER.limit, lang)} · {adminsLabel(FREE_TIER.admins, lang)}
            </span>
          </p>
          <p className="mt-1 text-sm text-ink-400">{FREE_TIER.blurb[lang]}</p>
        </div>
        <a href="#demo" className={outlineButton}>
          {t.requestFree}
        </a>
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-400">
        {PLAN_RULES.finePrint[lang]}
      </p>
    </div>
  )
}
