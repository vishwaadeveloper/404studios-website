"use client"

import type { ReactNode } from "react"

interface SimpleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  type?: "button" | "submit" | "reset"
}

export default function SimpleButton({ 
  children, 
  className = "", 
  onClick, 
  href, 
  type = "button" 
}: SimpleButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  
  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 ${className}`}
    >
      {children}
    </button>
  )
}
