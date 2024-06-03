import { graphql } from "relay-runtime"

export const FindAllTransactionsBySenderTaxId = graphql`
  query FindAllTransactionsBySenderTaxIdQuery($senderTaxId: String!) {
    FindAllTransactionsBySenderTaxId(senderTaxId: $senderTaxId) {
      senderTaxId
      receiverTaxId
      value
      status
      completedAt
    }
  }
`
