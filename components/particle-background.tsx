"use client"

import { useEffect, useRef, useCallback } from "react"
import { useDeviceDetection, getPerformanceBudget } from "@/hooks/use-device-detection"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const touchRef = useRef({ x: 0, y: 0, active: false })
  const lastFrameTime = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const isScrolling = useRef(false)
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      baseSize: number
      baseOpacity: number
      baseVx: number
      baseVy: number
    }>
  >([])
  const dimensionsRef = useRef({ width: 0, height: 0 })
  
  const deviceInfo = useDeviceDetection()
  const performanceBudget = getPerformanceBudget(deviceInfo)

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = window.innerWidth
    const height = Math.max(window.innerHeight, document.documentElement.scrollHeight)

    dimensionsRef.current = { width, height }

    // Optimize device pixel ratio for mobile
    const dpr = deviceInfo.isMobile 
      ? Math.min(window.devicePixelRatio || 1, 1.5) 
      : Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [deviceInfo.isMobile])

  const createParticles = useCallback(() => {
    const { width, height } = dimensionsRef.current
    if (width === 0 || height === 0) return

    // Use performance budget for particle count
    const particleCount = Math.min(performanceBudget.maxParticles, Math.floor((width * height) / 8000))
    particlesRef.current = []

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * (deviceInfo.isMobile ? 1.2 : 1.5) + 0.5
      const opacity = Math.random() * 0.5 + 0.3
      const speed = deviceInfo.isMobile ? 0.2 : 0.4
      const vx = (Math.random() - 0.5) * speed
      const vy = (Math.random() - 0.5) * speed

      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        size,
        opacity,
        baseSize: size,
        baseOpacity: opacity,
        baseVx: vx,
        baseVy: vy,
        color: Math.random() > 0.6 ? "#06b6d4" : Math.random() > 0.3 ? "#8b5cf6" : "#ec4899",
      })
    }
  }, [deviceInfo.isMobile, performanceBudget.maxParticles])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const now = performance.now()
    const targetFrameTime = 1000 / performanceBudget.targetFPS
    
    if (now - lastFrameTime.current < targetFrameTime) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    lastFrameTime.current = now

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = dimensionsRef.current
    if (width === 0 || height === 0) return

    // Skip animation during scroll on mobile for better performance
    if (deviceInfo.isMobile && isScrolling.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    ctx.clearRect(0, 0, width, height)

    const interaction = deviceInfo.isTouch ? touchRef.current : mouseRef.current
    const particles = particlesRef.current

    particles.forEach((particle, index) => {
      // Enhanced interaction for both mouse and touch
      if (interaction.active) {
        const dx = interaction.x - particle.x
        const dy = interaction.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = deviceInfo.isMobile ? 100 : 150

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * (deviceInfo.isMobile ? 0.015 : 0.02)
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force

          const enhancement = (1 - distance / maxDistance) * (deviceInfo.isMobile ? 1.2 : 1.5)
          particle.size = Math.min(particle.baseSize * 2, particle.baseSize + enhancement)
          particle.opacity = Math.min(1.0, particle.baseOpacity + enhancement * 0.4)
        }
      }

      // Return to base state
      particle.size += (particle.baseSize - particle.size) * 0.05
      particle.opacity += (particle.baseOpacity - particle.opacity) * 0.05
      particle.vx += (particle.baseVx - particle.vx) * 0.02
      particle.vy += (particle.baseVy - particle.vy) * 0.02

      particle.vx *= 0.998
      particle.vy *= 0.998

      particle.x += particle.vx
      particle.y += particle.vy

      // Boundary wrapping
      if (particle.x < -10) particle.x = width + 10
      if (particle.x > width + 10) particle.x = -10
      if (particle.y < -10) particle.y = height + 10
      if (particle.y > height + 10) particle.y = -10

      // Optimized particle rendering
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.fill()

      // Add glow effect only on desktop/tablet if enabled
      if (performanceBudget.useGlow) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 0.3 * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      }

      // Optimized connections
      const maxConnections = performanceBudget.maxConnections
      let connectionCount = 0
      
      for (let j = index + 1; j < particles.length && connectionCount < maxConnections; j++) {
        const other = particles[j]
        const dx = particle.x - other.x
        const dy = particle.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxConnectionDistance = deviceInfo.isMobile ? 80 : 100

        if (distance < maxConnectionDistance) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)

          let opacity = (1 - distance / maxConnectionDistance) * 0.1

          if (interaction.active) {
            const midX = (particle.x + other.x) / 2
            const midY = (particle.y + other.y) / 2
            const interactionDistance = Math.sqrt((interaction.x - midX) ** 2 + (interaction.y - midY) ** 2)

            if (interactionDistance < 120) {
              opacity *= 1 + (1 - interactionDistance / 120) * 1.5
            }
          }

          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
          connectionCount++
        }
      }
    })

    // Enhanced interaction glow (desktop only)
    if (interaction.active && !deviceInfo.isMobile) {
      const gradient = ctx.createRadialGradient(interaction.x, interaction.y, 0, interaction.x, interaction.y, 150)
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.1)")
      gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.08)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(interaction.x - 150, interaction.y - 150, 300, 300)
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [deviceInfo, performanceBudget])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!deviceInfo.isTouch) {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY + window.scrollY,
        active: true,
      }
    }
  }, [deviceInfo.isTouch])

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (deviceInfo.isTouch && event.touches.length > 0) {
      const touch = event.touches[0]
      touchRef.current = {
        x: touch.clientX,
        y: touch.clientY + window.scrollY,
        active: true,
      }
    }
  }, [deviceInfo.isTouch])

  const handleTouchEnd = useCallback(() => {
    touchRef.current.active = false
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false
  }, [])

  const handleResize = useCallback(() => {
    resizeCanvas()
    createParticles()
  }, [resizeCanvas, createParticles])

  const handleScroll = useCallback(() => {
    // Throttled scroll handling
    isScrolling.current = true
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrolling.current = false
    }, 150)

    // Update canvas height on scroll to ensure full coverage (throttled)
    const canvas = canvasRef.current
    if (!canvas) return

    const newHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
    if (Math.abs(newHeight - dimensionsRef.current.height) > 100) {
      resizeCanvas()
    }
  }, [resizeCanvas])

  useEffect(() => {
    resizeCanvas()

    const initTimer = setTimeout(() => {
      createParticles()
      animate()
    }, 100)

    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    
    if (!deviceInfo.isTouch) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    } else {
      window.addEventListener("touchmove", handleTouchMove, { passive: true })
      window.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      clearTimeout(initTimer)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [animate, handleResize, handleMouseMove, handleTouchMove, handleTouchEnd, handleMouseLeave, handleScroll, deviceInfo.isTouch])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "transparent",
        zIndex: 1,
        willChange: "transform",
        transform: "translateZ(0)", // Hardware acceleration
      }}
    />
  )
}
