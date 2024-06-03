import { genAccountNumber } from "../genAccountNumber"

describe("genAccountNumber", () => {
  const originalMathRandom = Math.random

  beforeEach(() => {
    Math.random = jest.fn()
  })

  afterEach(() => {
    Math.random = originalMathRandom
  })

  const rand = Math.random as jest.Mock

  it("should generate an account number of the correct format", () => {
    ;(Math.random as jest.Mock).mockReturnValue(0.1234567)
    const result = genAccountNumber()
    expect(result).toMatch(/^\d{7}-\d$/)
  })

  it("should generate the correct verifier digit", () => {
    ;(Math.random as jest.Mock).mockReturnValue(0.1234567)
    const accountNumber = "0123456"
    const sum = accountNumber
      .split("")
      .reduce(
        (acc, digit, index) =>
          acc + parseInt(digit) * (index % 2 === 0 ? 2 : 1),
        0
      )
    const expectedDigit = (11 - (sum % 11)) % 10
    const result = genAccountNumber()
    const generatedDigit = parseInt(result.split("-")[1]!)
    expect(generatedDigit).toBe(expectedDigit)
  })

  it("should generate a different account number for different random values", () => {
    ;(Math.random as jest.Mock)
      .mockReturnValueOnce(0.1234567)
      .mockReturnValueOnce(0.7654321)
    const result1 = genAccountNumber()
    const result2 = genAccountNumber()
    expect(result1).not.toBe(result2)
  })
})
