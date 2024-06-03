import { mutationWithClientMutationId } from "graphql-relay"
import { GraphQLString, GraphQLNonNull, GraphQLFloat } from "graphql"
import { createTransaction } from "../service"

type TransactionInput = {
  senderTaxId: string
  receiverTaxId: string
  value: number
}

export const CreateTransactionMutation = mutationWithClientMutationId({
  name: "CreateTransaction",
  description: "Creates a new transaction",
  inputFields: {
    senderTaxId: { type: new GraphQLNonNull(GraphQLString) },
    receiverTaxId: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLFloat) },
  },

  mutateAndGetPayload: async (
    { senderTaxId, receiverTaxId, value }: TransactionInput,
    context
  ) => {
    if (!context?.user) {
      throw new Error("Não autorizado!")
    }

    if (senderTaxId === receiverTaxId) {
      throw new Error("Não é possível transferir para si mesmo!")
    }

    const operationId = await createTransaction({
      senderTaxId,
      receiverTaxId,
      value,
    })

    return operationId
  },

  outputFields: {
    operationId: {
      type: GraphQLString,
      resolve: (operationId) => operationId,
    },
  },
})
