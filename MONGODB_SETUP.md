# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

### Step 1: Create Free Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Cluster
1. After login, click "Build a Database"
2. Choose "FREE" (M0) tier
3. Select a cloud provider and region (choose closest to you)
4. Click "Create"

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### Step 4: Whitelist IP Address
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development) or add your IP
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
4. Replace `<password>` with your actual password
5. Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority`

### Step 6: Update .env File
Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority
```

---

## Option 2: Local MongoDB Installation (Windows)

### Step 1: Download MongoDB
1. Go to https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or newer)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. Check "Install MongoDB as a Service"
4. Choose "Run service as Network Service user"
5. Check "Install MongoDB Compass" (GUI tool - optional but helpful)
6. Click "Install"

### Step 3: Verify Installation
1. Open Command Prompt or PowerShell as Administrator
2. Run: `mongod --version`
3. You should see MongoDB version info

### Step 4: Start MongoDB Service
MongoDB should start automatically as a Windows service. To check:
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find "MongoDB" service
4. Ensure it's "Running"

If not running:
- Right-click → Start
- Or set "Startup type" to "Automatic"

### Step 5: Test Connection
1. Open Command Prompt
2. Run: `mongosh` (or `mongo` for older versions)
3. You should see MongoDB shell prompt
4. Type `exit` to quit

### Step 6: Update .env File
Your `.env` file should already have:
```
MONGODB_URI=mongodb://localhost:27017/expense_tracker
```

This should work if MongoDB is running locally.

---

## Option 3: MongoDB via Docker (Advanced)

If you have Docker installed:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then use in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/expense_tracker
```

---

## Verify Connection

After setup, restart your backend server:
```bash
cd backend
npm run dev
```

You should see:
```
MongoDB Connected: localhost (or your Atlas cluster name)
Server running on port 3001
```

If you see connection errors, check:
1. MongoDB service is running (for local)
2. Connection string is correct (for Atlas)
3. IP is whitelisted (for Atlas)
4. Username/password are correct (for Atlas)

---

## Recommended: MongoDB Atlas (Cloud)
- ✅ No installation needed
- ✅ Free tier available
- ✅ Works from anywhere
- ✅ Automatic backups
- ✅ Easy to share with team

## Local MongoDB
- ✅ Full control
- ✅ No internet required
- ✅ Faster (no network latency)
- ❌ Requires installation
- ❌ Manual backups needed

