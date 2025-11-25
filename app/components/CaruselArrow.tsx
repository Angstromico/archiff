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
      ? 'top-[46%] -translate-y-[46%] lg:top-[48%] lg:-translate-y-[48%] xl:top-[38%] xl:-translate-y-[38%] 2xl:top-[42%] 2xl:-translate-y-[42%] 3xl:top-[46%] 3xl:-translate-y-[46%]'
      : 'top-[35%] -translate-y-[35%] sm:top-1/2 sm:-translate-y-1/2 xl:top-[45%] xl:-translate-y-[45%]'
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
