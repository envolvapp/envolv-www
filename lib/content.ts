/**
 * Single source of truth for everything the site claims, in both languages.
 *
 * Pricing and positioning follow the founders' action plan of 2026-10-31
 * (ACTION-PLAN-BRIEF §§1–5, approved by all three co-founders). It replaced
 * the 2026-10-30 ladder in three ways:
 *
 *   1. The meter is ACTIVE volunteers: anyone with at least one completed
 *      shift, clock-in or logged hour in the past 365 days. Applicants,
 *      prospects, inactive volunteers and archived records are never billed,
 *      on any plan. Archive is free and never expires. (Replaces "everyone on
 *      file" and "archived free for 12 months, then deleted".)
 *   2. One plan, priced in bands — same prices and band edges as before:
 *      Free ≤25 / Starter $29 ≤100 / Growth $59 101–250 / Professional $89
 *      251–500 / Premier $129 501–750 / Enterprise from $199 above 750.
 *      Annual ≈17% off ($24/$49/$74/$107). Unlimited admins on every paid
 *      band. No feature gates between paid bands; white-glove import is in
 *      every paid band (no longer Premier-only).
 *   3. Billing rules: warn at 90% of a band; up to 10% over for 60 days
 *      before moving up; monthly plans move up at the first billing date after
 *      the grace period and down after a full month below the band; annual
 *      plans true up once, at renewal.
 *
 * Pricing is FROZEN until 15 customers pay list price.
 *
 * Shipped-only rule (2026-10-30, still in force): the site lists only what the
 * product does TODAY. Checked against the medvolunteer repo on 2026-10-31:
 *   shipped  — volunteer app (PWA) + portal, shifts with capacity limits and
 *              role-restricted sign-up, recurring shifts, clock-in/out with a
 *              geofence check, hour approvals, onboarding stages, background-
 *              check status, training modules, handbook signature, credential
 *              records with an expiry report, in-app expiry warnings and the
 *              Credential Expiry auto-message (fixed 2026-10-31), email + push
 *              messages (scheduled, templates, by role), reports with saved
 *              filters + CSV export, full EN/ES.
 *   not yet  — kiosk, CSV importer, SMS, role-mix shifts, student rotations,
 *              hours-verification letters, per-organization branding, API,
 *              multi-site, SSO, volunteer archiving (F17), the active-count
 *              meter itself (F1, Dec 2026), a help center. None of these
 *              appear on the site. When one ships, add it to PAID_FEATURES.
 * Hand-delivered services (support, onboarding calls, the white-glove import,
 * a CSM) count as shipped.
 *
 * Competitor figures were checked 2026-10-31 against the sources in
 * COMPARISON.sources; the dedicated comparison pages live in lib/compare.ts.
 *
 * Every visible string is an `L` ({ en, es }). If a number changes, change it
 * here — not in the JSX. Spanish uses "tú", matching the Envolv apps.
 */

export type Lang = 'en' | 'es'
export type L = Record<Lang, string>

/** English lives at /, Spanish at /es. */
export const LANG_PREFIX: Record<Lang, string> = { en: '', es: '/es' }

/** Path in the given language, e.g. href('es', '/demo') → '/es/demo'. */
export function href(lang: Lang, path = '/'): string {
  const prefix = LANG_PREFIX[lang]
  if (path === '/') return prefix || '/'
  return `${prefix}${path}`
}

/**
 * Base URL of the demo APP (medvolunteer in demo mode). Visitors reach it via
 * this site's /demo page, which links to `${DEMO_URL}/api/demo/enter?as=…` —
 * the app signs them in with no password. Inlined at build time (the QR code
 * on /demo is rendered from it), so changing it needs a redeploy.
 */
export const DEMO_URL =
  process.env.NEXT_PUBLIC_DEMO_URL ?? 'https://envolv-demo.vercel.app'

