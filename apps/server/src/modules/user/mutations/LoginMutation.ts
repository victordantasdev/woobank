import { mutationWithClientMutationId } from "graphql-relay"
import { GraphQLString, GraphQLNonNull } from "graphql"

import { signTokens } from "../userAuth"
import { UserType } from "../UserType"
import { findUserLoginData } from "../UserService"

export const LoginMutation = mutationWithClientMutationId({
  name: "Login",
  description: "Logs in an user or raises an error",
  inputFields: {
    taxId: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async ({ taxId, password }) => {
    const user = await findUserLoginData({ taxId })
    if (!user || !(await user.comparePasswords(password, user.password))) {
      throw new Error("Usuário ou senha incorretos")
    }

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
