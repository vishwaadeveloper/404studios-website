"use client"

import { useEffect, useState } from "react"

export default function GlassShards() {
  const [shards, setShards] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const generateShards = () => {
      const newShards = []
      for (let i = 0; i < 15; i++) {
        newShards.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 50,
          delay: Math.random() * 5,
        })
      }
      setShards(newShards)
    }

    generateShards()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shards.map((shard) => (
        <div
          key={shard.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${shard.x}%`,
            top: `${shard.y}%`,
            width: `${shard.size}px`,
            height: `${shard.size}px`,
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            animationDelay: `${shard.delay}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
            transform: "translateZ(0)", // Force hardware acceleration
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}
