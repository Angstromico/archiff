'use client'

import { useEffect, useRef, useState } from 'react'
import FadeGradients from '../FadeGradients'
import CarouselImage from './components/CarruselImage'

export default function ImageSlider() {
  // --------------------------------------------------------------
  // 1. Slides
  // --------------------------------------------------------------
  const totalImages = 26
  const slides = Array.from({ length: totalImages / 2 }, (_, i) => ({
    normal: `/slider/${i * 2 + 1}.png`,
    hover: `/slider/${i * 2 + 2}.png`,
    link: 'https://archiff.com',
  }))

  // --------------------------------------------------------------
  // 2. Breakpoint → cards per view
  // --------------------------------------------------------------
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 2
    const w = window.innerWidth
    if (w >= 1280) return 5
    if (w >= 768) return 4
    return 2
  }

  const [cardsPerView, setCardsPerView] = useState(2)

  // NEW: Start in the middle of the infinite array (5 copies = start at 5th copy)
  const INFINITE_COPIES = 10
  const START_OFFSET = Math.floor(INFINITE_COPIES / 2) * slides.length

  const [index, setIndex] = useState(START_OFFSET)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const rafRef = useRef<number | null>(null)
  const accumRef = useRef(0)
  const dragStartIndexRef = useRef(START_OFFSET)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragDistanceRef = useRef(0)

  // ---- Resize handler ----
  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView())
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // --------------------------------------------------------------
  // 3. Continuous smooth scroll (ONLY when NOT dragging)
  // --------------------------------------------------------------
  const speed = 0.5 // Reduced for smoother mobile experience
  const totalSlides = slides.length * INFINITE_COPIES

  useEffect(() => {
    if (isDragging) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      return
    }

    let last = performance.now()

    const loop = (now: number) => {
      const delta = (now - last) / 1000
      last = now

      accumRef.current += delta * speed
      const fullSlots = Math.floor(accumRef.current)
      const fractional = accumRef.current - fullSlots

      setIndex((i) => {
        const newIndex = i + fullSlots
        // Reposition if we're getting close to edges (smoother wrapping)
        if (
          newIndex < slides.length ||
          newIndex >= totalSlides - slides.length
        ) {
          const normalizedIdx =
            ((newIndex % slides.length) + slides.length) % slides.length
          return START_OFFSET + normalizedIdx
        }
        return newIndex
      })
      setProgress(fractional)

      accumRef.current = fractional

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [slides.length, isDragging, totalSlides, speed, START_OFFSET])

  // --------------------------------------------------------------
  // 4. Mouse/Touch event handlers
  // --------------------------------------------------------------
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStartX(e.clientX)
    dragDistanceRef.current = 0
    dragStartIndexRef.current = index + progress
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    const touchX = e.touches[0].clientX
    setDragStartX(touchX)
    dragDistanceRef.current = 0
    dragStartIndexRef.current = index + progress
  }

  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartX
      dragDistanceRef.current = Math.abs(deltaX)
      const pxPerSlot = window.innerWidth / cardsPerView
      const offsetInSlots = -deltaX / pxPerSlot

      setDragOffset(offsetInSlots)
    }

    const handleGlobalMouseUp = () => {
      if (!isDragging) return

      const finalPosition = dragStartIndexRef.current + dragOffset

      // Wrap to keep position within infinite array bounds
      let normalizedPosition = finalPosition
      while (normalizedPosition < 0) normalizedPosition += totalSlides
      while (normalizedPosition >= totalSlides)
        normalizedPosition -= totalSlides

      // Reposition to middle if near edges
      if (
        normalizedPosition < slides.length ||
        normalizedPosition >= totalSlides - slides.length
      ) {
        const posInCycle = normalizedPosition % slides.length
        normalizedPosition =
          START_OFFSET +
          (posInCycle >= 0 ? posInCycle : posInCycle + slides.length)
      }

      setIndex(Math.floor(normalizedPosition))
      setProgress(normalizedPosition - Math.floor(normalizedPosition))

      setIsDragging(false)
      setDragOffset(0)
      accumRef.current = normalizedPosition - Math.floor(normalizedPosition)
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [
    isDragging,
    dragStartX,
    cardsPerView,
    dragOffset,
    slides.length,
    totalSlides,
    START_OFFSET,
  ])

  useEffect(() => {
    if (!isDragging) return

    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].clientX
      const deltaX = touchX - dragStartX
      dragDistanceRef.current = Math.abs(deltaX)
      const pxPerSlot = window.innerWidth / cardsPerView
      const offsetInSlots = -deltaX / pxPerSlot
      setDragOffset(offsetInSlots)
    }

    const handleTouchEnd = () => {
      const finalPosition = dragStartIndexRef.current + dragOffset

      let normalizedPosition = finalPosition
      while (normalizedPosition < 0) normalizedPosition += totalSlides
      while (normalizedPosition >= totalSlides)
        normalizedPosition -= totalSlides

      if (
        normalizedPosition < slides.length ||
        normalizedPosition >= totalSlides - slides.length
      ) {
        const posInCycle = normalizedPosition % slides.length
        normalizedPosition =
          START_OFFSET +
          (posInCycle >= 0 ? posInCycle : posInCycle + slides.length)
      }

      setIndex(Math.floor(normalizedPosition))
      setProgress(normalizedPosition - Math.floor(normalizedPosition))

      setIsDragging(false)
      setDragOffset(0)
      accumRef.current = normalizedPosition - Math.floor(normalizedPosition)
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    isDragging,
    dragStartX,
    cardsPerView,
    dragOffset,
    slides.length,
    totalSlides,
    START_OFFSET,
  ])

  // --------------------------------------------------------------
  // 5. Render
  // --------------------------------------------------------------
  const visibleCount = typeof window === 'undefined' ? 2 : cardsPerView
  const slotWidthPercent = 100 / visibleCount

  // Create infinite array
  const infiniteSlides = Array(INFINITE_COPIES).fill(slides).flat()

  const currentPosition = isDragging
    ? dragStartIndexRef.current + dragOffset
    : index + progress

  const translateX = -currentPosition * slotWidthPercent //I need this translation to be more smooth, overly in Mobile, looks to weird, not fluid

  return (
    <section className='relative w-full overflow-hidden mt-10 lg:mt-32'>
      <FadeGradients />

      <div
        ref={trackRef}
        className='flex gap-2 lg:gap-4'
        style={{
          transform: `translateX(${translateX}%)`,
          transition: isDragging ? 'none' : 'transform 1s linear',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {infiniteSlides.map((img, i) => (
          <div
            key={i}
            style={{
              height: 'auto',
            }}
            className={`w-1/2 md:w-1/3 lg:w-auto shrink-0 transition-transform duration-200 ${
              isDragging ? 'scale-95' : 'scale-100'
            }`}
          >
            <CarouselImage
              normal={img.normal}
              hover={img.hover}
              link={img.link}
              isDragging={isDragging}
              dragDistance={dragDistanceRef.current}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
