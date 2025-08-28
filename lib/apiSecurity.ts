import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { config } from '@/lib/config'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store (use Redis in production)
const rateLimitStore: RateLimitStore = {}

/**
 * Rate limiting middleware
 */
export class RateLimit {
  private windowMs: number
  private maxRequests: number
  private keyGenerator: (request: NextRequest) => string
  
  constructor(options: {
    windowMs?: number
    maxRequests?: number
    keyGenerator?: (request: NextRequest) => string
  } = {}) {
    this.windowMs = options.windowMs || config.rateLimit.windowMs
    this.maxRequests = options.maxRequests || config.rateLimit.maxRequests
    this.keyGenerator = options.keyGenerator || this.defaultKeyGenerator
  }
  
  private defaultKeyGenerator(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    return `rate_limit:${ip}`
  }
  
  public check(request: NextRequest): {
    success: boolean
    limit: number
    remaining: number
    resetTime: number
  } {
    const key = this.keyGenerator(request)
    const now = Date.now()
    
    // Clean up expired entries
    if (rateLimitStore[key] && rateLimitStore[key].resetTime <= now) {
      delete rateLimitStore[key]
    }
    
    // Initialize or increment
    if (!rateLimitStore[key]) {
      rateLimitStore[key] = {
        count: 1,
        resetTime: now + this.windowMs
      }
    } else {
      rateLimitStore[key].count++
    }
    
    const store = rateLimitStore[key]
    const remaining = Math.max(0, this.maxRequests - store.count)
    const success = store.count <= this.maxRequests
    
    return {
      success,
      limit: this.maxRequests,
      remaining,
      resetTime: store.resetTime
    }
  }
}

/**
 * CSRF Protection
 */
export class CSRFProtection {
  private secret: string
  
  constructor(secret?: string) {
    this.secret = secret || config.security.csrfSecret
  }
  
  public generateToken(): string {
    const timestamp = Date.now().toString()
    const random = Math.random().toString(36).substring(2)
    return Buffer.from(`${timestamp}:${random}:${this.secret}`).toString('base64')
  }
  
  public validateToken(token: string, maxAge: number = 3600000): boolean {
    try {
      const decoded = Buffer.from(token, 'base64').toString()
      const [timestamp, random, secret] = decoded.split(':')
      
      if (secret !== this.secret) return false
      
      const tokenAge = Date.now() - parseInt(timestamp)
      return tokenAge <= maxAge
    } catch {
      return false
    }
  }
}

/**
 * Request validation utilities
 */
export const validateRequest = {
  // Validate email format
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  
  // Validate phone format
  phone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone)
  },
  
  // Validate URL format
  url: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
  
  // Sanitize HTML input
  sanitizeHtml: (input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
  },
  
  // Validate string length
  length: (str: string, min: number, max: number): boolean => {
    return str.length >= min && str.length <= max
  },
  
  // Check for suspicious patterns
  isSuspicious: (input: string): boolean => {
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\s*\(/i,
      /expression\s*\(/i,
      /vbscript:/i,
      /data:text\/html/i
    ]
    
    return suspiciousPatterns.some(pattern => pattern.test(input))
  }
}

/**
 * API Response utilities
 */
export const apiResponse = {
  success: (data?: any, message?: string) => {
    return NextResponse.json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    })
  },
  
  error: (message: string, status: number = 400, code?: string) => {
    return NextResponse.json({
      success: false,
      error: {
        message,
        code,
        timestamp: new Date().toISOString()
      }
    }, { status })
  },
  
  rateLimited: (resetTime: number) => {
    return NextResponse.json({
      success: false,
      error: {
        message: 'Too many requests',
        code: 'RATE_LIMITED',
        resetTime,
        timestamp: new Date().toISOString()
      }
    }, { 
      status: 429,
      headers: {
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
      }
    })
  },
  
  unauthorized: (message: string = 'Unauthorized') => {
    return NextResponse.json({
      success: false,
      error: {
        message,
        code: 'UNAUTHORIZED',
        timestamp: new Date().toISOString()
      }
    }, { status: 401 })
  },
  
  forbidden: (message: string = 'Forbidden') => {
    return NextResponse.json({
      success: false,
      error: {
        message,
        code: 'FORBIDDEN',
        timestamp: new Date().toISOString()
      }
    }, { status: 403 })
  }
}

/**
 * Security headers for API routes
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cache-Control': 'no-store'
}

/**
 * CORS configuration
 */
export const corsHeaders = (origin?: string) => {
  const allowedOrigins = [
    'https://404studios.com',
    'https://www.404studios.com',
    ...(config.app.environment === 'development' ? ['http://localhost:3000'] : [])
  ]
  
  const isAllowed = !origin || allowedOrigins.includes(origin)
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? (origin || '*') : 'null',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
    'Access-Control-Max-Age': '86400'
  }
}

export default {
  RateLimit,
  CSRFProtection,
  validateRequest,
  apiResponse,
  securityHeaders,
  corsHeaders
}
