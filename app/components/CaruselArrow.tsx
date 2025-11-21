import Image from 'next/image'

interface Props {
  scrollTo?: () => void
  arrowDirection: 'left' | 'right'
  alt?: string
  arrowLow?: boolean
}

const CaruselArrow = ({
  scrollTo,
  arrowDirection,
  alt = 'Carusel Arrow',
  arrowLow = false,
}: Props) => {
  const styles = `absolute ${
    arrowDirection === 'left' ? 'left-4' : 'right-4'
  } ${
    arrowLow
      ? 'top-[46%] -translate-y-[46%]'
      : 'top-[40%] -translate-y-[40%] sm:top-1/2 sm:-translate-y-1/2'
  } z-20 hover:opacity-70 transition-opacity`

  return (
    <button onClick={scrollTo} className={styles} aria-label='Previous'>
      <Image
        src={`/teachers/${arrowDirection}-arrow.svg`}
        alt={alt}
        width={68}
        height={50}
        className='w-[51.52px] h-[37.96px] lg:w-[68px] lg:h-[50px]'
        loading='lazy'
      />
    </button>
  )
}

export default CaruselArrow
