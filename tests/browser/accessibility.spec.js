import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicPaths } from "../../src/site/routes.js";

const entry = (p) => (p === "/" ? "/" : p + "/");
const violationSummary = (r) =>
  r.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({ target: n.target, reason: n.failureSummary })),
  }));
async function checkLayout(page) {
  const overflow = await page.evaluate(() => ({
    width: innerWidth,
    document: document.documentElement.scrollWidth,
    protruding: [...document.querySelectorAll("body *")]
      .filter(e => e.getBoundingClientRect().right > innerWidth + 1 && e.getBoundingClientRect().width)
      .slice(0, 10).map(e => ({ tag: e.tagName, class: e.getAttribute("class"), parent: e.parentElement?.getAttribute("class"), text: e.textContent.slice(0, 50) })),
    overflowing: [...document.querySelectorAll("body *")].filter(e=>e.clientWidth && e.scrollWidth>e.clientWidth+1).slice(0,20).map(e=>({tag:e.tagName,class:e.getAttribute("class"),width:e.clientWidth,scroll:e.scrollWidth})),
  }));
  expect(overflow.document, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.width);
}
for (const rootSize of [100, 200]) {
  test(`narrow header keeps the wordmark and menu label intact at ${rootSize}% text`, async ({ page }) => {
    await page.setViewportSize({ width: 319, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "Reject optional analytics" }).click();
    await page.addStyleTag({ content: `:root{font-size:${rootSize}%}` });
    await checkLayout(page);
    for (const selector of [".dea-header .dea-brand", ".dea-menu-toggle > span"]) {
      const lines = await page.locator(selector).evaluate((element) => {
        const text = [...element.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
        const range = document.createRange();
        range.selectNodeContents(text);
        return range.getClientRects().length;
      });
      expect(lines).toBe(1);
    }
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("link", { name: "Programmes", exact: true })).toBeVisible();
    await checkLayout(page);
  });
}
for (const width of [1440, 320]) {
  for (const path of publicPaths) {
    test(`public accessibility and readable text ${path} at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(entry(path));
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(violationSummary(result)).toEqual([]);
      await checkLayout(page);
      const small = await page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter(
            (e) =>
              !e.closest('svg,[aria-hidden="true"],.dea-brand,.lab-brand') &&
              [...e.childNodes].some(
                (n) => n.nodeType === 3 && n.textContent.trim(),
              ) &&
              e.getClientRects().length &&
              getComputedStyle(e).visibility !== "hidden",
          )
          .filter((e) => parseFloat(getComputedStyle(e).fontSize) < 14)
          .map((e) => ({
            text: e.textContent.trim().slice(0, 65),
            size: getComputedStyle(e).fontSize,
            selector: e.className,
          })),
      );
      expect(small).toEqual([]);
    });
  }
}
for (const path of [
  "/",
  "/courses",
  "/design-careers",
  "/architecture-colleges",
  "/contact",
  "/privacy",
  "/quiz",
]) {
  test(`200 percent root text and custom text spacing on ${path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(entry(path));
    await page.addStyleTag({ content: ":root{font-size:200%}" });
    await checkLayout(page);
    await page.addStyleTag({
      content:
        ".academy * {line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} .academy p{margin-bottom:2em!important}",
    });
    await checkLayout(page);
    const clipped = await page
      .locator(
        "main p,main button,main summary,.lab-hero-copy p,.lab-hero-copy button",
      )
      .evaluateAll((els) =>
        els
          .filter(
            (e) =>
              e.getClientRects().length &&
              e.clientWidth > 0 &&
              e.scrollWidth > e.clientWidth + 2,
          )
          .map((e) => ({
            text: e.textContent.trim().slice(0, 50),
            width: e.clientWidth,
            scroll: e.scrollWidth,
          })),
      );
    expect(clipped).toEqual([]);
  });
}
test("keyboard navigation has a skip link, visible focus and Escape restoration", async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.goto("/design-careers/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeInViewport();
  await expect(page.locator("#main-content")).toBeFocused();
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Programmes", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await expect(page.locator(".dea-nav")).not.toBeVisible();
});
test("assessment collection traps focus, closes with Escape and returns focus", async ({
  page,
}) => {
  await page.goto("/quiz/");
  const opener = page.getByRole("button", {
    name: "Explore all 30 challenges",
  });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "All 30 challenges" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close challenge collection" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.locator(".lab-library-card").last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Close challenge collection" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});
test("all thirty assessment workspaces pass automated accessibility checks", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.goto("/quiz/");
  await page.getByRole("button", { name: "Explore all 30 challenges" }).click();
  for (let i = 0; i < 30; i++) {
    if (i)
      await page
        .getByRole("button", { name: "Open all 30 challenges" })
        .click();
    await page.locator(".lab-library-card").nth(i).click();
    const r = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(violationSummary(r), `Challenge ${i + 1}`).toEqual([]);
  }
  const handle = page.locator(".lab-drag").first();
  if (await handle.count()) {
    const before = await handle.getAttribute("transform");
    await handle.focus();
    await page.keyboard.press("ArrowRight");
    await expect(handle).not.toHaveAttribute("transform", before);
  }
});

test("assessment drag controls also work with arrow keys", async ({ page }) => {
  await page.goto("/quiz/");
  await page.getByRole("button", { name: "Explore all 30 challenges" }).click();
  await page.locator(".lab-library-card").first().click();
  const handle = page.getByRole("button", { name: "Slide the green weight" });
  const before = await handle.getAttribute("transform");
  await handle.focus();
  await page.keyboard.press("ArrowRight");
  await expect(handle).not.toHaveAttribute("transform", before);
});

test("paper form remains readable at enlarged text size and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/papers/nid/");
  const opener = page
    .getByRole("button", { name: "Get paper", exact: true })
    .first();
  await opener.click();
  const dialog = page.getByRole("dialog", {
    name: "Get your previous year paper",
  });
  await expect(dialog).toBeVisible();
  await page.addStyleTag({ content: ":root{font-size:200%}" });
  const box = await dialog.boundingBox();
  expect(box.width).toBeLessThanOrEqual(390);
  for (const input of await dialog.locator("input").all())
    expect(
      await input.evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
    ).toBeGreaterThanOrEqual(32);
  const r = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(violationSummary(r)).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});
