# 🤖 Kimi Prompt — Recreate the Social Viens Website

> **Copy-paste this entire prompt into Kimi (or any AI assistant like Claude, GPT, Gemini) to recreate a similar premium digital-marketing-agency website from scratch.**
>
> **How to use:**
> 1. Copy everything inside the `---PROMPT START---` and `---PROMPT END---` markers below
> 2. Paste it into a new chat with Kimi/Claude/GPT
> 3. The AI will guide you through building the entire project
>
> ---

## ---PROMPT START---

You are a senior full-stack developer and design engineer. Your task is to build a complete, production-ready, premium digital marketing agency website called "SOCIAL VIENS" from scratch using Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Prisma ORM, Framer Motion, and Bun.

Build the entire project step-by-step following this specification exactly. Do NOT skip sections. Do NOT use placeholder text like "lorem ipsum" — write real, polished marketing copy for a digital marketing agency. At each major milestone, pause and tell me what you've completed and what's next.

The final deliverable must be a fully-functional, deployable website with: a stunning homepage with 25+ animated sections, a working AI chatbot, a free-audit tool that generates PDF reports, a full admin CMS, lead capture, blog system, portfolio, pricing, testimonials, SEO optimization, and a custom dark-luxury gold theme.

=== PROJECT OVERVIEW ===

**Company name:** SOCIAL VIENS
**Tagline:** "Premium Digital Marketing Agency"
**Positioning:** A premium, boutique-style digital marketing agency in Delhi NCR, India targeting established local businesses (real estate, medical clinics, law firms, restaurants, salons, ecommerce, fitness, education, startups).
**Brand personality:** Sophisticated, results-driven, exclusive, trustworthy. Think Apple meets Stripe meets a luxury branding agency.
**Phone:** +91 81780 04800
**Email:** socialviens@gmail.com
**WhatsApp:** https://wa.me/918178004800
**Social:** @socialviens on Instagram, LinkedIn, Facebook, Twitter/X, YouTube
**Company stats (use these exact numbers everywhere):**
- 750+ Projects Delivered
- 25+ Industries Served
- 98% Client Satisfaction
- 12+ Years of Craft
- 750+ Happy Clients
- 350% Average ROI
- 96% Client Retention
- 25K+ Leads Generated
- 3.2x average ROAS (Delhi NCR)
- 3.5x average ROAS (Dwarka)
- 5000+ Campaigns Launched (Delhi)
- 2000+ Campaigns Launched (Dwarka)

**IMPORTANT — DO NOT display any revenue, ad-spend, or monetary amount figures (₹) anywhere.** Stats should focus on projects, clients, ROI, retention, leads, campaigns — not revenue.

=== TECH STACK (NON-NEGOTIABLE) ===

- **Framework:** Next.js 16 with App Router (REQUIRED)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 with CSS variables
- **UI Library:** shadcn/ui (New York style) with Lucide icons
- **Database:** Prisma ORM with SQLite for dev (Postgres for prod)
- **Animations:** Framer Motion (motion components) + Lenis for smooth scroll
- **Package Manager:** Bun
- **State Management:** Zustand for client state, TanStack Query for server state
- **Forms:** react-hook-form + zod for validation
- **Email:** Nodemailer (SMTP)
- **PDF Generation:** PDFKit
- **Auth:** Simple SHA-256 hashed password (no NextAuth needed) — admin user stored in DB
- **AI Integration:** OpenAI / Google Gemini / Z.AI SDK (admin-configurable)

=== DESIGN SYSTEM ===

**Theme:** Dark luxury with gold accents. Premium, sophisticated, like a high-end branding agency.

**Color palette (define as CSS variables in globals.css):**

```css
:root {
  /* Dark theme (default) */
  --sv-bg: #0F0A0C;           /* near-black with warm undertone */
  --sv-surface: #161012;      /* card background */
  --sv-elevated: #22151A;     /* elevated card / hover */
  --sv-muted: #B5ADA3;        /* muted text */
  --gold: #D4AF37;            /* primary accent — old gold */
  --gold-light: #F5D680;      /* hover state */
  --gold-dark: #B8860B;       /* pressed state */
  --bronze: #A87842;          /* secondary accent */
  --cream: #2b2b32;           /* light-on-dark accents */
  --cream-dark: #4a4a52;
  --border: rgba(212, 175, 55, 0.15);  /* subtle gold border */
}

[data-theme="light"] {
  --sv-bg: #fafafa;
  --sv-surface: #ffffff;
  --sv-elevated: #f5f0e8;
  --sv-muted: #6e6e76;
  /* gold/bronze/cream stay the same */
}
```

**Fonts:**
- Primary: **Inter** (from next/font/google) — clean, modern sans-serif
- Display/Mono: **Geist Mono** — for code-like accents (preloader percentage, stats)

