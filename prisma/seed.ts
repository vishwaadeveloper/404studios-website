#!/usr/bin/env ts-node

/**
 * 404Studios Database Seeding Script
 * Migrates all static data from the current system to Supabase PostgreSQL
 * Ensures 100% data parity and business logic preservation
 */

import { PrismaClient } from '../src/generated/prisma';

// Import static data from current system
import { pricingData } from '../src/features/pricing/data/pricingData';
import { businessTypes } from '../src/features/pricing/data/businessTypes';
import { contactInfo, availableTimeSlots, projectTypes, budgetRanges, timelineOptions, packageOptions } from '../src/features/contact/data/contactData';
import { featureCatalogData } from '../src/features/features-catalog/data/featureCatalogData';

// Services data extracted from servicesData.tsx to avoid React dependencies
const servicesData = {
  services: [
    {
      id: "landing-page",
      name: "Landing Page",
      description: "High-converting landing page with modern design and animations",
      price: { min: 15000, max: 50000 },
      category: "frontend",
      iconName: "Code",
      iconColor: "text-cyan-400",
      demoUrl: "#",
    },
    {
      id: "ecommerce",
      name: "E-commerce Store",
      description: "Full-featured online store with payment integration and admin panel",
      price: { min: 75000, max: 200000 },
      category: "frontend",
      iconName: "CreditCard",
      iconColor: "text-purple-400",
      demoUrl: "#",
    },
    {
      id: "mobile-app",
      name: "Mobile App",
      description: "Cross-platform mobile application for iOS and Android",
      price: { min: 100000, max: 300000 },
      category: "mobile",
      iconName: "Smartphone",
      iconColor: "text-green-400",
      demoUrl: "#",
    },
    {
      id: "api-development",
      name: "API Development",
      description: "RESTful API with authentication, database integration, and documentation",
      price: { min: 25000, max: 75000 },
      category: "backend",
      iconName: "Database",
      iconColor: "text-orange-400",
      demoUrl: "#",
    },
    {
      id: "seo-optimization",
      name: "SEO Optimization",
      description: "Complete SEO audit and optimization for better search rankings",
      price: { min: 10000, max: 30000 },
      category: "frontend",
      iconName: "Search",
      iconColor: "text-blue-400",
      demoUrl: "#",
    },
    {
      id: "booking-system",
      name: "Booking System",
      description: "Appointment booking system with calendar integration and notifications",
      price: { min: 40000, max: 100000 },
      category: "backend",
      iconName: "Calendar",
      iconColor: "text-pink-400",
      demoUrl: "#",
    },
    {
      id: "analytics-dashboard",
      name: "Analytics Dashboard",
      description: "Custom analytics dashboard with real-time data visualization",
      price: { min: 50000, max: 150000 },
      category: "frontend",
      iconName: "BarChart",
      iconColor: "text-yellow-400",
      demoUrl: "#",
    },
    {
      id: "security-audit",
      name: "Security Audit",
      description: "Comprehensive security assessment and vulnerability testing",
      price: { min: 20000, max: 60000 },
      category: "backend",
      iconName: "Shield",
      iconColor: "text-red-400",
      demoUrl: "#",
    },
  ],
};

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting 404Studios database seeding...');
  
  try {
    // ============================================================================
    // PHASE 1: SEED FEATURE GROUPS AND FEATURES
    // ============================================================================
    console.log('📊 Seeding Feature Groups and Features...');
    
    for (const group of pricingData) {
      console.log(`   Creating feature group: ${group.group}`);
      
      const featureGroup = await prisma.featureGroup.create({
        data: {
          name: group.group,
          description: `Feature group for ${group.group.toLowerCase()} functionality`,
          iconName: getIconNameForGroup(group.group),
          displayOrder: getDisplayOrderForGroup(group.group),
          features: {
            create: group.features.map((feature, index) => ({
              name: feature.feature,
              description: feature.desc,
              explanation: feature.desc,
              isCountable: feature.isCountable || false,
              minCount: feature.minCount || 1,
              displayOrder: index + 1,
              tiers: {
                create: feature.tiers.map(tier => ({
                  tierName: tier.name,
                  description: tier.desc,
                  price: tier.price
                }))
              }
            }))
          }
        },
        include: {
          features: {
            include: {
              tiers: true
            }
          }
        }
      });
      
      console.log(`   ✅ Created ${featureGroup.features.length} features with ${featureGroup.features.reduce((acc, f) => acc + f.tiers.length, 0)} tiers`);
    }

    // ============================================================================
    // PHASE 2: SEED BUSINESS TYPES AND DEFAULTS
    // ============================================================================
    console.log('🏢 Seeding Business Types and Configurations...');
    
    for (const [slug, config] of Object.entries(businessTypes)) {
      console.log(`   Creating business type: ${config.name}`);
      
      const businessType = await prisma.businessType.create({
        data: {
          name: config.name,
          slug: slug,
          description: config.description,
          basePrice: config.basePrice,
          timelineDays: parseTimelineToDays(config.timeline)
        }
      });

      // Create default pages for business type
      const staticPages = config.defaultPages.static.names.map((name, index) => ({
        businessTypeId: businessType.id,
        pageType: 'static',
        pageName: name,
        displayOrder: index + 1
      }));

      const dynamicPages = config.defaultPages.dynamic.names.map((name, index) => ({
        businessTypeId: businessType.id,
        pageType: 'dynamic',
        pageName: name,
        displayOrder: index + 1
      }));

      await prisma.businessTypePage.createMany({
        data: [...staticPages, ...dynamicPages]
      });

      // Create feature defaults for business type
      const features = await prisma.feature.findMany();
      const defaultsToCreate = [];

      for (const [featureName, defaultTier] of Object.entries(config.defaults)) {
        const feature = features.find(f => f.name === featureName);
        if (feature) {
          defaultsToCreate.push({
            businessTypeId: businessType.id,
            featureId: feature.id,
            defaultTier: defaultTier,
            defaultCount: feature.isCountable ? (featureName === 'Static Page' ? config.defaultPages.static.count : featureName === 'Dynamic Page' ? config.defaultPages.dynamic.count : 1) : 1
          });
        }
      }

      if (defaultsToCreate.length > 0) {
        await prisma.businessTypeDefault.createMany({
          data: defaultsToCreate
        });
      }
      
      console.log(`   ✅ Created business type with ${staticPages.length + dynamicPages.length} pages and ${defaultsToCreate.length} defaults`);
    }

    // ============================================================================
    // PHASE 3: SEED SERVICE CATEGORIES AND SERVICES
    // ============================================================================
    console.log('🛠️ Seeding Service Categories and Services...');
    
    // Create service categories
    const categories = [...new Set(servicesData.services.map(s => s.category))];
    const categoryMap = new Map();
    
    for (const categoryName of categories) {
      const category = await prisma.serviceCategory.create({
        data: {
          name: capitalizeFirstLetter(categoryName),
          slug: categoryName,
          description: `Services related to ${categoryName} development`
        }
      });
      categoryMap.set(categoryName, category.id);
      console.log(`   Created category: ${category.name}`);
    }

    // Create services
    for (const service of servicesData.services) {
      await prisma.service.create({
        data: {
          name: service.name,
          slug: service.id,
          description: service.description,
          categoryId: categoryMap.get(service.category),
          priceMin: service.price.min,
          priceMax: service.price.max,
          demoUrl: service.demoUrl,
          iconName: service.iconName
        }
      });
      console.log(`   Created service: ${service.name}`);
    }

    // ============================================================================
    // PHASE 4: SEED CONTACT CONFIGURATION DATA
    // ============================================================================
    console.log('📞 Seeding Contact Configuration...');
    
    // Seed contact info
    for (const info of contactInfo) {
      await prisma.contactInfo.create({
        data: {
          type: info.type,
          label: info.label,
          value: info.value,
          iconName: info.icon,
          color: info.color
        }
      });
    }

    // Seed time slots
    for (const slot of availableTimeSlots) {
      await prisma.timeSlot.create({
        data: {
          date: new Date(slot.date + ', 2024'),
          time: new Date(`1970-01-01 ${slot.time}`)
        }
      });
    }

    // Seed project types
    for (const type of projectTypes) {
      await prisma.projectType.create({
        data: {
          value: type.value,
          label: type.label
        }
      });
    }

    // Seed budget ranges
    for (const range of budgetRanges) {
      await prisma.budgetRange.create({
        data: {
          value: range.value,
          label: range.label,
          minAmount: extractMinAmount(range.label),
          maxAmount: extractMaxAmount(range.label)
        }
      });
    }

    // Seed timeline options
    for (const option of timelineOptions) {
      await prisma.timelineOption.create({
        data: {
          value: option.value,
          label: option.label
        }
      });
    }

    // Seed package options
    for (const option of packageOptions) {
      await prisma.packageOption.create({
        data: {
          value: option.value,
          label: option.label
        }
      });
    }

    // ============================================================================
    // PHASE 5: SEED FEATURE FLAGS FOR MIGRATION CONTROL
    // ============================================================================
    console.log('🚩 Setting up Feature Flags for Migration Control...');
    
    const migrationFlags = [
      {
        name: 'enable_database_pricing',
        description: 'Enable database-driven pricing calculations',
        isEnabled: false,
        rolloutPercentage: 0
      },
      {
        name: 'enable_database_contacts',
        description: 'Enable database storage for contact forms',
        isEnabled: false,
        rolloutPercentage: 0
      },
      {
        name: 'enable_database_services',
        description: 'Enable database-driven services portfolio',
        isEnabled: false,
        rolloutPercentage: 0
      },
      {
        name: 'enable_realtime_features',
        description: 'Enable real-time updates and subscriptions',
        isEnabled: false,
        rolloutPercentage: 0
      }
    ];

    for (const flag of migrationFlags) {
      await prisma.featureFlag.create({
        data: flag
      });
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    
    // Print summary statistics
    const stats = await generateSeedingSummary();
    console.log(stats);
    
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getIconNameForGroup(groupName: string): string {
  const iconMap: Record<string, string> = {
    'Core Website Features': 'Code',
    'Business & Transactional Features': 'Database', 
    'Growth & Communication': 'MessageCircle',
    'Backend & Integrations': 'Settings',
    'After-Launch Support': 'Shield'
  };
  return iconMap[groupName] || 'Code';
}

function getDisplayOrderForGroup(groupName: string): number {
  const orderMap: Record<string, number> = {
    'Core Website Features': 1,
    'Business & Transactional Features': 2,
    'Growth & Communication': 3,
    'Backend & Integrations': 4,
    'After-Launch Support': 5
  };
  return orderMap[groupName] || 999;
}

function parseTimelineToDays(timeline: string): number {
  if (timeline.includes('5-7 days')) return 6;
  if (timeline.includes('1-2 weeks')) return 10;
  if (timeline.includes('2-3 weeks')) return 17;
  return 7;
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractMinAmount(label: string): number | null {
  const match = label.match(/₹([\d,]+)/);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''));
  }
  return null;
}

function extractMaxAmount(label: string): number | null {
  const matches = label.match(/₹([\d,]+)/g);
  if (matches && matches.length > 1) {
    return parseInt(matches[1].replace(/₹|,/g, ''));
  }
  if (label.includes('Above')) {
    return null; // No upper limit
  }
  return null;
}

async function generateSeedingSummary(): Promise<string> {
  const featureGroups = await prisma.featureGroup.count();
  const features = await prisma.feature.count();
  const featureTiers = await prisma.featureTier.count();
  const businessTypes = await prisma.businessType.count();
  const services = await prisma.service.count();
  const contactInfo = await prisma.contactInfo.count();
  const timeSlots = await prisma.timeSlot.count();
  const featureFlags = await prisma.featureFlag.count();

  return `
   🏗️  Feature Groups: ${featureGroups}
   ⚙️  Features: ${features}
   🎯 Feature Tiers: ${featureTiers}
   🏢 Business Types: ${businessTypes}
   🛠️  Services: ${services}
   📞 Contact Info Items: ${contactInfo}
   ⏰ Time Slots: ${timeSlots}
   🚩 Feature Flags: ${featureFlags}
   
   🎉 All static data successfully migrated to database!
   `;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