/**
 * Public contact address — footer, the demo form's failure fallback, and the
 * one place every customer question should land. A Resend inbox on envolv.org
 * (created 2026-10-30); its routing agent forwards each new message to the
 * three co-founders. envolv.org's root MX already points at Resend inbound, so
 * no DNS change was needed. Do NOT move envolv.org mail to Namecheap
 * forwarding: that replaces the `send` MX and breaks noreply@envolv.org.
 */
export const CONTACT_EMAIL = 'support@envolv.org'

/**
 * Canonical origin — metadata, robots.txt, the sitemap. envolv.org is the
 * marketing site (all-hands 2026-10-30); envolv.app is reserved for the
 * product itself (the company hub, with each client beneath it).
 */
export const SITE_URL = 'https://envolv.org'

/**
 * The small pill above the hero headline. Hidden 2026-10-26 at Sean's request
 * until the claim is one a prospect can verify; scheduled to come back on
 * 2026-11-23 (flip `show` to true), a week after Yakima's 2026-11-16 go-live.
 * The clinic vertical's blurb dropped its own "running live" line on
 * 2026-10-31 for the same reason — restore both together.
 */
export const HERO_BADGE = {
  show: false,
  text: {
    en: 'Live today at a free medical clinic — and built for what’s next',
    es: 'Ya en uso en una clínica médica gratuita — y hecho para lo que viene',
  } as L,
}

/** The date every price and competitor figure on the site was last checked. */
export const AS_OF = {
  iso: '2026-10-31',
  text: { en: 'October 31, 2026', es: '31 de octubre de 2026' } as L,
}

/* ── Plans ──────────────────────────────────────────────────────────────── */

/** 1000 → "1,000" in both languages (US Spanish uses the same separators). */
export function num(n: number): string {
  return n.toLocaleString('en-US')
}

/** 1000 → "$1,000". Prices are US dollars in both languages. */
export function usd(n: number): string {
  return `$${num(n)}`
}

/** "Up to 100" / "101–250" — the band's edges, without a noun. */
export function bandRange(band: { min: number; max: number }, lang: Lang): string {
  if (band.min <= 1) return lang === 'es' ? `Hasta ${num(band.max)}` : `Up to ${num(band.max)}`
  return `${num(band.min)}–${num(band.max)}`
}

/** "Up to 25 active volunteers" / "Hasta 25 voluntarios activos". */
export function activeLabel(limit: number, lang: Lang): string {
  return lang === 'es' ? `Hasta ${num(limit)} voluntarios activos` : `Up to ${num(limit)} active volunteers`
}

/** "1 admin" / "Unlimited admins". */
export function adminsLabel(admins: number | 'unlimited', lang: Lang): string {
  if (admins === 'unlimited') return lang === 'es' ? 'Administradores ilimitados' : 'Unlimited admins'
  if (lang === 'es') return admins === 1 ? '1 administrador' : `${admins} administradores`
  return admins === 1 ? '1 admin' : `${admins} admins`
}

export type Band = {
  name: string // plan names stay in English in both languages (invoices, contracts)
  min: number // lowest active-volunteer count the band is for (1 = "up to")
  max: number // the band's wall
  monthly: number
  annualMonthly: number // billed annually, ~17% off (≈2 months free)
  support: L
}

/**
 * The paid bands, in order. One plan: every band has the same features
 * (PAID_FEATURES) and unlimited admins — only the price and the support line
 * change with size.
 */
export const BANDS: Band[] = [
  {
    name: 'Starter',
    min: 1,
    max: 100,
    monthly: 29,
    annualMonthly: 24,
    support: { en: 'Email support, 24-hour response target', es: 'Soporte por correo, objetivo de respuesta de 24 h' },
  },
  {
    name: 'Growth',
    min: 101,
    max: 250,
    monthly: 59,
    annualMonthly: 49,
    support: { en: 'Email support, 24-hour response target', es: 'Soporte por correo, objetivo de respuesta de 24 h' },
  },
  {
    name: 'Professional',
    min: 251,
    max: 500,
    monthly: 89,
    annualMonthly: 74,
    support: { en: 'Priority support and an onboarding call', es: 'Soporte prioritario y una llamada de bienvenida' },
  },
  {
    name: 'Premier',
    min: 501,
    max: 750,
    monthly: 129,
    annualMonthly: 107,
    support: { en: 'Priority support and an onboarding call', es: 'Soporte prioritario y una llamada de bienvenida' },
  },
]

