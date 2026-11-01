import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { PDFDocument } from "pdf-lib";
import { tasks, VERSION } from "../../src/assessment/model.mjs";
import { buildDetailedReport } from "../../src/assessment/detailed-report.mjs";

const answers = Object.fromEntries(
  tasks.map((t) => [t.id, { submitted: true, value: t.initial }]),
);
const expected = buildDetailedReport(answers);
test.beforeEach(async ({ page }) => {
  await page.addInitScript(
    ({ answers, version }) =>
      localStorage.setItem(
        `dexam-${version}`,
        JSON.stringify({ version, answers, step: 29 }),
      ),
    { answers, version: VERSION },
  );
  await page.goto("/quiz?report=detailed");
  await expect(page.locator(".dr-report h1")).toBeVisible();
});

for (const width of [1440, 390])
  test(`coaching report preserves the attempt and is accessible at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator(".dr-question")).toHaveCount(0);
    await expect(page.locator(".dr-focus-card")).toHaveCount(3);
    await expect(page.locator(".dr-skill-mini")).toHaveCount(9);
    await expect(page.locator(".dr-week")).toHaveCount(4);
    await expect(page.locator(".dr-big-score")).toContainText(
      String(expected.overall),
    );
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          reason: n.failureSummary,
        })),
      })),
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("link", { name: "02 Everyday habits", exact: true })
      .click();
    await expect(page.locator(".dr-observation")).toHaveCount(3);
    await expect(page.locator(".dr-routine article")).toHaveCount(3);
    await page.locator(".dr-week").nth(1).locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".dr-week").nth(1)).toHaveAttribute("open", "");
    await expect(page.locator(".dr-week").nth(1)).toContainText(
      "BY THE END OF THE WEEK",
    );
    const saved = await page.evaluate(
      (version) => JSON.parse(localStorage.getItem(`dexam-${version}`)).answers,
      VERSION,
    );
    expect(saved).toEqual(answers);
  });

test("downloaded report is a five-page A4 PDF with embedded fonts", async ({
  page,
}) => {
  const downloadEvent = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download A4 report", exact: true })
    .click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("dexam-personal-practice-plan.pdf");
  const bytes = await readFile(await download.path());
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  const pdf = await PDFDocument.load(bytes);
  expect(pdf.getPageCount()).toBe(5);
  for (const page of pdf.getPages()) {
    expect(page.getWidth()).toBeCloseTo(595.276, 2);
    expect(page.getHeight()).toBeCloseTo(841.89, 2);
    expect(
      page.node.Resources()?.has((await import("pdf-lib")).PDFName.of("Font")),
    ).toBe(true);
  }
  expect(pdf.getCreator()).toContain("discovery-a4-v1");
  const saved = await page.evaluate(
    (version) => JSON.parse(localStorage.getItem(`dexam-${version}`)).answers,
    VERSION,
  );
  expect(saved).toEqual(answers);
});

test("a failed local font request offers a retry without losing the attempt", async ({
  page,
}) => {
  await page.route("**/assets/fonts/*.ttf", (route) => route.abort());
  await page
    .getByRole("button", { name: "Download A4 report", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("Please try again");
  await page.unroute("**/assets/fonts/*.ttf");
  const pending = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download A4 report", exact: true })
    .click();
  const download = await pending;
  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  await expect(page.getByRole("alert")).toHaveCount(0);
});
