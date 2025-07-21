"use client"

import type React from "react"

/**
 * HeroModel
 * ------------------------------------------------------------------
 * CSS-only animated graphic used in the hero section.
 * You can later swap this for a real 3-D canvas or Lottie animation,
 * but this keeps the preview error-free for now.
 */
export default function HeroModel(): React.ReactElement {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* blurred neon blob */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/40 via-purple-500/40 to-pink-500/40 animate-breathe blur-2xl" />
      {/* sharp foreground outline */}
      <div className="relative h-[220px] w-[160px] rounded-2xl border border-cyan-400/30 backdrop-blur-sm bg-black/30 flex flex-col items-center justify-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-cyan-200">App&nbsp;Mock-up</span>
      </div>

      {/* animation keyframes */}
      <style jsx global>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }
        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
