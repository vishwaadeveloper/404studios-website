#!/usr/bin/env tsx

/**
 * 404Studios Migration Dashboard
 * Real-time status of database migration progress
 */

import { getFeatureFlags } from '../src/lib/database/feature-flags';
import { prisma } from '../src/lib/database/client';

async function displayMigrationDashboard() {
  console.log('🎛️  404Studios Migration Dashboard\n');
  console.log('═'.repeat(50));

  try {
    // Database Status
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log('📡 Database Status: ✅ CONNECTED');

    // Feature Flags Status
    const flags = await getFeatureFlags();
    console.log('\n🏳️  Feature Flags:');
    console.log(`   Features:  ${flags.useDatabaseFeatures ? '🟢 ENABLED' : '🔴 DISABLED (using static)'}`);
    console.log(`   Services:  ${flags.useDatabaseServices ? '🟢 ENABLED' : '🔴 DISABLED (using static)'}`);
    console.log(`   Contact:   ${flags.useDatabaseContact ? '🟢 ENABLED' : '🔴 DISABLED (using static)'}`);
    console.log(`   Pricing:   ${flags.useDatabasePricing ? '🟢 ENABLED' : '🔴 DISABLED (using static)'}`);

    // Data Statistics
    console.log('\n📊 Data Summary:');
    const stats = await Promise.all([
      prisma.featureGroup.count(),
      prisma.feature.count(),
      prisma.featureTier.count(),
      prisma.businessType.count(),
      prisma.service.count(),
    ]);

    console.log(`   Feature Groups: ${stats[0]}`);
    console.log(`   Features:       ${stats[1]}`);
    console.log(`   Feature Tiers:  ${stats[2]}`);
    console.log(`   Business Types: ${stats[3]}`);
    console.log(`   Services:       ${stats[4]}`);

    // Migration Status
    console.log('\n🚀 Migration Status:');
    const enabledCount = Object.values(flags).filter(Boolean).length;
    const progressPercent = Math.round((enabledCount / 4) * 100);
    
    console.log(`   Progress: ${progressPercent}% (${enabledCount}/4 features enabled)`);
    
    if (progressPercent === 0) {
      console.log('   Status: 📦 READY TO MIGRATE (all static data)');
    } else if (progressPercent === 100) {
      console.log('   Status: 🎉 FULLY MIGRATED (all database data)');
    } else {
      console.log('   Status: 🔄 PARTIAL MIGRATION (hybrid mode)');
    }

    console.log('\n💡 Quick Actions:');
    console.log('   pnpm run db:studio     # Open Prisma Studio');
    console.log('   pnpm run db:validate   # Run validation tests');
    console.log('   pnpm dev               # Start development server');

  } catch (error) {
    console.log('📡 Database Status: ❌ DISCONNECTED');
    console.log(`   Error: ${error}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check .env file exists with correct Supabase URL');
    console.log('   2. Verify Supabase project is running');
    console.log('   3. Run: pnpm run db:reset');
  } finally {
    await prisma.$disconnect();
  }

  console.log('\n' + '═'.repeat(50));
}

displayMigrationDashboard().catch(console.error);
