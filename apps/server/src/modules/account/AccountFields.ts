import { Account } from "./AccountModel"
import { AccountType } from "./AccountType"

export function getAccountField(key: keyof Account) {
  return {
    [key]: {
      type: AccountType,
      resolve: async (obj: Account, _: any) => {
        return obj[key]
      },
    },
  }
}
