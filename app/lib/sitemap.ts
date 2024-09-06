import type { Hono } from 'hono'
import { inspectRoutes } from 'hono/dev'
import type { StatusCode } from 'hono/utils/http-status'

interface RouteData {
  path: string
  method: string
  name: string
  isMiddleware: boolean
}
export interface SitemapOptions {
  app: Hono<any, any, string> 
  hostname?: string
  exclude?: string[]
  frequency?: Record<string, Frequency>
  priority?: Record<string, string>
}
interface SitemapResponse {
  data: string
  status: StatusCode
  headers: Record<string, string>
}
type Frequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

const sitemap = (options: SitemapOptions): SitemapResponse => {
  const routesData: RouteData[] = inspectRoutes(options.app)
  validateOptions(options)
  const {
    hostname = 'localhost:5173',
    exclude = [],
    frequency = {},
    priority = {},
  } = options

  exclude.push('/sitemap.xml')

  const filteredRoutes = sortRoutesByDepth(routesData).filter(
    route =>
      !exclude.includes(route.path) &&
      route.method === 'GET' &&
      !route.isMiddleware &&
      route.path !== '/*',
  )

  // relative path to absolute path
  const filteredRoutesWithHostname = filteredRoutes.map(route => ({
    ...route,
    url: route.path === '/' ? hostname : `${hostname}${route.path}`,
  }))

  const lastMod = new Date().toISOString().split('T')[0]
  const getChangeFreq = (path: string) => frequency[path] || 'weekly'
  const getPriority = (path: string) => priority[path] || '0.5'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${filteredRoutesWithHostname
    .map(
      page => `
    <url>
      <loc>${page.url}/</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>${getChangeFreq(page.path)}</changefreq>
      <priority>${getPriority(page.path)}</priority>
    </url>
  `,
    )
    .join('')}
  </urlset>`

  return {
    data: sitemap,
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  }
}

const validateOptions = (options: SitemapOptions) => {
  if (options.priority) {
    for (const [key, value] of Object.entries(options.priority)) {
      const priority = Number.parseFloat(value)
      if (Number.isNaN(priority) || priority < 0 || priority > 1) {
        throw new Error(
          `Invalid priority value for ${key}: ${value}. Must be between 0.0 and 1.0`,
        )
      }
    }
  }

  if (options.frequency) {
    const validFrequencies: Frequency[] = [
      'always',
      'hourly',
      'daily',
      'weekly',
      'monthly',
      'yearly',
      'never',
    ]
    for (const [key, value] of Object.entries(options.frequency)) {
      if (!validFrequencies.includes(value)) {
        throw new Error(`Invalid frequency value for ${key}: ${value}`)
      }
    }
  }
}
const sortRoutesByDepth = (routes: RouteData[]) => {
  return routes.sort((a, b) => {
    const aDepth = a.path === '/' ? 0 : a.path.split('/').length
    const bDepth = b.path === '/' ? 0 : b.path.split('/').length
    return aDepth - bDepth
  })
}
export default sitemap
