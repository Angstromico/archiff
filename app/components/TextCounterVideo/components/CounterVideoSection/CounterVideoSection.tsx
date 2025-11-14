import { useRef } from 'react'
import CountUp from 'react-countup'
import VimeoVideoPlayer from './components/VimeoVideoPlayer'

const data = [
  { number: 10, text: 'Másters, formaciones y cursos' },
  { number: 300, text: 'Alumnos matriculados' },
  { number: 35, text: 'Profesores' },
]

const CounterVideoSection = () => {
  const counterRef = useRef<HTMLDivElement>(null)

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12'>
      {/* ---------- COUNTER SECTION ---------- */}
      <div ref={counterRef} className='border-t-[3px] border-black py-4'>
        {data.map((item, i) => (
          <div
            key={i}
            className='flex justify-between mb-4 last:mb-0 border-b-[3px] border-black'
          >
            <div className='text-[#2222C2] text-6xl lg:text-[96px]'>
              <CountUp end={item.number} duration={4} />+
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
