import { PROJECT_CONFIG } from './project-config'

const SUPABASE_URL = 'https://yajhearqopveqldaanii.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_MpK71SWk8r1GdBVZ22NUBw_8a_JPzL0'

export const PROJECT_ID = 'cenate-sopra'

export type LeadPayload = Record<string, unknown>

async function postToTable(table: string, body: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ project: PROJECT_ID, ...body }),
    })
    if (!res.ok) {
      console.warn(`Supabase ${table} POST failed:`, res.status, res.statusText)
      return false
    }
    return true
  } catch (err) {
    console.warn(`Supabase ${table} POST error:`, err)
    return false
  }
}

export async function sendLead(payload: LeadPayload): Promise<boolean> {
  return postToTable(PROJECT_CONFIG.leadsTable, payload as Record<string, unknown>)
}

export async function subscribeNewsletter(email: string, source: string): Promise<boolean> {
  return postToTable('newsletter_subscribers', {
    email: email.trim(),
    source_section: source,
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    ...getUTM(),
  })
}

export async function trackBrochureDownload(email: string | null, source: string): Promise<boolean> {
  return postToTable(PROJECT_CONFIG.brochureTable, {
    email: email ? email.trim() : null,
    source_section: source,
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    ...getUTM(),
  })
}

export async function requestCallback(name: string, phone: string, timeSlot: string): Promise<boolean> {
  return postToTable(PROJECT_CONFIG.callbackTable, {
    nome: name.trim(),
    telefono: phone.trim(),
    time_slot: timeSlot,
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    ...getUTM(),
  })
}

export function getUTM() {
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get('utm_source') || null,
    utm_medium: p.get('utm_medium') || null,
    utm_campaign: p.get('utm_campaign') || null,
    utm_content: p.get('utm_content') || null,
    utm_term: p.get('utm_term') || null,
  }
}
