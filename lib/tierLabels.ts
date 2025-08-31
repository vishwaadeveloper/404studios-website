// Internal tiers remain "Basic" | "Standard" | "Advanced" to avoid broad refactors.
// This mapping provides public-facing AI package names.

export const tierPublicLabels: Record<string, { short: string; full: string } > = {
  Basic: { short: 'AI Starter', full: 'AI Starter (Foundational Enablement)' },
  Standard: { short: 'AI Professional', full: 'AI Professional (Growth & Automation)' },
  Advanced: { short: 'AI Enterprise', full: 'AI Enterprise (Intelligent Scale)' }
}

export function getTierLabel(tier: string, variant: 'short' | 'full' = 'short') {
  return tierPublicLabels[tier]?.[variant] ?? tier
}
