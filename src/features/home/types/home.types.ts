import type { ReactNode } from "react"

export interface Package {
  name: string
  description: string
  price: string
  icon: ReactNode
}

export interface Feature {
  icon: ReactNode
  title: string
  description: string
}

export interface ProcessStep {
  title: string
  description: string
  duration: string
  icon: ReactNode
}

export interface HomeData {
  packages: Package[]
  features: Feature[]
  processSteps: ProcessStep[]
}
