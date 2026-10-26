/**
 * Saves a demo request as a row in the "Website Leads" Notion database
 * (Envolv workspace → Marketing and Sales Hub). Same contract as sendEmail():
 * a failure is reported back, never thrown and never swallowed.
 *
 * Needs two env vars on Vercel (both read at request time):
 *   NOTION_TOKEN                 — secret of the "envolv-www leads" internal
 *                                  integration; it must be added under the
 *                                  database's ⋯ → Connections
 *   NOTION_LEADS_DATA_SOURCE_ID  — the database's data source id
 *
 * Property names below must match the database's columns exactly. Select
 * values that don't exist yet are created by Notion on first use.
 */
import type { SendResult } from '@/lib/email'

const NOTION_VERSION = '2025-09-03'

export type Lead = {
  name: string
  email: string
  org: string
  vertical: string
  size: string
  notes: string
  /** false = the notification email failed, so this row is the only record */
  emailSent: boolean
}

// Notion caps a single rich-text segment at 2,000 characters.
const richText = (s: string) => (s ? [{ type: 'text', text: { content: s.slice(0, 2000) } }] : [])

export async function saveLead(lead: Lead): Promise<SendResult> {
  const token = process.env.NOTION_TOKEN
  const dataSourceId = process.env.NOTION_LEADS_DATA_SOURCE_ID
  if (!token || !dataSourceId) {
    return {
      ok: false,
      error: 'NOTION_TOKEN / NOTION_LEADS_DATA_SOURCE_ID not configured',
      notConfigured: true,
    }
  }

  const properties: Record<string, unknown> = {
    Organization: { title: richText(lead.org) },
    Contact: { rich_text: richText(lead.name) },
    Email: { email: lead.email },
    'Using today': { rich_text: richText(lead.notes) },
    'Email alert sent': { checkbox: lead.emailSent },
    Source: { select: { name: 'Website demo form' } },
  }
  if (lead.vertical) properties.Industry = { select: { name: lead.vertical } }
  if (lead.size) properties.Volunteers = { select: { name: lead.size } }

  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { type: 'data_source_id', data_source_id: dataSourceId },
        properties,
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => res.statusText)
      return { ok: false, error: `Notion ${res.status}: ${detail}` }
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' }
  }
}
