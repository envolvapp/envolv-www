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
| `NEXT_PUBLIC_DEMO_URL` | no | Where "See it live" points. Defaults to `https://envolv-demo.vercel.app`. |

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

## What's not here yet

- **B3** — persisting leads (Supabase table or Resend audience). Today a demo request
  is an email and nothing else; if the send fails, the lead is gone.
- **B4** — OG image, `robots.txt`, `sitemap.xml`. Basic metadata is in `app/layout.tsx`.
