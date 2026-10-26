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

The form sends via Resend to everyone in `DEMO_NOTIFY_EMAILS` and does nothing else.
Persistence is roadmap **B3**. Until B3 lands, **a failed Resend send loses the lead**
— which is exactly why `lib/email.ts` reports failures instead of swallowing them, and
why the form shows the visitor a fallback address rather than a fake success message.

## 2026-07-12 — Named competitor comparison

The comparison table cites the incumbent's *published* rate card and labels the column
"Legacy incumbents" rather than naming a company in a headline claim. Volgistics is
named only in the demo form's placeholder text ("Spreadsheets, Volgistics, a group text
thread…"), which is descriptive rather than comparative. Keep it that way — factual,
sourced comparisons are defensible; unsourced superlatives are not.

## 2026-10-26 — Unbuilt features are labeled "Soon", not hidden and not implied

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
