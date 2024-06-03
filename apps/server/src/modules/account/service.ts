import { getAccountBalance } from "@/utils/getAccountBalance"
import { AccountModel } from "./AccountModel"

export async function findAccountByUserIdService(userId: string) {
  const account = await AccountModel.findOne({ userId })

  if (!account) throw new Error("Conta não encontrada!")

  const accountWithBalance = Object.assign(account, {
    balance: getAccountBalance(account.ledger),
  })

  return accountWithBalance
}
