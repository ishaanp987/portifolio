import { skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/types";

export function getSkillCategories(): SkillCategory[] {
  return skillCategories.filter((category) => category.items.length > 0);
}
