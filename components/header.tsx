"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Home, Briefcase, DollarSign, Mail } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler"

// Animation variants for 3D flip effects
const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

// Glow effect variants
const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 1.5,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
}

// Selected state glow (persistent) - same brightness as hover
const selectedGlowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  selected: {
    opacity: 1,
    scale: 1.2,
    transition: {
      opacity: { duration: 0.3 },
      scale: { duration: 0.3, type: "spring" as const, stiffness: 200, damping: 20 },
    },
  },
}

// Icon color animation variants - synchronized with motion
const iconColorVariants = {
  initial: { 
    color: "rgb(113 113 122)" // text-muted-foreground
  },
  hover: (iconColor: string) => ({
    color: iconColor,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const
    }
  }),
  selected: (iconColor: string) => ({
    color: iconColor,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const
    }
  })
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  const navigation = [
    { 
      name: "Home", 
      href: "/", 
      icon: <Home className="h-4 w-4" />,
      gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "text-blue-500",
      iconColorRgb: "rgb(59 130 246)" // blue-500
    },
    { 
      name: "Services", 
      href: "/services", 
      icon: <Briefcase className="h-4 w-4" />,
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      iconColor: "text-orange-500",
      iconColorRgb: "rgb(249 115 22)" // orange-500
    },
    { 
      name: "Pricing", 
      href: "/pricing", 
      icon: <DollarSign className="h-4 w-4" />,
      gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-green-500",
      iconColorRgb: "rgb(34 197 94)" // green-500
    },
    { 
      name: "Contact", 
      href: "/contact", 
      icon: <Mail className="h-4 w-4" />,
      gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
      iconColor: "text-red-500",
      iconColorRgb: "rgb(239 68 68)" // red-500
    },
  ]

  // Custom color gradients for glow effects - each item keeps its own color
  const getCustomGlow = (item: typeof navigation[0], isSelected: boolean) => {
    // Return the item's own gradient whether selected or hovered
    return item.gradient
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">404studios</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isSelected = pathname === item.href
              const isHovered = hoveredItem === item.name
              
              return (
                <motion.div
                  key={item.name}
                  className="relative"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-lg"
                    variants={glowVariants}
                    style={{
                      background: getCustomGlow(item, false),
                      opacity: 0,
                    }}
                  />
                  
                  {/* Selected state glow */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none rounded-lg"
                      variants={selectedGlowVariants}
                      initial="initial"
                      animate="selected"
                      style={{
                        background: getCustomGlow(item, true),
                      }}
                    />
                  )}

                  {/* Front face of the flip */}
                  <motion.div
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{ 
                      transformStyle: "preserve-3d", 
                      transformOrigin: "center bottom" 
                    }}
                    className="group"
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 relative z-10 rounded-lg transition-colors ${
                        isSelected 
                          ? "text-foreground font-medium" 
                          : "text-foreground hover:text-foreground"
                      }`}
                    >
                      <motion.span 
                        variants={iconColorVariants}
                        custom={item.iconColorRgb}
                        animate={
                          isSelected 
                            ? "selected" 
                            : isHovered 
                              ? "hover" 
                              : "initial"
                        }
                      >
                        {item.icon}
                      </motion.span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>

                  {/* Back face of the flip */}
                  <motion.div
                    className="absolute inset-0 group"
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{ 
                      transformStyle: "preserve-3d", 
                      transformOrigin: "center top",
                      rotateX: 90 
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 relative z-10 rounded-lg transition-colors ${
                        isSelected 
                          ? "text-foreground font-medium" 
                          : "text-foreground hover:text-foreground"
                      }`}
                    >
                      <motion.span 
                        variants={iconColorVariants}
                        custom={item.iconColorRgb}
                        animate={
                          isSelected 
                            ? "selected" 
                            : isHovered 
                              ? "hover" 
                              : "initial"
                        }
                      >
                        {item.icon}
                      </motion.span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <AnimatedThemeToggler className="hover:bg-accent/80 transition-colors" />
            <Button asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={item.iconColor}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                {/* Theme Toggler for Mobile */}
                <div className="flex items-center gap-3 py-2 border-t border-border mt-4 pt-4">
                  <AnimatedThemeToggler className="hover:bg-accent/80 transition-colors" />
                  <span className="text-foreground">Toggle Theme</span>
                </div>
                
                <Button asChild className="mt-4">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
