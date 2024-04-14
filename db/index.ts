import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import * as schema from './schema'

export const dbConnection = async (
  connectionString: string,
  fn: (db: NodePgDatabase<typeof schema>, client: Client) => Promise<Response> | Promise<void>,
) => {
  if (!connectionString) {
    throw new Error('connectionString is not blank')
  }
  const client = new Client({
    connectionString,
  })
  const database = drizzle(client, { schema })
  await client.connect()
  return await fn(database, client)
}
