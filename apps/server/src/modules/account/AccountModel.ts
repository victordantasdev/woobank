import mongoose, { Document, Schema, Types } from "mongoose"

import type { Ledger } from "@/types"

export interface Account extends Document {
  _id: Types.ObjectId
  id: string
  userId: Types.ObjectId
  taxId: string
  accountNumber: string
  balance: number
  ledger: Ledger
}

const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  taxId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  ledger: {
    type: Array,
    default: [],
  },
  balance: {
    type: Number,
    default: 0,
  },
})

AccountSchema.index({ accountNumber: 1, userId: 1, taxId: 1 }, { unique: true })

export const AccountModel = mongoose.model<Account>("Account", AccountSchema)
