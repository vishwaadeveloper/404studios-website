import { NextRequest, NextResponse } from 'next/server'
import { RateLimit, securityHeaders, corsHeaders } from '@/lib/apiSecurity'
import { performanceMonitor, createLogger } from '@/lib/monitoring'
import { config as appConfig } from '@/lib/config'

const logger = createLogger('middleware')
const rateLimit = new RateLimit()

export function middleware(request: NextRequest) {
  const startTime = Date.now()
  const { pathname, origin } = request.nextUrl
  
  logger.debug('Middleware processing request', {
    method: request.method,
    pathname,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.ip
  })

  // Skip middleware for static files and internal Next.js routes
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next()
  }

  try {
    // Security headers for all responses
    const response = NextResponse.next()
    
    // Add security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Add CORS headers for API routes
    if (pathname.startsWith('/api/')) {
            const corsHeadersObj = corsHeaders(request.headers.get('origin') || undefined)
      Object.entries(corsHeadersObj).forEach(([key, value]) => {
        response.headers.set(key, value)
      })

      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: response.headers })
      }

      // Rate limiting for API routes
      if (appConfig.features.enableRateLimit) {
        const rateLimitResult = rateLimit.check(request)
        
        if (!rateLimitResult.success) {
          logger.warn('Rate limit exceeded', {
            pathname,
            ip: request.headers.get('x-forwarded-for') || request.ip,
            limit: rateLimitResult.limit,
            resetTime: rateLimitResult.resetTime
          })

          return new NextResponse(
            JSON.stringify({
              success: false,
              error: {
                message: 'Too many requests',
                code: 'RATE_LIMITED',
                resetTime: rateLimitResult.resetTime,
                timestamp: new Date().toISOString()
              }
            }),
            {
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
                ...response.headers
              }
            }
          )
        }

        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
        response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
        response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString())
      }
    }

    // Add security headers for pages
    if (!pathname.startsWith('/api/')) {
      // Content Security Policy
      response.headers.set('Content-Security-Policy', getCSPHeader(appConfig.app.environment))
      
      // Additional page security headers
      response.headers.set('X-DNS-Prefetch-Control', 'on')
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
      response.headers.set('Permissions-Policy', getPermissionsPolicyHeader())
    }

    // Performance monitoring
    const responseTime = Date.now() - startTime
    
    if (appConfig.monitoring.enabled) {
      // Record performance metrics
      performanceMonitor.recordRequest(
        request.method,
        pathname,
        responseTime,
        true // We'll update this in the response handler if there's an error
      )

      // Add performance headers for debugging
      if (appConfig.app.environment === 'development') {
        response.headers.set('X-Response-Time', `${responseTime}ms`)
        response.headers.set('X-Timestamp', new Date().toISOString())
      }
    }

    logger.info('Request processed successfully', {
      method: request.method,
      pathname,
      responseTime,
      status: response.status || 200
    })

    return response

  } catch (error) {
    const responseTime = Date.now() - startTime
    
    logger.error('Middleware error', error instanceof Error ? error : new Error('Unknown middleware error'), {
      method: request.method,
      pathname,
      responseTime,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.ip
    })

    // Record failed request
    if (appConfig.monitoring.enabled) {
      performanceMonitor.recordRequest(
        request.method,
        pathname,
        responseTime,
        false
      )
    }

    // Return a generic error response
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
    // Next.js internal routes
    '/_next/',
    '/__nextjs_original-stack-frame',
    
    // Static files
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json',
    
    // Public assets
    '/images/',
    '/icons/',
    '/assets/',
    
    // Service worker
    '/sw.js',
    '/service-worker.js',
    
    // Health check (to avoid rate limiting)
    '/api/health'
  ]

  return skipPatterns.some(pattern => pathname.startsWith(pattern))
}

function getCSPHeader(environment: string): string {
  const isDev = environment === 'development'
  
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.hotjar.com https://script.hotjar.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://www.google-analytics.com https://static.hotjar.com https://script.hotjar.com",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com",
    "frame-src 'self' https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content"
  ]

  // Add localhost for development
  if (isDev) {
    csp[1] += " 'unsafe-eval' http://localhost:* ws://localhost:*"
    csp[4] += " http://localhost:*"
    csp[5] += " http://localhost:* ws://localhost:*"
  }

  return csp.join('; ')
}

function getPermissionsPolicyHeader(): string {
  return [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
    'payment=()',
    'usb=()',
    'serial=()',
    'bluetooth=()',
    'magnetometer=()',
    'accelerometer=()',
    'gyroscope=()',
    'fullscreen=(self)',
    'picture-in-picture=()'
  ].join(', ')
}

// Configure which paths the middleware should run on
export const config = {
  // Use Node.js runtime for full monitoring features
  runtime: 'nodejs',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|service-worker.js).*)',
  ],
}
