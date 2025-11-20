'use client'

import { useEffect, useState } from 'react'

export const useMaxImageHeight = (imageClass: string) => {
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const calculateMaxHeight = () => {
      const images = document.querySelectorAll(`.${imageClass}`)
      let maxH = 0
      images.forEach((img) => {
        const h = img.getBoundingClientRect().height
        if (h > maxH) maxH = h
      })
      setMaxHeight(maxH)
    }

    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(calculateMaxHeight, 300) // Debounce 300ms
    }

    // Initial calculation
    calculateMaxHeight()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [imageClass])

  return maxHeight
}
