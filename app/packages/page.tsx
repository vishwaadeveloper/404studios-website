"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronRight,
  Code,
  Database,
  Layers,
  Shield,
  MessageCircle,
  Settings,
  ArrowRight,
  Rocket,
  CheckCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import ParticleBackground from "@/components/particle-background"

const featureData = [
  {
    group: "Core Website Features",
    icon: <Code className="h-6 w-6 text-cyan-400" />,
    description: "Essential building blocks for any modern website",
    features: [
      {
        feature: "Static Page",
        explanation: "A classic site page (like Home, About, or Contact)—always mobile friendly.",
        tiers: [
          {
            tier: "Basic",
            include:
              "A straightforward web page with text and images, built to look clean and function well on any device. No advanced layouts.",
          },
          {
            tier: "Standard",
            include:
              "A custom-designed page with richer structure, sections, and subtle UI animations. Handles more detailed content and gives your brand a distinct feel.",
          },
          {
            tier: "Advanced",
            include:
              "Highly-polished layouts with interactive sections, advanced CSS/JS effects, and modular structure for maximum impact.",
          },
        ],
      },
      {
        feature: "Dynamic Page",
        explanation: "Content-managed pages—blogs, listings, etc.—easily updatable by you.",
        tiers: [
          {
            tier: "Basic",
            include:
              "A content-managed page (like a blog or news feed) editable from your admin panel. Data is stored in a backend, and updates are instant.",
          },
          {
            tier: "Standard",
            include:
              "Adds user-friendly search, filtering, and richer content types. Ideal for product listings, event calendars, or portfolios needing more interactivity.",
          },
          {
            tier: "Advanced",
            include:
              "Enables user accounts, permissions, analytics modules, custom content types, and API-driven data integrations—suited for dashboards or complex listings.",
          },
        ],
      },
      {
        feature: "Animations & Interactions",
        explanation: "Modern motion effects—from subtle hovers to 3D wow.",
        tiers: [
          {
            tier: "Basic",
            include: "Smooth transitions (e.g., fades, button animations) that make the experience feel modern.",
          },
          {
            tier: "Standard",
            include: "Section reveals, scroll effects, and basic parallax motion for an engaging, interactive flow.",
          },
          {
            tier: "Advanced",
            include:
              "High-end animations and 3D or scroll-driven interactive UI—think immersive effects, animated cards, or visual storytelling.",
          },
        ],
      },
      {
        feature: "Image Gallery",
        explanation: "Visually showcase your photos, work, or products.",
        tiers: [
          { tier: "Basic", include: "Grid layout of images with basic click-to-enlarge (lightbox functionality)." },
          {
            tier: "Standard",
            include:
              "Includes filtering options, subtle entry animations, and responsive design so galleries adapt to any screen.",
          },
          {
            tier: "Advanced",
            include: "Enhanced lightboxes, custom carousels/sliders, and built-in sharing or tagging.",
          },
        ],
      },
      {
        feature: "Contact Form",
        explanation: "Let customers contact you in one click.",
        tiers: [
          {
            tier: "Basic",
            include: "Standard online form with necessary fields. Secure and delivers queries to your email.",
          },
          {
            tier: "Standard",
            include: "Adds dynamic validation, spam prevention, and support for custom contact fields.",
          },
          {
            tier: "Advanced",
            include:
              "Multi-step forms, file uploads, conditional logic (fields can change based on user input), and backend routing for smarter response handling.",
          },
        ],
      },
      {
        feature: "SEO Essentials",
        explanation: "Foundational tools for being discovered on Google.",
        tiers: [
          {
            tier: "Basic",
            include: "Meta tags set up, sitemap.xml, and basic mobile/desktop optimization for discoverability.",
          },
          {
            tier: "Standard",
            include:
              "Social media previews (Open Graph), Google Analytics integration, and schema markup for better search result snippets.",
          },
          {
            tier: "Advanced",
            include:
              "Technical SEO (structured data, advanced schema), content suggestions, and regular audits for ongoing improvement.",
          },
        ],
      },
    ],
  },
  {
    group: "Business & Transactional Features",
    icon: <Database className="h-6 w-6 text-purple-400" />,
    description: "Advanced functionality for commerce and user management",
    features: [
      {
        feature: "User Authentication",
        explanation: "Let visitors create secure accounts and control what they access.",
        tiers: [
          {
            tier: "Basic",
            include: "User registration and login forms, password reset via email, with security best practices.",
          },
          { tier: "Standard", include: "Profile pages, email verification for signup, and basic permission controls." },
          {
            tier: "Advanced",
            include: "Social logins (Google/Facebook), 2FA, and granular access levels for different user types.",
          },
        ],
      },
      {
        feature: "Payment Integration",
        explanation: "Accept payments through trusted online gateways, all secure.",
        tiers: [
          { tier: "Basic", include: "Single provider (e.g., UPI, major card) connected via secure gateway." },
          {
            tier: "Standard",
            include: "Multiple payment options, order/invoice linking, and payment status tracking.",
          },
          {
            tier: "Advanced",
            include: "Support for subscriptions, custom payment flows, and detailed payment reporting.",
          },
        ],
      },
      {
        feature: "Cart & Checkout",
        explanation: "From browsing to buying—manage every step for online sales.",
        tiers: [
          { tier: "Basic", include: "Simple cart and checkout system—core add-to-cart and purchase flow." },
          {
            tier: "Standard",
            include: "Cart persistence, coupon codes, customer addresses, and save-for-later features.",
          },
          {
            tier: "Advanced",
            include: "Automation (abandoned cart emails), analytics, and custom checkout experiences.",
          },
        ],
      },
      {
        feature: "Booking/Appointment System",
        explanation: "Let clients schedule services or meetings in seconds.",
        tiers: [
          { tier: "Basic", include: "Scheduling for a single service. Admin approves bookings from the backend." },
          {
            tier: "Standard",
            include:
              "Multiple services, automated reminders, customer self-management, and real-time calendar updates.",
          },
          {
            tier: "Advanced",
            include:
              "Full workflow automation (e.g., payment-on-booking), recurring reservations, customer dashboard, and analytics integration.",
          },
        ],
      },
      {
        feature: "Admin Panel",
        explanation: "Your all-in-one dashboard to publish, manage, and analyze—powered by Directus.",
        tiers: [
          {
            tier: "Basic",
            include: "Visual dashboard for managing pages, media, and core content. Standard user access.",
          },
          { tier: "Standard", include: "Modules for orders, bookings, product management, and basic analytics." },
          {
            tier: "Advanced",
            include:
              "Customizable roles and permissions, workflow automations, API/webhook integrations, and advanced analytics.",
          },
        ],
      },
    ],
  },
  {
    group: "Growth & Communication",
    icon: <MessageCircle className="h-6 w-6 text-green-400" />,
    description: "Tools to engage visitors and grow your audience",
    features: [
      {
        feature: "Testimonials/Reviews",
        explanation: "Build trust with real customer feedback.",
        tiers: [
          { tier: "Basic", include: "Site admin displays and updates a fixed set of customer quotes or reviews." },
          { tier: "Standard", include: "User reviews/ratings, slider or carousel display, moderation by admin." },
          { tier: "Advanced", include: "End-users submit reviews onsite, advanced moderation and filtering support." },
        ],
      },
      {
        feature: "Newsletter Signup",
        explanation: "Grow your audience and nurture leads for email marketing.",
        tiers: [
          { tier: "Basic", include: "Single-field email capture with manual export/download option." },
          { tier: "Standard", include: "Automated integration with newsletter platforms, segmentation support." },
          {
            tier: "Advanced",
            include: "Double opt-in flows, analytics, and personalized subscription management for visitors.",
          },
        ],
      },
      {
        feature: "Live Chat/Chatbot",
        explanation: "Connect with visitors instantly—live or automated.",
        tiers: [
          { tier: "Basic", include: "Operator chat box for direct messaging during set business hours." },
          { tier: "Standard", include: "Automated chat assistance (scripts or basic AI), FAQ handling." },
          { tier: "Advanced", include: "AI-powered (GPT-class) chat, custom knowledge integration, 24/7 response." },
        ],
      },
      {
        feature: "Blog/Content Module",
        explanation: "Share updates, resources, and articles for SEO and authority.",
        tiers: [
          { tier: "Basic", include: "Admin-published articles with a simple editor and basic categories/tags." },
          { tier: "Standard", include: "Rich media content, SEO formatting, author profiles, and scheduling." },
          { tier: "Advanced", include: "User submissions, commenting, multimedia, and advanced publishing workflows." },
        ],
      },
      {
        feature: "Multilingual Support",
        explanation: "Make your content available in multiple languages.",
        tiers: [
          { tier: "Basic", include: "Supports one additional language; users enter all content manually." },
          { tier: "Standard", include: "Three language support, language-picker UI, content in multiple languages." },
          {
            tier: "Advanced",
            include: "Automated translation tools, unlimited languages, and CMS-driven content management.",
          },
        ],
      },
    ],
  },
  {
    group: "Backend & Integrations",
    icon: <Settings className="h-6 w-6 text-orange-400" />,
    description: "Technical infrastructure and third-party connections",
    features: [
      {
        feature: "Supabase/Firebase Backend",
        explanation: "Fast, modern backends for app-like experiences.",
        tiers: [
          { tier: "Basic", include: "User auth, basic data storage, and real-time updates." },
          { tier: "Standard", include: "Custom data models, file storage, and serverless functions." },
          { tier: "Advanced", include: "Role permissions, advanced triggers, API integrations." },
        ],
      },
      {
        feature: "Custom Backend/API",
        explanation: "Tailored data & integration for your unique needs.",
        tiers: [
          { tier: "Basic", include: "Simple CRUD endpoints, connection for data display or collection." },
          { tier: "Standard", include: "Secure authentication, role-based APIs, and business automation logic." },
          {
            tier: "Advanced",
            include: "Complex, scalable APIs, real-time callbacks, third-party integration support.",
          },
        ],
      },
      {
        feature: "Analytics Dashboard",
        explanation: "Visualize site visits and user behavior data.",
        tiers: [
          { tier: "Basic", include: "Google Analytics embed, page traffic, basic engagement stats." },
          { tier: "Standard", include: "Custom events, conversion funnel tracking, dashboard visualizations." },
          { tier: "Advanced", include: "Real-time metrics, advanced segmenting, and export features." },
        ],
      },
      {
        feature: "Performance Optimization",
        explanation: "Make your site load and run at its absolute best.",
        tiers: [
          { tier: "Basic", include: "Lazy image loading, asset minification, and gzip compression." },
          { tier: "Standard", include: "Code splitting, CDN integration, advanced caching." },
          { tier: "Advanced", include: "In-depth audits, custom runtime tuning, uptime/load monitoring." },
        ],
      },
    ],
  },
  {
    group: "After-Launch Support",
    icon: <Shield className="h-6 w-6 text-blue-400" />,
    description: "Ongoing maintenance and optimization services",
    features: [
      {
        feature: "Maintenance & Support",
        explanation: "Keep your site healthy with ongoing support.",
        tiers: [
          { tier: "Basic", include: "Occasional support via email, minor bug fixes, basic uptime monitoring." },
          { tier: "Standard", include: "Regular content updates, troubleshooting, and system health checks." },
          { tier: "Advanced", include: "Priority help, proactive monitoring, and upgrade management." },
        ],
      },
      {
        feature: "SEO Optimization",
        explanation: "Set your site up for ongoing search success.",
        tiers: [
          { tier: "Basic", include: "Snapshot SEO review (titles, tags, crawl), basic improvement suggestions." },
          {
            tier: "Standard",
            include: "Social previews, enhanced metadata, performance tuning, and competitor insight.",
          },
          {
            tier: "Advanced",
            include: "Full-site technical audit, deep analysis, search ranking tracking, and actionable plan.",
          },
        ],
      },
      {
        feature: "Custom Add-ons (AI, 3D, etc.)",
        explanation: "Future-ready extras like AI chatbots or interactive 3D.",
        tiers: [
          { tier: "Basic", include: "Simple add-on (e.g., animated widget or basic AI bot for FAQs)" },
          { tier: "Standard", include: "Trained AI assistant or interactive 3D product/scene." },
          {
            tier: "Advanced",
            include: "Deeply integrated AI, business automation, or fully custom 3D/AR/VR features.",
          },
        ],
      },
    ],
  },
]

