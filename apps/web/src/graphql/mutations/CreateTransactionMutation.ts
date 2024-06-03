import { graphql } from "react-relay"

export const CreateTransaction = graphql`
  mutation CreateTransactionMutation($input: CreateTransactionInput!) {
    CreateTransactionMutation(input: $input) {
      operationId
    }
  }
`
