import { graphql } from "graphql"

import { User } from "../UserModel"
import { schema } from "@/schema"
import { genCPF } from "@/utils/genCPF"

export const createUser = async (args?: Partial<User>) => {
  const mutation = `
    mutation M($input: RegisterInput!) {
      RegisterMutation(input: $input) {
        me {
          _id
          firstName
          taxId
          password
        }
      }
    }
  `

  const variableValues = {
    input: {
      firstName: "User test",
      taxId: genCPF(),
      password: "12345678",
    },
  }

  const result = await graphql({
    schema,
    source: mutation,
    variableValues,
  })

  const user = result?.data?.RegisterMutation as any

  return {
    _id: user?.me?._id,
    firstName: user?.me?.firstName,
    taxId: user?.me?.taxId,
    passwordHash: user?.me?.password,
    password: variableValues.input.password,
  }
}
