"use client"

import { useEffect, useState } from "react"

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

  useEffect(() => {
    const generateShards = () => {
      const newShards = []
      // Increased shard count for more density
      for (let i = 0; i < 50; i++) {
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
          size: Math.random() * 20 + 10, // 10px to 30px
          delay: Math.random() * 8,
          opacity: Math.random() * 0.15 + 0.05,
          blur: Math.random() * 8 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setShards(newShards)
    }

    generateShards()
  }, [])

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
            backdropFilter: `blur(${shard.blur}px)`,
            WebkitBackdropFilter: `blur(${shard.blur}px)`,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: `0 0 ${shard.size}px ${shard.color}`,
            animationDelay: `${shard.delay}s`,
            animationDuration: `${20 + Math.random() * 15}s`,
            transform: "translateZ(0)",
            opacity: shard.opacity,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-30px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translateY(-60px) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translateY(-30px) rotate(270deg) scale(1.05);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}
