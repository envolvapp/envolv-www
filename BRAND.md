# Envolv brand colors

Canonical for **every** Envolv property — this marketing site, the medvolunteer
(Yakima) app, and the multi-tenant platform. Provided by Sean, 2026-07-12.

| Role | Name | Hex | RGB |
|------|------|-----|-----|
| Main | Navy Blue | `#1b2a4b` | `rgb(27, 42, 75)` |
| Main | Emerald Green | `#01887a` | `rgb(1, 136, 122)` |
| Main | Golden Yellow | `#f7b846` | `rgb(247, 184, 70)` |
| Accent | Teal Blue | `#00acc2` | `rgb(0, 172, 194)` |

## How they're used

Four colors are not a palette — you need shades to build a UI without hitting
contrast failures. The four above are the **anchors**; every other stop in
`app/globals.css` is a tint or shade derived from them.

| Token | Anchor | Job |
|-------|--------|-----|
| `ink-*` | Navy | Page surfaces, borders, body text. `ink-800` **is** the brand navy; `ink-950` (`#0d1526`) is a deepened navy for the page background. |
| `brand-*` | Emerald | Primary actions, checkmarks, feature icons. `brand-500` **is** the brand emerald. |
| `teal-*` | Teal | Links, the hero highlight, focus rings, secondary emphasis. `teal-500` **is** the brand teal. |
| `accent-*` | Gold | Badges only — "Most popular", "save ~17%". `accent-500` **is** the brand gold. |

## Two decisions worth not undoing

**Buttons fill with `brand-600` (`#016b60`), not the brand emerald itself.** White
text on `#01887a` measures **4.37:1** — it misses WCAG AA for normal-size text by a
hair. `brand-600` gets **6.5:1**, and the button hovers *up* to the true brand color,
so the brand emerald is still what you see on interaction. This looks like a typo and
is not one.

**Gold is rationed to badges.** At **10.4:1** on navy it is by far the loudest thing on
the page. Used for anything more than emphasis, it takes over and the emerald stops
reading as the primary action.

Contrast on the navy background (`#0d1526`), for reference: teal **6.7:1**, gold
**10.4:1**, `ink-400` muted text **5.6:1** — all pass AA. Brand emerald as *text* is
only 4.2:1, so it's used for icons and fills, not for body copy.

## Porting to the other repos

`medvolunteer` and the multi-tenant platform should adopt these same four anchors when
their turn comes (roadmap C2/C3). Copy the `@theme` block out of `app/globals.css`
rather than re-deriving the ramps — the shades are chosen for contrast, not by eye.
