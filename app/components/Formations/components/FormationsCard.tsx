'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMaxImageHeight } from '@/app/hooks/useMaxImageHeight'

const FormationsCard = ({
  image,
  hasDraggedRef,
  isDragging,
  hours,
  label,
  title,
  teacher,
  price,
  link,
}: {
  image: number
  hasDraggedRef: React.MutableRefObject<boolean>
  isDragging: boolean
  hours: number
  label?: string
  title: string
  teacher: string
  price: number
  link: string
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current || isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }
    hasDraggedRef.current = false
  }

  const maxHeight = useMaxImageHeight('formation-image')

  return (
    <div className='h-full w-full'>
      <Link
        className='border-y-2 lg:border-y-3 border-x lg:border-x-[1.5px] border-black block h-full group hover:bg-gray-50 transition-colors duration-200'
        href={link}
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
          className='w-full object-cover block pointer-events-none select-none group-hover:opacity-90 transition-opacity duration-200 formation-image'
          style={{
            maxWidth: '100%',
            height: maxHeight ? `${maxHeight}px` : 'auto',
          }}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          loading='lazy'
        />
        <div className='p-4 border-t-2 lg:border-t-3 border-black h-74 lg:h-94 xl:h-[385px] select-none relative'>
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
          <h3 className='font-bold text-2xl 2xl:text-3xl pointer-events-none group-hover:underline group-hover:underline-offset-4 group-hover:decoration-2 transition-all duration-200 leading-[109%]'>
            {title}
          </h3>
          <h4 className='mt-2 text-[16px] 3xl:text-[20px] leading-[109%]'>
            {teacher}
          </h4>
          <p className='serotiva mt-2 lg:mt-3 text-[#2222C2] hidden lg:block text-3xl'>
            {price}€
          </p>
          <button className='absolute bottom-6 left-6 border p-1 w-28 h-8 lg:w-32 lg:h-10 rounded-full text-base lg:text-xl'>
            + Ver más
          </button>
        </div>
      </Link>
    </div>
  )
}

export default FormationsCard
