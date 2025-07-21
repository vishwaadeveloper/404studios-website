export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  preferredPackage: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'location' | 'hours';
  label: string;
  value: string | string[];
  icon: string;
  color: string;
}

export interface FormStep {
  step: number;
  title: string;
  isValid: boolean;
}
