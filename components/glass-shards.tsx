"use client"

import { useEffect, useState } from "react"
import { useDeviceDetection, getPerformanceBudget } from "@/hooks/use-device-detection"

export default function GlassShards() {
  const [shards, setShards] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      delay: number
      opacity: number
      blur: number
      color: string
    }>
  >([])

  const deviceInfo = useDeviceDetection()
  const performanceBudget = getPerformanceBudget(deviceInfo)

  useEffect(() => {
    const generateShards = () => {
      const newShards = []
      // Use performance budget for shard count
      const shardCount = performanceBudget.glassShardCount
      
      for (let i = 0; i < shardCount; i++) {
        const colors = [
          "rgba(6, 182, 212, 0.12)",
          "rgba(139, 92, 246, 0.1)",
          "rgba(236, 72, 153, 0.08)",
          "rgba(34, 197, 94, 0.09)",
          "rgba(251, 191, 36, 0.07)",
        ]

        newShards.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (deviceInfo.isMobile ? 15 : 20) + (deviceInfo.isMobile ? 8 : 10), // Smaller on mobile
          delay: Math.random() * 8,
          opacity: Math.random() * (deviceInfo.isMobile ? 0.1 : 0.15) + 0.05, // Reduced opacity on mobile
          blur: Math.random() * (deviceInfo.isMobile ? 4 : 8) + (deviceInfo.isMobile ? 2 : 3), // Less blur on mobile
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setShards(newShards)
    }

    generateShards()
  }, [deviceInfo.isMobile, performanceBudget.glassShardCount])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {shards.map((shard) => (
        <div
          key={shard.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${shard.x}%`,
            top: `${shard.y}%`,
            width: `${shard.size}px`,
            height: `${shard.size}px`,
            background: `linear-gradient(135deg, ${shard.color}, rgba(255, 255, 255, 0.02))`,
            // Conditional backdrop filter for mobile performance
            ...(deviceInfo.isMobile ? {} : {
              backdropFilter: `blur(${shard.blur}px)`,
              WebkitBackdropFilter: `blur(${shard.blur}px)`,
            }),
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: deviceInfo.isMobile ? 'none' : `0 0 ${shard.size}px ${shard.color}`,
            animationDelay: `${shard.delay}s`,
            animationDuration: `${deviceInfo.isMobile ? 25 : 20 + Math.random() * 15}s`, // Slower on mobile
            transform: "translateZ(0)", // Hardware acceleration
            willChange: "transform",
            opacity: shard.opacity,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1) translateZ(0);
          }
          25% {
            transform: translateY(-${deviceInfo.isMobile ? '20' : '30'}px) rotate(90deg) scale(1.1) translateZ(0);
          }
          50% {
            transform: translateY(-${deviceInfo.isMobile ? '40' : '60'}px) rotate(180deg) scale(0.9) translateZ(0);
          }
          75% {
            transform: translateY(-${deviceInfo.isMobile ? '20' : '30'}px) rotate(270deg) scale(1.05) translateZ(0);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
          animation-play-state: ${deviceInfo.isLowEndDevice ? 'paused' : 'running'};
        }

        /* Reduce motion for low-end devices */
        @media (prefers-reduced-motion: reduce) {
          .animate-float {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
