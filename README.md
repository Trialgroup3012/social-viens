# Social Viens — Premium Digital Marketing Agency Website

[![Built with Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?logo=prisma)](https://www.prisma.io/)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

A production-ready, conversion-optimized marketing website for a digital
marketing agency, featuring 27+ animated sections, an AI chatbot, a free-audit
Analysis Lab, a portfolio, blog, pricing tiers, testimonials, and a full admin
CMS.

> **First time here?** Read the **[SETUP.md](./SETUP.md)** for a complete
> beginner-friendly guide to running this project locally and deploying it to
> Vercel.

---

## ✨ Features

- **27 animated sections** — hero, services, portfolio, case studies, ROI
  calculator, growth metrics, testimonials, FAQ, blog, pricing, team, awards,
  partners, process, results, free-audit tool, schedule-a-call, final CTA
- **AI Chatbot** — configurable to OpenAI, Gemini, or Z.AI (or run with no
  API key for a fallback mode). Conversations stored for admin review.
- **Analysis Lab** — free website-audit tool that generates a branded PDF
  report and emails it to the visitor (with SMTP configured)
- **Admin CMS** — manage blog, portfolio, pricing, services, testimonials,
  leads, chat sessions, notifications, and AI/SMTP settings from `/admin`
- **Lead capture** — contact form, exit-intent popup, sticky CTA, WhatsApp
  widget, social-proof popups, all wired to `/api/leads` and surfaced in admin
- **Premium UX** — Framer Motion animations, Lenis smooth scroll, custom
  cursor glow, scroll progress bar, preloader, lazy-loaded sections, fully
  responsive (mobile-first), dark luxury theme
- **SEO** — sitemap.xml, robots.txt, JSON-LD structured data, per-page
  metadata, OpenGraph tags

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) + TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Animations | Framer Motion + Lenis |
| Database | Prisma ORM (SQLite dev / Postgres prod) |
| AI | OpenAI / Gemini / Z.AI (admin-configurable) |
| Email | Nodemailer + SMTP (Resend, Gmail, etc.) |
| Package Manager | Bun |
| Deployment | Vercel (recommended) |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Copy the env template (only DATABASE_URL is required for local dev)
cp .env.example .env

# 3. Create the database
bun run db:push

# 4. Start the dev server
bun run dev
```

Open <http://localhost:3000>. Done. 🎉

For the full setup (seeding, admin login, SMTP, AI keys, deployment), see
**[SETUP.md](./SETUP.md)**.

---

## 📂 Project Structure

```
social-viens/
├── prisma/
│   └── schema.prisma            # Database schema
├── public/                      # Static assets (images, logos)
├── src/
│   ├── app/                     # App Router pages + API routes
│   │   ├── page.tsx             # Homepage (the main route)
│   │   ├── admin/               # Admin CMS
│   │   ├── api/                 # REST API routes
│   │   ├── blog/                # Blog listing + [slug] detail pages
│   │   ├── services/            # Services listing + [slug] detail pages
│   │   └── ...                  # Industry & location landing pages
│   ├── components/
│   │   ├── sections/            # 27 homepage section components
│   │   ├── layout/              # Navbar, Footer, Preloader, etc.
│   │   └── ui/                  # shadcn/ui + custom motion components
│   └── lib/                     # Prisma client, AI provider, email service
├── vercel.json                  # Vercel deployment config
├── .env.example                 # Environment variable template
├── .nvmrc                       # Node version (20 LTS)
├── SETUP.md                     # 👈 Read this first!
└── package.json
```

---

## 🔑 Default Admin Credentials (demo only)

> **⚠️ Change these before going live!**

| Field | Value |
|-------|-------|
| URL | `/admin/login` |
| Email | `admin@socialviens.com` |
| Password | `admin123` |

---

## 📦 Deployment

This project is **Vercel-ready** out of the box. The included `vercel.json`
handles the build command, caching headers, and security headers. See
**[SETUP.md → Section 8](./SETUP.md#8-deploy-to-vercel-5-minute-path)** for the
full deploy walkthrough.

```bash
# One-command deploy (after `npm i -g vercel` and `vercel login`)
vercel --prod
```

> ⚠️ **For production, switch from SQLite to Postgres** (Neon, Supabase, or
> Vercel Postgres). See
> [SETUP.md → Section 10](./SETUP.md#10-switching-to-postgres-for-production-recommended).

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server at <http://localhost:3000> |
| `bun run build:vercel` | Build for Vercel (prisma generate + next build) |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push schema changes to the database |
| `bun run db:generate` | Regenerate the Prisma client |

Full list in **[SETUP.md → Section 12](./SETUP.md#12-useful-scripts-cheat-sheet)**.

---

**Questions?** Read [SETUP.md](./SETUP.md) first — it covers 95% of common
issues. For everything else, open a GitHub issue.
