'use client'

import React, { useRef, useEffect, useState } from 'react'

export default function Particle404StudiosNew() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
      is404: boolean
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = 'white'
      ctx.save()
      
      const fontSize = isMobile ? 80 : 120
      const lineHeight = fontSize * 1.2
      const totalHeight = lineHeight * 2
      
      ctx.translate(canvas.width / 2, canvas.height / 2 - totalHeight / 2 + 30)
      ctx.font = `900 ${fontSize}px "Arial Black", Arial, system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.letterSpacing = '0.1em'
      
      // Enable sharp rendering
      ctx.imageSmoothingEnabled = false

      // Draw "404" with enhanced styling
      ctx.fillText('404', 0, 0)
      
      // Draw "Studios" with enhanced styling
      ctx.fillText('Studios', 0, lineHeight)

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return fontSize
    }

    function createParticle(fontSize: number) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          // Calculate the actual center of the text area
          const totalHeight = (isMobile ? 80 : 120) * 1.2 * 2
          const textStartY = canvas.height / 2 - totalHeight / 2 + 30
          const textCenterY = textStartY + totalHeight / 2
          const is404Text = y < textCenterY // Top half is "404", bottom half is "Studios"
          
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1.5 + 0.8, // Variable size for more dynamic look
            color: 'white',
            scatteredColor: '#FF8C00', // Future-ready orange color
            is404: is404Text,
            life: Math.random() * 100 + 50 // Dynamic life cycle
          }
        }
      }

      return null
    }

    function createInitialParticles(fontSize: number) {
      if (!canvas) return
      
      // Higher particle density for professional look - increased for bigger size
      const baseParticleCount = isMobile ? 6000 : 9000
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(fontSize)
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number

    function animate(fontSize: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = isMobile ? 150 : 200

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !('ontouchstart' in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 50
          const moveY = Math.sin(angle) * force * 50
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
          
          // Use future-ready orange for scattered particles
          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.12
          p.y += (p.baseY - p.y) * 0.12
          // Set color based on hover state: white by default, differentiated colors on hover
          if (isHovered) {
            if (p.is404) {
              ctx.fillStyle = '#FF8C00' // Orange for "404"
            } else {
              ctx.fillStyle = '#00FFFF' // Cyan for "Studios"
            }
          } else {
            ctx.fillStyle = 'white' // White when not hovered
          }
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        // Advanced particle life cycle management
        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle(fontSize)
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      // Dynamic particle count management
      const baseParticleCount = isMobile ? 6000 : 9000
      const targetParticleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(fontSize)
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(fontSize))
    }

    const fontSize = createTextImage()
    createInitialParticles(fontSize)
    animate(fontSize)

    const handleResize = () => {
      updateCanvasSize()
      const newFontSize = createTextImage()
      particles = []
      createInitialParticles(newFontSize)
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
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full touch-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Interactive particle effect with 404 Studios text featuring future-ready orange theme"
      />
    </div>
  )
}
