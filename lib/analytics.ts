"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Google Analytics 4 Integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface GAEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-PLACEHOLDER'

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  })
}

/**
 * Track page views
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  })
}

/**
 * Track custom events
 */
export const trackEvent = ({ action, category, label, value }: GAEvent) => {
  if (typeof window === 'undefined' || !window.gtag) return
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

/**
 * Track business-specific events
 */
export const trackBusinessEvent = {
  // Pricing calculator interactions
  pricingCalculator: (action: 'start' | 'complete' | 'abandon', packageType?: string) => {
    trackEvent({
      action: `pricing_calculator_${action}`,
      category: 'engagement',
      label: packageType,
    })
  },
  
  // Contact form interactions
  contactForm: (action: 'start' | 'submit' | 'error') => {
    trackEvent({
      action: `contact_form_${action}`,
      category: 'lead_generation',
    })
  },
  
  // Package interest tracking
  packageInterest: (packageName: string, action: 'view' | 'click') => {
    trackEvent({
      action: `package_${action}`,
      category: 'product_interest',
      label: packageName,
    })
  },
  
  // Service page engagement
  serviceEngagement: (serviceName: string, timeSpent: number) => {
    trackEvent({
      action: 'service_engagement',
      category: 'content_engagement',
      label: serviceName,
      value: Math.round(timeSpent / 1000), // Convert to seconds
    })
  },
  
  // CTA button clicks
  ctaClick: (ctaLocation: string, ctaText: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'conversion',
      label: `${ctaLocation}:${ctaText}`,
    })
  }
}

/**
 * Page view tracking hook
 */
export const usePageTracking = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const url = pathname + searchParams.toString()
    trackPageView(url)
  }, [pathname, searchParams])
}

/**
 * Time on page tracking hook
 */
export const useTimeTracking = (pageName: string) => {
  useEffect(() => {
    const startTime = Date.now()
    
    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime
      if (timeSpent > 5000) { // Only track if user spent more than 5 seconds
        trackBusinessEvent.serviceEngagement(pageName, timeSpent)
      }
    }
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleBeforeUnload()
      }
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [pageName])
}

/**
 * Scroll depth tracking
 */
export const useScrollTracking = (pageName: string) => {
  useEffect(() => {
    let maxScroll = 0
    const scrollMilestones = [25, 50, 75, 90, 100]
    const trackedMilestones = new Set<number>()
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        // Track milestone achievements
        scrollMilestones.forEach(milestone => {
          if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone)
            trackEvent({
              action: 'scroll_depth',
              category: 'engagement',
              label: pageName,
              value: milestone,
            })
          }
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pageName])
}

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackBusinessEvent,
  usePageTracking,
  useTimeTracking,
  useScrollTracking,
}
