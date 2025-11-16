import type { Metadata } from 'next'
import { Arimo } from 'next/font/google'
import './globals.css'
import ScrollReset from './components/ScrollReset'

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arimo',
})

export const metadata: Metadata = {
  title: '.archiff',
  description: '.archiff Web Page',
  viewport: {
    interactiveWidget: 'resizes-content',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${arimo.variable} antialiased`}>
        <ScrollReset />
        {children}
      </body>
    </html>
  )
}
