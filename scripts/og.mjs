// Renders public/og.png from the built hero, plus seal favicons. `npm run og` builds first.
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const PORT = 4323;
const server = spawn("npx", ["astro", "preview", "--port", String(PORT), "--ignore-lock"], { stdio: "ignore" });

try {
  const url = `http://localhost:${PORT}/`;
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(url)).ok) break;
    } catch {}
    if (i > 50) throw new Error("preview server did not start");
    await new Promise((r) => setTimeout(r, 200));
  }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "header{visibility:hidden!important} header [data-seal]{visibility:visible!important} [data-og-hide]{visibility:hidden!important}" });
  await page.screenshot({ path: "public/og.png" });

  // favicons from the real seal so the web font matches the page
  for (const [file, size] of [["public/favicon.png", 64], ["public/apple-touch-icon.png", 180]]) {
    const seal = page.locator("[data-seal]").first();
    await seal.evaluate((el, s) => el.style.setProperty("--s", `${s}px`), size);
    await seal.evaluate((el) => (el.style.borderRadius = "0"));
    await seal.screenshot({ path: file, omitBackground: true });
  }
  await browser.close();
  console.log("wrote public/og.png, favicon.png, apple-touch-icon.png");
} finally {
  server.kill();
}
