import { Diamond, MoonStar } from './icons'

const Rhombus = ({
  color = 'white',
  size = 14,
  stretchX = 1.5,
  stretchY = 1,
}) => (
  <Diamond color={color} size={size} stretchX={stretchX} stretchY={stretchY} />
)

export default function Header1({ title }: { title: string }) {
  return (
    <div className='flex justify-center items-center m-0 bg-white font-sans'>
      <div className='w-full flex items-center bg-black border-1 border-white outline outline-2 outline-black outline-offset-2'>
        <div className='flex'>
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
          <h1 className='block !m-2 mx-1 text-white !leading-none text-xl '>
            {title}
          </h1>
        </div>
        <div class='grow' />
        <div className='flex'>
          <Rhombus />
          <Rhombus />
          <Rhombus />
        </div>
      </div>
    </div>
  )
}
