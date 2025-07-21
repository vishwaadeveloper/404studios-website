"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowRight,
  Plus,
  Minus,
  Play,
  Code,
  Database,
  Smartphone,
  Search,
  CreditCard,
  Calendar,
  BarChart,
  Shield,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ParticleBackground from "@/components/particle-background"
import Link from "next/link"

interface Service {
  id: string
  name: string
  description: string
  price: { min: number; max: number }
  category: string
  icon: React.ReactNode
  demoUrl?: string
}

export default function ServicesPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const addFeature = (featureId: string) => {
    if (!selectedFeatures.includes(featureId)) {
      setSelectedFeatures((prev) => [...prev, featureId])
    }
  }

  const removeFeature = (featureId: string) => {
    setSelectedFeatures((prev) => prev.filter((id) => id !== featureId))
  }

  // Calculate total price of selected features
  const totalPrice = selectedFeatures.reduce((total, featureId) => {
    const feature = services.find((s) => s.id === featureId)
    return total + (feature ? feature.price.min : 0)
  }, 0)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-slate-800">
      <ParticleBackground />

      {/* Header */}
      <section className="relative pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16 z-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="border-cyan-500 text-cyan-500 px-2 py-1 sm:px-3 sm:py-1.5 text-xs backdrop-blur-sm bg-black/20 animate-pulse-glow"
              >
                Individual Features
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x leading-tight">
                Our Services
              </h1>
              <p className="max-w-[700px] text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed animate-fade-in-up animation-delay-200 px-2 sm:px-0">
                Explore our individual features and add-ons to customize your project
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid with Floating Sidebar */}
      <section className="relative py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3 animate-fade-in-left">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-slate-800/50 mb-6 sm:mb-8 grid grid-cols-2 sm:grid-cols-4 w-full">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs sm:text-sm"
                  >
                    All Services
                  </TabsTrigger>
                  <TabsTrigger
                    value="frontend"
                    className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs sm:text-sm"
                  >
                    Frontend
                  </TabsTrigger>
                  <TabsTrigger
                    value="backend"
                    className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs sm:text-sm"
                  >
                    Backend
                  </TabsTrigger>
                  <TabsTrigger
                    value="mobile"
                    className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs sm:text-sm"
                  >
                    Mobile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    {services.map((service, index) => (
                      <div
                        key={service.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ServiceCard
                          service={service}
                          isSelected={selectedFeatures.includes(service.id)}
                          onAdd={() => addFeature(service.id)}
                          onRemove={() => removeFeature(service.id)}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="frontend" className="mt-0">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    {services
                      .filter((service) => service.category === "frontend")
                      .map((service, index) => (
                        <div
                          key={service.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <ServiceCard
                            service={service}
                            isSelected={selectedFeatures.includes(service.id)}
                            onAdd={() => addFeature(service.id)}
                            onRemove={() => removeFeature(service.id)}
                          />
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="backend" className="mt-0">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    {services
                      .filter((service) => service.category === "backend")
                      .map((service, index) => (
                        <div
                          key={service.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <ServiceCard
                            service={service}
                            isSelected={selectedFeatures.includes(service.id)}
                            onAdd={() => addFeature(service.id)}
                            onRemove={() => removeFeature(service.id)}
                          />
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    {services
                      .filter((service) => service.category === "mobile")
                      .map((service, index) => (
                        <div
                          key={service.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <ServiceCard
                            service={service}
                            isSelected={selectedFeatures.includes(service.id)}
                            onAdd={() => addFeature(service.id)}
                            onRemove={() => removeFeature(service.id)}
                          />
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Floating Sidebar */}
            <div className="lg:col-span-1 animate-fade-in-right">
              <div className="sticky top-20 sm:top-24">
                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-md hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)] transition-all duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-white text-base sm:text-lg">Selected Features</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Build your custom package</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                    {selectedFeatures.length === 0 ? (
                      <p className="text-gray-400 text-xs sm:text-sm">No features selected yet</p>
                    ) : (
                      <div className="space-y-2">
                        {selectedFeatures.map((featureId) => {
                          const feature = services.find((s) => s.id === featureId)
                          if (!feature) return null
                          return (
                            <div
                              key={featureId}
                              className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-slate-800/50 group hover:bg-slate-800/70 transition-colors duration-300"
                            >
                              <div className="flex items-center space-x-2 min-w-0 flex-1">
                                <div className="text-cyan-400 flex-shrink-0">{feature.icon}</div>
                                <span className="text-white text-xs sm:text-sm truncate">{feature.name}</span>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <span className="text-cyan-400 text-xs sm:text-sm">
                                  ₹{feature.price.min.toLocaleString()}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeFeature(featureId)}
                                  className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                  <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {selectedFeatures.length > 0 && (
                      <>
                        <Separator className="bg-slate-700" />
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm sm:text-base">Total:</span>
                          <span className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            ₹{totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <Link href="/contact">
                          <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition-all duration-300 text-xs sm:text-sm">
                            Get Quote
                            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </Link>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(56, 189, 248, 0.6);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}

interface ServiceCardProps {
  service: Service
  isSelected: boolean
  onAdd: () => void
  onRemove: () => void
}

function ServiceCard({ service, isSelected, onAdd, onRemove }: ServiceCardProps) {
  return (
    <Card className="group border-slate-800 bg-slate-900/50 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)] transition-all duration-300 h-full">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="rounded-full bg-slate-800/80 backdrop-blur-sm p-2 sm:p-3 border border-slate-600/50 group-hover:border-cyan-500/50 transition-colors duration-300 flex-shrink-0">
              {service.icon}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-white text-sm sm:text-base md:text-lg group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                {service.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="border-slate-600/50 text-gray-400 text-xs px-1 sm:px-2 py-0.5">
                  {service.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 flex flex-col justify-between flex-1">
        <div className="space-y-3 sm:space-y-4">
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{service.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              ₹{service.price.min.toLocaleString()} - ₹{service.price.max.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          {service.demoUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-gray-300 hover:text-cyan-400 hover:border-cyan-500 bg-transparent backdrop-blur-sm flex-1 text-xs sm:text-sm"
            >
              <Play className="mr-1 sm:mr-2 h-3 w-3" />
              Demo
            </Button>
          )}
          <Button
            size="sm"
            onClick={isSelected ? onRemove : onAdd}
            className={`flex-1 transition-all duration-300 text-xs sm:text-sm ${
              isSelected
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
            }`}
          >
            {isSelected ? (
              <>
                <Minus className="mr-1 sm:mr-2 h-3 w-3" />
                Remove
              </>
            ) : (
              <>
                <Plus className="mr-1 sm:mr-2 h-3 w-3" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const services: Service[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    description: "High-converting landing page with modern design and animations",
    price: { min: 15000, max: 50000 },
    category: "frontend",
    icon: <Code className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />,
    demoUrl: "#",
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    description: "Full-featured online store with payment integration and admin panel",
    price: { min: 75000, max: 200000 },
    category: "frontend",
    icon: <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />,
    demoUrl: "#",
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    description: "Cross-platform mobile application for iOS and Android",
    price: { min: 100000, max: 300000 },
    category: "mobile",
    icon: <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />,
    demoUrl: "#",
  },
  {
    id: "api-development",
    name: "API Development",
    description: "RESTful API with authentication, database integration, and documentation",
    price: { min: 25000, max: 75000 },
    category: "backend",
    icon: <Database className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />,
    demoUrl: "#",
  },
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    description: "Complete SEO audit and optimization for better search rankings",
    price: { min: 10000, max: 30000 },
    category: "frontend",
    icon: <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />,
    demoUrl: "#",
  },
  {
    id: "booking-system",
    name: "Booking System",
    description: "Appointment booking system with calendar integration and notifications",
    price: { min: 40000, max: 100000 },
    category: "backend",
    icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />,
    demoUrl: "#",
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Custom analytics dashboard with real-time data visualization",
    price: { min: 50000, max: 150000 },
    category: "frontend",
    icon: <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />,
    demoUrl: "#",
  },
  {
    id: "security-audit",
    name: "Security Audit",
    description: "Comprehensive security assessment and vulnerability testing",
    price: { min: 20000, max: 60000 },
    category: "backend",
    icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />,
    demoUrl: "#",
  },
]
