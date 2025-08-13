/**
 * Pricing Data Service for 404Studios
 * Pure static data service for agency website
 */

// Import static data
import { pricingData } from '../../features/pricing/data/pricingData';
import { businessTypes } from '../../features/pricing/data/businessTypes';

// Import types
import type { PricingData } from '../../features/pricing/types/pricing.types';
import type { BusinessConfiguration } from '../../features/pricing/types/pricing.types';

/**
 * Get all pricing features
 */
export function getPricingData(): PricingData {
  return pricingData;
}

/**
 * Get business types with pricing configuration
 */
export function getBusinessTypes(): Record<string, BusinessConfiguration> {
  return businessTypes;
}
