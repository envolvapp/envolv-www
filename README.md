# envolv-www

The envolv.app marketing site. One-page landing + demo-request capture.

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

**Nothing is sold as shipping before it ships.** A plan feature the product can't
do yet is written `soon('…')` in `content.ts` (and a comparison row gets
`envolvSoon: true`); both render a "Soon" badge with a dashed icon instead of a
checkmark. When a feature lands in the app, delete the `soon` — that's the whole
release step for the marketing site. The audit behind the current list is in the
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

DNS (envolv.app + www, envolv.org → redirect) is roadmap item **B2** and needs Sean.

## Contact address

`hello@envolv.app` (`CONTACT_EMAIL` in `lib/content.ts`) is a Namecheap email-forwarding
alias that fans out to the three co-founders. It is **not** `@envolv.org` on purpose:
envolv.org's MX records belong to Resend (sending from `noreply@envolv.org` depends on
them), and switching that domain to Namecheap forwarding would replace them.

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
"How many volunteers?" values match the plan walls (25 / 100 / 250 / 1,000) and carry
no commas, because Notion select options can't contain them.

## Brand assets

The logo is Sean's design (2026-10-26): the wordmark "envolv" with the **Embrace ring**
— a teal ring with a gold arc — as the "o". Sources (his PNGs) are in `brand-src/`;
`public/brand/` holds the vector versions traced from them:

| File | Use |
|------|-----|
| `envolv-logo-dark.svg` | White letters — dark backgrounds (the site header/footer) |
| `envolv-logo-light.svg` | Emerald letters — light backgrounds (docs, email, OG image) |
| `envolv-mark.svg` | The ring alone — avatars, app icon, favicon |

Favicons, the Apple touch icon and the social share image are Next.js file
conventions in `app/` (`favicon.ico`, `icon.svg`, `apple-icon.png`,
`opengraph-image.png`, `twitter-image.png`); `app/robots.ts` and `app/sitemap.ts`
generate `/robots.txt` and `/sitemap.xml` from `SITE_URL` in `lib/content.ts`.

## Live demo (`/demo`)

"See it live" and "Try the live demo" go to **`/demo`** on this site: an optional
email box and two buttons — the coordinator dashboard, and the volunteer app (which
opens in a phone-sized window on a desktop; there's also a QR code for phones).
The buttons go to `${NEXT_PUBLIC_DEMO_URL}/api/demo/enter?as=admin|volunteer`, where
the demo app signs the visitor in with no password.

The demo app itself is the medvolunteer repo built with `NEXT_PUBLIC_DEMO_MODE=1` on
the `envolv-demo` Vercel project, against a fictional "City Free Clinic" database that
resets every night — see `web/lib/demo.ts` and `supabase/demo/README.md` there.

If the visitor types an email, `app/demo/actions.ts` records it the same two ways as a
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

- **B2** — DNS: envolv.app + www → this Vercel project; envolv.org → redirect. Needs
  the domains shared to Sean's Namecheap login, and the trademark question (L7) settled.
