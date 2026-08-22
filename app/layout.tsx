import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _fraunces = Fraunces({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoughSense — AI-Powered Cough-Sound Respiratory Distress Pre-Screener',
  description:
    'CoughSense analyzes a cough recording and produces a confidence-scored screening flag that routes potentially concerning cases to a human health worker. A pre-screening triage aid, not a clinical diagnosis. Built by Team Error 404 for Hacks 11.0.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050B12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
