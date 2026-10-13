// Plain HTTP status lies for several hosts (YouTube/TikTok/Instagram 200 everything,
// X 404s/403s bots, Medium sits behind Cloudflare), so each gets the endpoint that
// actually distinguishes a live page from a dead one.

export type Probe = { kind: "http"; url: string; headers?: Record<string, string> } | { kind: "skip"; reason: string };

const oembed = (base: string, target: string) => `${base}?format=json&url=${encodeURIComponent(target)}`;

export const probeFor = (raw: string): Probe => {
  const u = new URL(raw);
  const host = u.hostname.replace(/^www\./, "");

  if (host === "youtube.com" && u.pathname === "/watch") return { kind: "http", url: oembed("https://www.youtube.com/oembed", raw) };
  // consent cookie skips the EU interstitial; missing channels 404
  if (host === "youtube.com") return { kind: "http", url: raw, headers: { cookie: "SOCS=CAI" } };
  if (host === "x.com" || host === "twitter.com")
    return { kind: "http", url: oembed("https://publish.twitter.com/oembed", `https://twitter.com${u.pathname}`) };
  if (host === "tiktok.com") return { kind: "http", url: oembed("https://www.tiktok.com/oembed", raw) };
  if (host.endsWith(".medium.com")) return { kind: "http", url: `https://medium.com/feed/@${host.split(".")[0]}` };
  if (host === "instagram.com") return { kind: "skip", reason: "Instagram answers 401 for every logged-out profile check, real or not" };
  return { kind: "http", url: raw };
};

const decode = (s: string) => s.replaceAll("&amp;", "&").replaceAll("&#38;", "&");

/** hrefs of <a> tags only (not <link rel=canonical> etc.), deduped, in document order */
export const extractLinks = (html: string): string[] => [
  ...new Set([...html.matchAll(/<a\b[^>]*?\shref="([^"]+)"/gi)].map((m) => decode(m[1]))),
];

export const isExternal = (href: string) => /^https?:\/\//.test(href);
