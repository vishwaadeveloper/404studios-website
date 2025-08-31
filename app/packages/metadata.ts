import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Service Packages - Development & Automation Bundles",
  description: "Compare AI-powered development, automation, chatbot, and intelligence packages. Faster delivery, lower cost, future-ready.",
  keywords: ["AI service packages", "automation bundles", "AI development packages", "chatbot package", "business automation pricing"],
  openGraph: {
    title: "AI Service Packages - 404studios",
    description: "AI development, automation, chatbot, and predictive analytics bundles.",
    url: "https://404studios.com/packages",
    type: "website",
    images: [
      {
        url: "/packages-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "404studios Service Packages and Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Service Packages - 404studios", 
    description: "Compare AI development & automation bundle options.",
    images: ["/packages-twitter-image.jpg"]
  }
}
