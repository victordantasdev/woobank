import { v4 as uuid } from "uuid"
import mongoose from "mongoose"

import { TransactionModel } from "./TransactionModel"
import { UserModel } from "../user/UserModel"
import { AccountModel } from "../account/AccountModel"
import { convertValueToCents } from "@/utils/convertValueToCents"

type TransactionInput = {
  senderTaxId: string
  receiverTaxId: string
  value: number
}

export async function createTransaction({
  senderTaxId,
  receiverTaxId,
  value: rawValue,
}: TransactionInput) {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const value = convertValueToCents(rawValue)
    const sender = await UserModel.find({ taxId: senderTaxId })
    if (!sender?.length) {
      throw new Error("Usuário pagador não encontrado")
    }

    const receiver = await UserModel.find({ taxId: receiverTaxId })
    if (!receiver?.length) {
      throw new Error("Conta não encontrada")
    }

    const operationId = uuid()
    const existingTransaction = await TransactionModel.findOne({
      operationId,
    }).session(session)

    if (existingTransaction) {
      if (existingTransaction.status === "completed") {
        await session.commitTransaction()
        session.endSession()
        return existingTransaction
      } else {
        throw new Error("Operação pendente")
      }
    }

    const transaction = new TransactionModel({
      operationId,
      senderTaxId,
      receiverTaxId,
      value,
      status: "pending",
    })

    await AccountModel.updateOne(
      { taxId: senderTaxId },
      {
        $push: {
          ledger: {
            value,
            date: new Date().toISOString(),
            type: "expense",
          },
        },
      },
      { session }
    )

    await AccountModel.updateOne(
      { taxId: receiverTaxId },
      {
        $push: {
          ledger: {
            value,
            date: new Date().toISOString(),
            type: "revenue",
          },
        },
      },
      { session }
    )

    await transaction.save({ session })

    transaction.status = "completed"
    transaction.completedAt = new Date().toISOString()
    await transaction.save({ session })
    await session.commitTransaction()

    return operationId
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}