/**
 * Included in every paid band — shipped features only (see header). Order is
 * display order. The import is a hand-delivered service.
 */
export const PAID_FEATURES: L[] = [
  { en: 'Volunteer app for any phone, plus a self-service portal', es: 'App para voluntarios en cualquier teléfono y un portal de autoservicio' },
  { en: 'Shifts with sign-up limits, recurring schedules and role-only shifts', es: 'Turnos con cupos, horarios recurrentes y turnos solo para un rol' },
  { en: 'Clock-in from the phone, with an on-site check and hour approvals', es: 'Registro de entrada desde el teléfono, con verificación en el sitio y aprobación de horas' },
  { en: 'Credential tracking with expiry reminders', es: 'Seguimiento de credenciales con avisos de vencimiento' },
  { en: 'Onboarding stages, documents, background-check status and training', es: 'Etapas de incorporación, documentos, estado de verificación de antecedentes y capacitación' },
  { en: 'Email and push messages — now, scheduled, or automatic', es: 'Mensajes por correo y push — al momento, programados o automáticos' },
  { en: 'Custom reports and CSV exports', es: 'Informes personalizados y exportación en CSV' },
  { en: 'Full English and Spanish for volunteers and coordinators', es: 'Todo en inglés y español para voluntarios y coordinadores' },
  { en: 'White-glove import of your existing volunteer records', es: 'Importamos por ti tus registros de voluntarios actuales' },
]

/**
 * The Free plan is the FIRST option in the band selector ("Up to 25 · Free"),
 * so small programs find it immediately (Sean, 2026-10-31). The selector still
 * opens on Starter, where clinics land. Free is for small programs and the
 * landing pad for trials that end without a plan; it is NOT pitched against
 * POINT's or Golden's unlimited free plans (brief §2).
 *
 * `includes` names only what `blurb` always said Free has — Free's exact
 * feature set beyond that isn't decided, so nothing else is claimed for it.
 *
 * The brief gives Free "help center" support; there is no help center yet, so
 * no support line is shown for Free until there is one.
 */
export const FREE_TIER = {
  name: 'Free',
  limit: 25,
  admins: 1,
  blurb: {
    en: 'Free for small programs: scheduling, hour tracking and the volunteer app, with unlimited applicants and archive. No card, no time limit.',
    es: 'Gratis para programas pequeños: turnos, registro de horas y la app para voluntarios, con solicitudes y archivo ilimitados. Sin tarjeta y sin límite de tiempo.',
  } as L,
  /** One line next to the $0. */
  short: {
    en: 'Free for small programs — no card, no time limit.',
    es: 'Gratis para programas pequeños: sin tarjeta y sin límite de tiempo.',
  } as L,
  includes: [
    { en: 'Volunteer app for any phone, plus a self-service portal', es: 'App para voluntarios en cualquier teléfono y un portal de autoservicio' },
    { en: 'Shift scheduling', es: 'Programación de turnos' },
    { en: 'Clock-in from the phone and hour tracking', es: 'Registro de entrada desde el teléfono y seguimiento de horas' },
    { en: 'Unlimited applicants and archive', es: 'Solicitudes y archivo ilimitados' },
  ] as L[],
  /** Under the Free card's button. */
  upgrade: {
    en: 'Need more admins, more volunteers or the white-glove import? Every paid band includes them, and your records come with you.',
    es: '¿Necesitas más administradores, más voluntarios o que importemos tus registros? Todos los tramos pagos lo incluyen, y tus registros vienen contigo.',
  } as L,
}