**Typography rules:**
- Hero headline: 64-80px, font-weight 700, tight letter-spacing (-0.04em)
- Section titles: 40-52px, font-weight 600
- Body: 16px, line-height 1.6, color var(--sv-muted) on dark
- Eyebrow labels: 12px, uppercase, letter-spacing 0.15em, gold color
- Use `clamp()` for fluid responsive typography

**Visual treatments:**
- Glassmorphism: `backdrop-blur-md bg-white/5 border border-white/10`
- Gold gradient text: `bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent`
- Gold glow on hover: `hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]`
- Subtle gold borders: `border border-[var(--border)]`
- Premium card hover: lift + gold border glow + shadow

**Buttons (two variants):**
1. Gold primary: `bg-gradient-to-r from-gold-light via-gold to-gold-dark text-black font-semibold hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 transition-all`
2. Ghost/outline: `border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-all`

**Custom scrollbar:**
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--sv-bg); }
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--gold-dark), var(--gold));
  border-radius: 4px;
}
```

=== ANIMATION SYSTEM ===

Use Framer Motion extensively. Build these reusable motion components in `src/components/ui/motion/`:

1. **Reveal** — fades + slides up when in viewport (trigger once)
2. **Stagger** — staggers children animation by 0.08s
3. **Parallax** — moves element based on scroll position
4. **TextReveal** — word-by-word reveal for headlines
5. **Counter** — animated number counter using useMotionValue + useTransform
6. **MagneticButton** — button that follows cursor slightly on hover
7. **RippleButton** — material-style ripple effect on click
8. **GlowCard** — card with cursor-following gold glow
9. **Spotlight** — spotlight follows mouse
10. **AnimatedImage** — image with mask reveal on scroll
11. **GradientText** — animated gradient text

Use `transform` and `opacity` only (GPU-accelerated). Respect `prefers-reduced-motion` (disable animations for users who set it). All animations should trigger once (not re-trigger on scroll back up) unless it's a continuous ambient animation.

=== PROJECT STRUCTURE ===

```
social-viens/
├── prisma/
│   └── schema.prisma              # 14 models (see DB SCHEMA below)
├── public/
│   ├── images/                    # blog, portfolio, team, services, industries, sections
│   ├── social-viens-logo.png
│   ├── hero-bg.png
│   ├── cta-bg.png
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx             # root layout with fonts, metadata, JSON-LD
│   │   ├── page.tsx               # homepage (assembles all 25+ sections)
│   │   ├── globals.css            # design tokens + custom CSS
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── sitemap.ts             # dynamic sitemap
│   │   ├── robots.ts
│   │   ├── admin/                 # full CMS (see ADMIN section)
│   │   ├── api/                   # 35 API routes (see API section)
│   │   ├── blog/                  # blog listing + [slug] + category/[category]
│   │   ├── services/              # services listing + [slug]
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── testimonials/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── locations/delhi-ncr/   # location landing page
│   │   ├── niches/doctors-clinics/ # niche landing page
│   │   └── {18 industry landing pages}  # see INDUSTRY PAGES below
│   ├── components/
│   │   ├── layout/                # 14 layout components
│   │   ├── sections/              # 29 section components (see HOMEPAGE SECTIONS)
│   │   ├── ui/                    # shadcn/ui + custom motion components
│   │   ├── LeadCaptureModal.tsx
│   │   ├── IndustryLandingPage.tsx
│   │   └── LocationLandingPage.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   ├── use-toast.ts
│   │   └── use-animated-counter.ts
│   └── lib/
│       ├── db.ts                  # Prisma client singleton
│       ├── safe-db.ts             # fallback wrappers (always resolve)
│       ├── ai-provider.ts         # OpenAI/Gemini/Z.AI abstraction
│       ├── email-service.ts       # Nodemailer SMTP
│       ├── pdf-generator.ts       # PDFKit report generation
│       ├── notification-service.ts
│       ├── schema.ts              # zod schemas
│       ├── utils.ts               # cn() helper
│       ├── fallback-data.ts       # built-in demo content
│       ├── services-data.ts
│       ├── blog-data.ts
│       ├── portfolio-data.ts
│       ├── testimonials-data.ts
│       ├── faq-data.ts
│       ├── industry-data.ts
│       └── location-data.ts
├── vercel.json
├── .env.example
├── .nvmrc (Node 20)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json (shadcn config)
└── package.json (bun)
```

=== HOMEPAGE SECTIONS (in order, top to bottom) ===

Build these 29 section components in `src/components/sections/`. Each must be a separate file. Use Framer Motion for entrance animations, triggered on scroll-into-view. All sections should be wrapped in `<section>` with proper `id` for nav anchor links.

1. **Hero** — Full-viewport hero with animated gold-particle background, staggered headline reveal ("Elevate Your Digital Presence"), gradient gold text, dual CTAs ("Get Free Audit" + "Watch Showreel"), floating stats badges, scroll-down indicator. Mouse-parallax on background elements.

2. **VideoShowreel** — Cinematic video player with custom thumbnail, play button with gold ring animation, modal video player.

3. **StatsTicker** — Animated counter cards (750+ Projects, 12+ Years, 98% Satisfaction, 350% ROI) with intersection-triggered count-up.

4. **ClientLogoWall** — Marquee of 6 client logos (Aurum Estates, Carewell Clinics, Saffron Kitchen, Velvet & Co, Verma Associates, Glow Beauty Lounge, etc.) with infinite scroll + reverse direction row.

5. **Partners** — "Trusted by industry leaders" — Google Partner, Meta Business Partner, Shopify Partner, HubSpot Partner badges.

6. **FreeAudit** — Free website audit CTA section with form (URL, email, phone) that triggers the Analysis Lab scan.

7. **Services** — 8 service cards in a grid: SEO Services, Social Media Marketing, Paid Ads (PPC), Website Design, Branding, Google Business Profile, Lead Generation, Marketing Automation. Each card: icon, title, description, "Learn more" link, hover lift + gold border glow + icon micro-animation.

8. **AnalysisLab** — Interactive free-audit tool. User enters their website URL → animated scan sequence (progress bar with stages: "Crawling pages", "Analyzing SEO", "Checking performance", "Comparing competitors") → results dashboard with scores (SEO, Performance, Mobile, Security) + checklist of findings + PDF download + email-me-a-copy option.

9. **DeepScan** — Secondary analysis tool that does a deeper competitor-comparison scan. Two-column layout: enter your URL + competitor URL → side-by-side comparison results.

10. **Transformation** — Before/After visual comparison slider. Drag handle to reveal transformation. Use case studies as examples.

11. **CaseStudies** — 3 featured case studies with metrics: client name, industry, before/after leads, before/after traffic, before/after ranking, before/after conversion. Visual growth charts.

12. **Portfolio** — Filterable portfolio grid (All, Branding, Web Design, Social Media, Paid Ads). 12 portfolio items with images, hover overlay reveal, click to expand modal.

13. **Industries** — Grid of 12 industry cards: Real Estate, Medical, Law Firm, Restaurant, Salon, Ecommerce, Fitness, Education, Startup/IT, Brand Shoot, Event Shoots, SEO Ranking. Each links to a dedicated industry landing page.

14. **LocationServices** — Location-based offering: Delhi NCR + Dwarka sections with location-specific stats and CTAs to location landing pages.

15. **WhySocialViens** — 6 differentiator cards: "12+ Years of Craft", "Data-Driven Approach", "Dedicated Account Manager", "Transparent Reporting", "In-House Creative Team", "Proven ROI Track Record".

16. **Awards** — Awards & recognitions section with award badges/certifications.

17. **Comparison** — "Social Viens vs Other agencies" comparison table. Checkmarks for our features, X marks for typical agency limitations.

18. **ROICalculator** — Interactive ROI calculator. User inputs: monthly ad budget, current conversion rate, average order value. Output: projected ROI with Social Viens. Sliders for inputs, animated number outputs.

19. **Process** — 6-step process timeline: Discovery → Strategy → Design → Implementation → Optimization → Scale. Animated vertical/horizontal timeline with icons.

20. **CustomerJourney** — Visual customer journey map from first touch to conversion.

21. **Results** — Big results showcase. Animated counters for key metrics (750+ Projects, 25K+ Leads, 350% ROI, 96% Retention).

22. **GrowthMetrics** — Dashboard-style metrics display with animated charts (line, bar, area) using Recharts. MTD conversions, campaign performance, etc.

23. **Pricing** — 3 pricing tiers (Growth Starter, Business Accelerator, Enterprise Growth). Highlighted middle tier. Feature lists with checkmarks. NOTE: Show package names and features, but NO ₹ prices — instead show "Custom Pricing" / "Starting from ₹X" is NOT allowed. Use "Request a Quote" CTA.

24. **Testimonials** — Carousel of 8+ client testimonials with avatar, name, business, industry, star rating, quote, result metric. Auto-scroll with pause on hover. Manual prev/next controls.

25. **InsightsHub** — Blog preview section. Latest 3-6 blog posts with featured image, category badge, title, excerpt, read time, author. Link to /blog.

26. **FAQ** — Accordion FAQ with 10+ questions covering: services, pricing, timeline, contracts, results, onboarding, reporting, industries served.

27. **ScheduleCall** — Calendar-based meeting scheduler CTA section. Form: name, email, phone, preferred date/time, service interest. Connects to /api/leads.

28. **FinalCTA** — Full-width CTA banner with background image, gold overlay, "Ready to Transform Your Digital Presence?" headline, dual CTAs (Get Free Audit + WhatsApp Us).

29. **Footer** — Multi-column footer: company info, services links, industries links, resources links, contact info, social media icons (6 platforms: Instagram, LinkedIn, Facebook, X, YouTube, WhatsApp). Copyright bar.

=== LAYOUT COMPONENTS (src/components/layout/) ===

1. **TopBar** — Slim top bar with phone, email, social icons, "Free Consultation" link.
2. **Navbar** — Transparent on top, transitions to glassmorphism (backdrop-blur) on scroll. Logo left, nav links center, CTA right. Mobile hamburger menu with animated slide-in.
3. **Footer** — (described above)
4. **Preloader** — Full-screen preloader with animated SVG ring, "SV" logo, progress bar with percentage counter. Total duration ~1.4 seconds. Fade-out to reveal site.
5. **ScrollProgress** — 3px gold gradient bar at top using Framer Motion useSpring.
6. **CursorGlow** — Custom cursor with gold glow that follows mouse (desktop only).
7. **AuroraBackground** — Subtle animated aurora/gradient background behind hero.
8. **SmoothScroll** — Lenis-powered smooth scroll wrapper.
9. **MotionProvider** — Provider for motion preferences (respects prefers-reduced-motion).
10. **PageShell** — Wraps all pages with Preloader + SmoothScroll + CursorGlow + ScrollProgress.
11. **AIChatWidget** — Floating chat button bottom-right. Opens chat panel. Connects to /api/chat. Stores conversation in DB. Shows typing indicator. Captures lead info mid-conversation.
12. **WhatsAppWidget** — Floating WhatsApp button (bottom-left or above chat). Links to wa.me/918178004800 with pre-filled message.
13. **StickyCTA** — Sticky bottom bar on mobile with "Get Free Audit" + "Call Now" buttons.
14. **ExitIntentPopup** — Modal triggered on mouse-leave (desktop) or scroll-up (mobile). Offers a lead magnet (free audit). Captures email/phone → /api/leads.
15. **CookieConsent** — Bottom cookie consent banner with Accept/Decline.
16. **SocialProofPopup** — Bottom-left popup showing "X businesses audited this week" social proof notifications.
17. **BackToTop** — Bottom-right button that appears after scrolling, scrolls to top smoothly.

=== DATABASE SCHEMA (prisma/schema.prisma) ===

Create these 14 Prisma models. Use SQLite for dev (`provider = "sqlite"`, `url = env("DATABASE_URL")`). For arrays, use String with JSON-encoded values (SQLite has no array type).

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"    // change to "postgresql" for production
  url      = env("DATABASE_URL")
}

model Lead {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  business  String?
  service   String?
  message   String?
  source    String   @default("website")  // "website" | "exit-intent-popup" | "contact-form" | "chat"
  pageUrl   String?
  notes     String?
  status    String   @default("new")      // "new" | "contacted" | "converted" | "lost"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model PageContent {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  content         String
  metaTitle       String?
  metaDescription String?
  status          String   @default("published")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model BlogPost {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  excerpt         String?
  content         String
  category        String   // "SEO" | "Social Media" | "Paid Ads" | "Branding" | "Web Design" | "Automation"
  tags            String?  // JSON-encoded string[]
  author          String?
  authorRole      String?
  authorBio       String?
  publishedAt     DateTime?
  readTime        String   @default("5 min read")
  featuredImage   String?
  featured        Boolean  @default(false)
  status          String   @default("published")
  metaTitle       String?
  metaDescription String?
  ogImage         String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String?
  company   String?
  business  String?
  industry  String
  quote     String?
  text      String?
  rating    Int      @default(5)
  result    String?
  results   String?
  avatar    String?
  image     String?
  featured  Boolean  @default(false)
  hasVideo  Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Service {
  id                String   @id @default(cuid())
  title             String
  slug              String   @unique
  description       String
  shortDescription  String?
  longDescription   String?
  icon              String   // Lucide icon name
  benefits          String   // JSON-encoded string[]
  results           String
  startingPrice     String?
  popular           Boolean  @default(false)
  features          String?  // JSON-encoded ServiceFeature[]
  process           String?  // JSON-encoded ServiceProcessStep[]
  faqs              String?  // JSON-encoded ServiceFAQ[]
  order             Int      @default(0)
  createdAt         DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Portfolio {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  client      String
  category    String   // "Branding" | "Web Design" | "Social Media" | "Paid Ads"
  services    String?  // JSON-encoded string[]
  description String
  results     String?
  image       String?
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model PricingPackage {
  id          String   @id @default(cuid())
  name        String
  price       Int      // store as integer; display as "Custom Pricing" (no ₹ shown)
  period      String   // "month" | "quarter" | "year"
  description String
  features    String   // JSON-encoded string[]
  highlighted Boolean  @default(false)
  ctaText     String
  ctaLink     String
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model CaseStudy {
  id              String   @id @default(cuid())
  client          String
  industry        String
  title           String
  description     String?
  beforeLeads     Int?
  afterLeads      Int?
  beforeTraffic   String?
  afterTraffic    String?
  beforeRanking   String?
  afterRanking    String?
  beforeConversion String?
  afterConversion  String?
  revenueImpact   String?
  featured        Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique  // "ai_provider", "ai_api_key", "ai_model", "smtp_host", etc.
  value     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?  // SHA-256 hashed
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?   @default("Newsletter Subscriber")
  source    String   @default("website")
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Notification {
  id         String   @id @default(cuid())
  type       String   // "lead" | "chat" | "newsletter" | "report"
  title      String
  message    String
  metadata   String?  // JSON-encoded
  status     String   @default("unread")  // "unread" | "read" | "archived"
  actionUrl  String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model ChatSession {
  id            String   @id @default(cuid())
  sessionId     String   @unique  // frontend-generated UUID
  visitorIp     String?
  userAgent     String?
  messageCount  Int      @default(0)
  leadId        String?
  status        String   @default("active")  // "active" | "ended" | "converted"
  firstMessage  String?
  lastMessage   String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  messages      ChatMessage[]
}

model ChatMessage {
  id        String   @id @default(cuid())
  session   ChatSession @relation(fields: [sessionId], references: [sessionId], onDelete: Cascade)
  sessionId String
  role      String   // "user" | "assistant" | "system"
  content   String
  tokens    Int?
  createdAt DateTime @default(now())

  @@index([sessionId])
}
```

