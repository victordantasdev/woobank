import { writeFile } from "fs"

export function setEnv() {
  const MONGO_URL = "mongodb://localhost:27017/woobank"
  const MONGO_URL_TEST = "mongodb://localhost:27017/woobank"

  writeFile("./.env", `MONGO_URL=${MONGO_URL}`, () => {
    console.log(".env created successfully!")
  })

  writeFile("./.env.test", `MONGO_URL=${MONGO_URL_TEST}`, () => {
    console.log(".env.test created successfully!")
  })
}

setEnv()
