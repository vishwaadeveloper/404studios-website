import { useState } from 'react';
import { featureCatalogData } from '../data/featureCatalogData';
import { FeatureCatalog } from '../types/features.types';

interface UseFeaturesCatalogReturn {
  featureCatalog: FeatureCatalog;
  openSections: string[];
  openFeatures: string[];
  toggleSection: (sectionId: string) => void;
  toggleFeature: (featureId: string) => void;
  isOpen: (items: string[], id: string) => boolean;
}

export const useFeaturesCatalog = (): UseFeaturesCatalogReturn => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [openFeatures, setOpenFeatures] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleFeature = (featureId: string) => {
    setOpenFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const isOpen = (items: string[], id: string) => items.includes(id);

  return {
    featureCatalog: featureCatalogData,
    openSections,
    openFeatures,
    toggleSection,
    toggleFeature,
    isOpen
  };
};
