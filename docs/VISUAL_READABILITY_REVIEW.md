# Visual readability review

Requested 2 November 2026. This revision refines Discovery 1.0 after the accessibility changes. The owner reviewed the local preview, requested shorter copy, and approved publication on 2 November 2026. The earlier local-only restriction applied during that review.

## Comparison versions

- Published starting point: `73c55d2` (readability releases #21–23).
- Earlier visual reference: `ef2934b`, immediately before the mobile/readability releases. Its content and dependency updates are preserved in a separate temporary reference checkout.
- Local candidate: `codex/local-visual-balance` in the website-release checkout.
- Candidate preview: `http://127.0.0.1:4185/`.
- Earlier styling preview: `http://127.0.0.1:4186/`.

## Findings and corrections

| Finding | Correction |
| --- | --- |
| Navigation links had 44px targets but ordinary anchors aligned their text at the top, while the exam summary centred its text. | All navigation labels now use the same line height, centred alignment and 14px type. The primary action uses the same target height. |
| Enlarged type could make the desktop navigation wrap or crowd. | A font-relative container breakpoint switches to compact navigation when the labels need more room, including enlarged text. |
| Controls, upper-case labels and explanatory copy had lost their hierarchy. | Body text stays 16px, supporting labels 14px and primary marketing actions 15px. Paragraph leading is generally 1.65, with 18px/1.75 for long reading. Tracking is proportional and restrained. Click targets remain independent of label font size. |
| The enlarged homepage micro lettering and absolute tab row collided with the collage. | Nonessential decorative lettering returns to 10px and is hidden from assistive technology. Meaningful captions and controls remain readable. Controls now occupy their own row; the mobile note follows the main card. |
| Programme captions overlapped the bottoms of illustrations. | Artwork and caption occupy separate grid rows with a defined gap. |
| Programme benefits started at different heights because the timeline was inserted before only the first card's list. | Shared title/description rhythm aligns the benefit lists; timeline chips follow the benefits. Programme actions remain aligned. |
| Discipline badges and long field names shifted the descriptions and disclosures. | Multi-column cards reserve space for two badge/title lines and three description lines. These are minimums that grow with content, and are removed in the single-column layout. |
| Degree and college card titles, facts and sources drifted from one another. | Cards share content-sized rows using CSS subgrid; no text is clipped to force alignment. |
| The mobile exam ribbon mixed its label with the five exam entries. | The label occupies its own row above a regular three-column grid. |
| Long current-page breadcrumbs orphaned Home onto a separate row. | The final crumb flexes into the remaining width and wraps within that space. |
| Mentor credentials with different lengths shifted descriptions. | Multi-column credentials have a shared two-line minimum; mobile uses natural content height. |

## Coverage and verification

Captured all 37 public routes at 1440px desktop and 390px phone width and reviewed their page overviews. Inspected the homepage, programme lists, discipline cards, degree and college comparisons, exam menu, archive actions, ranking table, contact form and studio section at full size. Also checked key component layouts at 320px, 768px and 1280px.

The audit screenshots and route inventories live outside the publishable source in the task's `output/visual-audit/` directory. Initial overview captures record the inspection stages; the final preview screenshots record the finished candidate.

The existing automated suite covers all public routes, contrast/name checks, enlarged text and spacing, keyboard navigation, forms and all 30 assessment workspaces. New geometry checks cover navigation text alignment, separation between artwork and controls/captions, programme benefit/action alignment, degree/college comparison rows and compact navigation at 200% text. Run the build, site checks, assessment model tests and full browser suite before reviewing or publishing further changes.

Final validation: production build, `check:site` and all eight assessment model tests passed. All 202 browser checks passed, including the comparison-row and navigation geometry checks.

This is a visual/readability correction, not full accessibility certification. Contrast fixes, focus handling, native modal semantics and keyboard behaviour are retained. School/programme facts, counselling delivery, access, scoring and payment rules are unchanged.

## Future editing rule

Review the component at normal desktop, phone and enlarged-text sizes. A minimum font size or passing overflow/axe test alone does not establish a good layout. Check visible baselines, label hierarchy, paragraph rhythm, illustration clearance, naturally growing comparison rows and controls that retain their target size without oversized lettering.

## Copy refinement

The owner then requested shorter text wherever it crowds the layout. The local candidate now tightens 62 distinct labels and passages across programme cards, page introductions, discipline exploration, related guides and counselling. Across those edited fragments, text is 43% shorter by character count; this is not a claim about the entire website.

Examples: “Compare degrees & durations” becomes “Compare degrees”; “Programmes & sources (16)” becomes “Programmes (16)”; “What guidance do you need right now?” becomes “How can we help?”. Programme descriptions and shared calls to action are shorter, and the programme description row now reserves three lines instead of four.

Official programme/discipline names, admissions facts, source links, the full curriculum, consent and legal copy remain intact. Font sizes and click targets are preserved. The production build, site checks, eight assessment tests and all 202 browser checks passed after this edit. The owner approved the combined layout and copy revision for publication.
