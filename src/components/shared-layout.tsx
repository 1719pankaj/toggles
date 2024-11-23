"use client"

import { ThemeToggle } from "./theme-toggle"

export function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </div>
  )
}