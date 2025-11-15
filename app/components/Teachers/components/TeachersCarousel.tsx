'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const cardsInfo = [
  { name: 'Ramón Esteve', type: 'Ramón Esteve Estudio' },
  { name: 'Eduardo Tazón y Antonio Mora', type: 'STUDIO.NOJU' },
  { name: 'Marcos Parera', type: 'Mesura' },
  { name: 'Juan Ranchal', type: 'Janfri & Ranchal Studio' },
  { name: 'ikér Ochotorena', type: 'OOAA Arquitectura' },
  { name: 'Sigfrido Serra', type: 'Sigfrido Serra Studio' },
  { name: 'Alberto Eltini', type: 'El Departamento' },
  { name: 'Ángela Montagud y Jordi Iranzo', type: 'Clap Studio' },
  { name: 'Francesc Rifé', type: 'Francesc Rifé Studio' },
  { name: 'Enric Pastor', type: 'Fundador y editor de MANERA EDICIONES' },
  { name: 'Albert Gil', type: 'CEO de Batlle i Roig' },
  { name: 'Hernani Fernández', type: 'Fundador de Arqueha' },
]

const TeachersCarousel = () => {
  const [index, setIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [pointerId, setPointerId] = useState<number | null>(null)
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

  const totalCards = cardsInfo.length
  const maxIndex = totalCards - cardsPerView

  // Arrow navigation
  const goPrev = () => {
    setIndex((i) => Math.max(0, i - 1))
    setDragOffset(0)
  }

  const goNext = () => {
    setIndex((i) => Math.min(maxIndex, i + 1))
    setDragOffset(0)
  }

  // Drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setPointerId(e.pointerId)
    trackRef.current?.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || pointerId === null) return
    const delta = e.clientX - startX
    const containerWidth = trackRef.current?.offsetWidth || 1
    const offsetInSlots = delta / (containerWidth / cardsPerView)
    setDragOffset(offsetInSlots)
  }

  const handlePointerUp = () => {
    if (!isDragging || pointerId === null || !trackRef.current) return
    setIsDragging(false)
    trackRef.current.releasePointerCapture(pointerId)
    setPointerId(null)

    const threshold = 0.3
    let newIndex = index
    if (dragOffset > threshold) newIndex = Math.max(0, index - 1)
    else if (dragOffset < -threshold) newIndex = Math.min(maxIndex, index + 1)
    else newIndex = index

    setIndex(newIndex)
    setDragOffset(0)
  }

  const translateX = -(index + dragOffset) * (100 / cardsPerView)

  return (
    <section className='relative w-full overflow-hidden'>
      {/* Fade gradients */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10' />

      {/* Left Arrow */}
      <button
        onClick={goPrev}
        disabled={index === 0}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-20 disabled:opacity-30'
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
        disabled={index >= maxIndex}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 disabled:opacity-30 cursor-pointer'
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
          transition: isDragging ? 'none' : 'transform 0.4s ease-out',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {[...cardsInfo].map((card, i) => (
          <div
            key={i}
            className='shrink-0'
            style={{ width: `${100 / cardsPerView}%` }}
          >
            <TeacherCard {...card} image={i + 1} />
          </div>
        ))}
      </div>
    </section>
  )
}

// Teacher Card Component
const TeacherCard = ({
  name,
  type,
  image,
}: {
  name: string
  type: string
  image: number
}) => {
  return (
    <Link
      className='border-y-2 lg:border-y-3 border-x lg:border-x-[1.5px] border-black block'
      href='https://www.google.com'
      target='_blank'
    >
      <Image
        src={`/teachers/${image}.png`}
        alt={name}
        width={443}
        height={296}
        className='w-full h-auto object-cover block'
        style={{
          maxWidth: '100%',
        }}
      />
      <div className='p-4 lg:p-6 border-t-2 lg:border-t-3 border-black h-[100px] lg:h-[150px]'>
        <h3 className='font-bold text-2xl lg:text-4xl leading-tight'>{name}</h3>
        <p className='text-xl lg:text-2xl mt-1'>{type}</p>
      </div>
    </Link>
  )
}

export default TeachersCarousel
