'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMaxImageHeight } from '@/app/hooks/useMaxImageHeight'

const TeacherCard = ({
  name,
  type,
  image,
  link,
  hasDraggedRef,
  isDragging,
}: {
  name: string
  type: string
  image: number
  link: string
  hasDraggedRef: React.MutableRefObject<boolean>
  isDragging: boolean
}) => {
  const maxHeight = useMaxImageHeight('teacher-image')

  const handleClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current || isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }
    hasDraggedRef.current = false
  }

  return (
    <div className='h-full'>
      <Link
        className='border-y-2 lg:border-y-3 border-x lg:border-x-[1.5px] border-black block h-full group hover:bg-gray-50 transition-colors duration-200'
        href={link}
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
          className='w-full h-auto object-cover block pointer-events-none select-none group-hover:opacity-90 transition-opacity duration-200 teacher-image'
          style={{
            maxWidth: '100%',
            height: maxHeight ? `${maxHeight}px` : 'auto',
          }}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          loading='lazy'
        />
        <div className='p-4 lg:p-6 border-t-2 lg:border-t-3 border-black h-[120px] lg:h-[170px] select-none'>
          <h3 className='font-bold text-2xl lg:text-3xl 2xl:text-4xl leading-[109%] pointer-events-none group-hover:underline group-hover:underline-offset-4 group-hover:decoration-2 transition-all duration-200'>
            {name}
          </h3>
          <p className='text-xl 2xl:text-2xl mt-1 pointer-events-none'>
            {type}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default TeacherCard
