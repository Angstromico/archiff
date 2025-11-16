import Image from 'next/image'

interface IProps {
  image: string
  sizes: { width: number; tinyWidth: number; height: number }
  alt?: string
  lessBottom?: boolean
}

const SectionLogo = ({
  image,
  sizes,
  alt = '',
  lessBottom = false,
}: IProps) => {
  const { width, tinyWidth, height } = sizes

  const innerStyle = `relative inline-block ${
    lessBottom ? 'lg:mb-4' : 'mb-4 md:mb-14'
  }`

  return (
    <div className='component-container'>
      <div
        className={innerStyle}
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
