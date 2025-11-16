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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const dragDistanceRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const startIndexRef = useRef(0)

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

  const totalCards = cardsInfo.length

  // Create infinite array with enough duplicates for smooth looping
  const infiniteCards = [...cardsInfo, ...cardsInfo, ...cardsInfo, ...cardsInfo]

  // Calculate the visual index for infinite loop
  const getVisualIndex = (index: number) => {
    return ((index % totalCards) + totalCards) % totalCards
  }

  // Arrow navigation with smooth infinite loop
  const goPrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1
      // If we go below 0, jump to the equivalent position in the duplicated section
      if (newIndex < 0) {
        return newIndex + totalCards
      }
      return newIndex
    })
  }

  const goNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1
      // If we go beyond original length, jump to the equivalent position in the duplicated section
      if (newIndex >= totalCards) {
        return newIndex - totalCards
      }
      return newIndex
    })
  }

  // Smooth animation for drag
  useEffect(() => {
    const animate = () => {
      if (trackRef.current) {
        const slideWidthPercent = 100 / cardsPerView
        const translateX = -currentIndex * slideWidthPercent + currentTranslate
        trackRef.current.style.transform = `translateX(${translateX}%)`
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [currentIndex, currentTranslate, cardsPerView])

  // Improved drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return

    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentTranslate(0)
    dragDistanceRef.current = 0
    hasDraggedRef.current = false
    startIndexRef.current = currentIndex

    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
    }
    e.preventDefault()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    dragDistanceRef.current = Math.abs(deltaX)

    if (dragDistanceRef.current > 5) {
      hasDraggedRef.current = true
    }

    // Calculate drag distance in terms of slides
    const containerWidth = trackRef.current?.offsetWidth || window.innerWidth
    const slideWidthPixels = containerWidth / cardsPerView
    const slidesMoved = deltaX / slideWidthPixels

    // Apply resistance for smoother feeling
    const resistance = 0.6 // Lower = more resistance
    const resistedSlidesMoved = slidesMoved * resistance

    // Convert to percentage for translation
    const translatePercent = resistedSlidesMoved * (100 / cardsPerView)

    setCurrentTranslate(translatePercent)
  }

  const handlePointerUp = () => {
    if (!isDragging) return

    const containerWidth = trackRef.current?.offsetWidth || window.innerWidth
    const slideWidthPixels = containerWidth / cardsPerView
    const deltaX = dragDistanceRef.current * (currentTranslate > 0 ? 1 : -1)
    const slidesMoved = deltaX / slideWidthPixels

    // Calculate new index based on drag distance
    let slidesToMove = Math.round(slidesMoved)

    // Apply momentum - allow moving multiple cards based on drag speed
    const dragSpeed = Math.abs(slidesMoved)
    if (dragSpeed > 0.8) {
      slidesToMove = Math.round(slidesMoved * 1.2) // Add momentum
    }

    let newIndex = startIndexRef.current - slidesToMove

    // Infinite loop logic - wrap around seamlessly
    if (newIndex < 0) {
      newIndex = totalCards + (newIndex % totalCards)
    } else if (newIndex >= totalCards) {
      newIndex = newIndex % totalCards
    }

    // Ensure index is within bounds
    newIndex = ((newIndex % totalCards) + totalCards) % totalCards

    setCurrentIndex(newIndex)
    setIsDragging(false)
    setCurrentTranslate(0)
    dragDistanceRef.current = 0

    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s ease-out'
    }
  }

  const slideWidthPercent = 100 / cardsPerView
  const translateX = -currentIndex * slideWidthPercent + currentTranslate

  return (
    <section className='relative w-full overflow-hidden border-x-2'>
      {/* Fade gradients */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10' />

      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity'
        aria-label='Previous'
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
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity cursor-pointer'
        aria-label='Next'
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
          transition: isDragging ? 'none' : 'transform 0.4s ease-out',
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