=== API ROUTES (src/app/api/) — Build 35 routes ===

**Public:**
- `POST /api/leads` — capture lead (name, email, phone, business, service, message, source)
- `POST /api/contact` — contact form (same as leads but with source="contact-form")
- `POST /api/newsletter` — newsletter subscribe
- `POST /api/chat` — AI chatbot message (saves to ChatSession + ChatMessage, calls AI provider, returns response)
- `POST /api/analysis-lab` — trigger website audit scan
- `POST /api/analyze/website` — website analysis (crawls URL, returns scores)
- `POST /api/analyze/seo` — SEO analysis
- `POST /api/report` — generate PDF report (uses PDFKit) + optionally email via SMTP
- `GET /api/services` — list all services
- `GET /api/blog` — list blog posts
- `GET /api/seed` — seed database with fallback demo data (services, blog, portfolio, testimonials, pricing, admin user)

**Admin (require auth token in localStorage, checked server-side):**
- `POST /api/admin/login` — login (verify SHA-256 hashed password, return base64 token)
- `POST /api/admin/logout` — logout (clear token)
- `GET /api/admin/stats` — dashboard stats (lead count, blog count, etc.)
- `GET/POST /api/admin/leads` — list/create leads
- `GET/PUT/DELETE /api/admin/leads/[id]` — CRUD single lead
- `GET /api/admin/leads/export` — export leads as CSV
- `GET/POST /api/admin/blog` — list/create blog posts
- `GET/PUT/DELETE /api/admin/blog/[id]` — CRUD single blog post
- `GET/POST /api/admin/testimonials` — list/create testimonials
- `GET/PUT/DELETE /api/admin/testimonials/[id]` — CRUD single testimonial
- `GET/POST /api/admin/portfolio` — list/create portfolio items
- `GET/PUT/DELETE /api/admin/portfolio/[id]` — CRUD single portfolio item
- `GET/POST /api/admin/pricing` — list/create pricing packages
- `GET/PUT/DELETE /api/admin/pricing/[id]` — CRUD single pricing package
- `GET/POST /api/admin/services` — list/create services
- `GET/PUT/DELETE /api/admin/services/[id]` — CRUD single service
- `GET/POST /api/admin/pages` — list/create page content
- `GET/PUT/DELETE /api/admin/pages/[id]` — CRUD single page
- `GET/POST /api/admin/notifications` — list/create notifications
- `PUT/DELETE /api/admin/notifications/[id]` — update/delete notification
- `GET/POST /api/admin/settings` — list/update site settings (including ai_provider, ai_api_key, ai_model, smtp_*)
- `GET /api/admin/chat` — list chat sessions
- `GET /api/admin/chat/[sessionId]` — get single chat session with messages

