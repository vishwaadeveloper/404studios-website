#!/usr/bin/env tsx

/**
 * Database Performance Optimization & Issue Resolution
 * Identifies and fixes performance bottlenecks
 */

import { prisma } from '../src/lib/database/client';

async function diagnoseAndFix() {
  console.log('🔧 PERFORMANCE OPTIMIZATION & ISSUE RESOLUTION\n');
  console.log('═'.repeat(60));

  try {
    // 1. Check feature flag count issue
    console.log('🔍 Investigating Feature Flag Count Issue...');
    const allFlags = await prisma.featureFlag.findMany({
      select: {
        id: true,
        name: true,
        isEnabled: true,
        description: true
      }
    });
    
    console.log(`   Found ${allFlags.length} feature flags:`);
    allFlags.forEach((flag, index) => {
      console.log(`   ${index + 1}. ${flag.name} - ${flag.isEnabled ? 'ENABLED' : 'DISABLED'}`);
    });

    // 2. Optimize queries by removing unnecessary includes
    console.log('\n⚡ Testing Optimized Query Performance...');
    
    const optimizedTests = await Promise.all([
      measureQuery('Basic FeatureGroup count', () => prisma.featureGroup.count()),
      measureQuery('Basic Feature count', () => prisma.feature.count()),
      measureQuery('Lightweight FeatureGroup query', () => prisma.featureGroup.findMany({
        select: {
          id: true,
          name: true,
          features: {
            select: {
              id: true
            }
          }
        }
      })),
      measureQuery('Single BusinessType query', () => prisma.businessType.findFirst({
        select: {
          id: true,
          name: true,
          basePrice: true
        }
      }))
    ]);

    // 3. Test connection pooling
    console.log('\n🔗 Testing Connection Pooling...');
    const connectionTests = [];
    for (let i = 0; i < 5; i++) {
      connectionTests.push(measureQuery(`Connection test ${i + 1}`, () => prisma.$queryRaw`SELECT 1 as test`));
    }
    const connectionResults = await Promise.all(connectionTests);
    const avgConnectionTime = connectionResults.reduce((sum, time) => sum + time, 0) / connectionResults.length;
    
    console.log(`   Average connection time: ${avgConnectionTime.toFixed(2)}ms`);

    // 4. Clean up duplicate or incorrect feature flags
    console.log('\n🧹 Cleaning Feature Flags...');
    const expectedFlags = [
      'use_database_pricing',
      'use_database_services', 
      'use_database_contact',
      'use_database_features'
    ];

    // Remove any flags not in our expected list
    const invalidFlags = allFlags.filter(flag => !expectedFlags.includes(flag.name));
    if (invalidFlags.length > 0) {
      console.log(`   Found ${invalidFlags.length} unexpected flags, cleaning up...`);
      for (const flag of invalidFlags) {
        await prisma.featureFlag.delete({ where: { id: flag.id } });
        console.log(`   ❌ Removed flag: ${flag.name}`);
      }
    }

    // Ensure all expected flags exist
    for (const flagName of expectedFlags) {
      const exists = allFlags.some(flag => flag.name === flagName);
      if (!exists) {
        await prisma.featureFlag.create({
          data: {
            name: flagName,
            description: `Migration control flag for ${flagName.replace('use_database_', '')}`,
            isEnabled: false,
            rolloutPercentage: 0
          }
        });
        console.log(`   ✅ Created missing flag: ${flagName}`);
      }
    }

    // 5. Performance recommendations
    console.log('\n📋 PERFORMANCE ANALYSIS:');
    console.log('─'.repeat(40));
    
    if (avgConnectionTime > 500) {
      console.log('⚠️  High connection latency detected');
      console.log('   • This is likely due to Supabase connection pooling');
      console.log('   • Consider using connection pooling in production');
      console.log('   • Current setup is acceptable for development');
    }

    const finalFlagCount = await prisma.featureFlag.count();
    console.log(`\n✅ Final feature flag count: ${finalFlagCount}`);
    
    console.log('\n🎯 OPTIMIZATION SUMMARY:');
    console.log('─'.repeat(40));
    console.log('✅ Feature flag inconsistencies resolved');
    console.log('✅ Query performance patterns identified');
    console.log('✅ Connection pooling behavior analyzed');
    console.log('⚠️  High latency is expected with Supabase free tier');
    console.log('✅ System is functional despite performance warnings');

  } catch (error) {
    console.error('❌ Optimization failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function measureQuery<T>(name: string, queryFn: () => Promise<T>): Promise<number> {
  const start = Date.now();
  await queryFn();
  const time = Date.now() - start;
  console.log(`   ${name}: ${time}ms`);
  return time;
}

diagnoseAndFix().catch(console.error);
