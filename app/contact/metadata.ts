import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered Consultation - Start Your Intelligent Project",
  description: "Talk to 404studios about AI development, automation, agents, chatbots, and predictive analytics. Begin transforming your business with intelligent solutions.",
  keywords: ["AI consultation", "automation inquiry", "AI development contact", "chatbot project", "business automation contact", "AI integration help"],
  openGraph: {
    title: "Contact 404studios - AI Development & Automation",
    description: "Start your AI-powered development or automation initiative with 404studios.",
    url: "https://404studios.com/contact",
    type: "website",
    images: [
      {
        url: "/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact 404studios for Web Development Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact 404studios - AI Development",
    description: "Launch AI-powered development, automation, or chatbot projects.",
    images: ["/contact-twitter-image.jpg"]
  }
}
