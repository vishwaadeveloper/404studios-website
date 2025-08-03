import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageLoader from "@/components/page-loader"
import PageTransition from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "404studios - Modern Web Development",
  description: "Next-generation web and mobile app development with cutting-edge design",
    generator: '404studios'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <PageLoader />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
