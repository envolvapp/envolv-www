/**
 * The Privacy Policy (envolv.org/privacy and envolv.org/es/privacy), both
 * languages in one file like the rest of the site's copy.
 *
 * Every factual claim here describes what the code actually does — keep them in
 * step. Where each one comes from (medvolunteer repo unless noted):
 *   - Clock-in location: lib/geofence.ts + lib/geolocation-client.ts. The phone's
 *     position is compared on the server and only the result (geofence|manual)
 *     is stored on time_entries; coordinates are never saved.
 *   - Application IP address: app/apply/actions.ts → application_submissions
 *     .ip_address (rate limiting).
 *   - Push: push_subscriptions (browser push endpoint + keys), lib/push.ts.
 *   - Passwords: Supabase Auth (bcrypt hash); the app never sees them.
 *   - Analytics: @vercel/analytics + speed-insights in the app's root layout;
 *     this site loads none.
 *   - Demo requests: envolv-www app/actions.ts → Resend email + Notion "Website
 *     Leads" (lib/leads.ts). support@ mail: app/api/inbound (Resend inbox).
 *   - Subprocessors, 72-hour incident notice, 30/60-day export and deletion,
 *     12-month archive rule: Subscription Agreement v1.1 §§1.2, 4.4, 5.4, 5.7, 6.2.
 *   - Data location: Supabase production project region us-west-1.
 *
 * If one of those changes (a new subprocessor, a payment processor, a
 * background-check integration, stored coordinates…), change this file the
 * same day and bump UPDATED. Material changes also need notice to customers
 * (section "Changes").
 */
import type { Lang } from '@/lib/content'

export type PrivacyItem = { lead?: string; text: string }
export type PrivacyBlock = { p: string } | { list: PrivacyItem[] }
export type PrivacySection = { id: string; heading: string; blocks: PrivacyBlock[] }
export type PrivacyDoc = {
  title: string
  updatedLabel: string
  updated: string
  intro: string[]
  tocLabel: string
  sections: PrivacySection[]
}

/** The date the current text took effect. Bump it with every change. */
export const UPDATED_ISO = '2026-10-31'

