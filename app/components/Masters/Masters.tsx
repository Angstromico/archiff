import SectionLogo from '../SectionLogo'
import MastersList from './components/MasterList'

const Masters = () => {
  return (
    <section className='mt-4 md:mb-14'>
      <SectionLogo
        image='/masters/masters-black.png'
        shadow='/masters/shadow.png'
      />
      <MastersList />
    </section>
  )
}

export default Masters
