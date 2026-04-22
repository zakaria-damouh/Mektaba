import { format, formatDistanceToNow, isValid } from "date-fns";

/**
 * Format date to readable string
 * Example: 22 Apr 2026
 */
export function formatDate(date?: string | Date) {
  if (!date) return "-";

  const d = new Date(date);
  if (!isValid(d)) return "-";

  return format(d, "dd MMM yyyy");
}

/**
 * Format date with time
 * Example: 22 Apr 2026, 14:30
 */
export function formatDateTime(date?: string | Date) {
  if (!date) return "-";

  const d = new Date(date);
  if (!isValid(d)) return "-";

  return format(d, "dd MMM yyyy, HH:mm");
}

/**
 * Relative time
 * Example: "3 days ago"
 */
export function fromNow(date?: string | Date) {
  if (!date) return "-";

  const d = new Date(date);
  if (!isValid(d)) return "-";

  return formatDistanceToNow(d, { addSuffix: true });
}


export function formatCompactDate(date?: string | Date) {
  if (!date) return "-";

  const d = new Date(date);
  if (!isValid(d)) return "-";

  return format(d, "dd MMM");
}

export function formatRelativeDate(date?: string | Date) {
  if (!date) return "-";

  const d = new Date(date);
  if (!isValid(d)) return "-";

  return formatDistanceToNow(d, { addSuffix: true });
}