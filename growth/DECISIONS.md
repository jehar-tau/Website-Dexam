# DEXAM growth decisions

## 2026-10-30 — Preserve the existing stack

The current site is Vite + React and builds through GitHub Actions. No framework migration will be considered until the site is restored and baseline evidence shows that a smaller remediation cannot meet crawlability and conversion needs.

## 2026-10-30 — Treat the site-wide 404 as the first P0

DNS and TLS reach GitHub Pages, but the repository reports Pages disabled and both canonical hosts return GitHub's Pages 404. Repository Pages configuration is the first repair target; DNS changes are not justified by current evidence.

## 2026-10-30 — No deployment during T00/T01 audit

All work stays on `codex/t00-baseline-audit` pending owner review. External Pages settings, DNS and production deployment remain unchanged.

## 2026-10-30 — Simplify the flagship course offer

Owner-confirmed public prices are ₹1,13,557 for the two-year preparation programme and ₹73,535 for the one-year preparation programme. The website will present these as the two primary programmes. Tax treatment, instalments, schedules, capacity, cancellation/refund rules and checkout remain explicitly unconfirmed and must not be invented.

Test series and portfolio/studio-test guidance are disclosed as products in preparation without prices or purchase controls until their commercial terms and content/legal gates are complete.

## 2026-10-31 — Never claim a lead was received before delivery is attempted

Lead forms must not display success, unlock gated material, or persist a captured-lead flag until the configured submission request completes without a browser-level failure. When delivery cannot be attempted, the visitor keeps their entered data, sees a retryable error, and retains the direct WhatsApp fallback. Because the existing cross-origin Apps Script request uses an opaque `no-cors` response, the website can truthfully establish that the request was sent but cannot independently prove that the spreadsheet append succeeded; operational sheet monitoring remains a separate requirement.
