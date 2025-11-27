import Image from 'next/image'
import Link from 'next/link'

// -----------------------------------------------------------------
// Hover-fade image
// -----------------------------------------------------------------
function CarouselImage({
  normal,
  hover,
  link,
  isDragging,
  dragDistance,
}: {
  normal: string
  hover: string
  link: string
  isDragging: boolean
  dragDistance: number
}) {
  const handleClick = (e: React.MouseEvent) => {
    // Only prevent if it was an actual drag (not just a click)
    if (isDragging || dragDistance > 5) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Otherwise, it's a normal click and the link will open
  }

  return (
    <Link
      href={link}
      target='_blank'
      className='group relative block w-full h-full'
      onClick={handleClick}
      draggable={false}
    >
      <Image
        src={normal}
        alt='carousel'
        width={0}
        height={0}
        className='w-full lg:w-auto h-auto object-cover transition-opacity duration-500 group-hover:opacity-0 static xl:min-w-92'
        sizes='(max-width: 768px) 50vw, (max-width: 1280px) 80vw'
        draggable={false}
        loading='lazy'
      />
      <Image
        src={hover}
        alt='carousel hover'
        width={0}
        height={0}
        className='absolute inset-0 w-full lg:w-auto h-auto object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 xl:min-w-92'
        sizes='(max-width: 768px) 50vw, (max-width: 1280px) 80vw'
        draggable={false}
        loading='lazy'
      />
    </Link>
  )
}

export default CarouselImage
