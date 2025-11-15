'use client'

import { useEffect, useRef } from 'react'
import Player from '@vimeo/player'

const VideoBanner = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    if (!iframeRef.current) return

    // Initialize Vimeo player
    playerRef.current = new Player(iframeRef.current, {
      id: 1098179983,
      width: 1920, // Cambiado a un ancho estándar
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
    })

    // Prevenir que el video se pause al hacer scroll
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
  }, [])

  return (
    <section className='my-16 lg:my-44 w-full overflow-hidden'>
      {/* Contenedor principal que asegura el ancho completo sin scroll horizontal */}
      <div className='relative w-full h-[117px] lg:h-[654px] mx-auto'>
        <iframe
          ref={iframeRef}
          src='https://player.vimeo.com/video/823111497?autoplay=1&loop=1&muted=100&background=1&controls=0'
          className='absolute top-1/2 left-1/2'
          style={{
            width: '100vw',
            height: '56.25vw', // Mantiene relación 16:9 para cubrir ancho
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            pointerEvents: 'none',
          }}
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          loading='lazy'
          title='Video Banner'
        />
        <div className='absolute inset-0 -z-10 bg-black' />
      </div>
    </section>
  )
}

export default VideoBanner
