'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface IProps {
  image: string
  sizes: { width: number; tinyWidth: number; height: number }
  alt?: string
  lessBottom?: boolean
  noTop?: boolean
  customClass?: string
}

const SectionLogo = ({
  image,
  sizes,
  alt = '',
  lessBottom = false,
  noTop = false,
  customClass = '',
}: IProps) => {
  const { width, tinyWidth, height } = sizes
  const [isVisible, setIsVisible] = useState(false)
  const [renderKey, setRenderKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 👉 Restart animation by forcing a re-mount
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

  const innerStyle = `${customClass ? customClass : 'relative'} inline-block ${
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
            minHeight: `${height}px`,
          } as React.CSSProperties
        }
      >
        {isVisible && (
          <Image
            key={renderKey}
            src={image}
            alt={alt}
            width={width}
            height={height}
            className='block w-(--tiny) lg:w-(--width) max-w-full'
            loading='eager'
            unoptimized
          />
        )}
      </div>
    </div>
  )
}

export default SectionLogo
