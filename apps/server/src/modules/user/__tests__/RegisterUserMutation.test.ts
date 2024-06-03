import { graphql, GraphQLError } from "graphql"
import { schema } from "@/schema"
import { connectWithMongoose } from "@/test/connectWithMongoose"
import { disconnectWithMongoose } from "@/test/disconnectWithMongoose"

describe("RegisterUserMutation", () => {
  beforeAll(connectWithMongoose)
  afterAll(disconnectWithMongoose)

  it("should create a new user", async () => {
    const mutation = `
      mutation M($input: RegisterInput!) {
        RegisterMutation(input: $input) {
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
        firstName: "Victor",
        taxId: "526.512.080-78",
        password: "12345678",
      },
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    })

    expect(result.errors).toBeUndefined()

    const { me, token } = result?.data?.RegisterMutation as any

    expect(token).toBeDefined()
    expect(me.firstName).toBe("Victor")
    expect(me.taxId).toBe("526.512.080-78")
  })

  it("should throw an error if the taxId is already registered", async () => {
    const mutation = `
      mutation M($input: RegisterInput!) {
        RegisterMutation(input: $input) {
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
        firstName: "Victor",
        taxId: "526.512.080-78",
        password: "12345678",
      },
    }

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    })

    expect(result.errors?.[0]).toStrictEqual(
      new GraphQLError('"526.512.080-78" já está registrado')
    )
  })
})
