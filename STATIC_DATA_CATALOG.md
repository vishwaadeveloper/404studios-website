# Platform Static Data Catalog

This catalog documents all platform static data, including schemas, examples, consumers, validations, and change guidance. Compiled from repository analysis on 2025-08-28.

## 1. Pricing Datasets

### pricingData.ts
- **Location**: `src/features/pricing/data/pricingData.ts`
- **Purpose**: Core pricing model for feature groups and tiers.
- **Schema**: Typed array of groups/features/tiers with countable flags (e.g., "Static Page", "Dynamic Page").
- **Example**:
  ```typescript
  export const pricingData: PricingData = [
    {
      group: "Website Development",
      features: [
        {
          name: "Static Page",
          tiers: [
            { name: "Basic", price: 500, description: "..." },
            // ...
          ]
        },
        // ...
      ]
    },
    // ...
  ];
  ```
- **Consumers**:
  - `app/pricing/page.tsx`
  - `src/features/pricing/hooks/usePricingCalculator.ts`
  - `src/lib/services/pricing.service.ts`
- **Change Guidance**: Update types in `src/features/pricing/types/pricing.types.ts`; test pricing calculator hook; rebuild and verify pricing page.

### businessTypes.ts
- **Location**: `src/features/pricing/data/businessTypes.ts`
- **Purpose**: Business presets with defaults and page counts.
- **Schema**: Record keyed by BusinessType with defaults and page counts/names.
- **Example**:
  ```typescript
  export const businessTypes: Record<BusinessType, BusinessPreset> = {
    startup: {
      defaultPages: 5,
      pageNames: ["Home", "About", "Services", "Contact"],
      // ...
    },
    // ...
  };
  ```
- **Consumers**:
  - `app/pricing/page.tsx`
  - `src/features/pricing/hooks/usePricingCalculator.ts`
- **Change Guidance**: Update `pricing.types.ts`; ensure presets align with pricingData; test hook integration.

## 2. Services Datasets

### servicesData.tsx
- **Location**: `src/features/services/data/servicesData.tsx`
- **Purpose**: Services list and servicesSchema.
- **Schema**: Array of services with id, name, category, price ranges; includes servicesSchema for structured data.
- **Example**:
  ```typescript
  export const servicesData: Service[] = [
    {
      id: "web-dev",
      name: "Web Development",
      category: "Development",
      priceRange: "$1,000 - $5,000",
      // ...
    },
    // ...
  ];

  export const servicesSchema = {
    "@type": "Service",
    // ...
  };
  ```
- **Consumers**:
  - `src/features/services/hooks/useServicesManager.ts`
  - `app/services/page.tsx`
- **Change Guidance**: Update `services.types.ts`; inject servicesSchema on /services page for SEO; test services page.

## 3. Features Catalog Datasets

### featureCatalogData.tsx
- **Location**: `src/features/features-catalog/data/featureCatalogData.tsx`
- **Purpose**: Narrative feature catalog.
- **Schema**: Grouped features with tier descriptions.
- **Example**:
  ```typescript
  export const featureCatalogData: FeatureGroup[] = [
    {
      group: "Core Features",
      features: [
        {
          name: "Responsive Design",
          tiers: ["Basic", "Pro", "Enterprise"],
          // ...
        },
        // ...
      ]
    },
    // ...
  ];
  ```
- **Consumers**:
  - `src/features/features-catalog/hooks/useFeaturesCatalog.ts`
  - `app/features/page.tsx`
- **Change Guidance**: Update `features.types.ts`; test hook and page rendering.

## 4. Contact Datasets

### contactData.ts
- **Location**: `src/features/contact/data/contactData.ts`
- **Purpose**: Contact info, time slots, and option lists.
- **Schema**: Arrays for contactInfo, availableTimeSlots, and various option lists.
- **Example**:
  ```typescript
  export const contactInfo = {
    email: "contact@404studios.com",
    // ...
  };

  export const availableTimeSlots = ["9:00 AM", "10:00 AM", ...];

  export const budgetOptions = ["Under $5K", "$5K-$10K", ...];
  ```
- **Consumers**:
  - `src/features/contact/hooks/useContactForm.ts`
  - `app/contact/page.tsx`
- **Change Guidance**: Update `contact.types.ts`; test multi-step form integration.

## 5. Home Datasets

### homeData.tsx
- **Location**: `src/features/home/data/homeData.tsx`
- **Purpose**: Packages, features, and process steps content.
- **Schema**: Arrays/objects for packages, features, processSteps.
- **Example**:
  ```typescript
  export const homeData = {
    packages: [...],
    features: [...],
    processSteps: [...]
  };
  ```
- **Consumers**:
  - `src/features/home/hooks/useHomeData.ts`
  - `app/page.tsx` (home page)
- **Change Guidance**: Update `home.types.ts`; test home page rendering.

## 6. SEO Schemas

