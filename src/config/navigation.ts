import { site } from "@/config/site";
import { isUsableHref } from "@/lib/content";
import type { NavItem } from "@/types";

export const navigation: NavItem[] = [
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "skills", label: "Methods", href: "/#skills" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const utilityLinks: NavItem[] = isUsableHref(site.resume)
  ? [
      {
        id: "resume",
        label: "Résumé",
        href: site.resume,
        external: true,
      },
    ]
  : isUsableHref(site.github)
    ? [
        {
          id: "github",
          label: "GitHub",
          href: site.github,
          external: true,
        },
      ]
    : [];
