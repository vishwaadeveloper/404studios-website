'use client'

import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

export default function ParticleScrollOptimizer() {
  useLenis((lenis) => {
    const velocity = Math.abs(lenis.velocity)
    const scrollProgress = lenis.progress
    
    // Optimize particle background based on scroll performance
    if (velocity > 5) {
      // Fast scrolling - reduce particle count for performance
      document.documentElement.style.setProperty('--particle-density', '0.3')
      document.documentElement.style.setProperty('--particle-animation', 'reduced')
    } else if (velocity > 2) {
      // Medium scrolling - moderate optimization
      document.documentElement.style.setProperty('--particle-density', '0.6')
      document.documentElement.style.setProperty('--particle-animation', 'normal')
    } else {
      // Slow/no scrolling - full quality
      document.documentElement.style.setProperty('--particle-density', '1.0')
      document.documentElement.style.setProperty('--particle-animation', 'full')
    }

    // Parallax-style scroll optimization
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toString())
  })

  useEffect(() => {
    // Set initial values
    document.documentElement.style.setProperty('--particle-density', '1.0')
    document.documentElement.style.setProperty('--particle-animation', 'full')
    document.documentElement.style.setProperty('--scroll-progress', '0')
  }, [])

  return null
}
