import SectionLogo from '../../SectionLogo'

const TextTeachers = () => {
  return (
    <div className='lg:flex gap-3 lg:px-0 lg:flex-row lg:justify-between relative'>
      <SectionLogo
        image='/intros/Profesores.svg'
        sizes={{ width: 350, tinyWidth: 209, height: 60 }}
        alt='Profesores'
        noTop
        lessBottom
      />
      <div className='sm:w-full lg:max-w-1/2 2xl:max-w-[973px] border-2 border-b-0 lg:border-3 lg:border-b-0 mx-[30px] sm:mx-0 lg:pl-8 lg:pb-0 text-lg 2xl:text-[30px] text-justify'>
        <p className='w-full max-w-[600px] text-justify md:mt-4 px-1'>
          Equipo docente compuesto por más de 50 profesionales de referencia en
          el sector.
        </p>
      </div>
    </div>
  )
}

export default TextTeachers
