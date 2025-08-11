import { NextRequest } from 'next/server'
import { apiResponse, RateLimit, CSRFProtection, validateRequest } from '@/lib/apiSecurity'
import { trackBusinessError } from '@/lib/errorTracking'

const rateLimit = new RateLimit()
const csrfProtection = new CSRFProtection()

interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
  budget?: string
  timeline?: string
  csrfToken: string
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit.check(request)
    if (!rateLimitResult.success) {
      return apiResponse.rateLimited(rateLimitResult.resetTime)
    }

    // Parse request body
    let body: ContactFormData
    try {
      body = await request.json()
    } catch {
      return apiResponse.error('Invalid JSON payload', 400, 'INVALID_JSON')
    }

    // CSRF validation
    if (!body.csrfToken || !csrfProtection.validateToken(body.csrfToken)) {
      return apiResponse.error('Invalid CSRF token', 403, 'INVALID_CSRF')
    }

    // Input validation
    const validation = validateContactForm(body)
    if (!validation.valid) {
      return apiResponse.error(`Validation error: ${validation.errors.join(', ')}`, 400, 'VALIDATION_ERROR')
    }

    // Process contact form
    const result = await processContactForm(body)
    
    if (result.success) {
      return apiResponse.success(
        { 
          id: result.id,
          message: 'Thank you for your inquiry. We\'ll get back to you within 24 hours.' 
        },
        'Contact form submitted successfully'
      )
    } else {
      throw new Error(result.error || 'Failed to process contact form')
    }

  } catch (error) {
    console.error('Contact API Error:', error)
    
    // Track business error
    trackBusinessError.contactFormError(
      error instanceof Error ? error : new Error('Unknown error'),
      {
        endpoint: '/api/contact',
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.ip
      }
    )

    return apiResponse.error(
      'An error occurred processing your request. Please try again.',
      500,
      'INTERNAL_ERROR'
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Generate CSRF token for forms
    const token = csrfProtection.generateToken()
    
    return apiResponse.success({ csrfToken: token }, 'CSRF token generated')
  } catch (error) {
    console.error('CSRF Token Error:', error)
    return apiResponse.error('Failed to generate CSRF token', 500, 'TOKEN_ERROR')
  }
}

function validateContactForm(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Required fields
  if (!data.name?.trim()) {
    errors.push('Name is required')
  } else if (!validateRequest.length(data.name.trim(), 2, 100)) {
    errors.push('Name must be between 2 and 100 characters')
  }

  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!validateRequest.email(data.email.trim())) {
    errors.push('Invalid email format')
  }

  if (!data.service?.trim()) {
    errors.push('Service selection is required')
  }

  if (!data.message?.trim()) {
    errors.push('Message is required')
  } else if (!validateRequest.length(data.message.trim(), 10, 2000)) {
    errors.push('Message must be between 10 and 2000 characters')
  }

  // Optional fields validation
  if (data.phone && !validateRequest.phone(data.phone.trim())) {
    errors.push('Invalid phone format')
  }

  if (data.company && !validateRequest.length(data.company.trim(), 2, 100)) {
    errors.push('Company name must be between 2 and 100 characters')
  }

  // Check for suspicious content
  const fieldsToCheck = [data.name, data.email, data.message, data.company].filter(Boolean)
  for (const field of fieldsToCheck) {
    if (validateRequest.isSuspicious(field!)) {
      errors.push('Suspicious content detected')
      break
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

async function processContactForm(data: ContactFormData): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Sanitize data
    const sanitizedData = {
      name: validateRequest.sanitizeHtml(data.name.trim()),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim(),
      company: data.company ? validateRequest.sanitizeHtml(data.company.trim()) : undefined,
      service: data.service.trim(),
      message: validateRequest.sanitizeHtml(data.message.trim()),
      budget: data.budget?.trim(),
      timeline: data.timeline?.trim(),
      submittedAt: new Date().toISOString(),
      ip: 'redacted', // Don't store IP for privacy
      userAgent: 'redacted' // Don't store user agent for privacy
    }

    // TODO: In production, save to database
    // const contactId = await saveToDatabase(sanitizedData)
    
    // TODO: Send notification email
    // await sendNotificationEmail(sanitizedData)
    
    // TODO: Send auto-reply email
    // await sendAutoReply(sanitizedData.email, sanitizedData.name)

    // For now, simulate success
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substring(2)}`
    
    console.log('Contact form submitted:', {
      id: contactId,
      name: sanitizedData.name,
      email: sanitizedData.email,
      service: sanitizedData.service
    })

    return {
      success: true,
      id: contactId
    }

  } catch (error) {
    console.error('Error processing contact form:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const dynamic = 'force-dynamic'
