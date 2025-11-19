'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
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
  parts?: 4 | 5
}

const Carousel = <T extends BaseCardProps>({
  cardsInfo,
  CardComponent,
  useFadeGradients = true,
  borderClass = '',
  parts = 4,
}: CarouselProps<T>) => {
  const [windowWidth, setWindowWidth] = useState(0)

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize() // initial
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isFourParts = parts === 4
  const slideWidth =
    parts === 5 && windowWidth >= 1468
      ? '20%' // show 5 full parts
      : '25%' // fallback to 4 parts

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
      <button
        onClick={scrollPrev}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity'
        aria-label='Previous'
      >
        <Image
          src='/teachers/left-arrow.svg'
          alt=''
          width={68}
          height={50}
          className='w-[51.52px] h-[37.96px] lg:w-[68px] lg:h-[50px]'
          loading='lazy'
        />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 hover:opacity-70 transition-opacity'
        aria-label='Next'
      >
        <Image
          src='/teachers/right-arrow.svg'
          alt=''
          width={68}
          height={50}
          className='w-[51.52px] h-[37.96px] lg:w-[68px] lg:h-[50px]'
          loading='lazy'
        />
      </button>

      {/* Embla Carousel */}
      <div
        className='embla'
        ref={emblaRef}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          ...(isFourParts && {
            paddingLeft: '40px',
            paddingRight: '40px',
          }),
        }}
      >
        <div className='embla__container'>
          {cardsInfo.map((card, index) => (
            <div
              className='embla__slide'
              key={index}
              style={{
                width: slideWidth, // ⬅ override del media query desktop
              }}
            >
              {/* @ts-expect-error - This is a valid operation */}
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
