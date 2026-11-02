# Public website accessibility and readability

Owner request: 2 November 2026. This is a readability refinement of Discovery 1.0: preserve its fonts, palette, illustrations and design principles. It is not a WCAG certification or a change to assessment scoring.

## Authoring contract

- Use root-relative `rem` text sizes, allowing the reader's default font preference and zoom to work. Normal prose and form text are at least 1rem (16px with the usual browser default); editorial/legal reading text is 1.125rem (18px); supporting text, sources, metadata and badges are at least .875rem (14px). These are DEXAM's readability choices, not a WCAG-mandated minimum font size.
- Keep readable line heights and allow text to wrap. Do not shrink labels to fit a card or navigation bar. Reflow the layout instead. Navigation collapses at tablet widths and supports scrolling when the menu needs more room.
- Primary controls and source links have comfortable 44px targets. Retain visible, contrasting focus rings and persistent field labels. Body-copy links use underlines.
- Essential public copy must not live only inside an illustration. The compact brand descriptor is part of the logo; it may be 10px because the complete academy name is also the link's accessible name. Decorative thumbnail lettering and assessment stimulus typography keep their authored proportions. Do not change the optical assessment's fonts, colours or graphic geometry merely to satisfy a prose-size rule.
- Aim for WCAG 2.2 AA: text contrast, keyboard operation, logical focus, accessible names, reflow and reader overrides. Ordinary text needs at least 4.5:1 contrast; large text has a 3:1 threshold. Do not use low-opacity caption text on a dark panel without measuring it.
- Support a 320 CSS-pixel layout, 200% text resizing, and user text spacing without losing content or controls. Two-dimensional tables and interactive canvases have different layout needs; confine any horizontal scrolling to their own container.
- Keep the skip link's main target focusable. Escape closes mobile navigation and restores focus to its toggle. The assessment collection uses a native modal dialog with focus cycling, Escape handling and focus restoration. Its decorative thumbnails are hidden from assistive technology and completed status is included in each challenge button's name.

## Audit findings and fixes

The baseline audit covered all 37 public routes at desktop width. It found 54 groups of text elements below 14px, with some text at 6–10px. This was a readability problem even where automated WCAG checks passed. It also found four contrast-failing nodes: two studio-photo captions on About and the update subtitles on Privacy and Terms. Those captions/subtitles now use stronger paper text on the existing green backgrounds.

The extended checks exposed horizontal overflow in the footer with enlarged/spaced text and inconsistent keyboard cycling in the assessment collection. The footer now wraps, the desktop exam dropdown opens within the viewport, and collection focus cycles within the dialog. The main skip target is explicitly focusable.

The final live check also caught broken wordmark and menu lettering in a 319px panel. Those labels now remain intact; the compact header uses the wordmark with its full accessible name, and controls can move to another row when enlarged text needs space.

## Repeatable verification

`tests/browser/accessibility.spec.js` covers automated WCAG 2.2 A/AA rules and the project's 14px readable-copy floor across every public route at 1440px and 320px. It also covers:

- 200% root text and the WCAG text-spacing override on seven representative routes;
- keyboard skip navigation, mobile menu opening, Escape and focus restoration;
- challenge collection focus cycling and closing;
- automated accessibility checks for all 30 interactive workspaces;
- arrow-key movement of the first challenge's drag handle;
- enlarged-text paper-download form readability, Escape and focus restoration.

Existing release and admissions checks still cover cards, expanded programme sources, curriculum disclosures, form validation and delivery states, and responsive navigation. Re-run the production build, `check:site`, assessment model tests and browser suite when these patterns change. Inspect actual desktop/mobile rendering as well as test output.

The audit does not establish complete WCAG conformance. Screen-reader usability with VoiceOver/NVDA, representative disabled-user testing, and equivalent alternatives for inherently visual assessment tasks remain manual review work. Automated checks do not assess the validity or accessibility of a design aptitude assessment for every disability. Public paid report delivery remains outside this release.

## Reference

- [WCAG 2.2 — Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- [WCAG 2.2 — Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [WCAG 2.2 — Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 — Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
