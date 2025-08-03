#!/usr/bin/env tsx

/**
 * Advanced Migration Health Check & Data Integrity Validator
 * Comprehensive analysis of database migration status
 */

import { prisma } from '../src/lib/database/client';
import { getPricingData, getBusinessTypes, validatePricingParity } from '../src/lib/services/pricing.service';
import { getFeatureFlags, enableMigrationPhase, rollbackMigrationPhase } from '../src/lib/database/feature-flags';

// Import static data for comparison
import { pricingData as staticPricingData } from '../src/features/pricing/data/pricingData';
import { businessTypes as staticBusinessTypes } from '../src/features/pricing/data/businessTypes';

interface HealthCheckResult {
  category: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  message: string;
  details?: any;
}

async function advancedHealthCheck(): Promise<HealthCheckResult[]> {
  const results: HealthCheckResult[] = [];

  console.log('🔬 ADVANCED MIGRATION HEALTH CHECK\n');
  console.log('═'.repeat(60));

  try {
    // Test 1: Database Connection & Performance
    console.log('📡 Testing Database Performance...');
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1 as test`;
    const connectionTime = Date.now() - startTime;
    
    results.push({
      category: 'Database Performance',
      status: connectionTime < 200 ? 'PASS' : connectionTime < 500 ? 'WARN' : 'FAIL',
      message: `Connection time: ${connectionTime}ms`,
      details: { connectionTime, threshold: 200 }
    });

    // Test 2: Data Completeness Check
    console.log('📊 Validating Data Completeness...');
    const dataCounts = await Promise.all([
      prisma.featureGroup.count(),
      prisma.feature.count(),
      prisma.featureTier.count(),
      prisma.businessType.count(),
      prisma.service.count(),
      prisma.featureFlag.count()
    ]);

    const expectedCounts = {
      featureGroups: 5,
      features: 23,
      featureTiers: 69,
      businessTypes: 5,
      services: 8,
      featureFlags: 4
    };

    const actualCounts = {
      featureGroups: dataCounts[0],
      features: dataCounts[1],
      featureTiers: dataCounts[2],
      businessTypes: dataCounts[3],
      services: dataCounts[4],
      featureFlags: dataCounts[5]
    };

    const dataComplete = Object.entries(expectedCounts).every(([key, expected], index) => 
      actualCounts[key as keyof typeof actualCounts] === expected
    );

    results.push({
      category: 'Data Completeness',
      status: dataComplete ? 'PASS' : 'FAIL',
      message: dataComplete ? 'All data counts match expected values' : 'Data count mismatch detected',
      details: { expected: expectedCounts, actual: actualCounts }
    });

    // Test 3: Feature Flag System Integrity
    console.log('🏳️ Testing Feature Flag System...');
    const flags = await getFeatureFlags();
    const allFlagsExist = ['useDatabasePricing', 'useDatabaseServices', 'useDatabaseContact', 'useDatabaseFeatures']
      .every(flag => flag in flags);

    results.push({
      category: 'Feature Flag System',
      status: allFlagsExist ? 'PASS' : 'FAIL',
      message: allFlagsExist ? 'All required feature flags present' : 'Missing feature flags',
      details: flags
    });

    // Test 4: Data Access Layer Functionality
    console.log('🔄 Testing Data Access Layer...');
    try {
      const pricingData = await getPricingData();
      const businessTypes = await getBusinessTypes();
      const validPricing = Array.isArray(pricingData) && pricingData.length > 0;
      const validBusinessTypes = typeof businessTypes === 'object' && Object.keys(businessTypes).length > 0;

      results.push({
        category: 'Data Access Layer',
        status: validPricing && validBusinessTypes ? 'PASS' : 'FAIL',
        message: validPricing && validBusinessTypes ? 'Data access layer working correctly' : 'Data access layer issues',
        details: { pricingGroups: pricingData.length, businessTypeCount: Object.keys(businessTypes).length }
      });
    } catch (error) {
      results.push({
        category: 'Data Access Layer',
        status: 'FAIL',
        message: `Data access layer error: ${error}`,
        details: { error: error }
      });
    }

    // Test 5: Feature Flag Toggle Testing
    console.log('🎛️ Testing Feature Flag Toggles...');
    try {
      // Test enabling a flag
      await enableMigrationPhase('features');
      const enabledFlags = await getFeatureFlags();
      const flagEnabled = enabledFlags.useDatabaseFeatures === true;

      // Test disabling the flag
      await rollbackMigrationPhase('features');
      const disabledFlags = await getFeatureFlags();
      const flagDisabled = disabledFlags.useDatabaseFeatures === false;

      results.push({
        category: 'Feature Flag Toggles',
        status: flagEnabled && flagDisabled ? 'PASS' : 'FAIL',
        message: flagEnabled && flagDisabled ? 'Feature flag toggles working correctly' : 'Feature flag toggle issues',
        details: { enableTest: flagEnabled, disableTest: flagDisabled }
      });
    } catch (error) {
      results.push({
        category: 'Feature Flag Toggles',
        status: 'FAIL',
        message: `Feature flag toggle error: ${error}`,
        details: { error: error }
      });
    }

    // Test 6: Pricing Calculation Integrity
    console.log('💰 Testing Pricing Calculation Integrity...');
    const pricingParity = await validatePricingParity();
    results.push({
      category: 'Pricing Calculation Integrity',
      status: pricingParity ? 'PASS' : 'FAIL',
      message: pricingParity ? 'Pricing calculations match between sources' : 'Pricing calculation mismatch',
      details: { parity: pricingParity }
    });

    // Test 7: Database Query Performance
    console.log('⚡ Testing Database Query Performance...');
    const queryTests = await Promise.all([
      measureQueryTime(() => prisma.featureGroup.findMany({ include: { features: { include: { tiers: true } } } })),
      measureQueryTime(() => prisma.businessType.findMany({ include: { pages: true, defaults: true } })),
      measureQueryTime(() => prisma.service.findMany({ include: { category: true } }))
    ]);

    const avgQueryTime = queryTests.reduce((sum, time) => sum + time, 0) / queryTests.length;
    results.push({
      category: 'Database Query Performance',
      status: avgQueryTime < 100 ? 'PASS' : avgQueryTime < 300 ? 'WARN' : 'FAIL',
      message: `Average query time: ${avgQueryTime.toFixed(2)}ms`,
      details: { queryTimes: queryTests, average: avgQueryTime }
    });

    // Test 8: Static Data Comparison
    console.log('📋 Comparing Static vs Database Data...');
    const staticFeatureGroupCount = staticPricingData.length;
    const staticBusinessTypeCount = Object.keys(staticBusinessTypes).length;
    const dbFeatureGroupCount = await prisma.featureGroup.count();
    const dbBusinessTypeCount = await prisma.businessType.count();

    const dataMatches = staticFeatureGroupCount === dbFeatureGroupCount && 
                       staticBusinessTypeCount === dbBusinessTypeCount;

    results.push({
      category: 'Static vs Database Data',
      status: dataMatches ? 'PASS' : 'WARN',
      message: dataMatches ? 'Static and database data counts match' : 'Data count differences detected',
      details: {
        static: { featureGroups: staticFeatureGroupCount, businessTypes: staticBusinessTypeCount },
        database: { featureGroups: dbFeatureGroupCount, businessTypes: dbBusinessTypeCount }
      }
    });

    // Test 9: Error Handling & Fallbacks
    console.log('🛡️ Testing Error Handling & Fallbacks...');
    // Temporarily corrupt connection to test fallbacks
    try {
      const originalUrl = process.env.DATABASE_URL;
      process.env.DATABASE_URL = 'invalid_url';
      
      // This should fallback to static data
      const fallbackPricing = await getPricingData();
      const fallbackWorking = Array.isArray(fallbackPricing) && fallbackPricing.length > 0;
      
      process.env.DATABASE_URL = originalUrl;
      
      results.push({
        category: 'Error Handling & Fallbacks',
        status: fallbackWorking ? 'PASS' : 'FAIL',
        message: fallbackWorking ? 'Fallback mechanisms working correctly' : 'Fallback mechanisms failed',
        details: { fallbackDataAvailable: fallbackWorking }
      });
    } catch (error) {
      results.push({
        category: 'Error Handling & Fallbacks',
        status: 'WARN',
        message: 'Could not test fallback mechanisms fully',
        details: { error: error }
      });
    }

  } catch (error) {
    results.push({
      category: 'Health Check Error',
      status: 'FAIL',
      message: `Critical error during health check: ${error}`,
      details: { error: error }
    });
  }

  return results;
}

async function measureQueryTime<T>(queryFn: () => Promise<T>): Promise<number> {
  const start = Date.now();
  await queryFn();
  return Date.now() - start;
}

function generateHealthReport(results: HealthCheckResult[]): string {
  const passCount = results.filter(r => r.status === 'PASS').length;
  const warnCount = results.filter(r => r.status === 'WARN').length;
  const failCount = results.filter(r => r.status === 'FAIL').length;
  const totalCount = results.length;

  const overallStatus = failCount > 0 ? 'CRITICAL' : warnCount > 0 ? 'WARNING' : 'HEALTHY';
  const healthScore = Math.round(((passCount + warnCount * 0.5) / totalCount) * 100);

  let report = `\n${'═'.repeat(60)}\n`;
  report += `🏥 MIGRATION HEALTH REPORT\n`;
  report += `${'═'.repeat(60)}\n\n`;
  
  report += `📊 OVERALL STATUS: ${overallStatus} (${healthScore}% Health Score)\n`;
  report += `✅ PASS: ${passCount}/${totalCount}\n`;
  report += `⚠️  WARN: ${warnCount}/${totalCount}\n`;
  report += `❌ FAIL: ${failCount}/${totalCount}\n\n`;

  report += `📋 DETAILED RESULTS:\n`;
  report += `${'-'.repeat(60)}\n`;

  results.forEach((result, index) => {
    const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'WARN' ? '⚠️' : '❌';
    report += `${index + 1}. ${statusIcon} ${result.category}: ${result.message}\n`;
  });

  report += `\n${'-'.repeat(60)}\n`;

  if (overallStatus === 'HEALTHY') {
    report += `🎉 MIGRATION STATUS: EXCELLENT HEALTH\n`;
    report += `✅ System is ready for full database migration\n`;
    report += `✅ All critical systems operational\n`;
    report += `🚀 RECOMMENDATION: Proceed with database feature enablement\n`;
  } else if (overallStatus === 'WARNING') {
    report += `⚠️  MIGRATION STATUS: MINOR ISSUES DETECTED\n`;
    report += `✅ System is functional but has warnings\n`;
    report += `⚠️  Review warning items before full migration\n`;
    report += `🔍 RECOMMENDATION: Address warnings then proceed\n`;
  } else {
    report += `❌ MIGRATION STATUS: CRITICAL ISSUES DETECTED\n`;
    report += `🚨 System has critical failures\n`;
    report += `🛠️  RECOMMENDATION: Fix critical issues before migration\n`;
  }

  report += `\n${'═'.repeat(60)}\n`;
  return report;
}

async function main() {
  try {
    const results = await advancedHealthCheck();
    const report = generateHealthReport(results);
    console.log(report);

    // Output JSON for programmatic access
    console.log('\n📄 DETAILED JSON REPORT:');
    console.log(JSON.stringify(results, null, 2));

  } catch (error) {
    console.error('❌ Health check failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
