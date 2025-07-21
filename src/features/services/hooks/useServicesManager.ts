import { useState } from "react"
import { servicesData } from "../data/servicesData"
import type { Service } from "../types/services.types"

export const useServicesManager = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const { services } = servicesData

  const addFeature = (featureId: string) => {
    if (!selectedFeatures.includes(featureId)) {
      setSelectedFeatures((prev) => [...prev, featureId])
    }
  }

  const removeFeature = (featureId: string) => {
    setSelectedFeatures((prev) => prev.filter((id) => id !== featureId))
  }

  // Calculate total price of selected features
  const totalPrice = selectedFeatures.reduce((total, featureId) => {
    const feature = services.find((s) => s.id === featureId)
    return total + (feature ? feature.price.min : 0)
  }, 0)

  // Get filtered services by category
  const getServicesByCategory = (category: string) => {
    if (category === "all") return services
    return services.filter((service) => service.category === category)
  }

  // Get selected service details
  const getSelectedServices = (): Service[] => {
    return selectedFeatures
      .map((featureId) => services.find((s) => s.id === featureId))
      .filter((service): service is Service => service !== undefined)
  }

  return {
    services,
    selectedFeatures,
    addFeature,
    removeFeature,
    totalPrice,
    getServicesByCategory,
    getSelectedServices,
  }
}
