import { expect, test } from "@playwright/test";

const PAGES = ["/", "/posts/", "/posts/goal-setting/", "/posts/web3-learnings/"];
const WIDTHS = [375, 768, 1440];

test("home renders every section", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Vincent");
  await expect(page.locator("#origin-title")).toContainText("Global citizen");
  for (const id of ["build", "create", "write", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await expect(page.locator("#build-title")).toContainText("builder");
  await expect(page.locator("#create-title")).toContainText("experiences");
  await expect(page.locator('a[href="mailto:itsdavinchee@gmail.com"]')).toBeVisible();
});

test("every experience row toggles open", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("#build details");
  const count = await rows.count();
  expect(count).toBeGreaterThanOrEqual(8);
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    const wasOpen = await row.evaluate((d: HTMLDetailsElement) => d.open);
    await row.locator("summary").click();
    await expect.poll(() => row.evaluate((d: HTMLDetailsElement) => d.open)).toBe(!wasOpen);
  }
});

test("old post URLs from the previous site still resolve", async ({ page }) => {
  for (const path of ["/posts/goal-setting/", "/posts/web3-learnings/"]) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

for (const width of WIDTHS) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of PAGES) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0);
    }
  });
}

test("entrance animation is disabled under reduced motion", async ({ browser }) => {
  const motion = await browser.newPage();
  await motion.goto("/");
  expect(await motion.locator(".rise").first().evaluate((el) => getComputedStyle(el).animationName)).toBe("rise");

  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  await reduced.goto("/");
  const names = await reduced.locator(".rise").evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
  expect(names.length).toBeGreaterThan(0);
  expect(new Set(names)).toEqual(new Set(["none"]));
});

test("links are well formed", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    expect(await page.locator('a[href="#"], a[href=""]').count(), path).toBe(0);
    // site chrome opens externals in a new tab; links inside post prose behave normally
    const external = await page.locator('a[href^="http"]:not(.prose-post a)').evaluateAll((as) =>
      as.map((a) => ({ href: a.getAttribute("href"), target: a.getAttribute("target"), rel: a.getAttribute("rel") ?? "" })),
    );
    for (const l of external) {
      expect(l.target, l.href!).toBe("_blank");
      expect(l.rel, l.href!).toContain("noopener");
    }
  }
});

test("every internal link resolves", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    for (const href of hrefs) {
      if (seen.has(href)) continue;
      seen.add(href);
      const [target, hash] = href.split("#");
      const res = await request.get(target || "/");
      expect(res.status(), `${href} (linked from ${path})`).toBe(200);
      if (hash) expect(await res.text(), `#${hash} missing on ${target || "/"}`).toContain(`id="${hash}"`);
    }
  }
  expect(seen.size).toBeGreaterThan(3);
});

test("unknown routes get the branded 404", async ({ page }) => {
  const res = await page.goto("/definitely-not-a-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("This page doesn't exist.")).toBeVisible();
});

test("icons and social image are served", async ({ request }) => {
  for (const path of ["/favicon.svg", "/apple-touch-icon.png", "/og.png"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});

test("images have alt attributes and load", async ({ page }) => {
  await page.goto("/");
  const imgs = page.locator("img");
  for (const img of await imgs.all()) {
    expect(await img.getAttribute("alt")).not.toBeNull();
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
  }
});

test("capture review screenshots", async ({ browser }, info) => {
  for (const [w, h] of [
    [390, 844],
    [1440, 900],
  ]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
    await page.goto("/");
    // trigger lazy images before the full-page capture
    for (const img of await page.locator("img:visible").all()) await img.scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: info.outputPath(`home-${w}.png`), fullPage: true });
    await page.close();
  }
});
