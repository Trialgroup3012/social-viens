# 🚀 Social Viens — Complete Deployment Guide

> **A beginner-friendly, step-by-step guide to deploy this website to Vercel (or any similar platform) — from zero to live in under 30 minutes.**

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green)](#)

---

## 📑 Table of Contents

1. [Quick Overview — What You'll Need](#1-quick-overview--what-youll-need)
2. [Platform Comparison — Where Should You Deploy?](#2-platform-comparison--where-should-you-deploy)
3. [Pre-Deployment Checklist](#3-pre-deployment-checklist)
4. [Method 1: Vercel Website (Easiest — Recommended)](#4-method-1-vercel-website-easiest--recommended)
5. [Method 2: Vercel CLI (Terminal-based)](#5-method-2-vercel-cli-terminal-based)
6. [Method 3: Netlify (Alternative)](#6-method-3-netlify-alternative)
7. [Method 4: Railway (With Database Included)](#7-method-4-railway-with-database-included)
8. [Environment Variables Reference](#8-environment-variables-reference)
9. [Optional: Free Postgres Database (Neon)](#9-optional-free-postgres-database-neon)
10. [Custom Domain Setup](#10-custom-domain-setup)
11. [Post-Deployment Verification](#11-post-deployment-verification)
12. [Troubleshooting — Common Errors & Fixes](#12-troubleshooting--common-errors--fixes)
13. [Maintenance & Updates](#13-maintenance--updates)
14. [Quick Reference Cheat Sheet](#14-quick-reference-cheat-sheet)

---

## 1. Quick Overview — What You'll Need

### What this project is
A premium digital-marketing-agency website built with **Next.js 16** + **TypeScript** + **Tailwind CSS** + **Prisma**. It includes 29 animated sections, an AI chatbot, a free-audit tool, blog, portfolio, pricing, testimonials, and a full admin CMS.

### Accounts & tools you'll need (all free)

| Tool | Purpose | Cost |
|------|---------|------|
| **GitHub** account | Host your code | Free |
| **Vercel** account | Deploy & host the website | Free tier (generous) |
| **Neon** account *(optional)* | Free Postgres database | Free tier (no credit card) |
| **Node.js 20 LTS** installed | Run the project locally | Free |
| **Bun** installed | Package manager | Free |
| **Git** installed | Version control | Free |

> 💡 **Total cost for a hobby project: $0/month.** Vercel's free tier handles ~100 visits/day easily.

### Estimated time

| Step | Time |
|------|------|
| Install prerequisites | 10 min (one-time) |
| Push code to GitHub | 5 min |
| Deploy to Vercel | 5 min |
| Add custom domain *(optional)* | 10 min |
| Set up Postgres *(optional)* | 10 min |
| **Total** | **~30 min** |

---

## 2. Platform Comparison — Where Should You Deploy?

| Platform | Difficulty | Free Tier | Next.js Support | Postgres Included? | Best For |
|----------|:----------:|:---------:|:---------------:|:------------------:|----------|
| **Vercel** ⭐ | ![Easy](https://img.shields.io/badge/-Easy-green) | Generous | ★★★★★ (made by Next.js team) | ❌ (use Neon) | **Beginners — pick this** |
| **Netlify** | ![Easy](https://img.shields.io/badge/-Easy-green) | OK | ★★★★ Good | ❌ | Alternative to Vercel |
| **Railway** | ![Medium](https://img.shields.io/badge/-Medium-yellow) | $5 trial credit | ★★★★ Good | ✅ Built-in | All-in-one hosting |
| **Render** | ![Medium](https://img.shields.io/badge/-Medium-yellow) | Limited | ★★★ OK | ✅ Paid | Simple deployments |
| **Cloudflare Pages** | ![Medium](https://img.shields.io/badge/-Medium-yellow) | Generous | ★★★ OK | ❌ | Edge performance |

### 🏆 Our Recommendation: **Vercel**

**Why?**
- Made by the same team that makes Next.js → zero config, best performance
- Automatic HTTPS, global CDN, instant deploys on every `git push`
- Free tier covers most small-business websites
- Preview deployments for every branch (see changes before going live)
- Built-in analytics, speed insights, and logs

This guide focuses on **Vercel**, but Methods 3 & 4 cover Netlify and Railway if you prefer those.

---

## 3. Pre-Deployment Checklist

Before you deploy, verify these are done:

### ✅ Local environment ready
```bash
# Check Node.js is installed
node --version    # should print v20.x.x

# Check Bun is installed
bun --version     # should print 1.x.x

# Check Git is installed
git --version
```

If any of these fail, install from:
- **Node.js 20 LTS:** <https://nodejs.org/>
- **Bun:** <https://bun.sh/> (run `curl -fsSL https://bun.sh/install | bash`)
- **Git:** <https://git-scm.com/downloads>

### ✅ Project files ready
After unzipping `social-viens-complete.zip`, your folder should contain:

```
social-viens-complete/
├── src/                          # ← source code
├── prisma/                       # ← database schema
├── public/                       # ← images (67 files)
├── examples/
├── package.json                  # ← dependencies
├── bun.lock                      # ← lockfile
├── vercel.json                   # ← Vercel config
├── .env.example                  # ← env template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── README.md
├── SETUP.md
└── START-HERE.txt
```

> ⚠️ **If `node_modules/` is missing — that's normal.** It's not in the zip. Run `bun install` to generate it.

### ✅ Project runs locally (verify before deploying)
```bash
cd social-viens-complete
bun install
cp .env.example .env       # Windows: copy .env.example .env
bun run db:push
bun run dev
```
Open <http://localhost:3000> — if the site loads, you're ready to deploy! 🎉

---

## 4. Method 1: Vercel Website (Easiest — Recommended)

> **Best for:** First-timers, non-technical users, anyone who wants the simplest path.

### Step 1: Push your code to GitHub

Vercel deploys from GitHub, so your code needs to be there first.

#### Option A — GitHub Desktop (no terminal needed)

1. Download **[GitHub Desktop](https://desktop.github.com/)** (free, Mac & Windows)
2. Sign in with your GitHub account
3. Click **"File" → "New Repository"**
4. Fill in:
   - **Name:** `social-viens`
   - **Local path:** pick a folder on your computer
   - **Initialize with README:** ✅ checked
5. Click **"Create repository"**
6. Open the repository folder in your file explorer
7. Copy **all files** from your unzipped `social-viens-complete` folder into this repo folder
   - ⚠️ **Do NOT copy these folders:** `node_modules/`, `.next/`, `db/`
   - ✅ **Do copy:** `src/`, `prisma/`, `public/`, all config files
8. Back in GitHub Desktop, you'll see all the new files listed
9. In the bottom-left, type a commit message: `Initial commit — Social Viens website`
10. Click **"Commit to main"**
11. Click **"Push origin"** (top right) → code uploads to GitHub

#### Option B — GitHub Website (no software install)

1. Go to **[github.com/new](https://github.com/new)**
2. Repository name: `social-viens`
3. ✅ Check **"Add a README file"**
4. Click **"Create repository"**
5. On the next page, click **"uploading an existing file"** link
6. **Drag all your project files** into the box (except `node_modules/`, `.next/`, `db/`)
   - ⚠️ GitHub web upload has a 100-file limit per upload. You may need to upload in batches (folders first, then root files).
7. Scroll down, type commit message: `Initial commit`
8. Click **"Commit changes"**

#### Option C — Git Command Line

```bash
cd social-viens-complete

# Initialize git repo
git init
git branch -M main

# Add all files (respecting .gitignore)
git add .

# First commit
git commit -m "Initial commit — Social Viens website"

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/social-viens.git

# Push to GitHub
git push -u origin main
```

> 💡 If `git push` asks for credentials, use a **[Personal Access Token](https://github.com/settings/tokens)** as your password (GitHub no longer accepts account passwords for git operations).

---

### Step 2: Import the project into Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Sign in with your **GitHub account** (same one you used above)
3. You'll see a list of your GitHub repositories
4. Find `social-viens` and click **"Import"**

![Vercel import screen]

---

### Step 3: Configure the project

Vercel will auto-detect Next.js and pre-fill most settings. Verify these:

| Setting | Expected Value | Notes |
|---------|----------------|-------|
| **Framework Preset** | Next.js | Auto-detected ✅ |
| **Root Directory** | `./` (default) | Leave as-is |
| **Build Command** | `bun run build:vercel` | From `vercel.json` ✅ |
| **Output Directory** | (leave blank) | Vercel handles it |
| **Install Command** | `bun install` | Auto-detected ✅ |
| **Development Command** | `bun run dev` | For preview envs |

> 💡 **If any of these are wrong**, click the field and type the correct value manually. The `vercel.json` file in the repo should auto-configure everything.

---

### Step 4: Add Environment Variables (IMPORTANT)

This is the most common step people miss. Click the **"Environment Variables"** section and add:

#### Required (minimum):

| Name | Value | Environments |
|------|-------|:------------:|
| `DATABASE_URL` | `file:./db/custom.db` | ☑️ Production ☑️ Preview ☑️ Development |

#### Optional (for full functionality):

| Name | Value | Environments |
|------|-------|:------------:|
| `OPENAI_API_KEY` | `sk-...` (from OpenAI) | ☑️ Production ☑️ Preview |
| `SMTP_HOST` | `smtp.resend.com` | ☑️ Production |
| `SMTP_PORT` | `465` | ☑️ Production |
| `SMTP_SECURE` | `true` | ☑️ Production |
| `SMTP_USER` | `resend` | ☑️ Production |
| `SMTP_PASS` | `re_...` (from Resend) | ☑️ Production |
| `SMTP_FROM_EMAIL` | `reports@yourdomain.com` | ☑️ Production |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | ☑️ Production |

> 📌 **About the SQLite `DATABASE_URL`:**
> - ✅ The public website will render perfectly (uses built-in fallback data)
> - ❌ Admin changes, captured leads, and chat history will NOT persist (Vercel's serverless filesystem resets on every cold start)
> - 🔧 **For production use, set up Postgres** (see [Section 9](#9-optional-free-postgres-database-neon))

---

### Step 5: Deploy! 🎉

1. Click the big blue **"Deploy"** button
2. Wait **2-3 minutes** — Vercel will:
   - Install dependencies (`bun install`)
   - Run Prisma generate
   - Build the Next.js app (`next build`)
   - Deploy to a global CDN
3. You'll see a **"Congratulations"** screen with confetti 🎊
4. Click **"Visit"** to see your live website!
5. Your URL will look like: `social-viens-abc123.vercel.app`

> 💡 **First deploy takes ~3 minutes.** Subsequent deploys are faster (~1 min) because of caching.

---

### Step 6: Seed the production database (optional but recommended)

Once deployed, visit this URL in your browser to load demo content (blog posts, portfolio, admin user, etc.):

```
https://YOUR-VERCEL-URL.vercel.app/api/seed
```

You should see JSON like:
```json
{ "success": true, "results": { "services": 9, "blogPosts": 8, "portfolio": 12, "testimonials": 8, "pricing": 3, "settings": 5, "admin": 1 } }
```

> ⚠️ **Note:** With SQLite, this seed data will disappear on the next cold start. Use Postgres (Section 9) for persistent data.

Now you can log into the admin panel:
- **URL:** `https://YOUR-VERCEL-URL.vercel.app/admin/login`
- **Email:** `admin@socialviens.com`
- **Password:** `admin123`

> 🚨 **CHANGE THIS PASSWORD IMMEDIATELY after first login!** (Admin → Settings)

---

## 5. Method 2: Vercel CLI (Terminal-based)

> **Best for:** Developers comfortable with the terminal, or those who want automated deploys from their local machine.

### Step 1: Install Vercel CLI

```bash
# Install globally with Bun
bun add -g vercel

# Or with npm
npm install -g vercel

# Verify installation
vercel --version
```

### Step 2: Log in to Vercel

```bash
vercel login
```
This opens a browser to authenticate. Pick **"Continue with GitHub"** (or whichever you used).

### Step 3: Deploy from your project folder

```bash
cd social-viens-complete

# Preview deploy (creates a temporary URL)
vercel

# Answer the prompts:
# ? Set up and deploy "social-viens-complete"? [Y/n] y
# ? Which scope do you want to deploy to? → pick your account
# ? Link to existing project? [y/N] n
# ? What's your project's name? social-viens
# ? In which directory is your code located? ./
# Vercel will detect Next.js and auto-configure settings
# ? Want to modify these settings? [y/N] n
```

Vercel deploys to a preview URL like `social-viens-abc123.vercel.app`. Open it to verify.

### Step 4: Set environment variables

```bash
# Add DATABASE_URL (interactive — it'll prompt for value & environments)
vercel env add DATABASE_URL
# Paste: file:./db/custom.db
# Select: Production, Preview, Development (press Space to select, Enter to confirm)

# Verify it was added
vercel env ls
```

### Step 5: Deploy to production

```bash
vercel --prod
```

This deploys to your production URL. Every `vercel --prod` command redeploys with the latest code.

### Step 6: Useful CLI commands

```bash
# Check deployment status
vercel ls

# View logs of latest deployment
vercel logs

# Pull environment variables to local .env
vercel env pull

# Delete a deployment
vercel rm <deployment-url>

# Open project in dashboard
vercel open
```

---

## 6. Method 3: Netlify (Alternative)

> **Best for:** If you already use Netlify, or want an alternative to Vercel.

### Step 1: Push to GitHub (same as Method 1, Step 1)

### Step 2: Import to Netlify

1. Go to **[app.netlify.com/start](https://app.netlify.com/start)**
2. Sign in with GitHub
3. Pick your `social-viens` repo
4. Configure:
   - **Base directory:** (leave blank)
   - **Build command:** `bun run build:vercel`
   - **Publish directory:** `.next`
   - **Functions directory:** (leave blank)
5. Click **"Deploy site"**

### Step 3: Add environment variables

Netlify Dashboard → Site → Site configuration → Environment variables → Add:
- `DATABASE_URL` = `file:./db/custom.db`

### Step 4: Install Next.js plugin

Netlify Dashboard → Site → Plugins → search "Next.js" → Install **`@netlify/plugin-nextjs`**

### Step 5: Trigger redeploy

Site → Deploys → "Trigger deploy" → "Deploy site"

> ⚠️ **Note:** Netlify's Next.js support is good but slightly behind Vercel's. Some features (like Edge Runtime) may behave differently. For this project, Vercel is recommended.

---

## 7. Method 4: Railway (With Database Included)

> **Best for:** If you want hosting + Postgres database in one platform.

### Step 1: Go to Railway

1. Visit **[railway.app](https://railway.app)** → Sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Pick your `social-viens` repo

### Step 2: Add a Postgres database

1. In your Railway project, click **"+" (New)** → **"Database"** → **"Add PostgreSQL"**
2. Railway creates a Postgres instance and gives you a connection string

### Step 3: Configure the app

1. Click your `social-viens` service → **"Variables"** tab
2. Add:
   - `DATABASE_URL` = (click "Reference" → pick the Postgres `DATABASE_URL`)
3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"    # change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
4. Commit + push to GitHub — Railway auto-redeploys

### Step 4: Run database migration

In Railway → your service → **"Settings"** → **"Start Command"**:
```
bun run db:push && bun run start:vercel
```

Or use Railway's **"Shell"** tab to run `bun run db:push` manually.

> 💡 **Railway gives you $5 free credit monthly**, which covers a small app + Postgres for ~2-3 weeks of free usage.

---

## 8. Environment Variables Reference

Here's the complete list of environment variables the project understands:

### 🔴 Required

| Name | Description | Example |
|------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./db/custom.db` (SQLite) or `postgresql://...` (Postgres) |

### 🟡 Optional — AI Chatbot

| Name | Description | Example |
|------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for chatbot | `sk-proj-...` |
| `GEMINI_API_KEY` | Google Gemini API key (alternative to OpenAI) | `AIzaSy...` |
| `ZAI_API_KEY` | Z.AI API key (alternative) | `zai-...` |

> 💡 Only ONE of the three AI keys is needed. If none are set, the chatbot uses a friendly fallback mode. You can also configure AI from the admin panel at `/admin/settings`.

### 🟡 Optional — Email (for PDF audit reports)

| Name | Description | Example |
|------|-------------|---------|
| `SMTP_HOST` | SMTP server host | `smtp.resend.com` |
| `SMTP_PORT` | SMTP port | `465` (SSL) or `587` (TLS) |
| `SMTP_SECURE` | Use SSL? | `true` for port 465, `false` for 587 |
| `SMTP_USER` | SMTP username | `resend` (for Resend) |
| `SMTP_PASS` | SMTP password / API key | `re_...` (Resend API key) |
| `SMTP_FROM_EMAIL` | From email address | `reports@yourdomain.com` |

> 💡 **Free SMTP option:** **[Resend](https://resend.com)** gives you 3,000 free emails/month. Or use **Gmail SMTP** (`smtp.gmail.com`, port 587) with an **[App Password](https://support.google.com/accounts/answer/185833)** (NOT your regular Gmail password).

### 🟢 Optional — SEO & Admin

| Name | Description | Example |
|------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your production URL (no trailing slash) | `https://yourdomain.com` |
| `ADMIN_EMAIL` | Where lead/chat notifications are sent | `founder@yourdomain.com` |

> ⚠️ **Variables prefixed with `NEXT_PUBLIC_`** are exposed to the browser. Never put secrets in these.

---

## 9. Optional: Free Postgres Database (Neon)

> **Why?** SQLite on Vercel's serverless platform has an **ephemeral filesystem** — your database file gets wiped on every cold start. This means admin changes, captured leads, and chat history disappear. For production, you need a real database.

**[Neon](https://neon.tech)** is the easiest free Postgres option (no credit card required).

### Step 1: Create a Neon database

1. Go to **[neon.tech](https://neon.tech)** → **"Sign up"** (use GitHub or email)
2. Click **"New Project"**
3. Fill in:
   - **Project name:** `social-viens`
   - **Database name:** `neondb` (default)
   - **Region:** Pick the closest to your Vercel region
     - If your `vercel.json` says `"regions": ["bom1"]` → pick **Asia Pacific (Singapore)** or **Mumbai (if available)**
     - Otherwise pick the closest to your users
4. Click **"Create project"**

### Step 2: Copy the connection string

Neon shows you a connection string that looks like:
```
postgresql://neondb_owner:npg_XxXxXxXxXxXx@ep-cool-name-12345-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

Copy this — you'll need it in Steps 4 and 5.

### Step 3: Update the Prisma schema

In your local project, open `prisma/schema.prisma` and change the `provider`:

```prisma
datasource db {
  provider = "postgresql"      // ← was "sqlite"
  url      = env("DATABASE_URL")
}
```

Commit this change and push to GitHub:
```bash
git add prisma/schema.prisma
git commit -m "Switch to Postgres for production"
git push origin main
```

### Step 4: Push the schema to Neon (create tables)

Set the Neon connection string locally and run `db:push`:

```bash
# Mac/Linux:
export DATABASE_URL="postgresql://neondb_owner:npg_XxXxXxXx@ep-xxx.neon.tech/neondb?sslmode=require"

# Windows PowerShell:
$env:DATABASE_URL="postgresql://neondb_owner:npg_XxXxXxXx@ep-xxx.neon.tech/neondb?sslmode=require"

# Create all tables in Neon
bun run db:push
```

You should see output like:
```
🚀 Your database is now in sync with your Prisma schema. Done in 1.2s
```

### Step 5: Update Vercel environment variable

1. Go to **Vercel Dashboard** → your project → **Settings** → **Environment Variables**
2. Find `DATABASE_URL` → click **"..."** → **"Edit"**
3. Replace the SQLite value with your Neon connection string:
   ```
   postgresql://neondb_owner:npg_XxXxXxXx@ep-xxx.neon.tech/neondb?sslmode=require
   ```
4. Make sure it's enabled for **Production**, **Preview**, and **Development**
5. Click **"Save"**

### Step 6: Redeploy

1. Vercel Dashboard → **Deployments** tab
2. Find the latest deployment → click **"..."** → **"Redeploy"**
3. Wait for the rebuild to complete

### Step 7: Seed the production database

Visit in your browser:
```
https://YOUR-VERCEL-URL.vercel.app/api/seed
```

You'll see JSON confirming the seed worked. Now your admin panel, contact forms, and chat history will **persist permanently**! 🎉

### 🆓 Neon free tier limits

- **Storage:** 0.5 GB (more than enough for a marketing site)
- **Compute:** 191.9 compute hours/month (~always-on for small sites)
- **Projects:** 1 project
- **Branches:** 10 (great for testing schema changes)

---

## 10. Custom Domain Setup

### Step 1: Buy a domain (if you don't have one)

Popular registrars:
- **[Namecheap](https://www.namecheap.com)** — cheap .com domains (~$10/year)
- **[Porkbun](https://porkbun.com)** — fun, transparent pricing
- **[Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)** — at-cost pricing
- **[GoDaddy](https://www.godaddy.com)** — popular but upsell-heavy

### Step 2: Add the domain to Vercel

1. Vercel Dashboard → your project → **Settings** → **Domains**
2. Enter your domain (e.g., `socialviens.com`) → click **"Add"**
3. Vercel shows you DNS records to add:
   - **A record:** `@ → 76.76.21.21`
   - **CNAME record:** `www → cname.vercel-dns.com`
4. Click **"Add www.<domain>.com" → "Redirect to main domain"** (recommended)

### Step 3: Configure DNS at your registrar

Log into your domain registrar's DNS settings and add the records Vercel showed you:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

> 💡 **DNS changes take 5 min to 48 hours to propagate.** You can check progress at **[whatsmydns.net](https://www.whatsmydns.net)**.

### Step 4: Verify

Once DNS propagates, Vercel automatically issues a free SSL certificate. Your site will be live at:
- `https://yourdomain.com` ✅
- `https://www.yourdomain.com` → redirects to main domain ✅

### Step 5: Update NEXT_PUBLIC_SITE_URL

After the domain is live, update this env var in Vercel:
```
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
```
This ensures sitemap.xml, canonical URLs, and OpenGraph tags point to your real domain.

---

## 11. Post-Deployment Verification

After your site is live, run through this checklist:

### ✅ Functional testing

| Test | How to verify | Expected result |
|------|---------------|-----------------|
| Homepage loads | Visit `/` | Preloader → full site renders |
| All sections visible | Scroll down | 27+ sections render with animations |
| Navigation works | Click nav links | Smooth scroll to sections |
| Mobile menu | Resize to mobile, tap hamburger | Menu opens, links work |
| AI chatbot | Click bottom-right chat icon | Bot responds (or fallback message if no API key) |
| Contact form | Fill + submit `/contact` form | Success toast, lead saved (if Postgres) |
| Free audit tool | Enter URL in Analysis Lab | Scan animation, results show |
| Admin login | Visit `/admin/login` | Can log in with `admin@socialviens.com` / `admin123` |
| Admin panel | Navigate around `/admin` | All CRUD pages load |
| Sitemap | Visit `/sitemap.xml` | XML sitemap loads |
| Robots | Visit `/robots.txt` | Robots.txt loads |

### ✅ Performance testing

- **[PageSpeed Insights](https://pagespeed.web.dev)** — aim for 90+ on mobile
- **[GTmetrix](https://gtmetrix.com)** — check load time, waterfall
- **Vercel Analytics** (Dashboard → Analytics tab) — real user monitoring

### ✅ SEO verification

- **[Google Rich Results Test](https://search.google.com/test/rich-results)** — test your structured data
- **[Google Search Console](https://search.google.com/search-console)** — add your property, submit sitemap
- **[Open Graph Debugger](https://www.opengraph.xyz)** — verify social share previews

### ✅ Security

- Change the admin password from the default `admin123`
- Verify HTTPS is enforced (Vercel does this automatically)
- Check security headers at **[securityheaders.com](https://securityheaders.com)** (should score A+)

---

## 12. Troubleshooting — Common Errors & Fixes

### ❌ Build fails: "prisma generate" error

**Symptom:** Vercel build log shows `Error: prisma generate failed` or `@prisma/client not found`

**Fix:**
1. Verify `DATABASE_URL` is set in Vercel Environment Variables
2. Check that `prisma/schema.prisma` exists in the repo
3. The `postinstall` script in `package.json` should auto-run `prisma generate` — verify it's there:
   ```json
   "postinstall": "prisma generate"
   ```
4. Redeploy

---

### ❌ Deploy succeeds but page shows 500 error

**Symptom:** Build succeeded, but visiting the URL shows "Application Error" or 500

**Fix:**
1. Vercel Dashboard → **"Logs"** tab → check the actual error
2. Most common cause: missing `DATABASE_URL` env var
3. The site should still render thanks to the fallback data system — but check logs for the real error
4. If the error is `PrismaClientInitializationError`, your `DATABASE_URL` is wrong or unreachable

---

### ❌ Admin changes / leads disappear after a few minutes

**Symptom:** You add a blog post in admin, refresh later, it's gone. Or a contact form submission doesn't show in admin.

**Cause:** You're using SQLite (`file:./db/custom.db`) on Vercel. Vercel's serverless filesystem is **ephemeral** — files are wiped between cold starts.

**Fix:** Switch to Postgres. See [Section 9](#9-optional-free-postgres-database-neon).

---

### ❌ "Module not found: Can't resolve '@prisma/client'"

**Symptom:** Local dev or build fails with this error.

**Fix:** The Prisma client wasn't generated. Run:
```bash
bun run db:generate    # generates the client from schema.prisma
bun run dev            # restart dev server
```

---

### ❌ The chatbot says "no AI provider configured"

**Symptom:** Chatbot opens but says it can't connect to an AI provider.

**Fix:** You haven't set an AI API key. Either:
- Add `OPENAI_API_KEY` or `GEMINI_API_KEY` to your env vars, OR
- Log into `/admin/settings` and paste the key there (stored in the database)

---

### ❌ Port 3000 already in use (local dev)

**Symptom:** `bun run dev` fails with "EADDRINUSE: address already in use 0.0.0.0:3000"

**Fix:**
```bash
# Mac/Linux — find and kill the process
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or just use a different port
bunx next dev -p 3001
```

---

### ❌ Images don't load (broken images)

**Symptom:** Images show broken/placeholder icons.

**Fix:**
1. Make sure the entire `public/` folder (with 67 images) was uploaded to GitHub
2. Check that image paths in code match the actual filenames (case-sensitive on Linux/Vercel!)
3. Verify by visiting `https://YOUR-URL.vercel.app/social-viens-logo.png` directly — should show the logo

---

### ❌ `bun install` is slow or fails

**Fix:**
```bash
# Clear Bun's cache
bun install --force

# Or delete lockfile and reinstall
rm bun.lock
bun install

# Or fall back to npm
npm install
```

---

### ❌ Vercel build runs out of memory

**Symptom:** Build fails with "JavaScript heap out of memory"

**Fix:**
1. Vercel Dashboard → Project → Settings → Functions → increase memory allocation (Hobby plan: max 1GB; Pro plan: up to 3GB)
2. Or set `NODE_OPTIONS=--max-old-space-size=4096` as an env var

---

### ❌ "git push" asks for password and fails

**Symptom:** `git push` prompts for password, then rejects it.

**Cause:** GitHub no longer accepts account passwords for git operations.

**Fix:** Use a **[Personal Access Token](https://github.com/settings/tokens)** instead:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
2. Check `repo` scope → Generate
3. Copy the token (starts with `ghp_...`)
4. When git asks for password, paste this token instead
5. (Optional) Save it: `git config --global credential.helper store`

---

### ❌ Custom domain shows "Vercel security warning"

**Symptom:** After adding a custom domain, visiting it shows a Vercel warning page.

**Fix:** DNS hasn't propagated yet, or the domain isn't added to Vercel.
1. Vercel Dashboard → Project → Settings → Domains → verify your domain is listed with a green checkmark
2. If it shows a yellow warning, DNS hasn't propagated — wait 5-60 min
3. Verify DNS at **[whatsmydns.net](https://whatsmydns.net)**

---

## 13. Maintenance & Updates

### How to update your live site

Any time you change code locally:

```bash
# 1. Make your changes
# 2. Commit
git add .
git commit -m "Description of changes"
git push origin main

# 3. Vercel automatically redeploys (takes ~1-2 min)
```

### How to update environment variables

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit the variable → Save
3. You must **redeploy** for the new value to take effect:
   - Deployments tab → latest → "..." → Redeploy

### How to roll back to a previous deploy

1. Vercel Dashboard → **Deployments** tab
2. Find the deploy you want to roll back to
3. Click "..." → **"Promote to Production"**

### How to view logs

- **Vercel Dashboard** → Project → **Logs** tab
- Real-time logs for all serverless functions
- Filter by status (error, success), time range, path

### How to monitor performance

- **Vercel Dashboard** → **Analytics** tab (free, real-user monitoring)
- **Vercel Dashboard** → **Speed Insights** tab
- **[Google PageSpeed Insights](https://pagespeed.web.dev)** — run periodically

### Database backups (Postgres)

If you're using Neon:
- Neon takes automatic backups every hour (free tier: 7-day retention)
- To restore: Neon Dashboard → **"Restore"** → pick a timestamp

---

## 14. Quick Reference Cheat Sheet

### Essential commands

| Command | What it does |
|---------|--------------|
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server at `localhost:3000` |
| `bun run build:vercel` | Build for Vercel (prisma generate + next build) |
| `bun run lint` | Check code quality |
| `bun run db:push` | Push schema changes to database |
| `bun run db:generate` | Regenerate Prisma client |
| `git add . && git commit -m "..."` | Commit changes |
| `git push origin main` | Push to GitHub (triggers Vercel redeploy) |
| `vercel --prod` | Deploy to Vercel production (CLI) |
| `vercel logs` | View Vercel logs (CLI) |

### Important URLs

| URL | Purpose |
|-----|---------|
| `https://YOUR-APP.vercel.app` | Your live website |
| `https://YOUR-APP.vercel.app/admin/login` | Admin panel login |
| `https://YOUR-APP.vercel.app/api/seed` | Seed demo data |
| `https://YOUR-APP.vercel.app/sitemap.xml` | XML sitemap |
| `https://YOUR-APP.vercel.app/robots.txt` | Robots.txt |
| `https://vercel.com/dashboard` | Vercel dashboard |
| `https://console.neon.tech` | Neon database dashboard |

### Default credentials

| Field | Value |
|-------|-------|
| Admin URL | `/admin/login` |
| Admin email | `admin@socialviens.com` |
| Admin password | `admin123` |

> 🚨 **CHANGE THE ADMIN PASSWORD IMMEDIATELY after first login!**

### Environment variables (minimum)

| Name | Value (quick start) | Value (production) |
|------|---------------------|--------------------|
| `DATABASE_URL` | `file:./db/custom.db` | `postgresql://...` (Neon) |
| `OPENAI_API_KEY` *(optional)* | (leave blank) | `sk-...` |
| `SMTP_HOST` *(optional)* | (leave blank) | `smtp.resend.com` |

---

## 🆘 Still Stuck?

1. **Check the logs:** Vercel Dashboard → Project → Logs tab
2. **Re-read the troubleshooting section:** [Section 12](#12-troubleshooting--common-errors--fixes)
3. **Verify your env vars:** Missing `DATABASE_URL` causes 90% of issues
4. **Check DNS:** [whatsmydns.net](https://whatsmydns.net) for domain issues
5. **Ask for help:** Open a GitHub issue with:
   - The exact error message
   - What you were trying to do
   - Your OS (Mac/Windows/Linux)
   - Output of `bun --version` and `node --version`
   - Vercel deployment URL (if you have one)

---

## 🎯 TL;DR — Fastest Path to Live

```
1. GitHub pe code push karo           (5 min)
2. vercel.com/new pe jao              (1 min)
3. Repo import karo                   (1 min)
4. DATABASE_URL env var add karo      (1 min)
5. Deploy button dabao                (2 min)
6. Visit URL → LIVE! 🎉
```

**Total: ~10 minutes to a live website.**

---

**Good luck! 🚀** — *Social Viens team*

---

> 📌 **Need to recreate this website from scratch?** See **[`KIMI-PROMPT.md`](./KIMI-PROMPT.md)** for a complete prompt you can give to any AI (Kimi, Claude, GPT, etc.) to generate a similar website.
