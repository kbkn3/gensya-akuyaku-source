import { Diamond, MoonStar } from './icons'

const Rhombus = ({
  color = 'white',
  size = 14,
  stretchX = 1.5,
  stretchY = 1,
}) => (
  <Diamond color={color} size={size} stretchX={stretchX} stretchY={stretchY} />
)

export default function Header1({
  title,
  top,
}: { title: string; top: boolean }) {
  return (
    <div className='flex justify-center items-center mb-10 bg-white font-sans'>
      <div className='w-full flex items-center bg-black border-1 border-white outline outline-2 outline-black outline-offset-2'>
        <div className='hidden sm:flex'>
          <Rhombus />
          <Rhombus />
          <Rhombus />
        </div>
        <div className='flex justify-center items-center pl-20'>
          <div class='relative'>
            <div class='absolute top-1/2 -translate-y-1/2 left-[-64px]'>
              <div class='rounded-full border-[5px] border-white'>
                <div class='rounded-full bg-black border-2 border-white outline outline-3 outline-black outline-offset-0 w-14 h-14 flex justify-center items-center'>
                  <MoonStar color='white' size={36} />
                </div>
              </div>
            </div>
          </div>
          {/* top ページの場合は div 、 top ページ以外は h1 で扱う */}
          {top ? (
            <div className='font-bold m-2 mx-2 text-white leading-none sm:text-sm md:text-lg text-xl'>
              {title}
            </div>
          ) : (
            <h1 className='block mx-2 !my-2 text-white !sm:text-sm !md:text-base !text-xl'>
              {title}
            </h1>
          )}
        </div>
        <div class='grow' />
        <div className='hidden sm:flex'>
          <Rhombus />
          <Rhombus />
          <Rhombus />
        </div>
      </div>
    </div>
  )
}
