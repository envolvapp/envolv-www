# Decisions

## 2026-07-12 — Separate repo, not a `/marketing` app in `volunteerhub`

ROADMAP B1 left this open ("separate repo `envolv-www` or `/marketing` app in the
volunteerhub repo — decide and document"). **Decided: separate repo.** (Sean, 2026-07-12.)

Why:

- **The marketing site must ship before the product it markets.** `volunteerhub` has
  not been assessed yet (roadmap C1) and is about to be renamed (C2). Coupling the
  landing page to a repo that is mid-rename, mid-assessment, and pre-Phase-1 means the
  site can't deploy until that settles. It can deploy today from here.
- **Different deploy cadence, different blast radius.** A copy tweak should not
  rebuild the SaaS app, and a broken product build should not take the marketing site
  down. Separate repos = separate Vercel projects = separate failure domains.
- **DNS is simpler.** B2 points envolv.app at a Vercel project. A standalone project
  makes that a one-step change with nothing else attached to it.

Cost of this choice: design tokens and any shared UI will duplicate between this repo
and the eventual product. That is an acceptable trade for a one-page site — revisit
only if the marketing surface grows into many pages that must match the product's
design system exactly.

## 2026-07-12 — Demo requests are emailed, not stored (yet)

*Superseded 2026-10-26 — see "Leads also go to Notion" below.* The form sent via
Resend to everyone in `DEMO_NOTIFY_EMAILS` and did nothing else, so a failed send
lost the lead — which is why `lib/email.ts` reports failures instead of swallowing
them, and why the form shows the visitor a fallback address rather than a fake success.

## 2026-07-12 — Named competitor comparison

The comparison table cites the incumbent's *published* rate card and labels the column
"Legacy incumbents" rather than naming a company in a headline claim. Volgistics is
named only in the demo form's placeholder text ("Spreadsheets, Volgistics, a group text
thread…"), which is descriptive rather than comparative. Keep it that way — factual,
sourced comparisons are defensible; unsourced superlatives are not.

## 2026-10-26 — Unbuilt features are labeled "Soon", not hidden and not implied

*Superseded 2026-10-30 — see "Pricing cards list only what ships" below.*

An audit against the medvolunteer app found the pricing cards selling things the
product doesn't do: SMS, push, industry templates, kiosk mode, the API, roles,
brand colors, white-label, multi-org, SSO, a background-check provider integration,
and live chat (ROADMAP Workstream F, none built yet). Those stay on the cards —
they're the plan, and the tier structure depends on them — but each now carries a
"Soon" badge and a dashed icon instead of a checkmark, and a line under the pricing
grid says so plainly.

Why not just drop them: the tiers would read as near-identical and the ladder would
stop making sense. Why not leave them: a nonprofit that buys Growth for SMS and finds
there is no SMS has been misled, and the Subscription Agreement is a contract. Rule
of thumb used for the split: software that doesn't exist yet is "Soon"; things the
team delivers by hand (support, onboarding calls, data migration, a CSM) are not.

Related copy fixes the same day: "Start free" → "Request a free account" (there is no
self-serve signup until F1/F2), and no more "waitlists", "e-signatures", or "push
reminders" in feature copy.

## 2026-10-26 — Leads also go to Notion (roadmap B3)

Every demo request now also becomes a row in the **Website Leads** Notion database
(Envolv workspace → Marketing and Sales Hub), alongside the email. Considered: a
Supabase table, a Resend audience, Notion. **Chose Notion** because it's where the
founders already work — a lead lands in a table they can sort, assign and mark
"Contacted" without anyone building an admin screen. A Supabase table would need
that screen; a Resend audience is a mailing list, not a pipeline.

The two records are independent: email first (so the row can record whether the
alert went out), then Notion. The visitor gets an error only if both fail. Same
contract as `lib/email.ts` — `lib/leads.ts` returns failures, never throws, never
swallows. Revisit when the product has its own CRM-ish surface or lead volume makes
Notion's API limits (~3 requests/second) matter; neither is close.

## 2026-10-26 — Logo: Sean's wordmark with the Embrace ring

Sean supplied the final brand as three PNGs (ring icon, lockup with "Get involved.",
2,000px wordmark). They're kept in `brand-src/`; the site uses SVGs traced from them
(potrace), so the logo stays sharp at any size and weighs a few KB. The text "Envolv"
placeholder in the header and footer is gone. The share image uses the light lockup
on white with the tagline "Get involved." and the free-tier line from `content.ts`.

## 2026-10-29 — Live demo: no login, optional email, shared sandbox

"See it live" used to drop visitors on the old MedVolunteer login screen. Now `/demo`
sends them into the real app with no login (Sean, 2026-10-29). Choices:

- **Optional email, not a gate.** A required email gets more leads but fewer people
  actually try the product. The email box is there; the buttons work without it.
- **One shared sandbox, reset nightly** rather than a private copy per visitor —
  per-visitor sandboxes would mean provisioning data on every click. Visitors may see
  each other's edits during the day; nothing they do sends email or reaches a real
  person, uploads are off, and the database resets at 08:00 UTC.
- **A fictional clinic** ("City Free Clinic"), because the app's roles, onboarding and
  training are clinic-shaped today. When the multi-industry platform exists, the demo
  should follow it.
- **Still private** until Sean decides to open it: the demo app stays behind Vercel
  Authentication for now, so this page only fully works for the Vercel team.

## 2026-10-30 — envolv.org is the marketing site; envolv.app is the product

First all-hands. The web structure is: **envolv.org** = this marketing site,
**envolv.org/demo** = the public demo, **envolv.app** = the Envolv product — a company
dashboard/hub with each client (Yakima, Cornell, the next ones) beneath it. `SITE_URL`,
canonical URLs, the sitemap and share metadata now point at envolv.org. B2's DNS step
flips accordingly: envolv.org (+ www) → this Vercel project.

## 2026-10-30 — Pricing cards list only what ships

The all-hands asked for every "Soon" feature to come off the pricing tiers. They're
gone — not badged, gone — and so is the `soon()` helper and the `SoonBadge`
component. This reverses the 2026-10-26 call above: the team would rather the cards
look thinner than read as a roadmap. Rule now: a feature appears on the site the day
it ships, in the tier it belongs to. Hand-delivered services (support, onboarding
calls, data migration, a CSM) count as shipped.

Same meeting, new ladder: Free ≤25 / Starter $29 ≤100 / Growth $59 ≤250 /
Professional $89 ≤500 / **Premier $129 ≤750** (new) / Enterprise from $199 above 750.
Limits now count **everyone on file, applicants included**; archived profiles are
free for up to a year, then deleted after 30 days' notice and an export. The cards
are cumulative ("Everything in Growth, plus"), Enterprise moved to a strip under the
four cards like Free, and the comparison table's 1,000-volunteer row became a
500-volunteer row (the new Professional wall). Premier's one extra line — help
importing existing records — is a hand-delivered service; confirm the team wants to
promise it at that tier.

## 2026-10-30 — Spanish version and light/dark mode

- **Spanish at `/es`**, same pages, same components, a `lang` prop. Two route groups
  with their own root layouts rather than a middleware rewrite: the HTML stays fully
  static and `<html lang>` is right without reading headers. No auto-redirect by
  browser language (search engines would only ever see one version); a visible
  English/Español switch and `hreflang` alternates instead. Plan names (Starter,
  Growth…) stay English in both, to match invoices and contracts.
- **Light/dark follows the visitor's system setting.** The site was dark-only. Rather
  than sprinkle `dark:` classes through every component, `globals.css` re-points the
  existing color tokens inside `@media (prefers-color-scheme: light)`; every text stop
  was checked for WCAG AA on both light surfaces. Two semantic tokens replace
  `text-white`: `text-heading` (flips) and `text-on-brand` (stays white on emerald).
