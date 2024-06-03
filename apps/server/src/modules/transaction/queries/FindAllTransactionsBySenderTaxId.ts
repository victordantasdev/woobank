import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql"

import { TransactionModel } from "../TransactionModel"
import { TransactionsListType } from "../TransactionType"

export const FindAllTransactionsBySenderTaxId: GraphQLFieldConfig<
  any,
  any,
  any
> = {
  description: "Find all transactions by senderId",
  type: TransactionsListType,
  args: {
    senderTaxId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args, context) => {
    if (!context?.user || args?.senderTaxId !== context?.user?.taxId) {
      throw new Error("Não autorizado!")
    }

    const transactions = await TransactionModel.find({
      senderTaxId: args.senderTaxId,
    })

    return transactions.reverse()
  },
}
