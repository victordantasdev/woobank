import { UserModel } from "./UserModel"

export async function findUserByTaxId({ taxId }: { taxId: string }) {
  return await UserModel.findOne({ taxId })
}

export async function findUserLoginData({ taxId }: { taxId: string }) {
  return await UserModel.findOne({ taxId }).select("+password")
}
