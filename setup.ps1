# Recipe-Book Setup Script
# This script sets up the Python environment and dependencies for the Recipe-Book project

param(
    [switch]$Force,
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

Write-Host "🍳 Recipe-Book Setup Script" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green

# Function to write verbose output
function Write-VerboseOutput {
    param([string]$Message)
    if ($Verbose) {
        Write-Host "[VERBOSE] $Message" -ForegroundColor Cyan
    }
}

# Check if Python is installed
Write-Host "🐍 Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-VerboseOutput "Found: $pythonVersion"

    # Check if Python version is 3.8 or higher
    $versionMatch = $pythonVersion -match "Python (\d+)\.(\d+)"
    if ($versionMatch) {
        $majorVersion = [int]$Matches[1]
        $minorVersion = [int]$Matches[2]

        if ($majorVersion -lt 3 -or ($majorVersion -eq 3 -and $minorVersion -lt 8)) {
            throw "Python 3.8 or higher is required. Found: $pythonVersion"
        }
    }

    Write-Host "✅ Python version check passed" -ForegroundColor Green
} catch {
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.8+ from https://python.org" -ForegroundColor Red
    exit 1
}

# Check if we're in the correct directory
$expectedFiles = @("requirements.txt", "scripts", "data", "LICENSE")
$missingFiles = @()

foreach ($file in $expectedFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ Not in Recipe-Book root directory or missing files:" -ForegroundColor Red
    $missingFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host "Please run this script from the Recipe-Book root directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Directory structure check passed" -ForegroundColor Green

# Create or recreate virtual environment
$venvPath = "venv"
if (Test-Path $venvPath) {
    if ($Force) {
        Write-Host "🗑️  Removing existing virtual environment..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force $venvPath
    } else {
        Write-Host "📁 Virtual environment already exists" -ForegroundColor Yellow
        Write-Host "   Use -Force to recreate it" -ForegroundColor Yellow

        # Check if venv is valid by trying to activate it
        $activateScript = Join-Path $venvPath "Scripts\Activate.ps1"
        if (Test-Path $activateScript) {
            Write-Host "✅ Virtual environment appears valid" -ForegroundColor Green
        } else {
            Write-Host "❌ Virtual environment appears corrupted, recreating..." -ForegroundColor Red
            Remove-Item -Recurse -Force $venvPath
        }
    }
}

if (-not (Test-Path $venvPath)) {
    Write-Host "🏗️  Creating virtual environment..." -ForegroundColor Yellow
    Write-VerboseOutput "Running: python -m venv $venvPath"
    python -m venv $venvPath

    if (-not (Test-Path $venvPath)) {
        Write-Host "❌ Failed to create virtual environment" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Virtual environment created" -ForegroundColor Green
}

# Activate virtual environment and install dependencies
$activateScript = Join-Path $venvPath "Scripts\Activate.ps1"
if (-not (Test-Path $activateScript)) {
    Write-Host "❌ Virtual environment activation script not found" -ForegroundColor Red
    exit 1
}

Write-Host "🔧 Installing dependencies..." -ForegroundColor Yellow
Write-VerboseOutput "Activating virtual environment: $activateScript"

# Create a temporary script to run pip install in the venv
$tempScript = @"
& "$activateScript"
python -m pip install --upgrade pip
pip install -r requirements.txt
"@

$tempScriptPath = "temp_install.ps1"
$tempScript | Out-File -FilePath $tempScriptPath -Encoding utf8

try {
    Write-VerboseOutput "Running pip install in virtual environment"
    & powershell -ExecutionPolicy Bypass -File $tempScriptPath

    if ($LASTEXITCODE -ne 0) {
        throw "Pip install failed with exit code $LASTEXITCODE"
    }

    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies: $_" -ForegroundColor Red
    exit 1
} finally {
    # Clean up temporary script
    if (Test-Path $tempScriptPath) {
        Remove-Item $tempScriptPath
    }
}

# Create necessary directories
$directories = @(".audio-inputs", ".audio-outputs")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        Write-Host "📁 Creating directory: $dir" -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-VerboseOutput "Created directory: $dir"
    }
}

# Check if ffmpeg is available (optional but recommended)
Write-Host "🎵 Checking ffmpeg availability..." -ForegroundColor Yellow
try {
    $ffmpegVersion = ffmpeg -version 2>&1 | Select-Object -First 1
    Write-Host "✅ ffmpeg found: $($ffmpegVersion -replace 'ffmpeg version ', '')" -ForegroundColor Green
} catch {
    Write-Host "⚠️  ffmpeg not found in PATH" -ForegroundColor Yellow
    Write-Host "   This is optional but recommended for audio processing" -ForegroundColor Yellow
    Write-Host "   Download from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
}

# Display success message and usage instructions
Write-Host ""
Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Activate the virtual environment:" -ForegroundColor White
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Place audio files in .audio-inputs/ folder" -ForegroundColor White
Write-Host ""
Write-Host "3. Run transcription:" -ForegroundColor White
Write-Host "   python scripts\transcribe\transcribe_audio.py --model small --language ru" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Use the convert-text-to-recipe-ru.prompt.md with AI to create recipe JSON" -ForegroundColor White
Write-Host ""
Write-Host "5. Save generated JSON files to data/recipes/" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Troubleshooting:" -ForegroundColor Cyan
Write-Host "- Always run scripts from the repo root directory" -ForegroundColor White
Write-Host "- Use -Verbose flag to see detailed output" -ForegroundColor White
Write-Host "- Use -Force flag to recreate the virtual environment" -ForegroundColor White
Write-Host ""
