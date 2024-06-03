import jwt, { SignOptions } from "jsonwebtoken"

/**
 * Sign a JWT token with the given payload and options.
 *
 * @param payload - The payload object.
 * @param options - The sign options.
 *
 * @returns A promise that resolves to the signed token.
 */
export async function signJWT(
  payload: Record<string, string>,
  options: SignOptions
) {
  const mergedOptions = {
    ...(options ? options : {}),
    algorithm: "none",
  }

  return jwt.sign(payload, "" as any, mergedOptions as any)
}

/**
 * Verify a JWT token.
 *
 * @param token - The JWT token.
 *
 * @returns A promise that resolves to the payload of the token, or rejects
 *          with an error if the token is invalid.
 *
 * @throws Error - If the token is invalid.
 */
export async function verifyJWT(token: string) {
  try {
    return jwt.verify(token, "", {
      algorithms: ["none"],
    })
  } catch (error) {
    throw new Error("Token inválido")
  }
}
