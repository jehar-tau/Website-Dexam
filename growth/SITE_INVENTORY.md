# DEXAM site inventory

Audited: 2026-10-30 (Asia/Kolkata)

## Repository and access

- Repository: `jehar-tau/Website-Dexam`
- Visibility: public
- Default/deployment branch: `main`
- Current production commit in `main`: `54597ecca32d5743969a0c623e2724eae8d257f9`
- Codex working branch: `codex/t00-baseline-audit`
- Connected GitHub account reports admin, maintain, push, triage and pull permissions.
- GitHub API repository state reports `has_pages: false`. This conflicts with the repository README's intended Pages deployment and explains the current GitHub Pages 404.
- No production files, DNS records, Pages settings or live data were changed during this audit.

## Stack and build

- Vite 5 + React 18, React Router 6, plain CSS.
- Node 20 is used in GitHub Actions.
- Package manager: npm with committed `package-lock.json`.
- Local commands: `npm ci`, `npm run dev`, `npm run build`, `npm run preview`.
- Production output: `dist/`.
- Local verification on 2026-10-30: `npm ci` succeeded and `npm run build` passed (64 modules transformed).
- Dependency audit during install reported 9 vulnerabilities (5 moderate, 4 high). This needs a scoped dependency review; no unreviewed `npm audit fix` was run.
- Deployment workflow: `.github/workflows/deploy.yml`; a push to `main` builds and deploys through GitHub Actions.
- Latest observed workflow run for commit `54597ec` completed successfully on 2026-07-31, but Pages is now disabled at repository level.
- Custom-domain files exist at both `/CNAME` and `/public/CNAME`, each specifying `designexam.com`. Vite copies the public file to the build.

## Routes found in source

| Route | Component | Notes |
|---|---|---|
| `/` | `Home` | Client-rendered SPA homepage |
| `/about` | `About` | About page |
| `/courses` | `Courses` | Course overview |
| `/guide` | `Guide` | Parent/student guide |
| `/exams` | `ExamsInfo` | Exam guide |
| `/papers` | `PapersHub` | Previous-paper hub |
| `/papers/:examId` | `ExamPapers` | Exam-specific papers |
| `/quiz` | `Quiz` | Placeholder noted in README |
| `/results` | `Results` | Results/testimonials content requires factual review |
| `/contact` | `Contact` | Contact and enquiry path |
| `/privacy` | `Privacy` | Privacy copy requires review against actual data flow |
| `/terms` | `Terms` | Terms page |
| `/admin` | `Admin` | Browser-local CMS/admin route; public exposure and security model require review |

Unknown routes redirect to `/` in React. `public/404.html` implements a GitHub Pages SPA redirect shim.

## Content and data flows observed

- Site content is primarily held in `src/data.js`.
- WhatsApp destination is configured in `src/config.js` as `+91 98342 26279`.
- Lead forms collect name, 10-digit phone number and location.
- Lead submissions are sent from the browser to a Google Apps Script web app configured in `src/config.js`.
- The client marks a lead captured and unlocks papers before confirming that the Google Sheet submission succeeded. Submission errors are discarded. This means a displayed conversion is not proof of a successfully stored enquiry.
- Paper links are Google Drive file IDs compiled into site data.
- Unlock state and browser-local CMS data use `localStorage`.
- No GA4, Google Tag Manager or other analytics tag was found in `index.html` during the initial audit.
- No `robots.txt` or `sitemap.xml` exists in the repository.

## Metadata and rendering observations

- `index.html` has one global title and meta description.
- No route-specific canonical links, Open Graph metadata or structured data were observed in the initial source check.
- All routes are client-rendered. Important route content is not present in the initial HTML response; SEO rendering/remediation must be assessed after the site is restored.

## Rollback and release path

1. Keep all work off `main` until review.
2. Create a pull request from a coherent feature branch.
3. Record the pre-release `main` SHA (`54597ec...` at audit time).
4. Merge only after local build/tests and owner approval.
5. Verify the GitHub Actions deployment and live URLs.
6. If a release fails, revert the merge commit through a new reviewed commit/PR and redeploy; do not rewrite `main` history.
7. DNS or Pages-setting changes must be recorded separately because Git rollback does not reverse them.

## Unknown / owner confirmation required

- Whether `designexam.com` or `www.designexam.com` is the preferred canonical host.
- Why GitHub Pages is currently disabled and whether the custom domain is still attached in Settings → Pages.
- Whether the Google Apps Script endpoint and its destination sheet are active and access-controlled.
- Which content claims, faculty bios, results and testimonials are approved and evidenced.
- Whether the public `/admin` route is intentionally exposed.
