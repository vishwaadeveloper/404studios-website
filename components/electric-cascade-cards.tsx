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
  isActive: boolean
  isVisible: boolean
}

function ElectricCard({ step, index, isActive, isVisible }: ElectricCardProps) {
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
    ...(isActive ? activeStyle : dormantStyle)
  }

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Outer electric aura - only when active */}
      {isActive && (
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
        {/* Electric effects - only when active */}
        {isActive && (
          <>
            {/* Top electric line */}
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${cardColor.glow} 50%, transparent 100%)`,
                animation: 'electricFlow 3s ease-in-out infinite'
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
                background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: isActive ? `1px solid ${cardColor.border}` : '1px solid rgba(255, 255, 255, 0.1)',
                color: isActive ? cardColor.glow : 'rgba(255, 255, 255, 0.4)',
                fontSize: '24px',
                boxShadow: isActive ? `0 0 20px ${cardColor.glow}60` : 'none',
                animation: getIconAnimation()
              }}
            >
              {step.icon}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-grow text-center">
            <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
              isActive ? 'text-white' : 'text-white/50'
            }`}>
              {step.title}
            </h3>
            <p className={`text-base leading-relaxed mb-4 transition-colors duration-500 ${
              isActive ? 'text-white/80' : 'text-white/40'
            }`}>
              {step.description}
            </p>
            <div 
              className="text-sm font-semibold transition-all duration-500"
              style={{ 
                color: isActive ? cardColor.glow : 'rgba(255, 255, 255, 0.3)',
                textShadow: isActive ? `0 0 10px ${cardColor.glow}` : 'none'
              }}
            >
              {step.duration}
            </div>
          </div>
        </div>

        {/* Lightning bolt connection */}
        {index < processSteps.length - 1 && (
          <div className="absolute top-1/2 -right-12 w-24 h-5 z-10 hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 100 20" fill="none">
              <defs>
                <filter id={`lightningGlow-${index}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Lightning bolt path - only show when current is flowing */}
              {isActive && (
                <>
                  {/* Main lightning bolt zigzag path */}
                  <path
                    d="M5 10 L25 8 L35 12 L55 7 L65 13 L85 9 L95 10"
                    stroke={cardColor.glow}
                    strokeWidth="2"
                    fill="none"
                    filter={`url(#lightningGlow-${index})`}
                    style={{
                      strokeDasharray: '3 2',
                      animation: 'lightningFlow 1s ease-in-out infinite'
                    }}
                  />
                  
                  {/* Lightning branches */}
                  <path
                    d="M25 8 L30 5 M35 12 L32 15 M55 7 L60 4 M65 13 L62 16"
                    stroke={cardColor.glow}
                    strokeWidth="1"
                    fill="none"
                    opacity="0.7"
                    filter={`url(#lightningGlow-${index})`}
                    style={{
                      strokeDasharray: '2 1',
                      animation: 'lightningFlow 1s ease-in-out infinite 0.2s'
                    }}
                  />
                  
                  {/* Electric sparks along the path */}
                  <circle 
                    r="2" 
                    cy="10"
                    fill={cardColor.glow} 
                    style={{ 
                      filter: `drop-shadow(0 0 6px ${cardColor.glow})`,
                    }}
                  >
                    <animate
                      attributeName="cx"
                      values="5;25;35;55;65;85;95"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values="10;8;12;7;13;9;10"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="2;3;2;3;2;3;2"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Additional random sparks */}
                  <circle 
                    cx="40" cy="10" r="1" 
                    fill={cardColor.glow} 
                    opacity="0.8"
                    style={{ 
                      filter: `drop-shadow(0 0 4px ${cardColor.glow})`,
                      animation: 'sparkFlicker 0.5s ease-in-out infinite'
                    }}
                  />
                  <circle 
                    cx="70" cy="11" r="1" 
                    fill={cardColor.glow} 
                    opacity="0.6"
                    style={{ 
                      filter: `drop-shadow(0 0 4px ${cardColor.glow})`,
                      animation: 'sparkFlicker 0.3s ease-in-out infinite 0.2s'
                    }}
                  />
                </>
              )}
              
              {/* Connection points */}
              <circle 
                cx="5" cy="10" r="2" 
                fill={isActive ? cardColor.glow : 'rgba(255,255,255,0.2)'} 
                style={{ 
                  filter: isActive ? `drop-shadow(0 0 6px ${cardColor.glow})` : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              
              <circle 
                cx="95" cy="10" r="2" 
                fill={'rgba(255,255,255,0.2)'} 
                style={{ 
                  transition: 'all 0.3s ease'
                }}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ElectricCascadeCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentActiveIndex, setCurrentActiveIndex] = useState(-1)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          startElectricLoop()
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const startElectricLoop = () => {
    const cardActivationTime = 1500 // How long each card stays lit
    const pauseBetweenCards = 200 // Pause between cards
    const pauseBetweenCycles = 2000 // Pause between full cycles
    
    const runCycle = () => {
      // Reset all cards
      setCurrentActiveIndex(-1)
      
      // Light up each card sequentially
      processSteps.forEach((_, index) => {
        // Turn on
        setTimeout(() => {
          setCurrentActiveIndex(index)
        }, index * (cardActivationTime + pauseBetweenCards))
        
        // Turn off
        setTimeout(() => {
          setCurrentActiveIndex(-1)
        }, index * (cardActivationTime + pauseBetweenCards) + cardActivationTime)
      })
      
      // Schedule next cycle
      setTimeout(() => {
        runCycle()
      }, processSteps.length * (cardActivationTime + pauseBetweenCards) + pauseBetweenCycles)
    }
    
    // Start the first cycle after a brief delay
    setTimeout(runCycle, 500)
  }

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
          isActive={currentActiveIndex === index}
          isVisible={isVisible}
        />
      ))}
    </div>
  )
}
