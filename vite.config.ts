import pages from '@hono/vite-cloudflare-pages'
import mdx from '@mdx-js/rollup'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig, loadEnv } from 'vite'
import client from 'honox/vite/client'
import sitemap from 'honox/vite/sitemap'

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  if (mode === 'client') {
    return {
      plugins: [client()],
      build: {
        rollupOptions: {
          input: ['/app/style.css'],
        },
      },
    }
  }
  return {
    plugins: [
      honox({
        devServer: { adapter },
        client: {
          input: ['/app/style.css'],
        },
      }),
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
      pages(),
      sitemap({
        hostname: process.env.IS_PROD
          ? 'https://gensya-akuyaku-source.pages.dev/'
          : process.env.CF_PAGES_URL,
        exclude: ['/random'],
        priority: { '/': '1.0', '/timeline': '0.8', '/posts/*': '0.6' },
        frequency: {
          '/': 'daily',
          '/timeline': 'monthly',
          '/posts/*': 'weekly',
        },
      }),
    ],
  }
})
