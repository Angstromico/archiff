'use client'

import { useEffect, useState } from 'react'
import { mastersListInfo } from '@/app/data/MastersData'
import { MastersInfoMobile, MastersInfoDesktop } from './index'

const MastersList = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  // Initialize frames at 0 (first image)
  const [frames, setFrames] = useState<number[]>(
    Array(mastersListInfo.length).fill(0)
  )

  const frameNumbers = [1, 2, 3, 4]

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
          className={`group border-t-2 lg:border-t-[3px] hover:cursor-pointer border-black py-4 px-2 lg:px-[147px] ${
            index === mastersListInfo.length - 1
              ? 'border-b-2 lg:border-b-[3px]'
              : ''
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchStart={() => setHoveredIndex(index)}
          onTouchCancel={() => setHoveredIndex(null)}
        >
          {/* MOBILE */}
          <MastersInfoMobile
            item={item}
            frameNumbers={frameNumbers}
            frames={frames}
            index={index}
          />

          {/* DESKTOP */}
          <MastersInfoDesktop
            item={item}
            frameNumbers={frameNumbers}
            frames={frames}
            index={index}
          />
        </div>
      ))}
    </div>
  )
}

export default MastersList
