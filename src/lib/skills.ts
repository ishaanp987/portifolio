import { skillCategories } from "@/data/skills";
import { isRealValue } from "@/lib/content";
import type { SkillCategory } from "@/types";

export function getSkillCategories(): SkillCategory[] {
  return skillCategories
    .map((category) => ({
      ...category,
      items: category.items.filter(isRealValue),
    }))
    .filter((category) => category.items.length > 0);
}
