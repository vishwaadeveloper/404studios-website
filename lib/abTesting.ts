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

  const generateUserId = (): string => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

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
      },
      {
        id: 'pricing_layout',
        name: 'Pricing Page Layout',
        trafficAllocation: 0.3, // 30% of users
        status: 'running',
        variants: [
          {
            id: 'control',
            name: 'Control - Vertical Layout',
            weight: 0.5,
            config: {
              layout: 'vertical',
              showComparison: false
            }
          },
          {
            id: 'variant_a',
            name: 'Variant A - Horizontal with Comparison',
            weight: 0.5,
            config: {
              layout: 'horizontal',
              showComparison: true
            }
          }
        ]
      },
      {
        id: 'contact_form',
        name: 'Contact Form Fields',
        trafficAllocation: 0.4, // 40% of users
        status: 'running',
        variants: [
          {
            id: 'control',
            name: 'Control - Standard Fields',
            weight: 0.5,
            config: {
              fields: ['name', 'email', 'message'],
              showBudget: false
            }
          },
          {
            id: 'variant_a',
            name: 'Variant A - Extended Fields',
            weight: 0.5,
            config: {
              fields: ['name', 'email', 'company', 'budget', 'message'],
              showBudget: true
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
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        test_id: testId,
        variant_id: variant.id,
        value: value || 1,
      })
    }

    // Optionally send to your backend
    sendResultToBackend(result)
  }

  const sendResultToBackend = async (result: ABTestResult) => {
    try {
      if (process.env.NEXT_PUBLIC_AB_TEST_ENDPOINT) {
        await fetch(process.env.NEXT_PUBLIC_AB_TEST_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result),
        })
      }
    } catch (error) {
      console.error('Failed to send A/B test result:', error)
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
 * Component for conditional rendering based on A/B test variant
 */
interface ABTestComponentProps {
  testId: string
  children: Record<string, ReactNode>
  fallback?: ReactNode
}

export const ABTestComponent: React.FC<ABTestComponentProps> = ({
  testId,
  children,
  fallback
}) => {
  const { variant } = useABTest(testId)
  
  if (!variant) {
    return <>{fallback}</>
  }
  
  return <>{children[variant.id] || fallback}</>
}

/**
 * Hook for business-specific A/B tests
 */
export const useBusinessABTests = () => {
  const abTest = useABTest()
  
  return {
    // Homepage CTA test
    homepageCTA: {
      variant: abTest.getVariant('homepage_cta'),
      trackClick: () => abTest.trackConversion('homepage_cta'),
    },
    
    // Pricing layout test
    pricingLayout: {
      variant: abTest.getVariant('pricing_layout'),
      trackCalculation: (value: number) => abTest.trackConversion('pricing_layout', value),
    },
    
    // Contact form test
    contactForm: {
      variant: abTest.getVariant('contact_form'),
      trackSubmission: () => abTest.trackConversion('contact_form'),
    },
  }
}

/**
 * A/B Test Results Hook (for admin/analytics)
 */
export const useABTestResults = () => {
  const [results, setResults] = useState<ABTestResult[]>([])
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedResults = JSON.parse(localStorage.getItem('ab_test_results') || '[]')
      setResults(storedResults)
    }
  }, [])
  
  const clearResults = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ab_test_results')
      setResults([])
    }
  }
  
  const getResultsByTest = (testId: string) => {
    return results.filter(result => result.testId === testId)
  }
  
  return {
    results,
    clearResults,
    getResultsByTest,
  }
}

export default {
  ABTestProvider,
  useABTest,
  ABTestComponent,
  useBusinessABTests,
  useABTestResults,
}
