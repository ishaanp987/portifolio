import { navigation, utilityLinks } from "@/config/navigation";
import { getVisibleExperience } from "@/lib/experience";
import { getVisibleProjects } from "@/lib/projects";
import type { NavItem } from "@/types";

export function getPrimaryNavigation(): NavItem[] {
  const hasProjects = getVisibleProjects().length > 0;
  const hasExperience = getVisibleExperience().length > 0;

  return navigation
    .filter((item) => (item.id === "experience" ? hasExperience : true))
    .map((item) => {
      if (item.id === "projects" && !hasProjects) {
        return { ...item, href: "/projects" };
      }
      return item;
    });
}

export function getUtilityLinks(): NavItem[] {
  return utilityLinks;
}
