import Image from 'next/image'

interface IProps {
  image: string
  sizes: { width: number; tinyWidth: number; height: number }
  alt?: string
}

const SectionLogo = ({ image, sizes, alt = '' }: IProps) => {
  const { width, tinyWidth, height } = sizes

  return (
    <div className='component-container'>
      <div
        className='relative inline-block mb-4 md:mb-14'
        style={
          {
            '--tiny': `${tinyWidth}px`,
            '--width': `${width}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          className='block w-(--tiny) lg:w-(--width) max-w-full'
        />
      </div>
    </div>
  )
}

export default SectionLogo
