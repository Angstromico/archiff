'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ImageSlider() {
  // --------------------------------------------------------------
  // 1. Slides (use .webp if you have them)
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

  // Start with a **SSR-safe** value (2) – never change it on mount
  const [cardsPerView, setCardsPerView] = useState(2)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const accumRef = useRef(0)

  // ---- Resize handler (runs **after** hydration) ----
  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView())
    onResize() // initial call (client only)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // --------------------------------------------------------------
  // 3. Continuous smooth scroll (requestAnimationFrame)
  // --------------------------------------------------------------
  const speed = 0.1

  useEffect(() => {
    let last = performance.now()

    const loop = (now: number) => {
      const delta = (now - last) / 1000 // seconds
      last = now

      // Accumulate progress (0 to 1 per slot)
      accumRef.current += delta * speed

      const slotProgress = accumRef.current
      const fullSlots = Math.floor(slotProgress)
      const fractional = slotProgress - fullSlots

      // Update index for looping
      setIndex((i) => (i + fullSlots) % slides.length)
      // Update smooth progress
      setProgress(fractional)

      // Reset accumulator
      accumRef.current = fractional

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [cardsPerView, slides.length])

  // --------------------------------------------------------------
  // 4. Render – SSR & client always render the same width
  // --------------------------------------------------------------
  // `visibleCount` is 2 on the server, then the real value on client
  const visibleCount = typeof window === 'undefined' ? 2 : cardsPerView
  const slotWidth = `${100 / visibleCount}%`

  // Duplicate for infinite loop
  const infiniteSlides = [...slides, ...slides]

  // Translate **only** by the current index * slot width
  const slotWidthPercent = 100 / visibleCount
  const translateX = -(index * slotWidthPercent + progress * slotWidthPercent)

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
        }}
      >
        {infiniteSlides.map((img, i) => (
          <div
            key={i}
            className='shrink-0'
            style={{ width: slotWidth, height: 'auto' }}
          >
            <CarouselImage
              normal={img.normal}
              hover={img.hover}
              link={img.link}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// -----------------------------------------------------------------
// Hover-fade image (unchanged)
// -----------------------------------------------------------------
function CarouselImage({
  normal,
  hover,
  link,
}: {
  normal: string
  hover: string
  link: string
}) {
  return (
    <Link
      href={link}
      target='_blank'
      className='group relative block w-full h-full'
    >
      <Image
        src={normal}
        alt='carousel'
        width={0}
        height={0}
        className='w-full h-auto object-cover transition-opacity duration-500 group-hover:opacity-0 static'
        sizes='(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16.66vw'
        priority={false}
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
