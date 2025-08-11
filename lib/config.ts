/**
 * Environment Configuration Management
 * Handles environment variables and configuration validation
 */

interface Config {
  app: {
    url: string
    name: string
    version: string
    environment: 'development' | 'production' | 'staging'
  }
  analytics: {
    googleAnalyticsId?: string
    hotjarId?: string
    mixpanelToken?: string
  }
  api: {
    baseUrl: string
    contactEndpoint: string
    newsletterEndpoint: string
  }
  security: {
    csrfSecret: string
    jwtSecret: string
    encryptionKey: string
  }
  rateLimit: {
    windowMs: number
    maxRequests: number
  }
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
    enableConsole: boolean
    enableFile: boolean
    webhookUrl: string
    maxFileSize: number
    maxFiles: number
  }
  monitoring: {
    enabled: boolean
    metricsInterval: number
    healthCheckInterval: number
    slowRequestThreshold: number
    memoryThreshold: number
    errorRateThreshold: number
    enableAlerts: boolean
    alertWebhook: string
  }
  email: {
    host: string
    port: number
    user?: string
    pass?: string
    from: string
  }
  features: {
    enableAnalytics: boolean
    enableABTesting: boolean
    enableErrorTracking: boolean
    enableRateLimit: boolean
  }
}

/**
 * Load and validate environment configuration
 */
export const config: Config = {
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_APP_NAME || '404studios',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: (process.env.NODE_ENV as any) || 'development',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
    mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || '/api/contact',
    newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || '/api/newsletter',
  },
  security: {
    csrfSecret: process.env.CSRF_SECRET || 'dev-csrf-secret',
    jwtSecret: process.env.JWT_SECRET || 'dev-jwt-secret',
    encryptionKey: process.env.ENCRYPTION_KEY || 'dev-encryption-key',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },
  logging: {
    level: (process.env.LOG_LEVEL as any) || (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
    enableConsole: process.env.LOG_CONSOLE !== 'false',
    enableFile: process.env.LOG_FILE === 'true',
    webhookUrl: process.env.LOG_WEBHOOK_URL || '',
    maxFileSize: parseInt(process.env.LOG_MAX_FILE_SIZE || '10485760'), // 10MB
    maxFiles: parseInt(process.env.LOG_MAX_FILES || '5'),
  },
  monitoring: {
    enabled: process.env.MONITORING_ENABLED !== 'false',
    metricsInterval: parseInt(process.env.METRICS_INTERVAL || '60000'), // 1 minute
    healthCheckInterval: parseInt(process.env.HEALTH_CHECK_INTERVAL || '30000'), // 30 seconds
    slowRequestThreshold: parseInt(process.env.SLOW_REQUEST_THRESHOLD || '1000'), // 1 second
    memoryThreshold: parseInt(process.env.MEMORY_THRESHOLD || '500'), // 500MB
    errorRateThreshold: parseFloat(process.env.ERROR_RATE_THRESHOLD || '5'), // 5%
    enableAlerts: process.env.MONITORING_ALERTS === 'true',
    alertWebhook: process.env.ALERT_WEBHOOK_URL || '',
  },
  email: {
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.FROM_EMAIL || 'contact@404studios.com',
  },
  features: {
    enableAnalytics: process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    enableABTesting: !!process.env.NEXT_PUBLIC_AB_TEST_ENDPOINT,
    enableErrorTracking: !!process.env.NEXT_PUBLIC_SENTRY_DSN || !!process.env.NEXT_PUBLIC_ERROR_WEBHOOK_URL,
    enableRateLimit: process.env.NODE_ENV === 'production',
  },
}

/**
 * Validate required environment variables
 */
export const validateConfig = (): string[] => {
  const errors: string[] = []
  
  // Required in production
  if (config.app.environment === 'production') {
    if (!process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://')) {
      errors.push('NEXT_PUBLIC_APP_URL must be HTTPS in production')
    }
    
    if (!process.env.CSRF_SECRET || process.env.CSRF_SECRET === 'dev-csrf-secret') {
      errors.push('CSRF_SECRET must be set in production')
    }
    
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'dev-jwt-secret') {
      errors.push('JWT_SECRET must be set in production')
    }
    
    if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY === 'dev-encryption-key') {
      errors.push('ENCRYPTION_KEY must be set in production')
    }
  }
  
  return errors
}

/**
 * Development utilities
 */
export const isDevelopment = config.app.environment === 'development'
export const isProduction = config.app.environment === 'production'
export const isStaging = config.app.environment === 'staging'

/**
 * Feature flags based on environment
 */
export const features = config.features

/**
 * Safe config for client-side (no secrets)
 */
export const clientConfig = {
  app: config.app,
  analytics: config.analytics,
  api: {
    baseUrl: config.api.baseUrl,
    contactEndpoint: config.api.contactEndpoint,
    newsletterEndpoint: config.api.newsletterEndpoint,
  },
  features: config.features,
}

export default config
