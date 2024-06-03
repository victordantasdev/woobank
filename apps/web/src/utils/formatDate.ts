/**
 * Format a given date to a pt-BR format.
 * @param date - The date to format.
 * @returns The formatted date.
 * @example
 * formatDate('2022-07-15T12:34:56.789Z')
 * //=> "15 de julho de 2022, 19:34"
 */
export function formatDate(date: string): string {
  if (!date) return ""

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(date))
}
