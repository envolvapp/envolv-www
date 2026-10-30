# envolv-www

The envolv.org marketing site — English at `/`, Spanish at `/es`, light or dark to
match the visitor's system setting. One landing page + a live-demo page + demo-request capture.

This is **Workstream B** of the Envolv roadmap (`ROADMAP.md` in the `medvolunteer`
repo). It is deliberately a separate repo — see [DECISIONS.md](./DECISIONS.md).

## Commands

```bash
npm install
npm run dev     # http://localhost:3100
npm run build
npm run lint
```

Port **3100**, not Next's default 3000 — 3000 is taken by another project on Sean's
machine, and Next silently bumping itself to 3001 is a confusing way to find that out.
Vercel ignores the flag and assigns its own port, so this only affects local dev.

## Environment

Copy `.env.example` → `.env.local`. Set the same vars on the Vercel project.

| Var | Required | Purpose |
|-----|----------|---------|
| `RESEND_API_KEY` | yes | Sends the demo-request notification. Missing → the form returns a visible error rather than silently dropping the lead. |
| `RESEND_FROM_EMAIL` | yes | Must be on a Resend-**verified** domain. `envolv.org` was verified 2026-08-26, so use `noreply@envolv.org`. |
| `DEMO_NOTIFY_EMAILS` | yes | Comma-separated. Every demo request goes to all of them. Adding a founder = an env var edit, no code change. |
| `NOTION_TOKEN` | recommended | Secret of the "envolv-www leads" Notion integration. Saves each demo request as a row in **Website Leads**. Missing → leads are email-only. |
| `NOTION_LEADS_DATA_SOURCE_ID` | recommended | Data source id of the Website Leads database (`c38d2ca0-…`, see Vercel). |
| `RESEND_WEBHOOK_SECRET` | for support@ | Signing secret of the Resend webhook that calls `/api/inbound` (Resend → Webhooks → the `inbox.email.received` one, `whsec_…`). |
| `RESEND_INBOX_API_KEY` | for support@ | A **full-access** Resend key — reading a received message needs it. Separate from `RESEND_API_KEY`, which stays sending-only. |
| `SUPPORT_FORWARD_TO` | no | Comma-separated; who gets support@ mail. Defaults to `DEMO_NOTIFY_EMAILS`. |
| `NEXT_PUBLIC_DEMO_URL` | no | Base URL of the demo app that `/demo` sends visitors into. Defaults to `https://envolv-demo.vercel.app`. |

> ⚠️ `NEXT_PUBLIC_DEMO_URL` is the **only** `NEXT_PUBLIC_*` var here, and that is
> on purpose. In the `medvolunteer` repo, build-time inlining of `NEXT_PUBLIC_*`
> caused a production login outage — vars were saved to Vercel ~10h *after* the
> last build, so the deployed bundle never got them. Everything on this site that
> matters (Resend key, recipients) is read on the server at **request** time and
> never baked into the browser bundle. Keep it that way.
>
> That does **not** mean changes are instant: Vercel applies an env-var change
> only to deployments created *after* it. Change a var → **Redeploy** (Deployments
> → ⋯ → Redeploy), or the live site keeps the old value.
>
> This repo is **public** (`envolvapp/envolv-www`). Real addresses and keys live
> only in the Vercel project — never in `.env.example` or anywhere else here.

## Content

All copy that makes a **claim** — pricing, competitor figures, vertical list — lives
in `lib/content.ts`, not scattered through JSX. Every number there traces to a
founder doc in the medvolunteer repo root (`volunteer-saas-business-plan-v2.pdf`,
`industry-targeting-strategy.pdf`). Change the doc, change `content.ts`.

**Pricing cards list only what ships today** (2026-10-30 — this replaced the
"Soon" badges). A roadmap feature is not on the site at all until it's live in the
app; when it lands, add it to its tier in `content.ts`.

**Both languages live in the same file.** Every visible claim in `content.ts` is an
`{ en, es }` pair, and the interface copy (headings, buttons, form labels) is in
`lib/copy.ts`. Change a sentence in one language, change it in the other. Prices,
limits and seat counts are plain numbers, so they can't drift between languages.
The Spanish uses "tú", like the Envolv apps, and still needs a native speaker's read
(ROADMAP B6).

## Languages, routes and color scheme

- `app/(en)/` and `app/(es)/es/` are two route groups, each with its **own root
  layout**, so the static HTML ships with the right `<html lang>`. Both render the
  same `components/HomePage.tsx` / `components/DemoPage.tsx` with a `lang` prop.
  A new page = add it under both groups (and to `app/sitemap.ts`).
- `LangSwitch` (header + footer) links to the same page in the other language; every
  page carries `hreflang` alternates (`lib/metadata.ts`). There is no automatic
  redirect by browser language — that would hide one version from search engines.
- The demo form sends a hidden `lang` field, so error messages come back in the
  visitor's language and Spanish leads are tagged `[Spanish site]` in Notion.
- **Light/dark** follows `prefers-color-scheme`. `app/globals.css` re-points the same
  `ink-*`/`teal-*`/`accent-*` tokens for light mode, so components don't need `dark:`
  classes. Use `text-heading` for headings (flips) and `text-on-brand` on emerald
  buttons (always white) — never `text-white`. The logo swaps between
  `envolv-logo-light.svg` and `-dark.svg` (`components/Logo.tsx`). The audit behind the current list is in the
header comment of `content.ts`.

## Deploying

GitHub `envolvapp/envolv-www` → Vercel project `envolv-www` in team `envolvapp`;
every push to `main` deploys to production. The repo is public on purpose: the
Vercel team is on the Hobby plan, and Hobby can't deploy private repos owned by a
GitHub organization.

