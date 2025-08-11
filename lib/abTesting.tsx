"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface ABTest {
  id: string
  name: string
  variants: ABVariant[]
  trafficAllocation: number // 0-1, percentage of users to include
  status: 'draft' | 'running' | 'paused' | 'completed'
  startDate?: Date
  endDate?: Date
}

interface ABVariant {
  id: string
  name: string
  weight: number // 0-1, percentage within the test
  config: Record<string, any>
}

interface ABTestResult {
  testId: string
  variantId: string
  userId: string
  timestamp: Date
  converted?: boolean
  conversionValue?: number
}

interface ABTestContextValue {
  getVariant: (testId: string) => ABVariant | null
  trackConversion: (testId: string, value?: number) => void
  isInTest: (testId: string) => boolean
  getAllActiveVariants: () => Record<string, ABVariant>
}

const ABTestContext = createContext<ABTestContextValue | null>(null)

/**
 * Generate a unique user ID for A/B testing
 */
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * A/B Testing Provider
 */
export const ABTestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tests, setTests] = useState<ABTest[]>([])
  const [userVariants, setUserVariants] = useState<Record<string, ABVariant>>({})
  const [userId] = useState(() => {
    if (typeof window === 'undefined') return 'server'
    return localStorage.getItem('ab_user_id') || generateUserId()
  })

  useEffect(() => {
    // Initialize tests configuration
    initializeTests()
    
    // Store user ID
    if (typeof window !== 'undefined' && userId !== 'server') {
      localStorage.setItem('ab_user_id', userId)
    }
  }, [userId])

  const initializeTests = () => {
    // Define your A/B tests here
    const testConfigs: ABTest[] = [
      {
        id: 'homepage_cta',
        name: 'Homepage CTA Button Text',
        trafficAllocation: 0.5, // 50% of users
        status: 'running',
        variants: [
          {
            id: 'control',
            name: 'Control',
            weight: 0.5,
            config: {
              ctaText: 'Calculate Your Website Cost',
              ctaColor: 'cyan'
            }
          },
          {
            id: 'variant_a',
            name: 'Variant A',
            weight: 0.5,
            config: {
              ctaText: 'Get Your Free Quote Now',
              ctaColor: 'purple'
            }
          }
        ]
      }
    ]

    setTests(testConfigs)
    
    // Assign variants to user
    const variants: Record<string, ABVariant> = {}
    testConfigs.forEach(test => {
      if (test.status === 'running') {
        const variant = assignVariant(test, userId)
        if (variant) {
          variants[test.id] = variant
        }
      }
    })
    
    setUserVariants(variants)
  }

  const assignVariant = (test: ABTest, userId: string): ABVariant | null => {
    // Check if user should be included in this test
    const userHash = hashCode(userId + test.id)
    const shouldInclude = (userHash % 100) / 100 < test.trafficAllocation
    
    if (!shouldInclude) return null

    // Assign variant based on user hash
    const variantHash = (userHash % 1000) / 1000
    let cumulativeWeight = 0
    
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight
      if (variantHash <= cumulativeWeight) {
        return variant
      }
    }
    
    return test.variants[0] // Fallback to first variant
  }

  const hashCode = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  const getVariant = (testId: string): ABVariant | null => {
    return userVariants[testId] || null
  }

  const trackConversion = (testId: string, value?: number) => {
    const variant = userVariants[testId]
    if (!variant) return

    const result: ABTestResult = {
      testId,
      variantId: variant.id,
      userId,
      timestamp: new Date(),
      converted: true,
      conversionValue: value
    }

    // Store result locally
    if (typeof window !== 'undefined') {
      const results = JSON.parse(localStorage.getItem('ab_test_results') || '[]')
      results.push(result)
      localStorage.setItem('ab_test_results', JSON.stringify(results))
    }

    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'ab_test_conversion', {
        test_id: testId,
        variant_id: variant.id,
        value: value || 1,
      })
    }
  }

  const isInTest = (testId: string): boolean => {
    return testId in userVariants
  }

  const getAllActiveVariants = (): Record<string, ABVariant> => {
    return userVariants
  }

  return (
    <ABTestContext.Provider value={{
      getVariant,
      trackConversion,
      isInTest,
      getAllActiveVariants
    }}>
      {children}
    </ABTestContext.Provider>
  )
}

/**
 * Hook to use A/B testing
 */
export const useABTest = (testId?: string) => {
  const context = useContext(ABTestContext)
  
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider')
  }

  if (testId) {
    return {
      variant: context.getVariant(testId),
      trackConversion: (value?: number) => context.trackConversion(testId, value),
      isInTest: context.isInTest(testId),
    }
  }

  return context
}

/**
 * Hook for business-specific A/B tests
 */
export const useBusinessABTests = () => {
  const context = useContext(ABTestContext)
  
  if (!context) {
    throw new Error('useBusinessABTests must be used within ABTestProvider')
  }
  
  return {
    // Homepage CTA test
    homepageCTA: {
      variant: context.getVariant('homepage_cta'),
      trackClick: () => context.trackConversion('homepage_cta'),
    },
  }
}

export default {
  ABTestProvider,
  useABTest,
  useBusinessABTests,
}
