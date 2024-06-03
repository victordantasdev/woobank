import jwt from "jsonwebtoken"

import { signJWT, verifyJWT } from "../jwt"

jest.mock("jsonwebtoken")

describe("signJWT", () => {
  it("should sign a payload and return a token", async () => {
    const payload = { key: "value" }
    const options = { expiresIn: "1h" }
    const mockToken = "mockToken"
    ;(jwt.sign as jest.Mock).mockReturnValue(mockToken)

    const result = await signJWT(payload, options)

    expect(result).toBe(mockToken)
    expect(jwt.sign).toHaveBeenCalledWith(payload, "", {
      ...options,
      algorithm: "none",
    })
  })

  it("should use default options if none provided", async () => {
    const payload = { key: "value" }
    const mockToken = "mockToken"
    ;(jwt.sign as jest.Mock).mockReturnValue(mockToken)

    const result = await signJWT(payload, {})

    expect(result).toBe(mockToken)
    expect(jwt.sign).toHaveBeenCalledWith(payload, "", {
      algorithm: "none",
    })
  })
})

describe("verifyJWT", () => {
  it("should verify a valid token", async () => {
    const token = "validToken"
    const mockPayload = { key: "value" }
    ;(jwt.verify as jest.Mock).mockReturnValue(mockPayload)

    const result = await verifyJWT(token)

    expect(result).toBe(mockPayload)
    expect(jwt.verify).toHaveBeenCalledWith(token, "", {
      algorithms: ["none"],
    })
  })

  it("should throw an error for an invalid token", async () => {
    const token = "invalidToken"
    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Token inválido")
    })

    await expect(verifyJWT(token)).rejects.toThrow("Token inválido")
    expect(jwt.verify).toHaveBeenCalledWith(token, "", {
      algorithms: ["none"],
    })
  })
})
