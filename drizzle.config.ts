import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
import { parseEnv } from 'utils/common'

dotenv.config({ path: '.dev.vars' })
const { PG_CONNECTION_STRING } = parseEnv(process.env)

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: PG_CONNECTION_STRING,
  },
} satisfies Config
