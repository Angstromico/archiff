import SectionLogo from '../SectionLogo'
import Carousel from '../Carrusel'
import { formationsCardsNumbers } from '@/app/data/CarruselData'
import FormationsCard from './components/FormationsCard'

const Formations = () => {
  return (
    <section className='mt-5 lg:mt-10 mb-16 lg:mb-44'>
      <SectionLogo
        image='/intros/Formaciones.svg'
        alt='Formations'
        sizes={{ width: 430, height: 109, tinyWidth: 250 }}
        lessBottom
      />
      <div className='mt-6 sm:hidden'></div>
      <Carousel
        cardsInfo={formationsCardsNumbers}
        CardComponent={FormationsCard}
        parts={5}
        arrowsLow
      />
    </section>
  )
}

export default Formations
