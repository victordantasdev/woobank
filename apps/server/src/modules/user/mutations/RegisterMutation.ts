import { GraphQLNonNull, GraphQLString } from "graphql"
import { mutationWithClientMutationId } from "graphql-relay"
import bcrypt from "bcryptjs"

import { UserModel } from "../UserModel"
import { signTokens } from "../userAuth"
import { UserType } from "../UserType"
import { findUserByTaxId } from "../UserService"
import { genAccountNumber } from "@/utils/genAccountNumber"
import { AccountModel } from "@/modules/account/AccountModel"

type RegisterInput = {
  firstName: string
  taxId: string
  password: string
}

export const RegisterMutation = mutationWithClientMutationId({
  name: "Register",
  description: "Register a new user",
  inputFields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    taxId: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async (registerInput: RegisterInput) => {
    const { firstName, taxId, password } = registerInput

    const existingUser = await findUserByTaxId({ taxId })
    if (existingUser) {
      throw new Error(`"${taxId}" já está registrado`)
    }

    const hash = await bcrypt.hash(password, 10)

    const user = new UserModel({
      firstName,
      taxId,
      password: hash,
    })

    await user.save()

    const account = new AccountModel({
      userId: user._id,
      taxId: user.taxId,
      accountNumber: genAccountNumber(),
    })

    await account.save()

    const { access_token } = await signTokens(user)

    return {
      access_token,
      user,
    }
  },

  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ access_token }: any) => access_token,
    },

    me: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
})
