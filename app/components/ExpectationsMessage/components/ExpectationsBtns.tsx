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
          text-xl lg:text-3xl
          pb-1 pt-2
          rounded-full
          hover:bg-black hover:border-black hover:text-white transition-colors duration-200
          cursor-pointer w-16 lg:w-28 h-6 lg:h-13 text-center
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
          text-xl lg:text-3xl
          pb-1 pt-2
          rounded-full
          hover:bg-black hover:border-black hover:text-white transition-colors duration-200
          cursor-pointer
          no-underline
          inline-block
          w-32 lg:w-56 h-6 lg:h-13 text-center
        '
      >
        Contacto
      </a>
    </div>
  )
}

export default ExpectationsBtns
