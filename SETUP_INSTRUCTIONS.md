# MERN Project Setup Instructions


## Step 1: Install MongoDB (Choose one option)

### Option A: MongoDB Community Server (Recommended)
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install it with default settings
3. MongoDB should start automatically as a Windows service

### Option B: MongoDB with Docker (Alternative)
1. Install Docker Desktop from: https://www.docker.com/products/docker-desktop/
2. Run: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

### Option C: MongoDB Atlas (Cloud - Free tier available)
1. Sign up at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update your .env file with the Atlas connection string

## Step 2: Start MongoDB (if using local installation)

### For Windows Service:
```powershell
# Start MongoDB service
net start MongoDB

# Check if it's running
tasklist | findstr mongod
```

### For Manual Start:
```powershell
# Create data directory (if not exists)
mkdir C:\data\db

# Start MongoDB
mongod --dbpath C:\data\db
```

## Step 3: Start the Backend Server

```powershell
# Navigate to server directory
cd "C:\Users\ashra\mern-project\server"

# Install dependencies (if not done)
npm install

# Start the server
npm run dev
```

You should see:
- "Server is running on port 5000"
- "Connected to MongoDB"

## Step 4: Start the Frontend

```powershell
# Open new terminal and navigate to client directory
cd "C:\Users\ashra\mern-project\client"

# Install dependencies (if not done)
npm install

# Start the client
npm run dev
```

## Step 5: Test Authentication

1. Open your browser and go to: http://localhost:5173
2. Try to create a new account
3. Try to login with the created account

## Troubleshooting

### If MongoDB connection fails:
1. Check if MongoDB is running: `tasklist | findstr mongod`
2. Check the connection string in your .env file
3. Make sure port 27017 is not blocked

### If server starts but auth fails:
1. Check server logs for errors
2. Verify JWT_SECRET is set in .env
3. Check if all dependencies are installed

### If client can't connect to server:
1. Make sure server is running on port 5000
2. Check CORS settings in server/index.js
3. Verify API base URL in client/src/services/api.js

## Current Configuration Status ✅

Your code is properly configured:
- ✅ Authentication routes are set up
- ✅ User model with password hashing
- ✅ JWT token generation and verification
- ✅ Frontend auth service and context
- ✅ Environment variables configured
- ✅ CORS settings for localhost

The only missing piece is MongoDB running!

## Next Steps After Setup

1. Test user registration
2. Test user login
3. Test protected routes
4. Check token persistence in localStorage
