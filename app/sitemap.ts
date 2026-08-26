import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/skills-library`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/resources`, changeFrequency: "weekly", priority: 0.7 },
    {
      url: `${site.url}/lead-leakage-calculator`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/resources/${p.slug}`,
    lastModified: new Date(`${p.dateUpdated}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
