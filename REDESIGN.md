# Design Exam Academy — discovery design system

Review branch: `codex/discovery-site-redesign`

2026-11-01: the owner supplied three campus photographs and requested matching illustrations on the landing page. The new NID/NIFT/IIT preparation section uses a coordinated generated-art set and links to NID DAT, NIFT, UCEED and CEED guides. See `CAMPUS_ART.md` for the source/prompt record and saved exports. It is part of the local redesign preview; no website publication has occurred.

The owner approved this visual language for the academy and the entire DexAM app on 2026-10-31. `DESIGN_SYSTEM.md` is the ongoing visual authority, `design-system.tokens.json` is its versioned primitive contract, and `AGENTS.md` requires future UI work to follow it. `check:site` checks the approved academy palette and typefaces as well as the existing route checks.

The public website now shares the Design Instinct assessment’s paper palette, forest-green ink, orange/lime accents, Figtree body type, expressive Zilla Slab headings, original SVG illustrations and tactile editorial cards. The assessment remains a focused standalone workspace in the same brand family.

## Review locally

```sh
npm run dev -- --host 127.0.0.1
npm run build
npm run check:site
node --test src/assessment/model.test.mjs
```

The build pre-renders public content for GitHub Pages. To inspect those generated pages locally, use `npm run preview` and trailing-slash routes such as `/courses/`. The development server supports both forms. Hydration checks the generated route identity before using existing HTML, preventing a fallback homepage from being hydrated as a different route.

## Information architecture

| Visitor need                                | Main destinations                                                                   |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Explore whether design is interesting       | `/design-careers`, `/quiz`, `/guide`                                                |
| Choose structured preparation               | `/courses`, `/contact?programme=one-year`, `/contact?programme=two-year`            |
| Understand an exam route                    | `/exams`, `/exams/nid`, `/exams/uceed`, `/exams/nift`, `/exams/nata`, `/exams/ceed` |
| Find useful free practice                   | `/resources`, five original practice notes, `/papers` and five paper archives       |
| Find local coaching and people              | `/about`, `/design-coaching-pune`, `/contact`                                       |
| Explore upcoming products or student access | `/mock-tests`, `/student-access`                                                    |

Existing public routes remain available, including `/guide`, `/results`, `/papers/:examId`, `/quiz`, `/privacy` and `/terms`. Legal page content is retained with the new visual treatment. `/admin` remains separate.

## Visibility-plan decisions carried forward

- Uses the confirmed fees: ₹1,13,557 for the two-year programme and ₹73,535 for one year.
- Keeps separate test-series and portfolio/studio products labelled as in preparation; no invented fee, schedule, online sale or availability.
- Introduces substantive individual exam hubs, a Pune studio page and an original resource library without duplicating pages for near-identical keywords.
- Provides official-source links rather than repeating unverified exam dates, eligibility details or weightages from the earlier data file.
- Removes placeholder testimonials, unsupported placement/company claims and missing-image boxes from the rendered public experience. Mentor information is carried from the existing academy content; artwork is illustrative, not a fabricated faculty portrait or student submission.
- Preserves the Google Sheets enquiry destination and paper-download access flow. Submission waits for the request, disables duplicate clicks and keeps the form intact after a network error. An opaque cross-origin Apps Script response confirms browser delivery only, not spreadsheet storage.
- Generates 30 pages with readable HTML and 31 direct-entry routes including the client-side assessment, unique titles/descriptions, canonicals, Open Graph text, organization/breadcrumb data, robots and sitemap. No indexing or ranking outcome is claimed.

## Source organization

- `src/site/content.js`: programme, exam, discipline, guide and FAQ content.
- `src/site/Art.jsx`: original SVG illustration library and interactive hero collage.
- `src/site/components.jsx`: shared page heroes, cards, calls to action, FAQ and metadata.
- `src/site/Pages.jsx`: public page templates and interactions.
- `src/site/academy.css`: scoped website design system and responsive layouts.
- `src/site/routes.js`: public route metadata and structured organization data.
- `scripts/prerender.mjs`: static HTML and discovery-file generation.
- `scripts/check-redesign.mjs`: generated-content, metadata, internal-link, fee and sitemap checks.

## Verification

The production build, generated-site checks and eight assessment scoring tests pass. All 31 production routes were opened in-browser with one H1 each and no new application errors. At 390px all 31 routes have no horizontal page overflow. Mobile navigation, resource-category/search filtering, course-specific enquiry handoff and empty-form validation were checked. No real enquiry was submitted. The paper modal supports keyboard focus containment and Escape to close.

## Release boundary

This is a local review build. No production domain, ads, analytics account or student platform was changed. The substantial new editorial content and inherited faculty/legal information should receive owner/faculty review before the GitHub Pages release. The student-access page uses the academy contact route until the confirmed public production portal URL is supplied; it does not guess a login destination. Existing Razorpay/report limitations are documented in `src/assessment/README.md`.

Release through the existing GitHub Pages workflow after review. Preserve the previous deployed commit for rollback; verify direct routes, enquiry non-submission states and the sitemap after deployment.
