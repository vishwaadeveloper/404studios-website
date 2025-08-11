'use client'

import React from 'react'
import { ABTestProvider } from '@/lib/abTesting'
import { PWAInstallPrompt, OfflineIndicator, PWAUpdatePrompt } from '@/components/pwa/PWAComponents'
import ClientInit from '@/components/ClientInit'

/**
 * Provider component that wraps the app with all necessary providers
 * and initializes client-side features
 */
interface AppProvidersProps {
  children: React.ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ABTestProvider>
      <ClientInit />
      {children}
      
      {/* PWA Components */}
      <PWAInstallPrompt />
      <OfflineIndicator />
      <PWAUpdatePrompt />
    </ABTestProvider>
  )
}
