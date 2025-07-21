"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  allowTooltipOverflow?: boolean
}

export default function GlassCard({ children, className, hover = true, allowTooltipOverflow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-xl",
        hover && "hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105 transition-all duration-300",
        allowTooltipOverflow ? "overflow-visible" : "overflow-hidden",
        "transform translateZ(0)", // Force hardware acceleration
        className,
      )}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  )
}
