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
    link: 'https://google.com',
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
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const rafRef = useRef<number | null>(null)
  const accumRef = useRef(0)
  const dragStartIndexRef = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragDistanceRef = useRef(0) // Para trackear distancia del drag

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
  const speed = 0.1

  useEffect(() => {
    // Don't run animation loop while dragging
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
  // 4. Mouse event handlers
  // --------------------------------------------------------------
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStartX(e.clientX)
    dragDistanceRef.current = 0 // Reset drag distance
    // Store the current position when drag starts
    dragStartIndexRef.current = index + progress
  }

  // Add global mouse events for better drag experience
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartX
      dragDistanceRef.current = Math.abs(deltaX) // Update drag distance
      const pxPerSlot = window.innerWidth / cardsPerView
      const offsetInSlots = -deltaX / pxPerSlot

      setDragOffset(offsetInSlots)
    }

    const handleGlobalMouseUp = () => {
      if (!isDragging) return

      const finalPosition = dragStartIndexRef.current + dragOffset
      const normalizedIndex =
        ((finalPosition % slides.length) + slides.length) % slides.length

      setIndex(Math.floor(normalizedIndex))
      setProgress(normalizedIndex - Math.floor(normalizedIndex))

      setIsDragging(false)
      setDragOffset(0)
      accumRef.current = normalizedIndex - Math.floor(normalizedIndex)
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStartX, cardsPerView, dragOffset, slides.length])

  // --------------------------------------------------------------
  // 5. Render
  // --------------------------------------------------------------
  const visibleCount = typeof window === 'undefined' ? 2 : cardsPerView
  const slotWidth = `${100 / visibleCount}%`
  const slotWidthPercent = 100 / visibleCount
  const infiniteSlides = [...slides, ...slides]

  // Calculate translateX based on whether we're dragging or not
  const currentPosition = isDragging
    ? dragStartIndexRef.current + dragOffset
    : index + progress

  const translateX = -currentPosition * slotWidthPercent

  return (
    <section className='relative w-full overflow-hidden mt-32'>
      {/* Fade gradients */}
      <FadeGradients />

      {/* Track */}
      <div
        ref={trackRef}
        className='flex gap-2 lg:gap-4'
        style={{
          transform: `translateX(${translateX}%)`,
          transition: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
      >
        {infiniteSlides.map((img, i) => (
          <div
            key={i}
            style={{ width: slotWidth, height: 'auto' }}
            className={`shrink-0 transition-transform duration-200 ${
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
