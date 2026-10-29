'use server'

import { notifyRecipients, sendEmail } from '@/lib/email'
import { saveLead } from '@/lib/leads'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
      `Received ${new Date().toISOString()} via envolv.app/demo`,
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
