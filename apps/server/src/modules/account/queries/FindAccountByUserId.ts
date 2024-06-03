import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql"

import { AccountType } from "../AccountType"
import { findAccountByUserIdService } from "../service"

export const FindAccountByUserId: GraphQLFieldConfig<any, any, any> = {
  description: "Find an account",
  type: AccountType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args, context) => {
    if (!context?.user || args?.userId !== context?.user?._id?.toString()) {
      throw new Error("Não autorizado!")
    }

    return findAccountByUserIdService(args.userId)
  },
}
