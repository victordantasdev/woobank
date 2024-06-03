import { graphql, GraphQLError } from "graphql"
import { schema } from "@/schema"
import { connectWithMongoose } from "@/test/connectWithMongoose"
import { disconnectWithMongoose } from "@/test/disconnectWithMongoose"
import { createUser } from "@/modules/user/fixtures/createUser"

describe("CreateTransactionMutation", () => {
  beforeAll(connectWithMongoose)
  afterAll(disconnectWithMongoose)

  it("should create a new transaction", async () => {
    const user1 = await createUser()
    const user2 = await createUser()

    const mutation = `
      mutation M($input: CreateTransactionInput!) {
        CreateTransactionMutation(input: $input) {
          operationId
        }
      }
      `

    const variableValues = {
      input: {
        senderTaxId: user1.taxId,
        receiverTaxId: user2.taxId,
        value: 1000,
      },
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
      contextValue: {
        user: user1,
      },
    })

    const mutationResult = result?.data?.CreateTransactionMutation as any

    expect(result.errors).toBeUndefined()
    expect(mutationResult.operationId).toBeDefined()
  })

  it("should throw an error if user is not authenticated", async () => {
    const mutation = `
      mutation M($input: CreateTransactionInput!) {
        CreateTransactionMutation(input: $input) {
          operationId
        }
      }
      `

    const variableValues = {
      input: {
        senderTaxId: "111.111.111-11",
        receiverTaxId: "222.222.222-22",
        value: 1000,
      },
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    })

    expect(result.errors).toStrictEqual([new GraphQLError("Não autorizado!")])
  })

  it("should throw an error if sender and receiver are the same", async () => {
    const user1 = await createUser()

    const mutation = `
      mutation M($input: CreateTransactionInput!) {
        CreateTransactionMutation(input: $input) {
          operationId
        }
      }
      `

    const variableValues = {
      input: {
        senderTaxId: user1.taxId,
        receiverTaxId: user1.taxId,
        value: 1000,
      },
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
      contextValue: {
        user: user1,
      },
    })

    expect(result.errors).toStrictEqual([
      new GraphQLError("Não é possível transferir para si mesmo!"),
    ])
  })
})