### organizationSchema.ts
- **Location**: `src/shared/data/organizationSchema.ts`
- **Purpose**: Schema.org Organization JSON-LD.
- **Schema**: Exported constant for Organization structured data.
- **Example**:
  ```typescript
  export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "404 Studios",
    // ...
  };
  ```
- **Consumers**:
  - Injected in `app/page.tsx` (home) and `app/pricing/page.tsx`
- **Change Guidance**: Validate with `scripts/validate-seo.js`; update injection sites if schema changes.

### localBusinessSchema.ts
- **Location**: `src/shared/data/localBusinessSchema.ts`
- **Purpose**: Schema.org LocalBusiness JSON-LD.
- **Schema**: Exported constant for LocalBusiness structured data.
- **Consumers**: Injected in home/pricing pages.
- **Change Guidance**: Similar to organizationSchema.

### faqSchema.ts
- **Location**: `src/shared/data/faqSchema.ts`
- **Purpose**: Schema.org FAQ JSON-LD.
- **Schema**: Exported constant for FAQ structured data.
- **Consumers**: Injected in relevant pages.
- **Change Guidance**: Validate SEO script.

### breadcrumbSchemas.ts
- **Location**: `src/shared/data/breadcrumbSchemas.ts`
- **Purpose**: Schema.org BreadcrumbList JSON-LD.
- **Schema**: Exported constants for breadcrumbs.
- **Consumers**: Injected in home/pricing pages.
- **Change Guidance**: Update per route changes.

## 7. Route Metadata

### app/**/metadata.ts
- **Locations**: `app/features/metadata.ts`, `app/pricing/metadata.ts`, `app/services/metadata.ts`, `app/contact/metadata.ts`, `app/packages/metadata.ts`
- **Purpose**: Route metadata for SEO/OG/Twitter using Next Metadata API.
- **Schema**: Exported metadata objects with title, description, openGraph, twitter, etc.
- **Example**:
  ```typescript
  export const metadata: Metadata = {
    title: "Features | 404 Studios",
    description: "...",
    openGraph: { ... },
    twitter: { ... }
  };
  ```
- **Consumers**: Next.js App Router for each route.
- **Change Guidance**: Update per content changes; test SEO validation script.

## 8. Build-Time Generators

### sitemap.ts
- **Location**: `app/sitemap.ts`
- **Purpose**: Sitemap generator for SEO.
- **Schema**: Array of sitemap entries with url, lastModified, changeFrequency, priority.
- **Example**:
  ```typescript
  export default function sitemap(): MetadataRoute.Sitemap {
    return [
      {
        url: 'https://404studios.com',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      // ...
    ];
  }
  ```
- **Consumers**: Next.js build process.
- **Change Guidance**: Sync with new routes; rebuild to generate.

### robots.ts
- **Location**: `app/robots.ts`
- **Purpose**: Robots.txt generator.
- **Schema**: Rules for allow/disallow and sitemap/host.
- **Consumers**: Next.js build.
- **Change Guidance**: Update for new paths.

### manifest.ts
- **Location**: `app/manifest.ts`
- **Purpose**: Web app manifest for PWA.
- **Schema**: Metadata and icons for PWA.
- **Consumers**: Next.js build.
- **Change Guidance**: Update icons/assets as needed.

## 9. Configuration Datasets

### config.ts
- **Location**: `lib/config.ts`
- **Purpose**: Env-sampled configuration with validator.
- **Schema**: Exports config, validateConfig, clientConfig with env-backed defaults.
- **Example**:
  ```typescript
  export const config = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://404studios.com',
    // ...
  };

  export function validateConfig() { ... }
  ```
- **Consumers**: Various lib modules and components.
- **Change Guidance**: Update env vars; run validateConfig on build.

## 10. Styling and Theme

### globals.css
- **Location**: `app/globals.css`
- **Purpose**: Global CSS variables, utilities, animations.
- **Schema**: CSS custom properties and Tailwind utilities.
- **Consumers**: All components via Tailwind.
- **Change Guidance**: Update `tailwind.config.ts` if adding new tokens.

### tailwind.config.ts
- **Location**: `tailwind.config.ts`
- **Purpose**: Tailwind configuration mapping CSS variables.
- **Schema**: Theme extension with custom colors, animations.
- **Consumers**: Tailwind CSS processing.
- **Change Guidance**: Sync with globals.css changes.

### components.json
- **Location**: `components.json`
- **Purpose**: shadcn/ui configuration.
- **Schema**: Aliases and paths for UI components.
- **Consumers**: shadcn/ui CLI and components.
- **Change Guidance**: Update for new component paths.

## Validations and Build
- **SEO Validation**: `scripts/validate-seo.js` checks presence of schemas.
- **Build**: Next.js build validates all static exports.
- **Change Guidance**: Run build after changes; use validation scripts.

End of catalog.</content>
