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

## Deploy

Pushing to `main` builds and deploys the site automatically via
`.github/workflows/deploy.yml` (GitHub Actions → GitHub Pages). One-time setup
in the GitHub repo: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

Custom domain: `public/CNAME` sets it to `designexam.com`. Point the domain's
DNS at GitHub Pages — either an apex `A` record set to GitHub's four Pages IPs
(`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) or a `CNAME` record for
a `www` subdomain pointing at `jehar-tau.github.io`. To use the default
`jehar-tau.github.io/Website-Dexam/` URL instead, delete `public/CNAME`.

`public/404.html` + the inline script in `index.html` make client-side routing
(React Router) work on GitHub Pages, which has no server-side rewrites —
direct links and refreshes on nested routes (e.g. `/papers/nid`) redirect
through `404.html` and land back on the right page.

## Lead capture & paper downloads

The papers pages lock downloads behind a one-time lead form (configurable in
`src/config.js`). Unlock state persists in `localStorage`. Actual PDF links are
read from the DEXAM Admin app's localStorage (`dexam-admin-v1` → `paperLinks`),
matching the design. Form submissions are currently client-side only — wiring
them to a backend/WhatsApp/CRM is the next step.
