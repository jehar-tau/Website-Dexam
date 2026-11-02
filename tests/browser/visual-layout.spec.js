import { test, expect } from "@playwright/test";

for (const width of [1280, 1440]) {
  test(`desktop navigation shares one text baseline at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const labels = await page.locator(".dea-nav > a,.dea-nav summary").evaluateAll(els => els.map(e => {
      const text = [...e.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      const range = document.createRange();
      range.selectNodeContents(text);
      const r = range.getBoundingClientRect();
      return { centre: r.y + r.height / 2, lines: range.getClientRects().length, target: e.getBoundingClientRect().height };
    }));
    expect(labels).toHaveLength(6);
    expect(Math.max(...labels.map(l => l.centre)) - Math.min(...labels.map(l => l.centre))).toBeLessThan(1);
    for (const label of labels) {
      expect(label.lines).toBe(1);
      expect(label.target).toBeGreaterThanOrEqual(44);
    }
  });
}
for (const width of [320, 390, 768, 1440]) {
  test(`collage controls and programme captions stay clear of artwork at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const tabs = await page.locator(".dea-art-tabs").boundingBox();
    for (const selector of [".dea-collage-main", ".dea-collage-note"]) {
      const art = await page.locator(selector).boundingBox();
      expect(tabs.y).toBeGreaterThanOrEqual(art.y + art.height);
    }
    await page.goto("/courses/");
    await page.evaluate(() => document.fonts.ready);
    for (const card of await page.locator(".dea-programme-art").all()) {
      const art = await card.locator(".dea-art").boundingBox();
      const caption = await card.locator(":scope > span").boundingBox();
      expect(caption.y).toBeGreaterThan(art.y + art.height);
    }
  });
}

test("programme benefits and actions align across the three desktop cards", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/courses/");
  await page.evaluate(() => document.fonts.ready);
  for (const selector of [".dea-programme-copy > ul", ".dea-programme-copy > .dea-button"]) {
    const tops = await page.locator(selector).evaluateAll(els => els.map(e => e.getBoundingClientRect().top));
    expect(tops).toHaveLength(3);
    expect(Math.max(...tops) - Math.min(...tops)).toBeLessThan(1);
  }
});

test("enlarged text opens a compact navigation rather than wrapping desktop labels", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Reject optional analytics" }).click();
  await page.addStyleTag({ content: ":root{font-size:200%}" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("link", { name: "Programmes", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1280);
});

for (const [path, cardSelector, selectors] of [
  ["/design-degrees/", ".dea-degree-card", ["h2", "h3", ".dea-degree-entry"]],
  ["/design-colleges/", ".dea-college-card", ["h2", "dl"]],
]) {
  test(`comparison rows share a baseline on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const selector of selectors) {
      const tops = [];
      for (let i = 0; i < 3; i++) {
        const box = await page.locator(cardSelector).nth(i).locator(selector).boundingBox();
        tops.push(box.y);
      }
      expect(Math.max(...tops) - Math.min(...tops)).toBeLessThan(1);
    }
  });
}
