'use client'

import { useState, useEffect } from 'react'

const useScreenSize = (breakpoint = 1024) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    // Function to check and set the screen size state
    const checkScreenSize = () => {
      // Ensure we are in a client-side environment (browser)
      if (typeof window !== 'undefined') {
        setIsLargeScreen(window.innerWidth >= breakpoint)
      }
    }

    // 1. Initial check when component mounts
    checkScreenSize()

    // 2. Add event listener for resize
    window.addEventListener('resize', checkScreenSize)

    // 3. Clean up the event listener
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [breakpoint])

  return isLargeScreen
}

export default useScreenSize
