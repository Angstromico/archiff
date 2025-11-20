'use client'

import SectionLogo from '../SectionLogo'
import useScreenSize from '@/app/hooks/useScreenSize'
import { ExpectationsBtns, ExpectationsText } from './components'
import VideoBanner from '../VideoBanner'

const ExpectationsMessage = () => {
  // Use the hook to determine if the screen is large (e.g., >= 1024px for lg)
  const isLargeScreen = useScreenSize(1024)

  // Determine the image path based on the screen size
  const imagePath = isLargeScreen
    ? '/intros/Esperar.svg' // For large screens (lg and up)
    : '/intros/Esperitas.svg' // For small screens

  return (
    <section className='mt-5 lg:mt-10 mb-16 lg:mb-44'>
      <SectionLogo
        image={imagePath}
        alt='Expectations'
        sizes={{ width: 1000, height: 100, tinyWidth: 334 }}
        lessBottom
      />
      <div className='px-4 lg:px-[147px]'>
        <VideoBanner notDesktop />
        <ExpectationsText />
        <ExpectationsBtns />
      </div>
    </section>
  )
}

export default ExpectationsMessage
