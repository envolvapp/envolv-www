/**
 * Resend helper. Same fetch-based shape as medvolunteer's `web/lib/email.ts`
 * so the two behave identically — and, importantly, so a failure is *reported*
 * rather than swallowed. A lead-capture form that silently drops leads is
 * worse than one that's visibly broken.
 */

export type SendResult =
  | { ok: true }
  | { ok: false; error: string; notConfigured?: boolean }

export async function sendEmail({
  to,
  subject,
  body,
  replyTo,
}: {
  to: string[]
  subject: string
  body: string
  replyTo?: string
}): Promise<SendResult> {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    return { ok: false, error: 'RESEND_API_KEY not configured', notConfigured: true }
  }
  if (to.length === 0) {
    return { ok: false, error: 'DEMO_NOTIFY_EMAILS not configured', notConfigured: true }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
        to,
        subject,
        text: body,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => res.statusText)
      return { ok: false, error: `Resend ${res.status}: ${detail}` }
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' }
  }
}

/** Recipients of demo requests. Comma-separated env var so adding a founder needs no code change. */
export function notifyRecipients(): string[] {
  return (process.env.DEMO_NOTIFY_EMAILS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
