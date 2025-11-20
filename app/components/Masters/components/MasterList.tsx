'use client'

import Image from 'next/image'
import { mastersListInfo } from '@/app/data/MastersData'
import { useEffect, useState } from 'react'

const MastersList = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [frames, setFrames] = useState<number[]>(
    Array(mastersListInfo.length).fill(0)
  )

  useEffect(() => {
    if (hoveredIndex === null) return

    const interval = setInterval(() => {
      setFrames((prev) => {
        const newFrames = [...prev]
        newFrames[hoveredIndex] = (newFrames[hoveredIndex] + 1) % 4
        return newFrames
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [hoveredIndex])

  return (
    <div className='w-full mt-5'>
      {mastersListInfo.map((item, index) => (
        <div
          key={index}
          className={`group border-t-2 lg:border-t-[3px] border-black py-8 ${
            index === mastersListInfo.length - 1
              ? 'border-b-2 lg:border-b-[3px]'
              : ''
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* MOBILE */}
          <div className='lg:hidden grid grid-cols-2 gap-4 items-start px-4'>
            {/* DATE */}
            <div>
              <p className='text-[#666] text-[14px] font-medium'>Inicio</p>
              <p className='text-[24px] font-semibold'>{item.date}</p>
            </div>

            {/* IMAGE */}
            <div className='flex flex-col items-end'>
              <div className='relative w-[125px] h-[61px] overflow-visible'>
                <Image
                  key={frames[index]}
                  src={`/masters/hover-images/part${index + 1}-${
                    frames[index] + 1
                  }.png`}
                  alt=''
                  width={125}
                  height={61}
                  className='absolute inset-0 transition-opacity duration-500 z-10'
                />

                <Image
                  src='/masters/arrow.svg'
                  alt='arrow'
                  width={41}
                  height={30}
                  className='
                    absolute 
                    -bottom-10
                    right-0
                    transition-transform duration-300
                    group-hover:translate-x-1
                    z-20
                    '
                />
              </div>
            </div>
          </div>

          {/* MOBILE INFO */}
          <div className='lg:hidden mt-4 px-4'>
            <p className='text-[#666] text-sm'>{item.type}</p>
            <p className='text-3xl underline-offset-4 group-hover:underline cursor-pointer transition-all'>
              {item.title}
            </p>
          </div>

          {/* DESKTOP */}
          <div className='hidden lg:grid grid-cols-3 gap-6 px-6 items-start'>
            <div>
              <p className='text-[#666] text-[16px] font-medium'>Inicio</p>
              <p className='text-3xl'>{item.date}</p>
            </div>

            <div>
              <p className='text-[#666] text-[16px]'>{item.type}</p>
              <p className='text-4xl group-hover:underline underline-offset-4 cursor-pointer transition-all leading-[110%]'>
                {item.title}
              </p>
            </div>

            <div className='flex items-end justify-end gap-4 group cursor-pointer'>
              <Image
                src='/masters/arrow.svg'
                alt='arrow'
                width={68}
                height={50}
                className='transition-transform duration-300 group-hover:translate-x-1'
              />

              <div className='relative w-[290px] h-[140px]'>
                <Image
                  key={frames[index]}
                  src={`/masters/hover-images/part${index + 1}-${
                    frames[index] + 1
                  }.png`}
                  alt='parts'
                  width={296}
                  height={144}
                  className='absolute inset-0 transition-opacity duration-500'
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MastersList
