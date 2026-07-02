# 🚀 Social Viens — Setup & Deployment Guide (Beginner Friendly)

A complete, step-by-step guide to run this project **locally** and deploy it to
**Vercel**. No prior experience with Next.js or Vercel required.

---

## 📋 Table of Contents

1. [What this project is](#1-what-this-project-is)
2. [Prerequisites (install these first)](#2-prerequisites-install-these-first)
3. [Get the code & install dependencies](#3-get-the-code--install-dependencies)
4. [Configure environment variables](#4-configure-environment-variables)
5. [Set up the database](#5-set-up-the-database)
6. [Run the site locally](#6-run-the-site-locally)
7. [Log into the admin panel](#7-log-into-the-admin-panel)
8. [Deploy to Vercel (5-minute path)](#8-deploy-to-vercel-5-minute-path)
9. [Post-deploy checklist](#9-post-deploy-checklist)
10. [Switching to Postgres for production (recommended)](#10-switching-to-postgres-for-production-recommended)
11. [Common problems & fixes](#11-common-problems--fixes)
12. [Useful scripts cheat-sheet](#12-useful-scripts-cheat-sheet)

---

## 1. What this project is

**Social Viens** is a premium digital-marketing-agency marketing website built with:

| Layer | Technology |
|------|------------|
| Framework | **Next.js 16** (App Router) + **TypeScript** |
| Styling | **Tailwind CSS 4** + **shadcn/ui** components |
| Database | **Prisma ORM** (SQLite for dev, Postgres for prod) |
| AI chatbot | OpenAI / Gemini / Z.AI (configurable) |
| Email | Nodemailer + SMTP (Resend, Gmail, etc.) |
| Animations | Framer Motion + Lenis smooth scroll |
| Package manager | **Bun** (fast) |

The site has 27+ animated sections, an AI chatbot, an Analysis Lab (free audit
tool), a portfolio, blog, pricing, testimonials, and a full admin CMS.

---

## 2. Prerequisites (install these first)

You need **four** free tools installed on your computer.

### a) Node.js 20 LTS
Download from <https://nodejs.org/> (pick the "LTS" button).
Check it works:
```bash
node --version   # should print v20.x.x
```

### b) Bun (the package manager this project uses)
Install with:
```bash
# macOS / Linux / WSL
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```
Check it works:
```bash
bun --version    # should print 1.x.x
```

### c) Git
Download from <https://git-scm.com/downloads>.
Check it works:
```bash
git --version
```

### d) A free Vercel account
Sign up at <https://vercel.com/signup> (you can log in with your GitHub account).

---

## 3. Get the code & install dependencies

```bash
# 1. Clone the project (replace URL with your repo)
git clone https://github.com/YOUR_USERNAME/social-viens.git
cd social-viens

# 2. Install all dependencies (~1-2 minutes the first time)
bun install
```

> 💡 **What `bun install` does:** Reads `package.json`, downloads every library
> the project depends on, and (thanks to the `postinstall` script) automatically
> generates the Prisma database client.

---

## 4. Configure environment variables

The project ships with a template called `.env.example`. **Copy it**:

```bash
cp .env.example .env
```

Open `.env` in your code editor. The only variable strictly required for local
dev is the database URL, which is **already filled in**:

```bash
DATABASE_URL="file:./db/custom.db"
```

Everything else (AI keys, SMTP, site URL) is optional for local dev.

> 🔒 **Important:** Never commit the real `.env` file to git. It's already in
> `.gitignore`, so you're safe. Only `.env.example` (the template) is shared.

---

## 5. Set up the database

For local dev we use **SQLite** — a simple file-based database (no server needed).

```bash
# Create the database file + all tables from prisma/schema.prisma
bun run db:push

# (Optional) Seed the database with demo content
bun run dev         # start the dev server in another terminal
curl http://localhost:3000/api/seed
```

You should see JSON like:
```json
{ "success": true, "results": { "services": 9, "blogPosts": 8, ... } }
```

> 💡 **Without seeding** the site still works — it falls back to built-in demo
> data. Seeding just lets you edit content from the admin panel.

---

## 6. Run the site locally

```bash
bun run dev
```

Open **<http://localhost:3000>** in your browser. 🎉

Press `Ctrl + C` to stop the server.

---

## 7. Log into the admin panel

Once you've seeded the database (step 5), visit:

> <http://localhost:3000/admin/login>

Log in with the default demo credentials:

| Field | Value |
|-------|-------|
| Email | `admin@socialviens.com` |
| Password | `admin123` |

From the admin dashboard you can manage blog posts, chat conversations, leads,
portfolio items, pricing packages, notifications, and settings (including AI
provider configuration).

> ⚠️ **Change the admin password before going live!**

---

## 8. Deploy to Vercel (5-minute path)

### Option A — Deploy from the Vercel website (recommended for beginners)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```
2. Go to <https://vercel.com/new>
3. **Import** your GitHub repository.
4. Vercel auto-detects Next.js. Verify these settings (auto-filled from `vercel.json`):
   - **Framework Preset:** Next.js
   - **Build Command:** `bun run build:vercel`
   - **Install Command:** `bun install`
5. Open **Environment Variables** and add (at minimum):
   | Name | Value | Environments |
   |------|-------|--------------|
   | `DATABASE_URL` | `file:./db/custom.db` *(see note below)* | Production, Preview, Development |
6. Click **Deploy**. ✨
7. Wait ~2-3 minutes. Vercel gives you a URL like
   `social-viens-abc123.vercel.app` — click **Visit**.

> 📌 **Note about `DATABASE_URL` on Vercel:** SQLite works for a quick demo, but
> Vercel's serverless filesystem is **ephemeral** — your database file gets
> wiped on every cold start. The public website still renders (uses built-in
> fallback data), but admin changes & captured leads won't persist. For a real
> production site, see [Section 10](#10-switching-to-postgres-for-production-recommended).

### Option B — Deploy from the Vercel CLI

```bash
# Install the Vercel CLI (one-time setup)
bun add -g vercel

# Log in
vercel login

# Deploy a preview build
vercel

# Deploy to production
vercel --prod
```

Set environment variables after the first deploy:
```bash
vercel env add DATABASE_URL        # paste value, choose Production
vercel env add DATABASE_URL        # repeat for Preview, Development
vercel --prod                      # redeploy with the new env vars
```

---

## 9. Post-deploy checklist

- [ ] Visit your Vercel URL — homepage loads, preloader animates, all sections visible
- [ ] Click the **AI chatbot** (bottom-right) — it should respond (or fall back gracefully)
- [ ] Fill the **Free Audit** form — should save a lead and email a report (if SMTP set)
- [ ] Visit `/admin/login` — log in with the demo credentials
- [ ] Check that **Leads** shows the form submission *(only works with Postgres)*
- [ ] Test on mobile — layout should be responsive
- [ ] Add your custom domain: Vercel Dashboard → Project → Settings → Domains

---

## 10. Switching to Postgres for production (recommended)

For a production deployment that **persists leads, blog posts, and admin
changes**, you need a real database. The easiest free option is **Neon**.

### Step 1 — Create a free Neon database

1. Go to <https://neon.tech> → Sign up (free, no credit card needed)
2. Click **New Project** → name it `social-viens` → pick a region close to your
   Vercel region (we use `bom1` / Mumbai by default)
3. Neon gives you a connection string like:
   ```
   postgresql://neondb_owner:npg_XxXxXxXx@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```
   Copy this.

### Step 2 — Update the Prisma schema

Open `prisma/schema.prisma` and change the `provider` line:

```prisma
datasource db {
  provider = "postgresql"      // was "sqlite"
  url      = env("DATABASE_URL")
}
```

Then push the new schema to your Neon database:

```bash
export DATABASE_URL="postgresql://neondb_owner:npg_XxXxXxXx@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
bun run db:push
```

### Step 3 — Add the connection string to Vercel

In the Vercel dashboard → your project → **Settings → Environment Variables**:

1. Find the existing `DATABASE_URL` variable
2. Edit it → paste your Neon connection string
3. Enable it for **Production**, **Preview**, and **Development**
4. Click **Save**
5. Go to **Deployments** → three dots on the latest deploy → **Redeploy**

### Step 4 — Seed the production database

Visit `https://YOUR-VERCEL-URL.vercel.app/api/seed` in your browser. You'll see
JSON confirming the seed worked. Now your admin panel and contact forms will
persist data. 🎉

---

## 11. Common problems & fixes

### ❌ "Error: `DATABASE_URL` environment variable could not be found"
You haven't created a `.env` file. Run `cp .env.example .env` and try again.

### ❌ Build fails on Vercel with "prisma generate" error
Make sure `DATABASE_URL` is set in your Vercel environment variables. The
`build:vercel` script runs `prisma generate`, which needs a valid schema.

### ❌ Admin changes / captured leads disappear after a few minutes
You're using SQLite (`file:./...`) on Vercel. Switch to Postgres — see
[Section 10](#10-switching-to-postgres-for-production-recommended).

### ❌ "Module not found: Can't resolve '@prisma/client'"
The Prisma client wasn't generated. Run:
```bash
bun run db:generate    # generates the client from schema.prisma
bun run dev            # then start the dev server again
```

### ❌ The chatbot says "no AI provider configured"
You haven't set an AI API key. Either:
- Add `OPENAI_API_KEY` or `GEMINI_API_KEY` to your `.env` / Vercel env vars, OR
- Log into `/admin/settings` and paste the key there (stored in the database).

### ❌ Port 3000 is already in use
Another process is using port 3000. Either stop it, or start on a different port:
```bash
bunx next dev -p 3001
```

### ❌ Images don't load / show broken
The project ships with all images in the `public/` folder. Make sure you cloned
the repo with `git clone` so all of `public/` came along.

### ❌ `bun install` is slow or fails
Try clearing Bun's cache:
```bash
bun install --force
```
Or fall back to npm:
```bash
npm install
```

### ❌ Vercel build succeeds but page shows 500 error
Check the runtime logs: Vercel Dashboard → Project → **Logs** tab. The most
common cause is a missing `DATABASE_URL`. The site should still render thanks
to the fallback data system.

---

## 12. Useful scripts cheat-sheet

| Command | What it does |
|---------|--------------|
| `bun run dev` | Start the dev server at <http://localhost:3000> |
| `bun run build` | Build for production (local VPS / standalone) |
| `bun run build:vercel` | Build for Vercel (used automatically by `vercel.json`) |
| `bun run start` | Run the standalone production build locally |
| `bun run lint` | Run ESLint to check code quality |
| `bun run db:push` | Create / update database tables from schema |
| `bun run db:generate` | Regenerate the Prisma client (after schema changes) |
| `bun run db:migrate` | Create a migration (for Postgres production setups) |
| `bun run db:reset` | ⚠️ Drop and recreate all tables (loses all data!) |
| `curl http://localhost:3000/api/seed` | Seed the database with demo content |

---

## 🆘 Still stuck?

1. Check the **runtime logs** in the Vercel dashboard (Project → Logs)
2. Re-read [Section 11](#11-common-problems--fixes)
3. Open an issue on the project's GitHub repo with the exact error message, what
   you were trying to do, your OS, and output of `bun --version` + `node --version`

---

**Happy deploying! 🎉** — *Social Viens team*
