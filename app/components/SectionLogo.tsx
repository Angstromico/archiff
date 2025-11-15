import Image from 'next/image'

interface IProps {
  image: string
  shadow: string
}

const SectionLogo = ({ image, shadow }: IProps) => {
  return (
    <div className='relative inline-block mb-4 md:mb-14'>
      <Image
        src={shadow}
        alt='Masters'
        width={289}
        height={70}
        className='block w-[165px] lg:w-[289px]'
      />

      <Image
        src={image}
        alt=''
        width={289}
        height={70}
        className='absolute inset-0 translate-x-2 translate-y-2 mix-blend-multiply w-[165px] lg:w-[289px]'
        style={{ mixBlendMode: 'multiply' }}
      />
    </div>
  )
}

export default SectionLogo
