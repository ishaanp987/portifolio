import { projects } from "@/data/projects";
import type { Project } from "@/types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateProjects(items: Project[]): void {
  const slugs = new Set<string>();

  for (const project of items) {
    if (!project.title?.trim()) {
      throw new Error("A project is missing a title.");
    }

    if (!project.slug?.trim()) {
      throw new Error(`Project "${project.title}" is missing a slug.`);
    }

    if (!SLUG_PATTERN.test(project.slug)) {
      throw new Error(
        `Project "${project.title}" has an invalid slug "${project.slug}". Use lowercase letters, numbers, and hyphens.`,
      );
    }

    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: "${project.slug}".`);
    }

    slugs.add(project.slug);

    if (!project.description?.trim()) {
      throw new Error(`Project "${project.title}" is missing a description.`);
    }
  }
}

validateProjects(projects);

function byOrder(a: Project, b: Project): number {
  const orderA = a.order ?? a.priority ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.order ?? b.priority ?? Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) return orderA - orderB;
  return a.title.localeCompare(b.title);
}

export function getVisibleProjects(): Project[] {
  return projects.filter((project) => !project.hidden).sort(byOrder);
}

export const HOMEPAGE_FEATURED_LIMIT = 3;

export function getFeaturedProjects(): Project[] {
  return getVisibleProjects().filter((project) => project.featured);
}

export function getHomepageFeatured(): Project[] {
  return getFeaturedProjects().slice(0, HOMEPAGE_FEATURED_LIMIT);
}

export function getArchiveProjects(): Project[] {
  return getVisibleProjects().filter((project) => !project.featured);
}

export function getHomepageArchive(): Project[] {
  const featuredSlugs = new Set(getHomepageFeatured().map((project) => project.slug));
  return getVisibleProjects().filter((project) => !featuredSlugs.has(project.slug));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getVisibleProjects().find((project) => project.slug === slug);
}

export function getProjectHref(project: Project): string {
  return `/projects/${project.slug}`;
}

export function getAdjacentProjects(slug: string): {
  previous: Project | undefined;
  next: Project | undefined;
} {
  const visible = getVisibleProjects();
  const index = visible.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: index > 0 ? visible[index - 1] : undefined,
    next: index < visible.length - 1 ? visible[index + 1] : undefined,
  };
}

export function getProjectCode(project: Project, fallbackIndex: number): string {
  if (project.code?.trim()) return project.code.trim();
  return `PRJ-${String(fallbackIndex + 1).padStart(2, "0")}`;
}

export function formatProjectIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function getProjectCoverAlt(project: Project): string {
  return project.coverAlt ?? `Cover figure for ${project.title}`;
}
