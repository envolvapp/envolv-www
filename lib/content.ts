/**
 * Single source of truth for everything the site claims, in both languages.
 *
 * Verticals trace to industry-targeting-strategy.pdf (medvolunteer repo root).
 *
 * Tier ladder revised 2026-10-30 at the first all-hands (supersedes 2026-08-20):
 * Free ≤25 / Starter $29 ≤100 / Growth $59 ≤250 / Professional $89 ≤500 /
 * Premier $129 ≤750 / Enterprise custom from $199 above 750. Annual ≈17% off.
 *
 * What counts toward a limit (also decided 2026-10-30): EVERYONE on file —
 * applicants, active and inactive volunteers. Archived profiles are free for
 * up to 12 months; after that they are deleted, with 30 days' notice and an
 * export first. This replaced the old "active volunteers only, archived free
 * forever" rule, so the comparison row and the pricing footnote say so.
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
 * Shipped-only rule (2026-10-30, replaces the 2026-10-26 "Soon" badges): the
 * pricing cards list only what the product does TODAY. Roadmap items (SMS,
 * industry templates, kiosk, API, roles, white-label, multi-org, SSO, a
 * background-check provider integration, live chat — ROADMAP F3–F13) are not
 * on the site at all. When one ships, add it to the tier it belongs to.
 * Things the team delivers by hand (support, onboarding calls, data
 * migration, a CSM) count as shipped.
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
 * 2026-11-23 (flip `show` to true). The industries section's clinic card makes
 * a similar "running live" claim — revisit both together.
 */
export const HERO_BADGE = {
  show: false,
  text: {
    en: 'Live today at a free medical clinic — and built for what’s next',
    es: 'Ya en uso en una clínica médica gratuita — y hecho para lo que viene',
  } as L,
}

/* ── Plans ──────────────────────────────────────────────────────────────── */

/** "Up to 100 volunteers" / "Hasta 100 voluntarios". */
export function volunteersLabel(limit: number, lang: Lang): string {
  const n = limit.toLocaleString('en-US')
  return lang === 'es' ? `Hasta ${n} voluntarios` : `Up to ${n} volunteers`
}

/** "2 admin seats" / "2 administradores". */
export function seatsLabel(seats: number, lang: Lang): string {
  if (lang === 'es') return seats === 1 ? '1 administrador' : `${seats} administradores`
  return seats === 1 ? '1 admin seat' : `${seats} admin seats`
}

export type Tier = {
  name: string // plan names stay in English in both languages (invoices, contracts)
  monthly: number
  annualMonthly: number // billed annually, ~17% off (≈2 months free)
  limit: number
  seats: number
  tagline: L
  /** Heading above the list, e.g. "Everything in Starter, plus". */
  includes?: L
  features: L[]
  featured?: boolean
}

/**
 * The Free plan renders as a slim strip, not a card — it's the on-ramp, not
 * the hero.
 */
export const FREE_TIER = {
  name: 'Free',
  limit: 25,
  seats: 1,
  blurb: {
    en: 'Scheduling, hour tracking, and the volunteer mobile app — free for good. No credit card, no trial clock.',
    es: 'Turnos, registro de horas y la app móvil para voluntarios — gratis para siempre. Sin tarjeta de crédito ni periodo de prueba.',
  } as L,
}

