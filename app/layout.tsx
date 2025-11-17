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
  // Básicos
  title: '.archiff | Formación de élite para arquitectos e interioristas',
  description:
    'Cursos, másters y workshops impartidos por los mejores estudios de España: Ramón Esteve, Mesura, OOAA, Clap Studio, Francesc Rifé, Sigfrido Serra y muchos más.',

  // Canonical + idioma
  alternates: {
    canonical: 'https://archiff.es', // Cambia por tu dominio real
  },
  metadataBase: new URL('https://archiff.es'), // Cambia por tu dominio

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://archiff.es',
    siteName: '.archiff',
    title: '.archiff | Formación de élite para arquitectos e interioristas',
    description:
      'Aprende de los mejores: Ramón Esteve, Mesura, OOAA, Clap Studio, Francesc Rifé, Sigfrido Serra y más. Cursos online, másters y workshops con acceso de por vida.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/Angstromico/archiff/refs/heads/main/public/og/home-og.png',
        width: 1200,
        height: 630,
        alt: '.archiff – Formación para arquitectos e interioristas',
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    title: '.archiff | Formación de élite para arquitectos e interioristas',
    description:
      'Cursos y másters impartidos por Ramón Esteve, Mesura, OOAA, Clap Studio, Francesc Rifé y más.',
    images: [
      'https://raw.githubusercontent.com/Angstromico/archiff/refs/heads/main/public/og/home-og.png',
    ],
    creator: '@archiff', // Cambia si tienes cuenta
  },

  // Viewport y otros
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    interactiveWidget: 'resizes-content',
  },

  // Extra (opcional pero recomendado)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Favicon (si los tienes en /public)
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
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
