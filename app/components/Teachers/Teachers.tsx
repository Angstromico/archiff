import SectionLogo from '../SectionLogo'

const Teachers = () => {
  return (
    <section className='mt-5 md:mt-16'>
      <div className='flex flex-col gap-3 lg:flex-row lg:justify-between'>
        <SectionLogo
          image='/teachers/teachers.png'
          shadow='/teachers/shadow.png'
          sizes={{ width: 382, tinyWidth: 219, height: 70 }}
          alt='Profesores'
          noContainer
        />
        <div className='w-full max-w-[973px] border-2 lg:border-3 p-3 lg:pl-8 lg:pb-0 text-[23px] lg:text-[30px]'>
          <p className='w-full max-w-[600px] text-justify'>
            Equipo docente compuesto por más de 50 profesionales de referencia
            en el sector.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Teachers
