'use server'

import { CONTACT_EMAIL, type Lang } from '@/lib/content'
import { COPY } from '@/lib/copy'
import { notifyRecipients, sendEmail } from '@/lib/email'
import { saveLead } from '@/lib/leads'
import type { DemoRequestState } from '@/lib/types'

// Deliberately permissive: anything with an @ and a dot after it. Rejecting a
// real lead over a regex is a far worse outcome than accepting a typo.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function requestDemo(
  _prev: DemoRequestState,
  formData: FormData,
): Promise<DemoRequestState> {
  // Honeypot: a real person never fills a field they cannot see.
  if ((formData.get('company_website') as string)?.trim()) {
    return { status: 'ok' } // pretend success; don't tell the bot
  }

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const org = (formData.get('org') as string | null)?.trim() ?? ''
  const vertical = (formData.get('vertical') as string | null)?.trim() ?? ''
  const size = (formData.get('size') as string | null)?.trim() ?? ''
  const notes = (formData.get('notes') as string | null)?.trim() ?? ''
  const lang: Lang = formData.get('lang') === 'es' ? 'es' : 'en'
  const t = COPY[lang].actions

  if (!name || !email || !org) {
    return { status: 'error', message: t.required }
  }
  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: t.badEmail }
  }

  // Two independent records of every lead: the founders' inbox and the
  // "Website Leads" Notion database. Email goes first so the Notion row can
  // say whether the alert went out. The visitor only sees an error if BOTH
  // fail — one success means the lead is captured.
  const emailResult = await sendEmail({
    to: notifyRecipients(),
    replyTo: email,
    subject: `Demo request — ${org}`,
    body: [
      `Name:         ${name}`,
      `Email:        ${email}`,
      `Organization: ${org}`,
      `Vertical:     ${vertical || '—'}`,
      `Volunteers:   ${size || '—'}`,
      `Language:     ${lang === 'es' ? 'Spanish (visited envolv.org/es)' : 'English'}`,
      '',
      'Notes:',
      notes || '—',
      '',
      `Received ${new Date().toISOString()} via envolv.org${lang === 'es' ? '/es' : ''}`,
    ].join('\n'),
  })

  const leadResult = await saveLead({
    name,
    email,
    org,
    vertical,
    size,
    notes: lang === 'es' ? `[Spanish site] ${notes}`.trim() : notes,
    emailSent: emailResult.ok,
  })

  // Log the real reasons server-side (Vercel → Logs).
  if (!emailResult.ok) console.error('[demo-request] email failed:', emailResult.error)
  if (!leadResult.ok) console.error('[demo-request] Notion save failed:', leadResult.error)

  if (!emailResult.ok && !leadResult.ok) {
    // Nothing captured the lead — show the visitor something they can act on.
    return {
      status: 'error',
      message: t.failed(CONTACT_EMAIL),
    }
  }

  return {
    status: 'ok',
    message: t.ok,
  }
}

/**
 * Optional email capture on /demo. Called only when the visitor typed an
 * address; it never blocks them from getting into the demo, so failures are
 * logged, not shown. Same two records as a demo request: an email to the
 * founders and a row in Website Leads (Source = "Live demo").
 */
export async function recordDemoVisit(input: {
  email: string
  view: 'admin' | 'volunteer'
  company_website?: string
}): Promise<void> {
  // Honeypot — a person never fills a field they can't see.
  if (input.company_website?.trim()) return

  const email = input.email.trim().slice(0, 254)
  if (!EMAIL_RE.test(email)) return
  const what = input.view === 'volunteer' ? 'volunteer app' : 'coordinator dashboard'

  const emailResult = await sendEmail({
    to: notifyRecipients(),
    replyTo: email,
    subject: `Live demo visitor — ${email}`,
    body: [
      `${email} opened the ${what} in the live demo.`,
      '',
      'They only gave an email — no name or organization. Reply to this message to reach them.',
      '',
      `Received ${new Date().toISOString()} via envolv.org/demo`,
    ].join('\n'),
  })

  const leadResult = await saveLead({
    name: '',
    email,
    org: `Demo visitor — ${email}`,
    vertical: '',
    size: '',
    notes: `Opened the ${what} in the live demo.`,
    emailSent: emailResult.ok,
    source: 'Live demo',
  })

  if (!emailResult.ok) console.error('[demo-visit] email failed:', emailResult.error)
  if (!leadResult.ok) console.error('[demo-visit] Notion save failed:', leadResult.error)
}
