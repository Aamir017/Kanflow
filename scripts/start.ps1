# MERN Project Quick Start Script
# Run this script from the project root directory

Write-Host "🚀 Starting MERN Project..." -ForegroundColor Green

# Check if MongoDB is running
Write-Host "📋 Checking MongoDB status..." -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "❌ MongoDB is not running" -ForegroundColor Red
    Write-Host "Please start MongoDB first:" -ForegroundColor Yellow
    Write-Host "  Option 1: net start MongoDB" -ForegroundColor Cyan
    Write-Host "  Option 2: mongod --dbpath C:\data\db" -ForegroundColor Cyan
    Write-Host "  Option 3: Use MongoDB Atlas (cloud)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "See SETUP_INSTRUCTIONS.md for detailed instructions" -ForegroundColor Yellow
    exit 1
}

# Function to start server in background
function Start-Server {
    Write-Host "🔧 Starting backend server..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-Command", "cd 'C:\Users\ashra\mern-project\server'; npm run dev" -WindowStyle Normal
    Start-Sleep -Seconds 3
}

# Function to start client in background
function Start-Client {
    Write-Host "🎨 Starting frontend client..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-Command", "cd 'C:\Users\ashra\mern-project\client'; npm run dev" -WindowStyle Normal
    Start-Sleep -Seconds 3
}

# Start server
Start-Server

# Start client
Start-Client

Write-Host ""
Write-Host "✅ Both server and client should be starting..." -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 To test authentication:" -ForegroundColor Yellow
Write-Host "  1. Go to http://localhost:5173" -ForegroundColor Cyan
Write-Host "  2. Click 'Create new account'" -ForegroundColor Cyan
Write-Host "  3. Register with name, email, and password" -ForegroundColor Cyan
Write-Host "  4. Try logging in with the created account" -ForegroundColor Cyan
Write-Host ""
Write-Host "🛠️ If issues persist, check SETUP_INSTRUCTIONS.md" -ForegroundColor Yellow
