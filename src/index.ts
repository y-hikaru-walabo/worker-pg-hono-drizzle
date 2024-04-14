import { dbConnection } from 'db'
import { Hono } from 'hono'

type Bindings = {
  // biome-ignore lint: This property name should be in camelCase
  PG_CONNECTION_STRING: string
}

const app = new Hono<{
  // biome-ignore lint: This property name should be in camelCase
  Bindings: Bindings
}>()
app.get('/', async (c) => {
  return await dbConnection(c.env.PG_CONNECTION_STRING, async (db, client) => {
    const result = await db.query.countries.findMany()
    c.executionCtx.waitUntil(client.end())
    return c.json(result)
  })
})

export default app
