'use client'

import Image from 'next/image'
import { mastersListInfo } from '@/app/data/MastersData'
import { useEffect, useState } from 'react'

const MastersList = () => {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % 4) // 0→1→2→3→0
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='w-full mt-5'>
      {mastersListInfo.map((item, index) => (
        <div
          key={index}
          className={`
            border-t-2 lg:border-t-[3px] border-black py-8
            ${
              index === mastersListInfo.length - 1
                ? 'border-b-2 lg:border-b-[3px]'
                : ''
            }
          `}
        >
          {/* ─────────────────────────────────────────────
              MOBILE (default)
          ───────────────────────────────────────────── */}
          <div className='lg:hidden grid grid-cols-2 gap-4 items-start px-4'>
            {/* LEFT — Fecha */}
            <div>
              <p className='text-[#666] text-[14px] font-medium'>Inicio</p>
              <p className='text-[24px] font-semibold'>{item.date}</p>
            </div>

            {/* RIGHT — Stacked Images + Arrow */}
            <div className='flex flex-col items-end'>
              <div className='relative w-[125px] h-auto group cursor-pointer'>
                <Image
                  key={frameIndex}
                  src={`/masters/hover-images/part${index + 1}-${
                    frameIndex + 1
                  }.png`}
                  alt=''
                  width={125}
                  height={61}
                  className='absolute inset-0 transition-opacity duration-500'
                  loading='lazy'
                />
              </div>

              {/* Arrow */}
              <Image
                src='/masters/arrow.svg'
                alt='arrow'
                width={41}
                height={30}
                className='mt-3 transition-transform duration-300 group-hover:translate-x-1'
                loading='lazy'
              />
            </div>
          </div>

          {/* Info below (mobile) */}
          <div className='lg:hidden mt-6 px-4'>
            <p className='text-[#666] text-sm'>{item.type}</p>
            <p className='text-3xl underline-offset-4 hover:underline cursor-pointer transition-all'>
              {item.title}
            </p>
          </div>

          {/* ─────────────────────────────────────────────
              DESKTOP (lg+)
          ───────────────────────────────────────────── */}
          <div className='hidden lg:grid grid-cols-3 gap-6 px-6 items-start'>
            {/* LEFT — Fecha */}
            <div>
              <p className='text-[#666] text-[16px] font-medium'>Inicio</p>
              <p className='text-3xl'>{item.date}</p>
            </div>

            {/* CENTER — Type + Title */}
            <div>
              <p className='text-[#666] text-[16px]'>{item.type}</p>
              <p className='text-4xl hover:underline underline-offset-4 cursor-pointer transition-all leading-[110%]'>
                {item.title}
              </p>
            </div>

            {/* RIGHT — Images horizontal */}
            <div className='flex items-end justify-end gap-4 group cursor-pointer'>
              {/* Arrow aligned to bottom */}
              <Image
                src='/masters/arrow.png'
                alt='arrow'
                width={68}
                height={50}
                className='transition-transform duration-300 group-hover:translate-x-1'
                loading='lazy'
              />
              {/* Stacked Hover Images */}
              <div className='relative w-[290px] h-[140]'>
                <Image
                  key={frameIndex}
                  src={`/masters/hover-images/part${index + 1}-${
                    frameIndex + 1
                  }.png`}
                  alt='parts'
                  width={296}
                  height={144}
                  className='absolute inset-0 transition-opacity duration-500'
                  loading='lazy'
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
