"use client"

import { useEffect } from 'react'

interface ErrorInfo {
  error: Error
  errorInfo: React.ErrorInfo
  userId?: string
  sessionId?: string
  url?: string
  userAgent?: string
  timestamp?: string
}

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  url: string
}

/**
 * Error tracking service
 */
class ErrorTracker {
  private static instance: ErrorTracker
  private sessionId: string
  private userId?: string
  private apiEndpoint = '/api/errors'
  
  private constructor() {
    this.sessionId = this.generateSessionId()
    this.initializeGlobalErrorHandlers()
  }
  
  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker()
    }
    return ErrorTracker.instance
  }
  
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  private initializeGlobalErrorHandlers() {
    if (typeof window === 'undefined') return
    
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.trackError(new Error(event.message), {
        source: 'javascript',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      })
    })
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(new Error(`Unhandled promise rejection: ${event.reason}`), {
        source: 'promise',
      })
    })
    
    // Handle fetch errors
    this.interceptFetch()
  }
  
  private interceptFetch() {
    if (typeof window === 'undefined') return
    
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args)
        
        // Track failed API calls
        if (!response.ok) {
          this.trackError(new Error(`HTTP ${response.status}: ${response.statusText}`), {
            source: 'fetch',
            url: args[0]?.toString(),
            status: response.status,
          })
        }
        
        return response
      } catch (error) {
        this.trackError(error as Error, {
          source: 'fetch',
          url: args[0]?.toString(),
        })
        throw error
      }
    }
  }
  
  setUserId(userId: string) {
    this.userId = userId
  }
  
  trackError(error: Error, additionalInfo?: Record<string, any>) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      sessionId: this.sessionId,
      userId: this.userId,
      additionalInfo,
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorData)
    }
    
    // Send to error tracking service
    this.sendErrorToService(errorData)
  }
  
  trackPerformanceMetric(metric: PerformanceMetric) {
    const performanceData = {
      ...metric,
      sessionId: this.sessionId,
      userId: this.userId,
    }
    
    // Send to analytics service
    this.sendPerformanceToService(performanceData)
  }
  
  private async sendErrorToService(errorData: any) {
    try {
      // In a real application, you'd send this to your error tracking service
      // For now, we'll store it locally and optionally send to a webhook
      if (typeof window !== 'undefined') {
        const errors = JSON.parse(localStorage.getItem('app_errors') || '[]')
        errors.push(errorData)
        
        // Keep only the last 50 errors
        if (errors.length > 50) {
          errors.splice(0, errors.length - 50)
        }
        
        localStorage.setItem('app_errors', JSON.stringify(errors))
      }
      
      // Optionally send to external service
      if (process.env.NEXT_PUBLIC_ERROR_WEBHOOK_URL) {
        await fetch(process.env.NEXT_PUBLIC_ERROR_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorData),
        }).catch(() => {}) // Silently fail to avoid infinite error loops
      }
    } catch (e) {
      // Silently fail to avoid infinite error loops
    }
  }
  
  private async sendPerformanceToService(performanceData: any) {
    try {
      if (typeof window !== 'undefined') {
        const metrics = JSON.parse(localStorage.getItem('app_performance') || '[]')
        metrics.push(performanceData)
        
        // Keep only the last 100 metrics
        if (metrics.length > 100) {
          metrics.splice(0, metrics.length - 100)
        }
        
        localStorage.setItem('app_performance', JSON.stringify(metrics))
      }
    } catch (e) {
      // Silently fail
    }
  }
  
  getStoredErrors() {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('app_errors') || '[]')
  }
  
  getStoredMetrics() {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('app_performance') || '[]')
  }
  
  clearStoredData() {
    if (typeof window === 'undefined') return
    localStorage.removeItem('app_errors')
    localStorage.removeItem('app_performance')
  }
}

/**
 * React Error Boundary Hook
 */
export const useErrorTracking = () => {
  const errorTracker = ErrorTracker.getInstance()
  
  useEffect(() => {
    // Track Core Web Vitals and performance metrics
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP tracking
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        errorTracker.trackPerformanceMetric({
          name: 'LCP',
          value: lastEntry.startTime,
          timestamp: Date.now(),
          url: window.location.href,
        })
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      
      // FID tracking
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          errorTracker.trackPerformanceMetric({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            timestamp: Date.now(),
            url: window.location.href,
          })
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      
      // CLS tracking
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            errorTracker.trackPerformanceMetric({
              name: 'CLS',
              value: entry.value,
              timestamp: Date.now(),
              url: window.location.href,
            })
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      
      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [errorTracker])
  
  return {
    trackError: (error: Error, additionalInfo?: Record<string, any>) => 
      errorTracker.trackError(error, additionalInfo),
    setUserId: (userId: string) => errorTracker.setUserId(userId),
    getStoredErrors: () => errorTracker.getStoredErrors(),
    getStoredMetrics: () => errorTracker.getStoredMetrics(),
    clearStoredData: () => errorTracker.clearStoredData(),
  }
}

/**
 * Business Logic Error Tracker
 */
export const trackBusinessError = {
  pricingCalculationError: (error: Error, formData: any) => {
    ErrorTracker.getInstance().trackError(error, {
      type: 'pricing_calculation',
      formData: JSON.stringify(formData),
    })
  },
  
  contactFormError: (error: Error, formData: any) => {
    ErrorTracker.getInstance().trackError(error, {
      type: 'contact_form',
      formData: JSON.stringify(formData),
    })
  },
  
  navigationError: (error: Error, route: string) => {
    ErrorTracker.getInstance().trackError(error, {
      type: 'navigation',
      route,
    })
  },
  
  componentLoadError: (error: Error, componentName: string) => {
    ErrorTracker.getInstance().trackError(error, {
      type: 'component_load',
      componentName,
    })
  },
}

export default ErrorTracker
