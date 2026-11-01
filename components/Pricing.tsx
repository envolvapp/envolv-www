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
 * price card. Free leads the selector ("Up to 25 · Free") so small programs
 * find it at once, but the selector opens on Starter, where clinics land
 * (Sean, 2026-10-31). Enterprise sits underneath as a strip. Every number
 * comes from lib/content.ts.
 */
export default function Pricing({ lang }: { lang: Lang }) {
  const [annual, setAnnual] = useState(false)
  // Option 0 is Free; options 1… are BANDS[0…]. Opens on Starter.
  const [selected, setSelected] = useState(1)
  const t = COPY[lang].pricing
  const isFree = selected === 0
  const band = isFree ? null : BANDS[selected - 1]
  const price = band ? (annual ? band.annualMonthly : band.monthly) : 0

  // In the selector the ranges don't overlap: Free is up to 25, so Starter
  // reads 26–100 there (its card still says "Up to 100" — a small program
  // can pick Starter for unlimited admins).
  const options = [
    { name: FREE_TIER.name, range: bandRange({ min: 1, max: FREE_TIER.limit }, lang) },
    ...BANDS.map((b, i) => ({
      name: b.name,
      range: i === 0 ? bandRange({ min: FREE_TIER.limit + 1, max: b.max }, lang) : bandRange(b, lang),
    })),
  ]

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
      <fieldset className="mx-auto max-w-4xl">
        <legend className="mb-3 w-full text-center text-sm font-medium text-ink-200">{t.bandLegend}</legend>
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-ink-700 bg-ink-900/60 p-1.5 sm:grid-cols-5">
          {options.map((o, i) => {
            const checked = i === selected
            return (
              <label
                key={o.name}
                className={cn(
                  'relative flex cursor-pointer flex-col items-center rounded-xl px-3 py-2.5 text-center transition-colors',
                  'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-400',
                  // Free gets its own row on phones (2×2 below it), one column from sm up.
                  i === 0 && 'col-span-2 sm:col-span-1',
                  checked
                    ? 'bg-brand-600 text-on-brand shadow-sm'
                    : 'text-ink-200 hover:bg-ink-800 hover:text-heading',
                )}
              >
                <input
                  type="radio"
                  name="band"
                  value={o.name}
                  checked={checked}
                  onChange={() => setSelected(i)}
                  className="sr-only"
                />
                <span className="text-sm font-semibold tabular-nums">{o.range}</span>
                <span className={cn('text-xs', checked ? 'text-on-brand' : 'text-ink-400')}>{o.name}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* The chosen band */}
      <div className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-brand-500/60 bg-ink-900 shadow-[0_0_0_1px_rgba(1,136,122,0.15),0_20px_50px_-24px_rgba(1,136,122,0.45)] lg:grid lg:grid-cols-[5fr_6fr]">
        <div className="p-7 sm:p-9">
          <p className="text-sm font-semibold tracking-wide text-teal-500 uppercase">{options[selected].name}</p>
          <p className="mt-1 text-ink-200">
            {band ? bandRange(band, lang) : bandRange({ min: 1, max: FREE_TIER.limit }, lang)} {t.activeVolunteers}
          </p>

          <div aria-live="polite" aria-atomic="true">
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-heading tabular-nums">{usd(price)}</span>
              <span className="text-sm text-ink-400">{t.perMonth}</span>
            </p>
            <p className="mt-1 text-xs text-ink-400">
              {!band ? t.alwaysFree : annual ? t.billedAnnually(usd(band.annualMonthly * 12)) : t.billedMonthly}
            </p>
          </div>

          <p className="mt-5 text-sm font-medium text-heading">
            {band ? PLAN_RULES.short[lang] : FREE_TIER.short[lang]}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-ink-700 pt-5 text-sm text-ink-200">
            <li className="flex gap-2.5">
              <UsersRound className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
              {adminsLabel(band ? 'unlimited' : FREE_TIER.admins, lang)}
            </li>
            {band && (
              <li className="flex gap-2.5">
                <LifeBuoy className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                {band.support[lang]}
              </li>
            )}
          </ul>

          <a
            href="#demo"
            className={cn(
              'mt-7 block rounded-lg bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-on-brand transition-colors hover:bg-brand-500',
              focusRing,
            )}
          >
            {band ? t.requestTrial : t.requestFree}
          </a>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">
            {band ? TRIAL.text[lang] : FREE_TIER.upgrade[lang]}
          </p>
        </div>

        <div className="border-t border-ink-700 bg-ink-950/40 p-7 sm:p-9 lg:border-t-0 lg:border-l">
          <h3 className="text-sm font-semibold text-heading">{band ? t.included : t.includedFree}</h3>
          <ul className="mt-5 grid gap-3.5 text-sm text-ink-200 sm:grid-cols-2 lg:grid-cols-1">
            {(band ? PAID_FEATURES : FREE_TIER.includes).map((f) => (
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

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-400">
        {PLAN_RULES.finePrint[lang]}
      </p>
    </div>
  )
}
