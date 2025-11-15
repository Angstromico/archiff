import Image from 'next/image'
import Link from 'next/link'

const TeacherCard = ({
  name,
  type,
  image,
  hasDraggedRef,
  isDragging,
}: {
  name: string
  type: string
  image: number
  hasDraggedRef: React.MutableRefObject<boolean>
  isDragging: boolean
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Solo prevenir si hubo un arrastre significativo O si estamos arrastrando actualmente
    if (hasDraggedRef.current || isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }

    // Resetear la referencia después de procesar el click
    hasDraggedRef.current = false
  }

  return (
    <div className='h-full'>
      <Link
        className='border-y-2 lg:border-y-3 border-x lg:border-x-[1.5px] border-black block h-full'
        href='https://www.google.com'
        target='_blank'
        onClick={handleClick}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
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

export default TeacherCard
