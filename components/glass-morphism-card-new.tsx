'use client'

import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import { Button } from '@/components/ui/button'

// Global state for electric current
const ElectricCurrentContext = createContext<{
  currentIndex: number
  isLooping: boolean
  startLoop: () => void
}>({
  currentIndex: -1,
  isLooping: false,
  startLoop: () => {}
})

interface ProcessStep {
  icon: React.ReactNode
  title: string
  description: string
  duration: string
}

interface GlassMorphismCardProps {
  step: ProcessStep
  index: number
  total: number
}

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

export default function GlassMorphismCard({ step, index, total }: GlassMorphismCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { currentIndex, startLoop } = useContext(ElectricCurrentContext)
  const isActivated = currentIndex === index
  const cardColor = cardColors[index] || cardColors[0]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Only start the loop from the first card
          if (index === 0) {
            setTimeout(() => startLoop(), 500)
          }
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index, isVisible, startLoop])

  // Get specific animation for each card type
  const getIconAnimation = () => {
    if (!isActivated) return 'none'
    
    switch (index) {
      case 0: // Discovery - Search animation
        return 'searchPulse 2s ease-in-out infinite'
      case 1: // Design - Rotation animation  
        return 'designRotate 3s linear infinite'
      case 2: // Development - Stack animation
        return 'stackBounce 1.5s ease-in-out infinite'
      case 3: // Launch - Takeoff animation
        return 'launchTakeoff 2s ease-in-out infinite'
      default:
        return 'none'
    }
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
    ...(isActivated ? activeStyle : dormantStyle)
  }

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Outer electric aura - only when active */}
      {isActivated && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none -m-2"
          style={{
            background: `radial-gradient(circle at center, ${cardColor.glow}10 0%, transparent 70%)`,
            animation: 'auraBreath 4s ease-in-out infinite',
            filter: 'blur(8px)'
          }}
        />
      )}
      
      <div
        ref={cardRef}
        style={baseCardStyle}
        className="relative z-10"
      >
        {/* Electric effects - only when active */}
        {isActivated && (
          <>
            {/* Top electric line */}
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${cardColor.glow} 50%, transparent 100%)`,
                animation: 'electricFlow 3s ease-in-out infinite'
              }}
            />

            {/* Corner sparks */}
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" 
                 style={{
                   background: cardColor.glow,
                   boxShadow: `0 0 10px ${cardColor.glow}`,
                   animation: 'sparkle 2s ease-in-out infinite'
                 }} 
            />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full" 
                 style={{
                   background: cardColor.glow,
                   boxShadow: `0 0 10px ${cardColor.glow}`,
                   animation: 'sparkle 2s ease-in-out infinite 1s'
                 }} 
            />

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full"
                  style={{ 
                    width: '3px',
                    height: '3px',
                    background: cardColor.glow,
                    boxShadow: `0 0 10px ${cardColor.glow}`,
                    top: `${20 + (i * 20)}%`,
                    left: `${15 + (i * 15)}%`,
                    animation: `electricFloat 3s ease-in-out infinite ${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Card content */}
        <div className="h-full flex flex-col justify-between z-10 relative">
          {/* Icon section */}
          <div className="text-center mb-6">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto transition-all duration-500"
              style={{
                background: isActivated ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: isActivated ? `1px solid ${cardColor.border}` : '1px solid rgba(255, 255, 255, 0.1)',
                color: isActivated ? cardColor.glow : 'rgba(255, 255, 255, 0.4)',
                fontSize: '24px',
                boxShadow: isActivated ? `0 0 20px ${cardColor.glow}60` : 'none',
                animation: getIconAnimation()
              }}
            >
              {step.icon}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-grow text-center">
            <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
              isActivated ? 'text-white' : 'text-white/50'
            }`}>
              {step.title}
            </h3>
            <p className={`text-base leading-relaxed mb-4 transition-colors duration-500 ${
              isActivated ? 'text-white/80' : 'text-white/40'
            }`}>
              {step.description}
            </p>
            <div 
              className="text-sm font-semibold transition-all duration-500"
              style={{ 
                color: isActivated ? cardColor.glow : 'rgba(255, 255, 255, 0.3)',
                textShadow: isActivated ? `0 0 10px ${cardColor.glow}` : 'none'
              }}
            >
              {step.duration}
            </div>
          </div>

          {/* CTA section */}
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              size="sm"
              className={`backdrop-blur-sm transition-all duration-500 ${
                isActivated 
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                  : 'bg-white/5 border-white/10 text-white/50 cursor-not-allowed'
              }`}
              disabled={!isActivated}
            >
              {isActivated ? 'Learn More' : 'Waiting...'}
            </Button>
          </div>
        </div>

        {/* Electric current connection - show current traveling to next card */}
        {index < total - 1 && (
          <div className="absolute top-1/2 -right-12 w-24 h-5 z-10 hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 100 20" fill="none">
              <defs>
                <filter id={`currentGlow-${index}`}>
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Electric current line - only show when current is flowing */}
              {(currentIndex === index && isActivated) && (
                <>
                  <line
                    x1="5" y1="10" x2="95" y2="10"
                    stroke={cardColor.glow}
                    strokeWidth="2"
                    filter={`url(#currentGlow-${index})`}
                    style={{
                      strokeDasharray: '8 4',
                      animation: 'currentTravel 1.5s linear infinite'
                    }}
                  />
                  
                  {/* Traveling electric spark */}
                  <circle 
                    r="3" 
                    cy="10"
                    fill={cardColor.glow} 
                    style={{ 
                      filter: `drop-shadow(0 0 8px ${cardColor.glow})`,
                    }}
                  >
                    <animate
                      attributeName="cx"
                      values="5;50;95;5"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="3;4;3;3"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
              
              {/* Connection points */}
              <circle 
                cx="5" cy="10" r="2" 
                fill={isActivated ? cardColor.glow : 'rgba(255,255,255,0.2)'} 
                style={{ 
                  filter: isActivated ? `drop-shadow(0 0 6px ${cardColor.glow})` : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              
              <circle 
                cx="95" cy="10" r="2" 
                fill={currentIndex > index ? cardColors[(index + 1) % cardColors.length].glow : 'rgba(255,255,255,0.2)'} 
                style={{ 
                  filter: currentIndex > index ? `drop-shadow(0 0 6px ${cardColors[(index + 1) % cardColors.length].glow})` : 'none',
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

// Provider component for managing electric current state
export function ElectricCurrentProvider({ children, total }: { children: React.ReactNode, total: number }) {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isLooping, setIsLooping] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startLoop = () => {
    if (isLooping) return
    
    setIsLooping(true)
    const cardActivationTime = 1500 // How long each card stays lit
    const pauseBetweenCards = 300 // Pause between cards
    const pauseBetweenCycles = 2000 // Pause between full cycles
    
    const runCycle = () => {
      // Reset to start
      setCurrentIndex(-1)
      
      // Light up each card sequentially
      for (let i = 0; i < total; i++) {
        setTimeout(() => {
          setCurrentIndex(i)
        }, i * (cardActivationTime + pauseBetweenCards))
        
        // Turn off the card after its activation time
        setTimeout(() => {
          setCurrentIndex(-1)
        }, i * (cardActivationTime + pauseBetweenCards) + cardActivationTime)
      }
      
      // Schedule next cycle
      setTimeout(() => {
        if (isLooping) {
          runCycle()
        }
      }, total * (cardActivationTime + pauseBetweenCards) + pauseBetweenCycles)
    }
    
    // Start the first cycle
    setTimeout(runCycle, 500)
  }

  const stopLoop = () => {
    setIsLooping(false)
    setCurrentIndex(-1)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  return (
    <ElectricCurrentContext.Provider value={{ currentIndex, isLooping, startLoop }}>
      {children}
    </ElectricCurrentContext.Provider>
  )
}
