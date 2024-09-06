import { Hono } from 'hono'
import app from '../server'
import sitemap from '../lib/sitemap'

const route = new Hono()

route.get('/', c => {
  const { data , status, headers } = sitemap({
    app,
    hostname: import.meta.env.IS_PROD ? 'https://gensya-akuyaku-source.pages.dev/' :import.meta.env.CF_PAGES_URL,
    exclude: ['/random'],
    priority: {'/': '1.0', '/timeline': '0.8', '/posts/*': '0.6'},
    frequency: {'/': 'daily', '/timeline': 'monthly', '/posts/*': 'weekly'},
  })
  return c.body(
    data,
    status,
    headers
  )
})

export default route
