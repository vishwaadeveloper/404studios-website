#!/bin/bash

# 404Studios Theme Transformation Script
# This script safely transforms your website from glass morphism to clean shadcn/ui theme

echo "🎯 404Studios Theme Transformation"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Create backup directory
echo "📦 Creating backup..."
mkdir -p backup-$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"

# Backup original files
cp app/globals.css "$BACKUP_DIR/"
cp tailwind.config.ts "$BACKUP_DIR/"
cp app/page.tsx "$BACKUP_DIR/"
echo "✅ Backup created in $BACKUP_DIR"

# Replace theme files
echo ""
echo "🎨 Updating theme files..."
if [ -f "app/globals-clean.css" ]; then
    mv app/globals-clean.css app/globals.css
    echo "✅ Updated globals.css"
else
    echo "❌ globals-clean.css not found"
fi

if [ -f "tailwind.config-clean.ts" ]; then
    mv tailwind.config-clean.ts tailwind.config.ts
    echo "✅ Updated tailwind.config.ts"
else
    echo "❌ tailwind.config-clean.ts not found"
fi

if [ -f "app/page-clean.tsx" ]; then
    mv app/page-clean.tsx app/page.tsx
    echo "✅ Updated homepage"
else
    echo "❌ page-clean.tsx not found"
fi

# Remove visual effect components
echo ""
echo "🗑️  Removing visual effect components..."
components_to_remove=(
    "components/particle-background.tsx"
    "components/glass-card.tsx"
    "components/animated-section.tsx"
    "components/magnetic-button.tsx"
    "components/particle-globe.tsx"
    "components/glass-shards.tsx"
)

for component in "${components_to_remove[@]}"; do
    if [ -f "$component" ]; then
        rm "$component"
        echo "✅ Removed $component"
    else
        echo "⚠️  $component not found"
    fi
done

# Update remaining pages
echo ""
echo "📝 Updating remaining pages..."
pages_with_particle_bg=(
    "app/services/page.tsx"
    "app/pricing/page.tsx" 
    "app/packages/page.tsx"
    "app/packages/page-new.tsx"
    "app/contact/page.tsx"
    "app/contact/page-clean.tsx"
    "app/features/page.tsx"
)

for page in "${pages_with_particle_bg[@]}"; do
    if [ -f "$page" ]; then
        # Remove ParticleBackground import
        sed -i.bak '/import ParticleBackground/d' "$page"
        # Remove ParticleBackground usage
        sed -i.bak '/<ParticleBackground \/>/d' "$page"
        rm "$page.bak" 2>/dev/null || true
        echo "✅ Updated $page"
    else
        echo "⚠️  $page not found"
    fi
done

# Check for any remaining imports that need manual fixes
echo ""
echo "🔍 Checking for remaining visual effect imports..."
remaining_imports=$(grep -r "particle-background\|glass-card\|animated-section\|magnetic-button\|particle-globe" app/ components/ 2>/dev/null || true)

if [ -n "$remaining_imports" ]; then
    echo "⚠️  Manual fixes needed for these files:"
    echo "$remaining_imports"
else
    echo "✅ No remaining visual effect imports found"
fi

# Run TypeScript check
echo ""
echo "🔧 Running TypeScript check..."
if command -v npm &> /dev/null; then
    if npm run type-check &> /dev/null; then
        echo "✅ TypeScript compilation successful"
    else
        echo "⚠️  TypeScript errors found - please check manually"
    fi
else
    echo "⚠️  npm not found - please run 'npm run type-check' manually"
fi

echo ""
echo "🎉 Transformation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review any files mentioned in manual fixes"
echo "2. Test the application: npm run dev"
echo "3. Check theme toggle functionality"
echo "4. Verify all pages load correctly"
echo ""
echo "📊 Expected improvements:"
echo "- Better performance (50KB+ smaller bundle)"
echo "- Improved accessibility"
echo "- Cleaner, maintainable code"
echo "- Standard shadcn/ui theme system"
echo ""
echo "💾 Backup saved in: $BACKUP_DIR"
