import SectionLogo from '../../SectionLogo'

const TextTeachers = () => {
  return (
    <div className='lg:flex gap-3 lg:px-0 lg:flex-row lg:justify-between relative size-full'>
      <div className='px-4 lg:px-[147px] size-full min-h-[60px]'>
        <SectionLogo
          image='/intros/Profesores.svg'
          sizes={{ width: 350, tinyWidth: 209, height: 60 }}
          alt='Profesores'
          noTop
          lessBottom
          customClass='absolute top-0 sm:-top-3 lg:-top-9 xl:-top-6 left-1/3 lg:left-[147px]'
        />
      </div>
      <div className='mt-6 p-3 sm:mt-0 sm:w-full lg:max-w-1/2 border-2 border-b-0 lg:border-3 lg:border-b-0 mx-[30px] sm:mx-0 lg:pl-8 lg:pb-4 text-lg 2xl:text-[30px] text-justify h-[90%] self-baseline-last'>
        <p className='w-full max-w-[600px] text-justify md:mt-4 px-1 leading-[100%]'>
          Equipo docente compuesto por más de 50 profesionales de referencia en
          el sector.
        </p>
      </div>
    </div>
  )
}

export default TextTeachers
