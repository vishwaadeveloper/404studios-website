"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function FadeInSection({
  children,
  className = "",
  delay = 0,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.4s ease-out",
      }}
    >
      {children}
    </div>
  )
}
