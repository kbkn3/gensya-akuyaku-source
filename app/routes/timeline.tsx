import BaseLayout from '../components/layout'

export default function TimelineComparison() {
  const events = [
    {
      year: 1939,
      fictional: 'ドイツ、ポーランドに侵攻せず',
      historical: 'ドイツ、ポーランドに侵攻',
      fictionalDetail:
        'ヒトラーは外交交渉を選択し、ポーランドとの平和的な国境調整に成功。欧州での大規模な戦争は回避された。',
      historicalDetail:
        '1939年9月1日、ドイツ軍がポーランドに侵攻し、第二次世界大戦が勃発。イギリスとフランスは対ドイツ宣戦布告。',
    },
    {
      year: 1941,
      fictional: '日本、真珠湾攻撃を回避',
      historical: '日本、真珠湾攻撃を実行',
      fictionalDetail:
        '日本の指導者たちは、アメリカとの戦争リスクを回避するため、東南アジアへの拡張を一時的に停止。代わりに外交努力を強化。',
      historicalDetail:
        '1941年12月7日、日本軍がハワイの真珠湾を奇襲攻撃。アメリカが対日宣戦布告し、太平洋戦争が始まる。',
    },
    {
      year: 1944,
      fictional: '連合国、ノルマンディー上陸作戦失敗',
      historical: '連合国、ノルマンディー上陸作戦成功',
      fictionalDetail:
        '悪天候と強力なドイツ軍の防衛により、連合軍の上陸作戦は大きな損害を被って失敗。欧州での戦況が大きく変化。',
      historicalDetail:
        '1944年6月6日、連合軍がフランスのノルマンディー海岸に上陸。この作戦の成功により、西部戦線でのナチス・ドイツへの反攻が本格化。',
    },
    {
      year: 1945,
      fictional: '原爆投下なし、日本降伏せず',
      historical: '原爆投下、日本降伏',
      fictionalDetail:
        'アメリカは原爆の使用を躊躇。日本は降伏せず、本土決戦の準備を進める。戦争の長期化が予想される。',
      historicalDetail:
        '1945年8月6日と9日、アメリカが広島と長崎に原子爆弾を投下。8月15日、日本が無条件降伏を受諾し、第二次世界大戦が終結。',
    },
  ]
  const data = [
    {
      year: 1939,
      fiction: ['ドイツがポーランドに侵攻'],
      reality: ['ドイツがポーランドに侵攻', '第二次世界大戦勃発'],
    },
    {
      year: 1940,
      fiction: ['イギリスが降伏'],
      reality: ['ダンケルクの戦い', 'バトル・オブ・ブリテン'],
    },
    {
      year: 1941,
      fiction: ['ソ連がドイツに降伏'],
      reality: ['真珠湾攻撃', 'バルバロッサ作戦開始'],
    },
  ]

  return (
    <BaseLayout title='仮想戦記と史実の比較タイムライン'>
      <div className='container mx-auto p-4'>
        <div className='relative'>
          <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2' />

          <div className='space-y-16'>
            {events.map((event, _index) => (
              <div key={event} className='relative'>
                <div className='absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-base-100 px-2 z-10'>
                  <span className='text-lg font-bold'>{event.year}</span>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-right pr-4'>
                    <button className='btn btn-outline btn-info' type='button'>
                      {event.fictional}
                    </button>
                  </div>
                  <div className='pl-4'>
                    <button
                      className='btn btn-outline btn-success'
                      type='button'
                    >
                      {event.historical}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='container mx-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='text-center'>年号</th>
              <th className='text-center'>仮想戦記</th>
              <th className='text-center'>史実</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, _index) => (
              <tr key={item} className='hover'>
                <td className='text-center'>{item.year}</td>
                <td>
                  <ul className=''>
                    {item.fiction.map((event, _i) => (
                      <li key={event}>{event}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul className=''>
                    {item.reality.map((event, _i) => (
                      <li key={event}>{event}</li>
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
