import Link from 'next/link'
import Image from 'next/image'
import type { MasterList } from './interfaces'

const MastersInfoDesktop = ({
  item,
  frameNumbers,
  frames,
  index,
}: MasterList) => {
  return (
    <Link
      href={item.link}
      target='_blank'
      className='hidden md:grid grid-cols-10 gap-2 px-6 items-start'
    >
      <div className='col-span-2'>
        <p className='text-[#666] text-[16px] font-medium'>Inicio</p>
        <p className='text-3xl'>{item.date}</p>
      </div>

      <div className='col-span-4'>
        <p className='text-[#666] text-[16px]'>{item.type}</p>
        <p className='text-3xl 2xl:text-4xl group-hover:underline underline-offset-4 cursor-pointer transition-all leading-[110%]'>
          {item.title}
        </p>
      </div>

      <div className='flex items-end justify-end gap-4 group cursor-pointer col-span-4'>
        <Image
          src='/masters/arrow.svg'
          alt='arrow'
          width={68}
          height={50}
          className='transition-transform duration-300 group-hover:translate-x-1 w-14 h-9 2xl:w-[68px] mb-2 2xl:mb-0 2xl:h-[50px]'
        />

        <div className='relative w-[290px] h-[140px]'>
          {/* Render ALL 4 images stacked, toggle opacity */}
          {frameNumbers.map((num, fIndex) => (
            <Image
              key={num}
              src={`/masters/hover-images/part${index + 1}-${num}.png`}
              alt='parts'
              width={296}
              height={144}
              className={`
                      absolute inset-0 
                      max-w-[90%] 2xl:max-w-full
                      transition-opacity duration-1000 ease-in-out
                      ${
                        frames[index] === fIndex
                          ? 'opacity-100 z-10'
                          : 'opacity-0 z-0'
                      }
                    `}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default MastersInfoDesktop