export const TIERS: Tier[] = [
  {
    name: 'Starter',
    monthly: 29,
    annualMonthly: 24,
    limit: 100,
    seats: 2,
    tagline: {
      en: 'For small teams that outgrew the spreadsheet.',
      es: 'Para equipos pequeños que ya superaron la hoja de cálculo.',
    },
    features: [
      { en: 'Volunteer self-service portal', es: 'Portal de autoservicio para voluntarios' },
      { en: 'Mobile app for volunteers', es: 'App móvil para voluntarios' },
      { en: 'Scheduling & hour tracking', es: 'Turnos y registro de horas' },
      { en: 'Standard reporting', es: 'Informes estándar' },
      { en: 'Email & push notifications', es: 'Notificaciones por correo y push' },
      { en: 'Email support (48hr)', es: 'Soporte por correo (48 h)' },
    ],
  },
  {
    name: 'Growth',
    monthly: 59,
    annualMonthly: 49,
    limit: 250,
    seats: 5,
    featured: true,
    tagline: {
      en: 'For established programs — where most nonprofits actually live.',
      es: 'Para programas establecidos — donde está la mayoría de las organizaciones.',
    },
    includes: { en: 'Everything in Starter, plus', es: 'Todo lo de Starter, más' },
    features: [
      { en: 'Advanced scheduling & approvals', es: 'Turnos avanzados y aprobaciones' },
      { en: 'Custom reports', es: 'Informes personalizados' },
      { en: 'Background check tracking', es: 'Seguimiento de verificación de antecedentes' },
      { en: 'Logo branding', es: 'Tu logo en la app' },
      { en: 'Email support (24hr)', es: 'Soporte por correo (24 h)' },
    ],
  },
  {
    name: 'Professional',
    monthly: 89,
    annualMonthly: 74,
    limit: 500,
    seats: 10,
    tagline: {
      en: 'For large, multi-program operations.',
      es: 'Para operaciones grandes con varios programas.',
    },
    includes: { en: 'Everything in Growth, plus', es: 'Todo lo de Growth, más' },
    features: [
      { en: 'Geofenced clock-in', es: 'Registro de entrada con geovalla' },
      { en: 'CSV data exports', es: 'Exportación de datos en CSV' },
      { en: 'Priority support + onboarding call', es: 'Soporte prioritario + llamada de bienvenida' },
    ],
  },
  {
    name: 'Premier',
    monthly: 129,
    annualMonthly: 107,
    limit: 750,
    seats: 15,
    tagline: {
      en: 'For the biggest single-site programs.',
      es: 'Para los programas más grandes en una sola sede.',
    },
    includes: { en: 'Everything in Professional, plus', es: 'Todo lo de Professional, más' },
    features: [
      {
        en: 'Help importing your existing volunteer records',
        es: 'Ayuda para importar tus registros de voluntarios',
      },
    ],
  },
]

/** Above the top wall. Rendered as a strip under the cards. */
export const ENTERPRISE = {
  name: 'Enterprise',
  over: 750,
  floor: 199,
  tagline: {
    en: 'For networks, agencies, and government.',
    es: 'Para redes, agencias y gobierno.',
  } as L,
  summary: {
    en: 'Unlimited admin seats, custom integrations, a security review & DPA, and a dedicated CSM with an SLA.',
    es: 'Administradores ilimitados, integraciones a medida, revisión de seguridad y DPA, y un gerente de cuenta dedicado con SLA.',
  } as L,
}

/** The rules under the pricing grid. Keep in step with the header comment. */
export const PLAN_RULES = {
  includes: {
    en: 'Every plan includes the volunteer mobile app, the self-service portal, and full English and Spanish. No setup fees, no contracts.',
    es: 'Todos los planes incluyen la app móvil para voluntarios, el portal de autoservicio y todo en inglés y español. Sin cuotas de instalación ni contratos.',
  } as L,
  counting: {
    en: 'Limits count everyone on file, applicants included. Archive anyone you’re not working with right now — archived profiles are free for up to a year.',
    es: 'Los límites cuentan a todas las personas registradas, incluidas las solicitudes. Archiva a quien no esté participando ahora — los perfiles archivados son gratis hasta por un año.',
  } as L,
}

/* ── Industries & features ──────────────────────────────────────────────── */

