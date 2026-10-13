import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "@playwright/test";
import { extractLinks, isExternal, probeFor } from "./probe";

const DIST = "dist";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

if (!existsSync(DIST)) throw new Error("dist/ missing: run `npm run build` first (or use `npm run test:links`)");

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith(".html") ? [join(dir, e.name)] : [],
  );

// url -> pages it appears on, so a failure says where to fix it
const foundOn = new Map<string, string[]>();
for (const file of htmlFiles(DIST)) {
  const page = "/" + relative(DIST, file).replace(/index\.html$/, "");
  for (const href of extractLinks(readFileSync(file, "utf8")).filter(isExternal)) {
    foundOn.set(href, [...(foundOn.get(href) ?? []), page]);
  }
}

test.describe.configure({ mode: "parallel" });

for (const [url, pages] of foundOn) {
  test(url, async ({ request }) => {
    const probe = probeFor(url);
    test.skip(probe.kind === "skip", probe.kind === "skip" ? probe.reason : "");
    if (probe.kind !== "http") return;

    const get = () =>
      request.get(probe.url, {
        headers: { "user-agent": UA, "accept-language": "en", ...probe.headers },
        failOnStatusCode: false,
        timeout: 20_000,
      });
    let res = await get();
    if (res.status() === 429 || res.status() >= 500) {
      await new Promise((r) => setTimeout(r, 3_000));
      res = await get();
    }
    // rate limited twice: we can't tell either way, so don't report it as broken
    test.skip(res.status() === 429, `rate limited by ${new URL(probe.url).host}, re-run later`);

    expect(res.status(), `${url}\n  found on: ${pages.join(", ")}\n  probed: ${probe.url}`).toBeLessThan(400);
  });
}
