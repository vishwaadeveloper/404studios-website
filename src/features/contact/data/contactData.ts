import { ContactInfo, TimeSlot } from '../types/contact.types';

export const contactInfo: ContactInfo[] = [
  {
    type: 'email',
    label: 'Email',
    value: ['vishwaadeveloper@gmail.com', 'abinayaa.dev@gmail.com'],
    icon: 'Mail',
    color: 'cyan'
  },
  {
    type: 'phone',
    label: 'Phone',
    value: ['+91 7845890089', '+91 9489153545'],
    icon: 'Phone',
    color: 'purple'
  },
  {
    type: 'location',
    label: 'Location',
    value: 'Coimbatore, India',
    icon: 'MapPin',
    color: 'pink'
  },
  {
    type: 'hours',
    label: 'Business Hours',
    value: 'Mon - Sun: 9:00 AM - 9:00 PM',
    icon: 'Clock',
    color: 'cyan'
  }
];

export const availableTimeSlots: TimeSlot[] = [
  { id: "1", date: "Dec 20", time: "10:00 AM" },
  { id: "2", date: "Dec 20", time: "2:00 PM" },
  { id: "3", date: "Dec 21", time: "11:00 AM" },
  { id: "4", date: "Dec 21", time: "3:00 PM" },
  { id: "5", date: "Dec 22", time: "9:00 AM" },
  { id: "6", date: "Dec 22", time: "1:00 PM" },
];

export const projectTypes = [
  { value: 'website', label: 'Website' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'redesign', label: 'Redesign' },
  { value: 'other', label: 'Other' }
];

export const budgetRanges = [
  { value: 'under-5k', label: 'Under ₹5,000' },
  { value: '5k-10k', label: '₹5,000 - ₹10,000' },
  { value: '10k-25k', label: '₹10,000 - ₹25,000' },
  { value: '25k-50k', label: '₹25,000 - ₹50,000' },
  { value: '50k-100k', label: '₹50,000 - ₹100,000' },
  { value: 'above-100k', label: 'Above ₹100,000' }
];

export const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-2-weeks', label: '1-2 weeks' },
  { value: '2-4-weeks', label: '2-4 weeks' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '2-3-months', label: '2-3 months' },
  { value: 'flexible', label: 'Flexible' }
];

export const packageOptions = [
  { value: 'basic', label: 'Basic Package' },
  { value: 'standard', label: 'Standard Package' },
  { value: 'advanced', label: 'Advanced Package' },
  { value: 'custom', label: 'Custom Solution' },
  { value: 'not-sure', label: 'Not Sure Yet' }
];
