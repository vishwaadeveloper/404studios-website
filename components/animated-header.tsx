"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Home, 
  Code, 
  Star, 
  DollarSign, 
  Mail, 
  Menu, 
  X, 
  Code2,
  Sun,
  Moon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { themeConfig } from "@/lib/theme-config"

const iconMap = {
  Home,
  Code,
  Star,
  DollarSign,
  Mail,
} as const

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md bg-secondary animate-pulse" />
    )
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative flex items-center justify-center w-9 h-9 rounded-md",
        "bg-secondary hover:bg-secondary/80 border border-border",
        "transition-colors duration-200"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={themeConfig.animations.gentle}
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 180
        }}
        transition={themeConfig.animations.gentle}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-muted-foreground" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : 180
        }}
        transition={themeConfig.animations.gentle}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-yellow-500" />
      </motion.div>
    </motion.button>
  )
}

export default function AnimatedHeader() {
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

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href);
  }

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-background/80 backdrop-blur-sm"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Code2 className="h-8 w-8 text-primary transition-colors duration-300" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-foreground"
              whileHover={{ scale: 1.02 }}
              transition={themeConfig.animations.gentle}
            >
              404studios
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {themeConfig.navigation.map((item, index) => {
              const Icon = iconMap[item.icon]
              const active = isActive(item.href)
              const gradientClass = `nav-gradient-${item.label.toLowerCase()}`
              
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={cn(
                        "nav-gradient-base relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                        gradientClass,
                        active && "active",
                        active 
                          ? "text-foreground font-semibold" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={themeConfig.animations.gentle}
                    >
                      <Icon className="w-4 h-4 nav-icon transition-colors duration-300" />
                      <span>{item.label}</span>
                      
                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full mx-1"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0, scaleX: 0.8 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={themeConfig.animations.gentle}
                          style={{ 
                            backgroundColor: item.label === 'Home' ? 'oklch(0.7 0.15 240)' :
                                           item.label === 'Services' ? 'oklch(0.7 0.15 270)' :
                                           item.label === 'Features' ? 'oklch(0.7 0.15 150)' :
                                           item.label === 'Pricing' ? 'oklch(0.7 0.15 30)' :
                                           item.label === 'Contact' ? 'oklch(0.7 0.15 0)' :
                                           'currentColor'
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Right Side - Theme Toggle + CTA */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ThemeToggle />
            
            {/* CTA Button */}
            <div className="hidden md:block">
              <Link href="/pricing">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={themeConfig.animations.gentle}
                >
                  <Button 
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    Get Quote
                  </Button>
                </motion.div>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-9 h-9"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={themeConfig.animations.gentle}
              >
                {isOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={cn("lg:hidden overflow-hidden")}
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={themeConfig.animations.gentle}
        >
          <div className="py-4 space-y-1 border-t border-border">
            {themeConfig.navigation.map((item, index) => {
              const Icon = iconMap[item.icon]
              const active = isActive(item.href)
              const gradientClass = `nav-gradient-${item.label.toLowerCase()}`
              
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isOpen ? 1 : 0, 
                    x: isOpen ? 0 : -20 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: isOpen ? 0.05 * index : 0,
                    ease: "easeOut"
                  }}
                >
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      className={cn(
                        "nav-gradient-base flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300",
                        gradientClass,
                        active && "active",
                        active 
                          ? "text-foreground font-semibold" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      whileHover={{ x: 4 }}
                      transition={themeConfig.animations.gentle}
                    >
                      <Icon className="w-4 h-4 nav-icon transition-colors duration-300" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
            
            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isOpen ? 1 : 0, 
                x: isOpen ? 0 : -20 
              }}
              transition={{ 
                duration: 0.3, 
                delay: isOpen ? 0.05 * themeConfig.navigation.length : 0,
                ease: "easeOut"
              }}
              className="pt-2"
            >
              <Link href="/pricing" onClick={() => setIsOpen(false)}>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="sm"
                >
                  Get Quote
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
