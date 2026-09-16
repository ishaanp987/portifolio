import type { SkillCategory } from "@/types";

/**
 * Replace items with your actual skills.
 * Do not add percentages or ratings — projects should show proficiency.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["TypeScript", "Python", "C++", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "HTML", "CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "REST APIs", "Replace with tools you actually use"],
  },
  {
    id: "ai",
    label: "AI / APIs",
    items: ["Replace with models, libraries, or APIs you have used"],
  },
  {
    id: "engineering",
    label: "Engineering",
    items: ["Robotics", "Control systems", "Replace with hardware or lab work"],
  },
  {
    id: "tools",
    label: "Developer Tools",
    items: ["Git", "Linux", "VS Code / Cursor"],
  },
];
