/**
 * Format the given amount to a currency string.
 *
 * @param amount - The amount to be formatted.
 * @return The formatted amount.
 */
export function formatMoney(amount: number): string {
  return Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100)
}