export const VERTICALS = [
  {
    // `value` is what the demo form stores in Notion's Industry select —
    // always English so the select options don't fork by language.
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
      en: 'A flexible catch-all template: events, recurring programs, and one-off drives, without the setup tax.',
      es: 'Una configuración flexible para todo: eventos, programas recurrentes y campañas puntuales, sin el trabajo de montarlo.',
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
    value: 'Clinics & healthcare',
    name: { en: 'Clinics & healthcare', es: 'Clínicas y salud' },
    blurb: {
      en: 'Credential tracking, background checks, and onboarding stages — already running live at a free clinic today.',
      es: 'Seguimiento de credenciales, verificación de antecedentes y etapas de incorporación — ya en uso en una clínica gratuita.',
    },
    icon: 'Stethoscope' as const,
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

export type ComparisonRow = { label: L; envolv: L; modern: L; legacy: L }

/**
 * Competitor comparison — verified against published pricing (see header).
 * Three columns: us, the modern platforms we actually compete with on
 * product, and the legacy à-la-carte incumbent that competes on sticker price.
 * Legacy at 500 volunteers / 10 admins = $30–55 (bare / all add-ons) + 8 extra
 * admins × $10.
 */
export const COMPARISON = {
  note: {
    en: 'Figures verified August 20, 2026. Modern platforms: VolunteerHub published pricing (Plus from $143/mo, Pro from $288/mo, billed annually plus a setup fee); Better Impact and Get Connected (merged March 2026) are quote-only annual contracts. Legacy: Volgistics published price list (unchanged since July 2020) — the volunteer portal, time clock, and document storage are separate add-ons, and each admin beyond two costs $10/mo. Envolv limits count everyone on file; archived profiles are free for up to a year.',
    es: 'Cifras verificadas el 20 de agosto de 2026. Plataformas modernas: precios publicados de VolunteerHub (Plus desde $143/mes, Pro desde $288/mes, facturación anual más cuota de instalación); Better Impact y Get Connected (fusionadas en marzo de 2026) solo cotizan contratos anuales. Tradicional: lista de precios publicada de Volgistics (sin cambios desde julio de 2020) — el portal de voluntarios, el reloj de asistencia y el almacenamiento de documentos son complementos aparte, y cada administrador después del segundo cuesta $10/mes. Los límites de Envolv cuentan a todas las personas registradas; los perfiles archivados son gratis hasta por un año.',
  } as L,
  rows: [
    {
      label: { en: 'Starting price', es: 'Precio inicial' },
      envolv: { en: 'Free up to 25 volunteers — paid from $29/mo', es: 'Gratis hasta 25 voluntarios — planes pagos desde $29/mes' },
      modern: { en: '$143/mo + setup fee', es: '$143/mes + cuota de instalación' },
      legacy: { en: '$9/mo bare — $17 with add-ons', es: '$9/mes básico — $17 con complementos' },
    },
    {
      label: { en: '250 volunteers, 5 admins', es: '250 voluntarios, 5 administradores' },
      envolv: { en: '$59/mo', es: '$59/mes' },
      modern: { en: '$143+/mo + setup fee', es: '$143+/mes + cuota de instalación' },
      legacy: { en: '$70–85/mo with add-ons + admin fees', es: '$70–85/mes con complementos + cuotas por administrador' },
    },
    {
      label: { en: '500 volunteers, 10 admins', es: '500 voluntarios, 10 administradores' },
      envolv: { en: '$89/mo', es: '$89/mes' },
      modern: { en: '$143–288/mo + setup fee', es: '$143–288/mes + cuota de instalación' },
      legacy: { en: '$110–135/mo with add-ons + admin fees', es: '$110–135/mes con complementos + cuotas por administrador' },
    },
    {
      label: { en: 'Billing', es: 'Facturación' },
      envolv: { en: 'Monthly or annual, cancel anytime', es: 'Mensual o anual, cancela cuando quieras' },
      modern: { en: 'Annual contract + setup fee', es: 'Contrato anual + cuota de instalación' },
      legacy: { en: 'Monthly', es: 'Mensual' },
    },
    {
      label: { en: 'Mobile app', es: 'App móvil' },
      envolv: { en: 'Included on every plan', es: 'Incluida en todos los planes' },
      modern: { en: 'Included', es: 'Incluida' },
      legacy: { en: 'None', es: 'No tiene' },
    },
    {
      label: { en: 'Volunteer portal', es: 'Portal de voluntarios' },
      envolv: { en: 'Included on every plan', es: 'Incluido en todos los planes' },
      modern: { en: 'Included', es: 'Incluido' },
      legacy: { en: 'Paid add-on', es: 'Complemento pagado' },
    },
    {
      label: { en: 'Admin seats', es: 'Administradores' },
      envolv: { en: 'Included per tier', es: 'Incluidos según el plan' },
      modern: { en: 'Scales with plan price', es: 'Aumentan con el precio del plan' },
      legacy: { en: '$10/mo each beyond two', es: '$10/mes cada uno después del segundo' },
    },
    {
      label: { en: 'Archived records', es: 'Registros archivados' },
      envolv: { en: 'Free for up to a year', es: 'Gratis hasta por un año' },
      modern: { en: 'Varies; often counted', es: 'Varía; suelen contar' },
      legacy: { en: 'Counted like active records', es: 'Cuentan igual que los activos' },
    },
    {
      label: { en: 'Support', es: 'Soporte' },
      envolv: { en: 'Email support, priority by tier', es: 'Soporte por correo, prioridad según el plan' },
      modern: { en: 'Varies by plan', es: 'Varía según el plan' },
      legacy: { en: 'Email only', es: 'Solo por correo' },
    },
  ] as ComparisonRow[],
}
