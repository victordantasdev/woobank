/**
 * Calculates the digit verifier for a given CPF.
 *
 * The digit verifier is the last digit of the CPF.
 *
 * @param cpf - An array of numbers representing the CPF.
 * @returns The digit verifier.
 */
function genDigit(cpf: number[]): number {
  let sum = 0
  for (let i = 0; i < cpf.length; i++) {
    sum += cpf[i]! * (cpf.length + 1 - i)
  }

  const rest = sum % 11

  return rest < 2 ? 0 : 11 - rest
}

/**
 * Generates a random CPF (Brazilian Identification Number)
 * @returns A string with the CPF in the format XXXX.XXX.XXX-XX
 */
export function genCPF(): string {
  let cpf: number[] = []

  for (let i = 0; i < 9; i++) {
    cpf.push(Math.floor(Math.random() * 10))
  }

  cpf.push(genDigit(cpf))
  cpf.push(genDigit(cpf))

  return cpf.join("").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}
