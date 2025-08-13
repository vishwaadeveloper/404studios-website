'use client'

import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'

export default function ScrollPerformanceMonitor() {
  const fpsRef = useRef(0)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const performanceLogRef = useRef({
    averageFPS: 60,
    scrollVelocity: 0,
    isOptimized: true
  })

  useLenis((lenis) => {
    // Monitor scroll performance
    const now = performance.now()
    frameCountRef.current++
    
    // Calculate FPS every second
    if (now - lastTimeRef.current >= 1000) {
      fpsRef.current = frameCountRef.current
      frameCountRef.current = 0
      lastTimeRef.current = now
      performanceLogRef.current.averageFPS = fpsRef.current
    }

    // Monitor scroll velocity
    const velocity = Math.abs(lenis.velocity)
    performanceLogRef.current.scrollVelocity = velocity

    // Adaptive performance optimization
    if (fpsRef.current < 30 && velocity > 3) {
      // Performance is struggling during fast scroll
      if (performanceLogRef.current.isOptimized) {
        console.warn('🔧 Activating performance mode due to low FPS during scroll')
        document.documentElement.style.setProperty('--scroll-performance', 'fast')
        performanceLogRef.current.isOptimized = false
      }
    } else if (fpsRef.current > 50 && velocity < 1) {
      // Performance is good, restore quality
      if (!performanceLogRef.current.isOptimized) {
        console.log('✅ Restoring full quality - performance is stable')
        document.documentElement.style.setProperty('--scroll-performance', 'smooth')
        performanceLogRef.current.isOptimized = true
      }
    }

    // Log performance data for debugging (only in dev)
    if (process.env.NODE_ENV === 'development' && frameCountRef.current % 60 === 0) {
      console.log('📊 Scroll Performance:', {
        fps: fpsRef.current,
        velocity: velocity.toFixed(2),
        optimized: performanceLogRef.current.isOptimized,
        scrollY: lenis.scroll
      })
    }
  })

  useEffect(() => {
    // Performance optimization: Debounce scroll events for complex components
    let ticking = false

    const optimizeScrollEvents = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Trigger any scroll-dependent optimizations here
          ticking = false
        })
        ticking = true
      }
    }

    // Monitor for performance issues
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure' && entry.duration > 16.67) {
          console.warn('⚠️ Long frame detected:', entry.duration.toFixed(2) + 'ms')
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['measure'] })
    } catch (e) {
      // Performance Observer not supported
    }

    window.addEventListener('scroll', optimizeScrollEvents, { passive: true })

    return () => {
      window.removeEventListener('scroll', optimizeScrollEvents)
      observer.disconnect()
    }
  }, [])

  return null // This is a performance monitoring component with no UI
}