/** Above the top wall. Rendered as a strip under the band selector. */
export const ENTERPRISE = {
  name: 'Enterprise',
  over: 750,
  floor: 199,
  tagline: {
    en: 'For networks, agencies and government.',
    es: 'Para redes, agencias y gobierno.',
  } as L,
  summary: {
    en: 'Everything in the paid bands, unlimited admins, a dedicated customer success manager and an SLA. Annual pricing is quoted.',
    es: 'Todo lo de los tramos pagos, administradores ilimitados, un gerente de cuenta dedicado y un SLA. El precio anual se cotiza.',
  } as L,
}

/** The trial: any paid band, 30 days, no card, expires into Free. */
export const TRIAL = {
  days: 30,
  text: {
    en: 'Try any paid band free for 30 days — no card needed. When the trial ends, the account moves to Free unless you choose a band.',
    es: 'Prueba cualquier tramo pago gratis durante 30 días, sin tarjeta. Cuando termina la prueba, la cuenta pasa al plan Free, salvo que elijas un tramo.',
  } as L,
}

/**
 * How the meter works, in plain words — shown right under the price.
 * Keep in step with the header comment and with lib/privacy.ts (retention).
 */
export const PLAN_RULES = {
  /** One line next to the price. */
  short: {
    en: 'You pay only for volunteers who served in the past 12 months.',
    es: 'Solo pagas por los voluntarios que participaron en los últimos 12 meses.',
  } as L,
  points: [
    {
      icon: 'UserCheck' as const,
      title: { en: 'Active volunteers only', es: 'Solo voluntarios activos' },
      body: {
        en: 'Anyone who completed a shift, clocked in or logged hours in the past 12 months.',
        es: 'Quien completó un turno, registró su entrada o anotó horas en los últimos 12 meses.',
      },
    },
    {
      icon: 'UserPlus' as const,
      title: { en: 'Always free', es: 'Siempre gratis' },
      body: {
        en: 'Applicants, inactive volunteers and archived records — on every plan, Free included.',
        es: 'Solicitudes, voluntarios inactivos y registros archivados, en todos los planes, incluido Free.',
      },
    },
    {
      icon: 'Archive' as const,
      title: { en: 'Archive never expires', es: 'El archivo no vence' },
      body: {
        en: 'Archived records are free and kept until you delete them.',
        es: 'Los registros archivados son gratis y se guardan hasta que tú los borres.',
      },
    },
    {
      icon: 'TrendingUp' as const,
      title: { en: 'Room to grow', es: 'Margen para crecer' },
      body: {
        en: 'Go up to 10% over your band for 60 days before you move up. We warn you at 90%.',
        es: 'Puedes pasarte hasta un 10% de tu tramo durante 60 días antes de subir. Te avisamos al llegar al 90%.',
      },
    },
  ],
  bandChanges: {
    en: 'Monthly plans move up on the first billing date after those 60 days, and move down on their own after a full month below the band. Annual plans settle up once, at renewal — no mid-year invoices.',
    es: 'Los planes mensuales suben en la primera fecha de facturación después de esos 60 días, y bajan solos después de un mes completo por debajo del tramo. Los planes anuales se ajustan una sola vez, al renovar, sin facturas a mitad de año.',
  } as L,
  finePrint: {
    en: 'Prices in US dollars. No setup fees. Support hours are Monday to Friday, 9 a.m. to 5 p.m. Eastern; response times are targets, not guarantees.',
    es: 'Precios en dólares estadounidenses. Sin cuotas de instalación. El horario de soporte es de lunes a viernes, de 9 a. m. a 5 p. m. (hora del Este); los tiempos de respuesta son objetivos, no garantías.',
  } as L,
}

/**
 * Go-to-market offer (brief §8): for organizations leaving Volgistics or Get
 * Connected, the white-glove import (already in every paid band) plus the
 * first month free.
 */
