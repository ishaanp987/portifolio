import type { MetadataRoute } from "next";
import { getVisibleProjects } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const projects = getVisibleProjects();
  const projectEntries = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.8 : 0.6,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(projects.length > 0
      ? [
          {
            url: `${base}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.9,
          },
        ]
      : []),
    ...projectEntries,
  ];
}
