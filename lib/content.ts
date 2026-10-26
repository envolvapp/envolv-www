/**
 * Single source of truth for everything the landing page claims.
 *
 * Verticals trace to industry-targeting-strategy.pdf (medvolunteer repo root).
 *
 * Tier ladder revised 2026-08-20 (see volunteer-saas-business-plan-v2.pdf §3):
 * Free ≤25 / Starter $29 ≤100 / Growth $59 ≤250 / Professional $99 ≤1,000 /
 * Enterprise custom from $199. Walls sit at real population clusters
 * (101–250 actives is the single largest cohort of volunteer programs);
 * limits count ACTIVE volunteers — archived profiles are free.
 *
 * Pricing & competitor figures verified 2026-08-20 against published sources:
 *   - Volgistics price list (volgistics.com/help/payment-information/price-list,
 *     unchanged since 2020-07): 50 vols $9 base / $17 all add-ons; 500 vols $30 /
 *     $55; 1,000 vols $40 / $73 all-in; $10/mo per admin beyond two.
 *   - VolunteerHub (volunteerhub.com/pricing): Plus from $143/mo, Pro from
 *     $288/mo, billed annually + setup fee.
 *   - Better Impact acquired Galaxy Digital (Get Connected) 2026-03; both
 *     quote-only annual contracts.
 *   - Civic Champs (civicchamps.com/pricing): $49–$174/mo by active-volunteer
 *     band + $199–$399 setup — closest modern analog to our band model.
 *   - Free plans now standard at the small end: POINT (unlimited, Pro $99),
 *     Golden (unlimited, Pro $100), Timecounts (1 admin, Pro $79).
 *
 * Strategy: value-anchor against the modern platforms ($99–288/mo, setup
 * fees, annual lock-in), answer the free plans with a real Free tier, and
 * beat Volgistics like-for-like once its add-ons + per-admin fees count.
 * If a number changes, change it here — not in the JSX.
 *
 * "Soon" rule (2026-10-26): anything the PRODUCT can't do yet is marked
 * `soon` and renders a "Soon" badge — never sold as if it ships today.
 * Audited against the medvolunteer app that day: SMS + push are unwired,
 * industry templates / kiosk / API / roles / white-label / multi-org / SSO
 * are unbuilt (ROADMAP F3–F11), background checks are manual tracking only
 * (provider integration is F5), and there is no live chat (F13). Items
 * the team delivers by hand (support, onboarding calls, migration, CSM)
 * are not marked. When a feature ships, delete its `soon`.
 */

export const DEMO_URL =
  process.env.NEXT_PUBLIC_DEMO_URL ?? 'https://envolv-demo.vercel.app'

/** A plan feature: a plain string ships today; `{ text, soon }` doesn't yet. */
export type Feature = string | { text: string; soon: true }

const soon = (text: string): Feature => ({ text, soon: true })

export type Tier = {
  name: string
  monthly?: number
  annualMonthly?: number // billed annually, ~17% off (≈2 months free)
  custom?: boolean // contact-us pricing; monthly/annualMonthly omitted
  customNote?: string // subtext under "Custom" (e.g. a published floor)
  tagline: string
  volunteers: string
  seats: string
  features: Feature[]
  featured?: boolean
}

/**
 * The Free plan renders as a slim strip, not a card — it's the on-ramp
 * (and where expired trials land), not the hero.
 */
export const FREE_TIER = {
  name: 'Free',
  volunteers: 'Up to 25 active volunteers',
  seats: '1 admin seat',
  blurb:
    'Scheduling, hour tracking, and the volunteer mobile app — free for good. No credit card, no trial clock.',
}

export const TIERS: Tier[] = [
  {
    name: 'Starter',
    monthly: 29,
    annualMonthly: 24,
    tagline: 'For small teams that outgrew the spreadsheet.',
    volunteers: 'Up to 100 volunteers',
    seats: '2 admin seats',
    features: [
      'Volunteer self-service portal',
      'Mobile app access',
      'Scheduling & hour tracking',
      'Standard reporting',
      'Email notifications',
      'Email support (48hr)',
      soon('1 industry template'),
    ],
  },
  {
    name: 'Growth',
    monthly: 59,
    annualMonthly: 49,
    tagline: 'For established programs — where most nonprofits actually live.',
    volunteers: 'Up to 250 volunteers',
    seats: '5 admin seats',
    featured: true,
    features: [
      'Advanced scheduling & approvals',
      'Custom reports',
      'Background check tracking',
      'Logo branding',
      'Email support (24hr)',
      soon('3 industry templates'),
      soon('SMS messaging (500/mo)'),
      soon('Background check provider integration'),
      soon('Live chat support'),
    ],
  },
  {
    name: 'Professional',
    monthly: 99,
    annualMonthly: 82,
    tagline: 'For large, multi-program operations.',
    volunteers: 'Up to 1,000 volunteers',
    seats: '10 admin seats',
    features: [
      'Geofenced clock-in',
      'CSV data exports',
      'Priority support + onboarding call',
      soon('All industry templates'),
      soon('Kiosk mode'),
      soon('API access'),
      soon('SMS messaging (2,000/mo)'),
      soon('Advanced permissions'),
      soon('Custom brand colors'),
    ],
  },
  {
    name: 'Enterprise',
    custom: true,
    customNote: 'from $199/month',
    tagline: 'For networks, agencies, and government.',
    volunteers: 'Unlimited volunteers',
    seats: 'Unlimited admin seats',
    features: [
      'Everything in Professional',
      'Custom integrations & data migration',
      'Security review & DPA',
      'Dedicated CSM + SLA',
      soon('Unlimited sites & orgs'),
      soon('Full white-label branding'),
      soon('SSO / SAML'),
    ],
  },
]

