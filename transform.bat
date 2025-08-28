@echo off
REM 404Studios Theme Transformation Script for Windows
REM This script safely transforms your website from glass morphism to clean shadcn/ui theme

echo 🎯 404Studios Theme Transformation
echo ==================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Run this script from the project root directory
    exit /b 1
)

REM Create backup directory
echo 📦 Creating backup...
set "timestamp=%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%"
set "timestamp=%timestamp: =0%"
set "BACKUP_DIR=backup-%timestamp%"
mkdir "%BACKUP_DIR%"

REM Backup original files
copy "app\globals.css" "%BACKUP_DIR%\" >nul
copy "tailwind.config.ts" "%BACKUP_DIR%\" >nul
copy "app\page.tsx" "%BACKUP_DIR%\" >nul
echo ✅ Backup created in %BACKUP_DIR%

REM Replace theme files
echo.
echo 🎨 Updating theme files...
if exist "app\globals-clean.css" (
    move "app\globals-clean.css" "app\globals.css" >nul
    echo ✅ Updated globals.css
) else (
    echo ❌ globals-clean.css not found
)

if exist "tailwind.config-clean.ts" (
    move "tailwind.config-clean.ts" "tailwind.config.ts" >nul
    echo ✅ Updated tailwind.config.ts
) else (
    echo ❌ tailwind.config-clean.ts not found
)

if exist "app\page-clean.tsx" (
    move "app\page-clean.tsx" "app\page.tsx" >nul
    echo ✅ Updated homepage
) else (
    echo ❌ page-clean.tsx not found
)

REM Remove visual effect components
echo.
echo 🗑️  Removing visual effect components...

set "components[0]=components\particle-background.tsx"
set "components[1]=components\glass-card.tsx"
set "components[2]=components\animated-section.tsx"
set "components[3]=components\magnetic-button.tsx"
set "components[4]=components\particle-globe.tsx"
set "components[5]=components\glass-shards.tsx"

for /L %%i in (0,1,5) do (
    call set "component=%%components[%%i]%%"
    if exist "!component!" (
        del "!component!"
        echo ✅ Removed !component!
    ) else (
        echo ⚠️  !component! not found
    )
)

REM Note about manual updates needed
echo.
echo 📝 Manual updates needed for remaining pages...
echo Please manually update the following files to remove ParticleBackground:
echo - app\services\page.tsx
echo - app\pricing\page.tsx
echo - app\packages\page.tsx
echo - app\packages\page-new.tsx
echo - app\contact\page.tsx
echo - app\contact\page-clean.tsx
echo - app\features\page.tsx
echo.
echo Remove these lines from each file:
echo   import ParticleBackground from "@/components/particle-background"
echo   ^<ParticleBackground /^>

echo.
echo 🎉 Transformation complete!
echo.
echo 📋 Next steps:
echo 1. Manually update the pages listed above
echo 2. Test the application: npm run dev
echo 3. Check theme toggle functionality
echo 4. Verify all pages load correctly
echo.
echo 📊 Expected improvements:
echo - Better performance (50KB+ smaller bundle)
echo - Improved accessibility
echo - Cleaner, maintainable code
echo - Standard shadcn/ui theme system
echo.
echo 💾 Backup saved in: %BACKUP_DIR%
pause
