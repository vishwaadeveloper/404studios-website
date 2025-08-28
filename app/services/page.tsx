"use client"

import type React from "react"

import {
  ArrowRight,
  Plus,
  Minus,
  Play,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Clean Architecture Imports
import { useServicesManager } from "@/src/features/services/hooks/useServicesManager"
import type { Service } from "@/src/features/services/types/services.types"

export default function ServicesPage() {
  // Use clean architecture hook for business logic
  const {
    services,
    selectedFeatures,
    addFeature,
    removeFeature,
    totalPrice,
    getServicesByCategory,
  } = useServicesManager()

  return (
    <div className="relative min-h-screen">

      {/* Header */}
      <section className="relative pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16 z-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs"
              >
                Individual Features
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-2 sm:px-0">
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
            <div className="lg:col-span-3">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 sm:mb-8 grid grid-cols-2 sm:grid-cols-4 w-full">
                  <TabsTrigger
                    value="all"
                    className="text-xs sm:text-sm"
                  >
                    All Services
                  </TabsTrigger>
                  <TabsTrigger
                    value="frontend"
                    className="text-xs sm:text-sm"
                  >
                    Frontend
                  </TabsTrigger>
                  <TabsTrigger
                    value="backend"
                    className="text-xs sm:text-sm"
                  >
                    Backend
                  </TabsTrigger>
                  <TabsTrigger
                    value="mobile"
                    className="text-xs sm:text-sm"
                  >
                    Mobile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    {getServicesByCategory("all").map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={selectedFeatures.includes(service.id)}
                        onAdd={() => addFeature(service.id)}
                        onRemove={() => removeFeature(service.id)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="frontend" className="mt-0">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    {getServicesByCategory("frontend").map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={selectedFeatures.includes(service.id)}
                        onAdd={() => addFeature(service.id)}
                        onRemove={() => removeFeature(service.id)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="backend" className="mt-0">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    {getServicesByCategory("backend").map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={selectedFeatures.includes(service.id)}
                        onAdd={() => addFeature(service.id)}
                        onRemove={() => removeFeature(service.id)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    {getServicesByCategory("mobile").map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={selectedFeatures.includes(service.id)}
                        onAdd={() => addFeature(service.id)}
                        onRemove={() => removeFeature(service.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Floating Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 sm:top-24">
                <Card className="h-full">
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
                          <span className="text-foreground font-medium text-sm sm:text-base">Total:</span>
                          <span className="text-lg sm:text-2xl font-bold text-primary">
                            ₹{totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <Link href="/contact">
                          <Button className="w-full text-xs sm:text-sm">
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
    <Card className="h-full">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="rounded-full bg-slate-800 p-2 sm:p-3 border border-slate-600 group-hover:border-cyan-500 transition-colors duration-300 flex-shrink-0">
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
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{service.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl font-bold text-primary">
              ₹{service.price.min.toLocaleString()} - ₹{service.price.max.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          {service.demoUrl && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs sm:text-sm"
            >
              <Play className="mr-1 sm:mr-2 h-3 w-3" />
              Demo
            </Button>
          )}
          <Button
            size="sm"
            onClick={isSelected ? onRemove : onAdd}
            variant={isSelected ? "destructive" : "default"}
            className="flex-1 text-xs sm:text-sm"
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
