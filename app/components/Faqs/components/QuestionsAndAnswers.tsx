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

              {/* Mobile arrow (left) */}
              <Image
                src='/faqs/arrow-left.png'
                alt='Arrow'
                width={48}
                height={28}
                className={`
                  block lg:hidden transition-transform duration-300
                  w-12 h-7
                  ${isOpen ? 'rotate-180' : ''}
                `}
                loading='lazy'
              />

              {/* Desktop arrow (down) */}
              <Image
                src='/faqs/arrow-down.png'
                alt='Arrow'
                width={78}
                height={58}
                className={`
                  hidden lg:block transition-transform duration-300
                  w-20 h-14
                  ${isOpen ? 'rotate-180' : ''}
                `}
                loading='lazy'
              />
            </div>

            {/* Answer section – visible only when open */}
            <p
              className={`
                text-[16px] lg:text-[32px] mt-3 lg:mt-5 px-4 lg:px-[147px] 
                transition-all duration-300 overflow-hidden
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
