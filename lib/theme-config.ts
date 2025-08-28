// Centralized theme configuration for 404studios
export const themeConfig = {
  // Brand colors
  brand: {
    primary: "hsl(193, 82%, 31%)", // Cyan-600
    secondary: "hsl(271, 91%, 65%)", // Purple-500
    accent: "hsl(217, 91%, 60%)", // Blue-500
  },
  
  // Navigation colors for light theme
  light: {
    background: "rgba(255, 255, 255, 0.80)",
    backgroundScrolled: "rgba(255, 255, 255, 0.95)",
    text: "hsl(222.2, 84%, 4.9%)",
    textMuted: "hsl(215.4, 16.3%, 46.9%)",
    textActive: "hsl(193, 82%, 31%)",
    border: "hsl(214.3, 31.8%, 91.4%)",
    hover: "hsl(210, 40%, 96%)",
    card: "hsl(0, 0%, 100%)",
  },
  
  // Navigation colors for dark theme
  dark: {
    background: "rgba(2, 8, 23, 0.80)", // Very dark blue
    backgroundScrolled: "rgba(2, 8, 23, 0.95)",
    text: "hsl(210, 40%, 98%)",
    textMuted: "hsl(215, 20.2%, 65.1%)",
    textActive: "hsl(193, 82%, 55%)", // Cyan-400
    border: "hsl(217.2, 32.6%, 17.5%)",
    hover: "hsl(217.2, 32.6%, 17.5%)",
    card: "hsl(222.2, 84%, 4.9%)",
  },
  
  // Animation settings
  animations: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    hover: "transform 0.2s ease-out",
    spring: {
      type: "spring" as const,
      stiffness: 400,
      damping: 17,
    },
    gentle: {
      type: "tween" as const,
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
  
  // Navigation items with consistent theming
  navigation: [
    {
      label: "Home",
      href: "/",
      icon: "Home",
    },
    {
      label: "Services", 
      href: "/services",
      icon: "Code",
    },
    {
      label: "Features",
      href: "/features", 
      icon: "Star",
    },
    {
      label: "Pricing",
      href: "/pricing",
      icon: "DollarSign", 
    },
    {
      label: "Contact",
      href: "/contact",
      icon: "Mail",
    },
  ] as const,
}

export type NavigationItem = typeof themeConfig.navigation[number]
