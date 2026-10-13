import { getCollection } from "astro:content";

export const getPosts = async () =>
  (await getCollection("posts")).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" });