export const PRIVACY: Record<Lang, PrivacyDoc> = {
  en: {
    title: 'Privacy Policy',
    updatedLabel: 'Last updated',
    updated: 'October 31, 2026',
    tocLabel: 'On this page',
    intro: [
      'Envolv, LLC (“Envolv,” “we,” “us”) makes volunteer-management software. This policy explains what information we handle, why, who we share it with, and the choices you have. We’ve kept it in plain language on purpose.',
      'It covers this website (envolv.org), our live demo, and the Envolv app — the coordinator dashboard and the volunteer app — including app sites we run for an organization under that organization’s own name.',
    ],
    sections: [
      {
        id: 'roles',
        heading: 'The two roles we play',
        blocks: [
          {
            list: [
              {
                lead: 'For organizations that use Envolv.',
                text: 'When a clinic, shelter, food bank, museum or other organization uses Envolv, that organization decides what volunteer information to collect and how to use it. We store and process that information on the organization’s behalf, under our agreement with it, as its service provider. If you volunteer (or applied to volunteer) with an organization that uses Envolv, that organization is your first contact about your information — and we will help it answer you.',
              },
              {
                lead: 'For our own website and customers.',
                text: 'For visitors to this website, people who request a demo or email us, and the people who sign up for and manage an Envolv account, we decide how information is used, and this policy describes it directly.',
              },
            ],
          },
        ],
      },
      {
        id: 'app',
        heading: 'Information in the Envolv app',
        blocks: [
          { p: 'Depending on what your organization uses, the app may hold:' },
          {
            list: [
              { lead: 'Contact and profile details:', text: 'name, email, phone, photo, preferred language, and an emergency contact.' },
              {
                lead: 'Your volunteer application:',
                text: 'your answers to the organization’s application form (the organization chooses the questions), plus the date and the IP address it was sent from, which we keep to block spam.',
              },
              {
                lead: 'Your volunteer record:',
                text: 'roles, status, onboarding steps, notes and flags added by coordinators, background-check status, date and reference number (checks themselves are run by consumer reporting agencies, not by us), and credentials such as license numbers and expiration dates.',
              },
              {
                lead: 'Documents:',
                text: 'files uploaded to your profile by you or your organization, such as a license or certificate. Some organizations ask for health-related records — see “Consumer health data” below.',
              },
              {
                lead: 'Your activity:',
                text: 'shifts you sign up for, clock-in and clock-out times and hours, your handbook acknowledgment (the name you type and when), training progress and quiz scores, and messages your organization sends you.',
              },
              { lead: 'Your login:', text: 'your email address. Passwords are stored by our login provider as a one-way hash; nobody at Envolv or your organization can read them.' },
              {
                lead: 'Location at clock-in, only if you allow it:',
                text: 'when a shift’s location has a boundary set, the volunteer app asks your phone for its location at the moment you clock in. We compare it with the boundary and keep only whether you were on site. We do not store your coordinates, and we do not track your location at any other time. You can say no and still clock in.',
              },
              {
                lead: 'Notifications, only if you turn them on:',
                text: 'a device token from your browser’s push service, so we can send shift reminders and your organization’s messages. You can turn notifications off at any time in your phone or browser settings.',
              },
              {
                lead: 'Technical information:',
                text: 'like most websites, our hosting providers record things such as IP address, browser type and the pages requested, to run and secure the service. The app uses Vercel’s web analytics, which counts page visits without cookies. This website uses no analytics at all.',
              },
            ],
          },
          {
            p: 'We use this information only to provide the service to your organization — scheduling, hour tracking, onboarding, messaging and reports — and to support, secure and fix it. We may use data that has been aggregated or de-identified so that it does not identify anyone, such as overall usage numbers, to improve Envolv.',
          },
          {
            p: 'We do not sell personal information, we do not share it for targeted advertising, and we do not use volunteers’ contact details to market to them.',
          },
        ],
      },
      {
        id: 'website',
        heading: 'Information from our website and customers',
        blocks: [
          {
            list: [
              {
                lead: 'Demo requests:',
                text: 'your name, email, organization, industry, approximate number of volunteers and any notes. They are emailed to the Envolv founders and saved in our sales records (we use Notion for these). If you give your email on the live-demo page, it is saved the same way.',
              },
              { lead: 'Email to support@envolv.org:', text: 'we receive and keep your message so we can answer it.' },
              {
                lead: 'Customer accounts:',
                text: 'the names and contact details of the people who sign up for and manage an Envolv account, and billing records. We bill by invoice today; if we add card payments, a payment processor will handle card numbers and we will not see them.',
              },
              {
                lead: 'The live demo:',
                text: 'the demo is one shared sandbox that everyone can see, and it resets every night. Please don’t enter real personal information there.',
              },
            ],
          },
          {
            p: 'We use this information to respond to you, to run demos and onboarding, to follow up about your request, and to run our business. If we email you about Envolv and you’d rather we didn’t, say so and we’ll stop. This website sets no advertising or analytics cookies.',
          },
        ],
      },
      {
        id: 'sharing',
        heading: 'Who we share information with',
        blocks: [
          {
            list: [
              { lead: 'Your organization.', text: 'Its administrators and coordinators see the volunteer records in its account.' },
              {
                lead: 'Service providers that run Envolv for us:',
                text: 'Supabase (database, login and file storage), Vercel (app and website hosting, and the app’s analytics), Resend (email delivery and our support inbox), the push service of your browser or device maker (such as Apple, Google or Mozilla) for notifications, and Notion (our sales records — demo requests only, never volunteer records). They may use the information only to provide their service to us.',
              },
              { lead: 'Background-check agencies,', text: 'only if your organization uses one, under that agency’s own terms and privacy policy.' },
              {
                lead: 'When the law requires it,',
                text: 'or when needed to protect someone’s safety or rights, or to prevent fraud or abuse.',
              },
              {
                lead: 'If Envolv is sold or merges,',
                text: 'information may move to the new owner, who must keep honoring this policy for it.',
              },
            ],
          },
          { p: 'We don’t share personal information with anyone else.' },
        ],
      },
      {
        id: 'health',
        heading: 'Consumer health data',
        blocks: [
          {
            p: 'Some organizations collect health-related information about their volunteers — for example, immunization or TB-test records, or the results of a health screening. Washington’s My Health My Data Act and similar state laws call this “consumer health data.”',
          },
          {
            list: [
              {
                lead: 'How we handle it:',
                text: 'we process it only for the organization that collected it, on that organization’s instructions and to provide the service. We never sell it, and we share it only with the service providers above that store or deliver it.',
              },
              { lead: 'Who can see it:', text: 'the organization’s authorized staff, and Envolv staff only when needed to support or secure the service.' },
              {
                lead: 'Your rights:',
                text: 'you can ask to see or delete your consumer health data, or withdraw a consent you gave. Contact your organization, or email us and we will pass your request to them and help them respond.',
              },
            ],
          },
        ],
      },
      {
        id: 'retention',
        heading: 'How long we keep information',
        blocks: [
          {
            list: [
              {
                lead: 'App records',
                text: 'stay for as long as the organization keeps its account. The organization can change or delete records at any time. A profile the organization archives may be deleted after 12 months in the archive, after the organization is notified.',
              },
              {
                lead: 'When an organization leaves Envolv,',
                text: 'it can export its data for 30 days, and we delete it from our live systems within 60 days. Copies in backups are deleted on the normal backup cycle.',
              },
              {
                lead: 'Demo requests and support email',
                text: 'are kept as long as they’re useful for the conversation and our records. Ask us and we’ll delete them.',
              },
              { lead: 'Technical logs', text: 'are kept by our hosting providers for a limited time.' },
            ],
          },
        ],
      },
      {
        id: 'security',
        heading: 'How we protect information',
        blocks: [
          {
            p: 'Information is encrypted in transit and at rest. Each organization’s records are kept separate, our database refuses access by default except through the app’s own permission checks, and staff access is limited to what the work requires. No system is perfectly secure; if a security incident affects personal information, we tell the affected organization within 72 hours of confirming it, and you will be notified as the law requires.',
          },
        ],
      },
      {
        id: 'choices',
        heading: 'Your choices and rights',
        blocks: [
          {
            list: [
              {
                lead: 'Volunteers:',
                text: 'you can see and update your contact details, emergency contact and language in the volunteer app’s Profile tab. To see, correct or delete anything else, ask your organization — or email us and we will pass your request to them and help.',
              },
              {
                lead: 'Everyone else:',
                text: 'email us to see, correct or delete the information we hold about you. We will answer within the time the law requires, and we never treat you differently for asking.',
              },
              {
                lead: 'Location and notifications',
                text: 'are always optional and can be turned off in your phone or browser settings.',
              },
            ],
          },
        ],
      },
      {
        id: 'children',
        heading: 'Children and teens',
        blocks: [
          {
            p: 'Some volunteer programs include teenagers. An organization that enters a minor’s information is responsible for getting any parental or guardian consent the law requires. Envolv is not directed to children under 13. If you believe a child’s information was entered without the required consent, contact the organization or email us and we will help delete it.',
          },
        ],
      },
      {
        id: 'where',
        heading: 'Where information is stored',
        blocks: [
          {
            p: 'Envolv is based in the United States, and our service providers store the information in the United States. If you use Envolv from another country, your information is transferred to and stored in the United States.',
          },
        ],
      },
      {
        id: 'changes',
        heading: 'Changes to this policy',
        blocks: [
          {
            p: 'When we change this policy, we post the new version here with a new date. If a change is significant, we tell the organizations that use Envolv before it takes effect.',
          },
        ],
      },
      {
        id: 'contact',
        heading: 'Contact us',
        blocks: [
          {
            p: 'Questions or requests: support@envolv.org. Envolv, LLC is a North Carolina limited liability company based in Buncombe County, North Carolina.',
          },
        ],
      },
    ],
  },

  es: {
    title: 'Política de privacidad',
    updatedLabel: 'Última actualización',
    updated: '31 de octubre de 2026',
    tocLabel: 'En esta página',
    intro: [
      'Envolv, LLC (“Envolv”, “nosotros”) crea software para gestionar voluntarios. Esta política explica qué información manejamos, para qué, con quién la compartimos y qué opciones tienes. La escribimos en lenguaje sencillo a propósito.',
      'Cubre este sitio web (envolv.org), nuestra demo en vivo y la app de Envolv —el panel del coordinador y la app para voluntarios—, incluidos los sitios de la app que operamos para una organización con el nombre de esa organización.',
      'Si esta traducción y la versión en inglés no coinciden, rige la versión en inglés.',
    ],
    sections: [
      {
        id: 'roles',
        heading: 'Los dos papeles que cumplimos',
        blocks: [
          {
            list: [
              {
                lead: 'Para las organizaciones que usan Envolv.',
                text: 'Cuando una clínica, un refugio, un banco de alimentos, un museo u otra organización usa Envolv, esa organización decide qué información de sus voluntarios recopila y cómo la usa. Nosotros guardamos y procesamos esa información en nombre de la organización, según nuestro contrato con ella, como su proveedor de servicios. Si eres voluntario (o te postulaste como voluntario) en una organización que usa Envolv, esa organización es tu primer contacto sobre tu información, y nosotros la ayudaremos a responderte.',
              },
              {
                lead: 'Para nuestro sitio web y nuestros clientes.',
                text: 'Para quienes visitan este sitio, piden una demo o nos escriben, y para las personas que crean y administran una cuenta de Envolv, nosotros decidimos cómo se usa la información, y esta política lo describe directamente.',
              },
            ],
          },
        ],
      },
      {
        id: 'app',
        heading: 'La información en la app de Envolv',
        blocks: [
          { p: 'Según lo que use tu organización, la app puede guardar:' },
          {
            list: [
              { lead: 'Datos de contacto y perfil:', text: 'nombre, correo electrónico, teléfono, foto, idioma preferido y un contacto de emergencia.' },
              {
                lead: 'Tu solicitud de voluntariado:',
                text: 'tus respuestas al formulario de solicitud de la organización (la organización elige las preguntas), además de la fecha y la dirección IP desde la que se envió, que guardamos para bloquear el spam.',
              },
              {
                lead: 'Tu registro como voluntario:',
                text: 'funciones, estado, etapas de incorporación, notas y alertas que agregan los coordinadores, el estado, la fecha y el número de referencia de la verificación de antecedentes (las verificaciones las hacen agencias de informes del consumidor, no nosotros), y credenciales como números de licencia y fechas de vencimiento.',
              },
              {
                lead: 'Documentos:',
                text: 'archivos que tú o tu organización suben a tu perfil, como una licencia o un certificado. Algunas organizaciones piden registros relacionados con la salud; consulta “Datos de salud del consumidor” más abajo.',
              },
              {
                lead: 'Tu actividad:',
                text: 'los turnos en los que te inscribes, las horas de entrada y salida y las horas trabajadas, tu reconocimiento del manual (el nombre que escribes y cuándo), tu progreso en las capacitaciones y los resultados de los cuestionarios, y los mensajes que te envía tu organización.',
              },
              { lead: 'Tu inicio de sesión:', text: 'tu correo electrónico. Nuestro proveedor de inicio de sesión guarda las contraseñas cifradas de forma irreversible; nadie en Envolv ni en tu organización puede leerlas.' },
              {
                lead: 'Tu ubicación al registrar la entrada, solo si lo permites:',
                text: 'cuando la ubicación de un turno tiene un perímetro configurado, la app para voluntarios le pide a tu teléfono su ubicación en el momento en que registras tu entrada. La comparamos con el perímetro y solo guardamos si estabas en el sitio o no. No guardamos tus coordenadas ni rastreamos tu ubicación en ningún otro momento. Puedes decir que no y registrar tu entrada de todos modos.',
              },
              {
                lead: 'Notificaciones, solo si las activas:',
                text: 'un identificador del dispositivo que da el servicio de notificaciones de tu navegador, para enviarte recordatorios de turnos y los mensajes de tu organización. Puedes desactivarlas cuando quieras en la configuración de tu teléfono o navegador.',
              },
              {
                lead: 'Información técnica:',
                text: 'como la mayoría de los sitios web, nuestros proveedores de alojamiento registran datos como la dirección IP, el tipo de navegador y las páginas solicitadas, para operar y proteger el servicio. La app usa la analítica web de Vercel, que cuenta las visitas sin usar cookies. Este sitio web no usa ninguna analítica.',
              },
            ],
          },
          {
            p: 'Usamos esta información solo para prestarle el servicio a tu organización —turnos, registro de horas, incorporación, mensajes e informes— y para darle soporte, protegerlo y corregir errores. Podemos usar datos agregados o anonimizados, que no identifican a nadie, como cifras generales de uso, para mejorar Envolv.',
          },
          {
            p: 'No vendemos información personal, no la compartimos para publicidad dirigida y no usamos los datos de contacto de los voluntarios para enviarles publicidad.',
          },
        ],
      },
      {
        id: 'website',
        heading: 'La información de nuestro sitio web y de nuestros clientes',
        blocks: [
          {
            list: [
              {
                lead: 'Solicitudes de demo:',
                text: 'tu nombre, correo electrónico, organización, sector, número aproximado de voluntarios y cualquier nota. Se envían por correo a los fundadores de Envolv y se guardan en nuestros registros de ventas (para eso usamos Notion). Si dejas tu correo en la página de la demo en vivo, se guarda de la misma forma.',
              },
              { lead: 'Correos a support@envolv.org:', text: 'recibimos y guardamos tu mensaje para poder responderte.' },
              {
                lead: 'Cuentas de clientes:',
                text: 'los nombres y datos de contacto de las personas que crean y administran una cuenta de Envolv, y los registros de facturación. Hoy facturamos con factura; si agregamos pagos con tarjeta, un procesador de pagos manejará los números de tarjeta y nosotros no los veremos.',
              },
              {
                lead: 'La demo en vivo:',
                text: 'la demo es un espacio de prueba compartido que todos pueden ver, y se restablece cada noche. Por favor no escribas información personal real ahí.',
              },
            ],
          },
          {
            p: 'Usamos esta información para responderte, hacer demos e incorporaciones, dar seguimiento a tu solicitud y operar nuestro negocio. Si te escribimos sobre Envolv y prefieres que no lo hagamos, dínoslo y dejaremos de hacerlo. Este sitio web no usa cookies de publicidad ni de analítica.',
          },
        ],
      },
      {
        id: 'sharing',
        heading: 'Con quién compartimos la información',
        blocks: [
          {
            list: [
              { lead: 'Tu organización.', text: 'Sus administradores y coordinadores ven los registros de los voluntarios de su cuenta.' },
              {
                lead: 'Los proveedores que operan Envolv para nosotros:',
                text: 'Supabase (base de datos, inicio de sesión y almacenamiento de archivos), Vercel (alojamiento de la app y del sitio web, y la analítica de la app), Resend (envío de correos y nuestra bandeja de soporte), el servicio de notificaciones del fabricante de tu navegador o dispositivo (como Apple, Google o Mozilla), y Notion (nuestros registros de ventas: solo solicitudes de demo, nunca registros de voluntarios). Solo pueden usar la información para prestarnos su servicio.',
              },
              { lead: 'Agencias de verificación de antecedentes,', text: 'solo si tu organización usa una, según los términos y la política de privacidad de esa agencia.' },
              {
                lead: 'Cuando la ley lo exige,',
                text: 'o cuando hace falta para proteger la seguridad o los derechos de alguien, o para prevenir fraude o abuso.',
              },
              {
                lead: 'Si Envolv se vende o se fusiona,',
                text: 'la información puede pasar al nuevo dueño, que debe seguir respetando esta política para esa información.',
              },
            ],
          },
          { p: 'No compartimos información personal con nadie más.' },
        ],
      },
      {
        id: 'health',
        heading: 'Datos de salud del consumidor',
        blocks: [
          {
            p: 'Algunas organizaciones recopilan información relacionada con la salud de sus voluntarios; por ejemplo, registros de vacunas o de pruebas de tuberculosis, o los resultados de una evaluación de salud. La ley My Health My Data del estado de Washington y otras leyes estatales parecidas llaman a esto “datos de salud del consumidor”.',
          },
          {
            list: [
              {
                lead: 'Cómo los manejamos:',
                text: 'los procesamos solo para la organización que los recopiló, siguiendo sus instrucciones y para prestar el servicio. Nunca los vendemos, y solo los compartimos con los proveedores mencionados arriba que los guardan o los envían.',
              },
              { lead: 'Quién puede verlos:', text: 'el personal autorizado de la organización, y el personal de Envolv solo cuando hace falta para dar soporte o proteger el servicio.' },
              {
                lead: 'Tus derechos:',
                text: 'puedes pedir ver o borrar tus datos de salud del consumidor, o retirar un consentimiento que diste. Comunícate con tu organización, o escríbenos y le pasaremos tu solicitud y la ayudaremos a responder.',
              },
            ],
          },
        ],
      },
      {
        id: 'retention',
        heading: 'Cuánto tiempo guardamos la información',
        blocks: [
          {
            list: [
              {
                lead: 'Los registros de la app',
                text: 'se guardan mientras la organización mantenga su cuenta. La organización puede cambiar o borrar registros cuando quiera. Un perfil que la organización archiva puede borrarse después de 12 meses en el archivo, previo aviso a la organización.',
              },
              {
                lead: 'Cuando una organización deja Envolv,',
                text: 'puede exportar sus datos durante 30 días, y nosotros los borramos de nuestros sistemas activos dentro de los 60 días siguientes. Las copias de respaldo se borran en el ciclo normal de respaldos.',
              },
              {
                lead: 'Las solicitudes de demo y los correos de soporte',
                text: 'se guardan mientras sean útiles para la conversación y nuestros registros. Pídenoslo y los borraremos.',
              },
              { lead: 'Los registros técnicos', text: 'los guardan nuestros proveedores de alojamiento por un tiempo limitado.' },
            ],
          },
        ],
      },
      {
        id: 'security',
        heading: 'Cómo protegemos la información',
        blocks: [
          {
            p: 'La información se cifra cuando viaja y cuando está guardada. Los registros de cada organización se mantienen separados, nuestra base de datos niega el acceso de forma predeterminada salvo a través de los controles de permisos de la propia app, y el acceso del personal se limita a lo que el trabajo requiere. Ningún sistema es perfectamente seguro; si un incidente de seguridad afecta información personal, se lo comunicamos a la organización afectada dentro de las 72 horas de confirmarlo, y se te avisará según lo exija la ley.',
          },
        ],
      },
      {
        id: 'choices',
        heading: 'Tus opciones y derechos',
        blocks: [
          {
            list: [
              {
                lead: 'Voluntarios:',
                text: 'puedes ver y actualizar tus datos de contacto, tu contacto de emergencia y tu idioma en la pestaña Perfil de la app para voluntarios. Para ver, corregir o borrar cualquier otra cosa, pídeselo a tu organización, o escríbenos y le pasaremos tu solicitud y la ayudaremos.',
              },
              {
                lead: 'Todas las demás personas:',
                text: 'escríbenos para ver, corregir o borrar la información que tenemos sobre ti. Te responderemos dentro del plazo que exija la ley, y nunca te trataremos distinto por pedirlo.',
              },
              {
                lead: 'La ubicación y las notificaciones',
                text: 'siempre son opcionales y puedes desactivarlas en la configuración de tu teléfono o navegador.',
              },
            ],
          },
        ],
      },
      {
        id: 'children',
        heading: 'Niños y adolescentes',
        blocks: [
          {
            p: 'Algunos programas de voluntariado incluyen adolescentes. La organización que registra información de una persona menor de edad es responsable de obtener el consentimiento de sus padres o tutores que exija la ley. Envolv no está dirigido a menores de 13 años. Si crees que se registró información de un menor sin el consentimiento necesario, comunícate con la organización o escríbenos y ayudaremos a borrarla.',
          },
        ],
      },
      {
        id: 'where',
        heading: 'Dónde se guarda la información',
        blocks: [
          {
            p: 'Envolv tiene su sede en los Estados Unidos, y nuestros proveedores guardan la información en los Estados Unidos. Si usas Envolv desde otro país, tu información se transfiere a los Estados Unidos y se guarda allí.',
          },
        ],
      },
      {
        id: 'changes',
        heading: 'Cambios a esta política',
        blocks: [
          {
            p: 'Cuando cambiamos esta política, publicamos la nueva versión aquí con una nueva fecha. Si el cambio es importante, se lo avisamos a las organizaciones que usan Envolv antes de que entre en vigor.',
          },
        ],
      },
      {
        id: 'contact',
        heading: 'Contacto',
        blocks: [
          {
            p: 'Preguntas o solicitudes: support@envolv.org. Envolv, LLC es una sociedad de responsabilidad limitada de Carolina del Norte con sede en el condado de Buncombe, Carolina del Norte.',
          },
        ],
      },
    ],
  },
}
