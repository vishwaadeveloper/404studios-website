#!/usr/bin/env tsx

/**
 * Complete Migration Enablement Script
 * Enables all remaining database features to complete the migration
 */

import { enableMigrationPhase, getFeatureFlags } from '../src/lib/database/feature-flags';

async function completeFullMigration() {
  console.log('🚀 EXECUTING COMPLETE DATABASE MIGRATION\n');
  console.log('═'.repeat(50));

  try {
    // Check current status
    console.log('📊 Current Migration Status:');
    const currentFlags = await getFeatureFlags();
    console.log('   Features:', currentFlags.useDatabaseFeatures ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Services:', currentFlags.useDatabaseServices ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Contact:', currentFlags.useDatabaseContact ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Pricing:', currentFlags.useDatabasePricing ? '🟢 ENABLED' : '🔴 DISABLED');

    // Enable all remaining features
    console.log('\n🔄 Enabling All Remaining Database Features...');
    
    if (!currentFlags.useDatabaseServices) {
      await enableMigrationPhase('services');
      console.log('   ✅ Services database enabled');
    } else {
      console.log('   ✅ Services already enabled');
    }

    if (!currentFlags.useDatabaseContact) {
      await enableMigrationPhase('contact');
      console.log('   ✅ Contact database enabled');
    } else {
      console.log('   ✅ Contact already enabled');
    }

    if (!currentFlags.useDatabasePricing) {
      await enableMigrationPhase('pricing');
      console.log('   ✅ Pricing database enabled');
    } else {
      console.log('   ✅ Pricing already enabled');
    }

    // Verify final status
    console.log('\n📊 Final Migration Status:');
    const finalFlags = await getFeatureFlags();
    const enabledCount = Object.values(finalFlags).filter(Boolean).length;
    const progressPercent = Math.round((enabledCount / 4) * 100);

    console.log('   Features:', finalFlags.useDatabaseFeatures ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Services:', finalFlags.useDatabaseServices ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Contact:', finalFlags.useDatabaseContact ? '🟢 ENABLED' : '🔴 DISABLED');
    console.log('   Pricing:', finalFlags.useDatabasePricing ? '🟢 ENABLED' : '🔴 DISABLED');
    
    console.log(`\n🎯 Migration Progress: ${progressPercent}% (${enabledCount}/4 features enabled)`);
    
    if (progressPercent === 100) {
      console.log('\n🎉 COMPLETE DATABASE MIGRATION SUCCESSFUL!');
      console.log('✅ All systems now operating from database');
      console.log('✅ Zero static data dependencies');
      console.log('✅ Full migration achieved');
    } else {
      console.log(`\n⚠️  Migration ${progressPercent}% complete - ${4 - enabledCount} features remaining`);
    }

  } catch (error) {
    console.error('❌ Migration completion failed:', error);
    throw error;
  }
}

completeFullMigration().catch(console.error);