export const MIGRATION_OFFER = {
  title: { en: 'Leaving Volgistics or Get Connected?', es: '¿Dejas Volgistics o Get Connected?' } as L,
  body: {
    en: 'We import your existing volunteer records for you, free, and your first month is free. Every paid band already includes the white-glove import; the free first month is for organizations moving from Volgistics or Get Connected.',
    es: 'Importamos por ti tus registros de voluntarios actuales, gratis, y tu primer mes es gratis. Todos los tramos pagos ya incluyen la importación hecha por nosotros; el primer mes gratis es para organizaciones que vienen de Volgistics o Get Connected.',
  } as L,
}

/* ── Clinics, industries & features ─────────────────────────────────────── */

/**
 * The lead audience (brief §4): free and charitable clinics with 50–250
 * active volunteers that schedule licensed clinicians, health-professions
 * students and interpreters. Shipped features only — role-mix shifts, student
 * rotations, verification letters and kiosk check-in are NOT built.
 */
export const CLINIC = {
  points: [
    {
      icon: 'BadgeCheck' as const,
      title: { en: 'Credentials that don’t lapse quietly', es: 'Credenciales que no vencen sin aviso' },
      body: {
        en: 'Record each license or certification with its expiry date. Volunteers see what’s due in their app, reminders go out on their own, and you get an expiry report.',
        es: 'Registra cada licencia o certificación con su fecha de vencimiento. Los voluntarios ven lo que está por vencer en su app, los recordatorios salen solos y tú tienes un informe de vencimientos.',
      },
    },
    {
      icon: 'Stethoscope' as const,
      title: { en: 'Shifts by role', es: 'Turnos por rol' },
      body: {
        en: 'Limit a shift to a role, so only clinicians can claim clinician shifts — and message one role at a time.',
        es: 'Limita un turno a un rol, para que solo el personal clínico pueda tomar los turnos clínicos, y escribe a un solo rol a la vez.',
      },
    },
    {
      icon: 'ClipboardCheck' as const,
      title: { en: 'Onboarding you can show an auditor', es: 'Incorporación que puedes mostrar en una auditoría' },
      body: {
        en: 'Applications, background-check status, documents, training and the handbook signature, tracked as stages for every volunteer.',
        es: 'Solicitudes, estado de verificación de antecedentes, documentos, capacitación y la firma del manual, organizados por etapas para cada voluntario.',
      },
    },
    {
      icon: 'Languages' as const,
      title: { en: 'Spanish for the whole team', es: 'Español para todo el equipo' },
      body: {
        en: 'Interpreters and Spanish-speaking volunteers get the whole volunteer app in Spanish; coordinators can switch the dashboard too.',
        es: 'Intérpretes y voluntarios hispanohablantes usan toda la app en español, y los coordinadores también pueden cambiar el panel.',
      },
    },
  ],
  /** The data boundary (brief §4 — attorney to confirm the final wording). */
  boundary: {
    en: 'Volunteers, not patients. Envolv is for administering volunteers: it has no patient fields, and customers agree not to enter information about patients or the care they receive. Envolv does not sign business associate agreements.',
    es: 'Voluntarios, no pacientes. Envolv sirve para administrar voluntarios: no tiene campos para pacientes, y los clientes se comprometen a no ingresar información sobre pacientes ni sobre la atención que reciben. Envolv no firma acuerdos de asociado comercial (BAA).',
  } as L,
}

