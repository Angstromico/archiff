import {
  ExpectationsMessage,
  Formations,
  Header,
  ImageSlider,
  Masters,
  Teachers,
  TextCounterVideo,
  VideoBanner,
} from './components'

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full'>
      <main className='min-h-screen w-full bg-white'>
        <Header />
        <ImageSlider />
        <TextCounterVideo />
        <Masters />
        <Teachers />
        <VideoBanner />
        <ExpectationsMessage />
        <Formations />
      </main>
    </div>
  )
}
