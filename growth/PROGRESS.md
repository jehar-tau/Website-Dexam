# DEXAM growth progress

### 2026-10-30 — T00: Repositories, access and backup (in progress)
**Observed before:** The execution workspace was empty and not a Git repository. The connected GitHub account initially returned no installed-repository list, but public/account-scoped search identified `jehar-tau/Website-Dexam`; the connection reports admin/push access. The repository is public, uses Vite/React and deploys from `main` through GitHub Actions. GitHub reports `has_pages: false`.

**Action:** Cloned the correct repository, created local branch `codex/t00-baseline-audit`, inspected manifests, routes, deployment workflow, domain files, metadata and lead data flow, and documented the inventory and rollback path.

**Verification:** `npm ci` completed and `npm run build` passed with Vite 5.4.21: 64 modules transformed and production files emitted to `dist/`. npm reported 9 dependency vulnerabilities (5 moderate, 4 high); no automatic or breaking upgrade was applied. No live change was made.

**Result:** Correct source and deployment design are identified and the current source builds locally. T00 remains `in_progress` until the owner reviews the Pages repair path and the checkpoint is available for review.

**Owner action required:** Approve a repair PR/release after reviewing the baseline; confirm preferred canonical host (`designexam.com` is the repository's current setting).

**Follow-up:** T01 diagnostics and smallest Pages repair.

### 2026-10-30 — T01: Live crawlability diagnostics (in progress)
**Observed before:** Apex and `www` DNS resolve to GitHub Pages. TLS succeeds, but homepage, `robots.txt` and `sitemap.xml` all return GitHub Pages' HTTP 404 “Site not found.”

**Action:** Captured DNS and raw HTTP evidence and compared it with repository/Actions state.

**Verification:** `dig` and `curl` checks from the current network; GitHub repository API reports Pages disabled; latest observed deployment workflow run was successful on 2026-07-31.

**Result:** The first P0 is an inactive/detached GitHub Pages site, not a generic network failure. No production setting was changed.

**Owner action required:** Approve restoration of Pages/custom-domain deployment after the proposed change is reviewed.

**Follow-up:** Inspect Pages configuration in GitHub UI, prepare the smallest reversible repair, then live-smoke-test both hosts.

## Next three tasks

1. Complete T00 local build verification and checkpoint documentation.
2. Prepare the T01 Pages restoration change/release for owner approval without deploying it.
3. Start T02's private baseline folder and missing-data register; import owner-provided Search Console, GA4, GBP, Instagram and ads exports without altering originals.
