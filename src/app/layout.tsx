import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Toggles',
  description: 'How stupid can you get?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}