'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import TeacherCard from './TeacherCard'

const cardsInfo = [
  { name: 'Ramón Esteve', type: 'Ramón Esteve Estudio' },
  { name: 'Eduardo Tazón y Antonio Mora', type: 'STUDIO.NOJU' },
  { name: 'Marcos Parera', type: 'Mesura' },
  { name: 'Juan Ranchal', type: 'Janfri & Ranchal Studio' },
  { name: 'Ikér Ochotorena', type: 'OOAA Arquitectura' },
  { name: 'Sigfrido Serra', type: 'Sigfrido Serra Studio' },
  { name: 'Alberto Eltini', type: 'El Departamento' },
  { name: 'Ángela Montagud y Jordi Iranzo', type: 'Clap Studio' },
  { name: 'Francesc Rifé', type: 'Francesc Rifé Studio' },
  { name: 'Enric Pastor', type: 'Fundador y editor de MANERA EDICIONES' },
  { name: 'Albert Gil', type: 'CEO de Batlle i Roig' },
  { name: 'Hernani Fernández', type: 'Fundador de Arqueha' },
]

const TeachersCarousel = () => {
  const totalCards = cardsInfo.length
  // Start in the middle copy for seamless loop: totalCards (12)
  const [currentIndex, setCurrentIndex] = useState(totalCards)

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)

  // Refs
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const hasDraggedRef = useRef(false)
  const startIndexRef = useRef(totalCards) // Tracks index at drag start
  const isTransitioningRef = useRef(false) // Blocks interaction during the jump

  // Responsive cards per view
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1
    const w = window.innerWidth
    if (w >= 1280) return 4
    if (w >= 768) return 3
    if (w >= 640) return 2
    return 1
  }

  const [cardsPerView, setCardsPerView] = useState(1)

  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView())
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Create a larger array for seamless infinite scrolling (3 copies)
  const infiniteCards = [...cardsInfo, ...cardsInfo, ...cardsInfo]

  // Get original index for image source
  const getVisualIndex = (index: number) => {
    return ((index % totalCards) + totalCards) % totalCards
  }

  // Improved arrow navigation with seamless looping
  const goPrev = () => {
    if (isTransitioningRef.current || isDragging) return

    setCurrentIndex((prev) => {
      const newIndex = prev - 1

      // If moving into the first copy (index < totalCards)
      if (newIndex < totalCards) {
        isTransitioningRef.current = true

        // Start the visual transition to newIndex
        // After transition, immediately jump to the equivalent slide in the middle copy
        setTimeout(() => {
          setCurrentIndex(newIndex + totalCards) // Jump without transition
          isTransitioningRef.current = false
        }, 400) // Match transition duration

        return newIndex
      }
      return newIndex
    })
  }

  const goNext = () => {
    if (isTransitioningRef.current || isDragging) return

    setCurrentIndex((prev) => {
      const newIndex = prev + 1

      // If moving into the third copy (index >= totalCards * 2)
      if (newIndex >= totalCards * 2) {
        isTransitioningRef.current = true

        // Start the visual transition to newIndex
        // After transition, immediately jump to the equivalent slide in the middle copy
        setTimeout(() => {
          setCurrentIndex(newIndex - totalCards) // Jump without transition
          isTransitioningRef.current = false
        }, 400) // Match transition duration

        return newIndex
      }
      return newIndex
    })
  }

  // Animation Frame for smooth drag
  useEffect(() => {
    let lastTranslate = currentTranslate

    const animate = () => {
      if (trackRef.current && lastTranslate !== currentTranslate) {
        const slideWidthPercent = 100 / cardsPerView
        const translateX = -currentIndex * slideWidthPercent + currentTranslate
        trackRef.current.style.transform = `translateX(${translateX}%)`
        lastTranslate = currentTranslate
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [currentIndex, currentTranslate, cardsPerView])

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || isTransitioningRef.current) return

    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentTranslate(0)
    hasDraggedRef.current = false
    startIndexRef.current = currentIndex

    if (trackRef.current) {
      // Disable transition for immediate drag
      trackRef.current.style.transition = 'none'
    }
    e.preventDefault()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isTransitioningRef.current) return

    const deltaX = e.clientX - startX
    const dragDistance = Math.abs(deltaX)

    if (dragDistance > 5) {
      hasDraggedRef.current = true
    }

    // Calculate drag distance in terms of slides
    const containerWidth = trackRef.current?.offsetWidth || window.innerWidth
    const slideWidthPixels = containerWidth / cardsPerView
    const slidesMoved = deltaX / slideWidthPixels

    // Convert to percentage for translation with resistance
    const resistance = 0.5 // Adjust resistance for feel
    const translatePercent = slidesMoved * (100 / cardsPerView) * resistance

    setCurrentTranslate(translatePercent)
  }

  const handlePointerUp = () => {
    if (!isDragging || isTransitioningRef.current) return

    const finalTranslate = currentTranslate

    // Determine the number of slides to move based on translation amount
    const slideWidthPercent = 100 / cardsPerView
    // Negative translate means user dragged right (slides moved left)
    const slidesMoved = -finalTranslate / slideWidthPercent

    // Snap to the nearest whole slide
    let slidesToMove = Math.round(slidesMoved)

    // Apply momentum: if drag was fast enough, ensure at least one slide moves
    if (Math.abs(slidesMoved) > 0.3 && slidesToMove === 0) {
      slidesToMove = slidesMoved > 0 ? 1 : -1
    }

    const targetIndex = startIndexRef.current + slidesToMove

    // --- Seamless Infinite Jump Logic (After snap) ---
    let newIndex = targetIndex

    // If resulting index is in the first copy
    if (newIndex < totalCards) {
      newIndex += totalCards
      isTransitioningRef.current = true

      // After the snap transition completes, reset the index to the middle copy
      setTimeout(() => {
        setCurrentIndex(newIndex)
        isTransitioningRef.current = false
      }, 400)

      // If resulting index is in the third copy
    } else if (newIndex >= totalCards * 2) {
      newIndex -= totalCards
      isTransitioningRef.current = true

      // After the snap transition completes, reset the index to the middle copy
      setTimeout(() => {
        setCurrentIndex(newIndex)
        isTransitioningRef.current = false
      }, 400)
    }

    // Set the index to start the snap/transition
    setCurrentIndex(targetIndex)

    // Reset drag state
    setIsDragging(false)
    setCurrentTranslate(0)

    if (trackRef.current) {
      // Re-enable transition for the final snap
      trackRef.current.style.transition = 'transform 0.4s ease-out'
    }
  }

  const slideWidthPercent = 100 / cardsPerView

  // Final translateX calculation
  const translateX = -currentIndex * slideWidthPercent + currentTranslate

  return (
    <section className='relative w-full overflow-hidden border-x-2'>
      {/* Fade gradients */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10' />

      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity disabled:opacity-30'
        aria-label='Previous'
        disabled={isTransitioningRef.current || isDragging}
      >
        <Image
          src='/teachers/left-arrow.png'
          alt=''
          width={68}
          height={50}
          className='w-[51.52px] h-[37.96px] lg:w-[68px] lg:h-[50px] cursor-pointer'
        />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-30'
        aria-label='Next'
        disabled={isTransitioningRef.current || isDragging}
      >
        <Image
          src='/teachers/right-arrow.png'
          alt=''
          width={68}
          height={50}
          className='w-[51.52px] h-[37.96px] lg:w-[68px] lg:h-[50px]'
        />
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className='flex select-none'
        style={{
          transform: `translateX(${translateX}%)`,
          transition:
            isDragging || isTransitioningRef.current
              ? 'none'
              : 'transform 0.4s ease-out',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
      >
        {infiniteCards.map((card, i) => (
          <div
            key={i}
            className='shrink-0'
            style={{ width: `${100 / cardsPerView}%` }}
          >
            <TeacherCard
              {...card}
              image={getVisualIndex(i) + 1}
              hasDraggedRef={hasDraggedRef}
              isDragging={isDragging}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeachersCarousel
