import Image from 'next/image'

const Masters = () => {
  return (
    <section className='mt-4'>
      <div className='component-container'>
        <div className='relative inline-block'>
          <Image
            src='/masters/shadow.png'
            alt='Masters'
            width={289}
            height={70}
            className='block w-[165px] lg:w-[289px]'
          />

          <Image
            src='/masters/masters-black.png'
            alt=''
            width={289}
            height={70}
            className='absolute inset-0 translate-x-2 translate-y-2 mix-blend-multiply w-[165px] lg:w-[289px]'
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
      </div>
    </section>
  )
}

export default Masters
