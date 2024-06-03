import { graphql } from "react-relay"

export const Login = graphql`
  mutation LoginMutation($input: LoginInput!) {
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