export const VERTICALS = [
  {
    // `value` is what the demo form stores in Notion's Industry select —
    // always English so the select options don't fork by language.
    // `lead` = shown in its own section on the home page, not the grid.
    value: 'Clinics & healthcare',
    lead: true,
    name: { en: 'Clinics & healthcare', es: 'Clínicas y salud' },
    blurb: {
      en: 'Credential tracking with expiry reminders, background-check status and onboarding stages for clinicians, students and interpreters.',
      es: 'Seguimiento de credenciales con avisos de vencimiento, estado de verificación de antecedentes y etapas de incorporación para personal clínico, estudiantes e intérpretes.',
    },
    icon: 'Stethoscope' as const,
  },
  {
    value: 'Animal shelters & rescues',
    name: { en: 'Animal shelters & rescues', es: 'Refugios y rescate de animales' },
    blurb: {
      en: 'Role-based shifts for dog walkers, cat socializers, and adoption counselors, with each volunteer’s documents and training tracked in one place.',
      es: 'Turnos por rol para paseadores de perros, socializadores de gatos y consejeros de adopción, con los documentos y la capacitación de cada voluntario en un solo lugar.',
    },
    icon: 'PawPrint' as const,
  },
  {
    value: 'Food banks & pantries',
    name: { en: 'Food banks & pantries', es: 'Bancos de alimentos y despensas' },
    blurb: {
      en: 'Recurring shift-based scheduling for distribution days, warehouse sorting, and mobile pantries.',
      es: 'Turnos recurrentes para días de distribución, clasificación en el almacén y despensas móviles.',
    },
    icon: 'ShoppingBasket' as const,
  },
  {
    value: 'Nonprofits & community orgs',
    name: { en: 'Nonprofits & community orgs', es: 'Organizaciones sin fines de lucro y comunitarias' },
    blurb: {
      en: 'Events, recurring programs and one-off drives, set up around your roles and shifts with you.',
      es: 'Eventos, programas recurrentes y campañas puntuales, configurados contigo según tus roles y turnos.',
    },
    icon: 'HeartHandshake' as const,
  },
  {
    value: 'Museums & cultural orgs',
    name: { en: 'Museums & cultural orgs', es: 'Museos y organizaciones culturales' },
    blurb: {
      en: 'Docent scheduling, gallery coverage, and the complex recurring rotations that break simple sign-up sheets.',
      es: 'Turnos de guías, cobertura de salas y las rotaciones recurrentes complejas que rompen cualquier hoja de inscripción.',
    },
    icon: 'Landmark' as const,
  },
  {
    value: 'State & local government',
    name: { en: 'State & local government', es: 'Gobierno estatal y local' },
    blurb: {
      en: 'Accessible, auditable volunteer records for parks, libraries, and emergency response programs.',
      es: 'Registros de voluntarios accesibles y auditables para parques, bibliotecas y programas de respuesta a emergencias.',
    },
    icon: 'Building2' as const,
  },
]

export const FEATURES = [
  {
    title: { en: 'Volunteers get an actual app', es: 'Tus voluntarios tienen una app de verdad' },
    body: {
      en: 'An app they add to their home screen, with geofenced clock-in and a push reminder before every shift. Not a desktop site squeezed onto a phone.',
      es: 'Una app que agregan a su pantalla de inicio, con registro de entrada por geovalla y un recordatorio push antes de cada turno. No es un sitio de escritorio apretado en un teléfono.',
    },
    icon: 'Smartphone' as const,
  },
  {
    title: { en: 'Scheduling that fills itself', es: 'Turnos que se llenan solos' },
    body: {
      en: 'Publish shifts, let volunteers claim them, and stop chasing people by text. Capacity limits are enforced by the system, not by you.',
      es: 'Publica turnos, deja que los voluntarios los elijan y deja de perseguir a la gente por mensaje. El sistema respeta los cupos, no tú.',
    },
    icon: 'CalendarCheck' as const,
  },
  {
    title: { en: 'Hours you can actually report', es: 'Horas que sí puedes reportar' },
    body: {
      en: 'Clock-in/out with admin approval, then export the totals your board or grant application asks for.',
      es: 'Entrada y salida con aprobación del administrador, y luego exporta los totales que pide tu junta directiva o tu solicitud de subvención.',
    },
    icon: 'Clock' as const,
  },
  {
    title: { en: 'Onboarding on rails', es: 'Incorporación sin tropiezos' },
    body: {
      en: 'Applications, documents, background checks, and training modules — tracked as stages, so nobody stalls halfway.',
      es: 'Solicitudes, documentos, verificación de antecedentes y módulos de capacitación — organizados por etapas, para que nadie se quede a medio camino.',
    },
    icon: 'ClipboardCheck' as const,
  },
  {
    title: { en: 'Messaging built in', es: 'Mensajes integrados' },
    body: {
      en: 'Email or push-notify everyone, a single role, or hand-picked volunteers. Schedule it for later. Templates with merge fields included.',
      es: 'Envía correos o notificaciones push a todos, a un rol o a voluntarios específicos. Prográmalos para después. Incluye plantillas con campos combinados.',
    },
    icon: 'Send' as const,
  },
  {
    title: { en: 'Bilingual out of the box', es: 'Bilingüe desde el primer día' },
    body: {
      en: 'Full English and Spanish across both the admin and volunteer apps — because your volunteers already are.',
      es: 'Inglés y español completos en la app de administración y en la de voluntarios — porque tus voluntarios ya lo son.',
    },
    icon: 'Languages' as const,
  },
]

