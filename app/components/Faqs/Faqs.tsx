import SectionLogo from '../SectionLogo'
import QuestionsAndAnswers from './components/QuestionsAndAnswers'

const Faqs = () => {
  return (
    <section id='faqs'>
      <SectionLogo
        image='/intros/Preguntas.svg'
        alt='Faqs'
        sizes={{ width: 309, height: 109, tinyWidth: 105 }}
      />
      <QuestionsAndAnswers />
    </section>
  )
}

export default Faqs
