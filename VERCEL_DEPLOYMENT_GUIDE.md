# 🚀 BRUDF Website: GitHub to Vercel Deployment Guide

## Complete Step-by-Step Instructions for Vercel Deployment with Supabase Database

### 📋 Prerequisites Checklist

- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Supabase project created
- ✅ Your BRUDF website code ready

---

## 🗄️ Part 1: Database Setup (Supabase)

### Step 1: Verify Your Supabase Configuration

Your Supabase project is already configured! Here are your details:

```env
SUPABASE_URL=https://srgmywlwvjpevwarofdt.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZ215d2x3dmpwZXZ3YXJvZmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODk2MzIsImV4cCI6MjA3NTI2NTYzMn0.OYFYoMhBZmRrtn9Q9w6w7bIWl1yDPcMH5stqmYDsfLk
```

### Step 2: Get Missing Supabase Service Key

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `srgmywlwvjpevwarofdt`
3. Go to **Settings** → **API**
4. Copy the **service_role** key (not the anon key)
5. Keep this key safe - you'll need it for Vercel

---

## 📚 Part 2: Local Testing (Optional but Recommended)

### Step 1: Test Database Connection Locally

```bash
# Navigate to your project
cd /Users/rishad/React/clubsitev2

# Install dependencies
npm install

# Setup database tables
npm run db:setup

# Test database connection
npm run db:test

# Test with write operations
npm run db:test -- --test-write
```

### Step 2: Test Local Application

```bash
# Build and start the application
npm run build
npm start

# Open http://localhost:3001
# Test member registration form
# Verify data is saved to Supabase
```

---

## 🐙 Part 3: GitHub Repository Setup

### Step 1: Prepare Your Repository

```bash
# Make sure all files are committed
git add .
git commit -m "Ready for Vercel deployment with Supabase"
git push origin main
```

### Step 2: Verify Repository Structure

Your repository should have these key files:

- ✅ `vercel.json` (Vercel configuration)
- ✅ `package.json` (with vercel-build script)
- ✅ `.env.vercel` (environment template)
- ✅ `server/` (backend code)
- ✅ `dist/` (built frontend - created by build)

---

## ⚡ Part 4: Vercel Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"New Project"**
4. Select your repository: `BRUDF_Site_2`
5. Click **"Import"**

### Step 2: Configure Build Settings

Vercel should auto-detect these settings (verify they're correct):

```
Framework Preset: Vite
Build Command: npm run vercel-build
Output Directory: dist
Install Command: npm install
```

### Step 3: Add Environment Variables

In the Vercel project setup, add these environment variables:

**Database Configuration:**

```
DB_PROVIDER = supabase
SUPABASE_URL = https://srgmywlwvjpevwarofdt.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZ215d2x3dmpwZXZ3YXJvZmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODk2MzIsImV4cCI6MjA3NTI2NTYzMn0.OYFYoMhBZmRrtn9Q9w6w7bIWl1yDPcMH5stqmYDsfLk
SUPABASE_SERVICE_KEY = [GET THIS FROM SUPABASE DASHBOARD]
SUPABASE_HOST = db.srgmywlwvjpevwarofdt.supabase.co
SUPABASE_DB = postgres
SUPABASE_USER = postgres
SUPABASE_PASSWORD = brudfisbest1.
```

**Application Settings:**

```
NODE_ENV = production
ADMIN_PASSWORD = brudf2024admin
PORT = 3001
```

**Security Settings:**

```
DB_ENCRYPTION_KEY = [GENERATE 32 CHARACTER KEY]
JWT_SECRET = [GENERATE JWT SECRET]
RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX_REQUESTS = 50
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (3-5 minutes)
3. Get your live URL: `https://your-project.vercel.app`

---

## 🔧 Part 5: Post-Deployment Setup

### Step 1: Initialize Production Database

After successful deployment, initialize your database:

1. **Option A: Using Vercel CLI**

   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login
   vercel login

   # Link to your project
   vercel link

   # Run database setup
   vercel exec npm run db:setup
   ```

2. **Option B: Using Supabase Dashboard**

   - Go to Supabase → SQL Editor
   - Run this SQL to create the members table:

   ```sql
   CREATE TABLE IF NOT EXISTS members (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     phone VARCHAR(20) NOT NULL,
     blood_group VARCHAR(5),
     department VARCHAR(100),
     year VARCHAR(10),
     motivation TEXT,
     experience TEXT,
     interests TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
   CREATE INDEX IF NOT EXISTS idx_members_department ON members(department);
   CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at);
   ```

### Step 2: Test Your Live Website

1. **Visit your Vercel URL**
2. **Test member registration:**
   - Fill out the membership form
   - Submit and verify success message
3. **Test admin panel:**
   - Press `Ctrl+Shift+A` or click footer link
   - Use password: `brudf2024admin`
   - Verify member data appears
4. **Test API endpoints:**
   - `https://your-url.vercel.app/api/health`
   - Should return `{"status": "OK", "database": "connected"}`

---

## 🔍 Part 6: Verification & Troubleshooting

### ✅ Success Checklist

- [ ] Website loads at Vercel URL
- [ ] Member registration form works
- [ ] Data appears in admin panel
- [ ] Data persists in Supabase
- [ ] API health check returns OK
- [ ] No console errors

### 🐛 Common Issues & Solutions

**Issue: "Database connection failed"**

```bash
Solution: Check environment variables in Vercel dashboard
- Verify all SUPABASE_* variables are set correctly
- Ensure no extra spaces in values
```

**Issue: "API routes not working"**

```bash
Solution: Check vercel.json configuration
- Ensure API routes are properly configured
- Verify build completed successfully
```

**Issue: "Cannot connect to Supabase"**

```bash
Solution: Check Supabase project status
- Ensure project is not paused
- Verify service key has correct permissions
- Check Supabase dashboard for any issues
```

---

## 🎉 Part 7: Final Steps

### Step 1: Configure Custom Domain (Optional)

1. In Vercel dashboard → Domains
2. Add your custom domain
3. Update DNS settings as instructed
4. Update CORS_ORIGIN environment variable

### Step 2: Enable Auto-Deploy

- ✅ Already configured!
- Every push to `main` branch will auto-deploy
- Monitor deployments in Vercel dashboard

### Step 3: Monitor & Maintain

- **Database**: Monitor usage in Supabase dashboard
- **Performance**: Check Vercel analytics
- **Backups**: Supabase handles automatic backups
- **Updates**: Simply push to GitHub for new deployments

---

## 📞 Quick Reference

**Live Website:** `https://your-project.vercel.app`
**Admin Panel:** Press `Ctrl+Shift+A` (Password: `brudf2024admin`)
**API Health:** `https://your-project.vercel.app/api/health`
**Supabase Dashboard:** [supabase.com/dashboard](https://supabase.com/dashboard)
**Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)

---

## 🆘 Need Help?

**Deployment Issues:**

1. Check Vercel build logs
2. Verify environment variables
3. Test API endpoints

**Database Issues:**

1. Check Supabase dashboard
2. Verify connection strings
3. Test with local environment

**Application Issues:**

1. Check browser console
2. Test member registration
3. Verify admin panel access

---

**🎯 You're All Set!** Your BRUDF website is now live on Vercel with a secure Supabase database. Members can register, data is persistent, and you have a professional admin panel to manage everything! 🚀
