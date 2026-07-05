# Emma Turns One & The Big Reveal

A premium, single-page event site for a combined Birthday Celebration & Gender Reveal Party. Built with Vue 3, Vite, TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger), Lenis smooth scroll, PhotoSwipe, and canvas-confetti.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## What to edit before your event

All the editable event details live in one place: **`src/config.ts`**

- `dateISO` / `dateLabel` / `timeLabel` — drives the hero + countdown sections
- `venueName` / `addressLine` — shown in the Location section
- `mapsEmbedSrc` — replace with your real Google Maps embed URL (Google Maps → Share → Embed a map → copy the `src` from the iframe)
- `mapsDirectionsUrl` — replace with a real "Get Directions" link to your venue
- `hostNames` — shown in the footer

Other editable content:

- **`src/data/schedule.ts`** — the vertical timeline (times, titles, descriptions, icons)
- **`src/data/games.ts`** — the game cards
- **`src/data/gallery.ts`** — gallery photos. Currently uses seeded placeholder photography from picsum.photos so the gallery looks complete out of the box. Swap `src`/`thumb` for your own photo URLs (or `/images/...` files placed in `public/images`) any time — just keep accurate `width`/`height` values so PhotoSwipe can size the lightbox correctly.

## RSVP form

The RSVP form (`src/components/sections/RsvpSection.vue`) validates input, keeps a local copy in the visitor's browser `localStorage` (key `rsvp-submissions`), and — on submit — calls `POST /api/rsvp`, a Vercel serverless function (`api/rsvp.ts`) that forwards the submission to a Telegram chat via the Bot API. The Telegram call is best-effort: guests still see the confirmation screen even if it fails, so a flaky notification never blocks an RSVP.

**Required environment variables** (server-side only — never exposed to the browser):

- `TELEGRAM_BOT_TOKEN` — your bot's token from [@BotFather](https://t.me/BotFather)
- `TELEGRAM_CHAT_ID` — the chat/group/channel ID the bot should post to

For local testing, these live in `.env.local` (already created, gitignored — never commit it). For production, set the same two variables in **Vercel → Project → Settings → Environment Variables**, then redeploy. Since `/api` routes only run on Vercel's Node runtime, use `vercel dev` instead of `vite dev` if you want to test the Telegram notification locally; plain `npm run dev` will still serve the site fine, but `fetch('/api/rsvp')` will 404 without `vercel dev`.

If you'd rather not use Telegram, swap the `fetch('/api/rsvp', …)` call in `submit()` (or the body of `api/rsvp.ts`) for whatever you prefer — email, a database, Formspree, etc.

## Gender prediction poll

The Team Boy / Team Girl vote (`src/composables/useGenderVotes.ts`) is also local-only — percentages are shared per-browser via `localStorage`, seeded with a friendly starting count so the section doesn't look empty on a guest's first visit. It's meant purely as a fun, no-backend-required interaction; it does not aggregate votes across different visitors' devices.

## Notes

- Smooth scrolling (Lenis) and scroll-triggered animations (GSAP ScrollTrigger) automatically disable for visitors with "reduce motion" accessibility settings enabled.
- All images use native lazy-loading.
- The countdown, schedule timeline, gender poll, and RSVP form all work with JavaScript disabled data intact (progressive markup) but require JS enabled for interactivity, as is standard for this kind of experience.
