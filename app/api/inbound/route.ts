/**
 * support@envolv.org relay (2026-10-30).
 *
 * support@ is a Resend inbox. Resend calls this route for every message that
 * lands there (webhook event `inbox.email.received`); we fetch the message body
 * and send a copy to the co-founders with Reply-To set to the original sender,
 * so hitting Reply in Gmail answers the customer directly. The original stays in
 * the Resend inbox as the shared record.
 *
 * Env (Vercel, read at request time):
 *   RESEND_WEBHOOK_SECRET  — the webhook's signing secret (whsec_…), Resend →
 *                            Webhooks → the inbox.email.received webhook
 *   RESEND_INBOX_API_KEY   — a FULL-ACCESS Resend key. Reading a received
 *                            message needs it; the site's RESEND_API_KEY is
 *                            sending-only on purpose and stays that way
 *   SUPPORT_FORWARD_TO     — optional, comma-separated; defaults to
 *                            DEMO_NOTIFY_EMAILS (the three co-founders)
 *
 * Returns 5xx only when a retry could help (Resend retries failed deliveries);
 * the send carries an Idempotency-Key, so a retry can't double-forward.
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import { notifyRecipients } from '@/lib/email'

export const dynamic = 'force-dynamic'

const TOLERANCE_SECONDS = 5 * 60

/** Svix-style signature check (Resend webhooks are signed with Svix). */
function verifySignature(secret: string, headers: Headers, body: string): boolean {
  const id = headers.get('svix-id') ?? headers.get('webhook-id')
  const timestamp = headers.get('svix-timestamp') ?? headers.get('webhook-timestamp')
  const signatures = headers.get('svix-signature') ?? headers.get('webhook-signature')
  if (!id || !timestamp || !signatures) return false

  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(age) || age > TOLERANCE_SECONDS) return false

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64')
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${body}`).digest()

  return signatures.split(' ').some((part) => {
    const [version, sig] = part.split(',')
    if (version !== 'v1' || !sig) return false
    const given = Buffer.from(sig, 'base64')
    return given.length === expected.length && timingSafeEqual(given, expected)
  })
}

type InboxEvent = {
  type: string
  data?: {
    email_id?: string
    email?: { from?: string; subject?: string; attachments?: unknown[]; to?: string[]; cc?: string[] }
  }
}

type ReceivedEmail = {
  from?: string
  to?: string[]
  cc?: string[]
  reply_to?: string[]
  subject?: string
  text?: string | null
  html?: string | null
  created_at?: string
}

/** "Jane Doe <jane@x.org>" → "jane@x.org" */
const bareAddress = (s: string) => (s.match(/<([^>]+)>/)?.[1] ?? s).trim().toLowerCase()

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  const readKey = process.env.RESEND_INBOX_API_KEY
  const sendKey = process.env.RESEND_API_KEY
  if (!secret || !readKey || !sendKey) {
    console.error('[support-relay] not configured: need RESEND_WEBHOOK_SECRET, RESEND_INBOX_API_KEY, RESEND_API_KEY')
    return new Response('not configured', { status: 503 })
  }

  const body = await req.text()
  if (!verifySignature(secret, req.headers, body)) {
    return new Response('bad signature', { status: 401 })
  }

  let event: InboxEvent
  try {
    event = JSON.parse(body)
  } catch {
    return new Response('bad json', { status: 400 })
  }
  if (event.type !== 'inbox.email.received' || !event.data?.email_id) {
    return new Response('ignored', { status: 200 })
  }
  const emailId = event.data.email_id

  const recipients = (process.env.SUPPORT_FORWARD_TO ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const to = recipients.length ? recipients : notifyRecipients()
  if (to.length === 0) {
    console.error('[support-relay] no recipients: set SUPPORT_FORWARD_TO or DEMO_NOTIFY_EMAILS')
    return new Response('no recipients', { status: 503 })
  }

  // Loop guard: never relay mail the founders (or this site) sent to support@.
  const sender = bareAddress(event.data.email?.from ?? '')
  const internal = new Set(to.map(bareAddress))
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'Envolv <noreply@envolv.org>'
  internal.add(bareAddress(fromAddress))
  if (internal.has(sender)) return new Response('internal sender, skipped', { status: 200 })

  // The webhook carries metadata only; the body comes from the Received Emails API.
  const got = await fetch(`https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`, {
    headers: { Authorization: `Bearer ${readKey}` },
  })
  if (!got.ok) {
    const detail = await got.text().catch(() => got.statusText)
    console.error(`[support-relay] fetch ${emailId} failed: ${got.status} ${detail}`)
    return new Response('fetch failed', { status: 502 })
  }
  const email = (await got.json()) as ReceivedEmail

  const from = email.from ?? event.data.email?.from ?? 'unknown sender'
  const subject = email.subject ?? event.data.email?.subject ?? '(no subject)'
  const replyTo = email.reply_to?.length ? email.reply_to : [from]
  const attachments = event.data.email?.attachments?.length ?? 0
  const meta = [
    `From: ${from}`,
    `To: ${(email.to ?? ['support@envolv.org']).join(', ')}`,
    ...(email.cc?.length ? [`Cc: ${email.cc.join(', ')}`] : []),
    `Received: ${email.created_at ?? new Date().toISOString()}`,
    ...(attachments
      ? [`Attachments: ${attachments} — open the message in the Resend inbox (support@envolv.org) to download them.`]
      : []),
    'Hit Reply to answer the sender directly.',
  ]

  const text = `${meta.join('\n')}\n\n${'─'.repeat(40)}\n\n${email.text ?? '(no plain-text body — see the HTML version)'}`
  const html = email.html
    ? `<div style="font:13px/1.5 system-ui,sans-serif;color:#4f6189;border-bottom:1px solid #dde3ed;padding-bottom:10px;margin-bottom:16px">${meta
        .map(escapeHtml)
        .join('<br>')}</div>${email.html}`
    : undefined

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sendKey}`,
      'Content-Type': 'application/json',
      // A Resend retry of this webhook re-sends the same key → no duplicate forward.
      'Idempotency-Key': `support-relay-${emailId}`,
    },
    body: JSON.stringify({
      from: fromAddress,
      to,
      reply_to: replyTo,
      subject: `[Support] ${subject}`,
      text,
      ...(html ? { html } : {}),
    }),
  })
  if (!sent.ok) {
    const detail = await sent.text().catch(() => sent.statusText)
    console.error(`[support-relay] send for ${emailId} failed: ${sent.status} ${detail}`)
    return new Response('send failed', { status: 502 })
  }

  return new Response('relayed', { status: 200 })
}
