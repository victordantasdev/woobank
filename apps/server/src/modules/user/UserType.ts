import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"

import { User } from "./UserModel"

export const UserType = new GraphQLObjectType<User>({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString, resolve: (user) => user._id.toString() },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.firstName,
    },
    taxId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.taxId,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.password,
    },
  }),
})
