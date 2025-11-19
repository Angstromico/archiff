import Image from 'next/image'

interface IProps {
  image: string
  sizes: { width: number; tinyWidth: number; height: number }
  alt?: string
  lessBottom?: boolean
  noTop?: boolean
}

const SectionLogo = ({
  image,
  sizes,
  alt = '',
  lessBottom = false,
  noTop = false,
}: IProps) => {
  const { width, tinyWidth, height } = sizes

  const innerStyle = `relative inline-block ${
    lessBottom ? 'lg:mb-4' : 'mb-4 md:mb-14'
  }`

  const mainClass = `${
    noTop ? 'px-4 lg:px-[147px]' : 'px-4 lg:px-[147px] pt-[100px]'
  }`

  return (
    <div className={mainClass}>
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
          className='block w-(--tiny) xl:w-(--width) max-w-full'
          loading='lazy'
        />
      </div>
    </div>
  )
}

export default SectionLogo
