# DEXAM live discovery audit — initial findings

Audited: 2026-10-30, approximately 16:39 IST, from the owner's current network.

## Restoration update — 2026-10-30 16:50 IST

With owner approval, GitHub Actions was restored as the Pages publishing source and workflow run `41047160910` deployed commit `54597ec` successfully. `designexam.com` is attached as the custom domain with HTTPS enforcement. The apex homepage now returns HTTP 200; `www` redirects to the apex.

The original site-wide outage is resolved. Direct nested routes and discovery files still return HTTP 404 and remain active P0/P1 remediation work.

## Resolved P0 — Website was not being served by GitHub Pages

**Evidence**

- `https://designexam.com/` returns HTTP 404 with GitHub's `Site not found · GitHub Pages` page.
- `https://www.designexam.com/` returns the same HTTP 404.
- Repository API state for `jehar-tau/Website-Dexam` reports `has_pages: false`.
- The latest observed deploy workflow run completed successfully on 2026-07-31, so a successful historical workflow does not establish that Pages is currently enabled.

**Impact:** prospective students and crawlers cannot access the site. This blocks every website conversion and organic-discovery task.

**Repair completed:** GitHub Actions publishing restored, current `main` deployed, custom domain attached and live smoke-tested.

## P0 — DNS is pointed at GitHub Pages, but no active Pages site claims the domain

**Evidence**

- Apex A records resolve to GitHub Pages IPs: `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`.
- `www.designexam.com` is a CNAME to `jehar-tau.github.io`, which resolves to the same Pages IPs.
- TLS succeeds, but the application response is GitHub Pages 404.

**Impact:** this is not a generic DNS/TLS outage; the domain reaches GitHub, but Pages configuration/publication is inactive or detached.

**Remediation:** do not change DNS first. Verify the repository Pages configuration and custom-domain claim before considering DNS edits.

## P0 — Direct nested routes and discovery endpoints fail

**Evidence**

- `/robots.txt` returns the GitHub Pages 404 page.
- `/sitemap.xml` returns the GitHub Pages 404 page.
- The homepage is restored, but direct requests to `/about`, `/courses` and `/papers` return HTTP 404. The browser-side GitHub Pages SPA shim can recover navigation for users, but the HTTP status remains unsuitable for dependable crawling.

**Impact:** the homepage is crawlable again, but important routes and discovery files are served with 404 status on direct request.

**Remediation:** add a validated sitemap/robots workflow and a deployment approach that returns HTTP 200 with useful route-level HTML for canonical content pages.

## P1 — SPA content and metadata need route-level validation after restoration

The repository is a client-rendered Vite/React SPA. Source inspection found a single global title/description and no route-specific canonical, Open Graph or structured-data implementation. Important content is absent from the initial HTML shell. This is a source observation, not yet a rendered-live failure because the live site is unavailable.

## P1 — Lead success state is not tied to successful storage

The lead modal shows success, unlocks downloads and records local captured state before the Google Apps Script request is confirmed; request failures are ignored. This can create lost leads and false conversion assumptions. No production test submission was made because the plan prohibits contacting/writing real systems without a release/test gate.

## First three fixes proposed for review

1. Re-enable/reattach GitHub Pages and verify the domain serves the current build. Estimated effort: 15–45 minutes, plus GitHub certificate/DNS propagation if the domain must be reverified.
2. Add automated smoke checks for homepage status, custom-domain output and post-deploy verification so a site-wide 404 cannot remain unnoticed. Estimated effort: 1–2 hours.
3. Add a correct robots/sitemap/canonical foundation and route-level crawlable metadata after the live build is restored. Estimated effort: 0.5–1.5 days depending on the chosen static-rendering approach.

No fix has been deployed.