export const VERTICALS = [
  {
    name: 'Animal shelters & rescues',
    blurb:
      'Role-based shifts for dog walkers, cat socializers, and adoption counselors, with each volunteer’s documents and training tracked in one place.',
    icon: 'PawPrint' as const,
  },
  {
    name: 'Food banks & pantries',
    blurb:
      'Recurring shift-based scheduling for distribution days, warehouse sorting, and mobile pantries.',
    icon: 'ShoppingBasket' as const,
  },
  {
    name: 'Nonprofits & community orgs',
    blurb:
      'A flexible catch-all template: events, recurring programs, and one-off drives, without the setup tax.',
    icon: 'HeartHandshake' as const,
  },
  {
    name: 'Museums & cultural orgs',
    blurb:
      'Docent scheduling, gallery coverage, and the complex recurring rotations that break simple sign-up sheets.',
    icon: 'Landmark' as const,
  },
  {
    name: 'Clinics & healthcare',
    blurb:
      'Credential tracking, background checks, and onboarding stages — already running live at a free clinic today.',
    icon: 'Stethoscope' as const,
  },
  {
    name: 'State & local government',
    blurb:
      'Accessible, auditable volunteer records for parks, libraries, and emergency response programs.',
    icon: 'Building2' as const,
  },
]

export const FEATURES = [
  {
    title: 'Volunteers get an actual app',
    body: 'An installable mobile app with offline support and geofenced clock-in. Not a desktop site squeezed onto a phone. Push notifications are next.',
    icon: 'Smartphone' as const,
  },
  {
    title: 'Scheduling that fills itself',
    body: 'Publish shifts, let volunteers claim them, and stop chasing people by text. Capacity limits are enforced by the system, not by you.',
    icon: 'CalendarCheck' as const,
  },
  {
    title: 'Hours you can actually report',
    body: 'Clock-in/out with admin approval, then export the totals your board or grant application asks for.',
    icon: 'Clock' as const,
  },
  {
    title: 'Onboarding on rails',
    body: 'Applications, documents, background checks, and training modules — tracked as stages, so nobody stalls halfway.',
    icon: 'ClipboardCheck' as const,
  },
  {
    title: 'Messaging built in',
    body: 'Email everyone, a single role, or hand-picked volunteers. Schedule it for later. Templates with merge fields included. SMS is on the way.',
    icon: 'Send' as const,
  },
  {
    title: 'Bilingual out of the box',
    body: 'Full English and Spanish across both the admin and volunteer apps — because your volunteers already are.',
    icon: 'Languages' as const,
  },
]

/**
 * Competitor comparison — verified against published pricing (see header).
 * Three columns: us, the modern platforms we actually compete with on
 * product, and the legacy à-la-carte incumbent that competes on sticker price.
 */
export const COMPARISON = {
  note: 'Figures verified August 20, 2026. Modern platforms: VolunteerHub published pricing (Plus from $143/mo, Pro from $288/mo, billed annually plus a setup fee); Better Impact and Get Connected (merged March 2026) are quote-only annual contracts. Legacy: Volgistics published price list (unchanged since July 2020) — the volunteer portal, time clock, and document storage are separate add-ons, and each admin beyond two costs $10/mo. Envolv volunteer limits count active volunteers; archived profiles are free.',
  rows: [
    {
      label: 'Starting price',
      envolv: 'Free up to 25 volunteers — paid from $29/mo',
      modern: '$143/mo + setup fee',
      legacy: '$9/mo bare — $17 with add-ons',
    },
    {
      label: '250 volunteers, 5 admins',
      envolv: '$59/mo',
      modern: '$143+/mo + setup fee',
      legacy: '$70–85/mo with add-ons + admin fees',
    },
    {
      label: '1,000 volunteers, 10 admins',
      envolv: '$99/mo',
      modern: '$143–288/mo + setup fee',
      legacy: '$133–153/mo with add-ons + admin fees',
    },
    {
      label: 'Billing',
      envolv: 'Monthly or annual, cancel anytime',
      modern: 'Annual contract + setup fee',
      legacy: 'Monthly',
    },
    {
      label: 'Mobile app',
      envolv: 'Included on every plan',
      modern: 'Included',
      legacy: 'None',
    },
    {
      label: 'Volunteer portal',
      envolv: 'Included on every plan',
      modern: 'Included',
      legacy: 'Paid add-on',
    },
    {
      label: 'Admin seats',
      envolv: 'Included per tier',
      modern: 'Scales with plan price',
      legacy: '$10/mo each beyond two',
    },
    {
      label: 'Volunteer limit basis',
      envolv: 'Active volunteers — archived are free',
      modern: 'Varies; often total records',
      legacy: 'Stored records; archives metered too',
    },
    {
      label: 'Industry templates',
      envolv: 'Purpose-built per vertical',
      envolvSoon: true,
      modern: 'One generic setup',
      legacy: 'One generic setup',
    },
    {
      label: 'Support',
      envolv: 'Email support, priority by tier',
      modern: 'Varies by plan',
      legacy: 'Email only',
    },
  ] as ComparisonRow[],
}

export type ComparisonRow = {
  label: string
  envolv: string
  /** true = Envolv's cell describes something not shipped yet */
  envolvSoon?: boolean
  modern: string
  legacy: string
}
