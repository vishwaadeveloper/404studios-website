"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, Zap, Rocket, Search, Code, Layers, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

// Features data
const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Optimized for speed and performance with modern web technologies and best practices.",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Modern Stack",
    description: "Built with cutting-edge technologies like React, Next.js, and TypeScript for scalability.",
  },
  {
    icon: <ArrowRight className="w-8 h-8" />,
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

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28">
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">
              <Badge
                variant="outline"
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
              >
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Next-Gen Web Development
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tighter leading-tight">
                <span className="text-primary">
                  Futuristic
                </span>
                <br />
                <span className="text-foreground">Digital Experiences</span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4 sm:px-0">
                We build cutting-edge web and mobile applications with the latest technologies, stunning designs, and
                seamless user experiences that define the future.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
                <Button asChild size="lg" className="w-full sm:w-auto group">
                  <Link href="/pricing" onClick={homepageCTA.trackClick}>
                    <span className="hidden sm:inline">
                      {homepageCTA.variant === "A" ? "Calculate Your Website Cost" : "Get Your Free Quote Now"}
                    </span>
                    <span className="sm:hidden">{homepageCTA.variant === "A" ? "Get Quote" : "Free Quote"}</span>
                    <Rocket className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto group"
                >
                  <Link href="/packages">
                    View Packages
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Specialty */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="container px-4 sm:px-6 md:px-8 mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-3 sm:mb-4">
                Our{" "}
                <span className="text-primary">
                  Specialty
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">
                Our streamlined approach to building your project
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <Card className="h-full">
                    <CardHeader className="text-center">
                      <div className="rounded-full bg-primary/10 text-primary p-2.5 sm:p-3 border border-primary/20 mx-auto mb-2">
                        {step.icon}
                      </div>
                      <CardTitle className="text-base sm:text-lg">{step.title}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{step.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                      <div className="text-primary font-medium text-xs sm:text-sm">{step.duration}</div>
                    </CardFooter>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                  )}
                </div>
              ))}
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
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
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
