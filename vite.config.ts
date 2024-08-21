import pages from '@hono/vite-cloudflare-pages'
import mdx from '@mdx-js/rollup'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import client from 'honox/vite/client'

export default defineConfig(({ mode }) => {
  const common = {
    ssr: {
      external: ['satori', '@resvg/resvg-js'],
    },
  }
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
    ssr: common.ssr,
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
    ],
  }
})
