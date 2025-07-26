# MERN Project Diagnostic Script
# Run this to check what's working and what needs attention

Write-Host "🔍 MERN Project Diagnostic Report" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Check Node.js
Write-Host "📦 Node.js Version:" -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not installed" -ForegroundColor Red
}

# Check npm
Write-Host "📦 npm Version:" -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not available" -ForegroundColor Red
}

# Check MongoDB
Write-Host "🗄️ MongoDB Status:" -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✅ MongoDB is running (PID: $($mongoProcess.Id))" -ForegroundColor Green
} else {
    Write-Host "❌ MongoDB is not running" -ForegroundColor Red
}

# Check if MongoDB is installed
Write-Host "🗄️ MongoDB Installation:" -ForegroundColor Yellow
try {
    $mongoVersion = mongod --version 2>$null
    if ($mongoVersion) {
        Write-Host "✅ MongoDB is installed" -ForegroundColor Green
    } else {
        Write-Host "❌ MongoDB not found in PATH" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ MongoDB not installed or not in PATH" -ForegroundColor Red
}

# Check server dependencies
Write-Host "🔧 Server Dependencies:" -ForegroundColor Yellow
if (Test-Path "C:\Users\ashra\mern-project\server\node_modules") {
    Write-Host "✅ Server dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Server dependencies not installed" -ForegroundColor Red
    Write-Host "   Run: cd server && npm install" -ForegroundColor Cyan
}

# Check client dependencies
Write-Host "🎨 Client Dependencies:" -ForegroundColor Yellow
if (Test-Path "C:\Users\ashra\mern-project\client\node_modules") {
    Write-Host "✅ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Client dependencies not installed" -ForegroundColor Red
    Write-Host "   Run: cd client && npm install" -ForegroundColor Cyan
}

# Check environment file
Write-Host "🔐 Environment Configuration:" -ForegroundColor Yellow
if (Test-Path "C:\Users\ashra\mern-project\server\.env") {
    $envContent = Get-Content "C:\Users\ashra\mern-project\server\.env"
    $hasJwtSecret = $envContent -match "JWT_SECRET"
    $hasMongoUri = $envContent -match "MONGODB_URI"
    
    if ($hasJwtSecret -and $hasMongoUri) {
        Write-Host "✅ Environment variables configured" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Environment file exists but missing variables" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ .env file not found" -ForegroundColor Red
}

# Check if ports are available
Write-Host "🔌 Port Availability:" -ForegroundColor Yellow
$port5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
$port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue

if ($port5000) {
    Write-Host "⚠️ Port 5000 is in use (server might be running)" -ForegroundColor Yellow
} else {
    Write-Host "✅ Port 5000 is available" -ForegroundColor Green
}

if ($port5173) {
    Write-Host "⚠️ Port 5173 is in use (client might be running)" -ForegroundColor Yellow
} else {
    Write-Host "✅ Port 5173 is available" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Green
Write-Host "----------" -ForegroundColor Green

# Provide recommendations
$issues = @()

if (!(Get-Process mongod -ErrorAction SilentlyContinue)) {
    $issues += "MongoDB needs to be installed and started"
}

if (!(Test-Path "C:\Users\ashra\mern-project\server\node_modules")) {
    $issues += "Server dependencies need to be installed"
}

if (!(Test-Path "C:\Users\ashra\mern-project\client\node_modules")) {
    $issues += "Client dependencies need to be installed"
}

if ($issues.Count -eq 0) {
    Write-Host "✅ All systems appear to be ready!" -ForegroundColor Green
    Write-Host "You can now run: .\start.ps1" -ForegroundColor Cyan
} else {
    Write-Host "❌ Issues found:" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host "  • $issue" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "📖 Check SETUP_INSTRUCTIONS.md for detailed setup" -ForegroundColor Cyan
}
