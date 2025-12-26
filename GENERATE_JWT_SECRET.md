# How to Generate JWT_SECRET

## What is JWT_SECRET?

`JWT_SECRET` is a secret key used to sign and verify JWT (JSON Web Tokens) for user authentication. It's **NOT** something you get from a service - you **generate it yourself**.

## Why is it needed?

- **Signing tokens**: When a user logs in, the server creates a JWT token signed with this secret
- **Verifying tokens**: When a user makes authenticated requests, the server verifies the token using this secret
- **Security**: Only someone with this secret can create valid tokens

## How to Generate a Secure JWT_SECRET

### Option 1: Using Node.js (Recommended)

Open a terminal in your `backend` folder and run:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

This will generate a 128-character random hexadecimal string like:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
```

### Option 2: Using OpenSSL

```bash
openssl rand -hex 64
```

### Option 3: Using Online Generator

Visit: https://generate-secret.vercel.app/64
- Set length to 64 (or higher)
- Copy the generated string

### Option 4: Simple Random String

You can also use any long, random string (at least 32 characters), for example:
```
my-super-secret-jwt-key-2024-expense-tracker-app-change-this-in-production
```

**⚠️ Important**: Make it long and random! Don't use simple words or predictable patterns.

## Where to Set JWT_SECRET

### 1. Local Development (.env file)

Create or update `backend/.env`:

```env
JWT_SECRET=your-generated-secret-key-here
JWT_EXPIRE=7d
MONGODB_URI=your-mongodb-connection-string
NODE_ENV=development
PORT=3001
```

### 2. Vercel (Production)

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Click **Add New**
4. Add:
   - **Key**: `JWT_SECRET`
   - **Value**: (paste your generated secret)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

## Example .env File

```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense_tracker?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
JWT_EXPIRE=7d
NODE_ENV=development
```

## Security Best Practices

1. ✅ **Use a long, random string** (at least 64 characters)
2. ✅ **Never commit JWT_SECRET to Git** (it's in .gitignore)
3. ✅ **Use different secrets for development and production**
4. ✅ **Keep it secret** - don't share it publicly
5. ✅ **Change it if compromised**

## Quick Setup

1. Generate a secret using one of the methods above
2. Copy the generated string
3. Add it to `backend/.env` file
4. Add it to Vercel Environment Variables
5. Restart your server/Vercel deployment

That's it! Your JWT authentication will now work.

