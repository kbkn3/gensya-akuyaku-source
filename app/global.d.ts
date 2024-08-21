import {} from 'hono'
import type { Meta } from './routes/types';

type Head = {
  title?: string
  frontmatter?: Meta;
  entryName?: string;
}

declare module 'hono' {
  interface Env {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    Variables: {}
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    Bindings: {}
  }
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: <explanation>
    (
      content: string | Promise<string>,
      head?: Head,
    ): Response | Promise<Response>
  }
}
