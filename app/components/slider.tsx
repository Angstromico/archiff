'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ImageSlider() {
  // --------------------------------------------------------------
  // 1. Slides
  // --------------------------------------------------------------
  const totalImages = 26
  const slides = Array.from({ length: totalImages / 2 }, (_, i) => ({
    normal: `/slider/${i * 2 + 1}.png`,
    hover: `/slider/${i * 2 + 2}.png`,
    link: 'https://google.com',
  }))

  // --------------------------------------------------------------
  // 2. Breakpoint → cards per view
  // --------------------------------------------------------------
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 2
    const w = window.innerWidth
    if (w >= 1280) return 6
    if (w >= 768) return 4
    return 2
  }

  const [cardsPerView, setCardsPerView] = useState(2)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const rafRef = useRef<number | null>(null)
  const accumRef = useRef(0)
  const dragRef = useRef(0)

  // ---- Resize handler ----
  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView())
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // --------------------------------------------------------------
  // 3. Continuous smooth scroll
  // --------------------------------------------------------------
  const speed = 0.1

  useEffect(() => {
    if (isDragging) return

    let last = performance.now()

    const loop = (now: number) => {
      const delta = (now - last) / 1000
      last = now

      accumRef.current += delta * speed
      const fullSlots = Math.floor(accumRef.current)
      const fractional = accumRef.current - fullSlots

      setIndex((i) => (i + fullSlots) % slides.length)
      setProgress(fractional)

      accumRef.current = fractional

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [cardsPerView, slides.length, isDragging])

  // --------------------------------------------------------------
  // 4. Render
  // --------------------------------------------------------------
  const visibleCount = typeof window === 'undefined' ? 2 : cardsPerView
  const slotWidth = `${100 / visibleCount}%`
  const slotWidthPercent = 100 / visibleCount
  const infiniteSlides = [...slides, ...slides]

  const translateX = -(index + progress + dragOffset) * slotWidthPercent

  return (
    <div className='relative w-full overflow-hidden mt-32'>
      {/* Fade gradients */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10' />

      {/* Track */}
      <div
        className='flex gap-8'
        style={{
          transform: `translateX(${translateX}%)`,
          transition: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={(e) => {
          setIsDragging(true)
          setDragStartX(e.clientX)
          dragRef.current = index + progress
        }}
        onMouseMove={(e) => {
          if (!isDragging) return
          const deltaX = e.clientX - dragStartX
          const pxPerSlot = window.innerWidth / visibleCount
          const offsetIndex = deltaX / pxPerSlot
          setDragOffset(offsetIndex)
        }}
        onMouseUp={() => {
          if (!isDragging) return
          const newIndex = dragRef.current - dragOffset
          setIndex(((newIndex % slides.length) + slides.length) % slides.length)
          setIsDragging(false)
          setDragOffset(0)
        }}
        onMouseLeave={() => {
          if (!isDragging) return
          const newIndex = dragRef.current - dragOffset
          setIndex(((newIndex % slides.length) + slides.length) % slides.length)
          setIsDragging(false)
          setDragOffset(0)
        }}
      >
        {infiniteSlides.map((img, i) => (
          <div
            key={i}
            style={{ width: slotWidth, height: 'auto' }}
            className={`shrink-0 transition-transform duration-200 ${
              isDragging ? 'scale-90' : 'scale-100'
            }`}
          >
            <CarouselImage
              normal={img.normal}
              hover={img.hover}
              link={img.link}
              isDragging={isDragging}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// -----------------------------------------------------------------
// Hover-fade image
// -----------------------------------------------------------------
function CarouselImage({
  normal,
  hover,
  link,
  isDragging,
}: {
  normal: string
  hover: string
  link: string
  isDragging: boolean
}) {
  return (
    <Link
      href={link}
      target='_blank'
      className='group relative block w-full h-full'
      onClick={(e) => {
        if (isDragging) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    >
      <Image
        src={normal}
        alt='carousel'
        width={0}
        height={0}
        className='w-full h-auto object-cover transition-opacity duration-500 group-hover:opacity-0 static'
        sizes='(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16.66vw'
      />
      <Image
        src={hover}
        alt='carousel hover'
        width={0}
        height={0}
        className='absolute inset-0 w-full h-auto object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        sizes='(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16.66vw'
      />
    </Link>
  )
}
