import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Toggles Demo',
  description: 'Simple toggle switches with text inputs',
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