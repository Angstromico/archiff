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
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing
          if (containerRef.current) {
            observer.unobserve(containerRef.current)
          }
        }
      },
      {
        rootMargin: '50px', // Start loading slightly before element enters viewport
        threshold: 0.01, // Trigger when even 1% is visible
      }
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
        {isVisible && (
          <Image
            src={image}
            alt={alt}
            width={width}
            height={height}
            className='block w-(--tiny) lg:w-(--width) max-w-full'
            loading='lazy'
          />
        )}
      </div>
    </div>
  )
}

export default SectionLogo
