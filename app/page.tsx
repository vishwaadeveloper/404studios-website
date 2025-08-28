"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, Zap, Rocket, Search, Code, Layers, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GlassCard from "@/components/glass-card"
import GlassShards from "@/components/glass-shards"
import ParticleBackground from "@/components/particle-background"
import ParticleGlobe from "@/components/particle-globe"
import AnimatedSection from "@/components/animated-section"
import StaggerContainer from "@/components/stagger-container"
import MagneticButton from "@/components/magnetic-button"
import { LazySection } from "@/components/performance/LazyComponent"
import { useBusinessABTests } from "@/lib/abTesting"
import { faqSchema } from "@/src/shared/data/faqSchema"
import { localBusinessSchema } from "@/src/shared/data/localBusinessSchema"
import { breadcrumbSchemas } from "@/src/shared/data/breadcrumbSchemas"

// SEO Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "404studios",
  alternateName: "404 Studios",
  description:
    "Next-generation web and mobile app development company specializing in modern technologies and cutting-edge design",
  url: "https://404studios.com",
  logo: "https://404studios.com/logo.png",
  image: "https://404studios.com/og-image.jpg",
  sameAs: [
    "https://github.com/404studios",
    "https://linkedin.com/company/404studios",
    "https://twitter.com/404studios",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7845890089",
    contactType: "customer service",
    email: "contact@404studios.com",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  foundingDate: "2025",
  numberOfEmployees: "2-10",
  knowsAbout: [
    "Web Development",
    "Mobile App Development",
    "React Development",
    "Next.js Development",
    "UI/UX Design",
    "Full Stack Development",
    "Modern Web Technologies",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "404studios",
  alternateName: "404 Studios Website",
  url: "https://404studios.com",
  description: "Professional web and mobile app development services with modern technologies",
  publisher: {
    "@type": "Organization",
    name: "404studios",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://404studios.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

// Process steps data
const processSteps = [
  {
    icon: <Search className="w-6 h-6 text-white" />,
    title: "Discovery",
    description: "Understanding your requirements and project scope",
    duration: "1-2 days",
  },
  {
    icon: <Code className="w-6 h-6 text-white" />,
    title: "Design",
    description: "Creating wireframes and visual designs",
    duration: "3-5 days",
  },
  {
    icon: <Layers className="w-6 h-6 text-white" />,
    title: "Development",
    description: "Building your application with modern technologies",
    duration: "1-4 weeks",
  },
  {
    icon: <Send className="w-6 h-6 text-white" />,
    title: "Launch",
    description: "Testing, deployment, and going live",
    duration: "2-3 days",
  },
]

// Features data
const features = [
  {
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    title: "Lightning Fast",
    description: "Optimized for speed and performance with modern web technologies and best practices.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-purple-400" />,
    title: "Modern Stack",
    description: "Built with cutting-edge technologies like React, Next.js, and TypeScript for scalability.",
  },
  {
    icon: <ArrowRight className="w-8 h-8 text-pink-400" />,
    title: "Future-Ready",
    description: "Designed to evolve with your business needs and adapt to emerging technologies.",
  },
]

export default function HomePage() {
  const { homepageCTA } = useBusinessABTests()

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            localBusinessSchema,
            faqSchema,
            breadcrumbSchemas.home,
          ]),
        }}
      />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-slate-800">
        {/* Background Effects - Fixed positioning with proper z-index */}
        <ParticleBackground />
        <GlassShards />

        {/* Hero Section - Above the fold, no lazy loading */}
        <section
          className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28"
          style={{ zIndex: 10 }}
        >
          {/* Large Background Particle Globe - No circle behind it */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 5 }}>
            <div className="w-full h-full max-w-5xl max-h-5xl">
              <ParticleGlobe size={800} className="opacity-50" />
            </div>
          </div>

          <div className="container px-4 sm:px-6 md:px-8 mx-auto relative" style={{ zIndex: 15 }}>
            <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">
              <AnimatedSection delay={200}>
                <Badge
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-400 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm backdrop-blur-sm bg-white/5 animate-pulse-glow"
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Next-Gen Web Development
                </Badge>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tighter leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x">
                    Futuristic
                  </span>
                  <br />
                  <span className="text-white">Digital Experiences</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4 sm:px-0">
                  We build cutting-edge web and mobile applications with the latest technologies, stunning designs, and
                  seamless user experiences that define the future.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={800}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
                  <MagneticButton>
                    <Link href="/pricing" className="group w-full sm:w-auto" onClick={homepageCTA.trackClick}>
                      <Button className="relative overflow-hidden rounded-full h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.8)] transition-all duration-300 text-sm sm:text-lg font-semibold w-full sm:w-auto">
                        <span className="relative z-10 flex items-center justify-center">
                          <span className="hidden sm:inline">
                            {homepageCTA.variant === "A" ? "Calculate Your Website Cost" : "Get Your Free Quote Now"}
                          </span>
                          <span className="sm:hidden">{homepageCTA.variant === "A" ? "Get Quote" : "Free Quote"}</span>
                          <Rocket className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </Link>
                  </MagneticButton>

                  <MagneticButton>
                    <Link href="/packages" className="group w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="rounded-full h-12 sm:h-14 px-6 sm:px-8 border-2 border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 bg-transparent backdrop-blur-sm text-sm sm:text-lg font-semibold w-full sm:w-auto hover:bg-cyan-500/10 transition-all duration-300"
                      >
                        View Packages
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Specialty - Lazy loaded */}
        <LazySection className="relative py-12 sm:py-16 md:py-20 lg:py-28" style={{ zIndex: 10 }}>
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <AnimatedSection>
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white mb-3 sm:mb-4">
                  Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Specialty
                  </span>
                </h2>
                <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 px-4 sm:px-0">
                  Our streamlined approach to building your project
                </p>
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <GlassCard className="h-full hover:transform hover:scale-105 transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                        <div className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-2.5 sm:p-3 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300">
                          {step.icon}
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <h3 className="text-base sm:text-lg font-bold text-white">{step.title}</h3>
                          <p className="text-gray-400 text-xs sm:text-sm">{step.description}</p>
                          <div className="text-cyan-400 font-medium text-xs sm:text-sm">{step.duration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </GlassCard>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600" />
                  )}
                </div>
              ))}
            </StaggerContainer>
          </div>
        </LazySection>

        {/* Why Choose Us - Lazy loaded */}
        <LazySection className="relative py-12 sm:py-16 md:py-20 lg:py-28" style={{ zIndex: 10 }}>
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <AnimatedSection>
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-3 sm:mb-4">
                  Why Choose{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Us</span>
                </h2>
                <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 px-4 sm:px-0">
                  We deliver exceptional value through our expertise and commitment to quality
                </p>
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </StaggerContainer>
          </div>
        </LazySection>

        {/* CTA Section - Lazy loaded with no circles */}
        <LazySection className="relative py-12 sm:py-16 md:py-20 lg:py-28" style={{ zIndex: 10 }}>
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <AnimatedSection>
              <GlassCard className="max-w-6xl mx-auto p-6 sm:p-8 md:p-12 lg:p-16 hover:transform hover:scale-105 transition-all duration-500">
                <div className="text-center space-y-6 sm:space-y-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                    Ready to{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      Transform
                    </span>{" "}
                    Your Digital Presence?
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    Get a custom quote tailored to your specific business needs and requirements. Let&apos;s build something
                    amazing together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <MagneticButton className="w-full sm:w-auto">
                      <Link href="/pricing">
                        <Button className="relative overflow-hidden rounded-full h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.8)] transition-all duration-300 w-full sm:w-auto text-sm sm:text-base">
                          <span className="relative z-10">
                            <span className="hidden sm:inline">Calculate Your Website Cost</span>
                            <span className="sm:hidden">Get Quote</span>
                          </span>
                        </Button>
                      </Link>
                    </MagneticButton>
                    <MagneticButton className="w-full sm:w-auto">
                      <Link href="/contact">
                        <Button
                          variant="outline"
                          className="rounded-full h-11 sm:h-12 px-6 sm:px-8 border-2 border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 bg-transparent backdrop-blur-sm w-full sm:w-auto hover:bg-cyan-500/10 transition-all duration-300 text-sm sm:text-base"
                        >
                          Contact Us
                          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </LazySection>
      </div>
    </>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <GlassCard className="h-full group border-slate-700/50 bg-slate-900/50 transition-all duration-300">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col space-y-4 sm:space-y-6 h-full text-center sm:text-left">
          <div className="rounded-full bg-slate-800/80 backdrop-blur-sm p-3 sm:p-4 w-fit border border-slate-600/50 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] mx-auto sm:mx-0">
            {icon}
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{title}</h3>
          <p className="text-gray-300 leading-relaxed flex-grow text-sm sm:text-base">{description}</p>
        </div>
      </CardContent>
    </GlassCard>
  )
}
