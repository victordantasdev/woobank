/**
 * Converts a value to cents by multiplying it by 100 and rounding it.
 *
 * value - The value to be converted to cents.
 * The value converted to cents.
 */
export function convertValueToCents(value: number): number {
  const cents = value * 100
  return Math.round(cents)
}
