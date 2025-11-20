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
          text-lg lg:text-2xl
          rounded-full
          hover:bg-black hover:border-black hover:text-white transition-colors duration-200
          cursor-pointer w-18 lg:w-30 h-7 lg:h-10 text-center flex justify-center items-center
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
          text-lg lg:text-2xl
          rounded-full
          hover:bg-black hover:border-black hover:text-white transition-colors duration-200
          cursor-pointer
          no-underline
          w-27 lg:w-46 h-7 lg:h-10 text-center flex justify-center items-center
        '
      >
        Contacto
      </a>
    </div>
  )
}

export default ExpectationsBtns