export default function FeaturesPage() {
  const [openSections, setOpenSections] = useState<string[]>([])
  const [openFeatures, setOpenFeatures] = useState<string[]>([])

  const toggleSection = (sectionName: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionName) ? prev.filter((name) => name !== sectionName) : [...prev, sectionName],
    )
  }

  const toggleFeature = (featureName: string) => {
    setOpenFeatures((prev) =>
      prev.includes(featureName) ? prev.filter((name) => name !== featureName) : [...prev, featureName],
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <ParticleBackground />

      {/* Header */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20 z-20">
        <div className="container px-4 sm:px-6 md:px-8 mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="border-cyan-500 text-cyan-500 px-3 py-1.5 text-xs sm:text-sm backdrop-blur-sm bg-black/20 animate-pulse-glow mb-4 sm:mb-6"
            >
              <Layers className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Complete Feature Guide
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Features, Tiers &
              </span>
              <br />
              <span className="text-white">Pricing Explained</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4 sm:px-0 mb-8">
              Understand exactly what goes into your custom website. Every feature, every tier, explained in plain
              English to help you make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/calculator">
                <Button className="relative overflow-hidden rounded-full h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.8)] transition-all duration-300 w-full sm:w-auto hover:transform hover:scale-105 text-sm sm:text-base">
                  <span className="relative z-10">Build Your Quote</span>
                  <Rocket className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-full h-11 sm:h-12 px-6 sm:px-8 border-2 border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 bg-transparent backdrop-blur-sm w-full sm:w-auto hover:bg-cyan-500/10 transition-all duration-300 hover:transform hover:scale-105 text-sm sm:text-base"
                >
                  Get Consultation
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 z-20">
        <div className="container px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
          <div className="space-y-8 sm:space-y-12">
            {featureData.map((section, sectionIndex) => (
              <Card
                key={section.group}
                className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${sectionIndex * 0.1}s` }}
              >
                <Collapsible
                  open={openSections.includes(section.group)}
                  onOpenChange={() => toggleSection(section.group)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-800/30 transition-colors duration-300 rounded-t-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="rounded-full bg-slate-800/80 backdrop-blur-sm p-3 border border-slate-600/50">
                            {section.icon}
                          </div>
                          <div className="text-left">
                            <CardTitle className="text-xl sm:text-2xl text-white mb-2">{section.group}</CardTitle>
                            <CardDescription className="text-gray-300 text-sm sm:text-base">
                              {section.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-slate-600/50 text-gray-400 text-xs">
                            {section.features.length} features
                          </Badge>
                          {openSections.includes(section.group) ? (
                            <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-300" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400 transition-transform duration-300" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="animate-slide-down">
                    <CardContent className="pt-0 space-y-6">
                      {section.features.map((feature, featureIndex) => (
                        <div key={feature.feature} className="border-l-2 border-slate-700/50 pl-6 ml-3">
                          <Collapsible
                            open={openFeatures.includes(feature.feature)}
                            onOpenChange={() => toggleFeature(feature.feature)}
                          >
                            <CollapsibleTrigger asChild>
                              <div className="cursor-pointer group">
                                <div className="flex items-center justify-between mb-2 hover:bg-slate-800/20 rounded-lg p-3 -ml-3 transition-colors duration-300">
                                  <div>
                                    <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                                      {feature.feature}
                                    </h4>
                                    <p className="text-gray-300 text-sm mt-1">{feature.explanation}</p>
                                  </div>
                                  {openFeatures.includes(feature.feature) ? (
                                    <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4" />
                                  )}
                                </div>
                              </div>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="animate-slide-down">
                              <div className="grid gap-4 sm:gap-6 md:grid-cols-3 mt-4 mb-6">
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
                                    <CardHeader className="pb-3">
                                      <div className="flex items-center space-x-2">
                                        <CheckCircle
                                          className={`h-4 w-4 ${
                                            tier.tier === "Basic"
                                              ? "text-green-400"
                                              : tier.tier === "Standard"
                                                ? "text-cyan-400"
                                                : "text-purple-400"
                                          }`}
                                        />
                                        <CardTitle
                                          className={`text-base font-semibold ${
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
                                    <CardContent className="pt-0">
                                      <p className="text-gray-300 text-sm leading-relaxed">{tier.include}</p>
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
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 z-20">
        <div className="container px-4 sm:px-6 md:px-8 mx-auto">
          <Card className="max-w-4xl mx-auto border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-8 md:p-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4 sm:mb-6">
                Ready to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Build Your Vision?
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8">
                Now that you understand our features and tiers, let's create a custom quote tailored to your specific
                needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/calculator">
                  <Button className="relative overflow-hidden rounded-full h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.8)] transition-all duration-300 w-full sm:w-auto hover:transform hover:scale-105 text-sm sm:text-base">
                    <span className="relative z-10">Start Building Quote</span>
                    <Rocket className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full h-11 sm:h-12 px-6 sm:px-8 border-2 border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 bg-transparent backdrop-blur-sm w-full sm:w-auto hover:bg-cyan-500/10 transition-all duration-300 hover:transform hover:scale-105 text-sm sm:text-base"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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
