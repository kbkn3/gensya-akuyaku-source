const SiteTitle = '現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変 資料集'

const menuItems = [
  { title: 'Home', href: '/' },
  { title: '年表', href: '/timeline' },
  { title: 'ランダム表示', href: '/random' },
  { title: 'About', href: '/' },
  { title: 'Contact', href: '/' },
]
const footerMenuItems = [
  {
    h3: 'WikipediaStyle',
    items: ['About WikipediaStyle', 'Contact us', 'Donate'],
  },
  { h3: 'Community', items: ['Community portal', 'Forum', 'Help center'] },
  { h3: 'Contribute', items: ['Edit pages', 'Create account', 'Upload file'] },
  {
    h3: 'Tools',
    items: ['What links here', 'Special pages', 'Page information'],
  },
  { h3: 'Languages', items: ['English', '日本語', 'Español'] },
]

export default function BaseLayout({
  children,
  title = '資料集',
  top = false,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  children: any
  title?: string
  top?: boolean
}) {
  return (
    <div className='min-h-screen bg-gray-100'>
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
                <a href='/'>{SiteTitle}</a>
              </h1>
            ) : (
              <div className='text-xl font-bold'>
                <a href='/'>{SiteTitle}</a>
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
        </nav>

        {/* Content */}
        <main className='w-full md:w-3/4 lg:w-4/5 md:pl-8'>
          <article className='bg-white shadow rounded p-6 prose prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-2 prose-p:mb-4'>
            {/* top ページの場合は div 、 top ページ以外は h1 で扱う */}
            {top ? (
              <div className='text-3xl font-bold mb-4'>{title}</div>
            ) : (
              <h1>{title}</h1>
            )}
            {children}
          </article>
        </main>
      </div>

      {/* Footer */}
      <footer className='bg-gray-200 mt-8 py-8'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
            {footerMenuItems.map(item => (
              <div key={item.h3}>
                <h3 className='font-semibold text-lg mb-3'>{item.h3}</h3>
                <ul className='space-y-2'>
                  {item.items.map(subItem => (
                    <li key={subItem}>
                      <a href='/' className='text-blue-600 hover:underline'>
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
              <a href='/' className='text-blue-600 hover:underline'>
                Privacy policy
              </a>{' '}
              &bull;{' '}
              <a href='/' className='text-blue-600 hover:underline'>
                Terms of use
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
