'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
  const [currentX, setCurrentX] = useState(0)
  const [dragDistance, setDragDistance] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

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

  // Infinite carousel logic
  const totalCards = cardsInfo.length
  const infiniteCards = [...cardsInfo, ...cardsInfo, ...cardsInfo] // Triple for smooth infinite

  // Calculate the middle section for infinite loop
  const getAdjustedIndex = (index: number) => {
    return ((index % totalCards) + totalCards) % totalCards
  }

  // Arrow navigation
  const goPrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1
      if (newIndex < 0) {
        // Jump to the middle section smoothly
        setTimeout(() => {
          setCurrentIndex(totalCards - 1)
        }, 50)
        return newIndex
      }
      return newIndex
    })
  }

  const goNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1
      if (newIndex >= totalCards) {
        // Jump to the middle section smoothly
        setTimeout(() => {
          setCurrentIndex(0)
        }, 50)
        return newIndex
      }
      return newIndex
    })
  }

  // Drag handling - FIXED
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
    setDragDistance(0)
    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    setCurrentX(e.clientX)
    setDragDistance(Math.abs(deltaX))

    // Update transform in real-time during drag
    if (trackRef.current) {
      const translateX =
        -currentIndex * (100 / cardsPerView) +
        deltaX / (trackRef.current.offsetWidth / cardsPerView)
      trackRef.current.style.transform = `translateX(${translateX}%)`
    }
  }

  const handlePointerUp = () => {
    if (!isDragging) return

    const deltaX = currentX - startX
    const dragThreshold = 50 // pixels threshold to change slide

    if (Math.abs(deltaX) > dragThreshold) {
      if (deltaX > 0) {
        // Drag right - go previous
        goPrev()
      } else {
        // Drag left - go next
        goNext()
      }
    } else {
      // Return to current position
      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 0.4s ease-out'
        trackRef.current.style.transform = `translateX(${
          -currentIndex * (100 / cardsPerView)
        }%)`
      }
    }

    setIsDragging(false)
    setDragDistance(0)
  }

  // Reset transition after drag
  useEffect(() => {
    if (!isDragging && trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s ease-out'
    }
  }, [isDragging])

  const translateX = -currentIndex * (100 / cardsPerView)

  return (
    <section className='relative w-full overflow-hidden'>
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
        className='flex'
        style={{
          transform: `translateX(${translateX}%)`,
          transition: 'transform 0.4s ease-out',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {infiniteCards.map((card, i) => (
          <div
            key={i}
            className='shrink-0'
            style={{ width: `${100 / cardsPerView}%` }}
          >
            <TeacherCard
              {...card}
              image={getAdjustedIndex(i) + 1}
              dragDistance={dragDistance}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

// Teacher Card Component - FIXED click handling
const TeacherCard = ({
  name,
  type,
  image,
  dragDistance,
}: {
  name: string
  type: string
  image: number
  dragDistance: number
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Only prevent if it was a significant drag
    if (dragDistance > 10) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Otherwise, it's a normal click and the link will open
  }

  return (
    <Link
      className='border-y-2 lg:border-y-3 border-x lg:border-x-[1.5px] border-black block'
      href='https://www.google.com'
      target='_blank'
      onClick={handleClick}
    >
      <Image
        src={`/teachers/${image}.png`}
        alt={name}
        width={443}
        height={296}
        className='w-full h-auto object-cover block pointer-events-none'
        style={{
          maxWidth: '100%',
        }}
        draggable={false}
      />
      <div className='p-4 lg:p-6 border-t-2 lg:border-t-3 border-black h-[100px] lg:h-[150px]'>
        <h3 className='font-bold text-2xl lg:text-4xl leading-tight'>{name}</h3>
        <p className='text-xl lg:text-2xl mt-1'>{type}</p>
      </div>
    </Link>
  )
}

export default TeachersCarousel
