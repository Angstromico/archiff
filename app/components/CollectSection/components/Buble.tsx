import { useRef, useState, useEffect } from 'react'
import CountUp from 'react-countup'

const Bubble = ({
  title,
  subtitle,
  isNumber,
  desktopHidden = false,
  width,
}: {
  title: string | number
  subtitle: string
  isNumber?: boolean
  desktopHidden?: boolean
  width?: number
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
        border-2 xl:border-4 
        rounded-full 
        px-4 py-2 xl:px-6 xl:py-4
        text-center my-2 xl:my-6 ${desktopHidden ? 'xl:hidden' : ''}
      `}
      style={{ maxWidth: width }}
    >
      <h3 className='font-extralight text-[48px] 2xl:text-[80px] 3xl:text-[117px] leading-none'>
        {isNumber && (
          <span className='text-[32px] 3xl:text-[45px] 3xl:text-[64px]'>+</span>
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

      <p className='text-[16px] 3xl:text-[32px] leading-tight'>{subtitle}</p>
    </div>
  )
}

export default Bubble
