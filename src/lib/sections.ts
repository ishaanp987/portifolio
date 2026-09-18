import { site } from "@/config/site";
import { homepageSections } from "@/config/sections";
import {
  getAboutParagraphs,
  getCurrentlyBuilding,
  hasContactAction,
} from "@/lib/content";
import { formatIndex } from "@/lib/format";
import { getVisibleExperience } from "@/lib/experience";
import { getVisibleProjects } from "@/lib/projects";
import { getSkillCategories } from "@/lib/skills";
import type { HomepageSectionConfig, HomepageSectionId } from "@/types";

const SECTION_LABELS: Record<HomepageSectionId, string> = {
  hero: "Home",
  projects: "Selected work",
  building: "Currently building",
  facts: "A few facts",
  experience: "Experience",
  skills: "Methods and tools",
  about: "About",
  contact: "Contact",
};

function sectionHasContent(id: HomepageSectionId): boolean {
  switch (id) {
    case "projects":
      return getVisibleProjects().length > 0;
    case "building":
      return Boolean(getCurrentlyBuilding());
    case "facts":
      return false;
    case "experience":
      return getVisibleExperience().length > 0;
    case "skills":
      return getSkillCategories().length > 0;
    case "about":
      return getAboutParagraphs().length > 0;
    case "contact":
      return hasContactAction();
    default:
      return true;
  }
}

export function getEnabledSections(): HomepageSectionConfig[] {
  return homepageSections
    .filter((section) => section.enabled && sectionHasContent(section.id))
    .sort((a, b) => a.order - b.order);
}

export function isSectionEnabled(id: HomepageSectionId): boolean {
  return getEnabledSections().some((section) => section.id === id);
}

export function getSectionIndex(id: HomepageSectionId): string {
  if (id === "hero") return "00";
  const enabled = getEnabledSections().filter((section) => section.id !== "hero");
  const index = enabled.findIndex((section) => section.id === id);
  if (index === -1) return "00";
  return formatIndex(index);
}

export function getSectionLabel(id: HomepageSectionId): string {
  return SECTION_LABELS[id];
}

export function getSectionHref(id: HomepageSectionId): string {
  if (id === "hero") return "/";
  if (id === "projects") return "/#projects";
  return `/#${id}`;
}

export function getNextSectionAfter(
  id: HomepageSectionId,
): HomepageSectionConfig | undefined {
  const enabled = getEnabledSections();
  const index = enabled.findIndex((section) => section.id === id);
  if (index === -1) return undefined;
  return enabled[index + 1];
}

export function getHeroPrimaryAction(): { href: string; label: string } | null {
  if (isSectionEnabled("projects")) {
    return { href: "/#projects", label: "View projects" };
  }
  if (isSectionEnabled("about")) {
    return { href: "/#about", label: `About ${site.firstName}` };
  }
  if (isSectionEnabled("contact")) {
    return { href: "/#contact", label: site.contactCta };
  }
  return null;
}
