# Design Instinct assessment

Integrated at `/quiz` in the Design Exam Academy website. The assessment has a dedicated layout, 30 interactive tasks, six chapters, nine reported skill areas, browser-local save/resume, per-task undo/reset, a challenge collection, and response-derived reports.

## Run and verify

```sh
npm run dev -- --host 127.0.0.1
node --test src/assessment/model.test.mjs
npm run build
```

`model.mjs` owns task content, initial states, scoring and report aggregation. `Challenges.jsx` owns the interaction engines. `Graphics.jsx` contains reusable SVG artwork, keyboard/pointer handles and controls. `Quiz.jsx` owns navigation, local persistence, trace collection and the result/paywall screens.

## Reference research

- [Brilliant: how visual lessons work](https://brilliant.org/resources/choosing-brilliant/how-brilliant-teaches-math/): concrete manipulatives, single-concept steps, changing a model to expose the underlying relationship. Public interactive previews inspected on Brilliant's homepage; account-only lessons were not accessed.
- [Kern Type](https://type.method.ac/): direct letter positioning, fixed anchors, keyboard nudging.
- [The Bézier Game](https://bezier.method.ac/): visible control handles and curves as the problem itself. Live interface inspected.
- [Color](https://color.method.ac/): colour matching, controlled changes to hue/intensity, minimal verbal instructions.
- [Polypad](https://mathigon.org/teachers): movable geometry and transformation controls.
- [Can't Unsee](https://cantunsee.space/): visual discrepancy detection.

These inform interaction patterns. The implementation, artwork, prompts and scoring are original. Pinterest's search page was inaccessible during research; it was not used as a source of assets.

## What scores mean

The scores measure performance against these exercise rubrics. They are not validated measures of innate talent, career suitability, admission chances or employability.

- Matching, ordering, pattern detection, alignment, tangram placement, route avoidance and touch-target constraints use explicit geometric or structural rules.
- Poster layouts permit multiple positions; scoring checks containment, scale and line separation. Puzzle pieces can be interchanged without a penalty.
- Room scoring includes seating/TV direction, distance, approximate collision and door-clearance penalties. Its ergonomics model is approximate.
- Colour painting uses coverage, value separation and palette reuse as proxies. It cannot reliably judge artistic quality. Typography, responsive layouts and open compositions also require expert calibration before consequential use.
- Drafts are excluded. An unmeasured dimension displays a dash. Partial reports are identified and cannot unlock a paid report. No confidence band or percentile is invented.
- Task 29 can inherit the candidate's task-21 control layout to test transfer at a narrower width.

Before use in student selection, evaluate expert agreement, acceptable alternative solutions, display/device effects, repeatability and learning gain. Keep research findings separate from any career-guidance claims.

## Payment boundary

The detailed-report card is marked coming soon, with no public price or active purchase control. The free score and skill feedback work; no Razorpay payment or PDF entitlement is offered yet. Launching paid reports requires an approved price, a server-created order, server-side signature verification, a payment webhook, stored report entitlement and authenticated download delivery. Price must be configured on that server, not trusted from browser state.

## Review status

Production build and eight scoring tests pass. All 30 screens were opened in-browser. Keyboard movement, painting, TV rotation, slider changes, partial-result aggregation and a 390px layout were exercised. No application errors were logged in that browser run. Full manual usability and psychometric validation remain separate work.
