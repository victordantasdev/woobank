import { convertValueToCents } from "../convertValueToCents"

describe("convertValueToCents", () => {
  it("should convert 1.23 to 123 cents", () => {
    expect(convertValueToCents(1.23)).toBe(123)
  })

  it("should convert 0.56 to 56 cents", () => {
    expect(convertValueToCents(0.56)).toBe(56)
  })

  it("should convert 0.555 to 56 cents (rounded)", () => {
    expect(convertValueToCents(0.555)).toBe(56)
  })

  it("should convert 0.554 to 55 cents (rounded)", () => {
    expect(convertValueToCents(0.554)).toBe(55)
  })

  it("should convert 123.45 to 12345 cents", () => {
    expect(convertValueToCents(123.45)).toBe(12345)
  })

  it("should convert -1.23 to -123 cents", () => {
    expect(convertValueToCents(-1.23)).toBe(-123)
  })

  it("should convert 0 to 0 cents", () => {
    expect(convertValueToCents(0)).toBe(0)
  })

  it("should handle large values correctly", () => {
    expect(convertValueToCents(12345678.9)).toBe(1234567890)
  })

  it("should handle very small values correctly", () => {
    expect(convertValueToCents(0.0001)).toBe(0)
  })
})
