'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FAQSInformation } from '@/app/data/CarruselData'

const QuestionsAndAnswers = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className='border-t-2 lg:border-t-3 my-3 lg:my-5 w-full'>
      {FAQSInformation.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className='border-b-2 lg:border-b-3 py-6 lg:py-10 w-full'
          >
            <div
              className='flex justify-between items-center px-4 lg:px-[147px] cursor-pointer'
              onClick={() => toggle(index)}
            >
              <h3 className='text-xl lg:text-4xl w-full'>{item.question}</h3>

              <Image
                src='/faqs/arrow-up.svg'
                alt='Arrow'
                width={78}
                height={58}
                className={`
                  transition-transform duration-300
                  w-12 h-8 lg:w-20 lg:h-14
                  ${isOpen ? '' : 'rotate-180'}
                `}
                loading='lazy'
              />
            </div>

            {/* Answer section – visible only when open */}
            <p
              className={`
                text-base lg:text-3xl mt-3 lg:mt-5 px-4 lg:px-[147px] 
                transition-all sm:mr-[12%] duration-300 overflow-hidden leading-[109%] text-justify
                ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              {item.answer}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default QuestionsAndAnswers
