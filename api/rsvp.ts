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

function escapeMarkdown(value: string): string {
  return value.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
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

  const lines = [
    '🎉 *Նոր հաստատում (RSVP)*',
    `👤 *Անուն.* ${escapeMarkdown(fullName)}`,
    `👥 *Հյուրերի քանակ.* ${guests}`,
    `📞 *Հեռախոս.* ${escapeMarkdown(phone)}`,
    `✅ *Կմասնակցի.* ${escapeMarkdown(attendingLabel[attending] ?? attending)}`,
  ]
  if (comments) lines.push(`💬 *Մեկնաբանություն.* ${escapeMarkdown(comments)}`)

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'MarkdownV2',
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
