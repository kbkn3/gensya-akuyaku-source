type KiribanProps = {
  count: number
}

export const Kiriban = (props: KiribanProps) => {
 // 0埋めして7桁のstringに変換
 const countStr = props.count.toString().padStart(7, '0');
 return (
   <div className="flex flex-col items-center 2xl:flex-row 2xl:items-end">
     <div
       className="w-32 h-10 border-[4px] border-[#7ac6ec] bg-black text-green-500 font-seg-mini text-lg flex justify-center items-center"
       style={{ borderStyle: 'ridge' }}
     >
       {countStr}
     </div>
     <div className="mt-2 md:mt-0 md:ml-2">番目の訪問者です</div>
   </div>
 );
}
