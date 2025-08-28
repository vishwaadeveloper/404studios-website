// Local Business Schema for better local SEO
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "404studios",
  "alternateName": "404 Studios",
  "description": "Professional web development and mobile app development services specializing in modern technologies and cutting-edge design",
  "url": "https://404studios.com",
  "logo": "https://404studios.com/logo.png",
  "image": [
    "https://404studios.com/og-image.jpg",
    "https://404studios.com/office-image.jpg"
  ],
  "telephone": "+91-7845890089",
  "email": "contact@404studios.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Tamil Nadu",
    "addressLocality": "Coimbatore"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "11.0168",
    "longitude": "76.9558"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://github.com/404studios",
    "https://linkedin.com/company/404studios",
    "https://twitter.com/404studios"
  ],
  "priceRange": "$5000-$50000",
  "paymentAccepted": ["Credit Card", "Bank Transfer", "UPI", "PayPal"],
  "currenciesAccepted": "INR",
  "serviceArea": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Web Development",
          "description": "Full-stack web application development"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "INR",
          "price": "200000-1500000"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development",
          "description": "Native and cross-platform mobile apps"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "INR",
          "price": "500000-2500000"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
}
