import type { ReactNode } from "react"

export interface ServicePrice {
  min: number
  max: number
}

export interface Service {
  id: string
  name: string
  description: string
  price: ServicePrice
  category: string
  icon: ReactNode
  demoUrl?: string
}

export interface ServicesData {
  services: Service[]
}
