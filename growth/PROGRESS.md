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

### 2026-10-30 — T00/T01: GitHub Pages restoration
**Observed before:** Settings → Pages showed `Deploy from a branch`, branch `None`, and “GitHub Pages is currently disabled.” The custom domain field was empty. The public apex and `www` hosts returned GitHub Pages' site-not-found 404.

**Action:** With owner approval, changed the publishing source to GitHub Actions, manually dispatched the existing deployment workflow from `main`, and attached `designexam.com` as the custom domain. HTTPS enforcement remained enabled.

**Verification:** Workflow run `41047160910` completed successfully for commit `54597ecca32d5743969a0c623e2724eae8d257f9`. A cache-bypassed request to `https://designexam.com/` returned HTTP 200 with the DEXAM title. `https://www.designexam.com/` returned HTTP 301 to the apex and then HTTP 200.

**Result:** The homepage is live again at the approved canonical domain. Direct nested routes such as `/about`, `/courses` and `/papers` still return HTTP 404 before the SPA fallback runs. `robots.txt` and `sitemap.xml` also return 404. These are the next evidenced crawlability defects.

**Owner action required:** None for the completed restoration. Review will be requested before merging the next source-code PR.

**Follow-up:** Add automated smoke checks and crawlable route/sitemap/robots handling on a feature branch; verify mobile rendering and conversion journeys without submitting real leads.

### 2026-10-30 — T01/T09: Direct routes and discovery-file repair prepared
**Observed before:** The restored homepage returned HTTP 200, but direct requests to important SPA routes, `robots.txt` and `sitemap.xml` returned HTTP 404. The public Courses page contained five provisional offers with no prices, while the owner confirmed a simpler two-programme offer. The Results page publicly displayed placeholder testimonials and missing-image boxes.

**Action:** Added build-time direct-entry HTML for 15 routes, a 14-URL sitemap, robots policy, and a repeatable public smoke-check script. Replaced the provisional course grid with the confirmed one-year and two-year programmes and their prices, clearly marking unresolved tax/checkout terms. Removed fabricated placeholder testimonials and missing student-work boxes; the page now states the evidence-and-consent gate.

**Verification:** `npm run build` passed; 64 modules transformed and 15 direct-entry route files generated. Local HTTP checks returned 200 for `/`, `/about/`, `/courses/`, `/papers/`, `/papers/nid/`, `/robots.txt` and `/sitemap.xml`. The sitemap contains 14 URLs. Desktop visual inspection of `/courses/` passed. Production dependency audit retains two moderate React Router advisories whose available fix requires a reviewed React Router 7 migration; no forced breaking upgrade was applied.

**Result:** The repair is prepared locally and not yet deployed. It removes a crawlability blocker, makes the flagship offer concrete, and removes misleading placeholder proof.

**Owner action required:** None before PR review. Tax treatment, instalment policy, refunds, batch dates/capacity and secondary-product prices remain future business gates before checkout can go live.

**Follow-up:** Run final diff/security review, push the feature branch, open the PR, verify CI, merge only when checks are clean, then run live smoke checks.

### 2026-10-31 — T07: Honest lead-form delivery states prepared
**Observed before:** Both the paper-unlock modal and counselling form displayed success even when the Google Apps Script request failed. The paper flow also persisted the lead and unlocked downloads before waiting for the request, which could silently lose an enquiry while telling the visitor it had been received.

**Action:** Both flows now wait for the submission request before showing success. Submit controls are disabled and labelled while sending, duplicate clicks are prevented, and a network/configuration failure leaves the form intact with a retryable error and WhatsApp fallback. Paper access is persisted only after the request has been sent successfully.

**Privacy/security:** No new fields, trackers, destinations or data stores were added. The existing Apps Script endpoint remains unchanged. No real lead was submitted during verification.

**Verification:** `npm run build` passed with 64 modules and 15 direct-entry routes. `git diff --check` and the changed-file credential-pattern scan passed. The production dependency audit retains the same two moderate React Router advisories; the available automated fix is a breaking React Router 7 upgrade and remains deferred for a dedicated migration.

**Follow-up:** Complete build and diff checks, deploy through a reviewed PR, then verify the non-submitting public form states in production.
