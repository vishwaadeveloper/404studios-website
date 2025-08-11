'use client'

import { useEffect } from 'react'
import { initGA, trackPageView } from '@/lib/analytics'
import { useErrorTracking } from '@/lib/errorTracking'
import { config } from '@/lib/config'

/**
 * Client-side initialization component
 * Handles analytics, error tracking, and other client-side features
 */
export default function ClientInit() {
  useErrorTracking()

  useEffect(() => {
    try {
      // Initialize Google Analytics
      if (config.features.enableAnalytics && config.analytics.googleAnalyticsId) {
        initGA()
        console.log('✅ Analytics initialized')
      }

      // Track initial page view
      if (typeof window !== 'undefined') {
        trackPageView(window.location.pathname, document.title)
      }

      // Log successful initialization
      console.log('✅ Client-side features initialized:', {
        analytics: config.features.enableAnalytics,
        errorTracking: config.features.enableErrorTracking,
        abTesting: config.features.enableABTesting
      })
    } catch (error) {
      console.error('❌ Error initializing client features:', error)
    }
  }, [])

  return null // This component doesn't render anything
}
