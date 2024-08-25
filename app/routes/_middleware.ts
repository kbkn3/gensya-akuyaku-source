import { createRoute } from 'honox/factory'
import { NONCE, secureHeaders } from 'hono/secure-headers'
import { logger } from 'hono/logger'

export default createRoute(
  logger(),
  secureHeaders({
    strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
    contentSecurityPolicy: import.meta.env.PROD
      ? {
          scriptSrc: [NONCE],
          defaultSrc: ["'self'"],
        }
      : undefined,
  }),
  async (c, next) => {
    await next()
    return c.res.headers.append(
      'Permissions-Policy',
      'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()',
    )
  },
)
