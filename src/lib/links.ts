export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function hasContent(value: string | undefined | null): value is string {
  return Boolean(value && value.trim().length > 0);
}

export function joinList(items: string[] | undefined, separator = "  ·  "): string {
  return (items ?? []).filter((item) => item.trim().length > 0).join(separator);
}
