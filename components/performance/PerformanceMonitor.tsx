"use client"

import { useEffect, useState } from 'react'
import { useDeviceDetection } from '@/hooks/use-device-detection'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  loadTime: number
  interactionDelay: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    interactionDelay: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const deviceInfo = useDeviceDetection()

  useEffect(() => {
    // Show performance monitor only in development
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage: (performance as any).memory ? 
            Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0,
          loadTime: performance.now(),
        }))
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    measureFPS()

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!isVisible || process.env.NODE_ENV !== 'development') return null

  const getPerformanceStatus = () => {
    const targetFPS = deviceInfo.isMobile ? 30 : 60
    const fpsPercentage = (metrics.fps / targetFPS) * 100
    
    if (fpsPercentage >= 90) return { status: 'Excellent', color: 'text-green-400' }
    if (fpsPercentage >= 70) return { status: 'Good', color: 'text-yellow-400' }
    if (fpsPercentage >= 50) return { status: 'Fair', color: 'text-orange-400' }
    return { status: 'Poor', color: 'text-red-400' }
  }

  const { status, color } = getPerformanceStatus()

  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg text-sm font-mono z-[9999] border border-gray-600">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>Performance Monitor</span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white ml-4"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Device:</span>
            <span className="text-cyan-400">
              {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'}
              {deviceInfo.isLowEndDevice && ' (Low-End)'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={color}>
              {metrics.fps} / {deviceInfo.isMobile ? '30' : '60'} ({status})
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Memory:</span>
            <span className="text-blue-400">{metrics.memoryUsage}MB</span>
          </div>
          
          <div className="flex justify-between">
            <span>Screen:</span>
            <span className="text-purple-400">{deviceInfo.screenWidth}px</span>
          </div>
          
          <div className="flex justify-between">
            <span>Touch:</span>
            <span className="text-pink-400">{deviceInfo.isTouch ? 'Yes' : 'No'}</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 mt-2">
          Press Ctrl+Shift+P to toggle
        </div>
      </div>
    </div>
  )
}

export default PerformanceMonitor
