"use client"

import { useRef, useEffect } from "react"

interface ParticleGlobeProps {
  className?: string
  size?: number
}

interface Particle {
  x: number
  y: number
  z: number
  originalX: number
  originalY: number
  originalZ: number
  color: string
  alpha: number
  size: number
}

export default function ParticleGlobe({ className = "", size = 800 }: ParticleGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Particle colors matching the theme
    const colors = [
      "#06b6d4", // cyan-500
      "#8b5cf6", // purple-500
      "#ec4899", // pink-500
      "#0ea5e9", // sky-500
      "#a855f7", // purple-600
      "#f97316", // orange-500
    ]

    // Create particles in a sphere distribution
    const particles: Particle[] = []
    const particleCount = window.innerWidth < 768 ? 180 : 350
    const radius = size * 0.32

    // Fibonacci sphere distribution for even particle placement
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      particles.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        size: Math.random() * 2.5 + 1,
      })
    }

    let rotation = 0

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      ctx.clearRect(0, 0, rect.width, rect.height)

      // Static slow rotation only
      rotation += 0.001

      // Sort particles by z-depth for proper 3D rendering
      const rotatedParticles = particles
        .map((particle) => {
          // Apply rotation
          const rotX = particle.originalX * Math.cos(rotation) - particle.originalZ * Math.sin(rotation)
          const rotZ = particle.originalX * Math.sin(rotation) + particle.originalZ * Math.cos(rotation)

          return {
            ...particle,
            x: rotX,
            y: particle.originalY,
            z: rotZ,
          }
        })
        .sort((a, b) => b.z - a.z)

      // Draw connections between nearby particles first (behind particles)
      ctx.save()
      ctx.globalAlpha = 0.15
      ctx.strokeStyle = "#06b6d4"
      ctx.lineWidth = 0.8

      for (let i = 0; i < rotatedParticles.length; i++) {
        const p1 = rotatedParticles[i]
        const perspective1 = 1000
        const scale1 = perspective1 / (perspective1 + p1.z)

        // Skip particles that are too far back
        if (scale1 < 0.3) continue

        const x1 = centerX + p1.x * scale1
        const y1 = centerY + p1.y * scale1

        // Connect to nearby particles
        for (let j = i + 1; j < rotatedParticles.length; j++) {
          const p2 = rotatedParticles[j]
          const perspective2 = 1000
          const scale2 = perspective2 / (perspective2 + p2.z)

          if (scale2 < 0.3) continue

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dz = p1.z - p2.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          // Connect particles within a certain distance
          if (distance < 120) {
            const x2 = centerX + p2.x * scale2
            const y2 = centerY + p2.y * scale2

            // Calculate connection opacity based on distance and depth
            const connectionOpacity = (1 - distance / 120) * 0.3 * Math.min(scale1, scale2)

            ctx.globalAlpha = connectionOpacity
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      }
      ctx.restore()

      // Draw particles on top of connections
      rotatedParticles.forEach((particle) => {
        // 3D to 2D projection
        const perspective = 1000
        const scale = perspective / (perspective + particle.z)
        const x2d = centerX + particle.x * scale
        const y2d = centerY + particle.y * scale

        // Skip if outside canvas or too far back
        if (x2d < 0 || x2d > rect.width || y2d < 0 || y2d > rect.height || scale < 0.2) return

        // Adjust alpha based on depth
        const depthAlpha = (particle.z + radius) / (2 * radius)
        const finalAlpha = particle.alpha * depthAlpha * scale

        ctx.save()
        ctx.globalAlpha = finalAlpha
        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = particle.size * 1.5

        // Draw particle with glow effect
        ctx.beginPath()
        ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2)
        ctx.fill()

        // Add inner bright core
        ctx.globalAlpha = finalAlpha * 1.5
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(x2d, y2d, particle.size * scale * 0.4, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
      }}
    />
  )
}
