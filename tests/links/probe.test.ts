import { describe, expect, it } from "vitest";
import { extractLinks, isExternal, probeFor } from "./probe";

describe("probeFor", () => {
  it("checks YouTube videos via oEmbed", () => {
    const p = probeFor("https://www.youtube.com/watch?v=uoww13AJWSY");
    expect(p).toMatchObject({ kind: "http" });
    expect(p.kind === "http" && p.url).toContain("youtube.com/oembed");
    expect(p.kind === "http" && decodeURIComponent(p.url)).toContain("v=uoww13AJWSY");
  });

  it("checks YouTube channels directly with the consent cookie", () => {
    expect(probeFor("https://www.youtube.com/@itsdavinchee")).toEqual({
      kind: "http",
      url: "https://www.youtube.com/@itsdavinchee",
      headers: { cookie: "SOCS=CAI" },
    });
  });

  it("normalises x.com and twitter.com to the same oEmbed probe", () => {
    expect(probeFor("https://x.com/someone")).toEqual(probeFor("https://twitter.com/someone"));
    const p = probeFor("https://x.com/someone");
    expect(p.kind === "http" && p.url).toContain("publish.twitter.com/oembed");
  });

  it("checks Medium subdomains via the RSS feed", () => {
    expect(probeFor("https://0xdavinchee.medium.com/")).toEqual({ kind: "http", url: "https://medium.com/feed/@0xdavinchee" });
  });

  it("checks TikTok profiles via oEmbed", () => {
    const p = probeFor("https://www.tiktok.com/@itsdavinchee");
    expect(p.kind === "http" && p.url).toContain("tiktok.com/oembed");
  });

  it("skips Instagram with a reason", () => {
    expect(probeFor("https://www.instagram.com/itsdavinchee/")).toMatchObject({ kind: "skip" });
  });

  it("passes other URLs through untouched", () => {
    expect(probeFor("https://viem.sh/")).toEqual({ kind: "http", url: "https://viem.sh/" });
  });
});

describe("extractLinks", () => {
  it("takes anchor hrefs only, decodes entities and dedupes", () => {
    const html = `<link rel="canonical" href="https://a.com/"><a class="x" href="/b">b</a><a href="https://c.com/?a=1&amp;b=2">c</a><a href="/b">again</a>`;
    expect(extractLinks(html)).toEqual(["/b", "https://c.com/?a=1&b=2"]);
  });

  it("classifies external links", () => {
    expect(isExternal("https://a.com")).toBe(true);
    expect(isExternal("/posts/")).toBe(false);
    expect(isExternal("mailto:a@b.c")).toBe(false);
  });
});
