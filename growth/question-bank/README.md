# Question bank editorial workflow

This folder defines a content contract only. It contains no exam questions and does not publish content to the website.

## Authoring

Create one UTF-8 JSON file per item under `growth/question-bank/items/`, following `schema.json`. Use a stable, descriptive filename. Add the actual `question` text only after its origin and reuse rights have been checked. Keep draft/review records private to the repository until a separate, reviewed publishing change is approved.

`source_class` distinguishes official material, original DEXAM material, and memory-based recollections. Record a source URL for official and memory-based items. Do not copy questions, diagrams, or student work unless DEXAM owns the material or has documented permission to republish it. Record only `original` or `licensed` rights for assets attached to approved material. A `not-cleared` item cannot be approved or published.

## Review gate

Only a faculty reviewer with subject expertise may approve an answer and explanation. `approved` and `published` records must include the answer, explanation, source, reviewer, review date, and cleared rights. Memory-based answers must set `answer_uncertain` to `true`; do not present a recollection as an official answer key. Add accessible `media_alt` text whenever a diagram or other image is attached.

Never include student names, contact details, submissions, account data, or other personal information in these records. Do not move content to a public route as part of this workflow. Public publishing requires a separate content review and release.

## Validation

Run `npm run check:question-bank`. The validator scans JSON records in `items/`, checks the schema fields and editorial gates, and fails closed on malformed or unapproved publication records. The test suite uses synthetic fixtures only; they are not exam content.
