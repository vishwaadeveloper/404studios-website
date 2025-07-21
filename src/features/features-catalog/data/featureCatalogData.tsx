import { 
  Code, 
  Database, 
  MessageCircle, 
  Settings, 
  Shield 
} from 'lucide-react';
import { FeatureCatalog } from '../types/features.types';

export const featureCatalogData: FeatureCatalog = [
  {
    group: "Core Website Features",
    icon: <Code className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />,
    description: "Essential building blocks for any modern website",
    features: [
      {
        feature: "Static Page",
        explanation: "A classic site page (like Home, About, or Contact)—always mobile friendly.",
        tiers: [
          {
            tier: "Basic",
            include:
              "A straightforward web page with text and images, built to look clean and function well on any device. No advanced layouts.",
          },
          {
            tier: "Standard",
            include:
              "A custom-designed page with richer structure, sections, and subtle UI animations. Handles more detailed content and gives your brand a distinct feel.",
          },
          {
            tier: "Advanced",
            include:
              "Highly-polished layouts with interactive sections, advanced CSS/JS effects, and modular structure for maximum impact.",
          },
        ],
      },
      {
        feature: "Dynamic Page",
        explanation: "Content-managed pages—blogs, listings, etc.—easily updatable by you.",
        tiers: [
          {
            tier: "Basic",
            include:
              "A content-managed page (like a blog or news feed) editable from your admin panel. Data is stored in a backend, and updates are instant.",
          },
          {
            tier: "Standard",
            include:
              "Adds user-friendly search, filtering, and richer content types. Ideal for product listings, event calendars, or portfolios needing more interactivity.",
          },
          {
            tier: "Advanced",
            include:
              "Enables user accounts, permissions, analytics modules, custom content types, and API-driven data integrations—suited for dashboards or complex listings.",
          },
        ],
      },
      {
        feature: "Animations & Interactions",
        explanation: "Modern motion effects—from subtle hovers to 3D wow.",
        tiers: [
          {
            tier: "Basic",
            include: "Smooth transitions (e.g., fades, button animations) that make the experience feel modern.",
          },
          {
            tier: "Standard",
            include: "Section reveals, scroll effects, and basic parallax motion for an engaging, interactive flow.",
          },
          {
            tier: "Advanced",
            include:
              "High-end animations and 3D or scroll-driven interactive UI—think immersive effects, animated cards, or visual storytelling.",
          },
        ],
      },
      {
        feature: "Image Gallery",
        explanation: "Visually showcase your photos, work, or products.",
        tiers: [
          { tier: "Basic", include: "Grid layout of images with basic click-to-enlarge (lightbox functionality)." },
          {
            tier: "Standard",
            include:
              "Includes filtering options, subtle entry animations, and responsive design so galleries adapt to any screen.",
          },
          {
            tier: "Advanced",
            include: "Enhanced lightboxes, custom carousels/sliders, and built-in sharing or tagging.",
          },
        ],
      },
      {
        feature: "Contact Form",
        explanation: "Let customers contact you in one click.",
        tiers: [
          {
            tier: "Basic",
            include: "Standard online form with necessary fields. Secure and delivers queries to your email.",
          },
          {
            tier: "Standard",
            include: "Adds dynamic validation, spam prevention, and support for custom contact fields.",
          },
          {
            tier: "Advanced",
            include:
              "Multi-step forms, file uploads, conditional logic (fields can change based on user input), and backend routing for smarter response handling.",
          },
        ],
      },
      {
        feature: "SEO Essentials",
        explanation: "Foundational tools for being discovered on Google.",
        tiers: [
          {
            tier: "Basic",
            include: "Meta tags set up, sitemap.xml, and basic mobile/desktop optimization for discoverability.",
          },
          {
            tier: "Standard",
            include:
              "Social media previews (Open Graph), Google Analytics integration, and schema markup for better search result snippets.",
          },
          {
            tier: "Advanced",
            include:
              "Technical SEO (structured data, advanced schema), content suggestions, and regular audits for ongoing improvement.",
          },
        ],
      },
    ],
  },
  {
    group: "Business & Transactional Features",
    icon: <Database className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />,
    description: "Advanced functionality for commerce and user management",
    features: [
      {
        feature: "User Authentication",
        explanation: "Let visitors create secure accounts and control what they access.",
        tiers: [
          {
            tier: "Basic",
            include: "User registration and login forms, password reset via email, with security best practices.",
          },
          { tier: "Standard", include: "Profile pages, email verification for signup, and basic permission controls." },
          {
            tier: "Advanced",
            include: "Social logins (Google/Facebook), 2FA, and granular access levels for different user types.",
          },
        ],
      },
      {
        feature: "Payment Integration",
        explanation: "Accept payments through trusted online gateways, all secure.",
        tiers: [
          { tier: "Basic", include: "Single provider (e.g., UPI, major card) connected via secure gateway." },
          {
            tier: "Standard",
            include: "Multiple payment options, order/invoice linking, and payment status tracking.",
          },
          {
            tier: "Advanced",
            include: "Support for subscriptions, custom payment flows, and detailed payment reporting.",
          },
        ],
      },
      {
        feature: "Cart & Checkout",
        explanation: "From browsing to buying—manage every step for online sales.",
        tiers: [
          { tier: "Basic", include: "Simple cart and checkout system—core add-to-cart and purchase flow." },
          {
            tier: "Standard",
            include: "Cart persistence, coupon codes, customer addresses, and save-for-later features.",
          },
          {
            tier: "Advanced",
            include: "Automation (abandoned cart emails), analytics, and custom checkout experiences.",
          },
        ],
      },
      {
        feature: "Booking/Appointment System",
        explanation: "Let clients schedule services or meetings in seconds.",
        tiers: [
          { tier: "Basic", include: "Scheduling for a single service. Admin approves bookings from the backend." },
          {
            tier: "Standard",
            include:
              "Multiple services, automated reminders, customer self-management, and real-time calendar updates.",
          },
          {
            tier: "Advanced",
            include:
              "Full workflow automation (e.g., payment-on-booking), recurring reservations, customer dashboard, and analytics integration.",
          },
        ],
      },
      {
        feature: "Admin Panel",
        explanation: "Your all-in-one dashboard to publish, manage, and analyze—powered by Directus.",
        tiers: [
          {
            tier: "Basic",
            include: "Visual dashboard for managing pages, media, and core content. Standard user access.",
          },
          { tier: "Standard", include: "Modules for orders, bookings, product management, and basic analytics." },
          {
            tier: "Advanced",
            include:
              "Customizable roles and permissions, workflow automations, API/webhook integrations, and advanced analytics.",
          },
        ],
      },
    ],
  },
  {
    group: "Growth & Communication",
    icon: <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
    description: "Tools to engage visitors and grow your audience",
    features: [
      {
        feature: "Testimonials/Reviews",
        explanation: "Build trust with real customer feedback.",
        tiers: [
          { tier: "Basic", include: "Site admin displays and updates a fixed set of customer quotes or reviews." },
          { tier: "Standard", include: "User reviews/ratings, slider or carousel display, moderation by admin." },
          { tier: "Advanced", include: "End-users submit reviews onsite, advanced moderation and filtering support." },
        ],
      },
      {
        feature: "Newsletter Signup",
        explanation: "Grow your audience and nurture leads for email marketing.",
        tiers: [
          { tier: "Basic", include: "Single-field email capture with manual export/download option." },
          { tier: "Standard", include: "Automated integration with newsletter platforms, segmentation support." },
          {
            tier: "Advanced",
            include: "Double opt-in flows, analytics, and personalized subscription management for visitors.",
          },
        ],
      },
      {
        feature: "Live Chat/Chatbot",
        explanation: "Connect with visitors instantly—live or automated.",
        tiers: [
          { tier: "Basic", include: "Operator chat box for direct messaging during set business hours." },
          { tier: "Standard", include: "Automated chat assistance (scripts or basic AI), FAQ handling." },
          { tier: "Advanced", include: "AI-powered (GPT-class) chat, custom knowledge integration, 24/7 response." },
        ],
      },
      {
        feature: "Blog/Content Module",
        explanation: "Share updates, resources, and articles for SEO and authority.",
        tiers: [
          { tier: "Basic", include: "Admin-published articles with a simple editor and basic categories/tags." },
          { tier: "Standard", include: "Rich media content, SEO formatting, author profiles, and scheduling." },
          { tier: "Advanced", include: "User submissions, commenting, multimedia, and advanced publishing workflows." },
        ],
      },
      {
        feature: "Multilingual Support",
        explanation: "Make your content available in multiple languages.",
        tiers: [
          { tier: "Basic", include: "Supports one additional language; users enter all content manually." },
          { tier: "Standard", include: "Three language support, language-picker UI, content in multiple languages." },
          {
            tier: "Advanced",
            include: "Automated translation tools, unlimited languages, and CMS-driven content management.",
          },
        ],
      },
    ],
  },
  {
    group: "Backend & Integrations",
    icon: <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />,
    description: "Technical infrastructure and third-party connections",
    features: [
      {
        feature: "Supabase/Firebase Backend",
        explanation: "Fast, modern backends for app-like experiences.",
        tiers: [
          { tier: "Basic", include: "User auth, basic data storage, and real-time updates." },
          { tier: "Standard", include: "Custom data models, file storage, and serverless functions." },
          { tier: "Advanced", include: "Role permissions, advanced triggers, API integrations." },
        ],
      },
      {
        feature: "Custom Backend/API",
        explanation: "Tailored data & integration for your unique needs.",
        tiers: [
          { tier: "Basic", include: "Simple CRUD endpoints, connection for data display or collection." },
          { tier: "Standard", include: "Secure authentication, role-based APIs, and business automation logic." },
          {
            tier: "Advanced",
            include: "Complex, scalable APIs, real-time callbacks, third-party integration support.",
          },
        ],
      },
      {
        feature: "Analytics Dashboard",
        explanation: "Visualize site visits and user behavior data.",
        tiers: [
          { tier: "Basic", include: "Google Analytics embed, page traffic, basic engagement stats." },
          { tier: "Standard", include: "Custom events, conversion funnel tracking, dashboard visualizations." },
          { tier: "Advanced", include: "Real-time metrics, advanced segmenting, and export features." },
        ],
      },
      {
        feature: "Performance Optimization",
        explanation: "Make your site load and run at its absolute best.",
        tiers: [
          { tier: "Basic", include: "Lazy image loading, asset minification, and gzip compression." },
          { tier: "Standard", include: "Code splitting, CDN integration, advanced caching." },
          { tier: "Advanced", include: "In-depth audits, custom runtime tuning, uptime/load monitoring." },
        ],
      },
    ],
  },
  {
    group: "After-Launch Support",
    icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />,
    description: "Ongoing maintenance and optimization services",
    features: [
      {
        feature: "Maintenance & Support",
        explanation: "Keep your site healthy with ongoing support.",
        tiers: [
          { tier: "Basic", include: "Occasional support via email, minor bug fixes, basic uptime monitoring." },
          { tier: "Standard", include: "Regular content updates, troubleshooting, and system health checks." },
          { tier: "Advanced", include: "Priority help, proactive monitoring, and upgrade management." },
        ],
      },
      {
        feature: "SEO Optimization",
        explanation: "Set your site up for ongoing search success.",
        tiers: [
          { tier: "Basic", include: "Snapshot SEO review (titles, tags, crawl), basic improvement suggestions." },
          {
            tier: "Standard",
            include: "Social previews, enhanced metadata, performance tuning, and competitor insight.",
          },
          {
            tier: "Advanced",
            include: "Full-site technical audit, deep analysis, search ranking tracking, and actionable plan.",
          },
        ],
      },
      {
        feature: "Custom Add-ons (AI, 3D, etc.)",
        explanation: "Future-ready extras like AI chatbots or interactive 3D.",
        tiers: [
          { tier: "Basic", include: "Simple add-on (e.g., animated widget or basic AI bot for FAQs)" },
          { tier: "Standard", include: "Trained AI assistant or interactive 3D product/scene." },
          {
            tier: "Advanced",
            include: "Deeply integrated AI, business automation, or fully custom 3D/AR/VR features.",
          },
        ],
      },
    ],
  },
];
