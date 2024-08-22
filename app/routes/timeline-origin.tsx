import { timelineData } from './timelineData-origin'

interface TimelineEventProps {
  month: string
  eventName: string
  link: string
}
export interface TimelineItemProps {
  year: number
  fictionalEvents: TimelineEventProps[]
  realityEvents: TimelineEventProps[]
}
const TimelineEvent = ({ month, eventName, link }: TimelineEventProps) => (
  <div className='mb-6 line-break-strict'>
    <div className='font-semibold text-sm text-gray-600'>{month}</div>
    <div className='font-semibold text-md'>{eventName}</div>
    {link ? (
      <a
        href={link}
        className='text-sm text-blue-600 float-right'
        target='_blank'
        rel='noopener noreferrer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          className='w-3 h-3'
          fill='currentColor'
        >
          <title>リンクアイコン</title>
          <path d='M432 320H400a16 16 0 0 0 -16 16V448H64V128H208a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16H48A48 48 0 0 0 0 112V464a48 48 0 0 0 48 48H400a48 48 0 0 0 48-48V336A16 16 0 0 0 432 320zM488 0h-128c-21.4 0-32.1 25.9-17 41l35.7 35.7L135 320.4a24 24 0 0 0 0 34L157.7 377a24 24 0 0 0 34 0L435.3 133.3 471 169c15 15 41 4.5 41-17V24A24 24 0 0 0 488 0z' />
        </svg>
      </a>
    ) : null}
  </div>
)

const TimelineItem = ({
  year,
  fictionalEvents,
  realityEvents,
}: TimelineItemProps) => (
  <div className='relative pb-12'>
    <div className='absolute left-1/2 -ml-0.5 w-0.5 h-full bg-gray-200' />
    <div className='relative flex items-start justify-center'>
      <div className='flex w-full items-start justify-between'>
        <div className='w-5/12 text-right pr-4'>
          {fictionalEvents.map(event => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            <TimelineEvent {...event} />
          ))}
        </div>
        <div className='z-10 flex flex-col items-center'>
          <div className='flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white text-lg font-medium'>
            {year}
          </div>
        </div>
        <div className='w-5/12 pl-4'>
          {realityEvents.map(event => (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            <TimelineEvent {...event} />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const Header = () => {
  // TimelineItemに合わせたヘッダーを作成する
  return (
    <div className='sticky top-0 z-20 navbar bg-slate-200 pb-2 mt-10'>
      <div className='flex w-full items-start justify-between'>
        <div className='text-2xl font-bold text-right pr-4'>乙女ゲー世界</div>
        <div className='text-2xl font-bold text-right pr-4'>史実</div>
      </div>
    </div>
  )
}

export default function AppleProductTimeline() {
  return (
    <>
      <Header />
      {/* {snippet} */}
      <div className='max-w-6xl mx-auto p-4'>
        {timelineData.map(item => (
          // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
          <TimelineItem {...item} />
        ))}
      </div>
    </>
  )
}
