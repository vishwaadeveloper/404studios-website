import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services - Professional Web & Mobile Development",
  description: "Comprehensive web development, mobile app development, UI/UX design, and digital transformation services. Expert solutions with modern technologies and cutting-edge design.",
  keywords: ["web development services", "mobile app development", "UI/UX design", "digital services", "custom software", "full-stack development"],
  openGraph: {
    title: "Our Services - 404studios Professional Development",
    description: "Comprehensive web development, mobile app development, UI/UX design, and digital transformation services.",
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
    title: "Our Services - 404studios Professional Development",
    description: "Comprehensive web development, mobile app development, UI/UX design, and digital transformation services.",
    images: ["/services-twitter-image.jpg"]
  }
}
