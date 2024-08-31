import { createRoute } from 'honox/factory'
import { NONCE, secureHeaders } from 'hono/secure-headers'
import { logger } from 'hono/logger'

export default createRoute(
  logger(),
  secureHeaders({
    strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
    contentSecurityPolicy: import.meta.env.PROD
      ? {
          defaultSrc: ["'self'", '*.gensya-akuyaku-source.pages.dev'],
          scriptSrc: [NONCE, '*.gensya-akuyaku-source.pages.dev'],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://fonts.googleapis.com',
          ],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
        }
      : undefined,
  }),
  async (c, next) => {
    c.res.headers.append(
      'Permissions-Policy',
      'accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), xr-spatial-tracking=()',
    )
    await next()
  },
)
