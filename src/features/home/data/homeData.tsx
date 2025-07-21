import { ArrowRight, Code, Database, Layers, Search } from "lucide-react"
import type { HomeData } from "../types/home.types"

export const homeData: HomeData = {
  packages: [
    {
      name: "Portfolio Package",
      description: "Perfect for freelancers showcasing their work with a professional online presence and modern design.",
      price: "₹8,000 - ₹12,000",
      icon: <Code className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />,
    },
    {
      name: "Local Business Package",
      description:
        "Complete solution for local businesses with location mapping, services display, and customer engagement.",
      price: "₹15,000 - ₹25,000",
      icon: <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />,
    },
    {
      name: "E-commerce Package",
      description: "Full-featured online store with product management, payment integration, and inventory tracking.",
      price: "₹30,000 - ₹40,000",
      icon: <Database className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />,
    },
  ],
  features: [
    {
      icon: <Code className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400" />,
      title: "Clean Code",
      description:
        "We write maintainable, efficient code that scales with your business needs and follows industry best practices.",
    },
    {
      icon: <Layers className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />,
      title: "Modern Design",
      description: "Stunning interfaces with the latest design trends, optimal user experience, and responsive layouts.",
    },
    {
      icon: <Database className="h-8 w-8 sm:h-10 sm:w-10 text-pink-400" />,
      title: "Robust Backend",
      description: "Secure, scalable backend solutions that power your applications reliably with cloud infrastructure.",
    },
  ],
  processSteps: [
    {
      title: "Discovery",
      description: "Understanding your requirements and project scope",
      duration: "1-2 days",
      icon: <Search className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    },
    {
      title: "Design",
      description: "Creating wireframes and visual designs",
      duration: "3-5 days",
      icon: <Code className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    },
    {
      title: "Development",
      description: "Building your application with modern technologies",
      duration: "1-4 weeks",
      icon: <Database className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    },
    {
      title: "Launch",
      description: "Testing, deployment, and going live",
      duration: "2-3 days",
      icon: <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
    },
  ],
}
