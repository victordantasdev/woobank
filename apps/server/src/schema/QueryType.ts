import { GraphQLObjectType } from "graphql"

import * as userQueries from "../modules/user/queries"
import * as accountQueries from "../modules/account/queries"
import * as transactionQueries from "../modules/transaction/queries"

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root all queries",
  fields: () => ({
    ...userQueries,
    ...accountQueries,
    ...transactionQueries,
  }),
})