**All API routes must:**
- Use `export const runtime = "nodejs"` (not Edge — uses Prisma + PDFKit)
- Have try/catch error handling returning `{ error: string }` with proper status codes
- Use the `db` client from `@/lib/db`
- Use `safe-db.ts` wrappers for public-facing reads (so site works even if DB is down)

=== ADMIN CMS (/admin) ===

Build a full admin panel with:
- **Login page** (`/admin/login`) — email + password form, stores token in localStorage
- **Dashboard** (`/admin`) — stats cards (total leads, new leads this week, blog posts, chat sessions), recent activity, notification bell
- **Leads** (`/admin/leads`) — sortable/filterable table, view detail drawer, export CSV, change status, add notes
- **Blog** (`/admin/blog`) — list + create/edit with markdown editor (@mdxeditor/editor), featured image URL, category, tags, SEO fields
- **Portfolio** (`/admin/portfolio`) — CRUD with image, category, services, results
- **Pricing** (`/admin/pricing`) — CRUD pricing packages
- **Services** (`/admin/services`) — CRUD with benefits, features, process, FAQs (all JSON-encoded)
- **Testimonials** (`/admin/testimonials`) — CRUD with rating, industry, results
- **Pages** (`/admin/pages`) — CRUD static page content
- **Chat** (`/admin/chat`) — view all chat sessions, click to see full conversation, mark as converted
- **Notifications** (`/admin/notifications`) — list, mark as read, delete
- **Settings** (`/admin/settings`) — AI provider config (OpenAI/Gemini/Z.AI + API key + model), SMTP config, admin email, change password

