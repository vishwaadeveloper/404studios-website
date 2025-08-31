import { ArrowRight, Code, Database, Layers, Search, Zap, Cpu, Bot } from "lucide-react"
import type { HomeData } from "../types/home.types"

export const homeData: HomeData = {
  packages: [
    {
      name: "AI Starter Package",
      description: "Perfect for startups embracing AI with accelerated delivery and intelligent foundations.",
      price: "₹25,000 - ₹45,000",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />,
    },
    {
      name: "Business Automation Package",
      description:
        "Complete automation suite with AI agents, workflow orchestration, and intelligent operations.",
      price: "₹55,000 - ₹85,000",
      icon: <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />,
    },
    {
      name: "Enterprise AI Package",
      description: "Full-scale AI integration, predictive analytics, and autonomous systems engineering.",
      price: "₹1,25,000+",
      icon: <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />,
    },
  ],
  features: [
    {
      icon: <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400" />,
      title: "Lightning Fast",
      description:
        "AI code generation delivers projects 50% faster than traditional development—launch sooner with confidence.",
    },
    {
      icon: <Layers className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />,
      title: "Cost Effective",
      description: "Automated processes and smart optimization reduce development costs by up to 30%.",
    },
    {
      icon: <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-pink-400" />,
      title: "AI-Powered",
      description: "Built-in AI capabilities make your platform intelligent, scalable, and future-ready from day one.",
    },
  ],
  processSteps: [
    {
      title: "Discovery",
      description: "AI-powered requirements analysis and project scoping",
      duration: "1-2 days",
      icon: <Search className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    },
    {
      title: "Design",
      description: "AI-assisted design optimization and user experience planning",
      duration: "2-3 days",
      icon: <Code className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    },
    {
      title: "Development",
      description: "AI-accelerated coding with automated testing and optimization",
      duration: "1-3 weeks",
      icon: <Database className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    },
    {
      title: "Launch",
      description: "Automated deployment with AI monitoring and performance tracking",
      duration: "1-2 days",
      icon: <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    },
  ],
}
