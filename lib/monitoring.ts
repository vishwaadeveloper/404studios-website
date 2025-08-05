import { config } from '@/lib/config'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: string
  metadata?: Record<string, any>
  error?: {
    name: string
    message: string
    stack?: string
  }
  performance?: LogPerformance
  request?: {
    method: string
    url: string
    userAgent?: string
    ip?: string
    userId?: string
  }
}

export interface PerformanceMetrics {
  responseTime: number
  memoryUsage: number
  cpuUsage?: number
  requestCount: number
  errorCount: number
  timestamp: string
}

export interface LogPerformance {
  duration: number
  memory: number
}

/**
 * Production Logger
 */
export class Logger {
  private context: string
  private metadata: Record<string, any>

  constructor(context: string = 'app', metadata: Record<string, any> = {}) {
    this.context = context
    this.metadata = metadata
  }

  public debug(message: string, meta?: Record<string, any>): void {
    this.log('debug', message, meta)
  }

  public info(message: string, meta?: Record<string, any>): void {
    this.log('info', message, meta)
  }

  public warn(message: string, meta?: Record<string, any>): void {
    this.log('warn', message, meta)
  }

  public error(message: string, error?: Error, meta?: Record<string, any>): void {
    this.log('error', message, meta, error)
  }

  public fatal(message: string, error?: Error, meta?: Record<string, any>): void {
    this.log('fatal', message, meta, error)
  }

  private log(level: LogLevel, message: string, meta?: Record<string, any>, error?: Error): void {
    if (!this.shouldLog(level)) return

    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: this.context,
      metadata: { ...this.metadata, ...meta }
    }

    // Add error information
    if (error) {
      logEntry.error = {
        name: error.name,
        message: error.message,
        stack: config.app.environment === 'development' ? error.stack : undefined
      }
    }

    // Add performance metrics for certain levels
    if (level === 'error' || level === 'fatal') {
      logEntry.performance = this.getPerformanceMetrics()
    }

    this.writeLog(logEntry)
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      fatal: 4
    }

    const minLevel = config.logging.level as LogLevel
    return levels[level] >= levels[minLevel]
  }

  private getPerformanceMetrics(): LogPerformance {
    const memUsage = process.memoryUsage()
    return {
      duration: 0, // This would be set by request middleware
      memory: Math.round(memUsage.heapUsed / 1024 / 1024) // MB
    }
  }

  private writeLog(entry: LogEntry): void {
    const output = this.formatLogEntry(entry)

    // Console output
    switch (entry.level) {
      case 'debug':
      case 'info':
        console.log(output)
        break
      case 'warn':
        console.warn(output)
        break
      case 'error':
      case 'fatal':
        console.error(output)
        break
    }

    // In production, also send to external logging service
    if (config.app.environment === 'production') {
      this.sendToExternalLogger(entry)
    }
  }

  private formatLogEntry(entry: LogEntry): string {
    if (config.app.environment === 'development') {
      // Pretty format for development
      const timestamp = new Date(entry.timestamp).toLocaleTimeString()
      const level = entry.level.toUpperCase().padEnd(5)
      const context = entry.context ? `[${entry.context}]` : ''
      
      let output = `${timestamp} ${level} ${context} ${entry.message}`
      
      if (entry.metadata && Object.keys(entry.metadata).length > 0) {
        output += `\n  Metadata: ${JSON.stringify(entry.metadata, null, 2)}`
      }
      
      if (entry.error) {
        output += `\n  Error: ${entry.error.name}: ${entry.error.message}`
        if (entry.error.stack) {
          output += `\n  Stack: ${entry.error.stack}`
        }
      }
      
      return output
    } else {
      // JSON format for production
      return JSON.stringify(entry)
    }
  }

  private async sendToExternalLogger(entry: LogEntry): Promise<void> {
    try {
      // TODO: Implement external logging service integration
      // Examples: DataDog, LogRocket, Sentry, etc.
      
      if (config.logging.webhookUrl) {
        await fetch(config.logging.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry)
        })
      }
    } catch (error) {
      // Don't let logging errors crash the app
      console.error('Failed to send log to external service:', error)
    }
  }

  public child(context: string, metadata?: Record<string, any>): Logger {
    return new Logger(
      `${this.context}.${context}`,
      { ...this.metadata, ...metadata }
    )
  }
}

/**
 * Performance Monitor
 */
