import {
  Cpu,
  Bot,
  Zap,
  Database,
  LineChart,
  Workflow,
  Settings2,
  Gauge,
  MessageSquare,
  BrainCircuit,
  ShieldCheck,
  Rocket,
  Search,
  Cable,
  BarChart3,
} from "lucide-react"
import type { ServicesData } from "../types/services.types"

// SEO Structured Data for Services
export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI-Powered Development & Automation Services",
  "provider": {
    "@type": "Organization",
    "name": "404studios - AI-Powered Development",
    "url": "https://404studios.com"
  },
  "areaServed": "Worldwide",
  "description": "AI-powered development, business automation, intelligent integration, and smart web optimization services delivering 50% faster delivery and 30% lower costs.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Development & Automation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom AI Agents",
          "description": "Bespoke AI agents that automate business workflows and decision-making."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI-Enhanced Website Development",
          "description": "Smart, performance-optimized websites with embedded AI capabilities and automation."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Workflow Automation",
          "description": "Intelligent automation of repetitive business processes and data operations."
        }
      }
    ]
  }
}

export const servicesData: ServicesData = {
  services: [
    // AI-Development Category
    {
      id: "ai-enhanced-website-development",
      name: "AI-Enhanced Website Development",
      description: "Future-ready websites with embedded AI features, automation hooks, and performance intelligence.",
      price: { min: 25000, max: 75000 },
      category: "ai-development",
      icon: <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />,
    },
    {
      id: "ai-powered-mobile-apps",
      name: "AI-Powered Mobile Apps",
      description: "Cross-platform mobile applications accelerated with AI-assisted development and smart personalization.",
      price: { min: 45000, max: 125000 },
      category: "ai-development",
      icon: <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />,
    },
    {
      id: "rapid-prototyping-with-ai",
      name: "Rapid Prototyping with AI",
      description: "Build validated MVPs 50% faster using AI-assisted code generation and iterative automation.",
      price: { min: 15000, max: 45000 },
      category: "ai-development",
      icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />,
    },
    {
      id: "ai-optimized-ecommerce",
      name: "AI-Optimized E-commerce",
      description: "Conversion-intelligent storefronts with predictive recommendations and automated merchandising.",
      price: { min: 35000, max: 100000 },
      category: "ai-development",
      icon: <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />,
    },
    {
      id: "performance-ai-optimization",
      name: "Performance AI Optimization",
      description: "Adaptive speed, accessibility, and Core Web Vitals improvements powered by AI analysis.",
      price: { min: 10000, max: 30000 },
      category: "ai-development",
      icon: <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />,
    },

    // Automation Category
    {
      id: "custom-ai-agents",
      name: "Custom AI Agents",
      description: "Task-specific autonomous agents that reduce manual effort and streamline decision workflows.",
      price: { min: 30000, max: 80000 },
      category: "automation",
      icon: <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400" />,
    },
    {
      id: "intelligent-chatbots",
      name: "Intelligent Chatbots",
      description: "Conversational AI assistants trained on your domain to deliver 24/7 intelligent support.",
      price: { min: 20000, max: 60000 },
      category: "automation",
      icon: <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />,
    },
    {
      id: "workflow-automation",
      name: "Workflow Automation",
      description: "Automated multi-step business processes integrating APIs, data transforms, and triggers.",
      price: { min: 25000, max: 70000 },
      category: "automation",
      icon: <Workflow className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400" />,
    },
    {
      id: "process-optimization-ai",
      name: "Process Optimization AI",
      description: "Analyze, benchmark, and optimize operational flows using intelligent telemetry and prediction.",
      price: { min: 35000, max: 90000 },
      category: "automation",
      icon: <BrainCircuit className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />,
    },
    {
      id: "data-processing-automation",
      name: "Data Processing Automation",
      description: "Pipelines that clean, enrich, and synchronize datasets automatically across systems.",
      price: { min: 20000, max: 55000 },
      category: "automation",
      icon: <Settings2 className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400" />,
    },

    // AI-Integration Category
    {
      id: "legacy-system-ai-enhancement",
      name: "Legacy System AI Enhancement",
      description: "Augment existing platforms with AI inference layers, intelligent APIs, and smart augmentation.",
      price: { min: 40000, max: 100000 },
      category: "ai-integration",
      icon: <Cable className="h-4 w-4 sm:h-5 sm:w-5 text-violet-400" />,
    },
    {
      id: "ai-api-integration",
      name: "AI API Integration",
      description: "Seamless integration of AI/LLM APIs (OpenAI, Anthropic, etc.) with secure routing and monitoring.",
      price: { min: 15000, max: 45000 },
      category: "ai-integration",
      icon: <Database className="h-4 w-4 sm:h-5 sm:w-5 text-lime-400" />,
    },
    {
      id: "predictive-analytics-setup",
      name: "Predictive Analytics Setup",
      description: "Data modeling & forecasting pipelines enabling proactive operational intelligence.",
      price: { min: 30000, max: 75000 },
      category: "ai-integration",
      icon: <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />,
    },
    {
      id: "ai-powered-analytics-dashboard",
      name: "AI-Powered Analytics Dashboard",
      description: "Unified insights layer with automated anomaly detection and natural-language querying.",
      price: { min: 25000, max: 65000 },
      category: "ai-integration",
      icon: <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-fuchsia-400" />,
    },

    // Smart-Web Category
    {
      id: "ai-enhanced-seo",
      name: "AI-Enhanced SEO",
      description: "Adaptive semantic optimization leveraging AI content intelligence and competitor insights.",
      price: { min: 8000, max: 25000 },
      category: "smart-web",
      icon: <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />,
    },
    {
      id: "automated-testing-suites",
      name: "Automated Testing Suites",
      description: "AI-assisted test generation, regression detection, and quality scoring pipelines.",
      price: { min: 12000, max: 35000 },
      category: "smart-web",
      icon: <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />,
    },
    {
      id: "ai-content-management",
      name: "AI Content Management",
      description: "Intelligent content workflows: generation, moderation, enrichment, and personalization.",
      price: { min: 18000, max: 50000 },
      category: "smart-web",
      icon: <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-300" />,
    },
    {
      id: "smart-monitoring-systems",
      name: "Smart Monitoring Systems",
      description: "AI-observed performance, security, and usage telemetry with proactive alerting.",
      price: { min: 15000, max: 40000 },
      category: "smart-web",
      icon: <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />,
    },
  ],
}
