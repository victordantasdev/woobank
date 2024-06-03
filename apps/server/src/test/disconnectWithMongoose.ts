import mongoose from "mongoose"

const deleteProperties = <T>(obj: T): void => {
  const objNames = Object.keys(obj as Record<string, unknown>)
  objNames.forEach((itemName) => {
    delete obj[itemName as keyof T]
  })
}

export const disconnectWithMongoose = async (): Promise<void> => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()

  mongoose.connections.forEach((connection) => {
    deleteProperties(connection.models)
    deleteProperties(connection.collections)
  })
}
