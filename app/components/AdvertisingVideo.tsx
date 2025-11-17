'use client'

import { useEffect, useRef, useState } from 'react'

const AdvertisingVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (videoRef.current) observer.observe(videoRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className='w-full h-16 lg:h-80 mt-16 lg:mt-24 relative overflow-hidden'>
      <video
        ref={videoRef}
        src={isVisible ? '/videos/bolsa-empleo.mp4' : undefined}
        autoPlay={isVisible}
        muted
        loop
        playsInline
        className='absolute inset-0 w-full h-full object-cover bg-black/20'
        preload='none'
      />
    </section>
  )
}

export default AdvertisingVideo
