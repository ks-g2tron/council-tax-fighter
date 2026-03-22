import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://counciltaxfighter.co.uk";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/check`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
