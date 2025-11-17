import SectionLogo from '../SectionLogo'
import FormationsCarousel from './components/FormationsCarusel'

const Formations = () => {
  return (
    <section className='mt-5 lg:mt-10 mb-16 lg:mb-44'>
      <SectionLogo
        image='/intros/Formaciones.svg'
        alt='Formations'
        sizes={{ width: 444, height: 109, tinyWidth: 250 }}
        lessBottom
      />
      <FormationsCarousel />
    </section>
  )
}

export default Formations
