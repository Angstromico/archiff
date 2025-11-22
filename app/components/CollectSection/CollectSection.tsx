'use client'

import Image from 'next/image'
import Bubble from './components/Buble'

const CollectSection = () => {
  return (
    <section className='w-full bg-[#1E2BC7] px-4 lg:px-[147px] pt-2.5 lgx:pt-4 pb-32 2xl:pb-16 text-white mb-8 lgx:mb-16 relative grid grid-cols-1 lgx:grid-cols-2 lgx:gap-12 2xl:gap-13 lgx:h-[350px] 2xl:h-[500px]'>
      {/* Left Column */}
      <div>
        <h2 className='font-bold text-4xl 3xl:text-6xl mb-2 lgx:mb-3'>
          Colectiff
        </h2>
        <p className='mb-6 lgx:mb-9 text-xl lgx:text-sm 2xl:text-lg 3xl:text-xl'>
          [Bolsa de empleo]
        </p>
        <p className='mb-8 lgx:mb-20 text-xl lgx:text-sm 2xl:text-lg 3xl:text-xl lgx:pb-16 text-justify lgx:max-w-[400px] 2xl:max-w-[550px]'>
          Colectiff es una plataforma de empleo especializada en el sector de la
          Arquitectura y el Diseño, creada para conectar a profesionales con
          estudios de referencia que buscan talento.
        </p>
      </div>

      {/* Right Column */}
      <div
        className='
          flex flex-col gap-2
          lgx:grid lgx:grid-cols-1 lgx:gap-2 lgx:w-[505px] 2xl:w-full 2xl:gap-3 3xl:gap-12
        '
      >
        <div className='flex gap-1 lgx:gap-2 2xl:gap-3 lgx:ml-19 2xl:ml-25 lgx:-mb-18 lgx:justify-start'>
          <Bubble
            title={200}
            subtitle='Perfiles de candidatos'
            isNumber
            lgWidth
          />
          <Bubble
            width={232}
            title={10}
            subtitle='Puestos mensuales'
            isNumber
            lgWidth
          />
        </div>
        <div className='hidden lgx:flex lgx:flex-row gap-1 lgx:gap-2 2xl:gap-3 lgx:justify-end'>
          <Bubble lgWidth title='IA' subtitle='En los procesos de selección' />

          <Bubble title='Estudios' subtitle='Referentes en el sector' />
        </div>

        {/* Mobile: third in middle */}
        <Bubble
          title='IA'
          subtitle='En los procesos de selección'
          desktopHidden
          maxW
        />

        {/* Mobile: fourth bottom */}
        <Bubble
          title='Estudios'
          subtitle='Referentes en el sector'
          desktopHidden
          maxWX
        />
      </div>

      {/* Arrow */}
      <Image
        className='absolute left-6 lg:left-[138px] bottom-10 lgx:bottom-18 2xl:bottom-32 3xl:bottom-28 w-20 h-10 lgx:w-22 lgx:h-12 2xl:w-24 2xl:h-12 3xl:w-32 3xl:h-18 transition-all hover:left-8 lg:hover:left-40'
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
