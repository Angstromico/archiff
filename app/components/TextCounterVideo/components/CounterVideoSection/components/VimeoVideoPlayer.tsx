'use client'

import { useEffect, useRef } from 'react'
import Player from '@vimeo/player'

type VimeoVideoPlayerProps = {
  counterRef: React.RefObject<HTMLDivElement | null>
}

const VimeoVideoPlayer = ({ counterRef }: VimeoVideoPlayerProps) => {
  const playerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
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
      className='relative w-full aspect-video lg:aspect-auto lg:h-auto overflow-hidden py-4'
    >
      <div ref={playerRef} className='absolute inset-0 w-full h-full' />
    </div>
  )
}

export default VimeoVideoPlayer
