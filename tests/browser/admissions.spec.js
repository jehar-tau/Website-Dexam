import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [1440, 390]) {
  test(`discipline search keeps programme levels and sources clear at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/design-careers/");
    await expect(page.locator(".dea-discipline-card")).toHaveCount(44);
    await page.getByRole("button", { name: "NID", exact: true }).click();
    await expect(page.locator(".dea-discipline-card")).toHaveCount(32);
    await page.getByLabel("Study level", { exact: true }).selectOption("Undergraduate");
    await expect(page.locator(".dea-discipline-card")).toHaveCount(0);
    await page
      .getByLabel("Study level", { exact: true })
      .selectOption("Postgraduate");
    await page
      .getByLabel("Search disciplines", { exact: true })
      .fill("Design for Care");
    const card = page.locator(".dea-discipline-card");
    await expect(card).toHaveCount(1);
    await card.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(card).toContainText("NID Madhya Pradesh");
    await expect(
      card.getByRole("link", { name: "Official programme source" }),
    ).toHaveAttribute("href", /MDES_AdmissionsHandbook2027-28\.pdf$/);
    await page
      .getByLabel("Search disciplines", { exact: true })
      .fill("not-a-design-field");
    await expect(
      page.getByRole("button", { name: "Reset filters", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Reset filters", exact: true })
      .click();
    await expect(page.locator(".dea-discipline-card")).toHaveCount(44);
    await page
      .getByLabel("Study level", { exact: true })
      .selectOption("Diploma");
    await expect(page.locator(".dea-discipline-card")).toHaveCount(1);
    await expect(page.locator(".dea-discipline-card")).toContainText(
      "PG diploma",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });

  test(`architecture ranks and local ownership remain distinct at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/architecture-colleges/");
    await expect(page.locator(".dea-guide-table tbody tr")).toHaveCount(20);
    await expect(page.locator(".dea-guide-table caption")).toContainText(
      "2025",
    );
    await expect(
      page.locator(".dea-guide-table tbody tr").first(),
    ).toContainText("JEE Advanced + AAT");
    await expect(
      page.locator(".dea-guide-table tbody tr").last(),
    ).toContainText("BMS College of Architecture");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.goto("/architecture-colleges/pune/");
    await expect(page.locator(".dea-college-card")).toHaveCount(5);
    await page
      .getByLabel("Institution type", { exact: true })
      .selectOption("Government-aided");
    await expect(page.locator(".dea-college-card")).toHaveCount(1);
    await expect(page.locator(".dea-college-card")).toContainText("BKPS");
  });
}

test("Pune design directory identifies the public university", async ({
  page,
}) => {
  await page.goto("/design-colleges/pune/");
  await expect(page.locator(".dea-college-card")).toHaveCount(10);
  await page
    .getByLabel("Institution type", { exact: true })
    .selectOption("Public");
  await expect(page.locator(".dea-college-card")).toHaveCount(1);
  await expect(page.locator(".dea-college-card")).toContainText("RT-MSSU");
});

test("score filter preserves conditions and historical intake labels", async ({
  page,
}) => {
  await page.goto("/design-colleges/uceed-nid/");
  await expect(page.locator(".dea-score-grid article")).toHaveCount(8);
  await page.getByRole("button", { name: "NID DAT", exact: true }).click();
  await expect(page.locator(".dea-score-grid article")).toHaveCount(6);
  await expect(page.locator(".dea-score-grid")).not.toContainText("MITAOE");
  await expect(page.locator(".dea-score-grid")).toContainText("drawing test");
  await page.locator(".dea-guide-reference summary").click();
  await expect(page.locator(".dea-guide-reference")).toContainText(
    "UCEED 2026",
  );
  await expect(page.locator(".dea-guide-clarification")).toContainText(
    "ADEPT is mandatory",
  );
});

for (const path of [
  "/design-careers/",
  "/design-degrees/",
  "/design-colleges/uceed-nid/",
  "/architecture-colleges/",
]) {
  test(`admissions guide accessibility on ${path}`, async ({ page }) => {
    await page.goto(path);
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
  });
}
