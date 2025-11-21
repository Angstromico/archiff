import Link from 'next/link'
import Image from 'next/image'
import type { MasterList } from './interfaces'

const MastersInfoMobile = ({
  item,
  frameNumbers,
  frames,
  index,
}: MasterList) => {
  return (
    <>
      <Link
        href={item.link}
        target='_blank'
        className='md:hidden grid grid-cols-2 gap-4 items-start px-4 w-full'
      >
        {/* DATE */}
        <div>
          <p className='text-[#666] text-sm font-medium'>Inicio</p>
          <p className='text-2xl'>{item.date}</p>
        </div>

        {/* IMAGE */}
        <div className='flex w-full justify-end'>
          <div className='relative w-[125px] h-[61px] overflow-visible'>
            {/* Render ALL 4 images stacked, toggle opacity */}
            {frameNumbers.map((num, fIndex) => (
              <Image
                key={num}
                src={`/masters/hover-images/part${index + 1}-${num}.png`}
                alt=''
                width={125}
                height={61}
                className={`
                      absolute inset-0 right-0
                      transition-opacity duration-1000 ease-in-out
                      ${
                        frames[index] === fIndex
                          ? 'opacity-100 z-10'
                          : 'opacity-0 z-0'
                      }
                    `}
              />
            ))}

            <Image
              src='/masters/arrow.svg'
              alt='arrow'
              width={41}
              height={30}
              className='
                    absolute 
                    -bottom-12
                    right-0
                    transition-transform duration-300
                    group-hover:translate-x-1
                    z-20
                    '
            />
          </div>
        </div>
      </Link>

      {/* MOBILE INFO */}
      <div className='md:hidden mt-4 px-4'>
        <p className='text-[#666] text-sm'>{item.type}</p>
        <p className='text-3xl underline-offset-4 group-hover:underline cursor-pointer max-w-50 sm:max-w-[400px] md:max-w-full wrap-break-word pb-2'>
          {item.title}
        </p>
      </div>
    </>
  )
}

export default MastersInfoMobile
