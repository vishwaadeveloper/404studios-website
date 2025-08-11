"use client"

import { useEffect } from 'react'
import Head from 'next/head'

interface PreloadResource {
  href: string
  as: 'script' | 'style' | 'font' | 'image' | 'fetch'
  type?: string
  crossOrigin?: 'anonymous' | 'use-credentials'
  media?: string
}

interface ResourcePreloaderProps {
  resources: PreloadResource[]
  priority?: 'high' | 'low' | 'auto'
}

/**
 * ResourcePreloader - Intelligent resource preloading
 * Improves LCP and reduces loading times
 */
export const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  resources,
  priority = 'high'
}) => {
  return (
    <Head>
      {resources.map((resource, index) => (
        <link
          key={`${resource.href}-${index}`}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossOrigin}
          media={resource.media}
          // @ts-ignore - fetchPriority is not in TypeScript types yet
          fetchPriority={priority}
        />
      ))}
    </Head>
  )
}

/**
 * FontPreloader - Optimized font preloading
 * Prevents layout shift and improves CLS
 */
export const FontPreloader: React.FC<{
  fonts: Array<{
    href: string
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  }>
}> = ({ fonts }) => {
  return (
    <Head>
      {fonts.map((font, index) => (
        <link
          key={`font-${index}`}
          rel="preload"
          href={font.href}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
      <style jsx global>{`
        @font-face {
          font-display: swap;
        }
      `}</style>
    </Head>
  )
}

/**
 * Critical CSS Inliner Hook
 * Inlines critical CSS for above-the-fold content
 */
export const useCriticalCSS = (criticalCSS?: string) => {
  useEffect(() => {
    if (!criticalCSS || typeof window === 'undefined') return

    // Create critical CSS style element
    const styleElement = document.createElement('style')
    styleElement.textContent = criticalCSS
    styleElement.setAttribute('data-critical', 'true')
    
    // Insert before any other stylesheets
    const firstLink = document.querySelector('link[rel="stylesheet"]')
    if (firstLink) {
      document.head.insertBefore(styleElement, firstLink)
    } else {
      document.head.appendChild(styleElement)
    }

    return () => {
      const criticalStyles = document.querySelectorAll('style[data-critical="true"]')
      criticalStyles.forEach(style => style.remove())
    }
  }, [criticalCSS])
}

/**
 * Intelligent Image Preloader
 * Preloads images based on viewport and user behavior
 */
export const useImagePreloader = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const imageElements = document.querySelectorAll('img[data-preload]')
    
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const preloadSrc = img.dataset.preload
            
            if (preloadSrc) {
              const link = document.createElement('link')
              link.rel = 'preload'
              link.as = 'image'
              link.href = preloadSrc
              document.head.appendChild(link)
              
              imageObserver.unobserve(img)
            }
          }
        })
      },
      { rootMargin: '100px' }
    )

    imageElements.forEach(img => imageObserver.observe(img))

    return () => imageObserver.disconnect()
  }, [])
}

/**
 * Connection Preloader
 * Pre-establishes connections to external domains
 */
export const ConnectionPreloader: React.FC<{
  domains: string[]
}> = ({ domains }) => {
  return (
    <Head>
      {domains.map(domain => (
        <link
          key={domain}
          rel="preconnect"
          href={domain}
          crossOrigin="anonymous"
        />
      ))}
    </Head>
  )
}

/**
 * Route Prefetcher
 * Intelligently prefetches likely next routes
 */
export const usePrefetchRoutes = (routes: string[]) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefetchRoute = (route: string) => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = route
      document.head.appendChild(link)
    }

    // Prefetch on mouse enter or touch start
    const handleInteraction = (event: Event) => {
      const target = event.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.href) {
        const route = new URL(target.href).pathname
        if (routes.includes(route)) {
          prefetchRoute(route)
        }
      }
    }

    document.addEventListener('mouseenter', handleInteraction, true)
    document.addEventListener('touchstart', handleInteraction, true)

    return () => {
      document.removeEventListener('mouseenter', handleInteraction, true)
      document.removeEventListener('touchstart', handleInteraction, true)
    }
  }, [routes])
}

export default ResourcePreloader
