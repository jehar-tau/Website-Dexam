# DEXAM Website

Marketing + lead-generation website for DEXAM — Design Exam Academy (designexam.com).
Implemented from the Claude Design file `DEXAM Website.dc.html`.

## Stack

- [Vite](https://vitejs.dev) + React 18
- React Router (client-side routing)
- Plain CSS (`src/styles.css`) — no CSS framework

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Pages

`/` home · `/about` · `/courses` · `/exams` exam guide · `/guide` parent guide ·
`/papers` papers hub · `/papers/:examId` per-exam papers · `/quiz` (placeholder) ·
`/results` · `/contact` · `/privacy` · `/terms`

## Content & config

- All page content (exams, courses, guide tables, testimonials): `src/data.js`
- WhatsApp number, lead-form variant, unlock behaviour: `src/config.js`

## Images to drop in

- `public/assets/hero/discipline-1.png … discipline-5.png` — the 5 rotating hero
  illustrations (in the Claude Design project's `uploads/` folder)
- `public/assets/about/studio.jpg`, `public/assets/about/student-work.jpg`
- `public/assets/work/work-1.jpg … work-3.jpg` — student work photos

Missing images render as labelled placeholder boxes.

## Lead capture & paper downloads

The papers pages lock downloads behind a one-time lead form (configurable in
`src/config.js`). Unlock state persists in `localStorage`. Actual PDF links are
read from the DEXAM Admin app's localStorage (`dexam-admin-v1` → `paperLinks`),
matching the design. Form submissions are currently client-side only — wiring
them to a backend/WhatsApp/CRM is the next step.
