/**
 * Merge multiple class name strings together, removing duplicates
 * This is useful for conditionally applying classes
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}