Use shadcn/ui components: Table, Dialog, Form, Input, Button, Card, Tabs, Sheet, Badge, DropdownMenu, etc. Admin layout should be clean, dashboard-style (sidebar nav + main content).

=== INDUSTRY LANDING PAGES (18 pages) ===

Build 18 industry-specific landing pages using a shared `IndustryLandingPage.tsx` component. Each has: industry-specific hero, stats, services for that industry, case studies, testimonials from that industry, FAQ, CTA.

Industries (each at its own route):
1. `/real-estate-marketing`
2. `/medical-marketing`
3. `/law-firm-marketing`
4. `/restaurant-marketing`
5. `/salon-marketing`
6. `/ecommerce-marketing`
7. `/fitness-marketing`
8. `/education-marketing`
9. `/startup-it-support`
10. `/brand-shoot`
11. `/event-shoots-management`
12. `/seo-ranking`
13. `/branding-delhi`
14. `/branding-dwarka`
15. `/website-development-delhi`
16. `/website-development-dwarka`
17. `/app-development-delhi`
18. `/app-development-dwarka`
19. `/social-media-delhi`
20. `/social-media-dwarka`
21. `/seo-services-delhi`
22. `/seo-services-dwarka`
23. `/google-business-profile-delhi`
24. `/google-business-profile-dwarka`
25. `/paid-ads-delhi`
26. `/paid-ads-dwarka`

