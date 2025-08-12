# Edge Runtime Compatibility

This document explains the changes made to ensure the monitoring and logging systems work in both Node.js and Edge Runtime environments.

## Problem

The original monitoring code used Node.js-specific APIs like `process.memoryUsage()` which are not available in Vercel's Edge Runtime, causing deployment failures with:

```
TypeError: process.memoryUsage is not a function
```

## Solution

### 1. Runtime Detection

Added runtime detection utilities to safely handle different environments:

```typescript
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
```

### 2. Conditional Feature Activation

Features that require Node.js APIs are conditionally activated:

- **Periodic Monitoring**: Only starts `setInterval` timers in Node.js runtime
- **Memory Monitoring**: Only monitors real memory usage in Node.js runtime
- **Health Checks**: Memory-based health checks are skipped in Edge Runtime

### 3. Middleware Options

Two middleware configurations are available:

#### Option A: Node.js Runtime (Current - `middleware.ts`)
```typescript
export const config = {
  runtime: 'nodejs', // Force Node.js for full monitoring
  matcher: [...]
}
```

#### Option B: Edge Runtime (`middleware.edge.ts`)
```typescript
export const config = {
  runtime: 'edge', // Use Edge Runtime with limited monitoring
  matcher: [...]
}
```

## Files Modified

### Core Monitoring (`lib/monitoring.ts`)
- ✅ Added runtime detection utilities
- ✅ Made memory usage calls safe
- ✅ Conditional periodic collection
- ✅ Conditional health checks

### Middleware (`middleware.ts`)
- ✅ Explicitly set `runtime: 'nodejs'` 
- ✅ Full monitoring features available

### Health API (`app/api/health/route.ts`)
- ✅ Made memory checks Edge-compatible
- ✅ Graceful fallback for unsupported APIs

### Alternative Edge Middleware (`middleware.edge.ts`)
- ✅ New simplified Edge-compatible version
- ✅ Basic security headers and rate limiting
- ✅ No Node.js dependencies

## Usage

### For Full Monitoring (Recommended)
Keep using the current setup with `middleware.ts`. This provides:
- Full memory monitoring
- Periodic system metrics collection
- Complete health checks
- All enterprise monitoring features

### For Edge Runtime
If you need Edge Runtime for performance:
1. Rename `middleware.ts` to `middleware.node.ts` 
2. Rename `middleware.edge.ts` to `middleware.ts`
3. Deploy with Edge Runtime benefits but limited monitoring

## Testing

Run the compatibility test:

```bash
npx tsx scripts/test-edge-compatibility.ts
```

This verifies that:
- Monitoring works in Node.js runtime
- Monitoring gracefully degrades in Edge Runtime
- No runtime errors occur in either environment

## Trade-offs

### Node.js Runtime (Current)
✅ Full monitoring and logging features  
✅ Real memory usage tracking  
✅ Periodic system metrics  
❌ Slightly slower cold starts  

### Edge Runtime
✅ Faster cold starts  
✅ Better scalability  
✅ Lower resource usage  
❌ Limited monitoring capabilities  
❌ No real memory tracking  
❌ No periodic background tasks  

## Deployment Status

- ✅ **Current**: Uses Node.js runtime for full features
- ✅ **Ready**: Edge Runtime option available if needed
- ✅ **Compatible**: Both runtimes supported

The monitoring system is now **production-ready** for Vercel deployment without `process.memoryUsage()` errors.
