import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Get Started with Your Project Today",
  description: "Ready to transform your digital presence? Contact 404studios for professional web development, mobile apps, and custom software solutions. Get your free consultation today.",
  keywords: ["contact 404studios", "web development consultation", "project inquiry", "custom development quote", "get in touch", "development services contact"],
  openGraph: {
    title: "Contact 404studios - Start Your Project Today",
    description: "Ready to transform your digital presence? Contact us for professional web development and custom software solutions.",
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
    title: "Contact 404studios - Start Your Project Today",
    description: "Ready to transform your digital presence? Contact us for professional web development and custom software solutions.",
    images: ["/contact-twitter-image.jpg"]
  }
}
