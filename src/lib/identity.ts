export function getShortYear(date = new Date()): string {
  return String(date.getFullYear()).slice(-2);
}
