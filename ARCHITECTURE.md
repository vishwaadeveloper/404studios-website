# 404Studios Website Architecture

## Overview
Clean Architecture with Custom Hooks pattern for maximum maintainability and debuggability.

## Folder Structure

\`\`\`
src/
├── app/                          # Next.js App Router (routes only)
│   ├── calculator/
│   ├── packages/
│   ├── contact/
│   └── services/
├── features/                     # Feature-based modules
│   ├── pricing/
│   │   ├── components/          # Feature-specific UI components
│   │   │   ├── PricingCalculator.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   └── PricingSummary.tsx
│   │   ├── hooks/               # Business logic hooks
│   │   │   ├── usePricingCalculator.ts
│   │   │   ├── usePricingData.ts
│   │   │   └── useFeatureSelection.ts
│   │   ├── services/            # External services
│   │   │   ├── pricingApi.ts
│   │   │   └── calculatorService.ts
│   │   ├── data/                # Static data (will become API calls)
│   │   │   ├── pricingData.ts
│   │   │   └── packageData.ts
│   │   └── types/               # TypeScript definitions
│   │       ├── pricing.types.ts
│   │       └── calculator.types.ts
│   ├── packages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   └── types/
│   ├── contact/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── services/
│       ├── components/
│       ├── hooks/
│       ├── data/
│       └── types/
├── shared/                       # Shared across features
│   ├── components/              # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageTransition.tsx
│   │   └── effects/            # Visual effects
│   │       ├── ParticleBackground.tsx
│   │       ├── GlassCard.tsx
│   │       └── AnimatedSection.tsx
│   ├── hooks/                  # Shared business logic
│   │   ├── useScrollAnimation.ts
│   │   ├── useResponsive.ts
│   │   └── useLocalStorage.ts
│   ├── services/               # Shared external services
│   │   ├── apiClient.ts
│   │   └── analyticsService.ts
│   ├── types/                  # Global TypeScript types
│   │   ├── common.types.ts
│   │   └── api.types.ts
│   ├── utils/                  # Helper functions
│   │   ├── calculations.ts
│   │   ├── formatting.ts
│   │   └── validation.ts
│   └── constants/              # App-wide constants
│       ├── routes.ts
│       ├── apiEndpoints.ts
│       └── config.ts
└── lib/                         # External library configurations
    ├── utils.ts
    └── validations.ts
\`\`\`

## Layer Responsibilities

### 🎨 **Components Layer (`components/`)**
- **Purpose**: Pure UI components, no business logic
- **Rules**: 
  - Receive data via props
  - Emit events via callbacks
  - No direct API calls
  - No state management (except local UI state)
- **Example**: Button states, form layouts, loading spinners

### 🧠 **Hooks Layer (`hooks/`)**
- **Purpose**: Business logic, state management, side effects
- **Rules**:
  - Handle all business logic
  - Manage feature state
  - Call services/APIs
  - Return clean interface for components
- **Example**: Data fetching, calculations, form validation

### 🔌 **Services Layer (`services/`)**
- **Purpose**: External integrations, API calls, complex operations
- **Rules**:
  - Pure functions when possible
  - Handle API communication
  - Data transformation
  - Error handling
- **Example**: API clients, payment processing, email sending

### 📊 **Data Layer (`data/`)**
- **Purpose**: Static data, mock data, constants
- **Rules**:
  - Will be replaced by API calls later
  - Type-safe data structures
  - Easy to swap with real APIs
- **Example**: Pricing tiers, package information, feature lists

### 🏗️ **Types Layer (`types/`)**
- **Purpose**: TypeScript type definitions
- **Rules**:
  - Domain-specific types
  - API response types
  - Component prop types
- **Example**: PricingTier, Package, User

## Debugging Flow

### 🐛 **Problem Identification**
1. **UI Issue** → Check `components/`
2. **Business Logic Issue** → Check `hooks/`
3. **Data Issue** → Check `services/` or `data/`
4. **Type Issue** → Check `types/`
5. **Routing Issue** → Check `app/`

### 🔍 **Example Debug Scenarios**
- **"Calculator not updating"** → `features/pricing/hooks/usePricingCalculator.ts`
- **"Button not styled correctly"** → `features/pricing/components/FeatureCard.tsx`
- **"Wrong pricing data"** → `features/pricing/data/pricingData.ts`
- **"API call failing"** → `features/pricing/services/pricingApi.ts`

## Migration Path to Dynamic Data

### Phase 1: Current Refactoring
\`\`\`typescript
// features/pricing/data/pricingData.ts
export const pricingData = [/* static data */]
\`\`\`

### Phase 2: API Integration
\`\`\`typescript
// features/pricing/services/pricingApi.ts
export const fetchPricingData = async () => {
  // Replace static data with API calls
}
\`\`\`

### Phase 3: Real-time Updates
\`\`\`typescript
// features/pricing/hooks/usePricingData.ts
export const usePricingData = () => {
  // Add real-time subscriptions
}
\`\`\`

## Benefits

### ✅ **Maintainability**
- Clear separation of concerns
- Easy to locate and fix bugs
- Consistent patterns across features

### ✅ **Testability** 
- Business logic isolated in hooks
- Pure components easy to test
- Services can be mocked

### ✅ **Scalability**
- Feature-based organization
- Shared components prevent duplication
- Easy to add new features

### ✅ **Team Collaboration**
- Clear ownership boundaries
- Standard React patterns
- Self-documenting structure

## Next Steps

1. Create folder structure
2. Extract hardcoded data
3. Create custom hooks for business logic
4. Refactor components to be pure
5. Add proper TypeScript types
6. Implement services layer
7. Add comprehensive tests
