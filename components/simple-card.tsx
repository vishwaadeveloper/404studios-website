"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SimpleCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function SimpleCard({ children, className, hover = true }: SimpleCardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground border border-border rounded-lg shadow-sm",
        hover && "hover:shadow-md transition-shadow duration-200",
        className,
      )}
    >
      {children}
    </div>
  )
}
