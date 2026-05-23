import type { MetadataRoute } from "next";
import { verticals } from "@/lib/verticals";

const BASE_URL = "https://thesktr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const verticalEntries = verticals.map((v) => ({
    url: `${BASE_URL}/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...verticalEntries,
  ];
}
