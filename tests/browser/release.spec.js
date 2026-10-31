import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicPaths, canonicalFor } from "../../src/site/routes.js";

const entry = (path) => path === "/" ? "/" : path + "/";
for (const width of [1440, 390]) {
  for (const path of publicPaths) {
    test(`${path} renders and hydrates at ${width}px`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      await page.goto(entry(path));
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonicalFor(path));
      const sizes = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      expect(sizes.scroll).toBeLessThanOrEqual(sizes.width);
      expect(errors).toEqual([]);
    });
  }
}

for (const path of ["/", "/contact/", "/papers/nid/", "/quiz/"]) {
  test(`core accessibility on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, reason: n.failureSummary })) }))).toEqual([]);
  });
}

test("campus illustrations load and all entrance links are correct", async ({ page }) => {
  await page.goto("/#campus-pathways");
  const section = page.locator("#campus-pathways");
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator("img")).toHaveCount(3);
  for (const img of await section.locator("img").all()) {
    await expect(img).toHaveJSProperty("complete", true);
    expect(await img.evaluate(el => el.naturalWidth)).toBe(1200);
  }
  for (const [name, href] of [["Explore NID DAT", "/exams/nid"], ["Explore NIFT", "/exams/nift"], ["UCEED", "/exams/uceed"], ["CEED", "/exams/ceed"]]) {
    await expect(section.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
  }
});

test("failed counselling delivery preserves details and offers retry", async ({ page }) => {
  let calls = 0;
  await page.route("https://script.google.com/**", route => { calls++; return route.abort(); });
  await page.goto("/contact/");
  await page.getByLabel("Your name").fill("Fictional release check");
  await page.getByLabel("Phone / WhatsApp").fill("9000000000");
  await page.getByLabel("Where are you based?").fill("Fictional city");
  await page.getByRole("button", { name: "Start the conversation" }).click();
  await expect(page.getByRole("alert")).toContainText("couldn’t send");
  await expect(page.getByLabel("Your name")).toHaveValue("Fictional release check");
  await expect(page.getByRole("button", { name: "Start the conversation" })).toBeEnabled();
  expect(calls).toBe(1);
  await expect(page.getByText("is on its way.")).toHaveCount(0);
});

test("counselling confirms only after the mocked request finishes", async ({ page }) => {
  let finish;
  const response = new Promise(resolve => { finish = resolve; });
  await page.route("https://script.google.com/**", async route => { await response; await route.fulfill({ status: 200, body: "ok" }); });
  await page.goto("/contact/");
  await page.getByLabel("Your name").fill("Fictional release check");
  await page.getByLabel("Phone / WhatsApp").fill("9000000000");
  await page.getByLabel("Where are you based?").fill("Fictional city");
  await page.getByRole("button", { name: "Start the conversation" }).click();
  await expect(page.getByRole("button", { name: "Sending your request…" })).toBeDisabled();
  await expect(page.getByText("is on its way.")).toHaveCount(0);
  finish();
  await expect(page.getByText("is on its way.")).toBeVisible();
});
