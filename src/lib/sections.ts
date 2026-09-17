import { homepageSections } from "@/config/sections";
import { formatIndex } from "@/lib/format";
import { getVisibleExperience } from "@/lib/experience";
import { getVisibleProjects } from "@/lib/projects";
import { getSkillCategories } from "@/lib/skills";
import type { HomepageSectionConfig, HomepageSectionId } from "@/types";

function sectionHasContent(id: HomepageSectionId): boolean {
  switch (id) {
    case "projects":
      return getVisibleProjects().length > 0;
    case "experience":
      return getVisibleExperience().length > 0;
    case "skills":
      return getSkillCategories().length > 0;
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
