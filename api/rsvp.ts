import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseRsvpPayload, buildRsvpMessage, sendTelegramMessage } from './_telegram.js'

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

  const { payload, error } = parseRsvpPayload(req.body)
  if (!payload) {
    res.status(400).json({ ok: false, error })
    return
  }

  try {
    await sendTelegramMessage(token, chatId, buildRsvpMessage(payload))
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to reach Telegram:', err)
    res.status(500).json({ ok: false, error: 'Failed to reach Telegram.' })
  }
}
