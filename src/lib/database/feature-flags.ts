/**
 * Feature Flag Manager for 404Studios Migration
 * Controls the gradual migration from static data to database
 */

import { prisma } from './client';

export interface FeatureFlagConfig {
  useDatabasePricing: boolean;
  useDatabaseServices: boolean;
  useDatabaseContact: boolean;
  useDatabaseFeatures: boolean;
}

/**
 * Get feature flags from database or fallback to safe defaults
 */
export async function getFeatureFlags(): Promise<FeatureFlagConfig> {
  try {
    const flags = await prisma.featureFlag.findMany({
      select: {
        name: true,
        isEnabled: true,
      },
    });

    const flagMap = new Map(flags.map(flag => [flag.name, flag.isEnabled]));

    return {
      useDatabasePricing: flagMap.get('use_database_pricing') || false,
      useDatabaseServices: flagMap.get('use_database_services') || false,
      useDatabaseContact: flagMap.get('use_database_contact') || false,
      useDatabaseFeatures: flagMap.get('use_database_features') || false,
    };
  } catch (error) {
    console.warn('Failed to load feature flags, using safe defaults:', error);
    // Safe defaults - use static data during migration
    return {
      useDatabasePricing: false,
      useDatabaseServices: false,
      useDatabaseContact: false,
      useDatabaseFeatures: false,
    };
  }
}

/**
 * Update a specific feature flag
 */
export async function updateFeatureFlag(name: string, isEnabled: boolean): Promise<void> {
  try {
    await prisma.featureFlag.upsert({
      where: { name },
      update: { isEnabled },
      create: { 
        name, 
        isEnabled,
        description: `Auto-generated flag for ${name}`,
      },
    });
  } catch (error) {
    console.error(`Failed to update feature flag ${name}:`, error);
    throw error;
  }
}

/**
 * Enable gradual migration phases
 */
export async function enableMigrationPhase(phase: 'features' | 'services' | 'contact' | 'pricing'): Promise<void> {
  const flagName = `use_database_${phase}`;
  await updateFeatureFlag(flagName, true);
  console.log(`✅ Enabled database for ${phase}`);
}

/**
 * Rollback to static data for a specific phase
 */
export async function rollbackMigrationPhase(phase: 'features' | 'services' | 'contact' | 'pricing'): Promise<void> {
  const flagName = `use_database_${phase}`;
  await updateFeatureFlag(flagName, false);
  console.log(`🔄 Rolled back to static data for ${phase}`);
}
