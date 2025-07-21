import { Star } from "lucide-react"

interface PopularBadgeProps {
  className?: string
}

export default function PopularBadge({ className = "" }: PopularBadgeProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Main Badge */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg border-2 border-white/20 backdrop-blur-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300">
        <div className="flex items-center space-x-1.5">
          <Star className="w-4 h-4 fill-current animate-pulse" />
          <span className="text-sm font-bold tracking-wide">MOST POPULAR</span>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full blur-md opacity-30 -z-10 animate-pulse transform -rotate-3"></div>

      {/* Sparkle Effects */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping opacity-75 animation-delay-500"></div>
    </div>
  )
}
