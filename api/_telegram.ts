// Shared helper for the Telegram RSVP notification.
// Filename starts with "_" — Vercel's convention for excluding a file in
// /api from being treated as its own route (it's a helper module only).

export interface RsvpPayload {
  fullName: string
  guests: number
  phone: string
  attending: 'yes' | 'no' | 'maybe'
  comments?: string
}

const attendingLabel: Record<string, string> = {
  yes: 'Այո 🎉',
  maybe: 'Միգուցե',
  no: 'Ոչ',
}

export function parseRsvpPayload(body: unknown): { payload: RsvpPayload | null; error?: string } {
  const b = (body ?? {}) as Partial<RsvpPayload>
  const fullName = String(b.fullName ?? '').trim()
  const phone = String(b.phone ?? '').trim()
  const guests = Number(b.guests ?? 1)
  const attending = String(b.attending ?? '') as RsvpPayload['attending']
  const comments = String(b.comments ?? '').trim()

  if (!fullName || !phone || !attending) {
    return { payload: null, error: 'Missing required fields.' }
  }
  return { payload: { fullName, phone, guests, attending, comments } }
}

// Plain text on purpose — no Telegram parse_mode. Guest-entered names/
// comments can contain any character (parentheses, dots, dashes, etc.), and
// Telegram's MarkdownV2 rejects the *entire* message if a single reserved
// character isn't escaped exactly right. Plain text has no such failure mode.
export function buildRsvpMessage(payload: RsvpPayload): string {
  const lines = [
    '🎉 Նոր հաստատում — RSVP',
    `👤 Անուն: ${payload.fullName}`,
    `👥 Հյուրերի քանակ: ${payload.guests}`,
    `📞 Հեռախոս: ${payload.phone}`,
    `✅ Կմասնակցի: ${attendingLabel[payload.attending] ?? payload.attending}`,
  ]
  if (payload.comments) lines.push(`💬 Մեկնաբանություն: ${payload.comments}`)
  return lines.join('\n')
}

export async function sendTelegramMessage(token: string, chatId: string, text: string): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Telegram rejected the message: ${errText}`)
  }
}
