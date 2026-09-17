import type { Experience } from "@/types";

/**
 * Placeholder entries. Replace with real roles.
 * Set `hidden: true` to keep a draft in the file without showing it.
 */
export const experience: Experience[] = [
  {
    id: "example-role-current",
    organization: "Organization Name",
    role: "Role Title",
    sample: true,
    startDate: "2025-06",
    endDate: "present",
    location: "City, Country",
    description:
      "Replace this with one or two sentences on what you built and the impact.",
    highlights: [
      "Replace with a concrete outcome, not a task list.",
      "Replace with another measurable or clearly described contribution.",
    ],
    technologies: ["TypeScript", "Python"],
    link: "",
  },
  {
    id: "example-role-past",
    organization: "Another Organization",
    role: "Previous Role",
    sample: true,
    startDate: "2024-09",
    endDate: "2025-05",
    description:
      "Short description of the work. Keep the focus on systems you owned or improved.",
    highlights: ["Replace with a highlight, or delete this array."],
    technologies: ["C++", "Linux"],
  },
  {
    id: "example-hidden",
    organization: "Hidden Draft Role",
    role: "Not shown on the site",
    sample: true,
    startDate: "2023",
    hidden: true,
    description: "This entry exists to demonstrate the hidden flag.",
  },
];
