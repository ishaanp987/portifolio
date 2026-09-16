const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  complete: "Complete",
  paused: "Paused",
  archived: "Archived",
  wip: "In progress",
};

export function formatStatus(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export function formatIndex(index: number, width = 2): string {
  return String(index + 1).padStart(width, "0");
}
