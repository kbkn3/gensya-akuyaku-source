type KiribanProps = {
  count: number
}

export const Kiriban = (props: KiribanProps) => {
  // 0埋めして7桁のstringに変換
  const countStr = props.count.toString().padStart(7, '0')
  return (
    <div className="flex justify-center items-end">
      <div
        className='w-32 h-10 border-[4px] border-[#7ac6ec] bg-black text-green-500 font-seg-mini text-lg justify-center items-center flex align-middle'
        style='border-style: ridge;'
      >
        {countStr}
      </div>
      番目の訪問者です
    </div>
  )
}
