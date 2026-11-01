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

*Superseded and extended 2026-10-31 — see "Named competitors only in dated, sourced
comparisons" below.*

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

*The shipped-only rule stands. The ladder's meter ("everyone on file"), the 12-month
archive, the per-tier admin seats and the cumulative tier cards were replaced
2026-10-31 — see "One plan, priced by active volunteers" below.*

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

## 2026-10-31 — One plan, priced by active volunteers

All three co-founders approved an action plan (Claude Doc "Envolv Plan Review and
Action Plan"; summary in ACTION-PLAN-BRIEF). On this site:

- **Meter = active volunteers**: anyone with a completed shift, clock-in or logged
  hour in the past 12 months. Applicants, inactive volunteers and archived records
  are never billed, on any plan. Archive is free and never expires. Replaces the
  2026-10-30 "everyone on file" rule and the 12-month archive.
- **One plan, priced in bands** — same prices and edges as 10-30: Free ≤25 (1 admin)
  / Starter $29 ≤100 / Growth $59 101–250 / Professional $89 251–500 / Premier $129
  501–750 / Enterprise from $199 above 750; annual $24/$49/$74/$107. **Unlimited
  admins on every paid band**, every shipped feature in every paid band, and the
  white-glove import in every paid band (no longer Premier-only — which settles the
  open question in the 10-30 entry). Support is the only thing that changes with
  size. Grace: warning at 90%, 10% over for 60 days; annual plans true up at renewal.
- **The pricing UI is one band selector** (native radio buttons, so arrow keys work)
  driving one price card, with the meter explained right under it, and Enterprise
  and Free as strips. The tier cards, `seatsLabel`, per-tier seats and the "Most
  popular" badge are gone — with no paying customers yet, "most popular" was a claim
  nobody could back.
- **30-day trial of any paid band, no card, ends in Free.** Free is pitched as "free
  for small programs", not as a match for POINT's or Golden's unlimited free plans.
  The brief gives Free "help center" support; there is no help center, so Free shows
  no support line until one exists.
- **Clinics first.** Free and charitable clinics lead the hero and have their own
  section; the other verticals follow as "also built for". The clinic section claims
  only what the app does today (checked against medvolunteer 2026-10-31): credential
  records with expiry reminders and an expiry report, role-restricted shifts,
  onboarding stages, Spanish. Role-mix shifts, student rotations, hours-verification
  letters and kiosk check-in are not built and are not mentioned.
- **Taken off the site** because they aren't shipped or aren't settled: "Logo
  branding" (branding is a roadmap item), Enterprise's "custom integrations" and
  "security review & DPA" (no integrations exist; the DPA awaits the attorney, F15),
  the nonprofit blurb's "template" (industry templates are F3), and the clinic
  blurb's "already running live at a free clinic" (Yakima goes live 2026-11-16;
  restore it with `HERO_BADGE` on 2026-11-23).
- **Not built in the app yet**: the active-volunteer count and band billing (F1/F2,
  Dec 2026) and volunteer archiving (F17, to be re-specified as indefinite). The
  site states the billing policy; the product has to catch up before Stripe charges
  anyone. Pricing is frozen until 15 customers pay list price.

## 2026-10-31 — Named competitors only in dated, sourced comparisons

Supersedes and extends 2026-07-12. Named competitors now appear **only** in dated,
sourced comparisons: the three dedicated comparison pages (`/compare/…`, in both
languages, content in `lib/compare.ts`) and the home page's comparison table, which
carries the same date, footnotes and source links. Never in the hero, headlines,
feature copy or metadata of any other page, and no unsourced superlatives anywhere.
(The demo form's "Spreadsheets, Volgistics, a group text thread…" placeholder stays:
it describes what a visitor might use, it doesn't compare.)

Every comparison must be **factual** (each figure traces to a URL in `SOURCES`),
**dated** (`AS_OF`, shown on the page), and must **say plainly where the competitor
wins** — Volgistics is cheaper on sticker; Civic Champs includes kiosk check-in and
is cheaper at 1,000 actives; POINT, Golden and Timecounts have free plans. Get
Connected and Better Impact are quote-only, so their page compares approach,
transparency and features, never a guessed price. The migration offer (free
white-glove import + first month free for organizations leaving Volgistics or Get
Connected) appears on the comparison pages and the home comparison section.

The table replaced the old "Modern platforms / Legacy à la carte" columns and the
"25-year-old software that nickel-and-dimes you" line, which were unsourced. When a
competitor's prices change: update `PRICE_POINTS`, re-read every sentence in
`lib/compare.ts` that quotes a number, and bump `AS_OF`.

Sources checked 2026-10-31: civicchamps.com/pricing and /techsoup; FitGap's Civic
Champs page (returned HTTP 410 to a plain `curl` that day but loaded in a browser
fetch — re-check it); Volgistics' price list (effective 2020-07-15) and support page;
Corum Group on Better Impact / The Brydon Group; Better Impact's "better-together"
and features pages; galaxydigital.com; POINT, Golden and Timecounts pricing pages.

## 2026-10-31 — Privacy policy: archive retention and no patient data (attorney to review)

`lib/privacy.ts` (both languages) now matches the new archive policy: records an
organization archives are kept free until it deletes them, and an organization's data
is deleted from live systems 90 days after its account closes, after a notice
explaining how to export it. It also adds the customer commitment not to enter
information about patients or the care they receive. **The attorney should review
these edits** together with the data-boundary wording (brief §4, including the
"no business associate agreements" line, which is deliberately not on the site yet).
Subscription Agreement v1.1 still states a 30-day export window, deletion within 60
days, and the 12-month archive; it needs the same change, or the two documents
disagree.
