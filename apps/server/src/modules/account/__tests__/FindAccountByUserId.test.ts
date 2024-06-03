import { graphql, GraphQLError } from "graphql"
import { Types } from "mongoose"

import { schema } from "@/schema"
import { connectWithMongoose } from "@/test/connectWithMongoose"
import { disconnectWithMongoose } from "@/test/disconnectWithMongoose"
import { createUser } from "@/modules/user/fixtures/createUser"

describe("FindAccountByUserId", () => {
  beforeAll(connectWithMongoose)
  afterAll(disconnectWithMongoose)

  it("should find an account by userId", async () => {
    const user = await createUser()

    const mutation = `
      query Q($userId: String!) {
        FindAccountByUserId(userId: $userId) {
          _id
          userId
          accountNumber
          balance
          ledger {
            value
            date
            type
          }
        }
      }
      `

    const variableValues = {
      userId: user._id.toString(),
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
      contextValue: {
        user,
      },
    })

    expect(result.errors).toBeUndefined()

    const resultAccount = result?.data?.FindAccountByUserId as any

    expect(resultAccount.userId).toBe(user._id)
    expect(resultAccount.accountNumber).toBeDefined()
    expect(resultAccount.ledger.length).toBe(0)
  })

  it("should throw an error if user is not authenticated", async () => {
    const mutation = `
      query Q($userId: String!) {
        FindAccountByUserId(userId: $userId) {
          _id
          userId
          accountNumber
          balance
          ledger {
            value
            date
            type
          }
        }
      }
      `

    const variableValues = {
      userId: new Types.ObjectId().toString(),
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    })

    expect(result.errors?.[0]).toStrictEqual(
      new GraphQLError("Não autorizado!")
    )
  })

  it("should throw an error if user is trying to access another user", async () => {
    const user = await createUser()

    const mutation = `
      query Q($userId: String!) {
        FindAccountByUserId(userId: $userId) {
          _id
          userId
          accountNumber
          balance
          ledger {
            value
            date
            type
          }
        }
      }
      `

    const variableValues = {
      userId: new Types.ObjectId().toString(),
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
      contextValue: {
        user,
      },
    })

    expect(result.errors?.[0]).toStrictEqual(
      new GraphQLError("Não autorizado!")
    )
  })
})
