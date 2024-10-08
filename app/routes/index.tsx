import type { Meta } from './types'

export default function Top() {
  const posts = import.meta.glob<{ frontmatter: Meta }>('./posts/*.mdx', {
    eager: true,
  })
  return (
    <>
      <h2>趣旨</h2>
      <p>
        このサイトは、「現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変」のファンサイトです。
      </p>
      <p>
        著者が欄外に種本・資料を記載してくれているのも魅力的なコンテンツですが、いざ探そうと思うとひと手間かかることが多いため、集約することにしました。
      </p>
      <p>
        また、サイト運営者が著者の好みに沿いそうなコンテンツを付け加えています。
      </p>
      <p>
        サイト運営のため、Amazon、楽天などのアフィリエイトリンクが含まれております。
      </p>
      <ul>
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <li>
                <a
                  href={`${id.replace(/\.mdx$/, '')}`}
                  className={
                    module.frontmatter.subTitle?.includes('建設中')
                      ? 'line-through text-slate-400'
                      : ''
                  }
                >
                  {module.frontmatter.title}
                  {module.frontmatter.subTitle
                    ? `: ${module.frontmatter.subTitle}`
                    : ''}
                </a>
              </li>
            )
          }
        })}
      </ul>
    </>
  )
}
