export const Diamond = ({
  size = 24,
  color = 'black',
  stretchX = 1,
  stretchY = 1,
}) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size * stretchX}
    height={size * stretchY}
    viewBox={`0 0 ${24 * stretchX} ${24 * stretchY}`}
    fill={color}
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='lucide lucide-diamond'
  >
    <path
      d='M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z'
      transform={`scale(${stretchX}, ${stretchY})`}
    />
  </svg>
)

export const MoonStar = ({ size = 24, color = 'black' }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    stroke={color}
    strokeWidth='1'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='lucide lucide-moon-star'
    style={{ transform: 'scaleX(-1)' }}
  >
    <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9' />
    <path d='M20 3v4' />
    <path d='M22 5h-4' />
  </svg>
)

export const Twitter = ({ size = 24, color = 'black' }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class='lucide lucide-twitter'
  >
    <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
  </svg>
)
