import { graphql } from "relay-runtime"

export const FindAccountByUserId = graphql`
  query FindAccountByUserIdQuery($userId: String!) {
    FindAccountByUserId(userId: $userId) {
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
