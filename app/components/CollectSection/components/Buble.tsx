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
        border-3 xl:border-4 
        rounded-full
        h-20 sm:w-full lg:h-[57%] xl:h-40 2xl:h-44
        text-center px-5 flex flex-col justify-center items-center lg:px-4 xl:px-6 2xl:px-10 ${
          desktopHidden ? 'lg:hidden' : ''
        }
        ${maxW ? 'w-46 sm:min-w-full' : ''}
        ${maxWX ? 'w-56 sm:min-w-full' : ''}
        ${
          lgWidth
            ? 'lg:max-w-[200px] xl:max-w-[280px] 2xl:max-w-[320px]'
            : 'lg:px-10 2xl:p-12 lg:max-w-[300px] xl:max-w-[400px] 2xl:max-w-[450px]'
        }
      `}
    >
      <h3 className='neue-gothana text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none flex gap-2'>
        {isNumber && (
          <span className='text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl'>
            +
          </span>
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

      <p className='mt-1 lg:mt-2 text-[10px] xl:text-base 2xl:text-lg leading-tight text-nowrap'>
        {subtitle}
      </p>
    </div>
  )
}

export default Bubble
