import { useRef, useState, useEffect } from 'react'
import CountUp from 'react-countup'

const Bubble = ({
  title,
  subtitle,
  isNumber,
  desktopHidden = false,
  lgWidth,
  maxW,
  maxWX,
}: {
  title: string | number
  subtitle: string
  isNumber?: boolean
  desktopHidden?: boolean
  width?: number
  maxW?: boolean
  maxWX?: boolean
  lgWidth?: boolean
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`
        border-white 
        border-2 lgx:border-3 
        rounded-full
        h-20 sm:w-full lgx:h-[56%] xlx:h-38 2xl:h-42 3xl:h-46
        text-center px-5 flex flex-col justify-center items-center lgx:px-10 2xl:px-6 3xl:px-8 ${
          desktopHidden ? 'lgx:hidden' : ''
        }
        ${maxW ? 'w-46 sm:min-w-full' : ''}
        ${maxWX ? 'w-56 sm:min-w-full' : ''}
        ${
          lgWidth
            ? 'lgx:w-[43%]'
            : 'lgx:px-8 2xl:px-16 lgx:w-[57%]'
        }
      `}
    >
      <h3 className='neue-gothana text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl leading-none flex gap-2'>
        {isNumber && (
          <span className='text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl'>+</span>
        )}{' '}
        {isNumber ? (
          visible ? (
            <CountUp end={Number(title)} duration={4} />
          ) : (
            0
          )
        ) : (
          title
        )}
      </h3>

      <p className='mt-1 lgx:mt-2 text-[10px] xlx:text-base leading-tight text-nowrap'>
        {subtitle}
      </p>
    </div>
  )
}

export default Bubble
