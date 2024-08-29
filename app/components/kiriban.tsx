type KiribanProps = {
  count: number
}

export const Kiriban = (props: KiribanProps) => {
  // 0埋めして7桁のstringに変換
  const countStr = props.count.toString().padStart(7, '0')
  return (
    <div
      className='w-40 h-14 border-[6px] border-[#7ac6ec] bg-black text-green-500 font-seg-mini text-2xl justify-center items-center flex align-middle'
      style='border-style: ridge;'
    >
      {countStr}
    </div>
  )
}
