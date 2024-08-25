import pages from '@hono/vite-cloudflare-pages'
import mdx from '@mdx-js/rollup'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import client from 'honox/vite/client'
import { ssrSitemap } from './app/sitemap'

export default defineConfig(({ mode }) => {
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
      ssrSitemap({
        host: "https://localhost", // no trailing slash
        // i18n: {
        //   locales,
        //   localeDefault,
        // },
        // exclude: env.VITE_APP_SITEMAP_EXCLUDES.split(",").map((page) =>
        //   page.trim(),
        // ),
      }),
    ],
  }
})
