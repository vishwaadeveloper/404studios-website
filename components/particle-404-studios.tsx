'use client'

import React, { useRef, useEffect, useState } from 'react'

export default function Particle404Studios() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (!container) return
      
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    // Define particle shape explicitly to avoid self-referential typeof usage (TS2502)
    type Particle = {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
      is404: boolean
    }

    let particles: Particle[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = 'white'
      ctx.save()
      
      const fontSize = isMobile ? 50 : 80
      const lineHeight = fontSize * 1.2
      const totalHeight = lineHeight * 2
      
      ctx.translate(canvas.width / 2, canvas.height / 2 - totalHeight / 2 + 30)
      ctx.font = `900 ${fontSize}px "Arial Black", Arial, system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.letterSpacing = '0.05em'
      
      // Enable sharp rendering
      ctx.imageSmoothingEnabled = false

      // Draw "404"
      ctx.fillText('404', 0, 0)
      
      // Draw "Studios" 
      ctx.fillText('Studios', 0, lineHeight)

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return fontSize
    }

    function createParticle(fontSize: number) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data

      // Use systematic sampling for sharper text
      for (let attempt = 0; attempt < 50; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          const centerY = canvas.height / 2
          const lineHeight = fontSize * 1.2
          const is404Text = y < centerY // Top half is "404", bottom half is "Studios"
          
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: 1.5, // Fixed size for more rigid appearance
            color: 'white',
            scatteredColor: '#00DCFF', // Blue for both "404" and "Studios"
            is404: is404Text,
            life: 1000 // Static particles - no regeneration
          }
        }
      }

      return null
    }

    function createSystematicParticles(fontSize: number) {
      if (!ctx || !canvas || !textImageData) return []
      const localParticles: Particle[] = []
      const data = textImageData.data
      const step = 2 // Smaller step for sharper text
      
      // Systematic sampling for sharper, more rigid text
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4
          const alpha = data[index + 3]
          
          if (alpha > 128) {
            const centerY = canvas.height / 2
            const is404Text = y < centerY
            
    localParticles.push({
              x: x,
              y: y,
              baseX: x,
              baseY: y,
              size: 1.5, // Fixed size for consistency
              color: 'white',
              scatteredColor: '#00DCFF',
              is404: is404Text,
              life: 1000
            })
          }
        }
      }
      
  return localParticles
    }

    function createInitialParticles(fontSize: number) {
      if (!canvas) return
      
      // Use systematic particle creation for sharper text
      const systematicParticles = createSystematicParticles(fontSize)
      particles.push(...systematicParticles)
    }

    let animationFrameId: number

    function animate(fontSize: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = isMobile ? 120 : 180

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !('ontouchstart' in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 40
          const moveY = Math.sin(angle) * force * 40
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
          
          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
          ctx.fillStyle = 'white'
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        // Removed particle life cycle to stop continuous movement
      }

      // Removed particle regeneration to keep particles static
      animationFrameId = requestAnimationFrame(() => animate(fontSize))
    }

    const fontSize = createTextImage()
    createInitialParticles(fontSize)
    animate(fontSize)

    const handleResize = () => {
      updateCanvasSize()
      const newFontSize = createTextImage()
      particles = []
      const systematicParticles = createSystematicParticles(newFontSize)
      particles.push(...systematicParticles)
    }

    const handleMove = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect()
      mousePositionRef.current = { 
        x: x - rect.left, 
        y: y - rect.top 
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!('ontouchstart' in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full touch-none"
        aria-label="Interactive particle effect with 404 Studios text"
      />
    </div>
  )
}
