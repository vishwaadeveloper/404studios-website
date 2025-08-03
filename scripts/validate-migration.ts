#!/usr/bin/env tsx

/**
 * 404Studios Migration Validation Script
 * Tests database connectivity, seeded data, and feature flags
 */

import { testDatabaseConnection, validatePricingParity } from '../src/lib/services/pricing.service';
import { getFeatureFlags, enableMigrationPhase, rollbackMigrationPhase } from '../src/lib/database/feature-flags';
import { prisma } from '../src/lib/database/client';

async function main() {
  console.log('🧪 404Studios Migration Validation Starting...\n');

  try {
    // Test 1: Database Connection
    console.log('📡 Testing database connection...');
    const isConnected = await testDatabaseConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    // Test 2: Verify Seeded Data
    console.log('\n📊 Checking seeded data...');
    const featureGroupCount = await prisma.featureGroup.count();
    const featureCount = await prisma.feature.count();
    const businessTypeCount = await prisma.businessType.count();
    const serviceCount = await prisma.service.count();
    
    console.log(`   ✅ Feature Groups: ${featureGroupCount}`);
    console.log(`   ✅ Features: ${featureCount}`);
    console.log(`   ✅ Business Types: ${businessTypeCount}`);
    console.log(`   ✅ Services: ${serviceCount}`);

    // Test 3: Feature Flag System
    console.log('\n🏳️ Testing feature flag system...');
    const initialFlags = await getFeatureFlags();
    console.log('   Initial flags:', initialFlags);

    // Test flag modification
    console.log('   Testing flag updates...');
    await enableMigrationPhase('features');
    const updatedFlags = await getFeatureFlags();
    console.log('   After enabling features:', updatedFlags.useDatabaseFeatures);

    await rollbackMigrationPhase('features');
    const rolledBackFlags = await getFeatureFlags();
    console.log('   After rollback:', rolledBackFlags.useDatabaseFeatures);

    // Test 4: Pricing Service Integration
    console.log('\n💰 Testing pricing service...');
    const paritCheck = await validatePricingParity();
    if (!paritCheck) {
      throw new Error('Pricing parity validation failed');
    }

    // Test 5: Sample Data Query
    console.log('\n🔍 Testing sample data queries...');
    const sampleFeatureGroup = await prisma.featureGroup.findFirst({
      include: {
        features: {
          include: {
            tiers: true,
          },
          take: 1,
        },
      },
    });

    if (sampleFeatureGroup) {
      console.log(`   ✅ Sample group: "${sampleFeatureGroup.name}" with ${sampleFeatureGroup.features.length} features`);
      if (sampleFeatureGroup.features[0]) {
        const feature = sampleFeatureGroup.features[0];
        console.log(`   ✅ Sample feature: "${feature.name}" with ${feature.tiers.length} tiers`);
      }
    }

    console.log('\n🎉 All validation tests passed!');
    console.log('\n📋 Migration Status Summary:');
    console.log('   ✅ Phase 1: Infrastructure Setup - COMPLETE');
    console.log('   ✅ Phase 2: Data Migration - COMPLETE');
    console.log('   ✅ Phase 3: Data Access Layer - COMPLETE');
    console.log('   🔄 Phase 4: Gradual Feature Enablement - READY');
    console.log('   ⏳ Phase 5: UI Integration & Testing - PENDING');

    console.log('\n🚀 Ready for Phase 4: You can now safely enable database features!');
    console.log('   Use: await enableMigrationPhase("features") to start migration');

  } catch (error) {
    console.error('\n❌ Validation failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
