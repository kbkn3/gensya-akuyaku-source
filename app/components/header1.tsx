export default function Header1({ title }: { title: string }) {
  return (
    <div className='flex justify-center items-center h-screen m-0 bg-white font-sans'>
      <div className='flex items-center gap-2 bg-black border-2 border-white outline outline-2 outline-black outline-offset-4'>
        <div className='flex'>
          <div className='diamond' />
          <div className='diamond' />
          <div className='diamond' />
        </div>
        <div className='moon w-4 h-4 rounded-full mr-2 bg-black' />
        <h1 className='m-0 p-1 text-white leading-none text-xl'>{title}</h1>
        <div className='flex'>
          <div className='diamond' />
          <div className='diamond' />
          <div className='diamond' />
        </div>
      </div>
    </div>
  )
}
