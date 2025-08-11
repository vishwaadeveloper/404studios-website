import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Pricing Calculator - Get Instant Development Quotes",
  description: "Calculate your custom website development cost instantly. Interactive pricing tool for web applications, mobile apps, and digital solutions. Get accurate quotes based on your requirements.",
  keywords: ["pricing calculator", "website cost", "development pricing", "web app pricing", "custom quote", "website estimate", "development cost calculator"],
  openGraph: {
    title: "Website Pricing Calculator - 404studios",
    description: "Calculate your custom website development cost instantly with our interactive pricing tool.",
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
    title: "Website Pricing Calculator - 404studios",
    description: "Calculate your custom website development cost instantly with our interactive pricing tool.",
    images: ["/pricing-twitter-image.jpg"]
  }
}
