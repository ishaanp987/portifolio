import { site } from "@/config/site";
import { isRealValue, isUsableHref } from "@/lib/content";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv && isUsableHref(fromEnv)) return fromEnv;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  if (isUsableHref(site.url)) return site.url.replace(/\/$/, "");
  return "http://localhost:43211";
}

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized === "/" ? "" : normalized}`;
}

export function getSiteDescription(): string {
  if (isRealValue(site.description)) return site.description.trim();
  if (isRealValue(site.headline)) return site.headline.trim();
  return `${site.name} — ${site.role}`;
}
