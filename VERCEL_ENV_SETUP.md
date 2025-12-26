# How to Add Environment Variables in Vercel (FREE Version)

## ⚠️ Important: You DON'T Need Pro!

The "Create Pre-production Environment" modal is for creating **separate environments** (like staging). You **don't need that** for basic setup!

You just need to add environment variables to the **existing Production environment**.

## Step-by-Step Instructions

### 1. Navigate to Environment Variables

1. Go to your Vercel project: `expense_tracker_backend`
2. Click **"Settings"** in the top navigation
3. In the left sidebar, find **"Environment Variables"** (under "Build and Deployment")
4. Click on **"Environment Variables"**

### 2. Add Your Variables

You'll see a section with "Environment Variables" and an **"Add New"** button.

**Click "Add New"** and add each variable:

#### Variable 1: MONGODB_URI
- **Key**: `MONGODB_URI`
- **Value**: Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority`)
- **Environment**: Check ✅ **Production** (you can also check Preview and Development if you want)
- Click **"Save"**

#### Variable 2: JWT_SECRET
- **Key**: `JWT_SECRET`
- **Value**: Generate one by running in your terminal:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
  Copy the output and paste it here
- **Environment**: Check ✅ **Production** (and optionally Preview/Development)
- Click **"Save"**

#### Variable 3: JWT_EXPIRE
- **Key**: `JWT_EXPIRE`
- **Value**: `7d`
- **Environment**: Check ✅ **Production** (and optionally Preview/Development)
- Click **"Save"**

#### Variable 4: NODE_ENV
- **Key**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Check ✅ **Production**
- Click **"Save"**

### 3. Redeploy

After adding all variables:
1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Or simply push a new commit to trigger a new deployment

## What You Should See

After adding variables, you should see a table like this:

| Key | Value | Environments | Actions |
|-----|-------|--------------|---------|
| MONGODB_URI | mongodb+srv://... | Production | Edit / Delete |
| JWT_SECRET | a1b2c3d4... | Production | Edit / Delete |
| JWT_EXPIRE | 7d | Production | Edit / Delete |
| NODE_ENV | production | Production | Edit / Delete |

## Troubleshooting

**Q: I see "Create Pre-production Environment" modal**
- **A**: Close it! You don't need it. Just go to "Environment Variables" directly.

**Q: Do I need Pro version?**
- **A**: No! Environment variables are free. Only creating separate environments (staging, etc.) requires Pro.

**Q: Where do I find Environment Variables?**
- **A**: Settings → Environment Variables (in the left sidebar under "Build and Deployment")

**Q: My deployment still fails**
- **A**: Make sure you:
  1. Added all 4 variables
  2. Selected "Production" environment for each
  3. Redeployed after adding variables
  4. Check the deployment logs for specific errors

## Quick Checklist

- [ ] Added `MONGODB_URI`
- [ ] Added `JWT_SECRET` (generated a secure random string)
- [ ] Added `JWT_EXPIRE` (set to `7d`)
- [ ] Added `NODE_ENV` (set to `production`)
- [ ] All variables have "Production" environment selected
- [ ] Redeployed the project

That's it! Your backend should now work on Vercel! 🎉

