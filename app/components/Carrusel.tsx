'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import FadeGradients from './FadeGradients'
import CaruselArrow from './CaruselArrow'
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

interface CarouselProps<T extends BaseCardProps> {
  cardsInfo: T[] | FormationCardProps[]
  CardComponent: any
  useFadeGradients?: boolean
  borderClass?: string
  parts?: 4 | 5
}

const Carousel = <T extends BaseCardProps>({
  cardsInfo,
  CardComponent,
  useFadeGradients = true,
  borderClass = '',
  parts = 4,
}: CarouselProps<T>) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth <= 400)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const isFourParts = parts === 4
  const slideClass =
    parts === 5
      ? 'embla__slide five' // 5 slides on desktop
      : 'embla__slide' // 4 slides on desktop

  const hasDraggedRef = useRef(false)
  const [isDragging] = useState(false)

  // Embla configuration
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  })

  // Arrow navigation
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  // Dragging state management
  useEffect(() => {
    if (!emblaApi) return

    const handleSelect = () => (hasDraggedRef.current = true)

    emblaApi.on('select', handleSelect)

    return () => {
      emblaApi.off('select', handleSelect)
    }
  }, [emblaApi])

  return (
    <section className={`relative w-full overflow-hidden ${borderClass}`}>
      {useFadeGradients && <FadeGradients />}

      {/* Left Arrow */}
      <CaruselArrow
        arrowDirection='left'
        scrollTo={scrollPrev}
        alt='Carusel Arrow Left'
      />

      {/* Right Arrow */}
      <CaruselArrow
        arrowDirection='right'
        scrollTo={scrollNext}
        alt='Carusel Arrow Right'
      />

      {/* Embla Carousel */}
      <div
        className='embla'
        ref={emblaRef}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          ...((isFourParts || (!isFourParts && isSmallScreen)) && {
            paddingLeft: '30px',
            paddingRight: '30px',
          }),
        }}
      >
        <div className='embla__container'>
          {cardsInfo.map((card, index) => (
            <div className={slideClass} key={index}>
              <CardComponent
                {...card}
                image={index + 1}
                hasDraggedRef={hasDraggedRef}
                isDragging={isDragging}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel
