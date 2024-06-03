import { graphql } from "graphql"
import { schema } from "@/schema"

type Args = {
  senderTaxId: string
  receiverTaxId: string
  value?: number
}

export async function createTransactionFixture({
  senderTaxId,
  receiverTaxId,
  value,
}: Args): Promise<string> {
  const mutation = `
    mutation M($input: CreateTransactionInput!) {
      CreateTransactionMutation(input: $input) {
        operationId
      }
    }
  `

  const variableValues = {
    input: {
      senderTaxId,
      receiverTaxId,
      value: value || 1000,
    },
  }

  const result = await graphql({
    schema,
    source: mutation,
    variableValues,
    contextValue: {
      user: {
        _id: "user-id",
        taxId: senderTaxId,
        firstName: "User",
      },
    },
  })

  const { operationId } = result.data!.CreateTransactionMutation as any

  return operationId
}
