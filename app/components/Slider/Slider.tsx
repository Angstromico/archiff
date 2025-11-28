'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import FadeGradients from '../FadeGradients'
import CarouselImage from './components/CarruselImage'

export default function ImageSlider() {
  // --------------------------------------------------------------
  // 1. Slides
  // --------------------------------------------------------------
  const totalImages = 26
  const slides = useMemo(
    () =>
      Array.from({ length: totalImages / 2 }, (_, i) => ({
        normal: `/slider/${i * 2 + 1}.png`,
        hover: `/slider/${i * 2 + 2}.png`,
        link: 'https://archiff.com',
      })),
    []
  )

  // --------------------------------------------------------------
  // 2. State & Refs
  // --------------------------------------------------------------
  const [scrollPos, setScrollPos] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [dragDistance, setDragDistance] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)

  const rafRef = useRef<number | null>(null)
  const accumRef = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const contentWidthRef = useRef(0)

  // --------------------------------------------------------------
  // 3. Measure content width
  // --------------------------------------------------------------
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        // Total width of 4 sets. We need width of 1 set.
        const total = trackRef.current.scrollWidth
        const width = total / 4
        contentWidthRef.current = width
        setContentWidth(width)
      }
    }
    // Measure initially and on resize
    measure()
    // Also measure after a short delay to ensure layout is done
    const timer = setTimeout(measure, 100)

    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(timer)
    }
  }, [slides])

  // --------------------------------------------------------------
  // 4. Continuous smooth scroll (ONLY when NOT dragging)
  // --------------------------------------------------------------
  const speed = 50 // pixels per second

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

      if (contentWidthRef.current > 0) {
        accumRef.current += delta * speed
        // We don't strictly need to wrap accumRef here for logic,
        // but keeping it bounded is good practice.
        // However, for the seamless effect, we just let it grow/shrink
        // and handle the wrapping in the render logic (modulo).
        // To prevent overflow over extremely long sessions, we can wrap it:
        accumRef.current = accumRef.current % contentWidthRef.current
        setScrollPos(accumRef.current)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isDragging])

  // --------------------------------------------------------------
  // 5. Mouse event handlers
  // --------------------------------------------------------------
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragDistance(0)
    setDragOffset(0)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    const touchX = e.touches[0].clientX
    setDragStartX(touchX)
    setDragDistance(0)
    setDragOffset(0)
  }

  // Global mouse events
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartX
      setDragDistance(Math.abs(deltaX))
      // Dragging left (negative delta) -> move content left (increase scroll offset)
      setDragOffset(-deltaX)
    }

    const handleGlobalMouseUp = () => {
      if (!isDragging) return

      // Commit drag offset to accumulated scroll
      accumRef.current += dragOffset

      // Normalize accumRef to keep it within [0, contentWidth)
      if (contentWidthRef.current > 0) {
        accumRef.current =
          ((accumRef.current % contentWidthRef.current) +
            contentWidthRef.current) %
          contentWidthRef.current
      }

      setScrollPos(accumRef.current)
      setDragOffset(0)
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStartX, dragOffset])

  // Global touch events
  useEffect(() => {
    if (!isDragging) return

    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].clientX
      const deltaX = touchX - dragStartX
      setDragDistance(Math.abs(deltaX))
      setDragOffset(-deltaX)
    }

    const handleTouchEnd = () => {
      accumRef.current += dragOffset
      if (contentWidthRef.current > 0) {
        accumRef.current =
          ((accumRef.current % contentWidthRef.current) +
            contentWidthRef.current) %
          contentWidthRef.current
      }
      setScrollPos(accumRef.current)
      setDragOffset(0)
      setIsDragging(false)
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, dragStartX, dragOffset])

  // --------------------------------------------------------------
  // 6. Render
  // --------------------------------------------------------------
  // Use 4 sets of slides to ensure we always have a buffer on both sides
  const infiniteSlides = useMemo(
    () => [...slides, ...slides, ...slides, ...slides],
    [slides]
  )

  // Calculate translateX
  // We want to keep the view window in the "middle" of the strip.
  // The strip has width = 4 * contentWidth.
  // We oscillate between showing Set 2 and Set 3.
  // Set 1 is buffer for left drag, Set 4 is buffer for right drag.
  //
  // Logic:
  // 1. Calculate total logical position: scrollPos + dragOffset
  // 2. Wrap this into [0, contentWidth) range.
  // 3. Offset by -contentWidth (to start at Set 2).
  // 4. Subtract the wrapped position.
  //
  // Result: translateX is always in [-contentWidth, -2*contentWidth).
  // When wrappedPos is 0 -> translateX = -contentWidth (Start of Set 2)
  // When wrappedPos approaches contentWidth -> translateX approaches -2*contentWidth (Start of Set 3)
  // Since Set 2 and Set 3 are identical, the jump from -2*contentWidth back to -contentWidth is invisible.

  const totalPos = scrollPos + dragOffset
  const wrappedPos =
    contentWidth > 0
      ? ((totalPos % contentWidth) + contentWidth) % contentWidth
      : 0

  const translateX = -contentWidth - wrappedPos

  return (
    <section className='relative w-full overflow-hidden mt-10 lg:mt-32'>
      {/* Fade gradients */}
      <FadeGradients />

      {/* Track */}
      <div
        ref={trackRef}
        className='flex gap-2 lg:gap-4'
        style={{
          transform: `translateX(${translateX}px)`,
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
            style={{ height: 'auto' }}
            className={`w-1/2 md:w-1/3 lg:w-auto shrink-0 transition-transform duration-200 ${
              isDragging ? 'scale-95' : 'scale-100'
            }`}
          >
            <CarouselImage
              normal={img.normal}
              hover={img.hover}
              link={img.link}
              isDragging={isDragging}
              dragDistance={dragDistance}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
