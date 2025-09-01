import type React from "react"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AppProviders from "@/components/AppProviders"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://404studios.com'),
  title: {
    default: "404studios - Futuristic Web Development | Custom Digital Solutions",
    template: "%s | 404studios"
  },
  description: "Transform your digital presence with cutting-edge web and mobile applications. Expert development services using React, Next.js, and modern technologies for stunning user experiences.",
  keywords: ["web development", "mobile apps", "React", "Next.js", "custom software", "digital solutions", "UI/UX design", "modern web design", "responsive websites", "full-stack development"],
  authors: [{ name: "404studios" }],
  creator: "404studios",
  publisher: "404studios",
  generator: "404studios",
  applicationName: "404studios Website",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://404studios.com",
    siteName: "404studios",
    title: "404studios - Futuristic Web Development",
    description: "Transform your digital presence with cutting-edge web and mobile applications. Expert development services for modern businesses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "404studios - Modern Web Development Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@404studios",
    creator: "@404studios",
    title: "404studios - Futuristic Web Development",
    description: "Transform your digital presence with cutting-edge web and mobile applications.",
    images: ["/twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en-US" 
      dir="ltr" 
      data-scroll-behavior="smooth" 
      className={`scroll-smooth ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href="https://404studios.com" />
        <meta name="theme-color" content="#06b6d4" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="404studios" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Performance optimizations - temporarily disabled */}
        {/* ResourcePreloader, FontPreloader and ConnectionPreloader removed - incompatible with app directory */}
      </head>
      <body className={`${spaceMono.className} ${spaceMono.variable}`}>
        <AppProviders>
          <Header />
          <main>{children}</main>
          <Footer />
          <SpeedInsights />
          <Analytics />
        </AppProviders>
      </body>
    </html>
  )
}
