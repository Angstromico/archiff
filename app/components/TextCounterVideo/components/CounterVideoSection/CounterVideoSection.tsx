'use client'

import { useRef, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import VimeoVideoPlayer from './components/VimeoVideoPlayer'

const data = [
  { number: 10, text: 'Másters, formaciones y cursos' },
  { number: 300, text: 'Alumnos matriculados' },
  { number: 35, text: 'Profesores' },
]

const CounterVideoSection = () => {
  const counterRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  /* --------------------------------------------------------------
   *  IntersectionObserver – trigger CountUp when the block scrolls in
   * ------------------------------------------------------------ */
  useEffect(() => {
    if (!counterRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(counterRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12'>
      {/* ---------- COUNTER SECTION ---------- */}
      <div
        ref={counterRef}
        className='border-t-2 md:border-t-3 border-black py-4'
      >
        {data.map((item, i) => (
          <div
            key={i}
            className='flex justify-between mb-4 last:mb-0 border-b-2 md:border-b-3 border-black'
          >
            <div className='text-[#2222C2] text-6xl lg:text-[96px]'>
              {isVisible ? (
                <CountUp end={item.number} duration={4} />
              ) : (
                <span>0</span>
              )}
              +
            </div>
            <p className='text-base lg:text-2xl self-center'>{item.text}</p>
          </div>
        ))}
      </div>

      {/* ---------- VIMEO PLAYER ---------- */}
      <VimeoVideoPlayer counterRef={counterRef} />
    </div>
  )
}

export default CounterVideoSection
