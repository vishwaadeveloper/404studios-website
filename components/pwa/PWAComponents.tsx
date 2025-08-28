"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Download, Wifi, WifiOff } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

/**
 * PWA Install Prompt Component
 */
export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setShowInstallPrompt(false)
    }
    
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Remember user dismissed for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  // Don't show if already installed or recently dismissed
  if (isInstalled || !showInstallPrompt) return null

  const dismissedTime = localStorage.getItem('pwa-install-dismissed')
  if (dismissedTime && Date.now() - parseInt(dismissedTime) < 7 * 24 * 60 * 60 * 1000) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-r from-cyan-900/95 to-purple-900/95 backdrop-blur-lg border border-cyan-500/20 rounded-lg p-4 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start space-x-3">
          <div className="bg-cyan-500/20 rounded-full p-2 flex-shrink-0">
            <Download className="w-5 h-5 text-cyan-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-1">
              Install 404studios
            </h3>
            <p className="text-gray-300 text-xs mb-3">
              Get faster access and offline capabilities
            </p>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs"
              >
                Install
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white text-xs"
              >
                Not now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Offline Status Indicator
 */
export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineMessage(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineMessage(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Set initial state
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showOfflineMessage) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-r from-orange-900/95 to-red-900/95 backdrop-blur-lg border border-orange-500/20 rounded-lg p-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500/20 rounded-full p-2 flex-shrink-0">
            <WifiOff className="w-5 h-5 text-orange-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-1">
              You&apos;re offline
            </h3>
            <p className="text-gray-300 text-xs">
              Some features may be limited while offline
            </p>
          </div>
          
          <button
            onClick={() => setShowOfflineMessage(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * PWA Update Prompt
 */
export const PWAUpdatePrompt: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })

      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker)
                setShowUpdatePrompt(true)
              }
            })
          }
        })
      })
    }
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
      setShowUpdatePrompt(false)
    }
  }

  if (!showUpdatePrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-r from-green-900/95 to-blue-900/95 backdrop-blur-lg border border-green-500/20 rounded-lg p-4 shadow-2xl">
        <div className="flex items-start space-x-3">
          <div className="bg-green-500/20 rounded-full p-2 flex-shrink-0">
            <Download className="w-5 h-5 text-green-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-1">
              Update Available
            </h3>
            <p className="text-gray-300 text-xs mb-3">
              A new version of the app is ready to install
            </p>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleUpdate}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white text-xs"
              >
                Update
              </Button>
              <Button
                onClick={() => setShowUpdatePrompt(false)}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white text-xs"
              >
                Later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * PWA Hook for managing all PWA functionality
 */
export const usePWA = () => {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    // Check installation status
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Check online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return {
    isInstalled,
    isOnline,
    updateAvailable,
  }
}

export default {
  PWAInstallPrompt,
  OfflineIndicator,
  PWAUpdatePrompt,
  usePWA,
}
