import { Style } from 'hono/css'
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import { SITE_TITLE } from '../constants'
import BaseLayout, { menuItems } from '../components/layout'

export default jsxRenderer(({ children, frontmatter }) => {
  const c = useRequestContext()
  const currentPath = c.req.routePath

  const pageTitle = frontmatter?.title
    ? `${frontmatter.title} | ${SITE_TITLE}`
    : menuItems.filter(item => item.href.includes(currentPath))[0]?.title
      ? `${menuItems.filter(item => item.href.includes(currentPath))[0]?.title} | ${SITE_TITLE}`
      : SITE_TITLE

  const headerTitle =
    frontmatter?.title ??
    menuItems.filter(item => item.href.includes(currentPath))[0]?.title ??
    SITE_TITLE

  const description =
    frontmatter?.description ??
    '「現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変」のファンメイド資料サイトです'

  const isTop = currentPath === '/'

  const ogImagePath = `https://ogp-image-creator.ken0421wabu.workers.dev/gensya?title=${encodeURIComponent(
    frontmatter?.title
      ? `${frontmatter.title}`
      : menuItems.filter(item => item.href.includes(currentPath))[0]?.title,
  )}${frontmatter?.subTitle ? `&subTitle=${encodeURIComponent(frontmatter.subTitle)}` : ''}&siteTitle=${encodeURIComponent(
    SITE_TITLE,
  )}`

  return (
    <html lang='ja'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta http-equiv='content-language' content='ja' />
        {/* OGP */}
        <meta property='og:site_name' content={SITE_TITLE} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={ogImagePath} />
        <meta property='og:locale' content='ja_JP' />
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
        <BaseLayout title={headerTitle} top={isTop}>
          {children}
        </BaseLayout>
      </body>
    </html>
  )
})
