import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as profile from "./profile";
import { duration, formatYm, roles, socials, videos, projects, elsewhereWriting, identity } from "./profile";

const ymValue = (ym: string | null) => (ym ? Number(ym.replace("-", "")) : Infinity);

describe("roles", () => {
  it("each role starts before it ends", () => {
    for (const r of roles) expect(ymValue(r.start)).toBeLessThanOrEqual(ymValue(r.end));
  });

  it("is sorted newest first", () => {
    const starts = roles.map((r) => ymValue(r.start));
    expect(starts).toEqual([...starts].sort((a, b) => b - a));
  });

  it("every role has highlights", () => {
    for (const r of roles) expect(r.highlights.length).toBeGreaterThan(0);
  });

  it("only the two most recent roles list a stack", () => {
    expect(roles.slice(0, 2).every((r) => r.stack?.length)).toBe(true);
    expect(roles.slice(2).some((r) => r.stack)).toBe(false);
  });
});

describe("links", () => {
  it("all external URLs are https", () => {
    const urls = [
      ...socials.map((s) => s.url),
      ...projects.map((p) => p.url),
      ...elsewhereWriting.map((w) => w.url),
      ...roles.flatMap((r) => (r.url ? [r.url] : [])),
      identity.siteUrl,
    ];
    for (const u of urls) expect(u).toMatch(/^https:\/\//);
  });

  it("contact email is the partnerships address", () => {
    expect(identity.email).toBe("itsdavinchee@gmail.com");
  });
});

describe("videos", () => {
  it("have 11-char YouTube ids and a local thumbnail", () => {
    for (const v of videos) {
      expect(v.id).toMatch(/^[\w-]{11}$/);
      expect(() => readFileSync(new URL(`../assets/videos/${v.thumb}`, import.meta.url))).not.toThrow();
    }
  });
});

describe("copy", () => {
  it("contains no em-dashes", () => {
    expect(JSON.stringify(profile)).not.toContain("—");
  });
});

describe("formatYm / duration", () => {
  it("formats year-months", () => {
    expect(formatYm("2021-08")).toBe("Aug 2021");
    expect(formatYm(null)).toBe("Now");
  });

  it("computes inclusive durations", () => {
    expect(duration("2021-08", "2024-05")).toBe("2y 10m");
    expect(duration("2024-10", "2025-01")).toBe("4m");
    expect(duration("2017-10", "2020-02")).toBe("2y 5m");
  });
});
