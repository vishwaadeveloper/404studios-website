import { NextRequest, NextResponse } from 'next/server'

interface AnalyticsEvent {
  eventName: string
  eventData: Record<string, any>
  userId?: string
  sessionId?: string
  timestamp?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyticsEvent = await request.json()
    
    // Basic validation
    if (!body.eventName || !body.eventData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log analytics event (in production, save to database)
    console.log('Analytics event:', {
      eventName: body.eventName,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ 
      success: true,
      eventId: `analytics_${Date.now()}`
    })

  } catch (error) {
    console.error('Analytics API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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

export const dynamic = 'force-dynamic'
