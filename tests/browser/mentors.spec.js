import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const people = [
  ["snehalkumar-shinde", "Snehalkumar Shinde", "Precisely", "https://www.linkedin.com/in/snehalkumar-shinde/"],
  ["siddhant-modi", "Siddhant Modi", "Fractal", "https://www.linkedin.com/in/siddhant-modi-62602053/"],
  ["vinod-kumar", "Vinod Kumar", "Microsoft", "https://www.linkedin.com/in/vinod-kumar-m/"],
  ["prajna-nayak", "Prajna Nayak", "Murf AI", "https://www.linkedin.com/in/-prajna-nayak-/"],
];

for (const width of [1440, 390]) {
  for (const colorScheme of ["light", "dark"]) {
    test(`four mentor profiles retain photos, full institutes and sources at ${width}px in ${colorScheme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme });
      await page.goto("/about/#mentors");
      await expect(page.locator(".dea-mentor-card")).toHaveCount(4);
      for (const [id, name, company, linkedin] of people) {
        const card = page.locator(`#mentor-${id}`);
        await card.scrollIntoViewIfNeeded();
        await expect(card.getByRole("heading", { name, exact: true })).toBeVisible();
        await expect(card.locator(".dea-mentor-position > strong")).toHaveText(company);
        await expect(card.locator("dt").first()).toHaveText("National Institute of Design");
        await expect(card.getByRole("img", { name: `Editorial portrait of ${name}.` })).toHaveJSProperty("naturalWidth", 1024);
        await expect(card.getByRole("link", { name: `${name} on LinkedIn` })).toHaveAttribute("href", linkedin);
      }
      await expect(page.locator("#mentor-siddhant-modi")).toContainText("Sir J. J. Institute of Applied Art, Mumbai");
      await expect(page.locator("#mentor-snehalkumar-shinde")).toContainText("Mechanical Engineering");
      await expect(page.locator("#mentors")).not.toContainText("Computer Engineering");
      await expect(page.locator("#mentors")).not.toContainText("Swapna Yelluru");
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(result.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }))).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }
}
