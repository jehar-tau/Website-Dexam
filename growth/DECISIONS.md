# DEXAM growth decisions

## 2026-10-30 — Preserve the existing stack

The current site is Vite + React and builds through GitHub Actions. No framework migration will be considered until the site is restored and baseline evidence shows that a smaller remediation cannot meet crawlability and conversion needs.

## 2026-10-30 — Treat the site-wide 404 as the first P0

DNS and TLS reach GitHub Pages, but the repository reports Pages disabled and both canonical hosts return GitHub's Pages 404. Repository Pages configuration is the first repair target; DNS changes are not justified by current evidence.

## 2026-10-30 — No deployment during T00/T01 audit

All work stays on `codex/t00-baseline-audit` pending owner review. External Pages settings, DNS and production deployment remain unchanged.
