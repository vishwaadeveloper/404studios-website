import type { PricingData } from "../types/pricing.types"

export const pricingData: PricingData = [
  {
    group: "Core Website Features",
    features: [
      {
        feature: "Static Page",
        desc: "Traditional content page (Home, About, etc.)",
        tiers: [
          { name: "Basic", desc: "Simple layout, text/images.", price: 1600 },
          { name: "Standard", desc: "Custom layout, richer visuals.", price: 2200 },
          { name: "Advanced", desc: "Interactive/multi-section, premium visuals.", price: 3000 },
        ],
        isCountable: true,
        minCount: 1,
      },
      {
        feature: "Dynamic Page",
        desc: "Admin-managed pages (blogs, listings, etc.)",
        tiers: [
          { name: "Basic", desc: "Editable content, basic list/detail.", price: 3000 },
          { name: "Standard", desc: "Search/filter, advanced layout.", price: 6000 },
          { name: "Advanced", desc: "User logins, integrations.", price: 9600 },
        ],
        isCountable: true,
        minCount: 0,
      },
      {
        feature: "Animations & Interactions",
        desc: "Site-wide motion, micro-interactions, and advanced effects.",
        tiers: [
          { name: "Basic", desc: "Just smooth transitions, buttons, loading.", price: 2000 },
          { name: "Standard", desc: "Section reveals, parallax, moderate interactive effects.", price: 4800 },
          { name: "Advanced", desc: "3D, scroll magic, highly custom, immersive.", price: 12000 },
        ],
        isCountable: false,
      },
      {
        feature: "Image Gallery",
        desc: "Showcase photos/work in an animated gallery or lightbox.",
        tiers: [
          { name: "Basic", desc: "Simple grid, click-to-enlarge.", price: 1600 },
          { name: "Standard", desc: "Filterable albums, animations.", price: 3000 },
          { name: "Advanced", desc: "Slideshow, social sharing, advanced lightbox.", price: 4000 },
        ],
        isCountable: false,
      },
      {
        feature: "Contact Form",
        desc: "Visitors can quickly send you messages or inquiries.",
        tiers: [
          { name: "Basic", desc: "Simple form, email notifications.", price: 1600 },
          { name: "Standard", desc: "Add validation, spam checks, extra fields.", price: 2400 },
          { name: "Advanced", desc: "Multi-step, uploads, logic routing.", price: 3200 },
        ],
        isCountable: false,
      },
      {
        feature: "SEO Essentials",
        desc: "Meta tags, sitemap, clean structure—Google-friendly setup.",
        tiers: [
          { name: "Basic", desc: "Meta, titles, sitemap, robots.txt.", price: 2400 },
          { name: "Standard", desc: "OG/social meta, Google Analytics.", price: 3200 },
          { name: "Advanced", desc: "Rich snippet/schema, in-depth reports.", price: 6400 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "Business & Transactional Features",
    features: [
      {
        feature: "User Authentication",
        desc: "Let visitors register, login, and access secure content.",
        tiers: [
          { name: "Basic", desc: "Signup/login, password reset.", price: 1600 },
          { name: "Standard", desc: "Profile, email verification.", price: 3000 },
          { name: "Advanced", desc: "Social logins, 2FA/MFA.", price: 4000 },
        ],
        isCountable: false,
      },
      {
        feature: "Payment Integration",
        desc: "Take payments online via secure gateways like UPI, cards, wallets.",
        tiers: [
          { name: "Basic", desc: "One gateway (e.g. UPI/Razorpay).", price: 4000 },
          { name: "Standard", desc: "Multiple options, order linking.", price: 8000 },
          { name: "Advanced", desc: "Subscriptions, custom payment workflow.", price: 12000 },
        ],
        isCountable: false,
      },
      {
        feature: "Cart & Checkout",
        desc: "Sell products or services, manage orders end-to-end.",
        tiers: [
          { name: "Basic", desc: "Simple cart, 1-step checkout.", price: 6400 },
          { name: "Standard", desc: "Cart editing, addresses, coupons.", price: 12000 },
          { name: "Advanced", desc: "Abandoned cart, analytics, multi-step.", price: 16000 },
        ],
        isCountable: false,
      },
      {
        feature: "Booking/Appointment System",
        desc: "Book meetings, services, consults, or classes online.",
        tiers: [
          { name: "Basic", desc: "Single service, owner approval.", price: 4000 },
          { name: "Standard", desc: "Multiple services, auto notifies.", price: 6000 },
          { name: "Advanced", desc: "Automated, payments, analytics.", price: 8000 },
        ],
        isCountable: false,
      },
      {
        feature: "Admin Panel",
        desc: "Easily manage your website—including content, orders, analytics. Powered by Directus.",
        tiers: [
          { name: "Basic", desc: "Content pages, images, blog, users.", price: 16000 },
          { name: "Standard", desc: "Add order/booking/inventory management, basic stats.", price: 20000 },
          { name: "Advanced", desc: "Role-based permissions, automations, integrations.", price: 40000 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "Growth & Communication",
    features: [
      {
        feature: "Testimonials/Reviews",
        desc: "Showcase positive feedback for instant trust.",
        tiers: [
          { name: "Basic", desc: "Manual admin update.", price: 2400 },
          { name: "Standard", desc: "Star ratings, slider/carousel.", price: 4000 },
          { name: "Advanced", desc: "User-submitted and moderated.", price: 6400 },
        ],
        isCountable: false,
      },
      {
        feature: "Newsletter Signup",
        desc: "Collect leads and grow your mailing list.",
        tiers: [
          { name: "Basic", desc: "Simple email capture.", price: 1600 },
          { name: "Standard", desc: "Mailchimp/API sync.", price: 2400 },
          { name: "Advanced", desc: "Double opt-in, segmentation.", price: 3200 },
        ],
        isCountable: false,
      },
      {
        feature: "Live Chat/Chatbot",
        desc: "Support or convert visitors instantly via chat or AI.",
        tiers: [
          { name: "Basic", desc: "Manual live chat only.", price: 8000 },
          { name: "Standard", desc: "Scripted or basic AI bot.", price: 16000 },
          { name: "Advanced", desc: "GPT-powered, trained chatbot.", price: 32000 },
        ],
        isCountable: false,
      },
      {
        feature: "Blog/Content Module",
        desc: "Publish updates and attract SEO traffic with editable blog.",
        tiers: [
          { name: "Basic", desc: "Simple admin editor & publish.", price: 4800 },
          { name: "Standard", desc: "Categories, tags, images/media.", price: 7000 },
          { name: "Advanced", desc: "User posts, comments, multimedia.", price: 9600 },
        ],
        isCountable: false,
      },
      {
        feature: "Multilingual Support",
        desc: "Expand reach with multi-language site capability.",
        tiers: [
          { name: "Basic", desc: "1 extra language, manual translation.", price: 4800 },
          { name: "Standard", desc: "UI toggle, up to 3 languages.", price: 12000 },
          { name: "Advanced", desc: "Automated CMS-driven, unlimited.", price: 20000 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "Backend & Integrations",
    features: [
      {
        feature: "Supabase/Firebase Backend",
        desc: "Scalable backend/auth/storage for web/apps.",
        tiers: [
          { name: "Basic", desc: "Auth, database, basic setup.", price: 6400 },
          { name: "Standard", desc: "Custom data/functions, notifications.", price: 9000 },
          { name: "Advanced", desc: "Full logic, advanced integrations.", price: 12000 },
        ],
        isCountable: false,
      },
      {
        feature: "Custom Backend/API",
        desc: "Build custom APIs or backends for special requirements.",
        tiers: [
          { name: "Basic", desc: "Simple CRUD/API/minimal endpoints.", price: 20000 },
          { name: "Standard", desc: "Business logic, user auth, secure APIs.", price: 30000 },
          { name: "Advanced", desc: "Complex workflows, realtime or third-party sync.", price: 40000 },
        ],
        isCountable: false,
      },
      {
        feature: "Analytics Dashboard",
        desc: "Track visits, user activity, and custom events.",
        tiers: [
          { name: "Basic", desc: "Google Analytics embed.", price: 1600 },
          { name: "Standard", desc: "Dashboard, basic custom metrics.", price: 2400 },
          { name: "Advanced", desc: "Real-time, custom reports/exports.", price: 3200 },
        ],
        isCountable: false,
      },
      {
        feature: "Performance Optimization",
        desc: "Boost loading speed and smooth delivery.",
        tiers: [
          { name: "Basic", desc: "Image compression/lazy loading.", price: 1600 },
          { name: "Standard", desc: "JS/CSS optimization, CDN.", price: 4800 },
          { name: "Advanced", desc: "Advanced audits, bundle splitting.", price: 8000 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "After-Launch Support",
    features: [
      {
        feature: "Maintenance & Support",
        desc: "Ongoing updates, fixes, and monitoring.",
        tiers: [
          { name: "Basic", desc: "Email support, minor updates.", price: 2400 },
          { name: "Standard", desc: "Bugfixes, quick content edits.", price: 5000 },
          { name: "Advanced", desc: "Proactive care, high-touch SLA.", price: 8000 },
        ],
        isCountable: false,
      },
      {
        feature: "SEO Optimization",
        desc: "Detailed post-launch SEO improvements.",
        tiers: [
          { name: "Basic", desc: "Diagnose meta, mobile, crawl status.", price: 2400 },
          { name: "Standard", desc: "OG/schema tweak, improve speed.", price: 3200 },
          { name: "Advanced", desc: "Full audit & report, deep keyword/content strategy.", price: 6400 },
        ],
        isCountable: false,
      },
      {
        feature: "Custom Add-ons",
        desc: "Advanced features like AI chatbot, 3D, etc.",
        tiers: [
          { name: "Basic", desc: "Simple AI or Lottie animation.", price: 6400 },
          { name: "Standard", desc: "Trained chatbot, custom 3D elements.", price: 16000 },
          { name: "Advanced", desc: "Bespoke AI workflow or full 3D scene.", price: 40000 },
        ],
        isCountable: false,
      },
    ],
  },
]
