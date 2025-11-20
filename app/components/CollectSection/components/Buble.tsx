import { useRef, useState, useEffect } from 'react'
import CountUp from 'react-countup'

const Bubble = ({
  title,
  subtitle,
  isNumber,
  desktopHidden = false,
  width,
  minW,
}: {
  title: string | number
  subtitle: string
  isNumber?: boolean
  desktopHidden?: boolean
  width?: number
  minW?: boolean
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
        rounded-[90px]
        px-6 py-0.5 xl:px-12 xl:min-w-64 2xl:min-w-70 xl:py-4
        text-center my-1 xl:my-2 flex flex-col justify-center items-center ${
          desktopHidden ? 'xl:hidden' : ''
        } ${minW ? 'min-w-[280px]' : ''}
      `}
      style={{ maxWidth: width }}
    >
      <h3 className='neue-gothana text-5xl xl:text-6xl 2xl:text-7xl leading-none'>
        {isNumber && (
          <span className='text-5xl lg:text-6xl xl:text-7xl'>+</span>
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

      <p className='text-sm 2xl:text-lg leading-tight'>{subtitle}</p>
    </div>
  )
}

export default Bubble
