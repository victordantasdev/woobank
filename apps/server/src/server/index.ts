import cors from "kcors"
import Koa, { Request } from "koa"
import bodyParser from "koa-bodyparser"
import { graphqlHTTP, OptionsData } from "koa-graphql"
import logger from "koa-logger"
import Router from "koa-router"

import { schema } from "@/schema"
import { getUser } from "@/modules/user/userAuth"

const app = new Koa()

app.use(cors({ origin: "*" }))
app.use(logger())
app.use(
  bodyParser({
    onerror(err, ctx) {
      ctx.throw(err, 422)
    },
  })
)

const routes = new Router()

const graphQlSettingsPerReq = async (req: Request): Promise<OptionsData> => {
  const { user } = await getUser(req.header.authorization)

  return {
    graphiql: {
      headerEditorEnabled: true,
      shouldPersistHeaders: true,
    },
    schema,
    pretty: true,
    context: { user },
    customFormatErrorFn: ({ message, locations, stack }) => {
      console.log(message)
      console.log(locations)
      console.log(stack)

      return {
        message,
        locations,
        stack,
      }
    },
  }
}

const graphQlServer = graphqlHTTP(graphQlSettingsPerReq)
routes.all("/graphql", graphQlServer)

app.use(routes.routes())
app.use(routes.allowedMethods())

export { app }
