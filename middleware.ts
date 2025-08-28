import { NextRequest, NextResponse } from 'next/server'

/**
 * Edge Runtime compatible middleware
 * Simplified version without Node.js-specific monitoring features
 */

const logger = {
  info: (message: string, meta?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta ? JSON.stringify(meta) : '')
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta ? JSON.stringify(meta) : '')
  },
  error: (message: string, error?: Error, meta?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error?.message || '', meta ? JSON.stringify(meta) : '')
  },
  debug: (message: string, meta?: any) => {
    console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, meta ? JSON.stringify(meta) : '')
  }
}

// Simple rate limiting for Edge Runtime
class EdgeRateLimit {
  private requests = new Map<string, { count: number; resetTime: number }>()
  private readonly windowMs = 60 * 1000 // 1 minute
  private readonly maxRequests = 100

  check(request: NextRequest): { success: boolean; limit: number; remaining: number; resetTime: number } {
    const key = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    
    const record = this.requests.get(key)
    
    if (!record || now > record.resetTime) {
      const resetTime = now + this.windowMs
      this.requests.set(key, { count: 1, resetTime })
      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        resetTime
      }
    }
    
    if (record.count >= this.maxRequests) {
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        resetTime: record.resetTime
      }
    }
    
    record.count++
    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - record.count,
      resetTime: record.resetTime
    }
  }
}

const rateLimit = new EdgeRateLimit()

// Security headers for Edge Runtime
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-DNS-Prefetch-Control': 'on'
}

export function middleware(request: NextRequest) {
  const startTime = Date.now()
  const { pathname } = request.nextUrl
  
  logger.debug('Edge middleware processing request', {
    method: request.method,
    pathname,
    userAgent: request.headers.get('user-agent')?.substring(0, 100)
  })

  // Skip middleware for static files and internal Next.js routes
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next()
  }

  try {
    const response = NextResponse.next()
    
    // Add security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Handle API routes
    if (pathname.startsWith('/api/')) {
      // CORS headers
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: response.headers })
      }

      // Simple rate limiting
      const rateLimitResult = rateLimit.check(request)
      
      if (!rateLimitResult.success) {
        logger.warn('Rate limit exceeded', {
          pathname,
          ip: request.headers.get('x-forwarded-for') || 'unknown'
        })

        return new NextResponse(
          JSON.stringify({
            success: false,
            error: {
              message: 'Too many requests',
              code: 'RATE_LIMITED',
              timestamp: new Date().toISOString()
            }
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60',
              ...response.headers
            }
          }
        )
      }

      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
    }

    // Add CSP for pages
    if (!pathname.startsWith('/api/')) {
      response.headers.set('Content-Security-Policy', getCSPHeader())
    }

    const responseTime = Date.now() - startTime
    
    // Add performance headers for debugging
    response.headers.set('X-Response-Time', `${responseTime}ms`)
    response.headers.set('X-Runtime', 'edge')

    logger.info('Request processed successfully', {
      method: request.method,
      pathname,
      responseTime
    })

    return response

  } catch (error) {
    const responseTime = Date.now() - startTime
    
    logger.error('Edge middleware error', error instanceof Error ? error : new Error('Unknown error'), {
      method: request.method,
      pathname,
      responseTime
    })

    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          message: 'Internal server error',
          code: 'MIDDLEWARE_ERROR',
          timestamp: new Date().toISOString()
        }
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...securityHeaders
        }
      }
    )
  }
}

function shouldSkipMiddleware(pathname: string): boolean {
  const skipPatterns = [
    '/_next/',
    '/__nextjs_original-stack-frame',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json',
    '/images/',
    '/icons/',
    '/assets/',
    '/sw.js',
    '/service-worker.js',
    '/api/health'
  ]

  return skipPatterns.some(pattern => pathname.startsWith(pattern))
}

function getCSPHeader(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://www.google-analytics.com",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; ')
}

// Configure for Edge Runtime
export const config = {
  runtime: 'edge',
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|service-worker.js).*)',
  ],
}
