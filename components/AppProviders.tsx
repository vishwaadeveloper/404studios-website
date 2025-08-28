"use client"

import type React from "react"
import { ABTestProvider } from "@/lib/abTesting"
import { ThemeProvider } from "@/components/theme-provider"

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ABTestProvider>{children}</ABTestProvider>
    </ThemeProvider>
  )
}
