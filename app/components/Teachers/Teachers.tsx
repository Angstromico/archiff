import { TextTeachers, TeacherCard } from './components'
import Carousel from '../Carrusel'
import { teachersData } from '@/app/data/CarruselData'

const Teachers = () => {
  return (
    <section className='mt-24 md:mt-52'>
      <TextTeachers />
      <Carousel
        cardsInfo={teachersData}
        CardComponent={TeacherCard}
        borderClass='border-x-2'
      />
    </section>
  )
}

export default Teachers
