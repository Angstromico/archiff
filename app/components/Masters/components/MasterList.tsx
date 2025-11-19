'use client'

import Image from 'next/image'

const info = [
  {
    date: 'Abr. 26',
    type: 'Gestión y Estrategia Creativa',
    title: 'MBA. Máster en Gestión y Diseño de Arquitectura e Interiorismo.',
  },
  {
    date: 'Abr. 26',
    type: 'Gestión y Estrategia Creativa',
    title: 'MBAg. Máster en Gestión de Estudios Creativos + IA.',
  },
  {
    date: 'Oct. 26',
    type: 'Arquitectura e Interiorismo',
    title: 'MIA. Máster en interiorismo aplicado, prácticas creativas e IA.',
  },
  {
    date: 'Oct. 26',
    type: 'Arquitectura e Interiorismo',
    title: 'MAP. Máster de Profesionalizaciónen la Arquitectura',
  },
]

const MastersList = () => {
  return (
    <div className='w-full mt-5'>
      {info.map((item, index) => (
        <div
          key={index}
          className={`
            border-t-2 lg:border-t-[3px] border-black py-8
            ${index === info.length - 1 ? 'border-b-2 lg:border-b-[3px]' : ''}
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
                {[1, 2, 3, 4].map((n) => (
                  <Image
                    key={n}
                    src={`/masters/hover-images/part${index + 1}-${n}.png`}
                    alt=''
                    width={125}
                    height={61}
                    className={`
          absolute top-0 left-0 transition-all duration-500

          ${
            n === 1
              ? // imagen principal → se mueve hacia abajo/izquierda al hacer hover
                'relative z-40 group-hover:-translate-y-1 group-hover:-translate-x-1'
              : n === 2
              ? // segunda imagen → se mueve poquito hacia arriba/derecha
                'opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 z-30'
              : n === 3
              ? // tercera imagen → más desplazamiento
                'opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:translate-x-2 z-20'
              : // cuarta imagen → desplazamiento máximo
                'opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 group-hover:translate-x-3 z-10'
          }
        `}
                    loading='lazy'
                  />
                ))}
              </div>

              {/* Arrow */}
              <Image
                src='/masters/arrow.png'
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
                {[1, 2, 3, 4].map((n) => (
                  <Image
                    key={n}
                    src={`/masters/hover-images/part${index + 1}-${n}.png`}
                    alt='parts'
                    width={296}
                    height={144}
                    className={`
          absolute top-0 left-0 transition-all duration-500 h-full

          ${
            n === 1
              ? 'relative z-40 group-hover:translate-y-1 group-hover:-translate-x-2'
              : n === 2
              ? 'opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 z-30'
              : n === 3
              ? 'opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 group-hover:translate-x-3 z-20'
              : 'opacity-0 group-hover:opacity-100 group-hover:-translate-y-5 group-hover:translate-x-5 z-10'
          }
        `}
                    loading='lazy'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MastersList
