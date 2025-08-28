import React from 'react'
import { cn } from '@/lib/utils'

interface ElectricGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'default' | 'metallic'
}

export function ElectricGlassButton({ 
  children, 
  className,
  variant = 'default',
  ...props 
}: ElectricGlassButtonProps) {
  return (
    <button 
      className={cn(
        "electric-glass-button",
        variant === 'metallic' && "uppercase tracking-wider font-bold text-xs",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default ElectricGlassButton
