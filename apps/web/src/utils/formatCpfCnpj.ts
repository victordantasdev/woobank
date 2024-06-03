/**
 * Format a string to CPF or CNPJ.
 * @param value - The value to format.
 * @returns The formatted value.
 *
 * The function removes all non-digit characters from the input.
 * If the resulting string has less than or equal to 11 characters,
 * it is considered a CPF.
 * If it has more than 11 characters, it is considered a CNPJ.
 *
 * If the input is a CPF, it is formatted as follows:
 * - xxx.xxx.xxx-xx
 *
 * If the input is a CNPJ, it is formatted as follows:
 * - xx.xxx.xxx/xxxx-xx
 */
export function formatCpfCnpj(value: string) {
  const cleanedValue = value.replace(/\D/g, "")

  if (cleanedValue.length <= 11) {
    return cleanedValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  return cleanedValue
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
}