export class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map()
  private logger: Logger

  constructor() {
    this.logger = new Logger('performance')
    this.startPeriodicCollection()
  }

  public recordRequest(
    method: string,
    url: string,
    responseTime: number,
    success: boolean
  ): void {
    const key = `${method}_${url}`
    const existing = this.metrics.get(key) || {
      responseTime: 0,
      memoryUsage: 0,
      requestCount: 0,
      errorCount: 0,
      timestamp: new Date().toISOString()
    }

    existing.requestCount++
    existing.responseTime = (existing.responseTime + responseTime) / existing.requestCount
    if (!success) existing.errorCount++
    existing.timestamp = new Date().toISOString()

    this.metrics.set(key, existing)

    // Log slow requests
    if (responseTime > config.monitoring.slowRequestThreshold) {
      this.logger.warn('Slow request detected', {
        method,
        url,
        responseTime,
        threshold: config.monitoring.slowRequestThreshold
      })
    }
  }

  public getMetrics(): Record<string, PerformanceMetrics> {
    return Object.fromEntries(this.metrics)
  }

  public clearMetrics(): void {
    this.metrics.clear()
  }

  private startPeriodicCollection(): void {
    setInterval(() => {
      this.collectSystemMetrics()
    }, config.monitoring.metricsInterval)
  }

  private collectSystemMetrics(): void {
    try {
      const memUsage = process.memoryUsage()
      const systemMetrics = {
        responseTime: 0,
        memoryUsage: Math.round(memUsage.heapUsed / 1024 / 1024),
        requestCount: Array.from(this.metrics.values()).reduce((sum, m) => sum + m.requestCount, 0),
        errorCount: Array.from(this.metrics.values()).reduce((sum, m) => sum + m.errorCount, 0),
        timestamp: new Date().toISOString()
      }

      this.metrics.set('system', systemMetrics)

      // Alert on high memory usage
      if (systemMetrics.memoryUsage > config.monitoring.memoryThreshold) {
        this.logger.warn('High memory usage detected', {
          memoryUsage: systemMetrics.memoryUsage,
          threshold: config.monitoring.memoryThreshold
        })
      }

      // Alert on high error rate
      const errorRate = systemMetrics.requestCount > 0 
        ? (systemMetrics.errorCount / systemMetrics.requestCount) * 100 
        : 0

      if (errorRate > config.monitoring.errorRateThreshold) {
        this.logger.error('High error rate detected', undefined, {
          errorRate,
          threshold: config.monitoring.errorRateThreshold,
          errorCount: systemMetrics.errorCount,
          requestCount: systemMetrics.requestCount
        })
      }

    } catch (error) {
      this.logger.error('Failed to collect system metrics', error instanceof Error ? error : new Error('Unknown error'))
    }
  }
}

/**
 * Application Health Monitor
 */
export class HealthMonitor {
  private logger: Logger
  private performanceMonitor: PerformanceMonitor
  private healthChecks: Map<string, () => Promise<boolean>> = new Map()

  constructor(performanceMonitor: PerformanceMonitor) {
    this.logger = new Logger('health')
    this.performanceMonitor = performanceMonitor
    this.registerDefaultHealthChecks()
    this.startHealthChecking()
  }

  public registerHealthCheck(name: string, check: () => Promise<boolean>): void {
    this.healthChecks.set(name, check)
  }

  public async runHealthChecks(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {}

    for (const [name, check] of this.healthChecks) {
      try {
        results[name] = await check()
      } catch (error) {
        results[name] = false
        this.logger.error(`Health check failed: ${name}`, error instanceof Error ? error : new Error('Unknown error'))
      }
    }

    return results
  }

  private registerDefaultHealthChecks(): void {
    // Memory health check
    this.registerHealthCheck('memory', async () => {
      const memUsage = process.memoryUsage()
      const usedMB = Math.round(memUsage.heapUsed / 1024 / 1024)
      return usedMB < config.monitoring.memoryThreshold
    })

    // Error rate health check
    this.registerHealthCheck('errorRate', async () => {
      const metrics = this.performanceMonitor.getMetrics()
      const systemMetrics = metrics.system
      
      if (!systemMetrics || systemMetrics.requestCount === 0) return true
      
      const errorRate = (systemMetrics.errorCount / systemMetrics.requestCount) * 100
      return errorRate < config.monitoring.errorRateThreshold
    })
  }

  private startHealthChecking(): void {
    setInterval(async () => {
      const results = await this.runHealthChecks()
      const failedChecks = Object.entries(results)
        .filter(([, passed]) => !passed)
        .map(([name]) => name)

      if (failedChecks.length > 0) {
        this.logger.warn('Health checks failed', {
          failedChecks,
          allResults: results
        })
      }
    }, config.monitoring.healthCheckInterval)
  }
}

// Singleton instances
export const logger = new Logger()
export const performanceMonitor = new PerformanceMonitor()
export const healthMonitor = new HealthMonitor(performanceMonitor)

// Convenience functions
export const createLogger = (context: string, metadata?: Record<string, any>) => 
  new Logger(context, metadata)

export default {
  Logger,
  PerformanceMonitor,
  HealthMonitor,
  logger,
  performanceMonitor,
  healthMonitor,
  createLogger
}
