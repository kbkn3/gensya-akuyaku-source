import BaseLayout from '../components/layout'
import type { Meta } from './types'

export default function Top() {
  const posts = import.meta.glob<{ frontmatter: Meta }>('./posts/*.mdx', {
    eager: true,
  })
  return (
    <BaseLayout top>
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
                <a href={`${id.replace(/\.mdx$/, '')}`}>
                  {module.frontmatter.title}
                </a>
              </li>
            )
          }
        })}
      </ul>
    </BaseLayout>
  )
}
