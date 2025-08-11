// Breadcrumb schemas for different pages
export const breadcrumbSchemas = {
  home: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://404studios.com"
      }
    ]
  },
  
  pricing: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://404studios.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pricing Calculator",
        "item": "https://404studios.com/pricing"
      }
    ]
  },
  
  features: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://404studios.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Features & Tiers",
        "item": "https://404studios.com/features"
      }
    ]
  },
  
  packages: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home", 
        "item": "https://404studios.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Service Packages",
        "item": "https://404studios.com/packages"
      }
    ]
  },
  
  services: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://404studios.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Our Services",
        "item": "https://404studios.com/services"
      }
    ]
  },
  
  contact: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://404studios.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Us",
        "item": "https://404studios.com/contact"
      }
    ]
  }
}
