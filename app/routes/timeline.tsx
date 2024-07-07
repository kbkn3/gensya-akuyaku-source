import BaseLayout from '../components/layout'

interface TimelineData {
  year: number
  fiction: { event: string; book: string; link?: string; }[]
  reality: { event: string; book?: string; link?: string; }[]
}
export default function TimelineComparison() {
  const data: TimelineData[] = [
    {
      year: 1939,
      fiction: [
        {
          event: 'ドイツがポーランドに侵攻',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
      ],
      reality: [
        {
          event: 'ドイツがポーランドに侵攻',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
        {
          event: '第二次世界大戦勃発',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
      ],
    },
    {
      year: 1940,
      fiction: [
        {
          event: 'イギリスが降伏',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
      ],
      reality: [
        {
          event: 'ダンケルクの戦い',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
        {
          event: 'バトル・オブ・ブリテン',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
      ],
    },
    {
      year: 1941,
      fiction: [
        {
          event: 'ソ連がドイツに降伏',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
      ],
      reality: [
        {
          event: '独ソ不可侵条約',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
        {
          event: 'バルバロッサ作戦',
          book: '『マン・イン・ザ・ハイ・キャッスル』',
          link: '/',
        },
      ],
    },
  ]

  return (
    <BaseLayout title='仮想戦記と史実の比較タイムライン'>
      <div className='container mx-auto font-sans text-neutral'>
        <table className='table w-full border-collapse'>
          <thead>
            <tr className='bg-accent text-sm  font-bold'>
              <th className='text-center border border-zinc-400 p-1'>年号</th>
              <th className='text-center border border-zinc-400 p-1'>仮想戦記</th>
              <th className='text-center border border-zinc-400 p-1'>史実</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item} className={index % 2 === 0 ? 'bg-base-100' : 'bg-accent'}>
                <td className='text-center border border-zinc-400'>{item.year}</td>
                <td className='border border-zinc-400'>
                  <ul className=''>
                    {item.fiction.map((event, _i) => (
                      <li key={event}>{event.event}</li>
                    ))}
                  </ul>
                </td>
                <td className='border border-zinc-400'>
                  <ul>
                    {item.reality.map((event, _i) => (
                      <li key={event}>{event.event}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BaseLayout>
  )
}
