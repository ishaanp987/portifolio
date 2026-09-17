import { site } from "@/config/site";
import { isUsableEmail, isUsableHref, mailtoHref } from "@/lib/content";
import type { SocialLink } from "@/types";

const allSocial: Array<SocialLink | null> = [
  isUsableHref(site.github)
    ? {
        id: "github",
        label: "GitHub",
        href: site.github,
        external: true,
      }
    : null,
  isUsableHref(site.linkedin)
    ? {
        id: "linkedin",
        label: "LinkedIn",
        href: site.linkedin,
        external: true,
      }
    : null,
  isUsableEmail(site.email)
    ? {
        id: "email",
        label: "Email",
        href: mailtoHref(site.email),
        external: false,
      }
    : null,
];

export const social: SocialLink[] = allSocial.filter(
  (item): item is SocialLink => item !== null,
);
