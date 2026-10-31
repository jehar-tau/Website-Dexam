# Campus illustration set

Created 2026-11-01 for the owner-requested NID, NIFT and IIT preparation section on the academy landing page.

## Files and use

- `public/assets/campuses/nid-discovery-v1.webp` — NID entrance illustration.
- `public/assets/campuses/nift-discovery-v1.webp` — NIFT entrance illustration.
- `public/assets/campuses/iit-idc-discovery-v1.webp` — the supplied IDC entrance image, used for the IIT design-preparation card.
- `src/site/CampusPathways.jsx` and `src/site/campuses.css` — responsive section and existing entrance-guide links.

Website exports are 1200 × 800 WebP, quality 90, generated from 1536 × 1024 PNG masters. All images are local, have intrinsic dimensions, descriptive alt text and lazy decoding/loading; the existing hero is unchanged. The IIT card links separately to UCEED and CEED. These are preparation pathways, not admission or affiliation claims.

Full PNG masters are also saved in the task workspace at `Design fitment test/output/campus-illustrations/` with the matching `*-discovery-v1.png` names. Original built-in outputs remain in the generation directory. Do not replace these with unrelated generic campus illustrations.

## Generation and provenance

Mode: built-in image generation, style-transfer edit. No CLI/API-key fallback. The three edit targets were the owner's photo attachments; the common style reference was the approved academy homepage screenshot. The photo-specific massing, entrance details and recognizable short signage were preserved while simplifying color and foliage into the Discovery palette. The originals have not been altered or added as public website assets.

The uploaded photos identify the institutions; no unverified city/campus attribution has been added. The generated art is an editorial interpretation rather than an archival photograph. HTML labels carry the institution names and entrance routes.

## Exact prompts

### nid

Edit target: `codex-clipboard-4c22849b-4ed5-4dd8-b236-aa345737b960.png`.

Style reference: the approved academy homepage (`review/academy-home-review.png` in the task workspace).

```text
Use case: style-transfer. Asset type: one finished architectural illustration for a three-card row on the Design Exam Academy website. Image 1 is the edit target and supplies the exact campus identity, architecture, and viewpoint. Image 2 is a STYLE REFERENCE ONLY: match its original flat geometric illustration language and palette, never reproduce the website layout, poster frames, cards, UI, slogans, or typography. Transform the photograph into a polished original editorial architectural drawing, not a photographic color filter. Crisp vector-like planes, restrained thin forest-green outlines, simple geometric foliage, subtle flat ground shadow, generous clean warm-paper negative space. Palette tightly restricted to paper #faf9f3, forest #386451, dark ink #162824, orange #ef633d, ochre yellow #edc668, lime #dceba1 and a few muted sage/cream tints. Clean flat colors with at most a very faint paper texture; no gradients, glow, realistic rendering, watercolor, pencil hatching, thick comic outlines, or dramatic shadows. Landscape 3:2 image. Show the COMPLETE identifiable entrance as one coherent scene occupying roughly 80% of the canvas, with a small quiet margin on every side; no cut-off architecture or foreground objects. Preserve the photographed massing, proportions, window pattern and entrance details while simplifying clutter. No new floors, invented towers, cars or people. No surrounding borders, UI, captions or decorative stars. Omit unreadable small Hindi/English signage; use only the specified short acronym, accurately spelled. This is part of a coordinated series: consistent line weight, perspective treatment, object scale and paper background.

Subject: NID entrance wall in Image 1. Preserve the low broad red-brick wall and its large distinctive concrete geometric NID cut-out/monogram at left: small circular opening above, triangular wedge at lower left, large curved D-like opening at right. Translate brick to warm orange/terracotta blocks, concrete to pale sage and cream, lush low plants to restrained geometric forest and lime leaves. Keep the wall dominant and instantly recognizable. Simplify the foreground fence into a few fine green posts and chains, without allowing it to obscure the monogram. Replace the wall's small photographed signage with only the exact plain uppercase text 'NID', at the right side, large enough to be clean. Remove photographic trees and sky clutter; a few flat foliage silhouettes may frame the wall.
```

### nift

Edit target: `codex-clipboard-dba57373-1bed-4f8d-8355-a860adb92a89.png`.

Style reference: the approved academy homepage (`review/academy-home-review.png` in the task workspace).

