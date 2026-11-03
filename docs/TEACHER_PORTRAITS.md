# Teacher portrait treatment

## Current four-mentor editorial posters

The owner's subsequent request on 2 November 2026 replaces the initial homepage experiment with four natural-colour editorial portraits: Snehalkumar Shinde, Siddhant Modi, Vinod Kumar and Prajna Nayak. Their poses and clothing follow the supplied studio-poster references. The portraits are composites around their source faces; they are not documentary photos of a real shoot. No reference model's face or branding is used.

- `src/site/mentor-data.js` owns names, the approved roster, verified professional details and asset paths. `src/data.js` re-exports that array for legacy consumers.
- `src/site/Mentors.jsx` owns the reusable poster, homepage selector and full About directory. `HeroCollage` in `Art.jsx` re-exports the homepage component. Four manually selected mentor views replace the earlier illustration-view controls; there is no automatic rotation.
- `src/site/mentors.css` owns the card artwork, accessible content and responsive layout. Poster type behind the portrait is decorative; the full name and credentials remain outside the image, selectable and accessible.
- The four active `<mentor-id>-seated-v2.webp` assets live in `public/assets/mentors/`. Alpha is preserved and no theme filter recolours faces. Local masters, source portraits and exact built-in generation prompts live in the task workspace's `output/imagegen/mentor-posters/`.
- [Profile evidence and limitations](MENTOR_PROFILE_SOURCES.md) records education, current roles, the exact J. J. institute name, and the uncertainty in neutralising Vinod's strongly coloured source lighting.

Use only owner-approved source photos and verified names. Do not invent credentials, engineering branches or unprovided mentors. Current jobs are individual background, not a claim of employer endorsement. Keep the surrounding Discovery design system, source-profile links and keyboard-accessible controls.

### Seated proportion correction — 3 November 2026

The owner confirmed the seated portraits should remain and identified oversized heads as the cause of the shortened appearance. The active second seated versions use a targeted built-in image edit to reduce head size, aiming for approximately 15–18%, while retaining the face, expression, skin colour, seated pose, body, clothing and seat. No CSS stretch or image-wide scaling is used. Framing and card dimensions remain the same. The original seated images are retained for comparison in the task workspace; unused image options remain outside website assets.

Masters are `<mentor-id>-seated-v2.png`, with exact prompts in `generation-prompts-seated-v2.md` in the task workspace's portrait output directory. Website assets are encoded with `cwebp -q 88 -alpha_q 100 -m 6`. The owner authorized publication on 4 November 2026; see [release validation](releases/2026-11-04-dark-mode-mentors.md).

Verification for this image-only revision: all four 1024 × 1536 WebP assets retain transparent alpha; the production build, site checks, eight assessment model tests and 16 existing mentor/visual-layout browser checks passed. Both gallery rows were visually reviewed at normal desktop width, and a seated card was reviewed at 390px. The viewport override was reset. Existing credentials, controls, card styling and assessment behaviour were not changed.

## Earlier halftone option

Requested by the owner on 2 November 2026: feature Modi in the homepage's right-hand paper-card collage using the supplied teacher photo and halftone cutout reference.

The reference defines the print treatment, not the subject. The asset was created with the built-in image-generation tool, preserving the supplied teacher's glasses, smile, hair and identity while removing the office background. It uses black halftone ink, opaque ivory paper and a transparent exterior. Decorative arrows and the name remain website elements, so they scale and stay accessible.

- Earlier website asset: `modi-halftone-cutout.webp`, 1072 × 1467, 467 KB, with lossless alpha. The generated PNG was transcoded with `cwebp -q 90 -alpha_q 100 -m 6`. This unused option is archived in the task workspace's `output/imagegen/mentor-posters/earlier-website-assets/` and is excluded from the published website.
- Local master and exact generation prompt: the task workspace's `output/imagegen/modi-halftone-cutout.png` and `output/imagegen/modi-portrait-prompt.txt`.
- Component: `HeroCollage` in `src/site/Art.jsx`. The teacher card is the initial view. Its pressed-state buttons retain the three existing original illustration views, with no automatic rotation.
- Styling: `src/site/mentors.css`. Keep the same portrait and paper colours in both themes; do not invert or tint the face. Keep the name and role as real text. The name link goes to the existing teacher section on About.

The earlier image remains available locally as an alternative; it is not an active four-mentor poster asset. Continue using original SVG for design illustrations.

Verification covers image loading, keyboard view switching, the teacher-section link, caption/control clearance at 320/390/768/1440px, and the existing light/dark accessibility and enlarged-text suite. Review the face and paper edge visually as well as running automated checks.
