"use client"

import type React from "react"
import { ABTestProvider } from "@/lib/abTesting"

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <ABTestProvider>{children}</ABTestProvider>
}
