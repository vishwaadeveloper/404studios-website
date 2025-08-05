import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service Packages - Comprehensive Web Development Solutions",
  description: "Discover our detailed service packages for web development, mobile apps, and digital solutions. Compare features, pricing, and choose the perfect package for your project needs.",
  keywords: ["service packages", "web development packages", "development services", "website packages", "mobile app packages", "digital solutions"],
  openGraph: {
    title: "Service Packages - 404studios Development Solutions",
    description: "Discover our detailed service packages for web development, mobile apps, and digital solutions.",
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
    title: "Service Packages - 404studios Development Solutions", 
    description: "Discover our detailed service packages for web development, mobile apps, and digital solutions.",
    images: ["/packages-twitter-image.jpg"]
  }
}
