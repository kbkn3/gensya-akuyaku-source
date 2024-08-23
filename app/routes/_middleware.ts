import { createRoute } from 'honox/factory'
import { secureHeaders, NONCE } from 'hono/secure-headers'
import { logger } from 'hono/logger'

export default createRoute(
  logger(),
  secureHeaders(
    //   {
    //   strictTransportSecurity:
    //     'max-age=63072000; includeSubDomains; preload',
    //   contentSecurityPolicy: import.meta.env.PROD
    //     ? {
    //         scriptSrc: [NONCE],
    //         defaultSrc: ["'self'"],
    //       }
    //     : undefined,
    // }
  ),
  async c => {
    return c.res.headers.append('Permissions-Policy', '')
  },
)
