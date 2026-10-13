import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const sources = [...walk("src"), ...walk("public"), ...walk("scripts")].filter((f) => /\.(astro|css|ts|mjs|svg|md)$/.test(f));
const read = (f: string) => readFileSync(f, "utf8");
const css = read("src/styles/global.css");
const token = (name: string) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1].toLowerCase();

describe("palette consistency", () => {
  // the first (Claude-ish) palette: lime, cream, tomato, espresso, saffron, chili
  const retired = ["#c6ff3d", "#f2eadc", "#fbf5ea", "#e8462b", "#b3301a", "#c4351c", "#f2a93b", "#1b1410", "#0a0c0f"];

  it("no retired colors anywhere in source", () => {
    for (const f of sources) {
      const text = read(f).toLowerCase();
      for (const hex of retired) expect(text.includes(hex), `${hex} in ${f}`).toBe(false);
    }
  });

  it("theme-color matches the ink token", () => {
    expect(read("src/layouts/Base.astro")).toContain(`name="theme-color" content="${token("ink")}"`);
  });

  it("favicon uses only palette colors", () => {
    const palette = ["ink", "vermilion", "gold", "paper"].map(token);
    const used = [...read("public/favicon.svg").matchAll(/fill="(#[0-9a-f]{6})"/gi)].map((m) => m[1].toLowerCase());
    expect(used.length).toBeGreaterThan(0);
    for (const c of used) expect(palette, `favicon color ${c}`).toContain(c);
  });
});

describe("copy consistency", () => {
  it("nav, section label and heading agree on the contact wording", () => {
    expect(read("src/components/Nav.astro")).toContain('label: "say gm"');
    expect(read("src/components/Footer.astro")).toContain("04 / say gm");
  });

  it("French is not claimed anywhere", () => {
    for (const f of sources) expect(/fran[cç]ais/i.test(read(f)), f).toBe(false);
  });
});
