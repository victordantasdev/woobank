import { graphql, GraphQLError } from "graphql"
import { schema } from "@/schema"
import { connectWithMongoose } from "@/test/connectWithMongoose"
import { disconnectWithMongoose } from "@/test/disconnectWithMongoose"
import { createUser } from "../fixtures/createUser"

describe("LoginUserMutation", () => {
  beforeAll(connectWithMongoose)
  afterAll(disconnectWithMongoose)

  it("should login a user", async () => {
    const user = await createUser()

    const mutation = `
      mutation M($input: LoginInput!) {
        LoginMutation(input: $input) {
          token
          me {
            _id
            firstName
            taxId
          }
        }
      }
      `

    const variableValues = {
      input: {
        taxId: user.taxId,
        password: user.password,
      },
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
      contextValue: { user },
    })

    expect(result.errors).toBeUndefined()

    const { me, token } = result?.data?.LoginMutation as any

    expect(token).toBeDefined()
    expect(me.firstName).toBe(user.firstName)
    expect(me.taxId).toBe(user.taxId)
  })

  it("should throw an error if taxId is incorrect", async () => {
    const user = await createUser()

    const mutation = `
      mutation M($input: LoginInput!) {
        LoginMutation(input: $input) {
          token
          me {
            _id
            firstName
            taxId
          }
        }
      }
      `

    const variableValues = {
      input: {
        taxId: "111.111.111-11",
        password: user.password,
      },
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    })

    expect(result.errors?.[0]).toStrictEqual(
      new GraphQLError("Usuário ou senha incorretos")
    )
  })

  it("should throw an error if password is incorrect", async () => {
    const user = await createUser()

    const mutation = `
      mutation M($input: LoginInput!) {
        LoginMutation(input: $input) {
          token
          me {
            _id
            firstName
            taxId
          }
        }
      }
      `

    const variableValues = {
      input: {
        taxId: user.taxId,
        password: "11111111",
      },
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    })

    expect(result.errors?.[0]).toStrictEqual(
      new GraphQLError("Usuário ou senha incorretos")
    )
  })
})
