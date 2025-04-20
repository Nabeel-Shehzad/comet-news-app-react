/**
 * Helper function to convert CSS variable usage to a format that works with Tailwind CSS v4
 * @param {string} variable - The CSS variable name (without the var(--) syntax)
 * @returns {string} - The CSS variable in the correct format for inline usage
 */
export function getCssVar(variable) {
  return `hsl(var(--${variable}))`;
}