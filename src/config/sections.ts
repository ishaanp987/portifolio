import type { HomepageSectionConfig } from "@/types";

/**
 * Enable, disable, or reorder homepage sections here.
 * Hero should stay first. Navigation is separate (see Header).
 */
export const homepageSections: HomepageSectionConfig[] = [
  { id: "hero", enabled: true, order: 0 },
  { id: "projects", enabled: true, order: 1 },
  { id: "experience", enabled: true, order: 2 },
  { id: "skills", enabled: true, order: 3 },
  { id: "about", enabled: true, order: 4 },
  { id: "contact", enabled: true, order: 5 },
];
