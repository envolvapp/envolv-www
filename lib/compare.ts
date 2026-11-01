/**
 * The three dedicated comparison pages (brief §§5 and 8), both languages:
 *   /compare/volgistics-alternative-for-clinics
 *   /compare/get-connected-alternative
 *   /compare/envolv-vs-civic-champs
 * and the same under /es.
 *
 * Rules (DECISIONS 2026-10-31): named competitors appear only in dated,
 * sourced comparisons. Every competitor fact here traces to a page in
 * SOURCES (lib/content.ts), checked on AS_OF. Say plainly where the
 * competitor wins. Get Connected and Better Impact publish no prices, so that
 * page compares approach, transparency and features — never a guessed price.
 * Envolv claims follow the shipped-only rule in content.ts.
 *
 * Price rows are computed from BANDS / PRICE_POINTS so they can't drift from
 * the pricing section. When a competitor changes its prices, update
 * PRICE_POINTS and AS_OF, then re-read every sentence below that quotes a
 * number.
 */
import {
  ENTERPRISE,
  PRICE_POINTS,
  SOURCES,
  envolvMonthlyAt,
  num,
  usd,
  type Lang,
  type Source,
} from '@/lib/content'

export const COMPARE_SLUGS = [
  'volgistics-alternative-for-clinics',
  'get-connected-alternative',
  'envolv-vs-civic-champs',
] as const
export type CompareSlug = (typeof COMPARE_SLUGS)[number]

export function isCompareSlug(s: string): s is CompareSlug {
  return (COMPARE_SLUGS as readonly string[]).includes(s)
}

export type CompareTable = {
  caption: string
  /** Column headings. The first heads the row labels. */
  head: string[]
  /** Each row: [label, ...one cell per remaining column]. */
  rows: string[][]
  note?: string
}

export type CompareDoc = {
  /** Link text used from other pages. */
  navLabel: string
  metaTitle: string
  metaDescription: string
  title: string
  intro: string[]
  /** Name used in "Where X wins". */
  competitor: string
  prices?: { title: string; table: CompareTable; body?: string[] }
  glance: CompareTable
  wins: string[]
  envolv: string[]
  switching: string[]
  sources: Source[]
}

/** [active volunteers, Envolv, competitor] for each PRICE_POINT. */
function priceRows(lang: Lang, competitor: 'civicChamps' | 'volgistics'): string[][] {
  return PRICE_POINTS.map((p) => {
    const e = envolvMonthlyAt(p.actives)
    const envolv =
      e === null ? `${lang === 'es' ? 'Desde' : 'From'} ${usd(ENTERPRISE.floor)}` : usd(e)
    const other =
      competitor === 'civicChamps'
        ? usd(p.civicChamps)
        : `${usd(p.volgistics[0])}–${usd(p.volgistics[1])}`
    return [num(p.actives), envolv, other]
  })
}

const TRIAL_LINE = {
  en: 'Try any paid band free for 30 days, no card needed, before you change anything. If you don’t choose a band, the account moves to Free.',
  es: 'Prueba cualquier tramo pago gratis durante 30 días, sin tarjeta, antes de cambiar nada. Si no eliges un tramo, la cuenta pasa al plan Free.',
}

