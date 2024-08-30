import {} from 'hono'
import type { Meta } from './routes/types'
import type { DrizzleD1Database } from 'drizzle-orm/d1'


type Head = {
  title?: string
  frontmatter?: Meta
  entryName?: string
}

declare module 'hono' {
  interface Env {
    Variables: {
      db: DrizzleD1Database
    }
    Bindings: {
      DB: D1Database
    }
  }
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: <explanation>
    (
      content: string | Promise<string>,
      head?: Head,
    ): Response | Promise<Response>
  }
}
