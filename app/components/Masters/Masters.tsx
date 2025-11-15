import SectionLogo from '../SectionLogo'
import MastersList from './components/MasterList'

const Masters = () => {
  return (
    <section className='mt-4 md:mb-14'>
      <SectionLogo
        image='/intros/Masters.svg'
        sizes={{ width: 289, tinyWidth: 165, height: 70 }}
        alt={'Masters'}
      />
      <MastersList />
    </section>
  )
}

export default Masters
