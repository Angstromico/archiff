'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface IProps {
  image: string
  sizes: { width: number; tinyWidth: number; height: number }
  alt?: string
  lessBottom?: boolean
  noTop?: boolean
}

const SectionLogo = ({
  image,
  sizes,
  alt = '',
  lessBottom = false,
  noTop = false,
}: IProps) => {
  const { width, tinyWidth, height } = sizes
  const [isVisible, setIsVisible] = useState(false)
  const [renderKey, setRenderKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Restart animation by forcing a re-mount
          setRenderKey((prev) => prev + 1)
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.29 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  const innerStyle = `relative inline-block ${
    lessBottom ? 'lg:mb-4' : 'mb-4 md:mb-14'
  }`

  const mainClass = `${
    noTop ? 'px-4 lg:px-[147px]' : 'px-4 lg:px-[147px] pt-[100px]'
  }`

  return (
    <div className={mainClass} ref={containerRef}>
      <div
        className={innerStyle}
        style={
          {
            '--tiny': `${tinyWidth}px`,
            '--width': `${width}px`,
          } as React.CSSProperties
        }
      >
        {/* SOLUTION 1: Keep image in DOM but use opacity + visibility */}
        <Image
          key={renderKey}
          src={image}
          alt={alt}
          width={width}
          height={height}
          className='block w-(--tiny) lg:w-(--width) max-w-full transition-opacity duration-300'
          style={{
            opacity: isVisible ? 1 : 0,
            visibility: isVisible ? 'visible' : 'hidden',
          }}
          loading='eager'
          unoptimized
        />
      </div>
    </div>
  )
}

export default SectionLogo
