import { signJWT, verifyJWT } from "@/utils/jwt"
import { type User, UserModel } from "./UserModel"

export const signTokens = async (user: User) => {
  const access_token = signJWT(
    {
      sub: user.id,
      taxId: user.taxId,
      firstName: user.firstName,
      _id: user._id,
    },
    { expiresIn: "1 year" }
  )
  return { access_token }
}

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null }

  try {
    const decoded = await verifyJWT(token)

    if (!decoded) {
      return { user: null }
    }

    const user = await UserModel.findById(decoded.sub)

    if (!user) {
      return { user: null }
    }

    return {
      user,
    }
  } catch (error) {
    return { user: null }
  }
}
