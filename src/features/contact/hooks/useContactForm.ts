import { useState } from 'react';
import { ContactFormData, TimeSlot } from '../types/contact.types';
import { 
  contactInfo, 
  availableTimeSlots, 
  projectTypes, 
  budgetRanges, 
  timelineOptions, 
  packageOptions 
} from '../data/contactData';

interface UseContactFormReturn {
  // Form State
  formData: ContactFormData;
  currentStep: number;
  selectedTimeSlot: string | null;
  
  // Form Actions
  handleInputChange: (field: keyof ContactFormData, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  setSelectedTimeSlot: (slotId: string | null) => void;
  
  // Data
  contactInfo: typeof contactInfo;
  availableTimeSlots: TimeSlot[];
  projectTypes: typeof projectTypes;
  budgetRanges: typeof budgetRanges;
  timelineOptions: typeof timelineOptions;
  packageOptions: typeof packageOptions;
  
  // Computed Properties
  isStepValid: (step: number) => boolean;
  totalSteps: number;
  selectedSlot: TimeSlot | undefined;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
  preferredPackage: "",
};

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const totalSteps = 3;

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(formData.name && formData.email);
      case 2:
        return Boolean(formData.projectType);
      case 3:
        return Boolean(formData.description);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      selectedTimeSlot,
      submittedAt: new Date().toISOString()
    };
    
    // Handle form submission
    console.log("Form submitted:", submissionData);
    
    // Here you would typically send the data to your backend
    // For now, we'll just log it
    alert("Thank you for your submission! We'll get back to you soon.");
  };

  const selectedSlot = availableTimeSlots.find(slot => slot.id === selectedTimeSlot);

  return {
    // Form State
    formData,
    currentStep,
    selectedTimeSlot,
    
    // Form Actions
    handleInputChange,
    nextStep,
    prevStep,
    handleSubmit,
    setSelectedTimeSlot,
    
    // Data
    contactInfo,
    availableTimeSlots,
    projectTypes,
    budgetRanges,
    timelineOptions,
    packageOptions,
    
    // Computed Properties
    isStepValid,
    totalSteps,
    selectedSlot
  };
};