```text
Use case: style-transfer. Asset type: one finished architectural illustration for a three-card row on the Design Exam Academy website. Image 1 is the edit target and supplies the exact campus identity, architecture, and viewpoint. Image 2 is a STYLE REFERENCE ONLY: match its original flat geometric illustration language and palette, never reproduce the website layout, poster frames, cards, UI, slogans, or typography. Transform the photograph into a polished original editorial architectural drawing, not a photographic color filter. Crisp vector-like planes, restrained thin forest-green outlines, simple geometric foliage, subtle flat ground shadow, generous clean warm-paper negative space. Palette tightly restricted to paper #faf9f3, forest #386451, dark ink #162824, orange #ef633d, ochre yellow #edc668, lime #dceba1 and a few muted sage/cream tints. Clean flat colors with at most a very faint paper texture; no gradients, glow, realistic rendering, watercolor, pencil hatching, thick comic outlines, or dramatic shadows. Landscape 3:2 image. Show the COMPLETE identifiable entrance as one coherent scene occupying roughly 80% of the canvas, with a small quiet margin on every side; no cut-off architecture or foreground objects. Preserve the photographed massing, proportions, window pattern and entrance details while simplifying clutter. No new floors, invented towers, cars or people. No surrounding borders, UI, captions or decorative stars. Omit unreadable small Hindi/English signage; use only the specified short acronym, accurately spelled. This is part of a coordinated series: consistent line weight, perspective treatment, object scale and paper background.

Subject: NIFT entrance building in Image 1. Preserve the stepped grey-stone geometric facade, left stairway and thin rails, long high horizontal glazing, the asymmetric right roof plane, the orange rectangular entrance supports and the unmistakable thin sweeping oval/elliptical metal canopy running across the entrance. Treat stone planes in pale cream/sage, window recesses in forest green, entrance piers in orange, and selected glazing in warm yellow. Use a few geometric plants. Replace all photographed signage with only the exact plain uppercase text 'NIFT' in a modest forest-green label integrated into the upper facade. Architecture and elliptical canopy must remain faithful and clear; do not redesign it as a generic college, cafe or house.
```

### iit-idc

Edit target: `codex-clipboard-77879656-e6fe-462e-99c0-b685b6dcc384.png`.

Style reference: the approved academy homepage (`review/academy-home-review.png` in the task workspace).

```text
Use case: style-transfer. Asset type: one finished architectural illustration for a three-card row on the Design Exam Academy website. Image 1 is the edit target and supplies the exact campus identity, architecture, and viewpoint. Image 2 is a STYLE REFERENCE ONLY: match its original flat geometric illustration language and palette, never reproduce the website layout, poster frames, cards, UI, slogans, or typography. Transform the photograph into a polished original editorial architectural drawing, not a photographic color filter. Crisp vector-like planes, restrained thin forest-green outlines, simple geometric foliage, subtle flat ground shadow, generous clean warm-paper negative space. Palette tightly restricted to paper #faf9f3, forest #386451, dark ink #162824, orange #ef633d, ochre yellow #edc668, lime #dceba1 and a few muted sage/cream tints. Clean flat colors with at most a very faint paper texture; no gradients, glow, realistic rendering, watercolor, pencil hatching, thick comic outlines, or dramatic shadows. Landscape 3:2 image. Show the COMPLETE identifiable entrance as one coherent scene occupying roughly 80% of the canvas, with a small quiet margin on every side; no cut-off architecture or foreground objects. Preserve the photographed massing, proportions, window pattern and entrance details while simplifying clutter. No new floors, invented towers, cars or people. No surrounding borders, UI, captions or decorative stars. Omit unreadable small Hindi/English signage; use only the specified short acronym, accurately spelled. This is part of a coordinated series: consistent line weight, perspective treatment, object scale and paper background.

Subject: the IDC design-school entrance in Image 1, representing IIT design preparation. Preserve the off-white modernist building, tall narrow red/brick-orange gridded glazing on the left, strong horizontal row of recessed windows extending right, and the projecting flat rectangular entrance canopy supported by square columns. Keep the exact short text 'IDC' on the canopy face, using simple orange letters. Simplify the garden, palm fronds and side tree into a few crisp geometric forest/sage shapes, keeping the facade visible. Render the body in cream, window grids in orange/forest, with controlled yellow and lime foliage accents. Keep the actual front-left viewpoint, all characteristic building proportions, and a clear path to the entrance. Do not add domes or generic university towers.
```

## Verification

Passed on 2026-11-01: production build; `npm run check:site` (31 direct routes, 1,044 internal links, all three valid WebP files below the 250 KB per-image budget); all eight assessment tests; and diff whitespace checks. Browser review verified the new section at 1440px and 390px, all three images loaded at their expected 1200 × 800 intrinsic size, no horizontal page overflow, visible keyboard focus, and the NID, NIFT, UCEED and CEED destinations. Captures are saved as `review/academy-campus-desktop.png` and `review/academy-campus-mobile.png` in the task workspace. The temporary viewport was reset after testing.

The section is at `/#campus-pathways`, with a development preview at `http://127.0.0.1:5173/#campus-pathways`. Publication follows the reviewed website PR and GitHub Pages workflow; release evidence is recorded with that PR.
