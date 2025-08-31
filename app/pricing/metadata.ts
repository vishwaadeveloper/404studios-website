import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered Pricing Calculator - Intelligent Project Estimator",
  description: "Estimate AI development, automation, chatbot, and integration costs instantly. 50% faster delivery & 30% lower total build cost.",
  keywords: ["AI pricing calculator", "automation project cost", "AI development estimate", "AI agent pricing", "chatbot cost", "workflow automation pricing"],
  openGraph: {
    title: "AI Project Pricing Calculator - 404studios",
    description: "Get instant AI development & automation estimates with intelligent pricing logic.",
    url: "https://404studios.com/pricing",
    type: "website",
    images: [
      {
        url: "/pricing-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "404studios Website Pricing Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Project Pricing Calculator - 404studios",
    description: "Instant AI development & automation cost estimates.",
    images: ["/pricing-twitter-image.jpg"]
  }
}
