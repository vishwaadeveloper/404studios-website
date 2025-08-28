"use client"

import Link from "next/link"
import {
  ChevronDown,
  ChevronRight,
  Layers,
  ArrowRight,
  Rocket,
  CheckCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useFeaturesCatalog } from "@/src/features/features-catalog"

export default function FeaturesPage() {
  const { 
    featureCatalog, 
    openSections, 
    openFeatures, 
    toggleSection, 
    toggleFeature, 
    isOpen 
  } = useFeaturesCatalog()

  return (
    <div className="relative min-h-screen">

      {/* Header */}
      <section className="relative pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16 xl:pt-40 xl:pb-20 z-20">
        <div className="container px-3 sm:px-4 md:px-6 lg:px-8 mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="border-cyan-500 text-cyan-500 px-2 py-1 sm:px-3 sm:py-1.5 text-xs backdrop-blur-sm bg-black/20 animate-pulse-glow mb-3 sm:mb-4 md:mb-6"
            >
              <Layers className="w-3 h-3 mr-1 sm:mr-1.5" />
              Complete Feature Guide
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tighter mb-3 sm:mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Features & Tiers
              </span>
              <br />
              <span className="text-white">Explained</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed px-2 sm:px-4 md:px-0 mb-6 sm:mb-8">
              Understand exactly what goes into your custom website. Every feature, every tier, explained in plain
              English to help you make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-2 sm:px-0">
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button className="relative overflow-hidden rounded-full h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.8)] transition-all duration-300 w-full hover:transform hover:scale-105 text-xs sm:text-sm md:text-base">
                  <span className="relative z-10">Build Your Quote</span>
                  <Rocket className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="rounded-full h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 border-2 border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 bg-transparent backdrop-blur-sm w-full hover:bg-cyan-500/10 transition-all duration-300 hover:transform hover:scale-105 text-xs sm:text-sm md:text-base"
                >
                  Get Consultation
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 z-20">
        <div className="container px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-6xl">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
            {featureCatalog.map((section, sectionIndex) => (
              <Card
                key={section.group}
                className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${sectionIndex * 0.1}s` }}
              >
                <Collapsible
                  open={isOpen(openSections, section.group)}
                  onOpenChange={() => toggleSection(section.group)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-800/30 transition-colors duration-300 rounded-t-lg p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                          <div className="rounded-full bg-slate-800/80 backdrop-blur-sm p-2 sm:p-3 border border-slate-600/50 flex-shrink-0">
                            {section.icon}
                          </div>
                          <div className="text-left min-w-0 flex-1">
                            <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-1 sm:mb-2 leading-tight">
                              {section.group}
                            </CardTitle>
                            <CardDescription className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                              {section.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                          <Badge
                            variant="outline"
                            className="border-slate-600/50 text-gray-400 text-xs px-1 sm:px-2 py-0.5"
                          >
                            {section.features.length}
                          </Badge>
                          {isOpen(openSections, section.group) ? (
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-300" />
                          ) : (
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-300" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="animate-slide-down">
                    <CardContent className="pt-0 p-4 sm:p-6 space-y-4 sm:space-y-6">
                      {section.features.map((feature, featureIndex) => (
                        <div
                          key={feature.feature}
                          className="border-l-2 border-slate-700/50 pl-3 sm:pl-4 md:pl-6 ml-2 sm:ml-3"
                        >
                          <Collapsible
                            open={isOpen(openFeatures, feature.feature)}
                            onOpenChange={() => toggleFeature(feature.feature)}
                          >
                            <CollapsibleTrigger asChild>
                              <div className="cursor-pointer group">
                                <div className="flex items-start justify-between mb-2 hover:bg-slate-800/20 rounded-lg p-2 sm:p-3 -ml-2 sm:-ml-3 transition-colors duration-300">
                                  <div className="min-w-0 flex-1 pr-2">
                                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight mb-1">
                                      {feature.feature}
                                    </h4>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                                      {feature.explanation}
                                    </p>
                                  </div>
                                  {isOpen(openFeatures, feature.feature) ? (
                                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 transition-transform duration-300 flex-shrink-0 mt-1" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 transition-transform duration-300 flex-shrink-0 mt-1" />
                                  )}
                                </div>
                              </div>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="animate-slide-down">
                              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 sm:mt-4 mb-4 sm:mb-6">
                                {feature.tiers.map((tier, tierIndex) => (
                                  <Card
                                    key={tier.tier}
                                    className={`border transition-all duration-300 hover:transform hover:scale-105 ${
                                      tier.tier === "Basic"
                                        ? "border-green-500/30 bg-green-500/5"
                                        : tier.tier === "Standard"
                                          ? "border-cyan-500/30 bg-cyan-500/5"
                                          : "border-purple-500/30 bg-purple-500/5"
                                    }`}
                                  >
                                    <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                                      <div className="flex items-center space-x-2">
                                        <CheckCircle
                                          className={`h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 ${
                                            tier.tier === "Basic"
                                              ? "text-green-400"
                                              : tier.tier === "Standard"
                                                ? "text-cyan-400"
                                                : "text-purple-400"
                                          }`}
                                        />
                                        <CardTitle
                                          className={`text-sm sm:text-base font-semibold leading-tight ${
                                            tier.tier === "Basic"
                                              ? "text-green-400"
                                              : tier.tier === "Standard"
                                                ? "text-cyan-400"
                                                : "text-purple-400"
                                          }`}
                                        >
                                          {tier.tier}
                                        </CardTitle>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 p-3 sm:p-4">
                                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{tier.include}</p>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      ))}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-28 z-20">
        <div className="container px-3 sm:px-4 md:px-6 lg:px-8 mx-auto">
          <Card className="max-w-4xl mx-auto border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                Ready to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Build Your Vision?
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
                Now that you understand our features and tiers, let&apos;s create a custom quote tailored to your specific
                needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-2 sm:px-0">
                <Link href="/pricing" className="w-full sm:w-auto">
                  <Button className="relative overflow-hidden rounded-full h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.8)] transition-all duration-300 w-full hover:transform hover:scale-105 text-xs sm:text-sm md:text-base">
                    <span className="relative z-10">Start Building Quote</span>
                    <Rocket className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="rounded-full h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 border-2 border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 bg-transparent backdrop-blur-sm w-full hover:bg-cyan-500/10 transition-all duration-300 hover:transform hover:scale-105 text-xs sm:text-sm md:text-base"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
