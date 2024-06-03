import { GraphQLObjectType } from "graphql"

import * as userMutations from "../modules/user/mutations"
import * as transactionMutations from "../modules/transaction/mutations"

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root of mutations",
  fields: () => ({
    ...userMutations,
    ...transactionMutations,
  }),
})
