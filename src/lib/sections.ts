import { homepageSections } from "@/config/sections";
import { formatIndex } from "@/lib/format";
import type { HomepageSectionConfig, HomepageSectionId } from "@/types";

export function getEnabledSections(): HomepageSectionConfig[] {
  return homepageSections
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);
}

export function isSectionEnabled(id: HomepageSectionId): boolean {
  return homepageSections.some((section) => section.id === id && section.enabled);
}

export function getSectionIndex(id: HomepageSectionId): string {
  if (id === "hero") return "00";
  const enabled = getEnabledSections().filter((section) => section.id !== "hero");
  const index = enabled.findIndex((section) => section.id === id);
  if (index === -1) return "00";
  return formatIndex(index);
}
