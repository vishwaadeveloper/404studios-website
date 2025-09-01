"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, Search, Code, Layers, Send, Eye, ClipboardList, Settings, Rocket, LifeBuoy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"
import { ArcTimeline } from "@/components/magicui/arc-timeline"
import { FeatureCards } from "@/components/feature-cards"
import { Meteors } from "@/components/magicui/meteors"
import { Particles } from "@/components/magicui/particles"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { motion } from "framer-motion"

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

// How We Work timeline data
const howWeWorkData = [
  {
    time: "Step 1",
    steps: [
      { 
        icon: <Eye className="w-6 h-6" />, 
        content: "Discover & Understand - We begin by capturing your vision and business needs clearly and quickly."
      }
    ]
  },
  {
    time: "Step 2",
    steps: [
      { 
        icon: <ClipboardList className="w-6 h-6" />, 
        content: "Plan & Strategize - We create a detailed project plan using AI-driven insights to speed up decisions."
      }
    ]
  },
  {
    time: "Step 3",
    steps: [
      { 
        icon: <Settings className="w-6 h-6" />, 
        content: "Develop & Build - Your website or app is built with modern frameworks and AI-optimized workflows."
      }
    ]
  },
  {
    time: "Step 4",
    steps: [
      { 
        icon: <Rocket className="w-6 h-6" />, 
        content: "Test & Launch - We thoroughly test on all devices to ensure a smooth, flawless launch."
      }
    ]
  },
  {
    time: "Step 5",
    steps: [
      { 
        icon: <LifeBuoy className="w-6 h-6" />, 
        content: "Support & Optimize - Continuous support and AI-powered optimization keep your systems updated."
      }
    ]
  }
]

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
          ]),
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroSection />

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* How We Work */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">
                How We{" "}
                <span className="text-primary">
                  Work
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">
                Our proven 5-step process to transform your ideas into reality
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <ArcTimeline 
                data={howWeWorkData}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Feature Cards */}
        <FeatureCards />

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* CTA Section - Cinematic Hero Style */}
        <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
          {/* Meteors Background Effect */}
          <Meteors number={20} className="absolute inset-0" />
          
          {/* Particles Background Effect */}
          <Particles
            className="absolute inset-0"
            quantity={80}
            ease={70}
            color="#6366f1"
            staticity={40}
            size={0.8}
          />

          {/* Content Container */}
          <div className="relative z-10 container px-4 sm:px-6 md:px-8 mx-auto text-center">
            {/* Animated Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 sm:space-y-8 mb-8 sm:mb-12"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                Ready to{" "}
                <motion.span 
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient-shift"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  Transform
                </motion.span>{" "}
                Your Digital Presence?
              </h2>
              
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Get a custom quote tailored to your specific business needs and requirements. 
                Let&apos;s build something amazing together.
              </motion.p>
            </motion.div>

            {/* Animated Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Primary CTA - Shimmer Button */}
              <Link href="/pricing">
                <ShimmerButton
                  shimmerColor="#ffffff"
                  shimmerSize="0.1em"
                  shimmerDuration="2s"
                  borderRadius="12px"
                  background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  className="text-white font-semibold text-lg px-8 py-4 min-w-[280px] transform hover:scale-105 transition-transform duration-300"
                >
                  Calculate Your Website Cost
                </ShimmerButton>
              </Link>

              {/* Secondary CTA - Enhanced Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 min-w-[240px] border-2 border-purple-300/50 bg-background/80 backdrop-blur-sm hover:bg-purple-50/10 hover:border-purple-300 transition-all duration-300 group"
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    Contact Us
                    <motion.div
                      className="flex items-center"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Ambient Glow Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          </div>
        </section>
      </div>
    </>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="h-full">
      <CardHeader className="text-center sm:text-left">
        <div className="rounded-full bg-primary/10 text-primary p-3 sm:p-4 w-fit border border-primary/20 mx-auto sm:mx-0 mb-4">
          {icon}
        </div>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed text-sm sm:text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
