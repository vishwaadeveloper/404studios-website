"use client"

import type { ReactNode } from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  return <div className={`inline-block hover:scale-105 transition-transform duration-300 ${className}`}>{children}</div>
}
