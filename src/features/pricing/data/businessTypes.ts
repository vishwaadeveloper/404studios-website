import type { BusinessType, BusinessConfiguration } from "../types/pricing.types"

export const businessTypes: Record<BusinessType, BusinessConfiguration> = {
  portfolio: {
    name: "Portfolio/Personal Brand",
    description: "Showcase your work and personal brand",
    basePrice: 12000,
    timeline: "5-7 days",
    defaultPages: {
      static: { count: 4, names: ["Home", "About", "Portfolio", "Contact"] },
      dynamic: { count: 0, names: [] },
    },
    defaults: {
      "Static Page": "Standard",
      "Image Gallery": "Standard",
      "Contact Form": "Basic",
      "SEO Essentials": "Basic",
      "Animations & Interactions": "Basic",
    },
  },
  restaurant: {
    name: "Restaurant/Cafe",
    description: "Menu, reservations, and dining experience",
    basePrice: 15000,
    timeline: "1-2 weeks",
    defaultPages: {
      static: { count: 5, names: ["Home", "Menu", "About", "Contact", "Gallery"] },
      dynamic: { count: 0, names: [] },
    },
    defaults: {
      "Static Page": "Standard",
      "Image Gallery": "Standard",
      "Contact Form": "Basic",
      "Booking/Appointment System": "Basic",
      "SEO Essentials": "Basic",
    },
  },
  ecommerce: {
    name: "E-commerce Store",
    description: "Sell products online with full shopping experience",
    basePrice: 34000,
    timeline: "2-3 weeks",
    defaultPages: {
      static: { count: 4, names: ["Home", "About", "Contact", "Terms"] },
      dynamic: { count: 3, names: ["Products", "Product Detail", "Cart"] },
    },
    defaults: {
      "Static Page": "Standard",
      "Dynamic Page": "Standard",
      "Cart & Checkout": "Standard",
      "Payment Integration": "Standard",
      "User Authentication": "Basic",
      "Admin Panel": "Basic",
    },
  },
  business: {
    name: "Business/Services",
    description: "Professional services and business presence",
    basePrice: 18000,
    timeline: "1-2 weeks",
    defaultPages: {
      static: { count: 6, names: ["Home", "About", "Services", "Team", "Contact", "Testimonials"] },
      dynamic: { count: 1, names: ["Blog"] },
    },
    defaults: {
      "Static Page": "Standard",
      "Dynamic Page": "Basic",
      "Contact Form": "Standard",
      "Testimonials/Reviews": "Basic",
      "SEO Essentials": "Standard",
      "Newsletter Signup": "Basic",
    },
  },
  fitness: {
    name: "Fitness/Wellness",
    description: "Classes, trainers, and membership management",
    basePrice: 16000,
    timeline: "1-2 weeks",
    defaultPages: {
      static: { count: 6, names: ["Home", "About", "Classes", "Trainers", "Membership", "Contact"] },
      dynamic: { count: 0, names: [] },
    },
    defaults: {
      "Static Page": "Standard",
      "Booking/Appointment System": "Standard",
      "User Authentication": "Basic",
      "Image Gallery": "Basic",
      "Contact Form": "Basic",
    },
  },
}
