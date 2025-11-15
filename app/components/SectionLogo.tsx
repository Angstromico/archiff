import Image from 'next/image'

interface IProps {
  image: string
  shadow: string
  sizes: { width: number; tinyWidth: number; height: number }
  alt?: string
}

const SectionLogo = ({ image, shadow, sizes, alt = '' }: IProps) => {
  const { width, tinyWidth, height } = sizes

  return (
    <div className='component-container'>
      <div
        className='relative inline-block mb-4 md:mb-14'
        style={{ '--tiny': `${tinyWidth}px` } as React.CSSProperties}
      >
        <Image
          src={shadow}
          alt={alt}
          width={width}
          height={height}
          className='block w-(--tiny) lg:w-auto max-w-full'
        />
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          className='absolute inset-0 translate-x-2 translate-y-2 mix-blend-multiply w-(--tiny) lg:w-auto max-w-full'
        />
      </div>
    </div>
  )
}

export default SectionLogo
