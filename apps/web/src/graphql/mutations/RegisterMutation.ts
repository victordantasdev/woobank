import { graphql } from "react-relay"

export const Register = graphql`
  mutation RegisterMutation($input: RegisterInput!) {
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
