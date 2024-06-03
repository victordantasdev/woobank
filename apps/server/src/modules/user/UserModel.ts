import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcryptjs"

export interface User {
  id: string
  _id: string
  firstName: string
  taxId: string
  password: string
}

export interface UserDocumentInterface extends User, Document {
  id: string
  _id: string
  hashPassword(password: string): Promise<string>
  comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ): Promise<boolean>
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  taxId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must have at least 8 characters"],
    select: false,
  },
})

UserSchema.index({ taxId: 1 })

UserSchema.methods = {
  hashPassword: async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  },

  comparePasswords: async (
    candidatePassword: string,
    hashedPassword: string
  ) => {
    const res = await bcrypt.compare(candidatePassword, hashedPassword)
    return res
  },
}

export const UserModel = mongoose.model<UserDocumentInterface>(
  "User",
  UserSchema
)
