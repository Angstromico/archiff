'use client'

import Image from 'next/image'
import Bubble from './components/Buble'

const CollectSection = () => {
  return (
    <section className='w-full bg-[#1E2BC7] px-4 lg:px-14 pt-2.5 lg:pt-4 pb-32 xl:pb-16 text-white mb-8 lg:mb-16 relative grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-0'>
      {/* Left Column */}
      <div>
        <h2 className='font-bold text-[4rem] lg:text-7xl mb-2 lg:mb-3'>
          Colectiff
        </h2>
        <p className='mb-6 lg:mb-9 text-xl lg:text-2xl'>[Bolsa de empleo]</p>
        <p className='mb-16 lg:mb-20 text-xl lg:text-2xl text-justify max-w-[600px]'>
          Colectiff es una plataforma de empleo especializada en el sector de la
          Arquitectura y el Diseño, creada para conectar a profesionales con
          estudios de referencia que buscan talento.
        </p>
      </div>

      {/* Right Column */}
      <div
        className='
          flex flex-col gap-6 
          lg:grid lg:grid-cols-1 3xl:gap-10
        '
      >
        {/* Mobile: first 2 side by side */}
        <div className='flex gap-4 xl:ml-32 2xl:ml-52'>
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
        />

        {/* Mobile: fourth bottom */}
        <Bubble
          title='Estudios'
          subtitle='Referentes en el sector'
          desktopHidden
          width={273}
        />
      </div>

      {/* Arrow */}
      <Image
        className='absolute left-6 2xl:left-14 bottom-9 2xl:bottom-20 w-[70px] h-[51px] 2xl:w-[114.37px] 2xl:h-[82.94px] transition-all hover:left-7 2xl:hover:left-16'
        src='/collections/blue-arrow.png'
        alt='Arrow'
        width={114.37}
        height={82.94}
      />
    </section>
  )
}

export default CollectSection
