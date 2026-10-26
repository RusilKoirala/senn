import type { MetadataRoute } from "next";
import { liveTemplates } from "@/templates/catalog";
import { site } from "@/senn/seo";

// Only senn's own pages. Template demos at /t/<slug> and the viewer point back to these.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...liveTemplates.map((t) => ({ url: `${site.url}/templates/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
