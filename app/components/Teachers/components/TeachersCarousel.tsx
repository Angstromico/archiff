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
  // Start in the middle copy for seamless loop
  const [currentIndex, setCurrentIndex] = useState(totalCards)

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [dragDistance, setDragDistance] = useState(0)

  // Refs
  const trackRef = useRef<HTMLDivElement>(null)
  const hasDraggedRef = useRef(false)

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

  // Handle looping when animation completes
  useEffect(() => {
    if (isDragging) return

    // If we're in the first copy, jump to middle copy
    if (currentIndex < totalCards) {
      const timer = setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = 'none'
          setCurrentIndex(currentIndex + totalCards)
          // Force reflow
          trackRef.current.offsetHeight
          requestAnimationFrame(() => {
            if (trackRef.current) {
              trackRef.current.style.transition = 'transform 0.4s ease-out'
            }
          })
        }
      }, 450) // Slightly after transition ends
      return () => clearTimeout(timer)
    }

    // If we're in the third copy, jump to middle copy
    if (currentIndex >= totalCards * 2) {
      const timer = setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = 'none'
          setCurrentIndex(currentIndex - totalCards)
          // Force reflow
          trackRef.current.offsetHeight
          requestAnimationFrame(() => {
            if (trackRef.current) {
              trackRef.current.style.transition = 'transform 0.4s ease-out'
            }
          })
        }
      }, 450)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, isDragging, totalCards])

  // Arrow navigation
  const goPrev = () => {
    if (isDragging) return
    setCurrentIndex((prev) => prev - 1)
  }

  const goNext = () => {
    if (isDragging) return
    setCurrentIndex((prev) => prev + 1)
  }

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return

    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentTranslate(0)
    setDragDistance(0)
    hasDraggedRef.current = false

    e.preventDefault()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    const absDelta = Math.abs(deltaX)

    setDragDistance(absDelta)

    if (absDelta > 5) {
      hasDraggedRef.current = true
    }

    // Calculate drag offset as percentage
    const containerWidth = trackRef.current?.offsetWidth || window.innerWidth
    const translatePercent = (deltaX / containerWidth) * 100

    setCurrentTranslate(translatePercent)
  }

  const handlePointerUp = () => {
    if (!isDragging) return

    const slideWidthPercent = 100 / cardsPerView
    const slidesMoved = currentTranslate / slideWidthPercent

    let newIndex = currentIndex

    // Determine if we should snap to next/prev slide
    if (Math.abs(slidesMoved) > 0.3) {
      if (slidesMoved > 0) {
        // Dragged right -> go previous
        newIndex = currentIndex - Math.ceil(Math.abs(slidesMoved))
      } else {
        // Dragged left -> go next
        newIndex = currentIndex + Math.ceil(Math.abs(slidesMoved))
      }
    }

    setCurrentIndex(newIndex)
    setIsDragging(false)
    setCurrentTranslate(0)

    // Reset drag flag after a short delay to allow click detection
    setTimeout(() => {
      hasDraggedRef.current = false
      setDragDistance(0)
    }, 100)
  }

  const slideWidthPercent = 100 / cardsPerView
  const translateX = -currentIndex * slideWidthPercent + currentTranslate

  return (
    <section className='relative w-full overflow-hidden'>
      {/* Fade gradients */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10' />

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
          touchAction: 'pan-y',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
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
              dragDistance={dragDistance}
              hasDraggedRef={hasDraggedRef}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeachersCarousel
