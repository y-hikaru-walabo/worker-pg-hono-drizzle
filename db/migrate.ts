import { dbConnection } from 'db'
import * as dotenv from 'dotenv'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { parseEnv } from 'utils/common'
dotenv.config({ path: '.dev.vars' })
const { PG_CONNECTION_STRING } = parseEnv(process.env)
;(async () => {
  await dbConnection(PG_CONNECTION_STRING, async (db, client) => {
    console.info('migration start')
    await migrate(db, { migrationsFolder: './drizzle' })
    await client.end()
    console.info('migrated')
    process.exit(0)
  })
})()
