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
  const dragDistanceRef = useRef(0) // Usamos useRef para mantener el valor entre renders
  const hasDraggedRef = useRef(false) // Nueva referencia para trackear si hubo drag

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

  useEffect(() => {
    // Smooth animation for drag
    const animate = () => {
      if (trackRef.current) {
        const translateX =
          -currentIndex * (100 / cardsPerView) + currentTranslate
        trackRef.current.style.transform = `translateX(${translateX}%)`
      }
      animationRef.current = requestAnimationFrame(animate)
    }

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
    dragDistanceRef.current = 0
    hasDraggedRef.current = false // Resetear al inicio del drag

    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
    }

    // Prevenir selección de texto durante el arrastre
    e.preventDefault()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    dragDistanceRef.current = Math.abs(deltaX)

    // Marcar que hubo drag si se movió más de 5px
    if (dragDistanceRef.current > 5) {
      hasDraggedRef.current = true
    }

    // Calcular el desplazamiento en porcentaje del viewport
    const containerWidth = trackRef.current?.offsetWidth || window.innerWidth
    const translatePercent = (deltaX / containerWidth) * 100

    setCurrentTranslate(translatePercent)
  }

  const handlePointerUp = () => {
    if (!isDragging) return

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

    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s ease-out'
    }
  }

  const translateX = -currentIndex * (100 / cardsPerView) + currentTranslate

  return (
    <section className='relative w-full overflow-hidden border-x-2'>
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
              image={getAdjustedIndex(i) + 1}
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
