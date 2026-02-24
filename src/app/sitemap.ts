import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { programs } from "@/lib/programs-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/programs", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/launch-pad", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/register", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const programPages = programs.map((p) => ({
    path: `/programs/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...programPages].map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
