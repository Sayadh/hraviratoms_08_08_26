import type { VercelRequest, VercelResponse } from '@vercel/node'

interface RsvpPayload {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars')
    res.status(500).json({ ok: false, error: 'Telegram is not configured on the server.' })
    return
  }

  const body = (req.body ?? {}) as Partial<RsvpPayload>
  const fullName = String(body.fullName ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const guests = Number(body.guests ?? 1)
  const attending = String(body.attending ?? '') as RsvpPayload['attending']
  const comments = String(body.comments ?? '').trim()

  if (!fullName || !phone || !attending) {
    res.status(400).json({ ok: false, error: 'Missing required fields.' })
    return
  }

  // Plain text on purpose — no parse_mode. Guest-entered names/comments can
  // contain any character (parentheses, dots, dashes, etc.), and Telegram's
  // MarkdownV2 rejects the whole message if a single reserved character isn't
  // escaped exactly right. Plain text has no such failure mode.
  const lines = [
    '🎉 Նոր հաստատում — RSVP',
    `👤 Անուն: ${fullName}`,
    `👥 Հյուրերի քանակ: ${guests}`,
    `📞 Հեռախոս: ${phone}`,
    `✅ Կմասնակցի: ${attendingLabel[attending] ?? attending}`,
  ]
  if (comments) lines.push(`💬 Մեկնաբանություն: ${comments}`)

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
      }),
    })

    if (!tgRes.ok) {
      const errText = await tgRes.text()
      console.error('Telegram API error:', errText)
      res.status(502).json({ ok: false, error: 'Telegram rejected the message.' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to reach Telegram:', err)
    res.status(500).json({ ok: false, error: 'Failed to reach Telegram.' })
  }
}
