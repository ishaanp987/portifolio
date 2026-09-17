import { site } from "@/config/site";
import { hasContent } from "@/lib/links";

const PLACEHOLDER_FRAGMENTS = [
  "example.com",
  "your-username",
  "your.email",
  "your-domain.example",
  "your-domain",
  "placeholder",
];

const PLACEHOLDER_EXACT = new Set([
  "city, country",
  "organization name",
  "role title",
  "another organization",
  "previous role",
]);

export function isPlaceholderCopy(value: string | undefined | null): boolean {
  if (!hasContent(value)) return false;
  const normalized = value.trim().toLowerCase();
  if (PLACEHOLDER_EXACT.has(normalized)) return true;
  if (
    normalized.startsWith("replace with") ||
    normalized.startsWith("replace this") ||
    normalized.includes("replace this with") ||
    normalized.includes("replace with a")
  ) {
    return true;
  }
  return PLACEHOLDER_FRAGMENTS.some((fragment) => normalized.includes(fragment));
}

export function isRealValue(value: string | undefined | null): value is string {
  return hasContent(value) && !isPlaceholderCopy(value);
}

export function isUsableHref(value: string | undefined | null): value is string {
  if (!isRealValue(value)) return false;
  const href = value.trim();
  if (href.startsWith("/") || href.startsWith("#")) return true;
  if (href.startsWith("mailto:")) {
    return isUsableEmail(href.slice("mailto:".length));
  }
  try {
    const url = new URL(href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    if (
      host === "example.com" ||
      host === "example.org" ||
      host === "example.net" ||
      host.endsWith(".example.com") ||
      host.endsWith(".example")
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function isUsableEmail(value: string | undefined | null): value is string {
  if (!isRealValue(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function mailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}

export type PendingField = {
  key: string;
  current: string;
};

export function getPendingSiteFields(): PendingField[] {
  const fields: Array<[string, string | undefined]> = [
    ["email", site.email],
    ["location", site.location],
    ["github", site.github],
    ["linkedin", site.linkedin],
    ["resume", site.resume],
    ["availability", site.availability],
    ["url", site.url],
    ["heroImage", site.heroImage],
    ["avatar", site.avatar],
  ];

  return fields
    .filter(([, value]) => !isRealValue(value))
    .map(([key, value]) => ({
      key,
      current: hasContent(value) ? value.trim() : "(empty)",
    }));
}

export function getHeroFacts(): Array<{ label: string; value: string }> {
  const facts: Array<{ label: string; value: string }> = [];
  if (isRealValue(site.location)) facts.push({ label: "Location", value: site.location });
  if (isRealValue(site.availability)) {
    facts.push({ label: "Status", value: site.availability });
  }
  return facts;
}

export function getHeroSecondaryAction(): { href: string; label: string } | null {
  if (isUsableHref(site.resume)) {
    return { href: site.resume, label: "Résumé" };
  }
  if (isUsableEmail(site.email)) {
    return { href: mailtoHref(site.email), label: "Contact" };
  }
  return null;
}