export const COMPARE: Record<CompareSlug, Record<Lang, CompareDoc>> = {
  /* ── Volgistics ──────────────────────────────────────────────────────── */
  'volgistics-alternative-for-clinics': {
    en: {
      navLabel: 'Volgistics alternative for clinics',
      metaTitle: 'A Volgistics alternative for free clinics — Envolv',
      metaDescription:
        'Envolv and Volgistics compared for free and charitable clinics: monthly prices from 50 to 1,000 volunteers, admins, add-ons, mobile app and support, with sources. Checked October 31, 2026.',
      title: 'A Volgistics alternative for free and charitable clinics',
      intro: [
        'Many free clinics run their volunteer program on Volgistics. It has been around a long time, and on sticker price it costs less than Envolv. This page shows where each one comes out ahead, using Volgistics’ own price list and help pages, so you can compare against your real bill.',
      ],
      competitor: 'Volgistics',
      prices: {
        title: 'Monthly price',
        table: {
          caption: 'Monthly price by number of active volunteers: Envolv and Volgistics with two admins',
          head: ['Active volunteers', 'Envolv', 'Volgistics, 2 admins'],
          rows: priceRows('en', 'volgistics'),
          note: 'Volgistics prices by records, not active volunteers; we assumed records ≈ active volunteers. Its low figure adds only the VicNet volunteer portal; the high figure adds every module (VicNet, the VicTouch time clock and VicDocs document storage). Envolv’s annual billing is about 17% lower than the monthly prices shown.',
        },
        body: [
          'Count your admins and add-ons. Volgistics includes two admins and charges $10 a month for each one after that. A clinic with 250 volunteers and six coordinators would pay $80–$95 a month on Volgistics ($40–$55 plus four extra admins) and $59 on Envolv. With only two admins, Volgistics costs less.',
        ],
      },
      glance: {
        caption: 'Envolv and Volgistics compared',
        head: ['', 'Envolv', 'Volgistics'],
        rows: [
          ['What you pay for', 'Active volunteers: anyone who served in the past 12 months', 'Every non-archived record, applicants and inactive volunteers included'],
          ['Archived records', 'Free, and kept until you delete them', '50 stored free; more storage is billed monthly'],
          ['Admins', 'Unlimited on every paid band', 'Two included; $10 a month for each additional admin'],
          ['Volunteer portal', 'Included', 'VicNet, a paid add-on'],
          ['Mobile app', 'An installable volunteer app with push notifications', 'None'],
          ['Clock-in', 'From the volunteer’s phone, with an on-site check', 'VicTouch time clock, a paid add-on'],
          ['Document storage', 'Included', 'VicDocs, a paid add-on'],
          ['Text messages', 'Not available', 'Available'],
          ['Support', 'Email with a 24-hour response target; priority support and an onboarding call from Professional up', 'Free email support; private live sessions cost extra'],
          ['Published prices', 'Yes', 'Yes — unchanged since July 2020'],
        ],
      },
      wins: [
        'Lower sticker price. With two admins, Volgistics costs less than Envolv at every size in the table — $12 to $17 a month at 50 volunteers, against Envolv’s $29.',
        'Prices that hold still: its published price list has not changed since July 2020.',
        'Text messaging and a time-clock module (VicTouch). Envolv does not send text messages and has no shared check-in station today.',
        'A long list of modules documented in its help topics, including awards, checklist items, site-level access for multi-site organizations and an opportunity directory.',
      ],
      envolv: [
        'Unlimited admins on every paid band, so every coordinator, shift lead and clinic manager can have their own login at no extra cost.',
        'You pay for active volunteers only. Applicants, inactive volunteers and archived records are free, and the archive never expires.',
        'The volunteer app, portal, phone clock-in and document storage are included. There are no add-on modules.',
        'Clinic-shaped records: licenses and certifications with expiry dates and automatic reminders, background-check status, training and the handbook signature, tracked as onboarding stages.',
        'Shifts limited to a role, push reminders before each shift, and full English and Spanish for volunteers and coordinators.',
        'Monthly billing with no setup fee, or about 17% off when billed annually.',
      ],
      switching: [
        'Leaving Volgistics? We import your existing volunteer records for you, free, and your first month is free.',
        TRIAL_LINE.en,
      ],
      sources: [SOURCES.volgisticsPrices, SOURCES.volgisticsSupport, SOURCES.volgisticsHelp],
    },
    es: {
      navLabel: 'Alternativa a Volgistics para clínicas',
      metaTitle: 'Una alternativa a Volgistics para clínicas gratuitas — Envolv',
      metaDescription:
        'Envolv y Volgistics comparados para clínicas gratuitas y benéficas: precios mensuales de 50 a 1,000 voluntarios, administradores, complementos, app móvil y soporte, con fuentes. Verificado el 31 de octubre de 2026.',
      title: 'Una alternativa a Volgistics para clínicas gratuitas y benéficas',
      intro: [
        'Muchas clínicas gratuitas manejan su programa de voluntariado con Volgistics. Lleva mucho tiempo en el mercado y, en precio de lista, cuesta menos que Envolv. Esta página muestra en qué gana cada uno, con la lista de precios y las páginas de ayuda de Volgistics, para que compares con lo que de verdad pagas.',
      ],
      competitor: 'Volgistics',
      prices: {
        title: 'Precio mensual',
        table: {
          caption: 'Precio mensual según el número de voluntarios activos: Envolv y Volgistics con dos administradores',
          head: ['Voluntarios activos', 'Envolv', 'Volgistics, 2 administradores'],
          rows: priceRows('es', 'volgistics'),
          note: 'Volgistics cobra por registros, no por voluntarios activos; supusimos que los registros ≈ voluntarios activos. Su cifra baja suma solo el portal de voluntarios VicNet; la alta suma todos los módulos (VicNet, el reloj VicTouch y el almacenamiento de documentos VicDocs). La facturación anual de Envolv cuesta alrededor de un 17% menos que los precios mensuales de la tabla.',
        },
        body: [
          'Cuenta tus administradores y complementos. Volgistics incluye dos administradores y cobra $10 al mes por cada uno adicional. Una clínica con 250 voluntarios y seis coordinadores pagaría $80–$95 al mes en Volgistics ($40–$55 más cuatro administradores adicionales) y $59 en Envolv. Con solo dos administradores, Volgistics cuesta menos.',
        ],
      },
      glance: {
        caption: 'Envolv y Volgistics comparados',
        head: ['', 'Envolv', 'Volgistics'],
        rows: [
          ['Por qué pagas', 'Voluntarios activos: quien participó en los últimos 12 meses', 'Cada registro no archivado, incluidas solicitudes y voluntarios inactivos'],
          ['Registros archivados', 'Gratis, y se guardan hasta que tú los borres', '50 gratis; más espacio se cobra cada mes'],
          ['Administradores', 'Ilimitados en todos los tramos pagos', 'Dos incluidos; $10 al mes por cada administrador adicional'],
          ['Portal de voluntarios', 'Incluido', 'VicNet, un complemento pagado'],
          ['App móvil', 'Una app para voluntarios que se instala en el teléfono, con notificaciones push', 'No tiene'],
          ['Registro de entrada', 'Desde el teléfono del voluntario, con verificación en el sitio', 'Reloj VicTouch, un complemento pagado'],
          ['Almacenamiento de documentos', 'Incluido', 'VicDocs, un complemento pagado'],
          ['Mensajes de texto', 'No disponible', 'Disponible'],
          ['Soporte', 'Por correo, con objetivo de respuesta de 24 h; soporte prioritario y llamada de bienvenida desde Professional', 'Soporte gratuito por correo; las sesiones privadas en vivo se cobran aparte'],
          ['Precios publicados', 'Sí', 'Sí, sin cambios desde julio de 2020'],
        ],
      },
      wins: [
        'Precio de lista más bajo. Con dos administradores, Volgistics cuesta menos que Envolv en todos los tamaños de la tabla: de $12 a $17 al mes con 50 voluntarios, frente a $29 en Envolv.',
        'Precios estables: su lista de precios publicada no cambia desde julio de 2020.',
        'Mensajes de texto y un módulo de reloj (VicTouch). Envolv no envía mensajes de texto ni tiene hoy un puesto compartido de registro.',
        'Una larga lista de módulos documentados en su ayuda, entre ellos reconocimientos, listas de verificación, acceso por sede para organizaciones con varias sedes y un directorio de oportunidades.',
      ],
      envolv: [
        'Administradores ilimitados en todos los tramos pagos, para que cada coordinador, responsable de turno y gerente de la clínica tenga su propio acceso sin costo extra.',
        'Solo pagas por voluntarios activos. Las solicitudes, los voluntarios inactivos y los registros archivados son gratis, y el archivo no vence.',
        'La app para voluntarios, el portal, el registro de entrada desde el teléfono y el almacenamiento de documentos están incluidos. No hay módulos adicionales.',
        'Registros pensados para clínicas: licencias y certificaciones con fecha de vencimiento y recordatorios automáticos, estado de verificación de antecedentes, capacitación y la firma del manual, organizados como etapas de incorporación.',
        'Turnos limitados a un rol, recordatorios push antes de cada turno, y todo en inglés y español para voluntarios y coordinadores.',
        'Facturación mensual sin cuota de instalación, o alrededor de un 17% menos con facturación anual.',
      ],
      switching: [
        '¿Dejas Volgistics? Importamos por ti tus registros de voluntarios actuales, gratis, y tu primer mes es gratis.',
        TRIAL_LINE.es,
      ],
      sources: [SOURCES.volgisticsPrices, SOURCES.volgisticsSupport, SOURCES.volgisticsHelp],
    },
  },

  /* ── Get Connected (Galaxy Digital) / Better Impact ──────────────────── */
  'get-connected-alternative': {
    en: {
      navLabel: 'Get Connected alternative',
      metaTitle: 'A Get Connected alternative with published prices — Envolv',
      metaDescription:
        'Envolv compared with Get Connected by Galaxy Digital and Better Impact: published prices, what gets billed, admins and features, with sources. Checked October 31, 2026.',
      title: 'A Get Connected alternative with published prices',
      intro: [
        'Get Connected by Galaxy Digital is a full-featured volunteer platform for volunteer centers, cities, hospitals and large nonprofits. It is now part of Better Impact, which The Brydon Group has owned since November 2024.',
        'Neither Get Connected nor Better Impact publishes prices: you book a call and get a quote. So this page compares approach, transparency and features — not prices we would have to guess.',
      ],
      competitor: 'Get Connected',
      glance: {
        caption: 'Envolv, Get Connected and Better Impact compared',
        head: ['', 'Envolv', 'Get Connected', 'Better Impact'],
        rows: [
          ['Published prices', 'Yes — $29 to $129 a month by size; Enterprise from $199', 'No — quote after a call', 'No — quote after a call'],
          ['What you pay for', 'Active volunteers: anyone who served in the past 12 months', 'Not published', 'Accepted and inactive profiles; applicants and archived profiles are free'],
          ['Admins', 'Unlimited on every paid band', 'Not published', '3, 10 or unlimited, by plan'],
          ['Feature tiers', 'None — every paid band has every feature', 'Not published', 'Three plans (Foundation, Growth, Impact) with different features'],
          ['Monthly billing', 'Yes; annual billing is about 17% off', 'Not published', 'Not published'],
        ],
        note: 'Better Impact’s column describes its Volunteer Impact product, from its features and plans page.',
      },
      wins: [
        'More features today. Get Connected’s site lists text messaging, volunteer check-in, liability waivers, event landing pages, background-check and Salesforce integrations, custom branding and service-learning tools. Envolv offers no text messaging, waivers, event landing pages or integrations today.',
        'Built for networks: it serves volunteer centers, United Ways, corporate volunteer programs and colleges. Envolv serves one organization per account today.',
        'A larger company behind it. Better Impact says Get Connected keeps the same platform and the same support team after the merger, so current customers don’t have to move.',
      ],
      envolv: [
        'Your price is on the page: $29 to $129 a month by active volunteers, with Enterprise from $199. No sales call needed to find out.',
        'One plan. Every paid band gets every feature and unlimited admins; only the price changes with size.',
        'Applicants, inactive volunteers and archived records are never billed, and the archive never expires.',
        'Monthly billing with no setup fee, or about 17% off when billed annually.',
        'Focused on clinics: credential tracking with expiry reminders, shifts limited to a role, background-check status and training as onboarding stages, and full English and Spanish.',
      ],
      switching: [
        'Leaving Get Connected? We import your existing volunteer records for you, free, and your first month is free.',
        TRIAL_LINE.en,
      ],
      sources: [SOURCES.getConnected, SOURCES.betterImpactGetConnected, SOURCES.betterImpactPlans, SOURCES.corum],
    },
    es: {
      navLabel: 'Alternativa a Get Connected',
      metaTitle: 'Una alternativa a Get Connected con precios publicados — Envolv',
      metaDescription:
        'Envolv comparado con Get Connected de Galaxy Digital y con Better Impact: precios publicados, qué se cobra, administradores y funciones, con fuentes. Verificado el 31 de octubre de 2026.',
      title: 'Una alternativa a Get Connected con precios publicados',
      intro: [
        'Get Connected de Galaxy Digital es una plataforma de voluntariado muy completa para centros de voluntariado, ciudades, hospitales y grandes organizaciones. Ahora es parte de Better Impact, que pertenece a The Brydon Group desde noviembre de 2024.',
        'Ni Get Connected ni Better Impact publican sus precios: agendas una llamada y te dan una cotización. Por eso esta página compara el enfoque, la transparencia y las funciones, no precios que tendríamos que adivinar.',
      ],
      competitor: 'Get Connected',
      glance: {
        caption: 'Envolv, Get Connected y Better Impact comparados',
        head: ['', 'Envolv', 'Get Connected', 'Better Impact'],
        rows: [
          ['Precios publicados', 'Sí: de $29 a $129 al mes según el tamaño; Enterprise desde $199', 'No: cotización después de una llamada', 'No: cotización después de una llamada'],
          ['Por qué pagas', 'Voluntarios activos: quien participó en los últimos 12 meses', 'No publicado', 'Perfiles aceptados e inactivos; las solicitudes y los perfiles archivados son gratis'],
          ['Administradores', 'Ilimitados en todos los tramos pagos', 'No publicado', '3, 10 o ilimitados, según el plan'],
          ['Niveles de funciones', 'Ninguno: todos los tramos pagos tienen todas las funciones', 'No publicado', 'Tres planes (Foundation, Growth, Impact) con funciones distintas'],
          ['Facturación mensual', 'Sí; la anual cuesta alrededor de un 17% menos', 'No publicado', 'No publicado'],
        ],
        note: 'La columna de Better Impact describe su producto Volunteer Impact, según su página de funciones y planes.',
      },
      wins: [
        'Más funciones hoy. El sitio de Get Connected menciona mensajes de texto, registro de voluntarios, exenciones de responsabilidad, páginas de eventos, integraciones con verificación de antecedentes y Salesforce, marca personalizada y herramientas de aprendizaje-servicio. Envolv no ofrece hoy mensajes de texto, exenciones, páginas de eventos ni integraciones.',
        'Hecho para redes: atiende a centros de voluntariado, United Ways, programas de voluntariado corporativo y universidades. Envolv atiende hoy a una sola organización por cuenta.',
        'Una empresa más grande detrás. Better Impact dice que Get Connected mantiene la misma plataforma y el mismo equipo de soporte después de la fusión, así que sus clientes actuales no tienen que mudarse.',
      ],
      envolv: [
        'Tu precio está en la página: de $29 a $129 al mes según tus voluntarios activos, y Enterprise desde $199. No hace falta una llamada de ventas para saberlo.',
        'Un solo plan. Todos los tramos pagos tienen todas las funciones y administradores ilimitados; solo el precio cambia con el tamaño.',
        'Las solicitudes, los voluntarios inactivos y los registros archivados nunca se cobran, y el archivo no vence.',
        'Facturación mensual sin cuota de instalación, o alrededor de un 17% menos con facturación anual.',
        'Pensado para clínicas: seguimiento de credenciales con avisos de vencimiento, turnos limitados a un rol, estado de verificación de antecedentes y capacitación como etapas de incorporación, y todo en inglés y español.',
      ],
      switching: [
        '¿Dejas Get Connected? Importamos por ti tus registros de voluntarios actuales, gratis, y tu primer mes es gratis.',
        TRIAL_LINE.es,
      ],
      sources: [SOURCES.getConnected, SOURCES.betterImpactGetConnected, SOURCES.betterImpactPlans, SOURCES.corum],
    },
  },

  /* ── Civic Champs ────────────────────────────────────────────────────── */
  'envolv-vs-civic-champs': {
    en: {
      navLabel: 'Envolv vs. Civic Champs',
      metaTitle: 'Envolv vs. Civic Champs — prices and features compared',
      metaDescription:
        'Envolv and Civic Champs compared: monthly prices from 50 to 1,000 active volunteers, setup fees, billing, kiosk check-in and clinic features, with sources. Checked October 31, 2026.',
      title: 'Envolv vs. Civic Champs',
      intro: [
        'Civic Champs is the product closest to Envolv in how it charges: both bill by active volunteers and include unlimited admins. The differences are in price, billing terms and features. Civic Champs’ figures come from its own pricing and TechSoup pages.',
      ],
      competitor: 'Civic Champs',
      prices: {
        title: 'Monthly price',
        table: {
          caption: 'Monthly price by number of active volunteers: Envolv and Civic Champs list price',
          head: ['Active volunteers', 'Envolv', 'Civic Champs (list price)'],
          rows: priceRows('en', 'civicChamps'),
          note: 'Civic Champs bills annually (quarterly and three-year terms are also offered) and adds a one-time setup fee its pricing page shows as “$199” and “$399” without saying which applies. Envolv’s prices are monthly; annual billing is about 17% lower.',
        },
        body: [
          'Through TechSoup, new U.S. 501(c)(3) customers with budgets under $1M get 50% off a one-year Civic Champs contract: $49.50 a month at 250 active volunteers and $62 at 500, below Envolv’s monthly prices of $59 and $89. Budgets of $1M or more get 10–20% off.',
        ],
      },
      glance: {
        caption: 'Envolv and Civic Champs compared',
        head: ['', 'Envolv', 'Civic Champs'],
        rows: [
          ['What you pay for', 'Volunteers active in the past 12 months', 'Volunteers active in the past year'],
          ['Admins', 'Unlimited', 'Unlimited'],
          ['Billing', 'Monthly, or annual at about 17% off', 'Annual; quarterly and three-year terms also offered'],
          ['Setup fee', 'None', 'One-time fee, shown as $199 and $399'],
          ['Kiosk check-in', 'Not available — volunteers clock in from their own phones', 'Included'],
          ['Importing your records', 'Done for you, included in every paid band', 'A paid add-on'],
          ['Text messages', 'Not available', 'Text credits, a paid add-on'],
          ['Integrations', 'None', 'Little Green Light included; Blackbaud a paid add-on; Salesforce and DonorPerfect in beta'],
        ],
      },
      wins: [
        'Kiosk check-in is included at every band. Envolv has no shared check-in station today; volunteers clock in from their own phones.',
        'Cheaper at 1,000 to 1,499 active volunteers: $174 a month, against Envolv’s Enterprise pricing from $199.',
        'For new U.S. 501(c)(3)s with budgets under $1M, the TechSoup discount halves the first year and puts Civic Champs below Envolv’s monthly price from 250 active volunteers up.',
        'More built-in tools: digital waivers, reflections and questionnaires, event management, and integrations with Little Green Light (included) and Blackbaud (add-on).',
      ],
      envolv: [
        'Lower list price from 50 to 750 active volunteers — $29 against $74 at 50, and $89 against $124 at 500.',
        'Monthly billing and no setup fee. Annual billing is optional and about 17% off.',
        'A white-glove import of your existing records in every paid band; at Civic Champs, data import is an add-on.',
        'Clinic-shaped records: licenses and certifications with expiry dates and automatic reminders, background-check status, training and the handbook signature, tracked as onboarding stages.',
        'Shifts limited to a role, phone clock-in with an on-site check, push reminders, and full English and Spanish.',
        'Archived records are free and never expire.',
      ],
      switching: [
        'Every paid band includes a white-glove import of your existing volunteer records. Moving from Volgistics or Get Connected instead? Your first month is free, too.',
        TRIAL_LINE.en,
      ],
      sources: [SOURCES.civicChampsPricing, SOURCES.civicChampsTechSoup, SOURCES.civicChampsFitGap],
    },
    es: {
      navLabel: 'Envolv vs. Civic Champs',
      metaTitle: 'Envolv vs. Civic Champs — precios y funciones comparados',
      metaDescription:
        'Envolv y Civic Champs comparados: precios mensuales de 50 a 1,000 voluntarios activos, cuotas de instalación, facturación, quiosco de registro y funciones para clínicas, con fuentes. Verificado el 31 de octubre de 2026.',
      title: 'Envolv vs. Civic Champs',
      intro: [
        'Civic Champs es el producto más parecido a Envolv en su forma de cobrar: los dos cobran por voluntarios activos e incluyen administradores ilimitados. Las diferencias están en el precio, las condiciones de facturación y las funciones. Las cifras de Civic Champs vienen de sus propias páginas de precios y de TechSoup.',
      ],
      competitor: 'Civic Champs',
      prices: {
        title: 'Precio mensual',
        table: {
          caption: 'Precio mensual según el número de voluntarios activos: Envolv y el precio de lista de Civic Champs',
          head: ['Voluntarios activos', 'Envolv', 'Civic Champs (precio de lista)'],
          rows: priceRows('es', 'civicChamps'),
          note: 'Civic Champs factura de forma anual (también ofrece plazos trimestrales y de tres años) y suma una cuota única de instalación que su página de precios muestra como “$199” y “$399”, sin decir cuál aplica. Los precios de Envolv son mensuales; la facturación anual cuesta alrededor de un 17% menos.',
        },
        body: [
          'A través de TechSoup, los clientes nuevos de EE. UU. con estatus 501(c)(3) y presupuesto menor de $1M obtienen un 50% de descuento en un contrato de un año con Civic Champs: $49.50 al mes con 250 voluntarios activos y $62 con 500, por debajo de los precios mensuales de Envolv de $59 y $89. Con presupuestos de $1M o más, el descuento es de entre un 10% y un 20%.',
        ],
      },
      glance: {
        caption: 'Envolv y Civic Champs comparados',
        head: ['', 'Envolv', 'Civic Champs'],
        rows: [
          ['Por qué pagas', 'Voluntarios activos en los últimos 12 meses', 'Voluntarios activos en el último año'],
          ['Administradores', 'Ilimitados', 'Ilimitados'],
          ['Facturación', 'Mensual, o anual con alrededor de un 17% menos', 'Anual; también plazos trimestrales y de tres años'],
          ['Cuota de instalación', 'Ninguna', 'Cuota única, que muestra como $199 y $399'],
          ['Quiosco de registro', 'No disponible: los voluntarios registran su entrada desde su propio teléfono', 'Incluido'],
          ['Importar tus registros', 'Lo hacemos por ti, incluido en todos los tramos pagos', 'Un complemento pagado'],
          ['Mensajes de texto', 'No disponible', 'Créditos de texto, un complemento pagado'],
          ['Integraciones', 'Ninguna', 'Little Green Light incluida; Blackbaud como complemento pagado; Salesforce y DonorPerfect en beta'],
        ],
      },
      wins: [
        'El quiosco de registro está incluido en todos los tramos. Envolv no tiene hoy un puesto compartido de registro; los voluntarios registran su entrada desde su propio teléfono.',
        'Más barato entre 1,000 y 1,499 voluntarios activos: $174 al mes, frente al precio de Enterprise de Envolv desde $199.',
        'Para organizaciones 501(c)(3) nuevas de EE. UU. con presupuesto menor de $1M, el descuento de TechSoup reduce a la mitad el primer año y deja a Civic Champs por debajo del precio mensual de Envolv desde 250 voluntarios activos.',
        'Más herramientas incluidas: exenciones digitales, reflexiones y cuestionarios, gestión de eventos, e integraciones con Little Green Light (incluida) y Blackbaud (complemento).',
      ],
      envolv: [
        'Precio de lista más bajo de 50 a 750 voluntarios activos: $29 frente a $74 con 50, y $89 frente a $124 con 500.',
        'Facturación mensual y sin cuota de instalación. La facturación anual es opcional y cuesta alrededor de un 17% menos.',
        'Importamos por ti tus registros actuales en todos los tramos pagos; en Civic Champs, la importación de datos es un complemento.',
        'Registros pensados para clínicas: licencias y certificaciones con fecha de vencimiento y recordatorios automáticos, estado de verificación de antecedentes, capacitación y la firma del manual, organizados como etapas de incorporación.',
        'Turnos limitados a un rol, registro de entrada desde el teléfono con verificación en el sitio, recordatorios push, y todo en inglés y español.',
        'Los registros archivados son gratis y no vencen.',
      ],
      switching: [
        'Todos los tramos pagos incluyen la importación de tus registros de voluntarios actuales, hecha por nosotros. ¿Vienes de Volgistics o de Get Connected? Tu primer mes también es gratis.',
        TRIAL_LINE.es,
      ],
      sources: [SOURCES.civicChampsPricing, SOURCES.civicChampsTechSoup, SOURCES.civicChampsFitGap],
    },
  },
}
