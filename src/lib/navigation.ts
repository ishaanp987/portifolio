import { navigation, utilityLinks } from "@/config/navigation";
import { isSectionEnabled } from "@/lib/sections";
import type { NavItem } from "@/types";

export function getPrimaryNavigation(): NavItem[] {
  return navigation.filter((item) => {
    if (item.id === "projects") return isSectionEnabled("projects");
    if (item.id === "experience") return isSectionEnabled("experience");
    if (item.id === "about") return isSectionEnabled("about");
    if (item.id === "contact") return isSectionEnabled("contact");
    return true;
  });
}

export function getUtilityLinks(): NavItem[] {
  return utilityLinks;
}
