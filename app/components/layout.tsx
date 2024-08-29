import { useRequestContext } from 'hono/jsx-renderer'
import { SITE_TITLE } from '../constants'
import Header1 from './header1'
import { Kiriban } from './kiriban'
import { kiribanUpdate } from '../lib/kiribanUpdate'

export const menuItems = [
  { title: 'Home', href: '/' },
  { title: '年表', href: '/timeline' },
  { title: 'ランダム表示', href: '/random' },
  { title: 'Contact', href: '/contact' },
]
const footerMenuItems = [
  {
    h3: '原作情報',
    items: [
      '小説家になろう',
      '書籍（オーバーラップ）',
      'コミカライズ（コミックガルド＋）',
    ],
    href: [
      'https://ncode.syosetu.com/n3297eu/',
      'https://over-lap.co.jp/narou/865547429/',
      'https://comic-gardo.com/episode/316190247005433227',
    ],
  },
  {
    h3: '原作者',
    items: ['Twitter', 'Lit Link', '小説家になろう'],
    href: [
      'https://twitter.com/hokubukyuushuu',
      'https://lit.link/hokubukyuushuu',
      'https://mypage.syosetu.com/238604/',
    ],
  },
]

export default async function BaseLayout({
  children,
  title = '資料集',
  top = false,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  children: any
  title?: string
  top?: boolean
}) {
  const c = useRequestContext()
  const currentNumberOfVisitors = await kiribanUpdate(c)
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <header className='bg-white shadow flex flex-col'>
        <div className='navbar bg-base-100 justify-center items-center mx-auto'>
          <details className='flex-none md:hidden dropdown'>
            <summary className='btn btn-square btn-ghost'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-5 w-5 stroke-current'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </summary>
            <ul className='dropdown-content menu bg-base-100 rounded-box z-[30] w-52 p-2 shadow'>
              {menuItems.map(item => (
                <li key={item.title}>
                  <a href={item.href}>{item.title}</a>
                </li>
              ))}
            </ul>
          </details>
          <div>
            {/* top ページの場合は h1 、 top ページ以外は div で扱う */}
            {top ? (
              <h1 className='text-xl font-bold'>
                <a href='/'>{SITE_TITLE}</a>
              </h1>
            ) : (
              <div className='text-xl font-bold'>
                <a href='/'>{SITE_TITLE}</a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row flex-grow'>
        {/* Sidebar */}
        <nav className='hidden md:block w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0'>
          <div className='bg-white shadow rounded p-4'>
            <h2 className='text-xl font-semibold mb-4'>メインメニュー</h2>
            <ul className='space-y-2'>
              {menuItems.map(item => (
                <li key={item.title}>
                  <a href={item.href} className='text-blue-600 hover:underline'>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='my-4 bg-white shadow rounded mb-4 p-4'>
            <h2 className='text-lg font-semibold mb-4'>キリ番カウンター</h2>
            <Kiriban count={currentNumberOfVisitors} />
            <h2 className='text-lg font-semibold my-4'>本サイトの管理人</h2>
            <p>管理人：runakeikain</p>
          </div>
        </nav>

        {/* Content */}
        <main className='w-full md:w-3/4 lg:w-4/5 md:pl-8 flex-grow'>
          <article className='bg-white shadow rounded p-6 prose !max-w-none prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-2 prose-p:mb-4'>
            <Header1 title={title} top={top} />
            {children}
          </article>
        </main>
        <div className='bg-white shadow rounded mb-4 p-6 prose mt-12 md:hidden'>
          <h2 className='text-lg font-semibold mb-4'>キリ番カウンター</h2>
          <Kiriban count={currentNumberOfVisitors} />
          <h2 className='text-lg font-semibold my-4'>本サイトの管理人</h2>
          <p>管理人：runakeikain</p>
        </div>
      </div>
      {/* Footer */}
      <footer className='bg-gray-200 mt-8 py-8'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
            {footerMenuItems.map(item => (
              <div key={item.h3}>
                <h3 className='font-semibold text-lg mb-3'>{item.h3}</h3>
                <ul className='space-y-2'>
                  {item.items.map((subItem, index) => (
                    <li key={subItem}>
                      <a
                        href={item.href[index]}
                        className='text-blue-600 hover:underline'
                      >
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className='mt-8 text-center text-gray-600'>
            <p>&copy; 2024 WikipediaStyle. All rights reserved.</p>
            <p className='mt-2'>
              <a
                href='/privacy-policy'
                className='text-blue-600 hover:underline'
              >
                Privacy policy
              </a>{' '}
              &bull;{' '}
              <a href='/terms-of-use' className='text-blue-600 hover:underline'>
                Terms of use
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
