import mongoose, { ConnectOptions } from "mongoose"
import dotenv from "dotenv"
import path from "path"

const mongooseOptions: ConnectOptions = {
  autoIndex: false,
  connectTimeoutMS: 10000,
  dbName: "woobank-test",
}

export const connectWithMongoose = async (): Promise<typeof mongoose> => {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.test") })

  const MONGO_URL = process.env.MONGO_URL!

  jest.setTimeout(20000)
  return mongoose.connect(MONGO_URL, mongooseOptions)
}
