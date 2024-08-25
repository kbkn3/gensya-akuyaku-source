import { createRoute } from 'honox/factory'
import { secureHeaders } from 'hono/secure-headers'
import { logger } from 'hono/logger'

export default createRoute(logger(), secureHeaders())
