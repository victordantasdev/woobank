import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql"

import { Transaction } from "./TransactionModel"

export const TransactionType = new GraphQLObjectType<Transaction>({
  name: "Transaction",
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: (transaction) => transaction._id.toString(),
    },
    operationId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (transaction) => transaction.operationId,
    },
    senderTaxId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (transaction) => transaction.senderTaxId,
    },
    receiverTaxId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (transaction) => transaction.receiverTaxId,
    },
    value: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (transaction) => transaction.value,
    },
    status: {
      type: GraphQLString,
      resolve: (transaction) => transaction.status,
    },
    completedAt: {
      type: GraphQLString,
      resolve: (transaction) => transaction.completedAt,
    },
  }),
})

export const TransactionsListType = new GraphQLList(TransactionType)
