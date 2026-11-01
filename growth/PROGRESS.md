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

### 2026-11-01 — Approved Discovery website release prepared

**Action:** Integrated the owner-approved website design, 30 visual assessment exercises, campus illustrations, design contract and expanded public information architecture with the latest main-branch SEO and enquiry fixes. Added real pre-rendered page content, trailing-slash canonicals, shared accessible text colors and PR validation in the existing Pages workflow. Unconnected paid-report checkout is disabled and labelled coming soon.

**Verification:** A clean `npm ci`, production build, static check (31 routes and 1,044 links), eight assessment tests and 69 browser release tests pass. Browser coverage includes desktop/mobile direct entry, hydration, canonical URLs, overflow, core WCAG A/AA scans, campus assets/links and mocked enquiry delivery states. No real lead was submitted. Existing React Router production advisories remain deferred to a dedicated major-version migration; this release does not introduce them.

**Release:** Owner authorization received on 1 November 2026. Publish from `codex/discovery-site-redesign` through a checked PR and the existing GitHub Pages deployment. Previous main `4a6d348` is retained as the rollback point. Record CI and live verification in the release PR.

### 2026-11-01 — T08: Social sharing preview prepared

**Observed before:** The pre-renderer produces unique titles, descriptions, canonical URLs and structured data for 31 routes, but shared links have no explicit Open Graph image or large-card Twitter metadata.

**Action:** Added an original 1200×630 Discovery-brand social card using the approved paper, forest, orange, yellow and lime system. Every public route now receives absolute Open Graph and Twitter image metadata, explicit dimensions and useful alternative text. The static release check verifies the PNG signature, sharing tags on every route and a 500 KB image budget.

**Privacy/security:** The asset contains no student image, testimonial, result, personal information, tracking request or third-party artwork. It is generated from a versioned code-native SVG and served from the existing site origin.

**Follow-up:** Run the complete release gate, push a focused PR, verify CI, deploy and confirm production metadata and image delivery.

### 2026-11-01 — T02: Measurement-account access checked

**Observed:** A read-only check of the currently signed-in Google account found no accessible Search Console property for either `designexam.com` or `https://designexam.com/`. Google Analytics opened the new-account welcome screen rather than an existing account/property. No ownership, permission, analytics, tag or site setting was changed.

**Action:** Created the ignored `growth/private/` baseline workspace and a local missing-data register so future Search Console, GA4, Google Business Profile and advertising exports remain outside version control. Updated the task ledger with the exact access dependency instead of treating missing metrics as zero.

**Decision gate:** The owner must identify an existing Google account with access, or approve creating/verifying new Search Console and GA4 properties. Search Console verification would grant persistent ownership to the selected account, so it will not be performed silently.

### 2026-11-01 — T09: Structured site-name and breadcrumb data prepared

**Observed before:** Every direct route emitted JSON-LD, but the homepage described only the academy and nested pages collapsed their full hierarchy into a two-item trail. For example, a paper archive did not identify its Resources and Previous year papers parents. The homepage also lacked the `WebSite` data Google currently recommends for a preferred site name.

**Action:** Centralized structured-data generation in the route model. The homepage now identifies the `DEXAM` website and the existing educational organization; all other public routes emit a canonical breadcrumb trail that matches their real exam, resource, paper or article hierarchy. No review, rating, result, Course offer, availability, or other unsupported commercial claim was added.

**Verification:** Production build and static site checks pass for 31 direct routes. Three route-model tests, eight assessment tests and 69 desktop/mobile/accessibility browser tests pass. The static release check parses every JSON-LD block, validates its context, ordered list items, absolute same-origin URLs and canonical destination.

**Follow-up:** Complete diff/security checks, open a focused PR, deploy only after CI passes, then validate representative live pages. Search Console URL Inspection remains dependent on T02 access.

**Release evidence:** PR #6 merged as `f4d68f2` after the GitHub build gate passed. Pages workflow `41285646080` completed successfully. The live smoke check returned HTTP 200 for the canonical site, core routes, robots and sitemap, with `www` redirecting to the apex. Cache-bypassed production fetches parsed the homepage `WebSite`/`EducationalOrganization` graph and full breadcrumb trails on `/exams/nid/`, `/papers/uceed/` and `/resources/drawing-vs-design/`.

**External validation limitation:** Google’s Rich Results Test was attempted against the live UCEED paper archive, but the tool reported that it could not connect to its reCAPTCHA service and asked for a retry later. This is recorded as an unavailable external check, not as a pass or a schema defect. Search Console URL Inspection remains gated on T02 account access.

### 2026-11-01 — T05: Competitive and AI-search baseline prepared

**Method:** Sampled fourteen fixed Google Search queries in Chrome using India country/language settings and `pws=0`, with the displayed Pune device-location context coarsened before recording. Sponsored results, private account oneboxes and AI output were excluded from ordinary web-result rows. Defined sixteen repeatable AI prompts and sampled five in Google AI Mode.

**Observed:** DEXAM appeared in six of eight sampled local-intent map packs but in none of the sampled first-eight ordinary web results. Google AI Mode mentioned DEXAM only for the hyperlocal Amanora Park Town prompt, as a local entity with a direct website link; it did not mention DEXAM for the four sampled topical practice/guidance prompts. Dedicated exam resource pages and official sources dominate paper/mock intent.

**Privacy/security:** The public baseline excludes the signed-in email address, exact device-derived locality, account and campaign identifiers, phone numbers, advertising audiences and private performance data. A read-only Google Ads status observation is retained only in the ignored private register. No ad, profile, account or campaign state changed.

**Next:** Validate both CSV contracts, complete the release review, then use this baseline to prioritize one evidence-rich mock/practice page and repeat the same samples monthly. Search Console-driven keyword prioritisation remains gated on T02.

**Release evidence:** PR #8 merged after its full GitHub build gate passed. Pages workflow `41286409932` completed successfully, including the growth-data contract, 31-route static validation, route-model and assessment tests, and 69 browser journeys. The post-deploy smoke check returned HTTP 200 for the apex, representative routes, robots and sitemap; `www` redirected to the canonical apex. T05 is complete as a dated baseline. Trend conclusions remain pending a like-for-like future sample.
