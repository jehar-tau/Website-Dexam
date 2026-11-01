# DEXAM programme structure

Owner direction: 1 November 2026.

Present exactly three programme choices on the homepage and course page:

1. **End-to-end preparation** for NID, NIFT, NATA, UCEED or CEED, shaped around the chosen exam and relevant admission stages. Four-year, two-year, one-year and 30-day crash-course formats belong within this programme, rather than becoming separate top-level products.
2. **Studio test and interview preparation**, including portfolio development, practical/situation-test work and presentation. Students can join this separately.
3. **Test series**, available as a standalone choice without full-course enrolment.

Do not publish course fee amounts, price tables, payment plans or structured-data prices. Students and parents discuss fees and enrolment details when they visit the academy. Keep programme descriptions, FAQs, metadata, homepage cards, student-access guidance and test-series enquiries consistent with these choices.

Programme cards lead to an enquiry with the selected programme retained. Public programme information does not grant app access or change payment and enrolment checks. The team arranges batch schedules and access details. Do not imply immediate self-service purchase or invent counts, rankings, discounts or release dates.

Content lives in `content.js`; `ProgrammeCard` is shared by the homepage and course page. `npm run check:site` checks the rendered three-programme structure and absence of public fee amounts. Browser checks cover responsive pages, accessibility and programme-specific enquiry links.

## Curriculum reference

The owner supplied the [Class Scheduling workbook](https://docs.google.com/spreadsheets/d/1RnxD8er9tjilJ_zDHHkYzaKS50-j3x6MoKI5YNHlKbE/edit), read on 1 November 2026. `Drawing Topics` (sheet ID 2013103098, A2:C23) provides 22 drawing/design topics and detail notes. `Topics by Category` (sheet ID 2081645146, A2:B23) also lists eight aptitude topics. `Sheet1` (sheet ID 0, A1:D14) marks English comprehension, general awareness/culture, and material craft/manufacturing/fabrics as self-study.

`curriculum.js` groups the same 30 topics into six browsable themes: drawing foundations; perspective and spaces; people, animals and scenes; ideas, colour and making; visual thinking and reasoning; aptitude and awareness. Editorial headings are browsing aids, not extra topics or separate courses. Preserve all topics and the three self-study labels when updating the public outline. British spellings and punctuation are normalised for the website.

The sheet excludes portfolio and interview topics; do not invent those syllabuses or imply the sheet covers them. The separate programme remains described from the owner's programme direction. Do not present the source's week numbers as a fixed course duration or claim identical coverage for every exam or the 30-day format. Do not publish staff assignments or internal scheduling details. The source workbook stays unchanged and is not linked from the public course page.
