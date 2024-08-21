import { Style } from 'hono/css'
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import { siteName } from '../constants'
import BaseLayout, { menuItems } from '../components/layout'

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
export default jsxRenderer(({ children, title, entryName, frontmatter }) => {
  const c = useRequestContext()
  const currentPath = c.req.routePath

  const pageTitle = frontmatter?.title
    ? `${frontmatter.title} | ${siteName}`
    : menuItems.filter(item => item.href.includes(currentPath))[0]?.title ?
      `${menuItems.filter(item => item.href.includes(currentPath))[0]?.title} | ${siteName}` : siteName
  
  const headerTitle =
    frontmatter?.title ??
    menuItems.filter(item => item.href.includes(currentPath))[0]?.title ??
    siteName
  
  const description =
    frontmatter?.description ??
    '「現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変」のファンメイド資料サイトです'
  
  const isTop = currentPath === '/'

    return (
    <html lang='ja'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta http-equiv='content-language' content='ja' />
        {/* OGP */}

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@kbkn3' />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={description} />

        <title>{pageTitle}</title>
        <link rel='icon' href='/favicon.ico' />
        <Link href='/app/style.css' rel='stylesheet' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block'
        />
        <Script src='/app/client.ts' async />
        <Style />
      </head>
      <body>
        <BaseLayout title={headerTitle} top={isTop}>{children}</BaseLayout>
      </body>
    </html>
  )
})
