'use client'

import SectionLogo from '../SectionLogo'
import useScreenSize from '@/app/hooks/useScreenSize'

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
        // Pass sizes as original, the component will use the correct image path
        sizes={{ width: 1948, height: 110, tinyWidth: 334 }}
      />
    </section>
  )
}

export default ExpectationsMessage
