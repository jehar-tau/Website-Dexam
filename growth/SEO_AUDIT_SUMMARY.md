# DEXAM live discovery audit — initial findings

Audited: 2026-10-30, approximately 16:39 IST, from the owner's current network.

## P0 — Website is not being served by GitHub Pages

**Evidence**

- `https://designexam.com/` returns HTTP 404 with GitHub's `Site not found · GitHub Pages` page.
- `https://www.designexam.com/` returns the same HTTP 404.
- Repository API state for `jehar-tau/Website-Dexam` reports `has_pages: false`.
- The latest observed deploy workflow run completed successfully on 2026-07-31, so a successful historical workflow does not establish that Pages is currently enabled.

**Impact:** prospective students and crawlers cannot access the site. This blocks every website conversion and organic-discovery task.

**Smallest likely repair:** inspect Settings → Pages, restore GitHub Actions as the publishing source, confirm the `designexam.com` custom domain and HTTPS enforcement, then run/approve the existing deployment. This is an external production change and requires an owner-approved release gate.

## P0 — DNS is pointed at GitHub Pages, but no active Pages site claims the domain

**Evidence**

- Apex A records resolve to GitHub Pages IPs: `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`.
- `www.designexam.com` is a CNAME to `jehar-tau.github.io`, which resolves to the same Pages IPs.
- TLS succeeds, but the application response is GitHub Pages 404.

**Impact:** this is not a generic DNS/TLS outage; the domain reaches GitHub, but Pages configuration/publication is inactive or detached.

**Remediation:** do not change DNS first. Verify the repository Pages configuration and custom-domain claim before considering DNS edits.

## P0 — All discovery endpoints currently fail

**Evidence**

- `/robots.txt` returns the GitHub Pages 404 page.
- `/sitemap.xml` returns the GitHub Pages 404 page.
- The homepage contains only GitHub's error HTML, not DEXAM content.

**Impact:** there is no crawlable DEXAM content at the canonical domain. The missing robots and sitemap are secondary to the site-wide 404.

**Remediation:** restore the site first. After that, add a validated sitemap/robots workflow on a separate reviewed change.

## P1 — SPA content and metadata need route-level validation after restoration

The repository is a client-rendered Vite/React SPA. Source inspection found a single global title/description and no route-specific canonical, Open Graph or structured-data implementation. Important content is absent from the initial HTML shell. This is a source observation, not yet a rendered-live failure because the live site is unavailable.

## P1 — Lead success state is not tied to successful storage

The lead modal shows success, unlocks downloads and records local captured state before the Google Apps Script request is confirmed; request failures are ignored. This can create lost leads and false conversion assumptions. No production test submission was made because the plan prohibits contacting/writing real systems without a release/test gate.

## First three fixes proposed for review

1. Re-enable/reattach GitHub Pages and verify the domain serves the current build. Estimated effort: 15–45 minutes, plus GitHub certificate/DNS propagation if the domain must be reverified.
2. Add automated smoke checks for homepage status, custom-domain output and post-deploy verification so a site-wide 404 cannot remain unnoticed. Estimated effort: 1–2 hours.
3. Add a correct robots/sitemap/canonical foundation and route-level crawlable metadata after the live build is restored. Estimated effort: 0.5–1.5 days depending on the chosen static-rendering approach.

No fix has been deployed.
