import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PDFDocument } from "pdf-lib";
import { tasks } from "./model.mjs";
import { buildDetailedReport } from "./detailed-report.mjs";
import { buildCoachingProfile } from "./coaching.mjs";
import { createPracticePdf, PDF_FONT_FILES, A4_SIZE } from "./practice-pdf.mjs";

const fontBytes = Object.fromEntries(
  await Promise.all(
    Object.entries(PDF_FONT_FILES).map(async ([key, file]) => [
      key,
      await readFile(
        new URL(`../../public/assets/fonts/${file}`, import.meta.url),
      ),
    ]),
  ),
);
const answers = Object.fromEntries(
  tasks.map((t) => [t.id, { submitted: true, value: t.initial }]),
);

test("incomplete reports cannot generate a full downloadable PDF", async () => {
  await assert.rejects(
    () => createPracticePdf(buildDetailedReport({}), { fontBytes }),
    /Complete all 30/,
  );
});

test("A4 layout covers all nine curriculum areas without overflowing five pages", async () => {
  const base = buildDetailedReport(answers);
  for (const names of [
    ["Colour", "Typography", "Balance"],
    ["Spatial reasoning", "Visual systems", "Adaptation"],
    ["Usability", "Observation", "Hierarchy"],
  ]) {
    const source = {
      ...base,
      priorities: names.map((n) => base.skills.find((s) => s.name === n)),
    };
    const report = {
      ...base,
      skills: base.skills.map((skill) => ({ ...skill, score: 100 })),
      coaching: buildCoachingProfile(source),
    };
    const before = JSON.stringify(report);
    const bytes = await createPracticePdf(report, { fontBytes });
    const pdf = await PDFDocument.load(bytes);
    assert.equal(pdf.getPageCount(), 5);
    for (const page of pdf.getPages()) {
      assert.ok(Math.abs(page.getWidth() - A4_SIZE[0]) < 0.01);
      assert.ok(Math.abs(page.getHeight() - A4_SIZE[1]) < 0.01);
    }
    assert.equal(JSON.stringify(report), before);
    assert.equal(pdf.getTitle(), "Your design practice plan | DEXAM");
    assert.ok(bytes.length < 250_000);
  }
});
