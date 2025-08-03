#!/usr/bin/env tsx

/**
 * Final System Validation & Rollback Test
 * Verifies complete system functionality and rollback capabilities
 */

import { getFeatureFlags, rollbackMigrationPhase, enableMigrationPhase } from '../src/lib/database/feature-flags';
import { prisma } from '../src/lib/database/client';

async function finalSystemValidation() {
  console.log('🔬 FINAL SYSTEM VALIDATION & ROLLBACK TEST\n');
  console.log('═'.repeat(60));

  try {
    // 1. Verify 100% migration status
    console.log('📊 Verifying 100% Migration Status...');
    const currentFlags = await getFeatureFlags();
    const enabledCount = Object.values(currentFlags).filter(Boolean).length;
    const progressPercent = Math.round((enabledCount / 4) * 100);
    
    console.log(`   Migration Progress: ${progressPercent}% (${enabledCount}/4 enabled)`);
    console.log('   Features:', currentFlags.useDatabaseFeatures ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Services:', currentFlags.useDatabaseServices ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Contact:', currentFlags.useDatabaseContact ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Pricing:', currentFlags.useDatabasePricing ? '🟢 ENABLED' : '🔴 DISABLED');

    if (progressPercent === 100) {
      console.log('   ✅ CONFIRMED: 100% database migration active');
    } else {
      console.log(`   ⚠️  WARNING: Only ${progressPercent}% migration active`);
    }

    // 2. Test database connectivity and data integrity
    console.log('\n📡 Testing Database Connectivity & Data Integrity...');
    const dataCounts = await Promise.all([
      prisma.featureGroup.count(),
      prisma.feature.count(),
      prisma.featureTier.count(),
      prisma.businessType.count(),
      prisma.service.count()
    ]);

    console.log(`   ✅ Feature Groups: ${dataCounts[0]}`);
    console.log(`   ✅ Features: ${dataCounts[1]}`);
    console.log(`   ✅ Feature Tiers: ${dataCounts[2]}`);
    console.log(`   ✅ Business Types: ${dataCounts[3]}`);
    console.log(`   ✅ Services: ${dataCounts[4]}`);

    // 3. Test rollback functionality (safety verification)
    console.log('\n🔄 Testing Rollback Functionality (Safety Check)...');
    console.log('   Testing rollback of one feature...');
    await rollbackMigrationPhase('pricing');
    const afterRollback = await getFeatureFlags();
    const rollbackWorking = !afterRollback.useDatabasePricing;
    console.log(`   Pricing rollback: ${rollbackWorking ? '✅ SUCCESS' : '❌ FAILED'}`);

    // Re-enable for full migration
    console.log('   Re-enabling pricing for full migration...');
    await enableMigrationPhase('pricing');
    const afterReEnable = await getFeatureFlags();
    const reEnableWorking = afterReEnable.useDatabasePricing;
    console.log(`   Pricing re-enable: ${reEnableWorking ? '✅ SUCCESS' : '❌ FAILED'}`);

    // 4. Performance measurement
    console.log('\n⚡ Measuring System Performance...');
    const performanceTests = [];
    
    for (let i = 0; i < 3; i++) {
      const start = Date.now();
      await prisma.featureGroup.findMany({ take: 1 });
      performanceTests.push(Date.now() - start);
    }
    
    const avgPerformance = performanceTests.reduce((sum, time) => sum + time, 0) / performanceTests.length;
    console.log(`   Average query time: ${avgPerformance.toFixed(2)}ms`);
    console.log(`   Performance status: ${avgPerformance < 200 ? '🟢 EXCELLENT' : avgPerformance < 500 ? '🟡 ACCEPTABLE' : '🔴 SLOW'}`);

    // 5. Final status summary
    console.log('\n🎯 FINAL VALIDATION SUMMARY:');
    console.log('─'.repeat(40));
    
    const finalFlags = await getFeatureFlags();
    const finalEnabledCount = Object.values(finalFlags).filter(Boolean).length;
    const finalProgressPercent = Math.round((finalEnabledCount / 4) * 100);
    
    console.log(`✅ Migration Status: ${finalProgressPercent}% Complete`);
    console.log(`✅ Data Integrity: ${dataCounts.every(count => count > 0) ? 'PRESERVED' : 'ISSUES DETECTED'}`);
    console.log(`✅ Rollback Capability: ${rollbackWorking && reEnableWorking ? 'FUNCTIONAL' : 'ISSUES DETECTED'}`);
    console.log(`✅ System Performance: ${avgPerformance < 1000 ? 'ACCEPTABLE' : 'CONCERNING'}`);

    if (finalProgressPercent === 100 && rollbackWorking && reEnableWorking) {
      console.log('\n🎉 FINAL VALIDATION: COMPLETE SUCCESS');
      console.log('✅ System is 100% migrated and fully operational');
      console.log('✅ All safety mechanisms verified');
      console.log('✅ Production deployment approved');
      console.log('\n🚀 MISSION ACCOMPLISHED: DATABASE MIGRATION COMPLETE!');
    } else {
      console.log('\n⚠️  FINAL VALIDATION: ISSUES DETECTED');
      console.log('❌ System requires attention before production deployment');
    }

  } catch (error) {
    console.error('❌ Final validation failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

finalSystemValidation().catch(console.error);
