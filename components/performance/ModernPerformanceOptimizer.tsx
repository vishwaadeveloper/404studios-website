'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function ModernPerformanceOptimizer() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const performanceRef = useRef({
    fps: 60,
    scrollVelocity: 0,
    isOptimized: true,
    frameCount: 0,
    lastFrameTime: 0
  })

  // Modern scroll performance optimization
  const optimizeScrollPerformance = useCallback(() => {
    let ticking = false
    let lastScrollY = 0
    let lastTimestamp = 0

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame((timestamp) => {
          // Calculate scroll velocity
          const currentScrollY = window.scrollY
          const deltaY = Math.abs(currentScrollY - lastScrollY)
          const deltaTime = timestamp - lastTimestamp
          const velocity = deltaTime > 0 ? deltaY / deltaTime : 0

          performanceRef.current.scrollVelocity = velocity
          lastScrollY = currentScrollY
          lastTimestamp = timestamp

          // Adaptive performance optimization
          if (velocity > 2) {
            // Fast scrolling - optimize for performance
            document.documentElement.style.setProperty('--scroll-performance', 'fast')
            document.body.classList.add('scrolling-fast')
          } else {
            // Slow scrolling - optimize for quality
            document.documentElement.style.setProperty('--scroll-performance', 'smooth')
            document.body.classList.remove('scrolling-fast')
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Modern FPS monitoring using Performance API
  const monitorFPS = useCallback(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const measureFPS = (currentTime: number) => {
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        performanceRef.current.fps = frameCount
        frameCount = 0
        lastTime = currentTime

        // Log performance data in development
        if (process.env.NODE_ENV === 'development') {
          console.log('🚀 Performance Stats:', {
            fps: performanceRef.current.fps,
            scrollVelocity: performanceRef.current.scrollVelocity.toFixed(2),
            optimized: performanceRef.current.isOptimized
          })
        }
      }

      requestAnimationFrame(measureFPS)
    }

    requestAnimationFrame(measureFPS)
  }, [])

  // Intersection Observer for viewport optimizations
  const setupIntersectionObserver = useCallback(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement
          
          if (entry.isIntersecting) {
            // Element is in viewport - enable full quality
            element.style.willChange = 'transform'
            element.classList.add('in-viewport')
          } else {
            // Element is out of viewport - optimize for performance
            element.style.willChange = 'auto'
            element.classList.remove('in-viewport')
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    // Observe important elements
    const observeElements = () => {
      const elements = document.querySelectorAll('canvas, video, iframe, [data-animate]')
      elements.forEach(el => observerRef.current?.observe(el))
    }

    // Initial observation
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeElements)
    } else {
      observeElements()
    }

    return () => {
      observerRef.current?.disconnect()
      document.removeEventListener('DOMContentLoaded', observeElements)
    }
  }, [])

  // Modern Resize Observer for responsive optimizations
  const setupResizeObserver = useCallback(() => {
    if (typeof window === 'undefined' || !('ResizeObserver' in window)) return

    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        
        // Optimize based on viewport size
        if (width < 768) {
          // Mobile optimization
          document.documentElement.style.setProperty('--device-optimization', 'mobile')
        } else if (width < 1024) {
          // Tablet optimization
          document.documentElement.style.setProperty('--device-optimization', 'tablet')
        } else {
          // Desktop optimization
          document.documentElement.style.setProperty('--device-optimization', 'desktop')
        }
      }
    })

    resizeObserverRef.current.observe(document.documentElement)

    return () => resizeObserverRef.current?.disconnect()
  }, [])

  // Resource hints for performance
  const addResourceHints = useCallback(() => {
    if (typeof document === 'undefined') return

    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.404studios.com'
    ]

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // DNS prefetch for performance
    const dnsPrefetchDomains = [
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com'
    ]

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = domain
      document.head.appendChild(link)
    })
  }, [])

  useEffect(() => {
    // Initialize all optimizations
    const cleanupScroll = optimizeScrollPerformance()
    const cleanupIntersection = setupIntersectionObserver()
    const cleanupResize = setupResizeObserver()
    
    monitorFPS()
    addResourceHints()

    // Performance optimization: Set initial CSS variables
    document.documentElement.style.setProperty('--scroll-performance', 'smooth')
    document.documentElement.style.setProperty('--device-optimization', 'unknown')

    return () => {
      cleanupScroll?.()
      cleanupIntersection?.()
      cleanupResize?.()
    }
  }, [optimizeScrollPerformance, setupIntersectionObserver, setupResizeObserver, monitorFPS, addResourceHints])

  return null // This is a performance optimization component with no UI
}
