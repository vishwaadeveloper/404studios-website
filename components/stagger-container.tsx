"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export default function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: StaggerContainerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease-out ${index * staggerDelay}s, transform 0.5s ease-out ${
                  index * staggerDelay
                }s`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
