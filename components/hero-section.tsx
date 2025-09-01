import { Button } from "@/components/ui/button"
import PulsingBorderShader from "./pulsing-border-shader"
import { ArrowRight, Sparkles } from "lucide-react"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"

export default function HeroSection() {
  return (
    <section className="min-h-screen text-foreground overflow-hidden relative">
      {/* Hero content - with top padding to account for fixed header */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-32 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Text content */}
          <div className="space-y-8 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/40 bg-transparent backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow duration-300">
              <Sparkles className="w-4 h-4 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{
                filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))"
              }} />
              <span className="text-sm font-medium text-white">
                AI-Powered Solutions
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                Your digital{" "}
                <span className="bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-blue bg-clip-text text-transparent">
                  transformation
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Experience the future of business with AI-powered solutions, innovative development, 
                and cutting-edge technology that transforms your ideas into reality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white px-8 py-6 text-lg rounded-full group shadow-lg shadow-brand-purple/25"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan px-8 py-6 text-lg rounded-full bg-transparent transition-all duration-300"
              >
                Explore Work
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
                Always Innovating
              </div>
              <div>Expert Solutions</div>
              <div>24/7 Support</div>
            </div>
          </div>

          {/* Right side - Animation */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind the shader using brand colors */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-brand-cyan/20 to-brand-blue/20 blur-3xl scale-110" />

              {/* Main shader component */}
              <div className="relative">
                <PulsingBorderShader />
              </div>

              {/* Floating elements with brand colors */}
              <div
                className="absolute -top-4 -right-4 w-3 h-3 bg-brand-purple rounded-full animate-bounce shadow-lg shadow-brand-purple/50"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute top-1/3 -left-6 w-2 h-2 bg-brand-blue rounded-full animate-bounce shadow-lg shadow-brand-blue/50"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-1/4 -right-8 w-4 h-4 bg-brand-cyan rounded-full animate-bounce shadow-lg shadow-brand-cyan/50"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
