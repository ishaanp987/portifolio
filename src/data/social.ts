import { site } from "@/config/site";
import type { SocialLink } from "@/types";

const allSocial: Array<SocialLink | null> = [
  site.github
    ? {
        id: "github",
        label: "GitHub",
        href: site.github,
        external: true,
      }
    : null,
  site.linkedin
    ? {
        id: "linkedin",
        label: "LinkedIn",
        href: site.linkedin,
        external: true,
      }
    : null,
  site.email
    ? {
        id: "email",
        label: "Email",
        href: `mailto:${site.email}`,
        external: false,
      }
    : null,
];

export const social: SocialLink[] = allSocial.filter(
  (item): item is SocialLink => item !== null,
);
