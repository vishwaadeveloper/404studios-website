"use client"

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * LazyComponent - Intersection Observer based lazy loading
 * Reduces initial bundle size and improves Core Web Vitals
 */
export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  fallback = null,
  rootMargin = '50px',
  threshold = 0.1,
  className,
  style
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold, hasLoaded])

  return (
    <div ref={ref} className={className} style={style}>
      {isVisible ? children : fallback}
    </div>
  )
}

/**
 * LazySection - Optimized section loading
 * Perfect for below-the-fold content
 */
export const LazySection: React.FC<LazyComponentProps> = (props) => {
  return (
    <LazyComponent
      {...props}
      fallback={
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      }
    />
  )
}

/**
 * Performance Metrics Hook
 * Tracks Core Web Vitals
 */
export const usePerformanceMetrics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Track LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        console.log('LCP:', lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Track FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime)
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Track CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value)
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])
}

/**
 * Dynamic import helper for heavy components
 */
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  LoadingComponent?: React.ComponentType
) => {
  return dynamic(importFn, {
    loading: LoadingComponent ? () => <LoadingComponent /> : () => (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    ),
    ssr: false
  })
}

export default LazyComponent
