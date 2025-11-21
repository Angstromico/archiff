'use client'

import Image from 'next/image'
import Bubble from './components/Buble'

const CollectSection = () => {
  return (
    <section className='w-full bg-[#1E2BC7] px-4 lg:px-[147px] pt-2.5 lg:pt-4 pb-32 xl:pb-16 text-white mb-8 lg:mb-16 relative grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-6 lg:gap-12 xl:gap-13 lg:h-[350px] xl:h-[500px]'>
      {/* Left Column */}
      <div className='lg:col-span-2 xl:col-span-3'>
        <h2 className='font-bold text-5xl lg:text-5xl xl:text-6xl mb-2 lg:mb-3'>
          Colectiff
        </h2>
        <p className='mb-6 lg:mb-9 text-xl lg:text-xs xl:text-lg 2xl:text-xl'>
          [Bolsa de empleo]
        </p>
        <p className='mb-16 lg:mb-20 text-xl lg:text-xs xl:text-lg 2xl:text-xl lg:pb-16 text-justify max-w-[600px] lg:max-w-[400px] xl:max-w-[550px] 2xl:max-w-[600px]'>
          Colectiff es una plataforma de empleo especializada en el sector de la
          Arquitectura y el Diseño, creada para conectar a profesionales con
          estudios de referencia que buscan talento.
        </p>
      </div>

      {/* Right Column */}
      {/* Perdon, era en este div padre */}
      <div
        className='
          flex flex-col gap-2
          lg:grid lg:grid-cols-1 lg:gap-0 xl:gap-0 lg:col-span-4 xl:col-span-5
        '
      >
        <div className='flex gap-2 lg:ml-19 xl:ml-25 lg:-mb-18 lg:justify-end'>
          <Bubble
            title={200}
            subtitle='Perfiles de candidatos'
            isNumber
            xlWidth
          />
          <Bubble
            width={232}
            title={10}
            subtitle='Puestos mensuales'
            isNumber
            lgWidth
            xlWidth
            bigWidth
          />
        </div>
        <div className='hidden lg:flex  lg:flex-row gap-2 lg:justify-end'>
          <Bubble title='IA' subtitle='En los procesos de selección' />

          <Bubble title='Estudios' subtitle='Referentes en el sector' />
        </div>

        {/* Mobile: third in middle */}
        <Bubble
          title='IA'
          subtitle='En los procesos de selección'
          desktopHidden
          minW
        />

        {/* Mobile: fourth bottom */}
        <Bubble
          title='Estudios'
          subtitle='Referentes en el sector'
          desktopHidden
          maxW
        />
      </div>

      {/* Arrow */}
      <Image
        className='absolute left-6 lg:left-[138px] bottom-9 lg:bottom-22 xl:bottom-32 w-18 h-8 lg:w-18 lg:h-8 xl:w-24 xl:h-12 transition-all hover:left-8 lg:hover:left-40'
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
