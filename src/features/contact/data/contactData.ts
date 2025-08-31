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
  { value: 'ai-website-development', label: 'AI Website Development' },
  { value: 'mobile-app-ai', label: 'Mobile App with AI Features' },
  { value: 'business-process-automation', label: 'Business Process Automation' },
  { value: 'custom-ai-agent', label: 'Custom AI Agent Development' },
  { value: 'intelligent-chatbot', label: 'Intelligent Chatbot Implementation' },
  { value: 'legacy-ai-enhancement', label: 'Legacy System AI Enhancement' },
  { value: 'workflow-automation', label: 'Workflow Automation' },
  { value: 'ecommerce-ai-integration', label: 'E-commerce AI Integration' },
  { value: 'other', label: 'Other / Not Listed' }
];

export const budgetRanges = [
  { value: '15k-35k', label: '₹15,000 - ₹35,000 (AI Starter)' },
  { value: '35k-65k', label: '₹35,000 - ₹65,000 (AI Professional)' },
  { value: '65k-100k', label: '₹65,000 - ₹1,00,000 (AI Professional Plus)' },
  { value: '100k+', label: '₹1,00,000+ (AI Enterprise)' }
];

export const timelineOptions = [
  { value: '1-2-weeks', label: '1-2 weeks (AI Rapid)' },
  { value: '2-4-weeks', label: '2-4 weeks (AI Standard)' },
  { value: '1-2-months', label: '1-2 months (AI Enterprise)' },
  { value: '2plus-months', label: '2+ months (Custom AI Solutions)' },
  { value: 'flexible', label: 'Flexible / Not Sure' }
];

export const packageOptions = [
  { value: 'ai-starter', label: 'AI-Starter Package' },
  { value: 'ai-professional', label: 'AI-Professional Package' },
  { value: 'ai-enterprise', label: 'AI-Enterprise Package' },
  { value: 'custom', label: 'Custom AI Solution' },
  { value: 'not-sure', label: 'Not Sure Yet' }
];
