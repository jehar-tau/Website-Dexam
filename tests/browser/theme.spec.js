import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicPaths } from "../../src/site/routes.js";

const entry = (path) => path === "/" ? "/" : path + "/";
const toggle = (page) => page.getByRole("switch", { name: "Dark mode" });
const dark = (page) => expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

for (const width of [1440, 320]) {
  for (const path of publicPaths) {
    test(`dark mode accessibility and reflow ${path} at ${width}px`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: "dark" });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(entry(path));
      await dark(page);
      await expect(toggle(page)).toBeChecked();
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, reason: n.failureSummary })) }))).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }
}

test("theme follows the device until explicitly chosen and survives direct entry", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/courses/");
  await expect(toggle(page)).toBeChecked();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(toggle(page)).not.toBeChecked();
  await toggle(page).focus();
  await page.keyboard.press("Space");
  await expect(toggle(page)).toBeChecked();
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await dark(page);
  await page.goto("/quiz/");
  await expect(toggle(page)).toBeChecked();
  await toggle(page).click();
  await expect(toggle(page)).not.toBeChecked();
  await page.goto("/design-careers/");
  await expect(toggle(page)).not.toBeChecked();
});

test("pre-rendered page has the chosen theme before the app loads", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("dexam-theme", "dark"));
  await page.route("**/*.js", route => route.abort());
  await page.goto("/courses/");
  await dark(page);
  await expect(page.locator(".academy")).toHaveCSS("background-color", "rgb(18, 37, 31)");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#12251f");
});

test("theme still switches when preference storage is blocked", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => {
    for (const method of ["getItem", "setItem"]) {
      const original = Storage.prototype[method];
      Storage.prototype[method] = function (key, ...args) {
        if (key === "dexam-theme") throw new Error("Preference storage blocked");
        return original.call(this, key, ...args);
      };
    }
  });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await toggle(page).click();
  await dark(page);
  expect(errors).toEqual([]);
});

test("theme choices synchronise with another open page", async ({ page, context }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const other = await context.newPage();
  await other.goto("/courses/");
  await toggle(page).click();
  await expect(toggle(other)).toBeChecked();
  await toggle(other).click();
  await expect(toggle(page)).not.toBeChecked();
  await other.close();
});

for (const width of [319, 390, 1280, 1440]) {
  test(`theme control fits the header with 200% text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.addStyleTag({ content: ":root{font-size:200%}" });
    await expect(toggle(page)).toBeVisible();
    const box = await toggle(page).boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

test("dark assessment keeps all thirty scored workspaces readable and unchanged", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("/quiz/");
  await page.getByRole("button", { name: "Explore all 30 challenges" }).click();
  await page.locator(".lab-library-card").first().click();
  const canvas = page.locator(".lab-experiment");
  const before = await canvas.evaluate(el => ({
    background: getComputedStyle(el).backgroundColor,
    ink: getComputedStyle(el).getPropertyValue("--lab-ink"),
    svg: el.querySelector("svg").outerHTML,
  }));
  await toggle(page).click();
  await dark(page);
  expect(await canvas.evaluate(el => ({
    background: getComputedStyle(el).backgroundColor,
    ink: getComputedStyle(el).getPropertyValue("--lab-ink"),
    svg: el.querySelector("svg").outerHTML,
  }))).toEqual(before);
  for (let i = 0; i < 30; i++) {
    if (i) {
      await page.getByRole("button", { name: "Open all 30 challenges" }).click();
      await page.locator(".lab-library-card").nth(i).click();
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), `Challenge ${i + 1}`).toEqual([]);
  }
  await page.getByRole("button", { name: "View my progress" }).click();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }))).toEqual([]);
});

test("paper-request dialog and expanded discipline sources remain readable in dark mode", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/papers/nid/", "/design-careers/"]) {
    await page.goto(path);
    if (path.startsWith("/papers")) await page.getByRole("button", { name: "Get paper", exact: true }).first().click();
    else await page.locator(".dea-discipline-card summary").first().click();
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }))).toEqual([]);
  }
});