/* ── Comparison ─────────────────────────────────────────────────────────── */

/** Envolv's list price per month at a given active-volunteer count; null = Enterprise (quoted). */
export function envolvMonthlyAt(actives: number): number | null {
  if (actives <= FREE_TIER.limit) return 0
  const band = BANDS.find((b) => actives <= b.max)
  return band ? band.monthly : null
}

export type PricePoint = {
  actives: number
  /** Civic Champs list price, billed annually (setup fee not included). */
  civicChamps: number
  /** Volgistics with 2 admins: [VicNet portal only, all add-ons]. */
  volgistics: [number, number]
}

/**
 * Competitive position, monthly, by active volunteers (brief §5). Checked
 * 2026-10-31:
 *   - Civic Champs (civicchamps.com/pricing): 1–49 $49 / 50–249 $74 /
 *     250–499 $99 / 500–749 $124 / 750–999 $149 / 1,000–1,499 $174, billed
 *     annually + a one-time setup fee shown as "$199 $399", unlabeled.
 *   - Volgistics price list (effective 2020-07-15), records ≈ actives:
 *     50 records $9 + VicNet $3 (+ VicTouch $3 + VicDocs $2) = $12–$17;
 *     500 records $30 + $10 (+ $10 + $5) = $40–$55 (covers 250 and 500);
 *     1,000 records $40 + $13 (+ $13 + $7) = $53–$73 (covers 750 and 1,000).
 *     Two System Operators included; $10/month each after that.
 * Envolv's column is computed from BANDS, so it can't drift.
 */
export const PRICE_POINTS: PricePoint[] = [
  { actives: 50, civicChamps: 74, volgistics: [12, 17] },
  { actives: 250, civicChamps: 99, volgistics: [40, 55] },
  { actives: 500, civicChamps: 124, volgistics: [40, 55] },
  { actives: 750, civicChamps: 149, volgistics: [53, 73] },
  { actives: 1000, civicChamps: 174, volgistics: [53, 73] },
]

export type Source = { label: string; url: string }

export const SOURCES = {
  civicChampsPricing: { label: 'Civic Champs — Pricing', url: 'https://www.civicchamps.com/pricing' },
  civicChampsTechSoup: { label: 'Civic Champs — TechSoup offer', url: 'https://www.civicchamps.com/techsoup' },
  civicChampsFitGap: { label: 'FitGap — Civic Champs', url: 'https://us.fitgap.com/products/civic-champs' },
  volgisticsPrices: { label: 'Volgistics — Price List', url: 'https://www.volgistics.com/help/payment-information/price-list/' },
  volgisticsSupport: { label: 'Volgistics — Customer Support', url: 'https://www.volgistics.com/support.htm' },
  volgisticsHelp: { label: 'Volgistics — Help topics', url: 'https://www.volgistics.com/help/' },
  corum: { label: 'Corum Group — Better Impact / The Brydon Group', url: 'https://www.corumgroup.com/node/6486' },
  betterImpactGetConnected: { label: 'Better Impact — Better Impact welcomes Get Connected', url: 'https://www.betterimpact.com/better-together' },
  betterImpactPlans: { label: 'Better Impact — Features & plans', url: 'https://www.betterimpact.com/features' },
  getConnected: { label: 'Get Connected by Galaxy Digital', url: 'https://www.galaxydigital.com/' },
  point: { label: 'POINT — Pricing', url: 'https://pointapp.org/pricing/' },
  golden: { label: 'Golden — Pricing', url: 'https://goldenvolunteer.com/pricing/' },
  timecounts: { label: 'Timecounts — Pricing', url: 'https://join.timecounts.app/pricing' },
} satisfies Record<string, Source>

