import http from "http"
import dotenv from "dotenv"

import { app } from "./src/server"
import { connectToDatabase } from "./src/server/database"

async function main() {
  dotenv.config({ path: ".env" })
  const port = process.env.PORT || 4000

  await connectToDatabase()
  const server = http.createServer(app.callback())
  server.listen(port, () => {
    console.log(`Server running on port:${port}`)
  })
}

main()
