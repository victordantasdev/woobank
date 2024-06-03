import { Ledger } from "@/types"
import { getAccountBalance } from "@/utils/getAccountBalance"

describe("getAccountBalance", () => {
  it("should return 0 for an empty ledger", () => {
    const ledger: Ledger = []
    const result = getAccountBalance(ledger)
    expect(result).toBe(0)
  })

  it("should return the correct balance for a ledger with only revenue entries", () => {
    const ledger: Ledger = [
      { value: 100, date: "2024-01-01", type: "revenue" },
      { value: 200, date: "2024-01-02", type: "revenue" },
    ]
    const result = getAccountBalance(ledger)
    expect(result).toBe(300)
  })

  it("should return the correct balance for a ledger with only expense entries", () => {
    const ledger: Ledger = [
      { value: 50, date: "2024-01-01", type: "expense" },
      { value: 150, date: "2024-01-02", type: "expense" },
    ]
    const result = getAccountBalance(ledger)
    expect(result).toBe(-200)
  })

  it("should return the correct balance for a mixed ledger", () => {
    const ledger: Ledger = [
      { value: 100, date: "2024-01-01", type: "revenue" },
      { value: 50, date: "2024-01-02", type: "expense" },
      { value: 200, date: "2024-01-03", type: "revenue" },
      { value: 150, date: "2024-01-04", type: "expense" },
    ]
    const result = getAccountBalance(ledger)
    expect(result).toBe(100) // (100 - 50 + 200 - 150)
  })

  it("should handle a ledger with a single revenue entry", () => {
    const ledger: Ledger = [{ value: 500, date: "2024-01-01", type: "revenue" }]
    const result = getAccountBalance(ledger)
    expect(result).toBe(500)
  })

  it("should handle a ledger with a single expense entry", () => {
    const ledger: Ledger = [{ value: 300, date: "2024-01-01", type: "expense" }]
    const result = getAccountBalance(ledger)
    expect(result).toBe(-300)
  })

  it("should return 0 for a null ledger", () => {
    const result = getAccountBalance(null)
    expect(result).toBe(0)
  })

  it("should return 0 for an undefined ledger", () => {
    const result = getAccountBalance(undefined)
    expect(result).toBe(0)
  })
})
