'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'
import FadeGradients from './FadeGradients'
import { FormationCardProps } from '../data/CarruselData'

interface BaseCardProps {
  name: string
  type: string
}

export interface FormationCardInfo extends BaseCardProps {
  hours: number
  label?: string
  title: string
  teacher: string
  price: number
}

interface CommonCardProps extends FormationCardInfo {
  image: number
  hasDraggedRef: React.MutableRefObject<boolean>
  isDragging: boolean
}

interface CarouselProps<T extends BaseCardProps> {
  cardsInfo: T[] | FormationCardProps[]
  CardComponent: (props: T & CommonCardProps) => ReactNode
  useFadeGradients?: boolean
  borderClass?: string
}

const Carousel = <T extends { name: string; type: string }>({
  cardsInfo,
  CardComponent,
  useFadeGradients = true,
  borderClass = '',
}: CarouselProps<T>) => {
  const totalCards = cardsInfo.length
  const [currentIndex, setCurrentIndex] = useState(totalCards)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const hasDraggedRef = useRef(false)
  const startIndexRef = useRef(totalCards)
  const isTransitioningRef = useRef(false)

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

  const infiniteCards = [...cardsInfo, ...cardsInfo, ...cardsInfo]

  const getVisualIndex = (index: number) =>
    ((index % totalCards) + totalCards) % totalCards

  const normalizeIndex = (index: number) => {
    if (index < totalCards) return index + totalCards
    if (index >= totalCards * 2) return index - totalCards
    return index
  }

  const goPrev = () => {
    if (isTransitioningRef.current || isDragging) return
    setCurrentIndex((prev) => normalizeIndex(prev - 1))
  }

  const goNext = () => {
    if (isTransitioningRef.current || isDragging) return
    setCurrentIndex((prev) => normalizeIndex(prev + 1))
  }

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

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || isTransitioningRef.current) return
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentTranslate(0)
    hasDraggedRef.current = false
    startIndexRef.current = currentIndex
    if (trackRef.current) trackRef.current.style.transition = 'none'
    e.preventDefault()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isTransitioningRef.current) return
    const deltaX = e.clientX - startX
    if (Math.abs(deltaX) > 5) hasDraggedRef.current = true
    const containerWidth = trackRef.current?.offsetWidth || window.innerWidth
    const slideWidthPixels = containerWidth / cardsPerView
    const slidesMoved = deltaX / slideWidthPixels
    const resistance = 0.5
    const translatePercent = slidesMoved * (100 / cardsPerView) * resistance
    setCurrentTranslate(translatePercent)
  }

  const handlePointerUp = () => {
    if (!isDragging || isTransitioningRef.current) return
    const finalTranslate = currentTranslate
    const slideWidthPercent = 100 / cardsPerView
    const slidesMoved = -finalTranslate / slideWidthPercent
    let slidesToMove = Math.round(slidesMoved)
    if (Math.abs(slidesMoved) > 0.3 && slidesToMove === 0) {
      slidesToMove = slidesMoved > 0 ? 1 : -1
    }
    const targetIndex = startIndexRef.current + slidesToMove
    setCurrentIndex(normalizeIndex(targetIndex))
    setIsDragging(false)
    setCurrentTranslate(0)
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s ease-out'
    }
  }

  const slideWidthPercent = 100 / cardsPerView
  const translateX = -currentIndex * slideWidthPercent + currentTranslate

  return (
    <section className={`relative w-full overflow-hidden ${borderClass}`}>
      {useFadeGradients && <FadeGradients />}
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
          className='w-[51.52px] h-[37.96px] lg:w-[68px] lg:h-[50px]'
        />
      </button>
      <button
        onClick={goNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity disabled:opacity-30'
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
            <CardComponent
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

export default Carousel
