'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { cancelFrame, frame } from 'framer-motion'
import { useEffect, useRef, useCallback } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null)
  const rafIdRef = useRef<number>()

  // Performance optimization: Throttle scroll updates
  const lastFrameTime = useRef(0)
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS

  const optimizedUpdate = useCallback((data: { timestamp: number }) => {
    const now = data.timestamp
    
    // Throttle to target FPS for better performance
    if (now - lastFrameTime.current >= frameInterval) {
      lenisRef.current?.lenis?.raf(now)
      lastFrameTime.current = now
    }
  }, [frameInterval])

  useEffect(() => {
    // Integrate with Framer Motion's frame loop with performance optimization
    frame.update(optimizedUpdate, true)

    return () => {
      cancelFrame(optimizedUpdate)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [optimizedUpdate])

  // Performance monitoring and optimization
  useLenis(
    useCallback((lenis) => {
      // Optimize scroll performance based on scroll speed
      const velocity = Math.abs(lenis.velocity)
      
      // Reduce quality during fast scrolling for better performance
      if (velocity > 5) {
        // Fast scrolling - prioritize performance
        document.documentElement.style.setProperty('--scroll-performance', 'fast')
      } else {
        // Slow/normal scrolling - prioritize smoothness
        document.documentElement.style.setProperty('--scroll-performance', 'smooth')
      }
    }, [])
  )

  return (
    <ReactLenis 
      root 
      options={{ 
        autoRaf: false,
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        // Performance optimizations
        lerp: 0.1, // Smoother interpolation
        syncTouch: true, // Better touch device performance
        touchInertiaMultiplier: 35, // Optimized touch inertia
      }} 
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  )
}
