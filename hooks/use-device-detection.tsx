import { useState, useEffect } from 'react'

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  screenWidth: number
  devicePixelRatio: number
  isLowEndDevice: boolean
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    screenWidth: 1920,
    devicePixelRatio: 1,
    isLowEndDevice: false,
  })

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const devicePixelRatio = window.devicePixelRatio || 1
      
      // Detect low-end devices
      const isLowEndDevice = 
        isMobile || 
        devicePixelRatio < 2 || 
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4)

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouch,
        screenWidth: width,
        devicePixelRatio,
        isLowEndDevice,
      })
    }

    detectDevice()
    
    const handleResize = () => {
      detectDevice()
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return deviceInfo
}

export function getPerformanceBudget(deviceInfo: DeviceInfo) {
  if (deviceInfo.isMobile) {
    return {
      maxParticles: deviceInfo.isLowEndDevice ? 20 : 40,
      targetFPS: 30,
      maxConnections: 2,
      useGlow: false,
      useShadows: false,
      particleGlobeCount: deviceInfo.isLowEndDevice ? 80 : 120,
      glassShardCount: deviceInfo.isLowEndDevice ? 15 : 25,
    }
  } else if (deviceInfo.isTablet) {
    return {
      maxParticles: 80,
      targetFPS: 45,
      maxConnections: 3,
      useGlow: true,
      useShadows: false,
      particleGlobeCount: 180,
      glassShardCount: 35,
    }
  } else {
    return {
      maxParticles: 150,
      targetFPS: 60,
      maxConnections: 4,
      useGlow: true,
      useShadows: true,
      particleGlobeCount: 350,
      glassShardCount: 50,
    }
  }
}
