import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql"
import { UserModel } from "../UserModel"
import { UserType } from "../UserType"

export const FindUserByTaxId: GraphQLFieldConfig<any, any, any> = {
  description: "Find an user by taxId",
  type: UserType,
  args: {
    taxId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, args, context) => {
    if (!context?.user || args?.taxId !== context?.user?.taxId) {
      throw new Error("Não autorizado!")
    }

    const user = await UserModel.findOne({ taxId: args.taxId })
    return user
  },
}
