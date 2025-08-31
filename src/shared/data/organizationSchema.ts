// Organization Schema for better brand recognition
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "404studios - AI-Powered Development",
  "alternateName": ["404 Studios", "404studios Web Development", "404 Studios Coimbatore"],
  "description": "Leading AI-powered web development and business automation studio delivering faster, lower-cost, future-ready solutions.",
  "url": "https://404studios.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://404studios.com/placeholder-logo.svg",
    "width": "400",
    "height": "400"
  },
  "image": [
    "https://404studios.com/og-image.jpg",
    "https://404studios.com/placeholder-logo.svg"
  ],
  "founder": [
    {
      "@type": "Person",
      "name": "Vishwaa Developer",
      "email": "vishwaadeveloper@gmail.com"
    },
    {
      "@type": "Person", 
      "name": "Abinayaa Developer",
      "email": "abinayaa.dev@gmail.com"
    }
  ],
  "foundingDate": "2025",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Tamil Nadu", 
    "addressLocality": "Coimbatore",
    "postalCode": "641001"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-7845890089",
      "contactType": "customer service",
      "availableLanguage": ["English", "Tamil", "Hindi"],
      "contactOption": "TollFree"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-9489153545", 
      "contactType": "technical support",
      "availableLanguage": ["English", "Tamil", "Hindi"]
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/404studios",
    "https://twitter.com/404studios",
    "https://github.com/404studios",
    "https://www.instagram.com/404studios",
    "https://www.facebook.com/404studios"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "11.0168",
      "longitude": "76.9558"
    },
    "geoRadius": "50000"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "India"
    },
    {
      "@type": "Country", 
      "name": "United States"
    },
    {
      "@type": "Country",
      "name": "United Kingdom"
    }
  ],
  "knowsAbout": [
    "AI Development",
    "Business Automation",
    "AI Agents",
    "Chatbots",
    "Predictive Analytics",
    "Workflow Automation",
    "Intelligent Monitoring"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Development & Automation Services",  
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom AI Agents",
          "description": "Autonomous agents for workflow and decision automation"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "AI-Enhanced Development",
          "description": "Accelerated web & mobile builds with embedded intelligence"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Predictive Analytics",
          "description": "Forecasting, anomaly detection, and insight automation"
        }
      }
    ]
  }
}
