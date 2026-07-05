import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Dev-only stand-in for the /api/rsvp Vercel serverless function, so that
// plain `npm run dev` (Vite only, no Vercel CLI) can still test the Telegram
// RSVP notification end-to-end. Production uses api/rsvp.ts on Vercel; this
// plugin never runs in a production build, only in `vite dev`.
function rsvpDevApi(env: Record<string, string>): Plugin {
  return {
    name: 'rsvp-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/rsvp', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
          return
        }

        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const body = Buffer.concat(chunks).toString('utf-8')
          const { parseRsvpPayload, buildRsvpMessage, sendTelegramMessage } = await import('./api/_telegram.ts')

          const token = env.TELEGRAM_BOT_TOKEN
          const chatId = env.TELEGRAM_CHAT_ID
          if (!token || !chatId) {
            console.error('[rsvp-dev-api] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env.local')
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: 'Telegram is not configured (.env.local).' }))
            return
          }

          const { payload, error } = parseRsvpPayload(JSON.parse(body || '{}'))
          if (!payload) {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error }))
            return
          }

          await sendTelegramMessage(token, chatId, buildRsvpMessage(payload))
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify({ ok: true }))
        } catch (err) {
          console.error('[rsvp-dev-api] error:', err)
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false, error: 'Server error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), tailwindcss(), rsvpDevApi(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
    },
  }
})
