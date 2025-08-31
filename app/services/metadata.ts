import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered Services - Intelligent Development & Automation",
  description: "AI-powered development, automation, and integration services delivering 50% faster delivery, 30% cost reduction, and future-ready solutions.",
  keywords: ["AI-powered development", "business automation", "AI agents", "intelligent chatbots", "workflow automation", "predictive analytics", "AI integration"],
  openGraph: {
    title: "AI-Powered Services - 404studios Intelligent Development",
    description: "AI development, automation, agents, chatbots, and predictive analytics for faster, smarter delivery.",
    url: "https://404studios.com/services",
    type: "website",
    images: [
      {
        url: "/services-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "404studios Professional Development Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Services - 404studios",
    description: "AI development, automation, agents, chatbots, and predictive analytics for faster, smarter delivery.",
    images: ["/services-twitter-image.jpg"]
  }
}
