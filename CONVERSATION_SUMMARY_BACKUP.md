

# Platform Static Data Catalog

Platform: 404studios Website  
Repository root: /  
Date generated: 2025-08-28  
Commit SHA: n/a

## Table of contents

- discovery notes
- seo structured data (schema.org)
  - organization schema
  - local business schema
  - faq schema
  - breadcrumb schemas
- route metadata (next.js metadata api)
  - features page metadata
  - pricing page metadata
  - services page metadata
  - contact page metadata
  - packages page metadata
- pricing catalog
  - pricingData (feature groups, tiers, prices)
  - businessTypes (default presets per business)
- services catalog
  - servicesData (individual services)
  - servicesSchema (structured data helper)
- features catalog (marketing feature groups)
- contact options, form presets, and time slots
- home page marketing blocks
- sitemap and robots
  - sitemap entries
  - robots rules
- pwa web app manifest
- design tokens and theme config
  - global css tokens and utilities
  - tailwind config
- build/tooling configs (static)
  - components.json (shadcn/ui)
  - next.config.mjs (headers, images, webpack)
- configuration schema and defaults (env-sampled)
- global appendix
  - index by file path
  - glossary of recurring fields
  - lint/validation rules and scripts

---

## Discovery notes

- This repository is a single Next.js app using the App Router. Static data lives primarily under:
  - src/features/**/data
  - src/shared/data
  - app/** (route metadata, sitemap, robots, manifest)
  - Styling/config: app/globals.css, tailwind.config.ts, components.json, next.config.mjs
- Some structured data helpers (e.g., organizationSchema) exist but may be partially unused; consumers are documented with reconcile notes where applicable. [src/shared/data/*]

---

## SEO structured data (schema.org)

### Organization schema

- Purpose: Organization-level schema for brand/identity rich results.
- Stability: extended
- Source of truth
  - Export: organizationSchema (default named export) [src/shared/data/organizationSchema.ts]
- Structure
  - Object with keys: "@context": string, "@type": "Organization", name: string, alternateName: string[], description: string, url: string, logo: { @type, url, width, height }, image: string[], founder: Array<{ @type: "Person", name, email }>, foundingDate: string, address: PostalAddress, contactPoint: ContactPoint[], sameAs: string[], serviceArea: GeoCircle, areaServed: Country[], knowsAbout: string[], hasOfferCatalog: OfferCatalog
  - Required: "@context", "@type", name, url
  - Enums: @type fixed values (Organization, Person, etc.)
  - Example
    - { "@type": "Organization", "name": "404studios", "url": "https://404studios.com", "contactPoint": [{ "@type": "ContactPoint", "telephone": "+91-7845890089", "contactType": "customer service" }] } [src/shared/data/organizationSchema.ts]
- Consumers and mapping
  - Intended for injection into home page JSON-LD; current home page defines a local organization schema inline (not from this module). Reconcile: consider centralizing usage to this file. [app/page.tsx]
- Validation and generation
  - Covered by general SEO validation approach; see validate-seo script for other schema files. [scripts/validate-seo.js]
- Change management
  - Keep keys as per schema.org. If adding fields, ensure values are serializable and supported by Google Rich Results. Update any JSON-LD injection sites accordingly. [src/shared/data/organizationSchema.ts], [app/page.tsx]

### Local business schema

- Purpose: Local business/ProfessionalService schema for local SEO. 
- Stability: core
- Source of truth
  - Export: localBusinessSchema [src/shared/data/localBusinessSchema.ts]
- Structure
  - Keys: "@context": string, "@type": "ProfessionalService", name: string, alternateName: string, description: string, url: string, logo: string, image: string[], telephone: string, email: string, address: PostalAddress, geo: GeoCoordinates, openingHoursSpecification: OpeningHoursSpecification[], sameAs: string[], priceRange: string, paymentAccepted: string[], currenciesAccepted: string, serviceArea: Place, areaServed: string, hasOfferCatalog: OfferCatalog, aggregateRating: AggregateRating
  - Required: "@context", "@type", name, url
  - Example
    - { "@type": "ProfessionalService", "name": "404studios", "url": "https://404studios.com", "priceRange": "$5000-$50000" } [src/shared/data/localBusinessSchema.ts]
- Consumers and mapping
  - Imported and injected as JSON-LD on home page. [app/page.tsx]
- Validation and generation
  - Checked by SEO validation script (structured data presence). [scripts/validate-seo.js]
- Change management
  - Maintain schema.org compliance. Ensure fields reflect real business contact/location and are consistent with on-page content. [src/shared/data/localBusinessSchema.ts], [app/page.tsx]

### FAQ schema

- Purpose: FAQPage schema for common questions rich results.
- Stability: core
- Source of truth
  - Export: faqSchema [src/shared/data/faqSchema.ts]
- Structure
  - Keys: "@context": string, "@type": "FAQPage", mainEntity: Question[]
  - Question: { "@type": "Question", name: string, acceptedAnswer: { "@type": "Answer", text: string } }
  - Example
    - { "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "How much does a custom website cost?", "acceptedAnswer": { "@type": "Answer", "text": "..." } }]} [src/shared/data/faqSchema.ts]
- Consumers and mapping
  - Imported and injected as JSON-LD on home page to enhance FAQ rich results. [app/page.tsx]
- Validation and generation
  - Checked via validate-seo. Keep content consistent with visible FAQ if present. [scripts/validate-seo.js]
- Change management
  - Add/remove Q&A entries with clear, non-promotional answers. Validate JSON-LD after changes. [src/shared/data/faqSchema.ts]

### Breadcrumb schemas

- Purpose: BreadcrumbList schema for key sections to improve SERP breadcrumbs.
- Stability: core
- Source of truth
  - Export: breadcrumbSchemas with keys: home, pricing, features, packages, services, contact [src/shared/data/breadcrumbSchemas.ts]
- Structure
  - Each key maps to { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: ListItem[] }
  - ListItem: { "@type": "ListItem", position: number, name: string, item: string }
  - Example
    - breadcrumbSchemas.pricing.itemListElement = [{ position: 1, name: "Home", item: "https://404studios.com" }, { position: 2, name: "Pricing Calculator", item: "https://404studios.com/pricing" }] [src/shared/data/breadcrumbSchemas.ts]
- Consumers and mapping
  - Imported into pricing page for JSON-LD injection alongside page-specific schema. [app/pricing/page.tsx]
  - Imported on home page for use with combined schemas. [app/page.tsx]
- Validation and generation
  - Covered by validate-seo structured data check. [scripts/validate-seo.js]
- Change management
  - When adding new pages, create a new breadcrumb map with correct positions and URLs. [src/shared/data/breadcrumbSchemas.ts]

---

## Route metadata (Next.js Metadata API)

> Next.js consumes these static exports automatically for each route during build. No manual import is required.

### Features page metadata

- Purpose: SEO metadata for /features route.
- Stability: core
- Source of truth
  - Export: metadata (Next.js Metadata) [app/features/metadata.ts]
- Structure
  - Keys: title: string, description: string, keywords: string[], openGraph: { title, description, url, type, images[] }, twitter: { card, title, description, images[] }
  - Example
    - { title: "Features & Tiers - Complete Development Services Guide", openGraph: { images: [{ url: "/features-og-image.jpg", width: 1200, height: 630 }] } } [app/features/metadata.ts]
- Consumers and mapping
  - Consumed by Next.js to generate meta tags and OG/Twitter cards for /features. [app/features/metadata.ts]
- Change management
  - Keep title/description aligned with page content; host OG images under /public. [app/features/metadata.ts]

### Pricing page metadata

- Purpose: SEO metadata for /pricing route.
- Stability: core
- Source of truth
  - Export: metadata [app/pricing/metadata.ts]
- Structure
  - Same shape as above; includes /pricing-specific titles and images. [app/pricing/metadata.ts]
- Consumers and mapping
  - Used by Next.js for SEO tags on /pricing. [app/pricing/metadata.ts]
- Change management
  - Align with pricing calculator content; update image paths as needed. [app/pricing/metadata.ts]

### Services page metadata

- Purpose: SEO metadata for /services route.
- Stability: core
- Source of truth
  - Export: metadata [app/services/metadata.ts]
- Structure/Consumers/Change management
  - Same as above, targeted to /services. [app/services/metadata.ts]

### Contact page metadata

- Purpose: SEO metadata for /contact route.
- Stability: core
- Source of truth
  - Export: metadata [app/contact/metadata.ts]
- Structure/Consumers/Change management
  - Same as above, targeted to /contact. [app/contact/metadata.ts]

### Packages page metadata

- Purpose: SEO metadata for /packages route.
- Stability: core
- Source of truth
  - Export: metadata [app/packages/metadata.ts]
- Structure/Consumers/Change management
  - Same as above, targeted to /packages. [app/packages/metadata.ts]

---

## Pricing catalog

### pricingData (feature groups, tiers, prices)

- Purpose: Full pricing model for features grouped by domain with tiered pricing.
- Stability: core
- Source of truth
  - Export: pricingData: PricingData (typed) [src/features/pricing/data/pricingData.ts]
  - Types: PricingTier, PricingFeature, PricingGroup, PricingData [src/features/pricing/types/pricing.types.ts]
- Structure
  - PricingData = PricingGroup[]
  - PricingGroup: { group: string, features: PricingFeature[] }
  - PricingFeature: { feature: string, desc: string, tiers: PricingTier[], isCountable: boolean, minCount?: number }
  - PricingTier: { name: "Basic" | "Standard" | "Advanced", desc: string, price: number }
  - Example (truncated)
    - { group: "Core Website Features", features: [{ feature: "Static Page", tiers: [{ name: "Basic", price: 1600 }, ...], isCountable: true, minCount: 1 }] } [src/features/pricing/data/pricingData.ts]
- Consumers and mapping
  - Pricing calculator hook uses it to compute selections/prices. [src/features/pricing/hooks/usePricingCalculator.ts]
  - Pricing page renders groups, tiers, and totals. [app/pricing/page.tsx]
  - Service wrapper exposes static data for potential reuse. [src/lib/services/pricing.service.ts]
- Render logic notes
  - Countable features ("Static Page", "Dynamic Page") multiply tier price by count; names editable in UI. [app/pricing/page.tsx]
- Validation and generation
  - Types enforce structure; no generator. [src/features/pricing/types/pricing.types.ts]
- Change management
  - Add features within groups; keep tier names consistent with union type. Update UI texts and any tests if changing feature keys. [src/features/pricing/data/pricingData.ts], [src/features/pricing/types/pricing.types.ts], [app/pricing/page.tsx]

### businessTypes (default presets per business)

- Purpose: Opinionated presets: base price, timelines, default page counts and feature defaults by business type.
- Stability: core
- Source of truth
  - Export: businessTypes: Record<BusinessType, BusinessConfiguration> [src/features/pricing/data/businessTypes.ts]
  - Types: BusinessType union; BusinessConfiguration; PageConfig [src/features/pricing/types/pricing.types.ts]
- Structure
  - Key (BusinessType) → { name: string, description: string, basePrice: number, timeline: string, defaultPages: { static: { count, names[] }, dynamic: { count, names[] } }, defaults: Record<feature, "Basic"|"Standard"|"Advanced"> }
  - Example
    - businessTypes.ecommerce = { basePrice: 34000, defaultPages: { dynamic: { count: 3, names: ["Products", "Product Detail", "Cart"] } }, defaults: { "Cart & Checkout": "Standard" } } [src/features/pricing/data/businessTypes.ts]
- Consumers and mapping
  - Used by pricing page to prefill selections and headline numbers. [app/pricing/page.tsx]
  - Used in calculator logic to read defaults. [src/features/pricing/hooks/usePricingCalculator.ts]
  - Exposed via service wrapper. [src/lib/services/pricing.service.ts]
- Change management
  - Keep feature keys aligned with pricingData.feature names. Update calculators and UI labels if renaming keys. [src/features/pricing/data/businessTypes.ts], [src/features/pricing/data/pricingData.ts]

---

## Services catalog

### servicesData (individual services)

- Purpose: Marketable list of standalone services with categories and price ranges.
- Stability: core
- Source of truth
  - Export: servicesData: ServicesData [src/features/services/data/servicesData.tsx]
  - Types: Service, ServicesData, ServicePrice [src/features/services/types/services.types.ts]
- Structure
  - { services: Array<{ id: string, name: string, description: string, price: { min: number, max: number }, category: "frontend"|"backend"|"mobile"|string, icon: ReactNode, demoUrl?: string }> }
  - Example
    - { id: "api-development", name: "API Development", price: { min: 25000, max: 75000 }, category: "backend" } [src/features/services/data/servicesData.tsx]
- Consumers and mapping
  - Hook provides filtering/selection logic. [src/features/services/hooks/useServicesManager.ts]
  - Services page renders tabs and grid from this dataset. [app/services/page.tsx]
- Change management
  - Keep ids stable for selection state. Categories drive tabs; ensure category consistency. [src/features/services/data/servicesData.tsx]

### servicesSchema (structured data helper)

- Purpose: Schema.org Service catalog for SEO (not currently injected on services page).
- Stability: extended
- Source of truth
  - Export: servicesSchema [src/features/services/data/servicesData.tsx]
- Consumers and mapping
  - Not directly imported by /services page; consider injecting as JSON-LD for richer results. [app/services/page.tsx]
- Change management
  - Keep aligned with visible services; optional enhancement. [src/features/services/data/servicesData.tsx]

---

## Features catalog (marketing feature groups)

- Purpose: Marketing-friendly feature catalog separate from pricing mechanics (narrative + tiers content).
- Stability: extended
- Source of truth
  - Export: featureCatalogData: FeatureCatalog [src/features/features-catalog/data/featureCatalogData.tsx]
  - Types: FeatureTier, Feature, FeatureGroup, FeatureCatalog [src/features/features-catalog/types/features.types.ts]
- Structure
  - FeatureCatalog = FeatureGroup[]
  - FeatureGroup: { group: string, icon: ReactNode, description: string, features: Feature[] }
  - Feature: { feature: string, explanation: string, tiers: Array<{ tier: "Basic"|"Standard"|"Advanced", include: string }> }
  - Example
    - { group: "Core Website Features", features: [{ feature: "Static Page", tiers: [{ tier: "Basic", include: "..." }] }] } [src/features/features-catalog/data/featureCatalogData.tsx]
- Consumers and mapping
  - Hook exposes data to page. [src/features/features-catalog/hooks/useFeaturesCatalog.ts]
  - /features route renders collapsible cards and tier cards. [app/features/page.tsx]
- Change management
  - Keep narrative aligned with pricingData tiers; this dataset is descriptive. [src/features/features-catalog/data/featureCatalogData.tsx]

---

## Contact options, form presets, and time slots

- Purpose: Centralized options and presets for contact UI and quote form.
- Stability: core
- Source of truth
  - Exports: contactInfo: ContactInfo[], availableTimeSlots: TimeSlot[], projectTypes, budgetRanges, timelineOptions, packageOptions (option arrays) [src/features/contact/data/contactData.ts]
  - Types: ContactFormData, TimeSlot, ContactInfo, FormStep [src/features/contact/types/contact.types.ts]
- Structure
  - contactInfo: Array<{ type: "email"|"phone"|"location"|"hours", label: string, value: string|string[], icon: string, color: "cyan"|"purple"|"pink"|string }>
  - availableTimeSlots: TimeSlot[] with { id: string, date: string, time: string }
  - Option lists: Array<{ value: string, label: string }>
  - Example
    - budgetRanges = [{ value: "5k-10k", label: "₹5,000 - ₹10,000" }, ...] [src/features/contact/data/contactData.ts]
- Consumers and mapping
  - Re-exported and used by contact form hook. [src/features/contact/index.ts], [src/features/contact/hooks/useContactForm.ts]
  - Contact route renders contact info cards and select options. [app/contact/page.tsx]
- Change management
  - Update option values/labels with care; values are persisted in form state. Keep availableTimeSlots timely/realistic. [src/features/contact/data/contactData.ts]

---

## Home page marketing blocks

- Purpose: Static marketing content for packages/features/process steps on home page.
- Stability: extended
- Source of truth
  - Export: homeData: HomeData [src/features/home/data/homeData.tsx]
  - Types: Package, Feature, ProcessStep, HomeData [src/features/home/types/home.types.ts]
- Structure
  - { packages: Array<{ name, description, price, icon }>, features: Array<{ icon, title, description }>, processSteps: Array<{ title, description, duration, icon }> }
  - Example
    - { packages: [{ name: "Portfolio Package", price: "₹8,000 - ₹12,000" }], features: [{ title: "Clean Code" }], processSteps: [{ title: "Discovery", duration: "1-2 days" }] } [src/features/home/data/homeData.tsx]
- Consumers and mapping
  - Hook returns dataset; Home page may consume via hook (pattern in useHomeData). [src/features/home/hooks/useHomeData.ts]
  - Home page additionally injects structured data from shared schema files. [app/page.tsx]
- Change management
  - Keep prices/messages consistent with services/pricing areas. Icons are ReactNodes; ensure import availability. [src/features/home/data/homeData.tsx]

---

## Sitemap and robots

### Sitemap entries

- Purpose: Build-time sitemap entries for primary routes.
- Stability: core
- Source of truth
  - Default export: function returning MetadataRoute.Sitemap with entries for root, pricing, features, packages, services, contact. [app/sitemap.ts]
- Structure
  - Array<{ url: string, lastModified: Date, changeFrequency: "monthly"|"weekly"|"yearly", priority: number }>
  - Example
    - { url: "https://404studios.com/pricing", changeFrequency: "weekly", priority: 0.9 } [app/sitemap.ts]
- Consumers and mapping
  - Consumed by Next.js to generate /sitemap.xml. [app/sitemap.ts]
- Change management
  - Add new pages as needed; keep frequencies/priorities reasonable. [app/sitemap.ts]

### Robots rules

- Purpose: Robots policy and sitemap/host definitions.
- Stability: core
- Source of truth
  - Default export: MetadataRoute.Robots with allow/disallow rules and sitemap/host. [app/robots.ts]
- Structure
  - { rules: Array<{ userAgent: string, allow: string, disallow: string[] }>, sitemap: string, host: string }
  - Example
    - { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/_next/"] }], sitemap: "https://404studios.com/sitemap.xml" } [app/robots.ts]
- Consumers and mapping
  - Builds into /robots.txt. [app/robots.ts]
- Change management
  - Ensure API and admin paths remain disallowed if appropriate; update host if domain changes. [app/robots.ts]

---

## PWA web app manifest

- Purpose: PWA identity and icons.
- Stability: core
- Source of truth
  - Default export: MetadataRoute.Manifest [app/manifest.ts]
- Structure
  - { name, short_name, description, start_url, display, background_color, theme_color, icons: Array<{ src, sizes, type }>, categories: string[], lang, dir }
  - Example
    - { name: "404studios - Futuristic Web Development", icons: [{ src: "/favicon.svg", type: "image/svg+xml" }] } [app/manifest.ts]
- Consumers and mapping
  - Used by Next.js to generate /manifest.webmanifest. [app/manifest.ts]
- Change management
  - Place icon assets under /public; keep categories and branding consistent. [app/manifest.ts], [public/*]

---

## Design tokens and theme config

### Global CSS tokens and utilities

- Purpose: CSS custom properties for colors, charts, radii; performance-oriented utilities and animations.
- Stability: core
- Source of truth
  - CSS variables under @layer base :root and .dark; animation keyframes; utility classes. [app/globals.css]
- Structure
  - Tokens: --background, --foreground, --card, --primary, --chart-1..5, --radius, etc. as HSL values
  - Utilities: .gpu-accelerated, .smooth-scroll, .animate-*, .glass-effect, scrollbar styles, etc.
  - Example
    - :root { --background: 0 0% 100%; --foreground: 222.2 84% 4.9%; --radius: 0.5rem; } [.dark overrides present] [app/globals.css]
- Consumers and mapping
  - Used globally by Tailwind theme mappings and component styles. [app/globals.css], [tailwind.config.ts]
- Change management
  - Update variables cautiously; Tailwind config maps to these tokens. Validate contrast and dark mode variants after changes. [app/globals.css]

### Tailwind config

- Purpose: Tailwind theme extensions mapping CSS variables to semantic tokens; content globs; plugins.
- Stability: core
- Source of truth
  - Default export: Tailwind Config [tailwind.config.ts]
- Structure
  - content globs: ./pages, ./components, ./app, root patterns
  - theme.extend.colors: background, foreground, card, popover, primary, etc. mapping to var(--*)
  - borderRadius, keyframes for accordion, animations, plugin tailwindcss-animate
  - Example
    - theme.extend.colors.primary.DEFAULT = "hsl(var(--primary))" [tailwind.config.ts]
- Consumers and mapping
  - Consumed at build by Tailwind; variables sourced from globals.css. [tailwind.config.ts], [app/globals.css]
- Change management
  - Keep variable names in sync with globals.css. Adjust content globs if files move. [tailwind.config.ts]

---

## Build/tooling configs (static)

### components.json (shadcn/ui)

- Purpose: shadcn/ui generator configuration and path aliases.
- Stability: core
- Source of truth
  - JSON with $schema, style, rsc, tsx, tailwind paths, aliases (components/utils/ui/lib/hooks), iconLibrary. [components.json]
- Consumers and mapping
  - Used by shadcn/ui tooling to scaffold UI components; does not affect runtime. [components.json]
- Change management
  - Adjust aliases to match project structure if moved; keep tailwind paths correct. [components.json]

### next.config.mjs (headers, images, webpack)

- Purpose: Next.js build-time configuration for headers/security, image settings, and webpack adjustments.
- Stability: core
- Source of truth
  - NextConfig default export with:
    - Security headers (HSTS, X-Frame-Options, CSP), referrer policy, permissions policy
    - images settings (formats, sizes, domains)
    - webpack: hash function, module resolution, fallbacks, optimizations
  - [next.config.mjs]
- Structure
  - async headers(): returns array of { source, headers: Array<{ key, value }> }
  - images: { formats, deviceSizes, imageSizes, minimumCacheTTL, dangerouslyAllowSVG, contentSecurityPolicy, domains }
  - webpack(config, ctx): mutates output.hashFunction, resolve.modules, optimization flags, resolve.alias/fallback
- Consumers and mapping
  - Applied by Next.js at build/runtime; headers affect all routes. [next.config.mjs]
- Change management
  - Test CSP changes carefully; ensure domains list matches actual image sources. Keep PNPM/webpack compatibility tweaks if relevant. [next.config.mjs]

---

## Configuration schema and defaults (env-sampled)

- Purpose: Central configuration schema with safe defaults derived from environment variables.
- Stability: extended
- Source of truth
  - Exports: config (object), validateConfig(): string[], isDevelopment/isProduction/isStaging, features, clientConfig [lib/config.ts]
- Structure
  - Config sections: app, analytics, api, security, rateLimit, logging, monitoring, email, features
  - Types (inline): string, number, boolean; union for logging.level; environment: 'development'|'production'|'staging'
  - Defaults: Many fields have development-safe defaults (e.g., csrfSecret: 'dev-csrf-secret')
  - Example
    - config.api = { baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000', contactEndpoint: '/api/contact' } [lib/config.ts]
- Consumers and mapping
  - Intended as a single source for runtime config; no direct consumer identified in scanned pages; likely consumed by server/lib modules. [lib/config.ts]
- Validation and generation
  - validateConfig enforces production requirements (HTTPS app URL, secrets set). [lib/config.ts]
- Change management
  - Add new config under appropriate section; keep clientConfig safe (no secrets). Update any env docs and CI secrets. [lib/config.ts]

---

## Global appendix

### Index by file path

- metadata.ts — Route metadata (/contact) [app/contact/metadata.ts]
- metadata.ts — Route metadata (/features) [app/features/metadata.ts]
- metadata.ts — Route metadata (/packages) [app/packages/metadata.ts]
- metadata.ts — Route metadata (/pricing) [app/pricing/metadata.ts]
- metadata.ts — Route metadata (/services) [app/services/metadata.ts]
- manifest.ts — Web app manifest generator [app/manifest.ts]
- robots.ts — Robots.txt generator [app/robots.ts]
- sitemap.ts — Sitemap generator [app/sitemap.ts]
- globals.css — Global CSS tokens/utilities [app/globals.css]
- components.json — shadcn/ui config [components.json]
- config.ts — Configuration schema and defaults [lib/config.ts]
- next.config.mjs — Next.js config (headers/images/webpack) [next.config.mjs]
- contactData.ts — Contact presets/options/time slots [src/features/contact/data/contactData.ts]
- contact.types.ts — Contact types [src/features/contact/types/contact.types.ts]
- featureCatalogData.tsx — Marketing features catalog [src/features/features-catalog/data/featureCatalogData.tsx]
- useFeaturesCatalog.ts — Consumer hook [src/features/features-catalog/hooks/useFeaturesCatalog.ts]
- features.types.ts — Feature catalog types [src/features/features-catalog/types/features.types.ts]
- homeData.tsx — Home marketing content [src/features/home/data/homeData.tsx]
- useHomeData.ts — Consumer hook [src/features/home/hooks/useHomeData.ts]
- home.types.ts — Home types [src/features/home/types/home.types.ts]
- businessTypes.ts — Pricing presets [src/features/pricing/data/businessTypes.ts]
- pricingData.ts — Pricing model [src/features/pricing/data/pricingData.ts]
- usePricingCalculator.ts — Pricing consumer logic [src/features/pricing/hooks/usePricingCalculator.ts]
- pricing.types.ts — Pricing types [src/features/pricing/types/pricing.types.ts]
- servicesData.tsx — Services catalog and servicesSchema [src/features/services/data/servicesData.tsx]
- useServicesManager.ts — Services consumer logic [src/features/services/hooks/useServicesManager.ts]
- services.types.ts — Services types [src/features/services/types/services.types.ts]
- pricing.service.ts — Service wrapper (pricing data) [src/lib/services/pricing.service.ts]
- breadcrumbSchemas.ts — Breadcrumb structured data [src/shared/data/breadcrumbSchemas.ts]
- faqSchema.ts — FAQ structured data [src/shared/data/faqSchema.ts]
- localBusinessSchema.ts — Local business structured data [src/shared/data/localBusinessSchema.ts]
- organizationSchema.ts — Organization structured data [src/shared/data/organizationSchema.ts]
- validate-seo.js — SEO validation script [scripts/validate-seo.js]
- page.tsx — Consumer of featureCatalog [app/features/page.tsx]
- page.tsx — Consumer of pricingData/businessTypes/breadcrumbSchemas [app/pricing/page.tsx]
- page.tsx — Consumer of services via hook [app/services/page.tsx]
- page.tsx — Consumer of contact options via hook [app/contact/page.tsx]
- page.tsx — Home page; injects faq/localBusiness/breadcrumb schemas [app/page.tsx]

### Glossary of recurring fields

- id (string): Stable programmatic identifier used for selection/state. [src/features/services/data/servicesData.tsx]
- name/title (string): Display title. [src/features/pricing/data/pricingData.ts], [src/features/services/data/servicesData.tsx]
- description/desc/explanation (string): Human-readable description. [src/features/pricing/data/pricingData.ts]
- group (string): Logical grouping of related features/services. [src/features/pricing/data/pricingData.ts]
- tier (enum): "Basic" | "Standard" | "Advanced" — qualitative service levels. [src/features/pricing/types/pricing.types.ts], [src/features/features-catalog/types/features.types.ts]
- price/priceRange (number|string): Numeric cost or string range for marketing. [src/features/pricing/data/pricingData.ts], [src/features/services/data/servicesData.tsx], [src/features/home/data/homeData.tsx]
- category (string): Functional grouping for services (frontend/backend/mobile). [src/features/services/data/servicesData.tsx]
- icon (ReactNode): Visual icon element rendered in UI; not serializable. [src/features/services/data/servicesData.tsx]
- url (string): Absolute page URL (sitemap, OG, breadcrumb). [app/sitemap.ts], [app/**/metadata.ts], [src/shared/data/breadcrumbSchemas.ts]
- "@context"/"@type" (string): JSON-LD markers for schema.org. [src/shared/data/*]

### Lint/validation rules and scripts

- SEO validation script
  - Purpose: Checks presence of build outputs and structured data source files (sitemap, robots, manifest; FAQ, LocalBusiness, Breadcrumbs).
  - Run
    - PowerShell (Windows):
      ```powershell
      node validate-seo.js
      ```
  - Sources checked: 'src/shared/data/faqSchema.ts', 'src/shared/data/localBusinessSchema.ts', 'src/shared/data/breadcrumbSchemas.ts' [scripts/validate-seo.js]
- Type safety
  - Pricing/services/features/contact/home datasets are typed with .ts definitions to validate structure at build time. [src/features/**/types/*.ts]
- Next.js metadata
  - Next picks up app/**metadata.ts automatically; validate via build. [app/**/metadata.ts]

--- 

End of catalog.