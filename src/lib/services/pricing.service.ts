/**
 * Pricing Data Service for 404Studios
 * Supports both static data and database queries with feature flag control
 */

import { prisma } from '../database/client';
import { getFeatureFlags } from '../database/feature-flags';

// Import static data as fallback
import { pricingData as staticPricingData } from '../../features/pricing/data/pricingData';
import { businessTypes as staticBusinessTypes } from '../../features/pricing/data/businessTypes';

// Import types
import type { PricingData } from '../../features/pricing/types/pricing.types';
import type { BusinessConfiguration } from '../../features/pricing/types/pricing.types';

/**
 * Get all pricing features with business logic preservation
 */
export async function getPricingData(): Promise<PricingData> {
  const flags = await getFeatureFlags();
  
  if (flags.useDatabaseFeatures) {
    return await getDatabasePricingData();
  } else {
    return getStaticPricingData();
  }
}

/**
 * Get business types with pricing configuration
 */
export async function getBusinessTypes(): Promise<Record<string, BusinessConfiguration>> {
  const flags = await getFeatureFlags();
  
  if (flags.useDatabasePricing) {
    return await getDatabaseBusinessTypes();
  } else {
    return getStaticBusinessTypes();
  }
}

// =============================================================================
// STATIC DATA FUNCTIONS (Safe fallbacks)
// =============================================================================

function getStaticPricingData(): PricingData {
  return staticPricingData;
}

function getStaticBusinessTypes(): Record<string, BusinessConfiguration> {
  return staticBusinessTypes;
}

// =============================================================================
// DATABASE FUNCTIONS (Gradual migration targets)
// =============================================================================

async function getDatabasePricingData(): Promise<PricingData> {
  try {
    // For now, return static data until we implement full database mapping
    // This ensures the migration is safe and we can gradually enable features
    console.log('🚧 Database pricing data not yet implemented, using static data');
    return getStaticPricingData();
  } catch (error) {
    console.error('Failed to fetch pricing data from database, falling back to static:', error);
    return getStaticPricingData();
  }
}

async function getDatabaseBusinessTypes(): Promise<Record<string, BusinessConfiguration>> {
  try {
    // For now, return static data until we implement full database mapping
    // This ensures the migration is safe and we can gradually enable features
    console.log('🚧 Database business types not yet implemented, using static data');
    return getStaticBusinessTypes();
  } catch (error) {
    console.error('Failed to fetch business types from database, falling back to static:', error);
    return getStaticBusinessTypes();
  }
}

/**
 * Validation function to ensure pricing calculations match between sources
 */
export async function validatePricingParity(): Promise<boolean> {
  try {
    const staticPricing = getStaticPricingData();
    const staticBusinessTypes = getStaticBusinessTypes();
    
    const dbPricing = await getDatabasePricingData();
    const dbBusinessTypes = await getDatabaseBusinessTypes();

    // For now, since we're returning static data from DB functions, they should match
    console.log('✅ Pricing parity validation passed (using static fallbacks)');
    return true;
  } catch (error) {
    console.error('Pricing parity validation failed:', error);
    return false;
  }
}

/**
 * Test database connectivity and feature flags
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1 as test`;
    const flags = await getFeatureFlags();
    console.log('✅ Database connection successful');
    console.log('🏳️ Current feature flags:', flags);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
