# Simple MERN Project Diagnostic Script

Write-Host "🔍 MERN Project Status Check" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host ""

# Check MongoDB
Write-Host "🗄️ MongoDB Status:" -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "❌ MongoDB is not running" -ForegroundColor Red
    Write-Host "   You need to start MongoDB first!" -ForegroundColor Yellow
    Write-Host "   Try: net start MongoDB" -ForegroundColor Cyan
    Write-Host "   Or: mongod --dbpath C:\data\db" -ForegroundColor Cyan
}

# Check server dependencies
Write-Host "🔧 Server Dependencies:" -ForegroundColor Yellow
if (Test-Path "C:\Users\ashra\mern-project\server\node_modules") {
    Write-Host "✅ Server dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Server dependencies not installed" -ForegroundColor Red
    Write-Host "   Run: cd server; npm install" -ForegroundColor Cyan
}

# Check client dependencies
Write-Host "🎨 Client Dependencies:" -ForegroundColor Yellow
if (Test-Path "C:\Users\ashra\mern-project\client\node_modules") {
    Write-Host "✅ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Client dependencies not installed" -ForegroundColor Red
    Write-Host "   Run: cd client; npm install" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Green
Write-Host "1. Make sure MongoDB is running" -ForegroundColor Cyan
Write-Host "2. Install dependencies if needed" -ForegroundColor Cyan
Write-Host "3. Start server: cd server; npm run dev" -ForegroundColor Cyan
Write-Host "4. Start client: cd client; npm run dev" -ForegroundColor Cyan
