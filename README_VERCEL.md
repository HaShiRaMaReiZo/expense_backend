# Deploying to Vercel

## Setup Instructions

1. **Environment Variables in Vercel (FREE - No Pro needed!):**
   - Go to your Vercel project settings
   - In the left sidebar, click **"Environment Variables"** (under "Build and Deployment")
   - **IMPORTANT**: You don't need to create a new environment! Just add variables to the existing "Production" environment
   - Click **"Add New"** button
   - Add the following variables one by one:
     - `MONGODB_URI` - Your MongoDB connection string
       - Value: Your MongoDB connection string
       - Environment: Select "Production" (and optionally Preview/Development)
     - `JWT_SECRET` - Your JWT secret key
       - Value: Generate one using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
       - Environment: Select "Production" (and optionally Preview/Development)
     - `JWT_EXPIRE` - JWT expiration
       - Value: `7d`
       - Environment: Select "Production" (and optionally Preview/Development)
     - `NODE_ENV` - Environment type
       - Value: `production`
       - Environment: Select "Production"
   - Click **"Save"** after each variable

2. **Deploy:**
   - Push your code to the connected Git repository
   - Vercel will automatically deploy
   - Or use Vercel CLI: `vercel --prod`

3. **Update Frontend API URL:**
   - Update `expense_app/services/api.ts` with your Vercel deployment URL
   - Replace `https://expensetrackerbackend-mu.vercel.app/api` with your actual Vercel URL

## Important Notes

- The backend is configured to work both locally and on Vercel
- Database connection is optimized for serverless functions
- All routes are accessible at: `https://your-vercel-url.vercel.app/api/*`

## Testing

After deployment, test the health endpoint:
```
https://your-vercel-url.vercel.app/api/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