/**
 * The home-page comparison (brief §5). Named competitors appear only in
 * dated, sourced comparisons like this one and the pages in lib/compare.ts
 * (DECISIONS 2026-10-31).
 */
export const COMPARISON = {
  notes: [
    {
      id: 'envolv',
      text: {
        en: 'Envolv: monthly list price with unlimited admins; annual billing is about 17% lower. Above 750 active volunteers is Enterprise, from $199.',
        es: 'Envolv: precio mensual de lista con administradores ilimitados; la facturación anual cuesta alrededor de un 17% menos. Más de 750 voluntarios activos es Enterprise, desde $199.',
      },
    },
    {
      id: 'civic',
      text: {
        en: 'Civic Champs: billed annually; counts volunteers active in the past year; unlimited admins. Its pricing page also shows a one-time setup fee as “$199” and “$399” without saying which applies. Kiosk check-in is included at every band. New U.S. 501(c)(3) customers can get 50% off a one-year contract through TechSoup with a budget under $1M, or 10–20% off with $1M or more.',
        es: 'Civic Champs: facturación anual; cuenta a los voluntarios activos en el último año; administradores ilimitados. Su página de precios también muestra una cuota única de instalación como “$199” y “$399”, sin decir cuál aplica. El quiosco de registro está incluido en todos los tramos. Los clientes nuevos de EE. UU. con estatus 501(c)(3) pueden obtener un 50% de descuento en un contrato de un año a través de TechSoup si su presupuesto es menor de $1M, o entre un 10% y un 20% si es de $1M o más.',
      },
    },
    {
      id: 'volgistics',
      text: {
        en: 'Volgistics: published price list unchanged since July 2020. It prices by records, not active volunteers — we assumed records ≈ active volunteers. Two admins included, $10/month for each additional one. The low figure adds only the VicNet volunteer portal; the high figure adds every module (portal, VicTouch time clock, VicDocs documents). No mobile app; free support is by email.',
        es: 'Volgistics: lista de precios publicada sin cambios desde julio de 2020. Cobra por registros, no por voluntarios activos; supusimos que los registros ≈ voluntarios activos. Incluye dos administradores, y cada uno adicional cuesta $10/mes. La cifra baja suma solo el portal de voluntarios VicNet; la alta suma todos los módulos (portal, reloj VicTouch y documentos VicDocs). No tiene app móvil; el soporte gratuito es por correo.',
      },
    },
    {
      id: 'others',
      text: {
        en: 'Not in the table: Better Impact (owned by The Brydon Group since November 2024), which has since bought Galaxy Digital’s Get Connected — both quote prices only on request. POINT, Golden and Timecounts have free plans, which cost less than Envolv for small programs.',
        es: 'Fuera de la tabla: Better Impact (de The Brydon Group desde noviembre de 2024), que luego compró Get Connected de Galaxy Digital; ambas solo dan precios a pedido. POINT, Golden y Timecounts tienen planes gratuitos, que cuestan menos que Envolv para programas pequeños.',
      },
    },
  ],
  sources: [
    SOURCES.civicChampsPricing,
    SOURCES.civicChampsTechSoup,
    SOURCES.civicChampsFitGap,
    SOURCES.volgisticsPrices,
    SOURCES.volgisticsSupport,
    SOURCES.corum,
    SOURCES.point,
    SOURCES.golden,
    SOURCES.timecounts,
  ] as Source[],
}
