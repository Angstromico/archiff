'use client'

import TextContainer from './components/TextContainer'
import CountUp from 'react-countup'
import { useRef, useEffect } from 'react'
import Player from '@vimeo/player'

const TextCounterVideo = () => {
  const data = [
    { number: 10, text: 'Másters, formaciones y cursos' },
    { number: 300, text: 'Alumnos matriculados' },
    { number: 35, text: 'Profesores' },
  ]

  const counterRef = useRef<HTMLDivElement>(null)

  return (
    <div className='component-container mb-10 lg:mb-16'>
      <TextContainer />
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
    </div>
  )
}

/* --------------------------------------------------------------- */
/*  Vimeo player – height = height of the counter column (lg+)    */
/* --------------------------------------------------------------- */
type VimeoVideoPlayerProps = {
  counterRef: React.RefObject<HTMLDivElement>
}

const VimeoVideoPlayer = ({ counterRef }: VimeoVideoPlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  /* ---- 1. Initialise Vimeo player ---- */
  useEffect(() => {
    if (!playerRef.current) return

    const player = new Player(playerRef.current, {
      id: 1117740460,
      autoplay: false,
      muted: true,
      controls: false,
      loop: true,
      responsive: true,
    })

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? player.play() : player.pause()
      },
      { threshold: 0.5 }
    )

    observerRef.current.observe(playerRef.current)

    return () => {
      player.destroy()
      observerRef.current?.disconnect()
    }
  }, [])

  /* ---- 2. Sync height with counter column on lg+ ---- */
  useEffect(() => {
    if (!counterRef.current || !wrapperRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      const height = counterRef.current?.getBoundingClientRect().height ?? 0
      wrapperRef.current!.style.height = `${height}px`
    })

    resizeObserver.observe(counterRef.current)

    return () => resizeObserver.disconnect()
  }, [counterRef])

  return (
    <div
      ref={wrapperRef}
      className='relative w-full aspect-video lg:aspect-auto lg:h-auto overflow-hidden'
    >
      <div ref={playerRef} className='absolute inset-0 w-full h-full' />
    </div>
  )
}

export default TextCounterVideo
