"use client"

import { useEffect, useRef, useCallback } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, active: false })
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

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = window.innerWidth
    const height = Math.max(window.innerHeight, document.documentElement.scrollHeight)

    dimensionsRef.current = { width, height }

    // Use device pixel ratio for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])

  const createParticles = useCallback(() => {
    const { width, height } = dimensionsRef.current
    if (width === 0 || height === 0) return

    // Significantly increased particle count for dense effect
    const particleCount = Math.min(150, Math.floor((width * height) / 6000))
    particlesRef.current = []

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 1.5 + 0.8
      const opacity = Math.random() * 0.6 + 0.4
      const vx = (Math.random() - 0.5) * 0.4
      const vy = (Math.random() - 0.5) * 0.4

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
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = dimensionsRef.current
    if (width === 0 || height === 0) return

    ctx.clearRect(0, 0, width, height)

    const mouse = mouseRef.current
    const particles = particlesRef.current

    particles.forEach((particle, index) => {
      // Enhanced mouse interaction
      if (mouse.active) {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.02
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force

          const enhancement = (1 - distance / maxDistance) * 1.5
          particle.size = Math.min(particle.baseSize * 2.5, particle.baseSize + enhancement)
          particle.opacity = Math.min(1.0, particle.baseOpacity + enhancement * 0.5)
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

      // Enhanced particle rendering
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.fill()

      // Add glow effect to particles
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 0.3 * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.fill()

      // More connections for denser network effect
      for (let j = index + 1; j < Math.min(particles.length, index + 4); j++) {
        const other = particles[j]
        const dx = particle.x - other.x
        const dy = particle.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)

          let opacity = (1 - distance / 100) * 0.15

          if (mouse.active) {
            const midX = (particle.x + other.x) / 2
            const midY = (particle.y + other.y) / 2
            const mouseDistance = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2)

            if (mouseDistance < 120) {
              opacity *= 1 + (1 - mouseDistance / 120) * 2.5
            }
          }

          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    })

    // Enhanced mouse glow
    if (mouse.active) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150)
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.15)")
      gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.1)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(mouse.x - 150, mouse.y - 150, 300, 300)
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current = {
      x: event.clientX,
      y: event.clientY + window.scrollY,
      active: true,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false
  }, [])

  const handleResize = useCallback(() => {
    resizeCanvas()
    createParticles()
  }, [resizeCanvas, createParticles])

  const handleScroll = useCallback(() => {
    // Update canvas height on scroll to ensure full coverage
    const canvas = canvasRef.current
    if (!canvas) return

    const newHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
    if (newHeight !== dimensionsRef.current.height) {
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
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      clearTimeout(initTimer)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [animate, handleResize, handleMouseMove, handleMouseLeave, handleScroll])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "transparent",
        zIndex: 1,
      }}
    />
  )
}
