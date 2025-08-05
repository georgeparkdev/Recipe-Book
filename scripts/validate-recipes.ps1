# Recipe JSON Validator
# Quick script to validate recipe JSON files

param(
    [Parameter(Mandatory=$false)]
    [string]$RecipePath = "data\recipes",
    [switch]$ShowDetails
)

$ErrorActionPreference = "Continue"

Write-Host "🧪 Recipe JSON Validator" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

if (-not (Test-Path $RecipePath)) {
    Write-Host "❌ Recipe directory not found: $RecipePath" -ForegroundColor Red
    exit 1
}

$jsonFiles = Get-ChildItem -Path $RecipePath -Filter "*.json" -Recurse

if ($jsonFiles.Count -eq 0) {
    Write-Host "⚠️  No JSON files found in $RecipePath" -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $($jsonFiles.Count) JSON file(s) to validate" -ForegroundColor Cyan

$validCount = 0
$errorCount = 0

foreach ($file in $jsonFiles) {
    Write-Host "`n🔍 Validating: $($file.Name)" -ForegroundColor Yellow

    try {
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $recipe = $content | ConvertFrom-Json

        # Basic schema validation
        $requiredFields = @('title', 'yield', 'ingredients', 'equipment', 'steps')
        $missingFields = @()

        foreach ($field in $requiredFields) {
            if (-not $recipe.PSObject.Properties.Name.Contains($field)) {
                $missingFields += $field
            }
        }

        if ($missingFields.Count -gt 0) {
            Write-Host "   ❌ Missing required fields: $($missingFields -join ', ')" -ForegroundColor Red
            $errorCount++
        } else {
            Write-Host "   ✅ Valid JSON structure" -ForegroundColor Green

            if ($ShowDetails) {
                Write-Host "      Title: $($recipe.title)" -ForegroundColor Gray
                Write-Host "      Yield: $($recipe.yield)" -ForegroundColor Gray
                Write-Host "      Ingredients: $($recipe.ingredients.Count)" -ForegroundColor Gray
                Write-Host "      Steps: $($recipe.steps.Count)" -ForegroundColor Gray
            }

            $validCount++
        }

    } catch {
        Write-Host "   ❌ JSON parsing error: $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "`n📊 Validation Summary" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host "✅ Valid files: $validCount" -ForegroundColor Green
Write-Host "❌ Invalid files: $errorCount" -ForegroundColor Red
Write-Host "📁 Total files: $($jsonFiles.Count)" -ForegroundColor White

if ($errorCount -eq 0) {
    Write-Host "`n🎉 All recipe files are valid!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n⚠️  Some files have validation errors" -ForegroundColor Yellow
    exit 1
}
