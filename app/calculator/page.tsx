"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Info, Calculator, Check, ChevronDown, ChevronUp, Plus, Minus, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import ParticleBackground from "@/components/particle-background"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Pricing data structure with page counting
const pricingData = [
  {
    group: "Core Website Features",
    features: [
      {
        feature: "Static Page",
        desc: "Traditional content page (Home, About, etc.)",
        tiers: [
          { name: "Basic", desc: "Simple layout, text/images.", price: 1600 },
          { name: "Standard", desc: "Custom layout, richer visuals.", price: 2200 },
          { name: "Advanced", desc: "Interactive/multi-section, premium visuals.", price: 3000 },
        ],
        isCountable: true,
        minCount: 1,
      },
      {
        feature: "Dynamic Page",
        desc: "Admin-managed pages (blogs, listings, etc.)",
        tiers: [
          { name: "Basic", desc: "Editable content, basic list/detail.", price: 3000 },
          { name: "Standard", desc: "Search/filter, advanced layout.", price: 6000 },
          { name: "Advanced", desc: "User logins, integrations.", price: 9600 },
        ],
        isCountable: true,
        minCount: 0,
      },
      {
        feature: "Animations & Interactions",
        desc: "Site-wide motion, micro-interactions, and advanced effects.",
        tiers: [
          { name: "Basic", desc: "Just smooth transitions, buttons, loading.", price: 2000 },
          { name: "Standard", desc: "Section reveals, parallax, moderate interactive effects.", price: 4800 },
          { name: "Advanced", desc: "3D, scroll magic, highly custom, immersive.", price: 12000 },
        ],
        isCountable: false,
      },
      {
        feature: "Image Gallery",
        desc: "Showcase photos/work in an animated gallery or lightbox.",
        tiers: [
          { name: "Basic", desc: "Simple grid, click-to-enlarge.", price: 1600 },
          { name: "Standard", desc: "Filterable albums, animations.", price: 3000 },
          { name: "Advanced", desc: "Slideshow, social sharing, advanced lightbox.", price: 4000 },
        ],
        isCountable: false,
      },
      {
        feature: "Contact Form",
        desc: "Visitors can quickly send you messages or inquiries.",
        tiers: [
          { name: "Basic", desc: "Simple form, email notifications.", price: 1600 },
          { name: "Standard", desc: "Add validation, spam checks, extra fields.", price: 2400 },
          { name: "Advanced", desc: "Multi-step, uploads, logic routing.", price: 3200 },
        ],
        isCountable: false,
      },
      {
        feature: "SEO Essentials",
        desc: "Meta tags, sitemap, clean structure—Google-friendly setup.",
        tiers: [
          { name: "Basic", desc: "Meta, titles, sitemap, robots.txt.", price: 2400 },
          { name: "Standard", desc: "OG/social meta, Google Analytics.", price: 3200 },
          { name: "Advanced", desc: "Rich snippet/schema, in-depth reports.", price: 6400 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "Business & Transactional Features",
    features: [
      {
        feature: "User Authentication",
        desc: "Let visitors register, login, and access secure content.",
        tiers: [
          { name: "Basic", desc: "Signup/login, password reset.", price: 1600 },
          { name: "Standard", desc: "Profile, email verification.", price: 3000 },
          { name: "Advanced", desc: "Social logins, 2FA/MFA.", price: 4000 },
        ],
        isCountable: false,
      },
      {
        feature: "Payment Integration",
        desc: "Take payments online via secure gateways like UPI, cards, wallets.",
        tiers: [
          { name: "Basic", desc: "One gateway (e.g. UPI/Razorpay).", price: 4000 },
          { name: "Standard", desc: "Multiple options, order linking.", price: 8000 },
          { name: "Advanced", desc: "Subscriptions, custom payment workflow.", price: 12000 },
        ],
        isCountable: false,
      },
      {
        feature: "Cart & Checkout",
        desc: "Sell products or services, manage orders end-to-end.",
        tiers: [
          { name: "Basic", desc: "Simple cart, 1-step checkout.", price: 6400 },
          { name: "Standard", desc: "Cart editing, addresses, coupons.", price: 12000 },
          { name: "Advanced", desc: "Abandoned cart, analytics, multi-step.", price: 16000 },
        ],
        isCountable: false,
      },
      {
        feature: "Booking/Appointment System",
        desc: "Book meetings, services, consults, or classes online.",
        tiers: [
          { name: "Basic", desc: "Single service, owner approval.", price: 4000 },
          { name: "Standard", desc: "Multiple services, auto notifies.", price: 6000 },
          { name: "Advanced", desc: "Automated, payments, analytics.", price: 8000 },
        ],
        isCountable: false,
      },
      {
        feature: "Admin Panel",
        desc: "Easily manage your website—including content, orders, analytics. Powered by Directus.",
        tiers: [
          { name: "Basic", desc: "Content pages, images, blog, users.", price: 16000 },
          { name: "Standard", desc: "Add order/booking/inventory management, basic stats.", price: 20000 },
          { name: "Advanced", desc: "Role-based permissions, automations, integrations.", price: 40000 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "Growth & Communication",
    features: [
      {
        feature: "Testimonials/Reviews",
        desc: "Showcase positive feedback for instant trust.",
        tiers: [
          { name: "Basic", desc: "Manual admin update.", price: 2400 },
          { name: "Standard", desc: "Star ratings, slider/carousel.", price: 4000 },
          { name: "Advanced", desc: "User-submitted and moderated.", price: 6400 },
        ],
        isCountable: false,
      },
      {
        feature: "Newsletter Signup",
        desc: "Collect leads and grow your mailing list.",
        tiers: [
          { name: "Basic", desc: "Simple email capture.", price: 1600 },
          { name: "Standard", desc: "Mailchimp/API sync.", price: 2400 },
          { name: "Advanced", desc: "Double opt-in, segmentation.", price: 3200 },
        ],
        isCountable: false,
      },
      {
        feature: "Live Chat/Chatbot",
        desc: "Support or convert visitors instantly via chat or AI.",
        tiers: [
          { name: "Basic", desc: "Manual live chat only.", price: 8000 },
          { name: "Standard", desc: "Scripted or basic AI bot.", price: 16000 },
          { name: "Advanced", desc: "GPT-powered, trained chatbot.", price: 32000 },
        ],
        isCountable: false,
      },
      {
        feature: "Blog/Content Module",
        desc: "Publish updates and attract SEO traffic with editable blog.",
        tiers: [
          { name: "Basic", desc: "Simple admin editor & publish.", price: 4800 },
          { name: "Standard", desc: "Categories, tags, images/media.", price: 7000 },
          { name: "Advanced", desc: "User posts, comments, multimedia.", price: 9600 },
        ],
        isCountable: false,
      },
      {
        feature: "Multilingual Support",
        desc: "Expand reach with multi-language site capability.",
        tiers: [
          { name: "Basic", desc: "1 extra language, manual translation.", price: 4800 },
          { name: "Standard", desc: "UI toggle, up to 3 languages.", price: 12000 },
          { name: "Advanced", desc: "Automated CMS-driven, unlimited.", price: 20000 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "Backend & Integrations",
    features: [
      {
        feature: "Supabase/Firebase Backend",
        desc: "Scalable backend/auth/storage for web/apps.",
        tiers: [
          { name: "Basic", desc: "Auth, database, basic setup.", price: 6400 },
          { name: "Standard", desc: "Custom data/functions, notifications.", price: 9000 },
          { name: "Advanced", desc: "Full logic, advanced integrations.", price: 12000 },
        ],
        isCountable: false,
      },
      {
        feature: "Custom Backend/API",
        desc: "Build custom APIs or backends for special requirements.",
        tiers: [
          { name: "Basic", desc: "Simple CRUD/API/minimal endpoints.", price: 20000 },
          { name: "Standard", desc: "Business logic, user auth, secure APIs.", price: 30000 },
          { name: "Advanced", desc: "Complex workflows, realtime or third-party sync.", price: 40000 },
        ],
        isCountable: false,
      },
      {
        feature: "Analytics Dashboard",
        desc: "Track visits, user activity, and custom events.",
        tiers: [
          { name: "Basic", desc: "Google Analytics embed.", price: 1600 },
          { name: "Standard", desc: "Dashboard, basic custom metrics.", price: 2400 },
          { name: "Advanced", desc: "Real-time, custom reports/exports.", price: 3200 },
        ],
        isCountable: false,
      },
      {
        feature: "Performance Optimization",
        desc: "Boost loading speed and smooth delivery.",
        tiers: [
          { name: "Basic", desc: "Image compression/lazy loading.", price: 1600 },
          { name: "Standard", desc: "JS/CSS optimization, CDN.", price: 4800 },
          { name: "Advanced", desc: "Advanced audits, bundle splitting.", price: 8000 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "After-Launch Support",
    features: [
      {
        feature: "Maintenance & Support",
        desc: "Ongoing updates, fixes, and monitoring.",
        tiers: [
          { name: "Basic", desc: "Email support, minor updates.", price: 2400 },
          { name: "Standard", desc: "Bugfixes, quick content edits.", price: 5000 },
          { name: "Advanced", desc: "Proactive care, high-touch SLA.", price: 8000 },
        ],
        isCountable: false,
      },
      {
        feature: "SEO Optimization",
        desc: "Detailed post-launch SEO improvements.",
        tiers: [
          { name: "Basic", desc: "Diagnose meta, mobile, crawl status.", price: 2400 },
          { name: "Standard", desc: "OG/schema tweak, improve speed.", price: 3200 },
          { name: "Advanced", desc: "Full audit & report, deep keyword/content strategy.", price: 6400 },
        ],
        isCountable: false,
      },
      {
        feature: "Custom Add-ons",
        desc: "Advanced features like AI chatbot, 3D, etc.",
        tiers: [
          { name: "Basic", desc: "Simple AI or Lottie animation.", price: 6400 },
          { name: "Standard", desc: "Trained chatbot, custom 3D elements.", price: 16000 },
          { name: "Advanced", desc: "Bespoke AI workflow or full 3D scene.", price: 40000 },
        ],
        isCountable: false,
      },
    ],
  },
]

// Business type configurations with page defaults
const businessTypes = {
  portfolio: {
    name: "Portfolio/Personal Brand",
    description: "Showcase your work and personal brand",
    basePrice: 12000,
    timeline: "5-7 days",
    defaultPages: {
      static: { count: 4, names: ["Home", "About", "Portfolio", "Contact"] },
      dynamic: { count: 0, names: [] },
    },
    defaults: {
      "Static Page": "Standard",
      "Image Gallery": "Standard",
      "Contact Form": "Basic",
      "SEO Essentials": "Basic",
      "Animations & Interactions": "Basic",
    },
  },
  restaurant: {
    name: "Restaurant/Cafe",
    description: "Menu, reservations, and dining experience",
    basePrice: 15000,
    timeline: "1-2 weeks",
    defaultPages: {
      static: { count: 5, names: ["Home", "Menu", "About", "Contact", "Gallery"] },
      dynamic: { count: 0, names: [] },
    },
    defaults: {
      "Static Page": "Standard",
      "Image Gallery": "Standard",
      "Contact Form": "Basic",
      "Booking/Appointment System": "Basic",
      "SEO Essentials": "Basic",
    },
  },
  ecommerce: {
    name: "E-commerce Store",
    description: "Sell products online with full shopping experience",
    basePrice: 34000,
    timeline: "2-3 weeks",
    defaultPages: {
      static: { count: 4, names: ["Home", "About", "Contact", "Terms"] },
      dynamic: { count: 3, names: ["Products", "Product Detail", "Cart"] },
    },
    defaults: {
      "Static Page": "Standard",
      "Dynamic Page": "Standard",
      "Cart & Checkout": "Standard",
      "Payment Integration": "Standard",
      "User Authentication": "Basic",
      "Admin Panel": "Basic",
    },
  },
  business: {
    name: "Business/Services",
    description: "Professional services and business presence",
    basePrice: 18000,
    timeline: "1-2 weeks",
    defaultPages: {
      static: { count: 6, names: ["Home", "About", "Services", "Team", "Contact", "Testimonials"] },
      dynamic: { count: 1, names: ["Blog"] },
    },
    defaults: {
      "Static Page": "Standard",
      "Dynamic Page": "Basic",
      "Contact Form": "Standard",
      "Testimonials/Reviews": "Basic",
      "SEO Essentials": "Standard",
      "Newsletter Signup": "Basic",
    },
  },
  fitness: {
    name: "Fitness/Wellness",
    description: "Classes, trainers, and membership management",
    basePrice: 16000,
    timeline: "1-2 weeks",
    defaultPages: {
      static: { count: 6, names: ["Home", "About", "Classes", "Trainers", "Membership", "Contact"] },
      dynamic: { count: 0, names: [] },
    },
    defaults: {
      "Static Page": "Standard",
      "Booking/Appointment System": "Standard",
      "User Authentication": "Basic",
      "Image Gallery": "Basic",
      "Contact Form": "Basic",
    },
  },
}

interface FeatureTier {
  name: string
  desc: string
  price: number
}

interface Feature {
  feature: string
  desc: string
  tiers: FeatureTier[]
  isCountable?: boolean
  minCount?: number
}

interface FeatureGroup {
  group: string
  features: Feature[]
}

interface PageManagerProps {
  pageNames: string[]
  onUpdateNames: (names: string[]) => void
  pageType: "static" | "dynamic"
}

function PageManager({ pageNames, onUpdateNames, pageType }: PageManagerProps) {
  const [editingNames, setEditingNames] = useState(pageNames)
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    onUpdateNames(editingNames)
    setIsOpen(false)
  }

  const addPage = () => {
    setEditingNames([...editingNames, `New ${pageType === "static" ? "Page" : "Section"}`])
  }

  const removePage = (index: number) => {
    setEditingNames(editingNames.filter((_, i) => i !== index))
  }

  const updatePageName = (index: number, name: string) => {
    const updated = [...editingNames]
    updated[index] = name
    setEditingNames(updated)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 h-6 px-2">
          <Edit2 className="h-3 w-3 mr-1" />
          Edit Pages
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-cyan-400">
            Manage {pageType === "static" ? "Static" : "Dynamic"} Pages
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Customize the names and structure of your {pageType} pages
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {editingNames.map((name, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={name}
                  onChange={(e) => updatePageName(index, e.target.value)}
                  className="flex-1 bg-slate-800 border-slate-600 text-white"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePage(index)}
                  className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={addPage}
              className="flex-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Page
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PageCounter({
  feature,
  selectedTier,
  count,
  minCount,
  pageNames,
  onTierChange,
  onCountChange,
  onPageNamesChange,
}: {
  feature: Feature
  selectedTier: string | null
  count: number
  minCount: number
  pageNames: string[]
  onTierChange: (tier: string | null) => void
  onCountChange: (count: number) => void
  onPageNamesChange: (names: string[]) => void
}) {
  const getCurrentPrice = () => {
    if (!selectedTier) return 0
    const tier = feature.tiers.find((t) => t.name === selectedTier)
    return tier ? tier.price : 0
  }

  const incrementCount = () => {
    const newCount = count + 1
    onCountChange(newCount)
    // Add a new page name if needed
    if (pageNames.length < newCount) {
      const pageType = feature.feature === "Static Page" ? "Page" : "Section"
      onPageNamesChange([...pageNames, `New ${pageType} ${newCount}`])
    }
  }

  const decrementCount = () => {
    if (count > minCount) {
      const newCount = count - 1
      onCountChange(newCount)
      // Remove the last page name if needed
      if (pageNames.length > newCount) {
        onPageNamesChange(pageNames.slice(0, newCount))
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-white">{feature.feature}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
      </div>

      {/* Page Counter */}
      <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Label className="text-white font-medium">Number of Pages</Label>
            <div className="flex items-center space-x-1 bg-slate-800/60 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md text-white hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                onClick={decrementCount}
                disabled={count <= minCount}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">
                <span className="text-xl font-bold text-white">{count}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md text-white hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                onClick={incrementCount}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-cyan-400">
              {selectedTier ? `₹${(getCurrentPrice() * count).toLocaleString()}` : "₹0"}
            </div>
            {selectedTier && (
              <div className="text-xs text-gray-400">
                ₹{getCurrentPrice().toLocaleString()} × {count}
              </div>
            )}
          </div>
        </div>

        {/* Page Names Preview */}
        {count > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-400">Page Names</Label>
              <PageManager
                pageNames={pageNames}
                onUpdateNames={onPageNamesChange}
                pageType={feature.feature === "Static Page" ? "static" : "dynamic"}
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {pageNames.slice(0, count).map((name, index) => (
                <Badge key={index} variant="outline" className="border-slate-600 text-gray-300 bg-slate-800/50 text-xs">
                  {name}
                </Badge>
              ))}
              {count > pageNames.length && (
                <Badge variant="outline" className="border-slate-600 text-gray-400 bg-slate-800/30 text-xs">
                  +{count - pageNames.length} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tier Selection */}
      <RadioGroup
        value={selectedTier || ""}
        onValueChange={(value) => onTierChange(value || null)}
        className="space-y-3"
      >
        <div
          className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
            !selectedTier
              ? "border-cyan-500/50 bg-cyan-500/10"
              : "border-slate-700/50 bg-slate-800/20 hover:border-slate-600/50"
          }`}
          onClick={() => onTierChange(null)}
        >
          <RadioGroupItem value="" id={`${feature.feature}-none`} className="text-cyan-400" />
          <Label htmlFor={`${feature.feature}-none`} className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Not Needed</span>
              <span className="text-gray-400 text-sm">₹0</span>
            </div>
          </Label>
        </div>

        {feature.tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
              selectedTier === tier.name
                ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                : "border-slate-700/50 bg-slate-800/20 hover:border-slate-600/50 hover:bg-slate-700/30"
            }`}
            onClick={() => onTierChange(tier.name)}
          >
            <RadioGroupItem value={tier.name} id={`${feature.feature}-${tier.name}`} className="text-cyan-400" />
            <Label htmlFor={`${feature.feature}-${tier.name}`} className="flex-1 cursor-pointer">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{tier.name}</span>
                  <span className="text-cyan-400 font-semibold">₹{tier.price.toLocaleString()}/page</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{tier.desc}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

function TierSelector({
  feature,
  selectedTier,
  onTierChange,
}: {
  feature: Feature
  selectedTier: string | null
  onTierChange: (tier: string | null) => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-white">{feature.feature}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
      </div>

      <RadioGroup
        value={selectedTier || ""}
        onValueChange={(value) => onTierChange(value || null)}
        className="space-y-3"
      >
        <div
          className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
            !selectedTier
              ? "border-cyan-500/50 bg-cyan-500/10"
              : "border-slate-700/50 bg-slate-800/20 hover:border-slate-600/50"
          }`}
          onClick={() => onTierChange(null)}
        >
          <RadioGroupItem value="" id={`${feature.feature}-none`} className="text-cyan-400" />
          <Label htmlFor={`${feature.feature}-none`} className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Not Needed</span>
              <span className="text-gray-400 text-sm">₹0</span>
            </div>
          </Label>
        </div>

        {feature.tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
              selectedTier === tier.name
                ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                : "border-slate-700/50 bg-slate-800/20 hover:border-slate-600/50 hover:bg-slate-700/30"
            }`}
            onClick={() => onTierChange(tier.name)}
          >
            <RadioGroupItem value={tier.name} id={`${feature.feature}-${tier.name}`} className="text-cyan-400" />
            <Label htmlFor={`${feature.feature}-${tier.name}`} className="flex-1 cursor-pointer">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{tier.name}</span>
                  <span className="text-cyan-400 font-semibold">₹{tier.price.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{tier.desc}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

function FeatureGroupCard({
  group,
  selections,
  pageCounts,
  pageNames,
  onSelectionChange,
  onPageCountChange,
  onPageNamesChange,
  isExpanded,
  onToggleExpanded,
}: {
  group: FeatureGroup
  selections: Record<string, string | null>
  pageCounts: Record<string, number>
  pageNames: Record<string, string[]>
  onSelectionChange: (feature: string, tier: string | null) => void
  onPageCountChange: (feature: string, count: number) => void
  onPageNamesChange: (feature: string, names: string[]) => void
  isExpanded: boolean
  onToggleExpanded: () => void
}) {
  const groupColorMap: Record<string, string> = {
    "Core Website Features": "border-cyan-500/30 hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)]",
    "Business & Transactional Features": "border-blue-500/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.2)]",
    "Growth & Communication": "border-purple-500/30 hover:shadow-[0_8px_32px_rgba(168,85,247,0.2)]",
    "Backend & Integrations": "border-green-500/30 hover:shadow-[0_8px_32px_rgba(34,197,94,0.2)]",
    "After-Launch Support": "border-orange-500/30 hover:shadow-[0_8px_32px_rgba(249,115,22,0.2)]",
  }

  const selectedCount = group.features.filter((f) => selections[f.feature]).length
  const totalFeatures = group.features.length

  return (
    <Card
      className={`bg-slate-900/80 border-slate-700/50 backdrop-blur-sm transition-all duration-300 ${groupColorMap[group.group] || ""}`}
    >
      <Collapsible open={isExpanded} onOpenChange={onToggleExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-slate-800/30 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-white text-lg sm:text-xl">{group.group}</CardTitle>
                <CardDescription className="text-sm">
                  {selectedCount > 0
                    ? `${selectedCount} of ${totalFeatures} features selected`
                    : `${totalFeatures} features available`}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {selectedCount > 0 && (
                  <Badge variant="outline" className="border-cyan-500 text-cyan-400 bg-cyan-500/10">
                    {selectedCount}
                  </Badge>
                )}
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
            {group.features.map((feature) => (
              <div key={feature.feature} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                {feature.isCountable ? (
                  <PageCounter
                    feature={feature}
                    selectedTier={selections[feature.feature] || null}
                    count={pageCounts[feature.feature] || feature.minCount || 0}
                    minCount={feature.minCount || 0}
                    pageNames={pageNames[feature.feature] || []}
                    onTierChange={(tier) => onSelectionChange(feature.feature, tier)}
                    onCountChange={(count) => onPageCountChange(feature.feature, count)}
                    onPageNamesChange={(names) => onPageNamesChange(feature.feature, names)}
                  />
                ) : (
                  <TierSelector
                    feature={feature}
                    selectedTier={selections[feature.feature] || null}
                    onTierChange={(tier) => onSelectionChange(feature.feature, tier)}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default function CalculatorPage() {
  const [businessType, setBusinessType] = useState<string>("portfolio")
  const [selections, setSelections] = useState<Record<string, string | null>>({})
  const [pageCounts, setPageCounts] = useState<Record<string, number>>({})
  const [pageNames, setPageNames] = useState<Record<string, string[]>>({})
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Core Website Features": true,
  })
  const [totalPrice, setTotalPrice] = useState(0)

  // Apply business type defaults
  useEffect(() => {
    const businessConfig = businessTypes[businessType as keyof typeof businessTypes]
    if (businessConfig) {
      setSelections(businessConfig.defaults)
      setPageCounts({
        "Static Page": businessConfig.defaultPages.static.count,
        "Dynamic Page": businessConfig.defaultPages.dynamic.count,
      })
      setPageNames({
        "Static Page": [...businessConfig.defaultPages.static.names],
        "Dynamic Page": [...businessConfig.defaultPages.dynamic.names],
      })
    }
  }, [businessType])

  // Calculate total price
  useEffect(() => {
    let total = businessTypes[businessType as keyof typeof businessTypes]?.basePrice || 0

    Object.entries(selections).forEach(([featureName, tierName]) => {
      if (tierName) {
        // Find the feature and tier price
        for (const group of pricingData) {
          const feature = group.features.find((f) => f.feature === featureName)
          if (feature) {
            const tier = feature.tiers.find((t) => t.name === tierName)
            if (tier) {
              const count = feature.isCountable ? pageCounts[featureName] || 1 : 1
              total += tier.price * count
            }
            break
          }
        }
      }
    })

    setTotalPrice(total)
  }, [selections, pageCounts, businessType])

  const handleSelectionChange = (feature: string, tier: string | null) => {
    setSelections((prev) => ({
      ...prev,
      [feature]: tier,
    }))
  }

  const handlePageCountChange = (feature: string, count: number) => {
    setPageCounts((prev) => ({
      ...prev,
      [feature]: count,
    }))
  }

  const handlePageNamesChange = (feature: string, names: string[]) => {
    setPageNames((prev) => ({
      ...prev,
      [feature]: names,
    }))
  }

  const toggleGroupExpanded = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }))
  }

  const selectedFeatures = Object.entries(selections).filter(([_, tier]) => tier !== null)

  const getTotalPages = () => {
    const staticPages = pageCounts["Static Page"] || 0
    const dynamicPages = pageCounts["Dynamic Page"] || 0
    return { static: staticPages, dynamic: dynamicPages, total: staticPages + dynamicPages }
  }

  const pageStats = getTotalPages()

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
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Advanced Page Calculator
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Build Your Perfect
              </span>
              <br />
              <span className="text-white">Website Package</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4 sm:px-0">
              Customize every page and feature with precise control over your project scope and pricing
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 z-20">
        <div className="container px-4 sm:px-6 md:px-8 mx-auto">
          <div className="max-w-7xl mx-auto">
            {/* Business Type Selection */}
            <Card className="mb-6 sm:mb-8 bg-slate-900/80 border-slate-700/50 backdrop-blur-sm hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)] transition-all duration-300">
              <CardHeader className="text-center pb-4 sm:pb-6">
                <CardTitle className="text-white text-xl sm:text-2xl md:text-3xl mb-2">
                  Choose Your Business Type
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm sm:text-base md:text-lg">
                  Select a template to get started with recommended pages and features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                  {Object.entries(businessTypes).map(([key, type]) => (
                    <button
                      key={key}
                      onClick={() => setBusinessType(key)}
                      className={`group relative p-4 sm:p-6 rounded-xl text-left transition-all duration-300 border-2 ${
                        businessType === key
                          ? "bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] transform scale-105"
                          : "bg-slate-800/40 border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-700/60 hover:transform hover:scale-102"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div
                            className={`text-sm sm:text-base font-bold transition-colors duration-300 leading-tight ${
                              businessType === key ? "text-cyan-400" : "text-gray-300 group-hover:text-white"
                            }`}
                          >
                            {type.name}
                          </div>
                          {businessType === key && (
                            <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div
                            className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                              businessType === key ? "text-cyan-200" : "text-gray-400 group-hover:text-gray-300"
                            }`}
                          >
                            ₹{type.basePrice.toLocaleString()}+
                          </div>
                          <div
                            className={`text-xs transition-colors duration-300 ${
                              businessType === key ? "text-cyan-300" : "text-gray-500 group-hover:text-gray-400"
                            }`}
                          >
                            {type.defaultPages.static.count + type.defaultPages.dynamic.count} pages • {type.timeline}
                          </div>
                        </div>

                        <p
                          className={`text-xs leading-relaxed transition-colors duration-300 ${
                            businessType === key ? "text-cyan-300/80" : "text-gray-500 group-hover:text-gray-400"
                          }`}
                        >
                          {type.description}
                        </p>
                      </div>
                      {businessType === key && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Calculator Grid */}
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-4">
              {/* Feature Groups - Takes 3 columns */}
              <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                {pricingData.map((group) => (
                  <FeatureGroupCard
                    key={group.group}
                    group={group}
                    selections={selections}
                    pageCounts={pageCounts}
                    pageNames={pageNames}
                    onSelectionChange={handleSelectionChange}
                    onPageCountChange={handlePageCountChange}
                    onPageNamesChange={handlePageNamesChange}
                    isExpanded={expandedGroups[group.group] || false}
                    onToggleExpanded={() => toggleGroupExpanded(group.group)}
                  />
                ))}
              </div>

              {/* Summary Sidebar - Takes 1 column */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)] transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-white text-lg sm:text-xl">Project Summary</CardTitle>
                      <CardDescription className="text-sm">Your customized package</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      {/* Business Type */}
                      <div className="p-3 sm:p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Business Type</div>
                        <div className="text-white font-medium text-sm">
                          {businessTypes[businessType as keyof typeof businessTypes]?.name}
                        </div>
                        <div className="text-cyan-400 font-semibold text-sm">
                          ₹{businessTypes[businessType as keyof typeof businessTypes]?.basePrice.toLocaleString()} base
                        </div>
                      </div>

                      {/* Page Summary */}
                      <div className="p-3 sm:p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-2">Total Pages</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Static Pages</span>
                            <span className="text-cyan-400 font-semibold">{pageStats.static}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Dynamic Pages</span>
                            <span className="text-cyan-400 font-semibold">{pageStats.dynamic}</span>
                          </div>
                          <Separator className="bg-slate-700/50" />
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Total Pages</span>
                            <span className="text-cyan-400 font-bold text-lg">{pageStats.total}</span>
                          </div>
                        </div>
                      </div>

                      {/* Selected Features */}
                      <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto">
                        <div className="text-sm text-gray-400 mb-2">Selected Features ({selectedFeatures.length})</div>
                        {selectedFeatures.length === 0 ? (
                          <div className="text-xs text-gray-500 italic p-3 bg-slate-800/20 rounded-lg">
                            No additional features selected
                          </div>
                        ) : (
                          selectedFeatures.map(([featureName, tierName]) => {
                            // Find the price for this feature/tier
                            let price = 0
                            let isCountable = false
                            let count = 1

                            for (const group of pricingData) {
                              const feature = group.features.find((f) => f.feature === featureName)
                              if (feature) {
                                const tier = feature.tiers.find((t) => t.name === tierName)
                                if (tier) {
                                  price = tier.price
                                  isCountable = feature.isCountable || false
                                  count = isCountable ? pageCounts[featureName] || 1 : 1
                                }
                                break
                              }
                            }

                            const totalPrice = price * count

                            return (
                              <div
                                key={featureName}
                                className="flex justify-between items-start p-2 bg-slate-800/20 rounded"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs text-white font-medium truncate">{featureName}</div>
                                  <div className="text-xs text-gray-400">
                                    {tierName}
                                    {isCountable && ` × ${count}`}
                                  </div>
                                </div>
                                <div className="text-xs text-cyan-400 font-semibold ml-2 flex-shrink-0">
                                  ₹{totalPrice.toLocaleString()}
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>

                      <Separator className="bg-slate-700/50" />

                      {/* Total Price */}
                      <div className="space-y-4 sm:space-y-6">
                        <div className="text-center">
                          <div className="text-xs sm:text-sm text-gray-400 mb-1">Total Project Cost</div>
                          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                            ₹{totalPrice.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-400 leading-relaxed">
                              This is a comprehensive estimate with per-page pricing. Final cost may vary based on
                              specific requirements.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-3 sm:space-y-4">
                          <Link href="/contact">
                            <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 h-10 sm:h-12">
                              Get Detailed Quote
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href="/packages">
                            <Button
                              variant="outline"
                              className="w-full border-cyan-500/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 bg-transparent hover:bg-cyan-500/10 transition-all duration-300 h-10 sm:h-12"
                            >
                              View Pre-Built Packages
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
