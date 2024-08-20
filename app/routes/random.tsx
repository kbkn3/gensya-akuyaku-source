import { Hono } from 'hono'
import type { Meta } from './types'

const randomRoute = new Hono()

randomRoute.get('/', c => {
  // mdxページを収集する
  const posts = import.meta.glob<{ frontmatter: Meta }>('./posts/*.mdx', {
    eager: true,
  })
  const postsLinks = Object.entries(posts).map(([id, _module]) => {
    return `${id.replace(/\.mdx$/, '')}`
  })
  // 固定ページ
  const pageLinks = ['/contact', '/timeline', '/sitemap', '/privacy-policy', '/terms-of-use']

  const links = [...postsLinks, ...pageLinks]

  // ランダムに選択する
  const randomIndex = Math.floor(Math.random() * links.length)
  return c.redirect(links[randomIndex])
})

export default randomRoute
