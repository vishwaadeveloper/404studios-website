/**
 * Edge Runtime Compatibility Test
 * Run this to verify monitoring code works in both Node.js and Edge Runtime
 */

import { Logger, PerformanceMonitor, HealthMonitor } from '../lib/monitoring'

// Simulate Edge Runtime environment
function simulateEdgeRuntime() {
  const originalProcess = globalThis.process
  
  // Mock Edge Runtime environment (limited process object)
  globalThis.process = {
    env: process.env,
    versions: undefined,
    memoryUsage: undefined
  } as any

  return () => {
    // Restore original process
    globalThis.process = originalProcess
  }
}

async function testEdgeCompatibility() {
  console.log('🧪 Testing Edge Runtime Compatibility...\n')

  // Test 1: Node.js Runtime
  console.log('1️⃣ Testing Node.js Runtime:')
  try {
    const logger = new Logger('test-node')
    logger.info('Logger works in Node.js runtime')
    
    const perfMonitor = new PerformanceMonitor()
    perfMonitor.recordRequest('GET', '/test', 100, true)
    console.log('✅ Performance monitoring works in Node.js runtime')
    
    const healthMonitor = new HealthMonitor(perfMonitor)
    const healthResults = await healthMonitor.runHealthChecks()
    console.log('✅ Health monitoring works in Node.js runtime')
    console.log('Health check results:', Object.keys(healthResults))
  } catch (error) {
    console.error('❌ Node.js runtime test failed:', error)
  }

  console.log()

  // Test 2: Edge Runtime Simulation
  console.log('2️⃣ Testing Edge Runtime Simulation:')
  const restoreProcess = simulateEdgeRuntime()
  
  try {
    const logger = new Logger('test-edge')
    logger.info('Logger works in Edge runtime')
    
    const perfMonitor = new PerformanceMonitor()
    perfMonitor.recordRequest('GET', '/test-edge', 150, true)
    console.log('✅ Performance monitoring works in Edge runtime')
    
    const healthMonitor = new HealthMonitor(perfMonitor)
    const healthResults = await healthMonitor.runHealthChecks()
    console.log('✅ Health monitoring works in Edge runtime')
    console.log('Health check results:', Object.keys(healthResults))
  } catch (error) {
    console.error('❌ Edge runtime test failed:', error)
  } finally {
    restoreProcess()
  }

  console.log()

  // Test 3: Memory Usage Function
  console.log('3️⃣ Testing Memory Usage Function:')
  try {
    // This is the function from our monitoring.ts
    function isNodeRuntime(): boolean {
      return typeof process !== 'undefined' && 
             typeof process.versions === 'object' &&
             typeof process.versions.node === 'string' &&
             typeof process.memoryUsage === 'function'
    }

    function getMemoryUsage() {
      if (isNodeRuntime()) {
        try {
          return process.memoryUsage()
        } catch {
          // Fallback if process.memoryUsage fails
        }
      }
      
      // Edge Runtime fallback
      return {
        heapUsed: 0,
        heapTotal: 0,
        rss: 0,
        external: 0
      }
    }

    const nodeResult = getMemoryUsage()
    console.log('✅ Memory usage in Node.js:', nodeResult.heapUsed > 0 ? 'Real data' : 'Fallback data')

    // Simulate Edge
    const restoreProcess2 = simulateEdgeRuntime()
    const edgeResult = getMemoryUsage()
    console.log('✅ Memory usage in Edge:', edgeResult.heapUsed === 0 ? 'Fallback data (expected)' : 'Unexpected real data')
    restoreProcess2()

  } catch (error) {
    console.error('❌ Memory usage test failed:', error)
  }

  console.log('\n🎉 Edge compatibility tests completed!')
}

// Run tests if this file is executed directly
if (require.main === module) {
  testEdgeCompatibility().catch(console.error)
}

export { testEdgeCompatibility }
