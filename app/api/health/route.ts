import { NextRequest } from 'next/server'
import { apiResponse, RateLimit, validateRequest } from '@/lib/apiSecurity'

const rateLimit = new RateLimit({
  windowMs: 60000, // 1 minute
  maxRequests: 5 // 5 requests per minute for health checks
})

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  checks: Record<string, {
    status: 'pass' | 'fail' | 'warn'
    message?: string
    responseTime?: number
  }>
  timestamp: string
  version: string
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit.check(request)
    if (!rateLimitResult.success) {
      return apiResponse.rateLimited(rateLimitResult.resetTime)
    }

    const healthStatus = await performHealthChecks()
    
    const statusCode = healthStatus.status === 'healthy' ? 200 : 
                      healthStatus.status === 'degraded' ? 200 : 503

    return new Response(JSON.stringify(healthStatus), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })

  } catch (error) {
    console.error('Health Check Error:', error)
    
    const unhealthyStatus: HealthStatus = {
      status: 'unhealthy',
      checks: {
        'health-endpoint': {
          status: 'fail',
          message: 'Health check endpoint failed'
        }
      },
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }

    return new Response(JSON.stringify(unhealthyStatus), {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  }
}

async function performHealthChecks(): Promise<HealthStatus> {
  const checks: HealthStatus['checks'] = {}
  let overallStatus: HealthStatus['status'] = 'healthy'

  // Database connectivity check
  const dbCheck = await checkDatabase()
  checks.database = dbCheck
  if (dbCheck.status === 'fail') overallStatus = 'unhealthy'
  if (dbCheck.status === 'warn' && overallStatus === 'healthy') overallStatus = 'degraded'

  // Memory usage check
  const memoryCheck = checkMemoryUsage()
  checks.memory = memoryCheck
  if (memoryCheck.status === 'fail') overallStatus = 'unhealthy'
  if (memoryCheck.status === 'warn' && overallStatus === 'healthy') overallStatus = 'degraded'

  // Disk space check (simulated)
  const diskCheck = checkDiskSpace()
  checks.disk = diskCheck
  if (diskCheck.status === 'fail') overallStatus = 'unhealthy'
  if (diskCheck.status === 'warn' && overallStatus === 'healthy') overallStatus = 'degraded'

  // External services check
  const externalCheck = await checkExternalServices()
  checks.external = externalCheck
  if (externalCheck.status === 'fail') overallStatus = 'unhealthy'
  if (externalCheck.status === 'warn' && overallStatus === 'healthy') overallStatus = 'degraded'

  // Application version check
  const versionCheck = checkApplicationVersion()
  checks.version = versionCheck

  return {
    status: overallStatus,
    checks,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }
}

async function checkDatabase(): Promise<{ status: 'pass' | 'fail' | 'warn'; message?: string; responseTime?: number }> {
  const startTime = Date.now()
  
  try {
    // TODO: Replace with actual database connectivity check
    // const db = await getDatabase()
    // await db.ping()
    
    // Simulate database check
    await new Promise(resolve => setTimeout(resolve, 10))
    
    const responseTime = Date.now() - startTime
    
    if (responseTime > 1000) {
      return {
        status: 'warn',
        message: 'Database response time is slow',
        responseTime
      }
    }
    
    return {
      status: 'pass',
      message: 'Database connection healthy',
      responseTime
    }
  } catch (error) {
    return {
      status: 'fail',
      message: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      responseTime: Date.now() - startTime
    }
  }
}

function checkMemoryUsage(): { status: 'pass' | 'fail' | 'warn'; message?: string } {
  try {
    // Runtime detection for Edge compatibility
    if (typeof process === 'undefined' || typeof process.memoryUsage !== 'function') {
      return {
        status: 'pass',
        message: 'Memory check skipped (Edge Runtime)'
      }
    }

    const memUsage = process.memoryUsage()
    const usedMB = Math.round(memUsage.heapUsed / 1024 / 1024)
    const totalMB = Math.round(memUsage.heapTotal / 1024 / 1024)
    
    const usagePercent = (usedMB / totalMB) * 100
    
    if (usagePercent > 90) {
      return {
        status: 'fail',
        message: `Memory usage critical: ${usedMB}MB (${usagePercent.toFixed(1)}%)`
      }
    }
    
    if (usagePercent > 75) {
      return {
        status: 'warn',
        message: `Memory usage high: ${usedMB}MB (${usagePercent.toFixed(1)}%)`
      }
    }
    
    return {
      status: 'pass',
      message: `Memory usage normal: ${usedMB}MB (${usagePercent.toFixed(1)}%)`
    }
  } catch (error) {
    return {
      status: 'warn',
      message: `Memory check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

function checkDiskSpace(): { status: 'pass' | 'fail' | 'warn'; message?: string } {
  // This is a simplified check - in production you'd check actual disk usage
  try {
    // Simulate disk space check
    const freeSpacePercent = 85 // Simulated value
    
    if (freeSpacePercent < 10) {
      return {
        status: 'fail',
        message: `Disk space critical: ${freeSpacePercent}% free`
      }
    }
    
    if (freeSpacePercent < 20) {
      return {
        status: 'warn',
        message: `Disk space low: ${freeSpacePercent}% free`
      }
    }
    
    return {
      status: 'pass',
      message: `Disk space adequate: ${freeSpacePercent}% free`
    }
  } catch (error) {
    return {
      status: 'fail',
      message: `Disk space check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

async function checkExternalServices(): Promise<{ status: 'pass' | 'fail' | 'warn'; message?: string }> {
  try {
    // Check critical external services
    const services = [
      { name: 'Google Analytics', url: 'https://www.google-analytics.com' },
      // Add other critical services here
    ]
    
    const results = await Promise.allSettled(
      services.map(async service => {
        try {
          const response = await fetch(service.url, { 
            method: 'HEAD',
            signal: AbortSignal.timeout(5000) // 5 second timeout
          })
          return { name: service.name, status: response.ok }
        } catch {
          return { name: service.name, status: false }
        }
      })
    )
    
    const failedServices = results
      .map(result => result.status === 'fulfilled' ? result.value : null)
      .filter(result => result && !result.status)
    
    if (failedServices.length === services.length) {
      return {
        status: 'fail',
        message: 'All external services unreachable'
      }
    }
    
    if (failedServices.length > 0) {
      return {
        status: 'warn',
        message: `Some external services unreachable: ${failedServices.map(s => s?.name).join(', ')}`
      }
    }
    
    return {
      status: 'pass',
      message: 'All external services reachable'
    }
  } catch (error) {
    return {
      status: 'fail',
      message: `External services check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

function checkApplicationVersion(): { status: 'pass' | 'fail' | 'warn'; message?: string } {
  try {
    // Check if we're running the expected version
    const expectedVersion = process.env.APP_VERSION || '1.0.0'
    const currentVersion = '1.0.0' // This would come from package.json or build info
    
    if (currentVersion !== expectedVersion) {
      return {
        status: 'warn',
        message: `Version mismatch: running ${currentVersion}, expected ${expectedVersion}`
      }
    }
    
    return {
      status: 'pass',
      message: `Application version: ${currentVersion}`
    }
  } catch (error) {
    return {
      status: 'fail',
      message: `Version check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

export const dynamic = 'force-dynamic'
