// Renders public/og.png from the built hero. Run after `npm run build`: `npm run og`.
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
  await page.addStyleTag({ content: "header,p.inline-flex{display:none!important}" });
  await page.screenshot({ path: "public/og.png" });

  // apple-touch-icon from the same SVG as the favicon, so both always match
  const svg = (await import("node:fs")).readFileSync("public/favicon.svg", "utf8")
    .replace("<svg ", '<svg width="180" height="180" ')
    .replace('rx="12"', 'rx="0"'); // iOS applies its own corner mask
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await icon.setContent(`<html><body style="margin:0;background:#0b1226">${svg}</body></html>`);
  await icon.screenshot({ path: "public/apple-touch-icon.png" });
  await browser.close();
  console.log("wrote public/og.png and public/apple-touch-icon.png");
} finally {
  server.kill();
}
