import type { BusinessType, BusinessConfiguration } from "../types/pricing.types"

// Mapping retains feature names that still exist in pricingData (Static Page, Dynamic Page, etc.)
export const businessTypes: Record<BusinessType, BusinessConfiguration> = {
  "ai-startup": {
    name: "AI Startup",
    description: "AI-powered startup websites with automation",
    basePrice: 35000,
    timeline: "2-3 weeks",
    defaultPages: {
      static: { count: 5, names: ["Home", "About", "Vision", "Technology", "Contact"] },
      dynamic: { count: 3, names: ["Blog", "Updates", "Resources"] },
    },
    defaults: {
      "Static Page": "Standard",
      "Dynamic Page": "Basic",
      "AI Code Generation": "Standard",
      "Intelligent Chatbots": "Basic",
    },
  },
  "automation-business": {
    name: "Automation Business",
    description: "Business automation with AI agents and workflows",
    basePrice: 55000,
    timeline: "3-4 weeks",
    defaultPages: {
      static: { count: 6, names: ["Home", "About", "Solutions", "Automation", "Contact", "Case Studies"] },
      dynamic: { count: 4, names: ["Blog", "Workflows", "Resources", "Integrations"] },
    },
    defaults: {
      "Static Page": "Standard",
      "Dynamic Page": "Standard",
      "Custom AI Agents": "Standard",
      "Workflow Automation": "Standard",
    },
  },
  "smart-ecommerce": {
    name: "Smart E-commerce",
    description: "AI-enhanced e-commerce with intelligent features",
    basePrice: 75000,
    timeline: "4-5 weeks",
    defaultPages: {
      static: { count: 8, names: ["Home", "About", "Policies", "Contact", "Story", "Support", "Guides", "FAQs"] },
      dynamic: { count: 6, names: ["Products", "Product Detail", "Cart", "Recommendations", "Blog", "Analytics"] },
    },
    defaults: {
      "Static Page": "Standard",
      "Dynamic Page": "Standard",
      "AI Code Generation": "Advanced",
      "Data Processing AI": "Standard",
      "Predictive Analytics": "Standard",
    },
  },
  "ai-enterprise": {
    name: "AI Enterprise",
    description: "Enterprise-grade AI integration and automation",
    basePrice: 125000,
    timeline: "6-8 weeks",
    defaultPages: {
      static: { count: 12, names: ["Home", "About", "Leadership", "Solutions", "Platform", "Security", "Compliance", "Partners", "Case Studies", "Resources", "Blog", "Contact"] },
      dynamic: { count: 8, names: ["Knowledge Base", "Integrations", "Analytics", "Dashboards", "API", "Roadmap", "Events", "Reports"] },
    },
    defaults: {
      "Static Page": "Advanced",
      "Dynamic Page": "Advanced",
      "AI Code Generation": "Advanced",
      "Custom AI Agents": "Advanced",
      "Workflow Automation": "Advanced",
      "Predictive Analytics": "Advanced",
      "Performance AI Optimization": "Advanced",
      "AI-Powered Testing": "Advanced",
    },
  },
  "tech-agency": {
    name: "Tech Agency",
    description: "Tech agency websites with AI-powered client tools",
    basePrice: 85000,
    timeline: "4-6 weeks",
    defaultPages: {
      static: { count: 10, names: ["Home", "About", "Services", "AI Lab", "Process", "Team", "Case Studies", "Pricing", "Blog", "Contact"] },
      dynamic: { count: 5, names: ["Knowledge Base", "Client Portal", "API Docs", "Showcase", "Updates"] },
    },
    defaults: {
      "Static Page": "Advanced",
      "Dynamic Page": "Standard",
      "AI Code Generation": "Advanced",
      "Custom AI Agents": "Standard",
    },
  },
}