Root directory = repo root (unlike medvolunteer, which nests the app in `web/`).
Framework preset must read **Next.js** — medvolunteer's silently drifted to NestJS
and blocked every deploy for ~10 weeks. Check it if the project is ever recreated.

Committing from Sean's machine: write the message to `.claude/commit-msg.txt`, then
run `.claude/git-push.bat` (native Windows git; output in `.claude/git-out.log`).

DNS (envolv.org + www → this project) is roadmap item **B2** and needs Sean. envolv.app
is reserved for the product (the company hub, with each client beneath it).

## Contact address

**`support@envolv.org`** (`CONTACT_EMAIL` in `lib/content.ts`) is the one public address
(all-hands 2026-10-30). It's a **Resend inbox** — envolv.org's root MX already points at
Resend inbound, so no DNS change was needed. A routing agent on the inbox forwards each
new message to the three co-founders; answer from the inbox in the Resend dashboard
(sign in as emailseanmcneal) so the reply goes out as support@ and stays threaded.

**The relay** (`app/api/inbound/route.ts`): a Resend webhook (`inbox.email.received`)
calls `/api/inbound`; the route checks the signature, fetches the message body, and
emails a copy to the co-founders with **Reply-To = the original sender**, so hitting
Reply in Gmail answers the customer directly. Founders' own mail to support@ is never
relayed (no loops), and a retried webhook can't double-send (Idempotency-Key). To have
replies come *from* support@envolv.org instead of a personal Gmail, add it in Gmail →
Settings → Accounts → "Send mail as", SMTP `smtp.resend.com`, port 465, user `resend`,
password = a sending-only Resend key.

The webhook points at `https://envolv.org/api/inbound` and is **disabled until B2**:
envolv-www.vercel.app sits behind Vercel Authentication, which would 401 Resend.
After DNS: set the two env vars above, redeploy, enable the webhook in Resend, and
send a test to support@. Until then support@ mail waits in the Resend inbox.

Don't move envolv.org's mail to Namecheap forwarding: that replaces **all** its MX
records, including the `send` MX that `noreply@envolv.org` depends on. The old
`hello@envolv.app` forwarding still works; nothing on the site links to it any more.

## Where leads go

Every demo request is recorded twice, independently (`app/actions.ts`):

1. **Email** to everyone in `DEMO_NOTIFY_EMAILS` (`lib/email.ts`, via Resend).
2. **A row in Notion** — Envolv workspace → Marketing and Sales Hub → **Website Leads**
   (`lib/leads.ts`). Columns: Organization, Contact, Email, Industry, Volunteers,
   Using today, Source, Email alert sent, Received (automatic), plus Status and Owner
   for the founders to work the lead (New → Contacted → Demo booked → Won / Not a fit).

The visitor sees an error only when **both** fail; one failure alone is logged in
Vercel → Logs and the lead still lands. "Email alert sent" unchecked on a row means
the email failed and that row is the only record. Column names in `lib/leads.ts` must
match the database exactly — rename a column there, rename it here. The form's
"How many volunteers?" values match the plan walls (25 / 100 / 250 / 500 / 750) and carry
no commas, because Notion select options can't contain them. Values are English on
both language versions so the Notion options don't fork.

## Brand assets

The logo is Sean's design (2026-10-26): the wordmark "envolv" with the **Embrace ring**
— a teal ring with a gold arc — as the "o". Sources (his PNGs) are in `brand-src/`;
`public/brand/` holds the vector versions traced from them:

| File | Use |
|------|-----|
| `envolv-logo-dark.svg` | White letters — dark backgrounds (the site in dark mode) |
| `envolv-logo-light.svg` | Emerald letters — light backgrounds (the site in light mode, docs, email, OG image) |
| `envolv-mark.svg` | The ring alone — avatars, app icon, favicon |

Favicons, the Apple touch icon and the social share image are Next.js file
conventions in `app/` (`favicon.ico`, `icon.svg`, `apple-icon.png`,
`opengraph-image.png`, `twitter-image.png`); `app/robots.ts` and `app/sitemap.ts`
generate `/robots.txt` and `/sitemap.xml` from `SITE_URL` in `lib/content.ts`.

## Live demo (`/demo`)

"See it live" and "Try the live demo" go to **`/demo`** (or `/es/demo`) on this site: an optional
email box and two buttons — the coordinator dashboard, and the volunteer app (which
opens in a phone-sized window on a desktop; there's also a QR code for phones).
The buttons go to `${NEXT_PUBLIC_DEMO_URL}/api/demo/enter?as=admin|volunteer`, where
the demo app signs the visitor in with no password.

The demo app itself is the medvolunteer repo built with `NEXT_PUBLIC_DEMO_MODE=1` on
the `envolv-demo` Vercel project, against a fictional "City Free Clinic" database that
resets every night — see `web/lib/demo.ts` and `supabase/demo/README.md` there.

If the visitor types an email, `recordDemoVisit` in `app/actions.ts` records it the same two ways as a
demo request: an email to the founders and a **Website Leads** row with Source
**Live demo**. It never blocks them from getting in.

⚠️ As of 2026-10-29 the demo app is still behind Vercel's login (Sean's call), so
only the Vercel team can actually get in. Making it public = turning off Vercel
Authentication on the `envolv-demo` project (or giving it a custom domain).

## Hero badge

The "Live today at a free medical clinic" pill above the headline is switched off
(`HERO_BADGE.show = false` in `lib/content.ts`) as of 2026-10-26, at Sean's request.
It's scheduled to come back on **2026-11-23** — flip `show` back to `true`.

## What's not here yet

- **B2** — DNS: envolv.org + www → this Vercel project (envolv.app is the product's).
  Needs the domains shared to Sean's Namecheap login, and the trademark question (L7)
  settled.
- **B6** — a native Spanish speaker's read of `/es` before launch.
