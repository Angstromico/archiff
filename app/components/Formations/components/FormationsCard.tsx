'use client'

import Image from 'next/image'
import Link from 'next/link'

const FormationsCard = ({
  image,
  hasDraggedRef,
  isDragging,
  hours,
  label,
  title,
  teacher,
  price,
}: {
  image: number
  hasDraggedRef: React.MutableRefObject<boolean>
  isDragging: boolean
  hours: number
  label?: string
  title: string
  teacher: string
  price: number
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current || isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }
    hasDraggedRef.current = false
  }

  return (
    <div className='h-full w-full'>
      <Link
        className='border-y-2 lg:border-y-3 border-x lg:border-x-[1.5px] border-black block h-full group hover:bg-gray-50 transition-colors duration-200'
        href='https://www.google.com'
        target='_blank'
        onClick={handleClick}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      >
        <Image
          src={`/formations/${image}.png`}
          alt={'Formación'}
          width={406}
          height={307}
          className='w-full h-72 lg:h-80 object-cover block pointer-events-none select-none group-hover:opacity-90 transition-opacity duration-200 min-h-[262px] lg:min-h-[307px]'
          style={{
            maxWidth: '100%',
          }}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          loading='lazy'
        />
        <div className='p-4 lg:p-6 border-t-2 lg:border-t-3 border-black h-74 lg:h-94 xl:h-[385px] select-none relative'>
          <div className='flex justify-between mb-3.5 lg:mb-5'>
            <p className='text-xl lg:text-lg 2xl:text-xl'>{hours} Horas</p>
            {label && (
              <p
                className='text-[#2222C2] text-[12px] lg:text-[10px] 2xl:text-[12px] border-[#2222C2] border absolute lg:static top-2 right-8 text-center h-6 flex flex-col items-center pt-0.5 lg:py-1 2xl:pt-0.5'
                style={{ width: `${label.length > 5 ? '104px' : '56px'}` }}
              >
                {label}
              </p>
            )}
          </div>
          <h3 className='font-bold text-2xl 2xl:text-3xl leading-tight pointer-events-none group-hover:underline group-hover:underline-offset-4 group-hover:decoration-2 transition-all duration-200'>
            {title}
          </h3>
          <h4 className='mt-2 text-[16px] 3xl:text-[20px]'>{teacher}</h4>
          <p className='serotiva mt-2 lg:mt-3 text-[#2222C2] hidden lg:block text-3xl'>
            {price}€
          </p>
          <button className='hidden lg:block absolute bottom-6 left-6 border p-1 w-32 h-10 rounded-full text-xl'>
            + Ver más
          </button>
        </div>
      </Link>
    </div>
  )
}

export default FormationsCard
