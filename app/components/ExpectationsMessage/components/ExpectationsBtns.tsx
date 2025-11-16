const ExpectationsBtns = () => {
  const handleFaqsClick = () => {
    // Scroll suave a la sección de Faqs (cuando exista)
    const faqsSection = document.getElementById('faqs')
    if (faqsSection) {
      faqsSection.scrollIntoView({ behavior: 'smooth' })
    }
    // Por ahora no hace nada ya que la sección no existe
  }

  return (
    <div className='my-3 lg:my-8 flex gap-4 lg:gap-6'>
      {/* Botón Faqs */}
      <button
        onClick={handleFaqsClick}
        className='
          bg-white border-2 lg:border-3 border-black 
          text-[20px] lg:text-[32px]
          px-5 lg:px-7 py-1 lg:py-2
          rounded-full
          hover:bg-black hover:border-blue-900 hover:text-white transition-colors duration-200
          cursor-pointer
        '
      >
        Faqs
      </button>

      {/* Botón Contacto */}
      <a
        href='https://www.google.com'
        target='_blank'
        rel='noopener noreferrer'
        className='
          bg-white border-2 lg:border-3 border-black 
          text-[20px] lg:text-[32px]
          px-5 lg:px-7 py-1 lg:py-2
          rounded-full
          hover:bg-black hover:border-blue-900 hover:text-white transition-colors duration-200
          cursor-pointer
          no-underline
          inline-block
        '
      >
        Contacto
      </a>
    </div>
  )
}

export default ExpectationsBtns
