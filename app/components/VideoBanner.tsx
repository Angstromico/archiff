'use client'

import { useEffect, useRef } from 'react'
import Player from '@vimeo/player'

const VideoBanner = ({
  videoCode,
  notMobile,
  notDesktop,
}: {
  videoCode?: string
  notMobile?: boolean
  notDesktop?: boolean
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<Player | null>(null)
  const defaultVideo = videoCode || '1098179983'
  const link = `https://player.vimeo.com/video/${defaultVideo}?autoplay=1&loop=1&muted=1&background=1&controls=0`

  useEffect(() => {
    if (!iframeRef.current) return

    // Initialize Vimeo player with dynamic ID
    playerRef.current = new Player(iframeRef.current, {
      id: parseInt(defaultVideo, 10), // Dynamic based on videoCode
      width: 1920,
      height: 654,
      autoplay: true,
      loop: true,
      muted: true,
      controls: false,
      background: true,
      responsive: true,
      title: false,
      byline: false,
      portrait: false,
      autopause: false,
    })

    // Prevent pause on tab switch
    const handleVisibilityChange = () => {
      if (document.hidden) {
        playerRef.current?.pause()
      } else {
        playerRef.current?.play()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      playerRef.current?.destroy()
    }
  }, [defaultVideo]) // Add dependency if videoCode can change

  return (
    <section
      className={`my-16 lg:my-44 w-full overflow-hidden ${
        notMobile ? 'hidden lg:block' : ''
      } ${notDesktop ? 'lg:hidden' : ''}`}
    >
      {/* Main container: full width, fixed height, no horizontal scroll */}
      <div className='relative w-full h-[117px] lg:h-[654px] mx-auto overflow-hidden'>
        <iframe
          ref={iframeRef}
          src={link}
          className='absolute -top-5 lg:-top-15 left-0' // Top-left aligned to prioritize top-left video content
          style={{
            width: '100vw',
            height: '56.25vw', // 16:9 aspect based on viewport width
            minWidth: '100vw',
            pointerEvents: 'none',
          }}
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          loading='lazy'
          title='Video Banner'
        />
        {/* Fallback black background */}
        <div className='absolute inset-0 -z-10 bg-black' />
      </div>
    </section>
  )
}

export default VideoBanner