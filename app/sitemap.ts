import type { Plugin } from 'vite'
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path, { resolve } from 'path'
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { writeFileSync } from 'fs'

const tsFiles: string[] = []

/**
 * Vite plugin to generate a sitemap.xml file.
 * @param options
 * @param {string} [options.hostname='localhost:5173'] - The hostname of the website.
 * @param {string[]} [options.exclude=[]] - The list of files to exclude.
 * @param {Record<string, string>} [options.frequency] - The frequency of the pages.
 * @param {Record<string, string>} [options.priority] - The priority of the pages.
 * @param {string} [options.outputFileName='sitemap.xml'] - The name of the output file.
 * @param {string} [options.routesDir='/app/routes'] - The directory where the routes are located.
 * @returns {Plugin}
 * @example
 * ```ts
 * import honoSitemap from 'vite-plugin-hono-sitemap'
 *
 * export default defineConfig({
 *  plugins: [
 *   honoSitemapPlugin({
 *    hostname: 'https://example.com',
 *    exclude: ['/secrets/*', '/user/*'],
 *    frequency: { '/': 'daily', '/about': 'monthly', '/posts/*': 'weekly' },
 *    priority: { '/': '1.0', '/about': '0.8', '/posts/*': '0.5' },
 *   }),
 *  ],
 * })
 * ```
 */
export default function honoSitemapPlugin(
  options: {
    hostname?: string
    exclude?: string[] // example: ['/secrets/*', '/user/*']
    frequency?: Record<string, string> // example: { '/': 'daily', '/about': 'monthly', '/posts/*': 'weekly' }
    priority?: Record<string, string> // example: { '/': '1.0', '/about': '0.8', '/posts/*': '0.5' }
    outputFileName?: string
    routesDir?: string
  } = {},
): Plugin {
  const {
    hostname = 'localhost:5173',
    exclude = [],
    frequency = {},
    priority = {},
    outputFileName = 'sitemap.xml',
    routesDir = '/app/routes',
  } = options

  /**
   * Check if the file path matches the pattern.
   * @param filePath
   * @returns {boolean}
   */
  function isFilePathMatch(filePath: string): boolean {
    const patterns = [
      '.*/app/routes/*/(?!(_|\\$|\\.test|\\.spec)).*\\.(tsx|md|mdx)',
      '.*/app/routes/\\.well-known/(?!(_|\\$|\\.test|.*\\.spec)).*\\.(tsx|md|mdx)',
    ]

    const normalizedPath = path.normalize(filePath).replace(/\\/g, '/')

    // Check if the file is excluded
    if (exclude.some(excludePath => normalizedPath.includes(excludePath))) {
      return false
    }

    for (const pattern of patterns) {
      const regex = new RegExp(`^${pattern}$`)
      if (regex.test(normalizedPath)) {
        return true
      }
    }

    return false
  }

  /**
   * Get the frequency for a given URL.
   * @param url
   * @returns {string}
   */
  function getFrequency(url: string): string {
    for (const [pattern, freq] of Object.entries(frequency)) {
      if (new RegExp(pattern).test(url)) {
        return freq
      }
    }
    return 'weekly' // default frequency
  }

  /**
   * Get the priority for a given URL.
   * @param url
   * @returns {string}
   */
  function getPriority(url: string): string {
    for (const [pattern, prio] of Object.entries(priority)) {
      if (new RegExp(pattern).test(url)) {
        return prio
      }
    }
    return '0.5' // default priority
  }
  /**
   * Process the routes.
   * @param files
   * @param hostname
   * @returns {string[]}
   */
  function processRoutes(files: string[], hostname: string): string[] {
    return files.map(file => {
      const route = file.substring(file.indexOf(routesDir) + routesDir.length)
      const withoutExtension = route.replace(/\.(tsx|mdx)$/, '')
      if (withoutExtension === '/index') {
        return hostname
      }

      return `${hostname}${withoutExtension}`
    })
  }

  return {
    name: 'vite-plugin-hono-sitemap',
    apply: 'build',
    transform(_code: string, id: string) {
      if (isFilePathMatch(id)) {
        tsFiles.push(id)
      }
      return null
    },

    buildEnd() {
      const routes = processRoutes(tsFiles, hostname)

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    page => `
  <url>
    <loc>${page}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${getFrequency(page)}</changefreq>
    <priority>${getPriority(page)}</priority>
  </url>
`,
  )
  .join('')}
</urlset>`
      writeFileSync(resolve(process.cwd(), 'dist', outputFileName), sitemap)
    },
  }
}