Plus location landing pages:
- `/locations/delhi-ncr` — Delhi NCR-focused landing page
- `/niches/doctors-clinics` — doctors/clinics niche page

=== AI PROVIDER SYSTEM (src/lib/ai-provider.ts) ===

Build an abstraction layer that:
1. Reads config from DB (SiteSetting: `ai_provider`, `ai_api_key`, `ai_model`)
2. Falls back to env vars (`OPENAI_API_KEY`, `GEMINI_API_KEY`, `ZAI_API_KEY`)
3. Supports 3 providers: OpenAI (gpt-4o-mini default), Gemini (gemini-1.5-flash default), Z.AI
4. Exposes `chatCompletion(messages: ChatMessage[])` returning `{ content, provider, model }`
5. Caches config in-process for 30 seconds
6. If no provider configured, returns a friendly canned response (so chatbot works even without API keys)

=== EMAIL SERVICE (src/lib/email-service.ts) ===

Using Nodemailer:
1. Reads SMTP config from DB SiteSettings, falls back to env vars
2. If no SMTP configured, uses Ethereal (test emails — preview URL returned)
3. Function: `sendReportEmail({ to, name, reportBuffer, reportFilename, toolName, url })`
4. HTML email template with SOCIAL VIENS gold header, branded body, footer
5. Returns `{ success, previewUrl?, provider, error? }`

=== PDF GENERATOR (src/lib/pdf-generator.ts) ===

Using PDFKit:
1. Generates a branded PDF audit report
2. Cover page with SOCIAL VIENS logo + gold accent
3. Sections: Executive Summary, Performance Scores (SEO, Performance, Mobile, Security), Detailed Findings, Recommendations, Next Steps
4. Color-coded scores (green/yellow/red)
5. Professional typography
6. Returns Buffer

=== SEO ===

- **layout.tsx metadata:** title, description, keywords, OpenGraph, Twitter cards, canonical
- **JSON-LD structured data:** ProfessionalService schema + FAQPage schema in layout.tsx
- **sitemap.ts:** dynamically generates sitemap.xml including all pages, blog posts, services, industries
- **robots.ts:** allow all, point to sitemap
- **Per-page metadata:** each page exports `metadata` object with title + description
- **Semantic HTML:** use `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- **Alt text** on all images
- **OpenGraph images:** per-page OG images

=== SAFE-DB PATTERN (critical) ===

The public-facing site must NEVER crash due to a database error. Build `src/lib/safe-db.ts` with wrappers like:

```typescript
async function safeQuery<T>(query: Promise<T>, fallback: T): Promise<T> {
  try {
    return await query;
  } catch (error) {
    console.error("[safe-db] Query failed, using fallback:", error);
    return fallback;
  }
}

