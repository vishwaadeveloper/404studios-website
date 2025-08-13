// Organization Schema for better brand recognition
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "404studios",
  "alternateName": ["404 Studios", "404studios Web Development", "404 Studios Coimbatore"],
  "description": "Professional web development studio based in Coimbatore, India, specializing in React, Next.js applications and mobile app development.",
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
    "React Development",
    "Next.js Development", 
    "Web Application Development",
    "Mobile App Development",
    "UI/UX Design",
    "Full Stack Development",
    "Custom Software Development"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",  
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development",
          "description": "Custom web application development using React, Next.js"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development",
          "description": "Cross-platform mobile application development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "UI/UX Design",
          "description": "Modern, responsive user interface and experience design"
        }
      }
    ]
  }
}
