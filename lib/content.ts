/**
 * Use this guard before rendering collection-backed sections. Empty or missing
 * collections return false, allowing the section to stay out of the document.
 */
export function hasItems<T>(
  items: readonly T[] | null | undefined,
): items is readonly [T, ...T[]] {
  return Boolean(items?.length);
}

/** Use this guard before rendering an optional single-record section. */
export function hasContent<T>(
  value: T | null | undefined,
): value is T {
  return value !== null && value !== undefined;
}
