import { experience } from "@/data/experience";
import { isDevelopment, isSampleExperience } from "@/lib/content";
import type { Experience } from "@/types";

function validateExperience(items: Experience[]): void {
  const ids = new Set<string>();

  for (const item of items) {
    if (!item.id?.trim()) {
      throw new Error("An experience entry is missing an id.");
    }
    if (ids.has(item.id)) {
      throw new Error(`Duplicate experience id: "${item.id}".`);
    }
    ids.add(item.id);

    if (!item.organization?.trim() || !item.role?.trim() || !item.startDate?.trim()) {
      throw new Error(`Experience "${item.id}" needs organization, role, and startDate.`);
    }
  }
}

validateExperience(experience);

function toSortableDate(value: string): number {
  if (value.toLowerCase() === "present") return Number.MAX_SAFE_INTEGER;
  const parsed = Date.parse(value.length === 4 ? `${value}-01-01` : `${value}-01`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getVisibleExperience(): Experience[] {
  return experience
    .filter((item) => !item.hidden)
    .filter((item) => isDevelopment() || !isSampleExperience(item))
    .sort((a, b) => {
      const endDelta =
        toSortableDate(b.endDate ?? "present") - toSortableDate(a.endDate ?? "present");
      if (endDelta !== 0) return endDelta;
      return toSortableDate(b.startDate) - toSortableDate(a.startDate);
    });
}

export function formatExperienceDates(item: Experience): string {
  const start = formatDateLabel(item.startDate);
  if (!item.endDate) return start;
  const end = formatDateLabel(item.endDate);
  if (start === end) return start;
  return `${start} — ${end}`;
}

export function formatDateLabel(value: string): string {
  if (value.toLowerCase() === "present") return "Present";
  if (/^\d{4}$/.test(value)) return value;
  if (/^\d{4}-\d{2}$/.test(value)) {
    const [year, month] = value.split("-");
    const names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = Number(month) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${names[monthIndex]} ${year}`;
    }
  }
  return value;
}

export function experienceYear(item: Experience): string {
  if (item.endDate && item.endDate.toLowerCase() !== "present") {
    return item.endDate.slice(0, 4);
  }
  return item.startDate.slice(0, 4);
}
