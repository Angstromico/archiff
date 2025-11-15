import SectionLogo from '../SectionLogo'

const Teachers = () => {
  return (
    <section className='mt-5 md:mt-16'>
      <SectionLogo
        image='/teachers/teachers.png'
        shadow='/teachers/shadow.png'
        sizes={{ width: 382, tinyWidth: 219, height: 70 }}
        alt='Profesores'
      />
    </section>
  )
}

export default Teachers
