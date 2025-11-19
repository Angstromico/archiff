import SectionLogo from '../../SectionLogo'

const TextTeachers = () => {
  return (
    <div className='flex flex-col gap-3 lg:flex-row lg:justify-between relative'>
      <SectionLogo
        image='/intros/Profesores.svg'
        sizes={{ width: 382, tinyWidth: 219, height: 70 }}
        alt='Profesores'
        noTop
        lessBottom
      />
      <div className='w-full max-w-[973px] border-2 border-b-0 lg:border-3 lg:border-b-0 px-3 lg:pl-8 lg:pb-0 text-[23px] xl:text-[30px]'>
        <p className='w-full max-w-[600px] text-justify md:mt-4 px-1'>
          Equipo docente compuesto por más de 50 profesionales de referencia en
          el sector.
        </p>
      </div>
    </div>
  )
}

export default TextTeachers
