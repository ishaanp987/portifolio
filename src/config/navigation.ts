import { site } from "@/config/site";
import type { NavItem } from "@/types";

export const navigation: NavItem[] = [
  { id: "home", label: "Home", href: "/#index" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const utilityLinks: NavItem[] = [
  ...(site.resume
    ? [
        {
          id: "resume",
          label: "Résumé",
          href: site.resume,
          external: true,
        } satisfies NavItem,
      ]
    : []),
  ...(site.github
    ? [
        {
          id: "github",
          label: "GitHub",
          href: site.github,
          external: true,
        } satisfies NavItem,
      ]
    : []),
];
