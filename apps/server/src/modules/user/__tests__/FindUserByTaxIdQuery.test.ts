import { graphql, GraphQLError } from "graphql"
import { schema } from "@/schema"
import { connectWithMongoose } from "@/test/connectWithMongoose"
import { disconnectWithMongoose } from "@/test/disconnectWithMongoose"
import { createUser } from "../fixtures/createUser"

describe("FindUserByTaxIdQuery", () => {
  beforeAll(connectWithMongoose)
  afterAll(disconnectWithMongoose)

  it("should find an user by taxId", async () => {
    const user = await createUser()

    const mutation = `
      query Q($taxId: String!) {
        FindUserByTaxId(taxId: $taxId) {
          firstName
          taxId
        }
      }
      `

    const variableValues = {
      taxId: user.taxId,
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

    const resultUser = result?.data?.FindUserByTaxId as any

    expect(resultUser.firstName).toBe(user.firstName)
    expect(resultUser.taxId).toBe(user.taxId)
  })

  it("should throw an error if user is not authenticated", async () => {
    const mutation = `
      query Q($taxId: String!) {
        FindUserByTaxId(taxId: $taxId) {
          firstName
          taxId
        }
      }
      `

    const variableValues = {
      taxId: "111.111.111-11",
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
    const user1 = await createUser()
    const user2 = await createUser()

    const mutation = `
      query Q($taxId: String!) {
        FindUserByTaxId(taxId: $taxId) {
          firstName
          taxId
        }
      }
      `

    const variableValues = {
      taxId: user1.taxId,
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
      contextValue: {
        user: user2,
      },
    })

    expect(result.errors?.[0]).toStrictEqual(
      new GraphQLError("Não autorizado!")
    )
  })
})
