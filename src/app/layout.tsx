import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { SharedLayout } from '@/components/shared-layout'

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
    <html lang="en" suppressHydrationWarning>
      <body className="h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SharedLayout>
            {children}
          </SharedLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}