'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Search, Code, Layers, Send } from 'lucide-react'

interface ProcessStep {
  icon: React.ReactNode
  title: string
  description: string
  duration: string
}

const processSteps: ProcessStep[] = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discovery",
    description: "Understanding your requirements and project scope",
    duration: "1-2 days",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Design",
    description: "Creating wireframes and visual designs",
    duration: "3-5 days",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Development",
    description: "Building your application with modern technologies",
    duration: "1-4 weeks",
  },
  {
    icon: <Send className="w-6 h-6" />,
    title: "Launch",
    description: "Testing, deployment, and going live",
    duration: "2-3 days",
  },
]

const cardColors = [
  { 
    name: 'blue',
    tint: 'rgba(0, 220, 255, 0.1)',
    glow: '#00DCFF',
    border: 'rgba(0, 220, 255, 0.3)'
  },
  { 
    name: 'purple',
    tint: 'rgba(153, 69, 255, 0.1)',
    glow: '#9945FF',
    border: 'rgba(153, 69, 255, 0.3)'
  },
  { 
    name: 'green',
    tint: 'rgba(0, 255, 136, 0.1)',
    glow: '#00FF88',
    border: 'rgba(0, 255, 136, 0.3)'
  },
  { 
    name: 'amber',
    tint: 'rgba(255, 215, 0, 0.1)',
    glow: '#FFD700',
    border: 'rgba(255, 215, 0, 0.3)'
  }
]

interface ElectricCardProps {
  step: ProcessStep
  index: number
  isVisible: boolean
}

function ElectricCard({ step, index, isVisible }: ElectricCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardColor = cardColors[index] || cardColors[0]

  // Get specific animation for each card type
  const getIconAnimation = () => {
    // No icon animations - keep icons static
    return 'none'
  }

  // Dormant state (card not activated yet)
  const dormantStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
  }

  // Active state (card is lit up)
  const activeStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, ${cardColor.tint} 100%)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${cardColor.border}`,
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 20px ${cardColor.glow}40,
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    animation: 'electricPulse 4s ease-in-out infinite, gentleFloat 6s ease-in-out infinite'
  }

  const baseCardStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '320px',
    height: '400px',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    overflow: 'hidden',
    ...(isHovered ? activeStyle : dormantStyle)
  }

  return (
    <div 
      className="relative w-full max-w-[320px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer electric aura - only when hovered */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none -m-2"
          style={{
            background: `radial-gradient(circle at center, ${cardColor.glow}10 0%, transparent 70%)`,
            animation: 'auraBreath 4s ease-in-out infinite',
            filter: 'blur(8px)'
          }}
        />
      )}
      
      <div style={baseCardStyle} className="relative z-10">
        {/* Electric effects - only when hovered */}
        {isHovered && (
          <>
            {/* Top electric line */}
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${cardColor.glow} 50%, transparent 100%)`,
                animation: 'electricFlow 3s ease-in-out infinite'
              }}
            />

            {/* Animated gradient overlay */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `linear-gradient(45deg, transparent 30%, ${cardColor.glow}40 50%, transparent 70%)`,
                animation: 'shimmer 2s ease-in-out infinite'
              }}
            />

            {/* Corner glow effects */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full" 
                 style={{
                   background: `radial-gradient(circle, ${cardColor.glow} 0%, transparent 70%)`,
                   animation: 'pulse 2s ease-in-out infinite'
                 }} 
            />
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full" 
                 style={{
                   background: `radial-gradient(circle, ${cardColor.glow} 0%, transparent 70%)`,
                   animation: 'pulse 2s ease-in-out infinite 1s'
                 }} 
            />
          </>
        )}

        {/* Card content */}
        <div className="h-full flex flex-col justify-between z-10 relative">
          {/* Icon section */}
          <div className="text-center mb-6">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto transition-all duration-500"
              style={{
                background: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: isHovered ? `1px solid ${cardColor.border}` : '1px solid rgba(255, 255, 255, 0.1)',
                color: isHovered ? cardColor.glow : 'rgba(255, 255, 255, 0.4)',
                fontSize: '24px',
                boxShadow: isHovered ? `0 0 20px ${cardColor.glow}60` : 'none',
                animation: getIconAnimation()
              }}
            >
              {step.icon}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-grow text-center">
            <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
              isHovered ? 'text-white' : 'text-white/50'
            }`}>
              {step.title}
            </h3>
            <p className={`text-base leading-relaxed mb-4 transition-colors duration-500 ${
              isHovered ? 'text-white/80' : 'text-white/40'
            }`}>
              {step.description}
            </p>
            <div 
              className="text-sm font-semibold transition-all duration-500"
              style={{ 
                color: isHovered ? cardColor.glow : 'rgba(255, 255, 255, 0.3)',
                textShadow: isHovered ? `0 0 10px ${cardColor.glow}` : 'none'
              }}
            >
              {step.duration}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ElectricCascadeCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="electric-cascade-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 justify-items-center max-w-7xl mx-auto"
    >
      {processSteps.map((step, index) => (
        <ElectricCard
          key={step.title}
          step={step}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  )
}
