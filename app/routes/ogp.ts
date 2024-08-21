import { Hono } from 'hono'
import { getOgImage } from '../functions/getOgImage'

const app = new Hono()

app.get('/', async c => {
  const { title, subTitle } = c.req.query()
  if (!title) {
    c.status(404)
    return c.text('title and subTitle are required')
  }

  const body = await getOgImage(title, subTitle)
  return c.newResponse(body, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
})

export default app
