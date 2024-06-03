import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql"

import { Account } from "./AccountModel"

const EntryTypeEnum = new GraphQLEnumType({
  name: "EntryType",
  values: {
    revenue: { value: "revenue" },
    expense: { value: "expense" },
  },
})

const LedgerEntryType = new GraphQLObjectType({
  name: "LedgerEntry",
  fields: {
    value: { type: GraphQLInt },
    date: { type: GraphQLString },
    type: { type: EntryTypeEnum },
  },
})

const LedgerType = new GraphQLList(LedgerEntryType)

export const AccountType = new GraphQLObjectType<Account>({
  name: "Account",
  description: "Represents a user account",
  fields: () => ({
    _id: { type: GraphQLString, resolve: (user) => user._id.toString() },
    userId: { type: GraphQLString, resolve: (user) => user.userId.toString() },
    accountNumber: {
      type: GraphQLString,
      resolve: (user) => user.accountNumber,
    },
    balance: { type: GraphQLInt, resolve: (user) => user.balance },
    ledger: { type: LedgerType, resolve: (user) => user.ledger },
  }),
})
