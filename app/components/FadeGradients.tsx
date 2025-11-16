const FadeGradients = () => {
  return (
    <>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10' />
    </>
  )
}

export default FadeGradients