export async function getServices() {
  return safeQuery(
    (async () => {
      const dbServices = await db.service.findMany({ orderBy: { order: "asc" } });
      return dbServices.length > 0 ? dbServices : fallbackServices;
    })(),
    fallbackServices
  );
}
```

Build similar wrappers for: services, blog posts, portfolio, testimonials, pricing, services by slug, blog post by slug, related posts, blog categories. Store fallback data in `src/lib/fallback-data.ts`.

=== FALLBACK DATA ===

Build comprehensive fallback data in `src/lib/fallback-data.ts`:
- 8-9 services (SEO, Social Media, Paid Ads, Web Design, Branding, Google Business Profile, Lead Gen, Automation)
- 8 blog posts (one per category, with full content, author bios, read times)
- 12 portfolio items (with gradients/colors as image placeholders)
- 8 testimonials (with real-sounding names, businesses, industries, results)
- 3 pricing packages (Growth Starter, Business Accelerator, Enterprise Growth — NO ₹ prices, use "Custom Pricing")
- 6 site settings defaults
- Admin user (admin@socialviens.com / admin123 — SHA-256 hashed with salt "sv$alt|")

=== PERFORMANCE REQUIREMENTS ===

- **Code-splitting:** Use `next/dynamic` with `loading: () => <Skeleton/>` for below-the-fold sections
- **Lazy loading:** Wrap below-the-fold sections in a `<LazySection>` component that uses IntersectionObserver to mount sections only when user scrolls near them (200px rootMargin)
- **Image optimization:** Use `next/image` with proper width/height, priority for above-the-fold, lazy for below
- **Font optimization:** Use `next/font/google` with `display: swap` and `variable` for CSS
- **Bundle size:** Keep animations GPU-accelerated (transform + opacity only)
- **Target:** 90+ on Google PageSpeed Insights (mobile)

=== BUILD STEPS ===

Execute these steps in order, pausing at each milestone to confirm with me:

**Milestone 1 — Foundation (Day 1)**
1. Initialize Next.js 16 project with Bun: `bun create next-app social-viens --typescript --tailwind --app`
2. Install all dependencies (shadcn/ui, framer-motion, lenis, prisma, nodemailer, pdfkit, openai, @google/generative-ai, z-ai-web-dev-sdk, react-hook-form, zod, etc.)
3. Set up Tailwind config with the dark-luxury color tokens
4. Set up globals.css with CSS variables, custom scrollbar, glassmorphism utilities
5. Configure next.config.ts with `serverExternalPackages: ["pdfkit", "nodemailer", "@prisma/client", ".prisma/client", "openai", "@google/generative-ai"]`
6. Set up Prisma schema with all 14 models, run `prisma db push`
7. Create the lib/ files: db.ts, safe-db.ts, utils.ts, schema.ts
8. Load fallback-data.ts with all demo content
9. Set up layout.tsx with Inter + Geist Mono fonts, metadata, JSON-LD
10. Run `bun run dev` and verify `localhost:3000` loads (even if just an empty page)

**Milestone 2 — Layout & Design System (Day 2)**
1. Install all shadcn/ui components you'll need (button, card, dialog, form, input, table, etc.)
2. Build the motion components in `src/components/ui/motion/` (Reveal, Stagger, Parallax, TextReveal, Counter, MagneticButton, RippleButton, GlowCard, Spotlight, AnimatedImage, GradientText)
3. Build layout components: Preloader, ScrollProgress, CursorGlow, AuroraBackground, SmoothScroll (Lenis), MotionProvider, PageShell
4. Build TopBar + Navbar with transparent→glassmorphism scroll behavior
5. Build Footer with 6 social links, multi-column layout
6. Build WhatsAppWidget, AIChatWidget (just UI, no backend yet), StickyCTA, ExitIntentPopup, CookieConsent, SocialProofPopup, BackToTop
7. Verify the page shell renders with all chrome (preloader → navbar → empty content → footer → all floating widgets)

**Milestone 3 — Homepage Sections (Day 3-4)**
1. Build all 29 section components one by one, in the order listed above
2. Each section must use motion components for entrance animations
3. Assemble them in `src/app/page.tsx` with `<LazySection>` wrappers for below-the-fold
4. Generate hero background image and CTA background image (use AI image generation or describe what to use)
5. Generate team photos, portfolio images, blog cover images (or use placeholder gradients)
6. Run `bun run lint` and fix all errors
7. Verify homepage renders fully with all sections

**Milestone 4 — API & Backend (Day 5)**
1. Build all 35 API routes
2. Build ai-provider.ts, email-service.ts, pdf-generator.ts, notification-service.ts
3. Test `/api/seed` populates the database
4. Test `/api/leads` accepts a lead
5. Test `/api/chat` returns a response (fallback mode if no AI key)
6. Test `/api/report` generates a PDF
7. Test `/api/analyze/website` returns analysis scores

**Milestone 5 — Admin CMS (Day 6)**
1. Build admin layout with sidebar nav
2. Build login page + auth flow (localStorage token)
3. Build dashboard with stats
4. Build all CRUD pages (leads, blog, portfolio, pricing, services, testimonials, pages, chat, notifications, settings)
5. Build notification bell in admin header
6. Test full CRUD flow for each entity

**Milestone 6 — Industry & Location Pages (Day 7)**
1. Build shared IndustryLandingPage.tsx component
2. Build all 18 industry landing pages using it
3. Build LocationLandingPage.tsx component
4. Build Delhi NCR + Dwarka location pages
5. Build doctors-clinics niche page
6. Build blog listing + [slug] + category pages
7. Build services listing + [slug] pages
8. Build portfolio, pricing, testimonials, about, contact, FAQ pages
9. Build sitemap.ts + robots.ts
10. Build not-found.tsx + error.tsx

**Milestone 7 — Polish & Deploy (Day 8)**
1. Cross-browser testing (Chrome, Firefox, Safari)
2. Mobile responsiveness audit (375px, 768px, 1024px, 1440px)
3. Lighthouse audit — fix any performance issues
4. Accessibility audit (keyboard nav, screen reader, ARIA)
5. SEO audit (metadata, sitemap, structured data)
6. Set up vercel.json, .env.example, .nvmrc, .gitignore
7. Add build:vercel + postinstall scripts to package.json
8. Write README.md and SETUP.md
9. Final lint check + build test
10. Deploy to Vercel

=== QUALITY BAR ===

The final website must:
- Load in under 2 seconds on a fast connection (after preloader)
- Score 90+ on Google PageSpeed Insights (mobile)
- Have zero ESLint errors
- Have zero TypeScript errors
- Have zero console errors in the browser
- Work perfectly on mobile (375px width)
- Have smooth 60fps animations
- Have a working AI chatbot (with fallback if no API key)
- Have a working lead capture system
- Have a working admin CMS
- Have proper SEO (sitemap, robots, structured data, meta tags)
- Have proper accessibility (keyboard nav, ARIA, alt text)
- Be fully deployable to Vercel with a single `vercel --prod` command

=== CONTENT GUIDELINES ===

- Write all marketing copy yourself — no "lorem ipsum"
- Tone: confident, premium, results-focused. Not salesy.
- Use specific numbers and stats (from the company stats list above)
- Mention Delhi NCR / Dwarka / India context where relevant
- Founder names for blog authorship: Arjun (SEO), Vikram (Paid Ads), Priya (Social Media), Raj (Branding), Anjali (Content)
- All ₹ monetary amounts are FORBIDDEN in display copy (per company policy)

=== BEGIN ===

Start with Milestone 1, Step 1. Tell me when each step is done. Do NOT skip ahead. Ask me questions if anything is unclear. Build the entire project following this spec exactly.

## ---PROMPT END---

---

## 📋 How to Use This Prompt

### With Kimi (kimi.com)
1. Go to **[kimi.com](https://kimi.com)** → sign in
2. Click **"New Chat"**
3. Copy everything between `---PROMPT START---` and `---PROMPT END---` above
4. Paste into the chat
5. Kimi will start building the project step-by-step
6. Respond to its questions and confirm each milestone

### With Claude (claude.ai)
Same process — paste the prompt into a new chat.

### With ChatGPT (chat.openai.com)
Same process. Recommend GPT-4o or o1 for best results.

### With Cursor / GitHub Copilot
Paste the prompt as your first message in the composer. The AI will write code directly into your project.

---

## ⚙️ Tips for Best Results

1. **Be patient.** This is a large project. Kimi/Claude will likely need multiple turns — don't try to get it all in one response.

2. **Confirm milestones.** After each milestone, say "Looks good, continue to Milestone X" before moving on.

3. **Ask for file contents.** When the AI says "I created Hero.tsx", ask it to show you the full file contents so you can copy-paste it.

4. **Run commands locally.** When the AI says "run `bun install`", actually run it in your terminal.

5. **Test as you go.** After each section is built, run `bun run dev` and verify it renders before moving on.

6. **Iterate on design.** If you don't like a section's design, tell the AI specifically what to change ("make the hero more minimalist", "add more gold accents to the pricing section").

7. **Use the same AI throughout.** Don't switch between Kimi/Claude/GPT mid-project — context is lost. Pick one and stick with it.

8. **Save your progress.** After each milestone, commit to git:
   ```bash
   git add .
   git commit -m "Milestone X complete — [description]"
   ```

---

## 🎯 Expected Outcome

If you follow this prompt with a capable AI, you'll get a website with:
- ✅ Same dark-luxury gold design system
- ✅ Same 29 animated homepage sections
- ✅ Same admin CMS with 10+ CRUD modules
- ✅ Same AI chatbot with multi-provider support
- ✅ Same lead capture + email + PDF generation
- ✅ Same 18+ industry/location landing pages
- ✅ Same SEO optimization (sitemap, structured data, metadata)
- ✅ Same performance characteristics (lazy loading, code-splitting)
- ✅ Same deployability to Vercel

**Estimated time with AI assistance:** 8-12 hours of active work over 2-3 days.

**Estimated cost:** $0 (all tools have free tiers)

---

**Good luck building! 🚀** — *Social Viens team*
