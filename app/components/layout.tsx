const SiteTitle = '現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変 資料集'

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
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <header className='bg-white shadow'>
        <div className='container mx-auto px-4 py-6 flex justify-between items-center'>
          <div className='md:hidden relative mr-4 material-symbols-outlined'>&#xe5d2;</div>
          {/* top ページの場合は h1 、 top ページ以外は div で扱う */}
          {top ? (
            <h1 className='text-2xl font-bold'>{SiteTitle}</h1>
          ) : (
            <div className='text-2xl font-bold'>{SiteTitle}</div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row flex-grow'>
        {/* Sidebar */}
        <nav className='hidden md:block w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0'>
          <div className='bg-white shadow rounded p-4'>
            <h2 className='text-xl font-semibold mb-4'>メインメニュー</h2>
            <ul className='space-y-2'>
              <li>
                <a href='/' className='text-blue-600 hover:underline'>
                  Home
                </a>
              </li>
              <li>
                <a href='/' className='text-blue-600 hover:underline'>
                  Random Article
                </a>
              </li>
              <li>
                <a href='/' className='text-blue-600 hover:underline'>
                  About
                </a>
              </li>
              <li>
                <a href='/' className='text-blue-600 hover:underline'>
                  Contact
                </a>
              </li>
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
            <div>
              <h3 className='font-semibold text-lg mb-3'>WikipediaStyle</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    About WikipediaStyle
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Contact us
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Donate
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-3'>Community</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Community portal
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Forum
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Help center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-3'>Contribute</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Edit pages
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Create account
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Upload file
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-3'>Tools</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    What links here
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Special pages
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Page information
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-3'>Languages</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    English
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    日本語
                  </a>
                </li>
                <li>
                  <a href='/' className='text-blue-600 hover:underline'>
                    Español
                  </a>
                </li>
              </ul>
            </div>
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
