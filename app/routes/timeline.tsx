import BaseLayout from "../components/layout";

interface TimelineData {
  year: number;
  fiction: { event: string; book: string; link?: string }[];
  reality: { event: string; book?: string; link?: string }[];
}
export default function TimelineComparison() {
  const data: TimelineData[] = [
    {
      year: 1997,
      fiction: [
        {
          event: "6月 極東銀行、三海証券を買収",
          book: "ep.9 お嬢様飛翔 その3 12/24 投稿",
          link: "https://ncode.syosetu.com/n3297eu/9/",
        },
      ],
      reality: [
        {
          event: "9月 北海道拓殖銀行、北海道銀行との合併の延期を発表",
          book: "北海道拓殖銀行 - Wikipedia",
          link: "https://ja.wikipedia.org/wiki/%E5%8C%97%E6%B5%B7%E9%81%93%E6%8B%93%E6%AE%96%E9%8A%80%E8%A1%8C",
        },
        {
          event: "11月 三洋証券、会社更生法の適用を申請",
          book: "三洋証券 - Wikipedia",
          link: "https://ja.wikipedia.org/wiki/%E4%B8%89%E6%B4%8B%E8%A8%BC%E5%88%B8",
        },
      ],
    },
    {
      year: 2008,
      fiction: [
        {
          event: "9/15 投資銀行のリーザンシスターズが連邦倒産法第11章（日本でいう民事再生法）を申請",
          book: "ep.1 2008年9月15日",
          link: "https://ncode.syosetu.com/n3297eu/1/",
        },
      ],
      reality: [
        {
          event: "9/15 投資銀行のリーマン・ブラザーズが連邦倒産法第11章（日本でいう民事再生法）を申請",
          book: "リーマン・ショック - Wikipedia",
          link: "https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%BC%E3%83%9E%E3%83%B3%E3%83%BB%E3%82%B7%E3%83%A7%E3%83%83%E3%82%AF",
        },
      ],
    },
  ];

  return (
    <BaseLayout title="仮想戦記と史実の比較タイムライン">
      <div className="container mx-auto font-sans text-neutral">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="bg-accent text-sm  font-bold">
              <th className="text-center border border-zinc-400 p-1">年号</th>
              <th className="text-center border border-zinc-400 p-1">
                仮想戦記
              </th>
              <th className="text-center border border-zinc-400 p-1">史実</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item}
                className={index % 2 === 0 ? "bg-base-100" : "bg-accent"}
              >
                <td className="text-center border border-zinc-400">
                  {item.year}
                </td>
                <td className="border border-zinc-400">
                  <ul className="">
                    {item.fiction.map((event, _i) => (
                      <li key={event}>{event.event}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-zinc-400">
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
  );
}
