import * as z from 'zod'

export const parseEnv = (env: NodeJS.ProcessEnv) => {
  return z
    .object({
      // biome-ignore lint: This property name should be in camelCase
      PG_CONNECTION_STRING: z.string(),
    })
    .parse(env)
}
