import { ReactNode } from 'react';

export interface FeatureTier {
  tier: 'Basic' | 'Standard' | 'Advanced';
  include: string;
}

export interface Feature {
  feature: string;
  explanation: string;
  tiers: FeatureTier[];
}

export interface FeatureGroup {
  group: string;
  icon: ReactNode;
  description: string;
  features: Feature[];
}

export type FeatureCatalog = FeatureGroup[];
