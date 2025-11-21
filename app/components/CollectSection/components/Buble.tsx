import { useRef, useState, useEffect } from 'react'
import CountUp from 'react-countup'

const Bubble = ({
  title,
  subtitle,
  isNumber,
  desktopHidden = false,
  lgWidth,
  minW,
  maxW,
  xlWidth,
  bigWidth,
}: {
  title: string | number
  subtitle: string
  isNumber?: boolean
  desktopHidden?: boolean
  width?: number
  minW?: boolean
  maxW?: boolean
  lgWidth?: boolean
  xlWidth?: boolean
  bigWidth?: boolean
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
        h-[98px] lg:h-[50%] lg:px-7 xl:h-40 2xl:px-8
        text-center px-5 flex flex-col justify-center items-center ${
          desktopHidden ? 'lg:hidden' : ''
        } ${minW ? 'w-60' : ''}
        ${maxW ? 'w-[260px]' : ''}
        ${lgWidth ? 'lg:px-10' : ''}
        ${xlWidth ? 'xl:px-12' : ''}
        ${bigWidth ? '2xl:px-16' : ''}
      `}
    >
      <h3 className='neue-gothana text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl leading-none flex gap-2'>
        {/* Me lo toma pero cuando inspecciono el navegador me lo marca como no habilitado porque le da prioridad al lg:text-4xl  */}
        {isNumber && (
          <span className='text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl'>
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

      <p className='text-[8px] lg:text-[10px] xl:text-base 2xl:text-lg leading-tight text-nowrap'>
        {subtitle}
      </p>
    </div>
  )
}

export default Bubble
