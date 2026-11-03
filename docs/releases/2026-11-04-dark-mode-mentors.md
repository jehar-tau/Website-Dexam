# Website dark mode and mentor posters

The owner authorized publication to designexam.com on 4 November 2026.

Visitors can choose the Discovery dark theme from the website and assessment headers. It follows the device preference until manually chosen and remembers that choice across pages and tabs. Four mentor posters appear on the homepage and About, with verified education, current roles and profile links. The selected assets retain seated poses with the smaller-head revision requested by the owner. Unused image options are archived outside the website.

The release incorporates main through `184bd9b` (the consent-gated analytics implementation and live verification). The analytics behaviour remains intact. During integration, the consent panel's inherited dark text was found on its original light background; it now uses the dark semantic surface and action colours. Assessment scoring, visual workspaces, report availability and form delivery are unchanged.

## Validation before publication

- `npm run build`: 36 pre-rendered public pages; 37 direct-entry routes and sitemap.
- `npm run check:site`: redesign/content checks, 17 site unit checks and growth-data contract passed.
- `node --test src/assessment/model.test.mjs src/analytics.test.mjs`: 11 passed.
- `npm run test:browser`: all 295 passed, including every public route in dark mode at desktop/320px, mentor assets and keyboard controls, enlarged text, all 30 assessment workspaces, consent choices and the new phone consent contrast regression.
- `npm audit --json`: zero reported vulnerabilities.
- Changed text checked for common private-key/token patterns; `git diff --check` passed.
- Visual review: approved seated portraits previously reviewed at desktop/phone sizes; combined homepage and consent panel reviewed in dark mode before publication.

The existing GitHub Pages workflow validates pull requests before merge and builds/deploys main. Confirm the completed deployment and the live homepage/About after merging. Automated accessibility checks are not a complete WCAG certification.
