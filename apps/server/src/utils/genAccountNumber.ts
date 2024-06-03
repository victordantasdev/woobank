/**
 * Generates a random account number with a digit verifier.
 * @returns The generated account number in the format XXXXXXX-Y.
 */
export function genAccountNumber(): string {
  const accountNumber = Math.floor(Math.random() * 10_000_000)
    .toString()
    .padStart(7, "0")

  const sum = accountNumber
    .split("")
    .reduce(
      (acc, digit, index) => acc + parseInt(digit) * (index % 2 === 0 ? 2 : 1),
      0
    )
  const digit = (11 - (sum % 11)) % 10

  return `${accountNumber}-${digit}`
}
