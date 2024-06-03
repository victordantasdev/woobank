import mongoose, { Document, Schema, Types } from "mongoose"

export interface Transaction extends Document {
  id: string
  _id: Types.ObjectId
  operationId: string
  senderTaxId: string
  receiverTaxId: string
  value: number
  status: "pending" | "completed"
  completedAt?: string
}

const TransactionSchema = new Schema({
  operationId: {
    type: String,
    required: true,
    unique: true,
  },
  senderTaxId: {
    type: String,
    required: true,
  },
  receiverTaxId: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  completedAt: {
    type: String,
    default: null,
  },
})

TransactionSchema.index({ operationId: 1, senderTaxId: 1, receiverTaxId: 1 })

export const TransactionModel = mongoose.model<Transaction>(
  "Transaction",
  TransactionSchema
)
