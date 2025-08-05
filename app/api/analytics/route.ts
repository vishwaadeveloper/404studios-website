import { NextRequest } from 'next/server'
import { apiResponse, RateLimit, validateRequest } from '@/lib/apiSecurity'
import { trackBusinessError } from '@/lib/errorTracking'

const rateLimit = new RateLimit({
  windowMs: 60000, // 1 minute
  maxRequests: 10 // 10 requests per minute for analytics
})

interface AnalyticsEvent {
  eventName: string
  eventData: Record<string, any>
  userId?: string
  sessionId?: string
  timestamp?: string
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit.check(request)
    if (!rateLimitResult.success) {
      return apiResponse.rateLimited(rateLimitResult.resetTime)
    }

    // Parse request body
    let body: AnalyticsEvent
    try {
      body = await request.json()
    } catch {
      return apiResponse.error('Invalid JSON payload', 400, 'INVALID_JSON')
    }

    // Validate event data
    const validation = validateAnalyticsEvent(body)
    if (!validation.valid) {
      return apiResponse.error(`Validation error: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR')
    }

    // Process analytics event
    const result = await processAnalyticsEvent(body, request)
    
    if (result.success) {
      return apiResponse.success(
        { eventId: result.eventId },
        'Analytics event recorded'
      )
    } else {
      throw new Error(result.error || 'Failed to process analytics event')
    }

  } catch (error) {
    console.error('Analytics API Error:', error)
    
    // Don't track analytics errors to avoid loops
    // Just log and return error
    
    return apiResponse.error(
      'An error occurred processing the analytics event',
      500,
      'INTERNAL_ERROR'
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Basic health check for analytics endpoint
    return apiResponse.success({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }, 'Analytics endpoint is healthy')
  } catch (error) {
    console.error('Analytics Health Check Error:', error)
    return apiResponse.error('Analytics endpoint unhealthy', 500, 'HEALTH_CHECK_ERROR')
  }
}

function validateAnalyticsEvent(data: AnalyticsEvent): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Required fields
  if (!data.eventName?.trim()) {
    errors.push('Event name is required')
  } else if (!validateRequest.length(data.eventName.trim(), 1, 100)) {
    errors.push('Event name must be between 1 and 100 characters')
  }

  if (!data.eventData || typeof data.eventData !== 'object') {
    errors.push('Event data is required and must be an object')
  }

  // Optional field validation
  if (data.userId && !validateRequest.length(data.userId, 1, 100)) {
    errors.push('User ID must be between 1 and 100 characters')
  }

  if (data.sessionId && !validateRequest.length(data.sessionId, 1, 100)) {
    errors.push('Session ID must be between 1 and 100 characters')
  }

  // Check for suspicious content in event data
  const eventDataString = JSON.stringify(data.eventData)
  if (validateRequest.isSuspicious(eventDataString)) {
    errors.push('Suspicious content detected in event data')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

async function processAnalyticsEvent(
  data: AnalyticsEvent, 
  request: NextRequest
): Promise<{ success: boolean; eventId?: string; error?: string }> {
  try {
    // Create sanitized event
    const eventId = `analytics_${Date.now()}_${Math.random().toString(36).substring(2)}`
    
    const sanitizedEvent = {
      id: eventId,
      eventName: validateRequest.sanitizeHtml(data.eventName.trim()),
      eventData: sanitizeEventData(data.eventData),
      userId: data.userId ? validateRequest.sanitizeHtml(data.userId) : undefined,
      sessionId: data.sessionId ? validateRequest.sanitizeHtml(data.sessionId) : undefined,
      timestamp: data.timestamp || new Date().toISOString(),
      metadata: {
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        ip: hashIP(request.headers.get('x-forwarded-for') || request.ip || 'unknown')
      }
    }

    // TODO: In production, save to analytics database
    // await saveAnalyticsEvent(sanitizedEvent)
    
    // TODO: Send to external analytics service (if configured)
    // await sendToExternalAnalytics(sanitizedEvent)

    // For now, just log the event
    console.log('Analytics event processed:', {
      id: eventId,
      eventName: sanitizedEvent.eventName,
      timestamp: sanitizedEvent.timestamp
    })

    return {
      success: true,
      eventId
    }

  } catch (error) {
    console.error('Error processing analytics event:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

function sanitizeEventData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = validateRequest.sanitizeHtml(value)
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? validateRequest.sanitizeHtml(item) : item
      )
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeEventData(value)
    }
  }
  
  return sanitized
}

function hashIP(ip: string): string {
  // Simple hash function for IP anonymization
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return `hashed_${Math.abs(hash).toString(36)}`
}

export const dynamic = 'force-dynamic'
