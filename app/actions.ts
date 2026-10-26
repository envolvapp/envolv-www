'use server'

import { CONTACT_EMAIL } from '@/lib/content'
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

  if (!name || !email || !org) {
    return { status: 'error', message: 'Name, email, and organization are required.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: 'That email address does not look right.' }
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
      '',
      'Notes:',
      notes || '—',
      '',
      `Received ${new Date().toISOString()} via envolv.app`,
    ].join('\n'),
  })

  const leadResult = await saveLead({
    name,
    email,
    org,
    vertical,
    size,
    notes,
    emailSent: emailResult.ok,
  })

  // Log the real reasons server-side (Vercel → Logs).
  if (!emailResult.ok) console.error('[demo-request] email failed:', emailResult.error)
  if (!leadResult.ok) console.error('[demo-request] Notion save failed:', leadResult.error)

  if (!emailResult.ok && !leadResult.ok) {
    // Nothing captured the lead — show the visitor something they can act on.
    return {
      status: 'error',
      message: `We couldn't submit that just now. Email us at ${CONTACT_EMAIL} and we'll set the demo up directly.`,
    }
  }

  return {
    status: 'ok',
    message: "Got it — we'll be in touch within one business day.",
  }
}
