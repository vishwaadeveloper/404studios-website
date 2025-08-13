import { useState, useEffect } from "react"
import { pricingData } from "../data/pricingData"
import { businessTypes } from "../data/businessTypes"
import type { CalculatorHookReturn } from "../types/pricing.types"

export const usePricingCalculator = (): CalculatorHookReturn => {
  const [businessType, setBusinessType] = useState<string>("portfolio")
  const [selections, setSelections] = useState<Record<string, string | null>>({})
  const [pageCounts, setPageCounts] = useState<Record<string, number>>({})
  const [pageNames, setPageNames] = useState<Record<string, string[]>>({})
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Core Website Features": true,
  })
  const [totalPrice, setTotalPrice] = useState(0)

  // Apply business type defaults
  useEffect(() => {
    const businessConfig = businessTypes[businessType as keyof typeof businessTypes]
    if (businessConfig) {
      setSelections(businessConfig.defaults)
      setPageCounts({
        "Static Page": businessConfig.defaultPages.static.count,
        "Dynamic Page": businessConfig.defaultPages.dynamic.count,
      })
      setPageNames({
        "Static Page": [...businessConfig.defaultPages.static.names],
        "Dynamic Page": [...businessConfig.defaultPages.dynamic.names],
      })
    }
  }, [businessType])

  // Calculate total price
  useEffect(() => {
    const businessConfig = businessTypes[businessType as keyof typeof businessTypes]
    let total = businessConfig?.basePrice || 0

    Object.entries(selections).forEach(([featureName, tierName]) => {
      if (tierName) {
        // Find the feature and tier price
        for (const group of pricingData) {
          const feature = group.features.find((f) => f.feature === featureName)
          if (feature) {
            const tier = feature.tiers.find((t) => t.name === tierName)
            if (tier) {
              const count = feature.isCountable ? pageCounts[featureName] || 1 : 1
              
              // Check if this feature is included in the base template
              const defaultTier = businessConfig?.defaults[featureName]
              
              if (defaultTier) {
                // This feature is included in base price
                if (tierName !== defaultTier) {
                  // User selected a different tier, add the difference
                  const defaultTierObj = feature.tiers.find((t) => t.name === defaultTier)
                  if (defaultTierObj) {
                    const additionalCost = (tier.price - defaultTierObj.price) * count
                    total += additionalCost
                  }
                }
                // If same tier as default, no additional cost (already included in base)
              } else {
                // Feature not included in base, add full price
                total += tier.price * count
              }
            }
            break
          }
        }
      }
    })

    setTotalPrice(total)
  }, [selections, pageCounts, businessType])

  const handleSelectionChange = (feature: string, tier: string | null) => {
    setSelections((prev) => ({
      ...prev,
      [feature]: tier,
    }))
  }

  const handlePageCountChange = (feature: string, count: number) => {
    setPageCounts((prev) => ({
      ...prev,
      [feature]: count,
    }))
  }

  const handlePageNamesChange = (feature: string, names: string[]) => {
    setPageNames((prev) => ({
      ...prev,
      [feature]: names,
    }))
    
    // Automatically synchronize page count with names array length
    setPageCounts((prev) => ({
      ...prev,
      [feature]: names.length,
    }))
  }

  const toggleGroupExpanded = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }))
  }

  const selectedFeatures = Object.entries(selections).filter(([_, tier]) => tier !== null) as Array<[string, string]>

  const getTotalPages = () => {
    const staticPages = pageCounts["Static Page"] || 0
    const dynamicPages = pageCounts["Dynamic Page"] || 0
    return { static: staticPages, dynamic: dynamicPages, total: staticPages + dynamicPages }
  }

  const pageStats = getTotalPages()

  return {
    businessType,
    setBusinessType,
    selections,
    pageCounts,
    pageNames,
    expandedGroups,
    totalPrice,
    handleSelectionChange,
    handlePageCountChange,
    handlePageNamesChange,
    toggleGroupExpanded,
    selectedFeatures,
    getTotalPages,
    pageStats,
  }
}
