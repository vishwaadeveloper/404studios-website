"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, Zap, Rocket, Search, Code, Layers, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

// Features data for "Why Choose Us" section
const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and performance with modern web technologies and best practices.",
  },
  {
    icon: Rocket,
    title: "Modern Stack",
    description: "Built with cutting-edge technologies like React, Next.js, and TypeScript for scalability.",
  },
  {
    icon: ArrowRight,
    title: "Future-Ready",
    description: "Designed to evolve with your business needs and adapt to emerging technologies.",
  },
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

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28">
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">
              <Badge
                variant="secondary"
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors"
                style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35', borderColor: 'rgba(255, 107, 53, 0.3)' }}
              >
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Next-Gen Web Development
              </Badge>

              <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                <div className="h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] 2xl:h-[36rem] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Hero Content Area</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Specialty */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3 sm:mb-4">
                Our{" "}
                <span className="text-primary">
                  Specialty
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">
                Our streamlined approach to building your project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Fast Development",
                  description: "Quick turnaround with efficient workflows",
                  icon: Zap
                },
                {
                  title: "Modern Technology", 
                  description: "Latest frameworks and best practices",
                  icon: Code
                },
                {
                  title: "SEO Optimized",
                  description: "Built for search engine visibility",
                  icon: Search
                }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-6 h-6 text-primary" />
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/50">
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3 sm:mb-4">
                Why Choose{" "}
                <span className="text-primary">Us</span>
              </h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">
                We deliver exceptional value through our expertise and commitment to quality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {features.map((feature) => {
                const Icon = feature.icon as React.ComponentType<{ className?: string }>
                return (
                  <Card key={feature.title} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-6 h-6 text-primary" />
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <Card className="max-w-6xl mx-auto">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Ready to{" "}
                  <span className="text-primary">
                    Transform
                  </span>{" "}
                  Your Digital Presence?
                </CardTitle>
                <CardDescription className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                  Get a custom quote tailored to your specific business needs and requirements. Let&apos;s build something
                  amazing together.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/pricing">
                    <span className="hidden sm:inline">Calculate Your Website Cost</span>
                    <span className="sm:hidden">Get Quote</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
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
