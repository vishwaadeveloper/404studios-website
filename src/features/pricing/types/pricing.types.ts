// TypeScript definitions for pricing calculator
export interface PricingTier {
  name: "Basic" | "Standard" | "Advanced"
  desc: string
  price: number
}

export interface PricingFeature {
  feature: string
  desc: string
  tiers: PricingTier[]
  isCountable: boolean
  minCount?: number
}

export interface PricingGroup {
  group: string
  features: PricingFeature[]
}

export type PricingData = PricingGroup[]

export interface SelectedFeature {
  tier: "Basic" | "Standard" | "Advanced"
  count?: number
}

export interface SelectedFeatures {
  [key: string]: SelectedFeature
}

export interface CalculatorState {
  selectedFeatures: SelectedFeatures
  totalPrice: number
  isCustomizing: boolean
}

export interface FeatureCardProps {
  feature: PricingFeature
  groupName: string
  selectedFeatures: SelectedFeatures
  onFeatureUpdate: (featureKey: string, tier: string, count?: number) => void
  onRemoveFeature: (featureKey: string) => void
}

export interface PricingSummaryProps {
  selectedFeatures: SelectedFeatures
  pricingData: PricingData
  totalPrice: number
  onRemoveFeature: (featureKey: string) => void
}

export type BusinessType = "portfolio" | "restaurant" | "ecommerce" | "business" | "fitness"

export interface PageConfig {
  count: number
  names: string[]
}

export interface BusinessConfiguration {
  name: string
  description: string
  basePrice: number
  timeline: string
  defaultPages: {
    static: PageConfig
    dynamic: PageConfig
  }
  defaults: {
    [key: string]: "Basic" | "Standard" | "Advanced"
  }
}

export interface CalculatorHookReturn {
  businessType: string
  setBusinessType: (type: string) => void
  selections: Record<string, string | null>
  pageCounts: Record<string, number>
  pageNames: Record<string, string[]>
  expandedGroups: Record<string, boolean>
  totalPrice: number
  handleSelectionChange: (feature: string, tier: string | null) => void
  handlePageCountChange: (feature: string, count: number) => void
  handlePageNamesChange: (feature: string, names: string[]) => void
  toggleGroupExpanded: (groupName: string) => void
  selectedFeatures: Array<[string, string]>
  getTotalPages: () => { static: number; dynamic: number; total: number }
  pageStats: { static: number; dynamic: number; total: number }
}
