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
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [dragDistance, setDragDistance] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)

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
  const infiniteCards = [...cardsInfo, ...cardsInfo, ...cardsInfo]

  // Calculate the middle section for infinite loop
  const getAdjustedIndex = (index: number) => {
    return ((index % totalCards) + totalCards) % totalCards
  }

  // Arrow navigation
  const goPrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1
      if (newIndex < 0) {
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
        setTimeout(() => {
          setCurrentIndex(0)
        }, 50)
        return newIndex
      }
      return newIndex
    })
  }

  // Smooth animation for drag
  const animate = () => {
    if (trackRef.current) {
      const translateX = -currentIndex * (100 / cardsPerView) + currentTranslate
      trackRef.current.style.transform = `translateX(${translateX}%)`
    }
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [currentIndex, currentTranslate, cardsPerView])

  // Drag handling - MEJORADO
  const handlePointerDown = (e: React.PointerEvent) => {
    // Solo capturar el evento si es el botón principal del mouse
    if (e.button !== 0) return

    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentTranslate(0)
    setDragDistance(0)
    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
    }

    // Prevenir selección de texto durante el arrastre
    e.preventDefault()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    setDragDistance(Math.abs(deltaX))

    // Calcular el desplazamiento en porcentaje del viewport
    const containerWidth = trackRef.current?.offsetWidth || window.innerWidth
    const translatePercent = (deltaX / containerWidth) * 100

    setCurrentTranslate(translatePercent)
  }

  const handlePointerUp = () => {
    if (!isDragging) return

    const containerWidth = trackRef.current?.offsetWidth || window.innerWidth
    const slideWidthPercent = 100 / cardsPerView
    const dragOffsetSlides = currentTranslate / slideWidthPercent

    let newIndex = currentIndex
    if (Math.abs(dragOffsetSlides) > 0.3) {
      if (dragOffsetSlides > 0) {
        // Drag right - go previous
        newIndex = currentIndex - 1
      } else {
        // Drag left - go next
        newIndex = currentIndex + 1
      }
    }

    // Aplicar límites y lógica infinita
    if (newIndex < 0) {
      setCurrentIndex(totalCards - 1)
    } else if (newIndex >= totalCards) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(newIndex)
    }

    // Reset
    setIsDragging(false)
    setCurrentTranslate(0)
    setDragDistance(0)

    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s ease-out'
    }
  }

  const translateX = -currentIndex * (100 / cardsPerView) + currentTranslate

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
        className='flex select-none' // Agregado select-none para prevenir selección de texto
        style={{
          transform: `translateX(${translateX}%)`,
          transition: isDragging ? 'none' : 'transform 0.4s ease-out',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDragStart={(e) => e.preventDefault()} // Prevenir drag nativo
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
              isDragging={isDragging}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

// Teacher Card Component - MEJORADO para prevenir interferencia de eventos
const TeacherCard = ({
  name,
  type,
  image,
  dragDistance,
  isDragging,
}: {
  name: string
  type: string
  image: number
  dragDistance: number
  isDragging: boolean
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Solo prevenir si fue un arrastre significativo O si estamos arrastrando actualmente
    if (dragDistance > 10 || isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div className='h-full'>
      {' '}
      {/* Contenedor adicional para el arrastre */}
      <Link
        className='border-y-2 lg:border-y-3 border-x lg:border-x-[1.5px] border-black block h-full'
        href='https://www.google.com'
        target='_blank'
        onClick={handleClick}
        draggable={false}
        onDragStart={(e) => e.preventDefault()} // Prevenir drag nativo del Link
      >
        <Image
          src={`/teachers/${image}.png`}
          alt={name}
          width={443}
          height={296}
          className='w-full h-auto object-cover block pointer-events-none select-none'
          style={{
            maxWidth: '100%',
          }}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
        <div className='p-4 lg:p-6 border-t-2 lg:border-t-3 border-black h-[100px] lg:h-[150px] select-none'>
          <h3 className='font-bold text-2xl lg:text-4xl leading-tight pointer-events-none'>
            {name}
          </h3>
          <p className='text-xl lg:text-2xl mt-1 pointer-events-none'>{type}</p>
        </div>
      </Link>
    </div>
  )
}

export default TeachersCarousel
