import { graphql, GraphQLError } from "graphql"
import { schema } from "@/schema"
import { connectWithMongoose } from "@/test/connectWithMongoose"
import { disconnectWithMongoose } from "@/test/disconnectWithMongoose"
import { createUser } from "@/modules/user/fixtures/createUser"

import { createTransactionFixture } from "../fixtures/createTransactionFixture"

describe("CreateTransactionMutation", () => {
  beforeAll(connectWithMongoose)
  afterAll(disconnectWithMongoose)

  it("should find all transactions by senderTaxId", async () => {
    const user1 = await createUser()
    const user2 = await createUser()

    await createTransactionFixture({
      senderTaxId: user1.taxId,
      receiverTaxId: user2.taxId,
    })

    const mutation = `
      query Q($senderTaxId: String!) {
        FindAllTransactionsBySenderTaxId(senderTaxId: $senderTaxId) {
          senderTaxId
          receiverTaxId
          value
          status
          completedAt
        }
      }
      `

    const variableValues = {
      senderTaxId: user1.taxId,
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
      contextValue: {
        user: user1,
      },
    })

    const mutationResult = result?.data?.FindAllTransactionsBySenderTaxId as any

    expect(result.errors).toBeUndefined()
    expect(mutationResult.length).toBe(1)
  })

  it("should throw an error if user is not authenticated", async () => {
    const mutation = `
      query Q($senderTaxId: String!) {
        FindAllTransactionsBySenderTaxId(senderTaxId: $senderTaxId) {
          senderTaxId
          receiverTaxId
          value
          status
          completedAt
        }
      }
      `

    const variableValues = {
      senderTaxId: "111.111.111-11",
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    })

    expect(result.errors).toStrictEqual([new GraphQLError("Não autorizado!")])
  })

  it("should throw an error if user is trying to access another user transactions", async () => {
    const user1 = await createUser()
    const user2 = await createUser()

    await createTransactionFixture({
      senderTaxId: user1.taxId,
      receiverTaxId: user2.taxId,
    })

    const mutation = `
      query Q($senderTaxId: String!) {
        FindAllTransactionsBySenderTaxId(senderTaxId: $senderTaxId) {
          senderTaxId
          receiverTaxId
          value
          status
          completedAt
        }
      }
      `

    const variableValues = {
      senderTaxId: user2.taxId,
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
      contextValue: {
        user: user1,
      },
    })

    expect(result.errors).toStrictEqual([new GraphQLError("Não autorizado!")])
  })
})
