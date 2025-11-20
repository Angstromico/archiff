'use client'

import Image from 'next/image'
import Bubble from './components/Buble'

const CollectSection = () => {
  return (
    <section className='w-full bg-[#1E2BC7] px-4 lg:px-[147px] pt-2.5 lg:pt-4 pb-32 xl:pb-16 text-white mb-8 lg:mb-16 relative grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-0'>
      {/* Left Column */}
      <div>
        <h2 className='font-bold text-5xl lg:text-6xl mb-2 lg:mb-3'>
          Colectiff
        </h2>
        <p className='mb-6 lg:mb-9 text-xl lg:text-lg 2xl:text-xl'>
          [Bolsa de empleo]
        </p>
        <p className='mb-16 lg:mb-20 text-xl lg:text-lg 2xl:text-xl lg:pb-16 text-justify max-w-[600px] lg:max-w-[450px] 2xl:max-w-[600px]'>
          Colectiff es una plataforma de empleo especializada en el sector de la
          Arquitectura y el Diseño, creada para conectar a profesionales con
          estudios de referencia que buscan talento.
        </p>
      </div>

      {/* Right Column */}
      <div
        className='
          flex flex-col gap-1
          lg:grid lg:grid-cols-1 xl:gap-0
        '
      >
        {/* Mobile: first 2 side by side */}
        <div className='flex gap-2 xl:ml-32 2xl:ml-52'>
          <Bubble title={200} subtitle='Perfiles de candidatos' isNumber />
          <Bubble title={10} subtitle='Puestos mensuales' isNumber />
        </div>
        <div className='hidden xl:flex  lg:flex-row gap-4'>
          <Bubble title='IA' subtitle='En los procesos de selección' />

          <Bubble title='Estudios' subtitle='Referentes en el sector' />
        </div>

        {/* Mobile: third in middle */}
        <Bubble
          title='IA'
          subtitle='En los procesos de selección'
          desktopHidden
          width={232}
          minW
        />

        {/* Mobile: fourth bottom */}
        <Bubble
          title='Estudios'
          subtitle='Referentes en el sector'
          desktopHidden
          width={359}
        />
      </div>

      {/* Arrow */}
      <Image
        className='absolute left-6 lg:left-[147px] bottom-9 lg:bottom-30 xl:bottom-15 w-18 h-12 lg:w-20 lg:h-14 2xl:w-24 2xl:h-16 transition-all hover:left-8 lg:hover:left-40'
        src='/collections/blue-arrow.svg'
        alt='Arrow'
        width={114.37}
        height={82.94}
        loading='lazy'
      />
    </section>
  )
}

export default CollectSection
