"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// A/B Test Configuration
interface ABTestConfig {
  homepageCTA: {
    variant: "A" | "B"
    trackClick: () => void
  }
  pricingLayout: {
    variant: "vertical" | "horizontal"
    trackView: () => void
  }
  contactForm: {
    variant: "standard" | "extended"
    trackSubmit: () => void
  }
}

const ABTestContext = createContext<ABTestConfig | null>(null)

export function ABTestProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ABTestConfig>({
    homepageCTA: {
      variant: "A",
      trackClick: () => {},
    },
    pricingLayout: {
      variant: "vertical",
      trackView: () => {},
    },
    contactForm: {
      variant: "standard",
      trackSubmit: () => {},
    },
  })

  useEffect(() => {
    // Initialize A/B tests
    const homepageCTAVariant = Math.random() > 0.5 ? "A" : "B"
    const pricingLayoutVariant = Math.random() > 0.5 ? "vertical" : "horizontal"
    const contactFormVariant = Math.random() > 0.5 ? "standard" : "extended"

    // Store in localStorage for consistency
    localStorage.setItem("ab_homepage_cta", homepageCTAVariant)
    localStorage.setItem("ab_pricing_layout", pricingLayoutVariant)
    localStorage.setItem("ab_contact_form", contactFormVariant)

    setConfig({
      homepageCTA: {
        variant: homepageCTAVariant,
        trackClick: () => {
          // Track CTA click
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "ab_test_cta_click", {
              variant: homepageCTAVariant,
              event_category: "ab_test",
            })
          }
        },
      },
      pricingLayout: {
        variant: pricingLayoutVariant,
        trackView: () => {
          // Track pricing page view
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "ab_test_pricing_view", {
              variant: pricingLayoutVariant,
              event_category: "ab_test",
            })
          }
        },
      },
      contactForm: {
        variant: contactFormVariant,
        trackSubmit: () => {
          // Track contact form submit
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "ab_test_contact_submit", {
              variant: contactFormVariant,
              event_category: "ab_test",
            })
          }
        },
      },
    })
  }, [])

  return <ABTestContext.Provider value={config}>{children}</ABTestContext.Provider>
}

export function useBusinessABTests() {
  const context = useContext(ABTestContext)
  if (!context) {
    throw new Error("useBusinessABTests must be used within ABTestProvider")
  }
  return context
}
