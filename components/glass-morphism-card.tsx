'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

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
  const [isAnimated, setIsAnimated] = useState(false)
  const [isLitUp, setIsLitUp] = useState(false)
  const cardColor = cardColors[index] || cardColors[0]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsVisible(true)
          setTimeout(() => {
            setIsAnimated(true)
            // Start the sequential lighting sequence
            if (index === 0) {
              // Discovery starts immediately
              setTimeout(() => setIsLitUp(true), 1000)
            }
          }, index * 500) // Stagger animation
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index, isAnimated])

  // Sequential lighting effect
  useEffect(() => {
    if (isAnimated && index > 0) {
      // Each card lights up after the previous one's electric current reaches it
      const delay = index * 2000 + 1500 // 2s for each lightning + 1.5s initial delay
      const timer = setTimeout(() => {
        setIsLitUp(true)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [isAnimated, index])

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '320px',
    height: '400px',
    background: isLitUp 
      ? `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, ${cardColor.tint} 100%)`
      : `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,
    backdropFilter: 'blur(10px)',
    border: isLitUp ? `1px solid ${cardColor.border}` : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: isLitUp 
      ? `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px ${cardColor.glow}40`
      : '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transform: isAnimated ? 'translateY(0)' : 'translateY(100px)',
    opacity: isAnimated ? 1 : 0,
    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    overflow: 'hidden',
    animationDelay: `${index * 0.5}s`,
    animation: isLitUp ? `electricPulse 4s ease-in-out infinite ${index * 0.5}s, gentleFloat 6s ease-in-out infinite ${index * 1}s` : 'none'
  }

  const getIconAnimation = (stepTitle: string) => {
    if (!isAnimated) return 'none'
    if (!isLitUp) return 'iconDormant 2s ease-in-out infinite'
    
    switch (stepTitle.toLowerCase()) {
      case 'discovery':
        return `iconSearch 2s ease-in-out infinite ${index * 0.4}s, iconElectric 3s ease-in-out infinite ${index * 0.4}s`
      case 'design':
        return `iconRotate 3s linear infinite ${index * 0.4}s, iconElectric 3s ease-in-out infinite ${index * 0.4}s`
      case 'development':
        return `iconStack 2.5s ease-in-out infinite ${index * 0.4}s, iconElectric 3s ease-in-out infinite ${index * 0.4}s`
      case 'launch':
        return `iconLaunch 3s ease-in-out infinite ${index * 0.4}s, iconElectric 3s ease-in-out infinite ${index * 0.4}s`
      default:
        return `iconElectric 3s ease-in-out infinite ${index * 0.4}s`
    }
  }

  const iconStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    border: `1px solid ${cardColor.border}`,
    color: cardColor.glow,
    fontSize: '24px',
    position: 'relative',
    transition: 'all 0.3s ease',
    animation: getIconAnimation(step.title),
    boxShadow: isAnimated ? `0 0 20px ${cardColor.glow}40` : 'none',
    transformOrigin: 'center'
  }

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Outer electric aura */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none -m-2"
        style={{
          background: `radial-gradient(circle at center, ${cardColor.glow}10 0%, transparent 70%)`,
          animation: isAnimated ? `auraBreath 4s ease-in-out infinite ${index * 0.6}s` : 'none',
          filter: 'blur(8px)'
        }}
      />
      
      <div
        ref={cardRef}
        style={cardStyle}
        className="glass-card-hover group relative z-10"
        onMouseEnter={(e) => {
          const target = e.currentTarget
          target.style.transform = 'translateY(-8px)'
          target.style.boxShadow = `
            0 16px 48px rgba(0, 0, 0, 0.4),
            0 0 40px ${cardColor.glow},
            inset 0 0 20px ${cardColor.glow}20
          `
          target.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, ${cardColor.tint} 100%)`
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget
          target.style.transform = isAnimated ? 'translateY(0)' : 'translateY(100px)'
          target.style.boxShadow = `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
          target.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, ${cardColor.tint} 100%)`
        }}
      >
        {/* Top gradient line */}
        <div 
          className="absolute top-0 left-0 right-0 h-px opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${cardColor.glow} 50%, transparent 100%)`,
            animation: isAnimated ? 'electricFlow 3s ease-in-out infinite' : 'none'
          }}
        />

        {/* Electric border animation */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 0%, ${cardColor.glow}20 50%, transparent 100%)`,
            animation: isAnimated ? `borderSweep 4s linear infinite ${index * 0.8}s` : 'none',
            opacity: 0.3
          }}
        />

        {/* Corner electric sparks */}
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full opacity-0" 
             style={{
               background: cardColor.glow,
               boxShadow: `0 0 10px ${cardColor.glow}`,
               animation: isAnimated ? `sparkle 2s ease-in-out infinite ${index * 0.3}s` : 'none'
             }} 
        />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full opacity-0" 
             style={{
               background: cardColor.glow,
               boxShadow: `0 0 10px ${cardColor.glow}`,
               animation: isAnimated ? `sparkle 2s ease-in-out infinite ${index * 0.3 + 1}s` : 'none'
             }} 
        />

        {/* Electric current lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px opacity-0"
             style={{
               background: `linear-gradient(90deg, transparent 0%, ${cardColor.glow} 20%, transparent 40%, ${cardColor.glow} 60%, transparent 80%, ${cardColor.glow} 100%)`,
               animation: isAnimated ? `currentFlow 2.5s ease-in-out infinite ${index * 0.4}s` : 'none'
             }}
        />
        <div className="absolute bottom-1/4 left-0 right-0 h-px opacity-0"
             style={{
               background: `linear-gradient(90deg, ${cardColor.glow} 0%, transparent 20%, ${cardColor.glow} 40%, transparent 60%, ${cardColor.glow} 80%, transparent 100%)`,
               animation: isAnimated ? `currentFlow 2.5s ease-in-out infinite ${index * 0.4 + 1.2}s` : 'none'
             }}
        />

        {/* Glass card content */}
        <div className="h-full flex flex-col justify-between z-10 relative">
          {/* Top section - Icon */}
          <div className="text-center mb-6">
            <div style={iconStyle} className="mx-auto group-hover:shadow-lg">
              {step.icon}
            </div>
          </div>

          {/* Middle section - Content */}
          <div className="flex-grow text-center text-white">
            <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-md">{step.title}</h3>
            <p className="text-base leading-relaxed text-white/80 mb-4">{step.description}</p>
            <div 
              className="text-sm font-semibold"
              style={{ 
                color: cardColor.glow,
                textShadow: `0 0 10px ${cardColor.glow}` 
              }}
            >
              {step.duration}
            </div>
          </div>

          {/* Bottom section - CTA */}
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 border backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
              style={{ 
                borderColor: cardColor.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 15px ${cardColor.glow}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Lightning connection */}
        {index < total - 1 && (
          <div className="absolute top-1/2 -right-12 w-24 h-5 z-10 hidden lg:block">
            <svg 
              className="w-full h-full"
              viewBox="0 0 100 20" 
              fill="none"
            >
              <defs>
                <filter id={`glow-${index}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id={`electricGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={cardColor.glow} stopOpacity="0" />
                  <stop offset="30%" stopColor={cardColor.glow} stopOpacity="1" />
                  <stop offset="70%" stopColor={cardColor.glow} stopOpacity="1" />
                  <stop offset="100%" stopColor={cardColors[(index + 1) % cardColors.length].glow} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Main lightning path */}
              <path
                d="M5 10 L20 8 L35 12 L50 9 L65 11 L80 7 L95 10"
                stroke={`url(#electricGradient-${index})`}
                strokeWidth="2"
                fill="none"
                filter={`url(#glow-${index})`}
                className={`transition-all duration-1000 ${isAnimated ? 'opacity-60' : 'opacity-0'}`}
                style={{
                  strokeDasharray: '4 2',
                  animation: isAnimated ? `electricPulse 1.5s ease-in-out infinite ${index * 0.3}s, dashMove 2s linear infinite` : 'none'
                }}
              />
              {/* Secondary electric arc */}
              <path
                d="M10 12 L25 6 L40 14 L55 7 L70 13 L85 5 L90 12"
                stroke={cardColor.glow}
                strokeWidth="1"
                fill="none"
                opacity="0.4"
                style={{
                  strokeDasharray: '2 4',
                  animation: isAnimated ? `electricFlicker 2s ease-in-out infinite ${index * 0.5}s` : 'none'
                }}
              />
              {/* Connection points with electric glow */}
              <circle 
                cx="5" 
                cy="10" 
                r="3" 
                fill={cardColor.glow} 
                className={`transition-all duration-300 ${isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                style={{ 
                  filter: `drop-shadow(0 0 8px ${cardColor.glow})`,
                  animation: isAnimated ? `energyPulse 1s ease-in-out infinite ${index * 0.2}s` : 'none',
                  transitionDelay: `${index * 0.5 + 0.5}s` 
                }}
              />
              <circle 
                cx="95" 
                cy="10" 
                r="3" 
                fill={cardColors[(index + 1) % cardColors.length].glow} 
                className={`transition-all duration-300 ${isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                style={{ 
                  filter: `drop-shadow(0 0 8px ${cardColors[(index + 1) % cardColors.length].glow})`,
                  animation: isAnimated ? `energyPulse 1s ease-in-out infinite ${index * 0.2 + 0.5}s` : 'none',
                  transitionDelay: `${index * 0.5 + 0.5}s` 
                }}
              />
              {/* Electric energy orbs traveling along the path */}
              <circle 
                r="2" 
                fill={cardColor.glow} 
                opacity="0.8"
                style={{
                  filter: `drop-shadow(0 0 6px ${cardColor.glow})`,
                  animation: isAnimated ? `travelPath 3s ease-in-out infinite ${index * 0.6}s` : 'none'
                }}
              >
                <animateMotion dur="3s" repeatCount="indefinite" 
                               begin={`${index * 0.6}s`}
                               path="M5 10 L20 8 L35 12 L50 9 L65 11 L80 7 L95 10" />
              </circle>
            </svg>
          </div>
        )}

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full transition-all duration-1000 ${isAnimated ? 'opacity-60' : 'opacity-0'}`}
              style={{ 
                width: i % 2 === 0 ? '3px' : '2px',
                height: i % 2 === 0 ? '3px' : '2px',
                background: cardColor.glow,
                boxShadow: `0 0 ${i % 2 === 0 ? '12px' : '8px'} ${cardColor.glow}`,
                top: `${15 + (i * 15)}%`,
                left: `${10 + (i * 12)}%`,
                animation: isAnimated ? `electricFloat 3s ease-in-out infinite ${i * 0.4}s, electricGlow 1.5s ease-in-out infinite ${i * 0.2}s` : 'none'
              }}
            />
          ))}
          
          {/* Electric trail effects */}
          {[...Array(3)].map((_, i) => (
            <div 
              key={`trail-${i}`}
              className={`absolute h-px transition-all duration-1000 ${isAnimated ? 'opacity-40' : 'opacity-0'}`}
              style={{ 
                width: '30px',
                background: `linear-gradient(90deg, transparent 0%, ${cardColor.glow} 50%, transparent 100%)`,
                top: `${25 + (i * 25)}%`,
                left: `${5 + (i * 20)}%`,
                animation: isAnimated ? `trailMove 2s ease-in-out infinite ${i * 0.7}s` : 'none'
              }}
            />
          ))}
          
          {/* Electric nodes */}
          {[...Array(4)].map((_, i) => (
            <div 
              key={`node-${i}`}
              className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${isAnimated ? 'opacity-80' : 'opacity-0'}`}
              style={{ 
                background: cardColor.glow,
                boxShadow: `0 0 6px ${cardColor.glow}`,
                top: `${20 + (i * 20)}%`,
                right: `${10 + (i * 15)}%`,
                animation: isAnimated ? `nodeFlicker 1s ease-in-out infinite ${i * 0.3}s` : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
