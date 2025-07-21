"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/calculator", label: "Calculator" },
    { href: "/features", label: "Features & Tiers" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/20 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container px-3 sm:px-4 md:px-6 mx-auto">
        <div className="flex h-12 sm:h-14 md:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Code2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            <span className="text-base sm:text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              404studios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-all duration-300 group whitespace-nowrap ${
                  isActive(item.href) ? "text-cyan-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/calculator">
              <Button className="relative overflow-hidden rounded-full h-8 sm:h-9 md:h-10 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300 text-xs sm:text-sm font-semibold">
                <span className="relative z-10">Get Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-cyan-400 hover:bg-transparent h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 py-3 sm:py-4 animate-slide-down">
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 sm:py-3 px-2 text-sm sm:text-base font-medium transition-all duration-300 group ${
                    isActive(item.href) ? "text-cyan-400" : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${
                      isActive(item.href) ? "w-8" : "w-0 group-hover:w-8"
                    }`}
                  />
                </Link>
              ))}

              <div className="pt-3 sm:pt-4 px-2">
                <Link href="/calculator" onClick={() => setIsOpen(false)}>
                  <Button className="w-full relative overflow-hidden rounded-full h-10 sm:h-12 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300 text-sm font-semibold">
                    <span className="relative z-10">Get Quote</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
