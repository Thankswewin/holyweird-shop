# HolyWeird Production Setup Guide

## Quick Start (5 Minutes)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **"New Project"**
3. Name it `holyweird-shop`
4. Set a secure database password (save this!)
5. Select region closest to your users
6. Click **"Create new project"** and wait ~2 minutes

### 2. Get Your Credentials
Once project is ready:
1. Go to **Settings → API**
2. Copy these values:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`  
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Create Database Tables
1. Go to **SQL Editor** in Supabase dashboard
2. Click **"New Query"**
3. Paste the contents of `server/db/schema.sql`
4. Click **"Run"**

### 4. Seed Products
Run locally (after adding credentials to `.env`):
```bash
npm run seed
```

### 5. Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `holyweird-shop` from GitHub
3. Add Environment Variables:
   - `VITE_API_URL` = your backend URL (or leave blank for local)

---

## Environment Variables Reference

### Backend (Railway/Render)
```env
NODE_ENV=production
PORT=3001

# Supabase (REQUIRED)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# PayPal
PAYPAL_ME_LINK=https://www.paypal.me/YOUR_USERNAME

# Frontend URL
FRONTEND_URL=https://holyweird-shop.vercel.app
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend.railway.app
```

---

## Deployment Options

### Option A: Vercel Only (Frontend + API Routes)
- Simpler setup
- Uses Vercel serverless functions
- Add all env vars directly in Vercel dashboard

### Option B: Vercel + Railway (Recommended)
- Frontend on Vercel
- Backend on Railway
- Better for handling webhooks and background tasks

---

## PayPal Setup
1. Go to [paypal.me](https://www.paypal.me)
2. Create your PayPal.me link
3. Update the link in:
   - `src/pages/Cart.jsx` (line 8)
   - `src/components/cart/CartDrawer.jsx` (line 8)

---

## Checklist
- [ ] Supabase project created
- [ ] Database schema run
- [ ] Products seeded
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed (if using Option B)
- [ ] Environment variables configured
- [ ] PayPal link updated
- [ ] Custom domain connected (optional)
