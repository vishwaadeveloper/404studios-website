import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
  budget?: string
  timeline?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Basic validation
    const validation = validateContactForm(body)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      )
    }

    // Log contact form submission (in production, save to database and send email)
    console.log('Contact form submitted:', {
      name: body.name,
      email: body.email,
      service: body.service,
      timestamp: new Date().toISOString()
    })

    const contactId = `contact_${Date.now()}`

    return NextResponse.json({ 
      success: true,
      id: contactId,
      message: 'Thank you for your inquiry. We\'ll get back to you within 24 hours.'
    })

  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'An error occurred processing your request. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  })
}

function validateContactForm(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Required fields
  if (!data.name?.trim()) {
    errors.push('Name is required')
  } else if (data.name.trim().length < 2 || data.name.trim().length > 100) {
    errors.push('Name must be between 2 and 100 characters')
  }

  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Invalid email format')
  }

  if (!data.service?.trim()) {
    errors.push('Service selection is required')
  }

  if (!data.message?.trim()) {
    errors.push('Message is required')
  } else if (data.message.trim().length < 10 || data.message.trim().length > 2000) {
    errors.push('Message must be between 10 and 2000 characters')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

export const dynamic = 'force-dynamic'
