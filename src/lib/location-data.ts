/**
 * location-data.ts
 * ----------------
 * Single source of truth for the 14 SEO location-landing pages
 * (7 Delhi + 7 Dwarka) per Spec §5.3 / §5.4.
 *
 * Each `LocationServicePage` object is consumed by:
 *   - the shared `LocationLandingPage` client template
 *   - the per-slug `app/[slug]/page.tsx` server routes
 *   - JSON-LD schema generators in `lib/schema.ts`
 *
 * The `icon` field stores a lucide-react icon NAME (string). The shared
 * template imports an icon map to convert the string to a React component —
 * keeping this file free of client-only React imports so it can be safely
 * imported from server components.
 *
 * CRITICAL: Delhi and Dwarka variants of the same service MUST have different
 * copy. Delhi content references city-wide landmarks & market dynamics
 * (Connaught Place, Karol Bagh, Nehru Place, Lajpat Nagar, Saket, South
 * Extension). Dwarka content references sub-city landmarks & market dynamics
 * (Sector 6/7/12 markets, Dwarka Mor, Sector 21 metro, Palam, Najafgarh
 * Road, the residential sub-city blocks).
 */

export type LocationKey = "delhi" | "dwarka";

export interface LocationServiceCard {
  icon: string;
  title: string;
  description: string;
}

export interface LocationProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface LocationStat {
  value: number;
  suffix: string;
  label: string;
}

export interface LocationFAQ {
  q: string;
  a: string;
}

export interface LocationServicePage {
  slug: string;
  location: LocationKey;
  locationLabel: string;
  serviceKey: string;
  title: string;
  h1: string;
  targetKeyword: string;
  /** Lucide icon name (string — resolved via iconMap in the template). */
  icon: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;

  overviewTitle: string;
  overviewText: string;

  whyChooseUs: LocationServiceCard[];
  processSteps: LocationProcessStep[];
  benefits: LocationServiceCard[];
  stats: LocationStat[];
  faqs: LocationFAQ[];

  /** Slugs of sibling pages (other services in same location + same service in the other location). */
  relatedServices: string[];
}

/* ====================================================================== */
/*  DELHI  — 7 pages (Spec §5.3)                                          */
/* ====================================================================== */

const websiteDevelopmentDelhi: LocationServicePage = {
  slug: "website-development-delhi",
  location: "delhi",
  locationLabel: "Delhi",
  serviceKey: "website-development",
  title: "Website Development in Delhi",
  h1: "Website Development in Delhi",
  targetKeyword: "website development delhi",
  icon: "Globe",
  heroSubtitle:
    "Conversion-engineered websites built for Delhi's brutal, mobile-first market. Lightning-fast, SEO-ready, and crafted to turn South Delhi browsers into paying customers.",
  metaTitle:
    "Website Development in Delhi | Custom Web Design | SOCIAL VIENS",
  metaDescription:
    "Delhi's trusted website development agency. We build fast, mobile-first, SEO-ready websites that convert. 50+ Delhi NCR clients. Free strategy session. Get a quote today.",
  overviewTitle: "Websites built to win in Delhi's digital marketplace",
  overviewText:
    "Delhi is India's most demanding consumer market. Over 32 million people live in the NCR, and every one of them carries a smartphone that decides in under three seconds whether your business is worth their time. A generic template website — slow, forgettable, identical to a thousand others — will not survive in a city where the next ten competitors are one tap away. Our website development in Delhi is engineered specifically for this reality. We design and build bespoke, mobile-first websites that load in under two seconds, score 90+ on Lighthouse, and convert visitors who found you via a Connaught Place Google search, a Karol Bagh Instagram ad, or a Nehru Place referral. Every site we ship starts with a discovery session where we map your customer journey, audit your top three Delhi competitors, and define the conversion events that actually matter — form fills, WhatsApp chats, phone calls, walk-ins. Then our design team crafts a visual identity that respects your brand and the premium expectations of the Delhi consumer. Development is in-house, no outsourcing: semantic HTML5, server-side rendering where it counts, structured data for local SEO, GA4 + Meta Pixel instrumentation, and a CMS workflow your team can actually use. We integrate WhatsApp Business APIs, Razorpay and Stripe payment rails, Zoho and Salesforce CRM hooks, and Google Business Profile sync — so your website is the operational heart of your Delhi business, not a static brochure. Whether you are a South Extension boutique, a Lajpat Nagar clinic, a Saket restaurant, or a Nehru Place B2B firm, our websites are built to rank, load, and convert in this specific market. We have shipped 80+ production sites for Delhi NCR businesses across real estate, healthcare, legal, F&B, retail, and professional services — and we maintain every one of them with security patches, performance tuning, and quarterly conversion optimization reviews. This is not website design. This is digital infrastructure built for Delhi.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Built for Delhi consumers",
      description:
        "We know Delhi shoppers research on Google, validate on Instagram, and convert on WhatsApp — often within an hour. Our sites are wired for that exact journey, with click-to-call, WhatsApp float, and quick-load mobile layouts tested on real Delhi 4G networks.",
    },
    {
      icon: "Zap",
      title: "Sub-2-second load times",
      description:
        "Delhi mobile users abandon sites that take longer than 3 seconds to load. Our builds average 1.4s on 4G with 90+ Lighthouse scores — engineered with edge caching, image optimization, and minimal JavaScript.",
    },
    {
      icon: "Search",
      title: "Local SEO baked in",
      description:
        "Every site ships with structured data for LocalBusiness, Service, FAQ, and BreadcrumbList. We optimise for neighbourhood-level search terms — 'dentist Lajpat Nagar', 'CA Connaught Place' — so you rank where your customers actually live.",
    },
    {
      icon: "ShieldCheck",
      title: "Secured & maintained",
      description:
        "SSL, daily encrypted backups, WAF, and 99.9% uptime SLA. We patch, monitor, and update every site we ship — your Delhi business never goes dark at 2 AM during festival season.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Discovery & Audit",
      description:
        "We audit your current site, map 3 Delhi competitors, define conversion events, and align on visual direction. Deliverable: a written scope + sitemap.",
    },
    {
      step: "02",
      title: "Design & Prototype",
      description:
        "High-fidelity Figma designs for desktop + mobile, reviewed live with you. Two revision rounds included. You see exactly what we will build before a single line of code is written.",
    },
    {
      step: "03",
      title: "Development & QA",
      description:
        "In-house dev in Next.js / WordPress / Sanity. Cross-browser tested, Core Web Vitals validated, GA4 + Pixel + CRM hooks wired. Staging URL shared for sign-off.",
    },
    {
      step: "04",
      title: "Launch & Optimize",
      description:
        "DNS cutover, 301 redirects, sitemap submission to Google Search Console, and a 30-day post-launch optimization sprint to lift conversions further.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "3x more conversions",
      description:
        "Average Delhi client sees a 3x lift in form fills and calls within 90 days of launch, vs. their previous template site.",
    },
    {
      icon: "Gauge",
      title: "90+ Lighthouse scores",
      description:
        "Performance, accessibility, best practices, and SEO — all green, on real Delhi mobile networks.",
    },
    {
      icon: "Smartphone",
      title: "Mobile-first by default",
      description:
        "70%+ of Delhi traffic is mobile. Every layout, form, and CTA is designed thumb-first.",
    },
    {
      icon: "Search",
      title: "Rank on Google",
      description:
        "Semantic HTML, schema, and clean URLs give you a head start in Delhi search results from day one.",
    },
    {
      icon: "Link2",
      title: "CRM & lead routing",
      description:
        "Leads flow into Zoho, Salesforce, or HubSpot automatically — with WhatsApp + email alerts to your sales team in real time.",
    },
    {
      icon: "Palette",
      title: "Distinctive brand design",
      description:
        "No templates. Every visual element is bespoke, designed to stand out in a saturated Delhi market.",
    },
  ],
  stats: [
    { value: 80, suffix: "+", label: "Delhi sites shipped" },
    { value: 3, suffix: "x", label: "Avg conversion lift" },
    { value: 1.4, suffix: "s", label: "Avg load time on 4G" },
    { value: 99.9, suffix: "%", label: "Uptime SLA" },
  ],
  faqs: [
    {
      q: "How much does website development cost in Delhi?",
      a: "Our Delhi website projects start at ₹25,000 for a 5-page brochure site and scale to ₹3,00,000+ for complex web apps with CRM integrations, payment rails, and custom dashboards. Most Delhi SME sites land in the ₹50,000 – ₹1,20,000 range. We provide a fixed-quote proposal after a 45-minute discovery session — no hourly billing surprises.",
    },
    {
      q: "How long does it take to build a website for my Delhi business?",
      a: "Typical timeline is 4–8 weeks for a standard business website, 8–16 weeks for an e-commerce or web-app build. Discovery is week 1, design weeks 2–3, development weeks 4–6, QA + launch weeks 7–8. We share a staging URL by week 4 so you can see progress live.",
    },
    {
      q: "Will my website rank on Google for Delhi searches?",
      a: "Yes — every site ships SEO-ready: semantic HTML, structured data, optimised metadata, fast load times, and a clean URL architecture. For competitive Delhi keywords (e.g., 'CA in Connaught Place') we recommend pairing the build with our ongoing SEO retainer. Most clients see Map Pack movement within 60–90 days post-launch.",
    },
    {
      q: "Do you redesign existing Delhi websites or only build new ones?",
      a: "Both. About 60% of our Delhi engagements are redesigns — we audit your current site, preserve what works (SEO equity, backlinks, content), and rebuild the rest. We handle 301 redirects, content migration, and DNS cutover with zero downtime.",
    },
    {
      q: "Can you integrate WhatsApp, Razorpay, and my CRM?",
      a: "Yes. We integrate WhatsApp Business APIs (click-to-chat + automated replies), Razorpay and Stripe payment rails, and Zoho / Salesforce / HubSpot / LeadSquared CRMs. Lead routing, notifications, and analytics events are wired up as part of every build.",
    },
  ],
  relatedServices: [
    "seo-services-delhi",
    "paid-ads-delhi",
    "branding-delhi",
    "website-development-dwarka",
  ],
};

const seoServicesDelhi: LocationServicePage = {
  slug: "seo-services-delhi",
  location: "delhi",
  locationLabel: "Delhi",
  serviceKey: "seo-services",
  title: "SEO Services in Delhi",
  h1: "SEO Services in Delhi",
  targetKeyword: "seo services delhi",
  icon: "Search",
  heroSubtitle:
    "Rank on Google's first page for Delhi-intent keywords. Technical SEO, local Map Pack dominance, and content engineered to convert NCR searchers.",
  metaTitle: "SEO Services in Delhi | Top SEO Agency | SOCIAL VIENS",
  metaDescription:
    "Delhi's results-driven SEO agency. Technical SEO, local Map Pack, content & links. 350% avg ROI for Delhi NCR clients. Free SEO audit. Book today.",
  overviewTitle: "SEO that wins in Delhi's most contested search results",
  overviewText:
    "Delhi is the most SEO-competitive market in India outside Mumbai. Every category — real estate, healthcare, legal, education, retail, B2B services — has dozens of well-funded competitors all chasing the same ten blue links and three Map Pack slots. A generic 'we will do on-page SEO' proposal will not move the needle here. Our Delhi SEO services are built specifically for the complexity of this market: we combine technical depth, hyper-local neighbourhood targeting, content engineering, and a link acquisition practice that has earned DR-60+ placements in Indian business press. We start with a full technical audit — crawlability, indexation, Core Web Vitals, schema, internal linking, JavaScript rendering — because in Delhi's competitive SERPs, a single technical debt can keep you off page one for months. We then build a keyword strategy that targets the full funnel: high-intent commercial queries ('best dermatologist South Delhi'), neighbourhood long-tails ('orthopedic doctor near Karol Bagh'), informational content hubs that earn links, and brand-defensive queries. Our content team writes in Hinglish where the audience demands it, in formal English for B2B, and in regional Hindi for Tier-2 spill-over traffic. Local SEO is where most Delhi businesses win or lose. We optimise your Google Business Profile for the Map Pack in every neighbourhood you serve — Connaught Place, Saket, Lajpat Nagar, Nehru Place, Janakpuri, Rohini — with review acquisition flows, photo updates, Q&A management, and geo-grid rank tracking that shows exactly where you rank block-by-block. Link building is white-hat only: digital PR, guest columns in Indian business publications, HARO outreach, and partnerships with Delhi associations and chambers. We never buy links, never use PBNs, never risk your domain. Reporting is real-time: a custom Looker Studio dashboard with rankings, organic traffic, goal completions, and revenue attribution. Weekly rank-tracking updates, monthly strategy calls, quarterly business reviews. We have driven 350% average ROI for 500+ Delhi NCR businesses across real estate, healthcare, legal, F&B, retail, and professional services. SEO in Delhi is not a guessing game — it is engineering, content, and patience. We bring all three.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Neighbourhood-level SEO",
      description:
        "We track your rankings by Delhi block — Lajpat Nagar vs. South Extension vs. Saket — and build location pages that win the Map Pack in each micro-market you serve.",
    },
    {
      icon: "Search",
      title: "Full-funnel keyword strategy",
      description:
        "Commercial intent, neighbourhood long-tails, informational hubs, and brand-defensive queries — all mapped to revenue, not vanity traffic.",
    },
    {
      icon: "Link2",
      title: "White-hat link building",
      description:
        "DR-60+ placements in Indian business press, HARO outreach, and Delhi chamber/association partnerships. No PBNs, no link buying, no risk to your domain.",
    },
    {
      icon: "BarChart3",
      title: "Revenue attribution",
      description:
        "Real-time Looker Studio dashboards that tie rankings to traffic to leads to revenue. You always know what SEO is actually paying for.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Audit & Baseline",
      description:
        "Full technical crawl, backlink audit, keyword gap analysis vs. 3 Delhi competitors, and a revenue-impact model. Deliverable: 40-page SEO strategy document.",
    },
    {
      step: "02",
      title: "Technical Fixes",
      description:
        "Crawlability, schema, internal linking, page speed, mobile UX. Most Delhi sites see 15–30% organic lift just from this phase, completed in 4–6 weeks.",
    },
    {
      step: "03",
      title: "Content & Local",
      description:
        "Service pages, neighbourhood landing pages, blog hub content, GBP optimisation, and review acquisition flows — published on a weekly cadence.",
    },
    {
      step: "04",
      title: "Links & Authority",
      description:
        "Digital PR campaigns, guest columns, HARO outreach, and partnership link-building — building the domain authority needed to compete in Delhi SERPs.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "350% average ROI",
      description:
        "Delhi NCR clients see 350% ROI within 6 months — measured in attributed revenue, not rankings.",
    },
    {
      icon: "MapPinned",
      title: "Map Pack dominance",
      description:
        "Rank in the top 3 of Google Maps for your target Delhi neighbourhoods — where 44% of local searches convert.",
    },
    {
      icon: "PenTool",
      title: "Content that ranks",
      description:
        "Long-form, intent-matched content written for Delhi searchers — in English, Hinglish, or Hindi depending on your audience.",
    },
    {
      icon: "Link2",
      title: "Authority links",
      description:
        "DR-60+ Indian publication placements that move your domain authority, safely and sustainably.",
    },
    {
      icon: "Gauge",
      title: "Technical excellence",
      description:
        "Sub-2-second load times, clean schema, perfect crawl budget — the foundation that lets content rank.",
    },
    {
      icon: "BarChart3",
      title: "Transparent reporting",
      description:
        "Real-time dashboards, weekly rank updates, monthly strategy calls. No vanity metrics, ever.",
    },
  ],
  stats: [
    { value: 500, suffix: "+", label: "Delhi SEO clients" },
    { value: 350, suffix: "%", label: "Avg ROI in 6 months" },
    { value: 3, suffix: "x", label: "Avg organic traffic lift" },
    { value: 60, suffix: "+", label: "DR-60+ links earned" },
  ],
  faqs: [
    {
      q: "How long does SEO take to show results in Delhi?",
      a: "Map Pack movement typically happens in 60–90 days. Meaningful organic traffic growth by month 4. Significant ROI (200%+) by month 6. SEO is a long game — beware any Delhi agency promising overnight rankings; they are either lying or using black-hat tactics that will get you penalised.",
    },
    {
      q: "How much do SEO services cost in Delhi?",
      a: "Our Delhi SEO retainers start at ₹25,000/month for local SMEs and scale to ₹1,50,000+/month for enterprise clients targeting national keywords. Most Delhi SME engagements land in the ₹40,000 – ₹80,000/month range. We provide a fixed-scope proposal after a free audit.",
    },
    {
      q: "Do you guarantee #1 rankings on Google?",
      a: "No — and you should run from any agency that does. Google's algorithm has 200+ ranking factors and no one can guarantee a specific position. What we DO guarantee is transparent execution of every tactic in our scope, weekly reporting, and a clear strategy tied to revenue — not vanity rankings.",
    },
    {
      q: "Will SEO work for my Delhi neighbourhood business?",
      a: "Yes — local SEO is our specialty. We have helped Delhi clinics rank #1 in their Pin Code, restaurants own the Map Pack in their sector, and professional services firms dominate neighbourhood searches. If your customers search Google before buying, SEO will work for you.",
    },
    {
      q: "Do you write content in Hindi or Hinglish for Delhi audiences?",
      a: "Yes. About 40% of our Delhi content is in Hinglish or formal Hindi, depending on the audience. We have native Hindi writers on staff and can produce neighbourhood-targeted content in the language your customers actually search in.",
    },
  ],
  relatedServices: [
    "website-development-delhi",
    "google-business-profile-delhi",
    "paid-ads-delhi",
    "seo-services-dwarka",
  ],
};

const socialMediaDelhi: LocationServicePage = {
  slug: "social-media-delhi",
  location: "delhi",
  locationLabel: "Delhi",
  serviceKey: "social-media",
  title: "Social Media Marketing in Delhi",
  h1: "Social Media Marketing in Delhi",
  targetKeyword: "social media marketing delhi",
  icon: "Share2",
  heroSubtitle:
    "Build a Delhi-following that converts. Instagram, LinkedIn, and Facebook content engineered for the NCR consumer's attention span.",
  metaTitle:
    "Social Media Marketing in Delhi | Instagram & LinkedIn Agency | SOCIAL VIENS",
  metaDescription:
    "Delhi's social media marketing agency. Content, community, and paid social engineered for NCR consumers. 500K+ followers generated. Free strategy session.",
  overviewTitle: "Social media that earns Delhi's attention — and keeps it",
  overviewText:
    "Delhi has India's most active social media user base outside Mumbai — over 18 million Instagram users, 9 million LinkedIn members, and a Facebook audience that still drives meaningful reach for neighbourhood businesses. But the bar is brutal: Delhi consumers scroll past forgettable content in under a second, follow only brands that consistently deliver value or entertainment, and unfollow ruthlessly when the quality drops. Our social media marketing in Delhi is built to earn and keep that attention, week after week, post after post. We do not chase follower counts. We build engaged communities that drive measurable business outcomes — DMs asking for prices, profile visits that convert to WhatsApp chats, saves and shares that compound organic reach, and ultimately revenue. Our Delhi social media practice covers four pillars: content production, community management, paid social amplification, and influencer partnerships. Content production is in-house: a creative director, two motion designers, two copywriters, and a photographer who can be on-site in Connaught Place or Lajpat Nagar within 48 hours. We shoot reels, carousels, YouTube shorts, LinkedIn thought-leadership videos, and product photography — all aligned to a single content calendar that maps every post to a business goal. Community management covers DMs, comments, mentions, and review responses across Instagram, Facebook, LinkedIn, and Google Business Profile. Our team responds within 2 hours during business hours, in the tone-of-voice we agree on, and routes sales-ready conversations to your team via WhatsApp. Paid social amplification is managed by the same team that runs your organic — so the creative is consistent and the learnings compound. We run daily-traded paid social across Meta, LinkedIn, and YouTube for Delhi clients, with average ROAS of 3.2x. Influencer partnerships are sourced from our Delhi network of 200+ creators across fashion, food, fitness, finance, and B2B. We handle briefing, negotiation, contracts, content approval, and performance tracking — you get the reach without the operational headache. We have built Delhi followings from zero to 500K, revived dormant accounts into active communities, and turned social channels into the #1 lead source for clinics, restaurants, real estate projects, and professional service firms. This is not posting for the sake of posting. This is social media as a revenue channel.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Delhi-native creators",
      description:
        "Our content team lives in Delhi. We shoot in Connaught Place, Lajpat Nagar, and Hauz Khas — not stock footage. Real local flavour that resonates with NCR audiences.",
    },
    {
      icon: "Users",
      title: "Community-first approach",
      description:
        "Followers are vanity; engaged communities drive revenue. We respond to DMs within 2 hours, run weekly engagement rituals, and turn followers into WhatsApp leads.",
    },
    {
      icon: "Target",
      title: "Paid + organic synergy",
      description:
        "Same team runs your organic content and paid social — so creative learnings compound, ad creative stays on-brand, and your budget works harder.",
    },
    {
      icon: "Sparkles",
      title: "In-house production",
      description:
        "Creative director, motion designers, copywriters, photographer — all on staff. No freelancer coordination, no creative drift, no shipping delays.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Strategy & Audit",
      description:
        "We audit your current social, map 3 Delhi competitors, define your brand voice, content pillars, and target audience, and build a 90-day content calendar.",
    },
    {
      step: "02",
      title: "Content Production",
      description:
        "Reels, carousels, stories, YouTube shorts, LinkedIn videos — produced in-house, batch-shot monthly, edited, captioned, and ready to schedule.",
    },
    {
      step: "03",
      title: "Community & Engagement",
      description:
        "Daily posting, DM/comment responses within 2 hours, weekly engagement rituals, and lead routing to your WhatsApp. We are your social media front desk.",
    },
    {
      step: "04",
      title: "Paid Amplification",
      description:
        "Meta, LinkedIn, and YouTube ad campaigns amplifying your best organic content. A/B-tested creative, audience refinement, weekly optimisation, ROAS reporting.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "500K+ followers generated",
      description:
        "Across our Delhi portfolio, we have built followings from zero to 500K — organically, no bought followers, no engagement pods.",
    },
    {
      icon: "MessageCircle",
      title: "DMs to WhatsApp pipeline",
      description:
        "Every sales-ready DM is routed to your WhatsApp in real time. Average Delhi client sees 40+ qualified DMs per week within 90 days.",
    },
    {
      icon: "Share2",
      title: "Compounding organic reach",
      description:
        "Saves, shares, and saves-to-collections drive algorithmic reach. Our content averages 3x the engagement rate of Delhi industry benchmarks.",
    },
    {
      icon: "Target",
      title: "3.2x average ROAS",
      description:
        "On paid social across our Delhi portfolio — measured in attributed revenue, not impressions.",
    },
    {
      icon: "Users",
      title: "Influencer network access",
      description:
        "200+ Delhi creators across fashion, food, fitness, finance, and B2B — pre-vetted, with negotiated rates and proven engagement.",
    },
    {
      icon: "BarChart3",
      title: "Transparent reporting",
      description:
        "Weekly content performance, monthly business review with revenue attribution. You see exactly what each post and campaign drove.",
    },
  ],
  stats: [
    { value: 500, suffix: "K+", label: "Followers generated" },
    { value: 3.2, suffix: "x", label: "Avg ROAS on paid social" },
    { value: 200, suffix: "+", label: "Delhi influencers in network" },
    { value: 4.9, suffix: "", label: "Client satisfaction rating" },
  ],
  faqs: [
    {
      q: "How much does social media marketing cost in Delhi?",
      a: "Our Delhi social media retainers start at ₹35,000/month for 12 posts + community management, and scale to ₹2,00,000+/month for full-service with paid social and influencer activations. Most Delhi SME engagements land in the ₹50,000 – ₹1,00,000/month range.",
    },
    {
      q: "Which platforms should my Delhi business focus on?",
      a: "Depends on your audience. B2C consumer brands: Instagram + Facebook. B2B services: LinkedIn. Restaurants/cafes: Instagram + Zomato presence. Real estate: Instagram + YouTube. We will recommend the right mix after a 45-minute discovery session.",
    },
    {
      q: "Do you create the content or do we?",
      a: "We do — end-to-end. Creative direction, copywriting, design, motion graphics, photography, and video editing all happen in-house. You approve the monthly content calendar and provide feedback; we handle the rest.",
    },
    {
      q: "How quickly will I see results from social media marketing?",
      a: "Engagement lift typically happens in the first 30 days (better content + consistent posting). Follower growth becomes meaningful by month 3. Revenue attribution from social usually shows up in month 4–6. Paid social can drive leads within 2 weeks of launch.",
    },
    {
      q: "Can you manage paid social ads too, or just organic?",
      a: "Both — and we recommend running them together. The same team that creates your organic content manages your paid social, which means creative learnings compound and ad creative stays on-brand. We run daily-traded paid social for Delhi clients.",
    },
  ],
  relatedServices: [
    "paid-ads-delhi",
    "branding-delhi",
    "website-development-delhi",
    "social-media-dwarka",
  ],
};

const paidAdsDelhi: LocationServicePage = {
  slug: "paid-ads-delhi",
  location: "delhi",
  locationLabel: "Delhi",
  serviceKey: "paid-ads",
  title: "Paid Advertising Services in Delhi",
  h1: "Paid Advertising Services in Delhi",
  targetKeyword: "paid ads delhi",
  icon: "Target",
  heroSubtitle:
    "Google, Meta, LinkedIn, and YouTube ad campaigns engineered for maximum ROAS. We run daily-traded Delhi NCR ad accounts across every major vertical.",
  metaTitle:
    "Paid Advertising Services in Delhi | Google & Meta Ads | SOCIAL VIENS",
  metaDescription:
    "Delhi's performance marketing agency. Google Ads, Meta Ads, LinkedIn & YouTube. 3.2x avg ROAS. Free audit. Scale predictably.",
  overviewTitle: "Predictable revenue from Delhi's paid ad channels",
  overviewText:
    "Delhi is India's largest paid digital ad market. The competition is ferocious: click costs in real estate, healthcare, and B2B services routinely cross ₹150 per click, and an unoptimised campaign can burn budget in a month without producing a single qualified lead. Our paid advertising services in Delhi are built to make every rupee accountable. We do not run 'set-and-forget' campaigns. Every account we manage is daily-traded — bids, audiences, creative, landing pages — based on real-time performance data, not last month's report. Our Delhi paid ads practice spans four channels: Google Ads (Search, Display, Performance Max, YouTube), Meta Ads (Instagram + Facebook + Audience Network), LinkedIn Ads (for B2B), and programmatic (for awareness and retargeting). We run daily-traded Delhi NCR ad accounts across real estate, healthcare, legal, education, retail, and B2B services — with a portfolio-wide ROAS of 3.2x. Our methodology is built on three pillars: rigorous conversion tracking (server-side GA4, Meta Conversions API, offline conversion uploads for call-based leads), aggressive creative testing (5+ ad variations per ad set, refreshed weekly), and landing page optimisation (we build, host, and A/B-test our own landing pages — not just send traffic to your homepage). Conversion tracking is non-negotiable. In a market like Delhi where customers call as often as they fill forms, you cannot optimise without offline conversion data. We wire up call tracking (CallRail, Knowlarity), CRM-based lead scoring, and server-side events to feed value-based bidding back into Google and Meta. The result is that your ad spend is allocated to the campaigns, audiences, and creatives that actually drive revenue — not clicks. Creative testing is relentless. Delhi audiences fatigue fast — a winning Instagram ad in Delhi typically has a 2-week shelf life before CPMs spike. We refresh creative weekly, test 5+ variations per ad set, and maintain a creative library of proven winners for scaling. Landing pages are built in-house on our own subdomains, A/B-tested weekly, and optimised for the specific traffic source. Your Meta traffic lands on a different page than your Google traffic, because the intent is different. We have generated 5,000+ qualified leads for real estate projects in Dwarka and Noida, and built patient-acquisition funnels for clinics across South Delhi. This is performance marketing engineered for the Delhi market — not generic best practices.",
  whyChooseUs: [
    {
      icon: "Target",
      title: "3.2x average ROAS in Delhi",
      description:
        "We run daily-traded Delhi NCR ad accounts across real estate, healthcare, legal, education, retail, and B2B. Portfolio ROAS: 3.2x.",
    },
    {
      icon: "BarChart3",
      title: "Server-side conversion tracking",
      description:
        "GA4 + Meta Conversions API + offline conversion uploads for call-based leads. Value-based bidding fed by real revenue, not vanity clicks.",
    },
    {
      icon: "Gauge",
      title: "Weekly creative refresh",
      description:
        "Delhi audiences fatigue fast. We test 5+ variations per ad set and refresh winning creative weekly to keep CPMs low and ROAS high.",
    },
    {
      icon: "Layers",
      title: "In-house landing pages",
      description:
        "We build, host, and A/B-test our own landing pages — your Meta traffic lands somewhere different than your Google traffic, because intent differs.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Audit & Strategy",
      description:
        "Full account audit (or greenfield strategy), competitor analysis, keyword/audience research, conversion tracking audit, and a 90-day media plan with revenue targets.",
    },
    {
      step: "02",
      title: "Build & Launch",
      description:
        "Campaign structure, ad creative (5+ variations per ad set), audience builds, landing pages, conversion tracking — all wired up and launched within 7 days of sign-off.",
    },
    {
      step: "03",
      title: "Optimise & Scale",
      description:
        "Daily trading for the first 30 days, weekly thereafter. Bid adjustments, audience refinement, creative rotation, landing page A/B tests, budget reallocation.",
    },
    {
      step: "04",
      title: "Report & Iterate",
      description:
        "Weekly performance report, monthly business review with revenue attribution, quarterly strategy reset. You always know what is working and what is not.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "3.2x average ROAS",
      description:
        "Portfolio-wide ROAS across our Delhi paid ads clients — measured in attributed revenue, not impressions or clicks.",
    },
    {
      icon: "Target",
      title: "5,000+ leads generated",
      description:
        "For Delhi real estate projects alone — qualified leads with name, phone, and intent, not random clicks.",
    },
    {
      icon: "Phone",
      title: "Call tracking integrated",
      description:
        "Every phone call from your ads is tracked, recorded, and fed back as an offline conversion — so you can optimise for revenue, not just form fills.",
    },
    {
      icon: "Gauge",
      title: "Low CPAs in competitive niches",
      description:
        "Industry-leading cost-per-appointment for South Delhi clinics, low CPL for real estate projects, efficient CPL for B2B services — benchmarks we hit consistently.",
    },
    {
      icon: "Layers",
      title: "Landing pages included",
      description:
        "Built, hosted, A/B-tested landing pages on our subdomains — no extra cost, no extra vendor coordination.",
    },
    {
      icon: "BarChart3",
      title: "Real-time dashboards",
      description:
        "Looker Studio dashboards updated hourly. See spend, ROAS, CPL, and revenue across every channel in one view.",
    },
  ],
  stats: [
    { value: 5000, suffix: "+", label: "Campaigns launched" },
    { value: 3.2, suffix: "x", label: "Average ROAS" },
    { value: 5000, suffix: "+", label: "Leads for Delhi real estate" },
    { value: 4.9, suffix: "", label: "Client rating" },
  ],
  faqs: [
    {
      q: "How much do I need to spend on ads to see results in Delhi?",
      a: "Minimum viable ad spend in Delhi is ₹50,000/month for Search campaigns and ₹1,00,000/month for Meta — below that, the algorithms do not get enough data to optimise effectively. Most Delhi SME engagements start at ₹1.5–3 lakh/month in media spend, plus our management fee.",
    },
    {
      q: "What is your management fee for paid ads?",
      a: "Our fee is a flat retainer based on monthly ad spend tier — typically ₹35,000/month for spend up to ₹3 lakh, scaling to ₹1,50,000+/month for ₹20 lakh+ spend. We do not charge a percentage of media spend (that incentivises higher spend, not better performance).",
    },
    {
      q: "How long until I see results from paid ads?",
      a: "First conversions typically arrive within 7–14 days of launch. Meaningful data-driven optimisation kicks in around day 30 (when algorithms have enough conversion data). Predictable ROAS is usually achieved by day 60. We do not recommend judging campaign performance before day 30.",
    },
    {
      q: "Which ad platform is best for my Delhi business?",
      a: "Depends on intent and audience. High-intent commercial queries: Google Search. Visual/consumer brands: Meta (Instagram). B2B services: LinkedIn. Awareness/video: YouTube. Most Delhi businesses need 2–3 channels. We will recommend the right mix after a free audit.",
    },
    {
      q: "Do you provide the ad creative or do we?",
      a: "Both options available. Our standard retainer includes 5+ ad creative variations per ad set per week — produced in-house. If you have your own creative team, we provide briefs and accept your assets. We strongly recommend our creative — Delhi audiences respond to locally-produced content.",
    },
  ],
  relatedServices: [
    "social-media-delhi",
    "seo-services-delhi",
    "website-development-delhi",
    "paid-ads-dwarka",
  ],
};

const brandingDelhi: LocationServicePage = {
  slug: "branding-delhi",
  location: "delhi",
  locationLabel: "Delhi",
  serviceKey: "branding",
  title: "Branding Services in Delhi",
  h1: "Branding Services in Delhi",
  targetKeyword: "branding services delhi",
  icon: "Palette",
  heroSubtitle:
    "Distinctive brand identities that command premium positioning in Delhi's saturated market. Strategy, identity, voice, and rollout.",
  metaTitle: "Branding Services in Delhi | Brand Identity Agency | SOCIAL VIENS",
  metaDescription:
    "Delhi's branding agency. Strategy, identity, voice, and brand rollout for premium positioning. 40+ Delhi brands launched. Free brand audit.",
  overviewTitle: "Brands built to stand out in Delhi's crowded market",
  overviewText:
    "Delhi's market is brutal for forgettable brands. Walk through Connaught Place, Khan Market, or any Lajpat Nagar commercial block — every storefront, every Instagram ad, every Google result competes for the same consumer's attention. A generic logo and a tagline will not earn that attention. Real branding — the kind that commands premium pricing, builds loyalty, and survives competitive pressure — requires strategy, craft, and consistency. Our branding services in Delhi are built for businesses that intend to win. We do not deliver a logo and a colour palette. We deliver a complete brand system: positioning strategy, narrative, visual identity, verbal identity (tone of voice, messaging frameworks, naming), brand guidelines, and a rollout plan that aligns every customer touchpoint. Our process starts with deep discovery: stakeholder interviews, customer research, competitor audit, and a brand positioning workshop where we identify the unique space your business can own in the Delhi market. We use frameworks like the Brand Pyramid, Positioning Statement, and Category Edge to define exactly what makes you different — and credible. Visual identity follows. Our design team crafts logo systems (primary, secondary, monogram), colour systems, typography, iconography, photographic direction, motion principles, and brand pattern systems. Every element is reviewed against the strategy — pretty is not enough; the design must communicate the positioning. Verbal identity is where most branding projects fall short — and where we excel. We define your brand voice (e.g., 'confident, witty, technically precise'), write messaging frameworks for each audience segment, craft taglines and value propositions, and create a brand lexicon (words you use, words you do not). For Delhi brands, we also define Hinglish usage rules — when to use 'namaste' vs 'hi', when to transliterate vs translate. Brand guidelines are documented in a 60+ page brand book that becomes the source of truth for every team member, agency, and vendor. We deliver logo files, font licences, colour codes, icon libraries, templates, and usage examples — so the brand is applied consistently across web, social, print, packaging, signage, and packaging. Rollout support includes website redesign coordination, social media template creation, marketing collateral design, signage design, and team training. We have launched 40+ Delhi brands across real estate, healthcare, F&B, retail, professional services, and consumer products — from greenfield startups to rebrands of established SMEs. Whether you are a Lajpat Nagar boutique rebranding for premium positioning, a Saket restaurant chain standardising across locations, or a Delhi-NCR real estate developer crafting a category-defining brand, our branding work will give you the foundation to win.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Delhi market fluency",
      description:
        "We know what resonates with Delhi consumers — premium aesthetics, cultural references, Hinglish tone. Our brands feel local and aspirational at once.",
    },
    {
      icon: "Compass",
      title: "Strategy-first approach",
      description:
        "No design before positioning. We run discovery workshops, customer interviews, and competitive audits before a single logo concept is drawn.",
    },
    {
      icon: "PenTool",
      title: "Verbal identity expertise",
      description:
        "Most branding agencies stop at visuals. We deliver brand voice, messaging frameworks, naming, and Hinglish usage rules — a complete system.",
    },
    {
      icon: "Layers",
      title: "Complete brand systems",
      description:
        "Logo, colour, type, icons, photography, motion, voice, guidelines, templates, rollout support. Everything you need to apply the brand consistently.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "Stakeholder interviews, customer research, competitor audit, positioning workshop. Deliverable: brand strategy document with positioning, pyramid, and pillars.",
    },
    {
      step: "02",
      title: "Visual Identity",
      description:
        "Logo concepts (3 directions), refinement, final logo system, colour palette, typography, iconography, photographic direction. Two revision rounds.",
    },
    {
      step: "03",
      title: "Verbal Identity",
      description:
        "Brand voice definition, messaging frameworks, tagline options, naming (if needed), Hinglish usage rules. Aligned to the positioning strategy.",
    },
    {
      step: "04",
      title: "Guidelines & Rollout",
      description:
        "60+ page brand book, all source files, templates for social/print/signage, and rollout support across web, marketing, and team training.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "Premium positioning",
      description:
        "Strong brands command premium pricing. Delhi clients report 20–40% price uplift after rebrand, with no drop in conversion.",
    },
    {
      icon: "Sparkles",
      title: "Stand out from competitors",
      description:
        "In a saturated Delhi market, distinctive branding is the cheapest way to differentiate — far cheaper than outspending on ads.",
    },
    {
      icon: "Users",
      title: "Customer loyalty",
      description:
        "Brands build emotional connection. Repeat purchase rates lift 25–60% after a strategic rebrand, vs. pre-brand benchmarks.",
    },
    {
      icon: "Layers",
      title: "Consistent touchpoints",
      description:
        "Brand guidelines ensure every touchpoint — web, social, print, signage, packaging — feels like one cohesive brand experience.",
    },
    {
      icon: "Award",
      title: "Team alignment",
      description:
        "A documented brand gives your sales, marketing, and operations teams a shared language and clear standards to execute against.",
    },
    {
      icon: "Rocket",
      title: "Faster go-to-market",
      description:
        "With templates, asset libraries, and clear guidelines, your team ships campaigns faster — no need to brief a designer for every social post.",
    },
  ],
  stats: [
    { value: 40, suffix: "+", label: "Delhi brands launched" },
    { value: 30, suffix: "%", label: "Avg price uplift post-rebrand" },
    { value: 60, suffix: "+", label: "Pages in brand book" },
    { value: 100, suffix: "%", label: "Strategy-first projects" },
  ],
  faqs: [
    {
      q: "How much does branding cost in Delhi?",
      a: "Our Delhi branding engagements start at ₹1,50,000 for a startup identity package (logo, colours, type, basic guidelines) and scale to ₹8,00,000+ for full strategic rebrands of established businesses. Most Delhi SME brand projects land in the ₹2,50,000 – ₹5,00,000 range.",
    },
    {
      q: "How long does a branding project take?",
      a: "8–12 weeks for a standard brand identity project. 12–16 weeks for a full strategic rebrand with research and rollout. Discovery is weeks 1–2, visual identity weeks 3–6, verbal identity weeks 7–8, guidelines + rollout weeks 9–12.",
    },
    {
      q: "Do you only design logos, or full brand systems?",
      a: "Full brand systems. Logo is one deliverable — we also deliver positioning, voice, messaging, colour, typography, iconography, photography direction, motion principles, brand guidelines, and rollout templates. If you only need a logo, we are not the right agency.",
    },
    {
      q: "Can you rebrand an existing Delhi business without losing equity?",
      a: "Yes — about 60% of our Delhi work is rebrands. We audit your current brand equity (what to preserve), identify what to evolve, and craft a migration plan that does not alienate existing customers. We handle logo evolution, asset migration, and customer communication.",
    },
    {
      q: "Do you handle brand rollout — website, social, print?",
      a: "Yes. We coordinate website redesign (in-house), social media template creation, marketing collateral design, signage design, packaging, and team training. You can also engage us for the identity only and roll out internally — we provide the guidelines and templates to make that possible.",
    },
  ],
  relatedServices: [
    "website-development-delhi",
    "social-media-delhi",
    "google-business-profile-delhi",
    "branding-dwarka",
  ],
};

const googleBusinessProfileDelhi: LocationServicePage = {
  slug: "google-business-profile-delhi",
  location: "delhi",
  locationLabel: "Delhi",
  serviceKey: "google-business-profile",
  title: "Google Business Profile in Delhi",
  h1: "Google Business Profile in Delhi",
  targetKeyword: "google business profile delhi",
  icon: "MapPinned",
  heroSubtitle:
    "Own the Map Pack in your Delhi neighbourhood. Optimisation, review acquisition, and geo-grid rank tracking that wins local customers.",
  metaTitle:
    "Google Business Profile in Delhi | Local SEO & GMB | SOCIAL VIENS",
  metaDescription:
    "Delhi's Google Business Profile agency. Map Pack optimisation, review acquisition, geo-grid tracking. 44% of local searches convert. Free GBP audit.",
  overviewTitle: "Win the Delhi Map Pack — where local customers actually convert",
  overviewText:
    "In Delhi, 44% of local Google searches end in a purchase within 24 hours — and 76% of those purchases go to a business in the top 3 of the Map Pack. If your Google Business Profile is unverified, under-optimised, or review-poor, you are invisible to the highest-intent customers in your neighbourhood. Our Google Business Profile services in Delhi are built to put you in the top 3 of the Map Pack for every neighbourhood-relevant search — and keep you there. We do not 'set up your profile and walk away'. We treat GBP as a living, daily-managed channel — optimised, monitored, and grown week over week. Our Delhi GBP practice covers six pillars: profile setup & verification, optimisation (every field, every category, every photo), review acquisition, Q&A management, post publishing, and geo-grid rank tracking. Setup & verification handles the basics right: NAP consistency across web/citation sources, category selection (we use the GBP category audit tool to identify the highest-traffic categories for your business), service area configuration, hours, attributes, and product/service listings. For multi-location Delhi businesses (e.g., a clinic chain in Saket, Lajpat Nagar, and Dwarka), we build and manage a profile per location. Optimisation is where most Delhi businesses lose. We write keyword-rich business descriptions, upload 50+ geo-tagged photos (interior, exterior, team, products, before/after), add services with prices, add products with photos, configure attributes (women-led, LGBTQ+ friendly, outdoor seating), and ensure every field is filled — Google rewards completeness. Review acquisition is engineered, not begged for. We deploy post-service SMS + email review request flows (integrated with your CRM), in-store QR code displays, WhatsApp review request templates, and review response protocols (every review gets a thoughtful, brand-voice response within 24 hours — including 1-star reviews, which we treat as recovery opportunities). Delhi clients see 30–80 new reviews per month within 90 days of launching these flows. Q&A management: we pre-seed the GBP Q&A section with 10–15 frequently asked questions (with brand-voice answers), monitor for new questions, and respond within 24 hours. This both serves customers and feeds Google's algorithm keyword-rich content. Post publishing: weekly posts — offers, updates, events, products — that keep your profile active and surface in Google Discover. Geo-grid rank tracking is the secret weapon. We track your Map Pack ranking block-by-block across Delhi — every 1km grid in your service area — so you see exactly where you rank #1, #3, or off the map. This lets us target weak neighbourhoods with location-specific landing pages and citation building. We have moved Delhi clinics from off-the-Map-Pack to top-3 in their Pin Code in 60 days, restaurants to #1 in their sector, and professional services firms to consistent Map Pack dominance across all target neighbourhoods. In Delhi's local search market, GBP is not optional — it is the single highest-ROI channel for any business that serves customers within a geographic area.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Neighbourhood-level targeting",
      description:
        "We track your Map Pack ranking by Delhi block — Saket vs. Lajpat Nagar vs. Nehru Place — and target weak grids with hyper-local content and citations.",
    },
    {
      icon: "Star",
      title: "Engineered review acquisition",
      description:
        "SMS + email + WhatsApp + in-store QR flows, integrated with your CRM. Delhi clients see 30–80 new reviews per month within 90 days.",
    },
    {
      icon: "Clock",
      title: "24-hour response SLA",
      description:
        "Every review — including 1-star — gets a thoughtful, brand-voice response within 24 hours. Reviews are recovery opportunities, not threats.",
    },
    {
      icon: "BarChart3",
      title: "Geo-grid rank tracking",
      description:
        "Block-by-block Map Pack tracking across every 1km grid in your Delhi service area. You see exactly where you rank #1 and where you need work.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Audit & Setup",
      description:
        "Profile audit (or fresh setup), verification, NAP consistency check, category audit, competitor GBP benchmarking. Deliverable: 15-page GBP audit report.",
    },
    {
      step: "02",
      title: "Optimisation",
      description:
        "Every field filled, keyword-rich description, 50+ geo-tagged photos, services/products with prices, attributes, hours, service area configured.",
    },
    {
      step: "03",
      title: "Review & Q&A Engine",
      description:
        "Deploy SMS/email/WhatsApp review flows, in-store QR displays, pre-seed Q&A with 10–15 FAQs, monitor and respond within 24 hours.",
    },
    {
      step: "04",
      title: "Posts & Tracking",
      description:
        "Weekly post publishing (offers, updates, events), geo-grid rank tracking, monthly performance review, ongoing optimisation.",
    },
  ],
  benefits: [
    {
      icon: "MapPinned",
      title: "Top-3 Map Pack ranking",
      description:
        "76% of local-search purchases go to the top 3 in the Map Pack. We get you there in 60–90 days, for your target Delhi neighbourhoods.",
    },
    {
      icon: "TrendingUp",
      title: "44% conversion rate",
      description:
        "44% of local Google searches convert within 24 hours. Map Pack visibility is the highest-ROI channel for local Delhi businesses.",
    },
    {
      icon: "Star",
      title: "30–80 reviews/month",
      description:
        "Engineered review flows deliver 30–80 new reviews per month within 90 days — without buying or incentivising, fully Google-compliant.",
    },
    {
      icon: "Phone",
      title: "More calls + directions",
      description:
        "Top-3 Map Pack positions see 3–5x more call/direction requests than positions 4–10. Direct revenue impact, not just visibility.",
    },
    {
      icon: "Layers",
      title: "Multi-location management",
      description:
        "We manage GBP profiles for businesses with multiple Delhi locations — each optimised, each tracked, each reviewed.",
    },
    {
      icon: "BarChart3",
      title: "Block-by-block tracking",
      description:
        "Geo-grid rank tracking shows your Map Pack position every 1km across your service area. No more guessing where you rank.",
    },
  ],
  stats: [
    { value: 44, suffix: "%", label: "Local searches that convert" },
    { value: 3, suffix: "x", label: "More calls in top-3" },
    { value: 80, suffix: "+", label: "Reviews/month achievable" },
    { value: 60, suffix: " days", label: "To top-3 Map Pack" },
  ],
  faqs: [
    {
      q: "How much does Google Business Profile management cost in Delhi?",
      a: "Our Delhi GBP retainers start at ₹12,000/month for a single location and scale to ₹50,000+/month for multi-location businesses with active review flows and geo-grid tracking. Most single-location Delhi businesses land at ₹15,000–₹25,000/month.",
    },
    {
      q: "How long until I see Map Pack ranking improvement?",
      a: "Optimisation is complete in 2 weeks. Map Pack movement typically starts in 30–45 days. Top-3 placement for target keywords usually achieved in 60–90 days. Highly competitive Delhi niches (e.g., 'dentist in South Delhi') may take 4–6 months.",
    },
    {
      q: "Can you guarantee I get into the top 3 of Google Maps?",
      a: "No — Google's local algorithm has 200+ factors and no one can guarantee a specific position. What we DO guarantee is full optimisation, weekly activity, engineered review acquisition, and geo-grid tracking that shows exactly where you rank — and what to do about weak areas.",
    },
    {
      q: "How do you get more Google reviews without violating Google's policy?",
      a: "We ask customers for reviews (allowed), we make it easy via SMS/email/QR flows (allowed), we respond to every review (allowed). We never pay for reviews, never incentivise with discounts, never post fake reviews. Our review acquisition is 100% Google-compliant — and sustainable.",
    },
    {
      q: "Can you manage Google Business Profile for multiple Delhi locations?",
      a: "Yes — we manage GBP for Delhi businesses with 2–25 locations. Each location gets its own optimised profile, review flow, post calendar, and geo-grid tracking. Bulk management tools used where appropriate to keep costs efficient.",
    },
  ],
  relatedServices: [
    "seo-services-delhi",
    "website-development-delhi",
    "branding-delhi",
    "google-business-profile-dwarka",
  ],
};

const appDevelopmentDelhi: LocationServicePage = {
  slug: "app-development-delhi",
  location: "delhi",
  locationLabel: "Delhi",
  serviceKey: "app-development",
  title: "App Development in Delhi",
  h1: "App Development in Delhi",
  targetKeyword: "app development delhi",
  icon: "Smartphone",
  heroSubtitle:
    "Native & cross-platform apps engineered for Delhi's mobile-first consumers. iOS, Android, React Native, Flutter — built to scale.",
  metaTitle: "App Development in Delhi | iOS, Android, React Native | SOCIAL VIENS",
  metaDescription:
    "Delhi's mobile app development agency. Native iOS, Android, React Native, Flutter. 30+ apps shipped. App Store + Play Store launches. Free scope call.",
  overviewTitle: "Apps built for Delhi's mobile-first consumers",
  overviewText:
    "Delhi has India's highest smartphone penetration outside Mumbai — over 90% of the NCR population carries an Android device, and iOS market share is rising fast in South Delhi, Gurugram, and Noida. For many Delhi businesses, a mobile app is no longer a nice-to-have; it is the primary channel for retention, repeat purchases, and customer data. Our app development in Delhi is built for this reality — fast, reliable, secure, and engineered to scale from your first 1,000 users to your first million. We do not build 'minimum viable products' that fall over at scale. We build production-grade apps from day one — with the architecture, performance, and observability needed to handle Delhi's mobile network reality (intermittent 4G, background app kills, low-end Android devices). Our Delhi app development practice covers four areas: native iOS (Swift), native Android (Kotlin), cross-platform (React Native and Flutter), and Progressive Web Apps (PWAs) for businesses that need an app-like experience without the app store overhead. We pick the right technology based on your use case, budget, and team — not based on what we want to sell. Our process starts with a product discovery sprint: user research, competitive analysis (including 3 Delhi/India competitor apps), feature prioritisation (MoSCoW), wireframes, and a product roadmap. We then move into UI/UX design — high-fidelity Figma prototypes that you can test on real Delhi users before we write a single line of code. Development is in-house, no outsourcing: senior engineers with 5+ years of mobile experience, code reviews on every PR, automated testing on real devices (not just emulators), and CI/CD pipelines that ship updates to TestFlight and Play Console daily. We integrate with the backends Delhi businesses actually use: Firebase, AWS, Supabase, custom Node/Python services, Zoho, Salesforce, Razorpay, Stripe, WhatsApp Business API, and Google Maps. We handle App Store and Play Store submission, review processes, and ongoing compliance — including India's DPDP Act requirements for data residency and consent. Post-launch, we offer maintenance retainers that include bug fixes, OS updates (iOS/Android version bumps), performance monitoring (Crashlytics, Sentry), feature iterations, and quarterly business reviews. We have shipped 30+ apps for Delhi NCR businesses across e-commerce, healthcare, real estate, education, fintech, and logistics. Whether you are a Delhi e-commerce brand needing a Shopify-class mobile experience, a healthcare chain building patient engagement, or a real estate developer creating a property discovery app — we have the depth to deliver. This is not 'we will build an MVP for you'. This is engineering partnership for the life of your product.",
  whyChooseUs: [
    {
      icon: "Smartphone",
      title: "30+ apps shipped",
      description:
        "We have shipped 30+ production apps for Delhi NCR businesses across e-commerce, healthcare, real estate, education, fintech, and logistics.",
    },
    {
      icon: "MapPin",
      title: "Built for Delhi's mobile reality",
      description:
        "Intermittent 4G, low-end Android devices, background app kills — we engineer for the conditions Delhi users actually face, not emulator-only perfection.",
    },
    {
      icon: "Code",
      title: "In-house senior engineers",
      description:
        "5+ years mobile experience, code reviews on every PR, automated testing on real devices, daily CI/CD to TestFlight and Play Console. No outsourcing.",
    },
    {
      icon: "ShieldCheck",
      title: "DPDP Act compliant",
      description:
        "India's DPDP Act requires data residency, explicit consent, and user rights. We engineer for compliance from day one — not as an afterthought.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Product Discovery",
      description:
        "User research, competitive analysis (3 Delhi/India apps), feature prioritisation (MoSCoW), wireframes, product roadmap. Deliverable: PRD + roadmap.",
    },
    {
      step: "02",
      title: "UI/UX Design",
      description:
        "High-fidelity Figma prototypes, user testing on real Delhi users, design system, motion specs. Two revision rounds. You see exactly what we will build.",
    },
    {
      step: "03",
      title: "Development & QA",
      description:
        "In-house dev (Swift/Kotlin/React Native/Flutter), code reviews, automated tests, real-device QA, daily TestFlight/Play Console builds.",
    },
    {
      step: "04",
      title: "Launch & Maintain",
      description:
        "App Store + Play Store submission, review handling, post-launch monitoring (Crashlytics), bug fixes, OS updates, feature iterations.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "Built to scale",
      description:
        "Architecture that handles your first 1,000 users and your first million. No 'rebuild when we grow' tax — we build for the long term.",
    },
    {
      icon: "Gauge",
      title: "Sub-2-second launches",
      description:
        "App cold-start under 2 seconds on mid-range Android devices. Critical for Delhi retention — slow-launch apps get uninstalled.",
    },
    {
      icon: "ShieldCheck",
      title: "Secure by design",
      description:
        "Encrypted local storage, biometric auth, secure API communication, GDPR/DPDP compliance. Your users' data is protected end-to-end.",
    },
    {
      icon: "RefreshCw",
      title: "Offline-first",
      description:
        "Intermittent connectivity is the norm in Delhi. We build offline-first with sync-on-reconnect, so users can browse, order, and engage without signal.",
    },
    {
      icon: "Bell",
      title: "Push notification strategy",
      description:
        "We design your push notification strategy — opt-in flow, frequency, segmentation, deep-linking — to drive retention without spamming.",
    },
    {
      icon: "BarChart3",
      title: "Analytics & insights",
      description:
        "Firebase, Mixpanel, or Amplitude integrated — you see user flows, retention cohorts, and feature usage from day one.",
    },
  ],
  stats: [
    { value: 30, suffix: "+", label: "Apps shipped" },
    { value: 2, suffix: "s", label: "Avg cold-start time" },
    { value: 4.5, suffix: "★", label: "Avg app store rating" },
    { value: 1, suffix: "M+", label: "Users served" },
  ],
  faqs: [
    {
      q: "How much does app development cost in Delhi?",
      a: "Our Delhi app development projects start at ₹3,00,000 for an MVP with limited features and scale to ₹25,00,000+ for full-featured production apps with backend, admin panel, and integrations. Most Delhi SME apps land in the ₹6,00,000 – ₹15,00,000 range. Fixed-quote proposal after discovery.",
    },
    {
      q: "How long does it take to build an app?",
      a: "8–16 weeks for an MVP. 16–24 weeks for a full-featured production app. Discovery is weeks 1–2, design weeks 3–6, development weeks 7–14, QA + store submission weeks 15–16. Complex apps with backend or third-party integrations take longer.",
    },
    {
      q: "Should I build native iOS/Android or cross-platform (React Native/Flutter)?",
      a: "Depends on your budget, timeline, and performance needs. Cross-platform (React Native or Flutter) is right for 80% of Delhi SME apps — single codebase, faster shipping, lower cost. Native is right when you need maximum performance (gaming, AR/VR, heavy animations) or deep platform integrations. We recommend after discovery.",
    },
    {
      q: "Do you handle App Store and Play Store submission?",
      a: "Yes — included in every project. We handle store listings, screenshots, metadata, submission, review handling, and re-submission if rejected. We have a 100% approval rate (after revisions) across our Delhi portfolio.",
    },
    {
      q: "Do you provide ongoing maintenance after launch?",
      a: "Yes — optional maintenance retainer (₹25,000–₹1,00,000/month depending on app complexity). Includes bug fixes, OS version updates, performance monitoring, security patches, and feature iterations. We recommend at least 6 months of post-launch retainer.",
    },
  ],
  relatedServices: [
    "website-development-delhi",
    "seo-services-delhi",
    "branding-delhi",
    "app-development-dwarka",
  ],
};

/* ====================================================================== */
/*  DWARKA  — 7 pages (Spec §5.4)                                         */
/* ====================================================================== */

const websiteDevelopmentDwarka: LocationServicePage = {
  slug: "website-development-dwarka",
  location: "dwarka",
  locationLabel: "Dwarka",
  serviceKey: "website-development",
  title: "Website Development in Dwarka",
  h1: "Website Development in Dwarka",
  targetKeyword: "website development dwarka",
  icon: "Globe",
  heroSubtitle:
    "Websites engineered for Dwarka's residential sub-city market — fast, mobile-first, and built to win Sector 6, 12, and 21 customers.",
  metaTitle:
    "Website Development in Dwarka | Custom Web Design | SOCIAL VIENS",
  metaDescription:
    "Dwarka's local website development agency. Fast, mobile-first, SEO-ready sites built for sub-city consumers. 20+ Dwarka clients. Free scope call.",
  overviewTitle: "Websites built for Dwarka's residential sub-city market",
  overviewText:
    "Dwarka is one of Asia's largest residential sub-cities — over 1 million residents across 29 sectors, with a consumer base that is uniquely dense, neighbourhood-loyal, and mobile-first. A Dwarka business is not competing for all of Delhi; it is competing for the residents of Sectors 6, 7, 12, 21, and the surrounding blocks who search 'near me' before they ever step out. A generic template website built for 'all of India' will not win this market. Our website development in Dwarka is engineered specifically for this sub-city reality. We build websites that load in under two seconds on the 4G networks that dominate Dwarka mobile usage, that rank for sector-specific search terms ('grocery store Sector 12 Dwarka', 'CA Sector 6 Dwarka'), and that convert the high-intent Dwarka consumer who searches Google, checks Instagram, and messages on WhatsApp — often within the same 30-minute window. Every Dwarka site we ship starts with a discovery session focused on your sector-level service area: which blocks you serve, which Pin Codes, which competitor businesses in those sectors we need to differentiate against. We then design a visual identity that fits the premium expectations of Dwarka's predominantly middle-class and upper-middle-class residents — clean typography, generous white space, mobile-first layouts, and product photography that looks like it was shot in Dwarka, not stock-footage generic. Development is in-house: semantic HTML5, server-side rendering where it counts, structured data for LocalBusiness with sector-specific service areas, GA4 + Meta Pixel + WhatsApp Business integration, and a CMS workflow that lets Dwarka business owners update their own content without needing us. We integrate with the tools Dwarka businesses actually use: WhatsApp Business (essential — Dwarka consumers prefer WhatsApp over phone calls), Razorpay for local payments, Zoho CRM for lead tracking, and Google Business Profile sync so your website stays consistent with your Map Pack presence. Whether you are a Sector 6 boutique, a Sector 12 clinic, a Sector 21 restaurant, or a Dwarka Mor retailer — our sites are built to rank, load, and convert in this specific sub-city market. We have shipped 20+ production sites for Dwarka businesses across real estate, healthcare, retail, education, food delivery, and professional services. We know the local search behaviour, the WhatsApp-first communication preference, the festival-season traffic patterns, and the sector-specific competitor landscape. This is not website design for 'somewhere in Delhi'. This is website development for Dwarka.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Sector-level targeting",
      description:
        "We build pages optimised for Dwarka sector-specific searches — 'doctor Sector 12 Dwarka', 'restaurant Sector 21'. Rank where your customers actually live.",
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp-first integration",
      description:
        "Dwarka consumers prefer WhatsApp over phone calls. Every site ships with click-to-chat, WhatsApp float, and lead routing to your business number.",
    },
    {
      icon: "Zap",
      title: "Built for Dwarka mobile networks",
      description:
        "We test on real Dwarka 4G networks, not just office WiFi. Sub-2-second load times on mid-range Android devices — the dominant device class in Dwarka.",
    },
    {
      icon: "Search",
      title: "Sub-city SEO baked in",
      description:
        "LocalBusiness schema with sector-level service areas, location pages per sector, and Google Business Profile sync. Built to rank in Dwarka Map Pack from day one.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Discovery & Sector Mapping",
      description:
        "We map your sector-level service area, audit 3 Dwarka competitors in those sectors, and define conversion events. Deliverable: scope + sitemap with sector pages.",
    },
    {
      step: "02",
      title: "Design & Prototype",
      description:
        "High-fidelity Figma designs for desktop + mobile, reviewed live with you. Two revision rounds. You see exactly what we will build before code.",
    },
    {
      step: "03",
      title: "Development & QA",
      description:
        "In-house dev in Next.js / WordPress / Sanity. Tested on Dwarka 4G networks and mid-range Android. WhatsApp, Razorpay, CRM hooks wired. Staging URL for sign-off.",
    },
    {
      step: "04",
      title: "Launch & Local SEO",
      description:
        "DNS cutover, 301 redirects, sitemap submission, GBP sync, and 30-day post-launch optimisation focused on Dwarka sector-level rankings.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "3x more WhatsApp leads",
      description:
        "Dwarka clients see 3x lift in WhatsApp chats and form fills within 90 days, vs. their previous template site. WhatsApp-first UX makes the difference.",
    },
    {
      icon: "Gauge",
      title: "Sub-2-second load times",
      description:
        "Average 1.4s on Dwarka 4G with 90+ Lighthouse scores. Mobile users abandon at 3s — we keep you well under that threshold.",
    },
    {
      icon: "Smartphone",
      title: "Mobile-first by default",
      description:
        "85%+ of Dwarka traffic is mobile. Every layout, form, and CTA is designed thumb-first, tested on mid-range Android devices.",
    },
    {
      icon: "Search",
      title: "Rank in Dwarka sectors",
      description:
        "Sector-level landing pages and LocalBusiness schema give you a head start in Dwarka Map Pack from day one.",
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp + CRM integration",
      description:
        "Leads flow to WhatsApp and your CRM automatically — no manual data entry, no missed follow-ups, no leads falling through cracks.",
    },
    {
      icon: "Palette",
      title: "Locally-relevant design",
      description:
        "Visual identity that resonates with Dwarka's predominantly middle-class and upper-middle-class residents. Not generic, not flashy — appropriately premium.",
    },
  ],
  stats: [
    { value: 20, suffix: "+", label: "Dwarka sites shipped" },
    { value: 3, suffix: "x", label: "Avg WhatsApp lead lift" },
    { value: 1.4, suffix: "s", label: "Avg load time on 4G" },
    { value: 99.9, suffix: "%", label: "Uptime SLA" },
  ],
  faqs: [
    {
      q: "How much does website development cost in Dwarka?",
      a: "Our Dwarka website projects start at ₹25,000 for a 5-page brochure site and scale to ₹2,50,000+ for sector-targeted sites with multiple location pages, CRM integrations, and WhatsApp automation. Most Dwarka SME sites land in the ₹40,000 – ₹1,00,000 range. Fixed-quote proposal after a free discovery session.",
    },
    {
      q: "Will my website rank for Dwarka sector-specific searches?",
      a: "Yes — every site ships with sector-level landing pages and LocalBusiness schema targeting your service areas. For competitive Dwarka queries (e.g., 'CA in Sector 6 Dwarka') we recommend pairing with our SEO retainer. Most clients see Map Pack movement in 60–90 days post-launch.",
    },
    {
      q: "Do you build websites for businesses serving all of Dwarka or just specific sectors?",
      a: "Both. If you serve all 29 sectors, we build a single site with strong Dwarka-level SEO. If you serve specific sectors (e.g., clinic in Sector 12 serving Sector 11, 12, 13), we build sector-targeted pages that rank for each Pin Code. Strategy depends on your actual service area.",
    },
    {
      q: "Can you integrate WhatsApp Business for my Dwarka customers?",
      a: "Yes — WhatsApp Business API integration is included as standard on every Dwarka site. Click-to-chat buttons, WhatsApp float widget, automated replies, and lead routing to your business number. Critical for Dwarka consumers who prefer WhatsApp over phone calls.",
    },
    {
      q: "How long does it take to build a website for my Dwarka business?",
      a: "Typical timeline is 3–6 weeks for a standard Dwarka business website, 6–12 weeks for e-commerce or multi-location builds. Discovery is week 1, design weeks 2–3, development weeks 4–5, QA + launch weeks 5–6. We share a staging URL by week 3.",
    },
  ],
  relatedServices: [
    "seo-services-dwarka",
    "google-business-profile-dwarka",
    "social-media-dwarka",
    "website-development-delhi",
  ],
};

const seoServicesDwarka: LocationServicePage = {
  slug: "seo-services-dwarka",
  location: "dwarka",
  locationLabel: "Dwarka",
  serviceKey: "seo-services",
  title: "SEO Services in Dwarka",
  h1: "SEO Services in Dwarka",
  targetKeyword: "seo services dwarka",
  icon: "Search",
  heroSubtitle:
    "Rank on Google for Dwarka sector-level keywords. Local Map Pack dominance, content engineering, and citation building for sub-city SEO.",
  metaTitle: "SEO Services in Dwarka | Local SEO Agency | SOCIAL VIENS",
  metaDescription:
    "Dwarka's local SEO agency. Sector-level keyword targeting, Map Pack optimisation, content & citations. 3x avg organic traffic lift. Free audit.",
  overviewTitle: "SEO engineered for Dwarka's sector-level search behaviour",
  overviewText:
    "Dwarka is a unique SEO market. Unlike scattered Delhi-wide audiences, Dwarka's 1 million residents search in concentrated patterns — sector-specific, neighbourhood-loyal, and heavily reliant on the Google Maps app on their phones. 'Doctor Sector 12 Dwarka', 'grocery store Sector 6 Dwarka', 'CA Sector 21 Dwarka' — these are the queries that drive actual footfall and revenue in this sub-city. Generic Delhi-wide SEO does not win here; you need an SEO partner who understands the sector-level search behaviour, the local citation landscape, and the Map Pack dynamics specific to Dwarka. Our SEO services in Dwarka are built for exactly this. We combine technical depth, sector-level keyword targeting, local Map Pack engineering, content creation, and citation building — all calibrated for the Dwarka consumer's search patterns. We start with a full technical audit — crawlability, indexation, Core Web Vitals, schema, internal linking, JavaScript rendering — because in Dwarka's competitive SERPs, technical debt keeps you off page one for months. We then build a keyword strategy that targets the full sector-level funnel: high-intent commercial queries ('dentist Sector 7 Dwarka'), sector long-tails ('grocery delivery Sector 12 Dwarka'), informational content hubs ('best schools in Dwarka'), and brand-defensive queries. Our content team writes in the language Dwarka residents actually search in — predominantly English with Hinglish variants where the audience demands it. Local SEO is the highest-ROI channel in Dwarka. We optimise your Google Business Profile for the Map Pack in every sector you serve — Sector 6, 7, 11, 12, 21, 22, and the surrounding blocks — with review acquisition flows, photo updates, Q&A management, and geo-grid rank tracking that shows exactly where you rank sector-by-sector. Citation building is especially important in Dwarka — we ensure NAP consistency across JustDial, IndiaMART, Sulekha, TradeIndia, and 30+ local directories that Dwarka consumers actually use. Backlink acquisition is white-hat only: digital PR in Dwarka-focussed publications (Dwarka Parichay, Dwarka City), HARO outreach, partnerships with Dwarka RWAs and sector associations, and guest columns in Indian business press. We never buy links, never use PBNs, never risk your domain. Reporting is real-time: a custom Looker Studio dashboard with sector-level rankings, organic traffic, goal completions, and revenue attribution. Weekly rank-tracking updates, monthly strategy calls, quarterly business reviews. We have driven 3x average organic traffic growth for 20+ Dwarka businesses across real estate, healthcare, retail, education, food, and professional services. Whether you are a Sector 12 clinic, a Sector 6 boutique, a Sector 21 restaurant, or a Dwarka Mor retailer — our SEO will make you visible to the consumers searching for you in this sub-city.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Sector-level keyword targeting",
      description:
        "We track your rankings by Dwarka sector — Sector 6 vs. Sector 12 vs. Sector 21 — and build sector-specific landing pages that win each micro-market.",
    },
    {
      icon: "Search",
      title: "Dwarka citation landscape",
      description:
        "We know which local directories Dwarka consumers actually use — JustDial, IndiaMART, Sulekha, TradeIndia, plus 30+ niche directories. NAP consistency, managed.",
    },
    {
      icon: "Link2",
      title: "Dwarka-focussed link building",
      description:
        "Digital PR in Dwarka Parichay, Dwarka City, and sector RWA partnerships. Local relevance that moves Dwarka-specific rankings, safely.",
    },
    {
      icon: "BarChart3",
      title: "Sector-level rank tracking",
      description:
        "Geo-grid tracking shows your Map Pack ranking sector-by-sector across Dwarka — you see exactly where you rank #1 and where to focus next.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Audit & Sector Mapping",
      description:
        "Full technical crawl, sector-level keyword gap analysis vs. 3 Dwarka competitors, citation audit, and revenue-impact model. Deliverable: SEO strategy document.",
    },
    {
      step: "02",
      title: "Technical & Local",
      description:
        "Crawlability, schema, internal linking, page speed, GBP optimisation per sector, citation cleanup across 30+ directories. Completed in 4–6 weeks.",
    },
    {
      step: "03",
      title: "Content & Sector Pages",
      description:
        "Sector-specific landing pages, service pages, blog content addressing Dwarka consumer questions — published on a weekly cadence.",
    },
    {
      step: "04",
      title: "Links & Authority",
      description:
        "Dwarka-focussed digital PR, sector RWA partnerships, HARO outreach, and guest columns — building domain authority for Dwarka-specific rankings.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "3x organic traffic lift",
      description:
        "Average Dwarka client sees 3x organic traffic growth within 6 months — measured in attributed leads and revenue, not vanity rankings.",
    },
    {
      icon: "MapPinned",
      title: "Sector-level Map Pack",
      description:
        "Rank in top-3 of Google Maps for every Dwarka sector you serve — where 44% of local searches convert within 24 hours.",
    },
    {
      icon: "PenTool",
      title: "Dwarka-relevant content",
      description:
        "Long-form content addressing Dwarka consumer questions — written in the language residents actually search in (English + Hinglish).",
    },
    {
      icon: "Link2",
      title: "Local citation cleanup",
      description:
        "NAP consistency across JustDial, IndiaMART, Sulekha, and 30+ directories Dwarka consumers use. Foundational for local rankings.",
    },
    {
      icon: "Gauge",
      title: "Technical excellence",
      description:
        "Sub-2-second load times, clean schema, perfect crawl budget — the foundation that lets content rank in Dwarka SERPs.",
    },
    {
      icon: "BarChart3",
      title: "Sector-level reporting",
      description:
        "Real-time dashboards showing rankings by sector, organic traffic by sector, and revenue attribution. No more guessing what works.",
    },
  ],
  stats: [
    { value: 20, suffix: "+", label: "Dwarka SEO clients" },
    { value: 3, suffix: "x", label: "Avg organic traffic lift" },
    { value: 60, suffix: " days", label: "To Map Pack movement" },
    { value: 30, suffix: "+", label: "Local directories synced" },
  ],
  faqs: [
    {
      q: "How long does SEO take to show results in Dwarka?",
      a: "Map Pack movement typically happens in 30–60 days for Dwarka sector-level keywords (less competitive than city-wide Delhi). Meaningful organic traffic growth by month 3. Significant ROI by month 5. Less competitive than Delhi-wide SEO because sector-level keywords are easier to win.",
    },
    {
      q: "How much do SEO services cost in Dwarka?",
      a: "Our Dwarka SEO retainers start at ₹20,000/month for local SMEs targeting 1–2 sectors and scale to ₹80,000+/month for multi-sector or Dwarka-wide campaigns. Most Dwarka SME engagements land in the ₹30,000 – ₹50,000/month range.",
    },
    {
      q: "Can you help my Dwarka business rank in the Google Maps pack?",
      a: "Yes — local SEO and Map Pack optimisation is our specialty. We have moved Dwarka businesses from off-the-Map-Pack to top-3 in their target sectors in 60 days. GBP optimisation, review flows, geo-grid tracking, and citation building are all included.",
    },
    {
      q: "Which Dwarka sectors do you target for SEO?",
      a: "All 29 sectors — depending on where your customers are. We start with a sector-mapping exercise: which sectors you currently serve, which sectors have the most demand for your service, and which sectors have the weakest competitors. We focus on those first.",
    },
    {
      q: "Do you write content in Hindi or Hinglish for Dwarka audiences?",
      a: "Yes — about 30% of our Dwarka content is in Hinglish or formal Hindi, depending on your target audience. Dwarka residents search in a mix of English and Hinglish; we match your content to your actual customer's search behaviour.",
    },
  ],
  relatedServices: [
    "website-development-dwarka",
    "google-business-profile-dwarka",
    "social-media-dwarka",
    "seo-services-delhi",
  ],
};

const socialMediaDwarka: LocationServicePage = {
  slug: "social-media-dwarka",
  location: "dwarka",
  locationLabel: "Dwarka",
  serviceKey: "social-media",
  title: "Social Media Marketing in Dwarka",
  h1: "Social Media Marketing in Dwarka",
  targetKeyword: "social media marketing dwarka",
  icon: "Share2",
  heroSubtitle:
    "Build a Dwarka-following that walks in. Instagram and WhatsApp content engineered for sub-city consumers and sector-level footfall.",
  metaTitle:
    "Social Media Marketing in Dwarka | Instagram Agency | SOCIAL VIENS",
  metaDescription:
    "Dwarka's social media marketing agency. Content, community, and paid social for sub-city consumers. 200K+ Dwarka followers generated. Free strategy call.",
  overviewTitle: "Social media that drives Dwarka footfall — not just likes",
  overviewText:
    "Dwarka's social media behaviour is distinct from wider Delhi. The 1 million residents of this sub-city form tight community clusters — sector WhatsApp groups, RWA Facebook groups, local Instagram accounts that residents follow for sector-specific news and recommendations. A viral Instagram reel is great; a viral Instagram reel that gets your Sector 12 restaurant 200 walk-ins this weekend is the actual goal. Our social media marketing in Dwarka is built to convert social attention into sector-level footfall, WhatsApp leads, and repeat business — not vanity metrics. We do not chase follower counts. We build engaged communities of Dwarka residents who actually buy from you. Our Dwarka social media practice covers four pillars: content production, community management, paid social amplification, and influencer partnerships — all calibrated for sub-city relevance. Content production is in-house: a creative director, two motion designers, two copywriters, and a photographer who can be on-site in Dwarka sectors within 24 hours. We shoot reels in actual Dwarka locations — Sector 6 markets, Sector 12 commercial blocks, Sector 21 metro station, Dwarka Mor — because Dwarka residents respond to content that looks like their neighbourhood, not generic Delhi stock footage. We post product photography, behind-the-scenes content, customer testimonials, festival-specific content (Dwarka has vibrant Dussehra, Diwali, and Lohri celebrations), and sector-specific announcements. Community management covers DMs, comments, mentions, and review responses across Instagram, Facebook, and WhatsApp Business. Our team responds within 2 hours during business hours, in the tone-of-voice we agree on, and routes sales-ready conversations to your team via WhatsApp. We also engage with Dwarka RWA Facebook groups and sector WhatsApp groups (with permission) where appropriate — a powerful channel that wider Delhi agencies miss. Paid social amplification is managed by the same team that runs your organic — so creative learnings compound. We run daily-traded paid social for Dwarka businesses, with average ROAS of 3.5x — higher than wider Delhi because Dwarka audiences are more concentrated and easier to target by Pin Code and interest. Influencer partnerships are sourced from our Dwarka network of 50+ local micro-influencers — sector-level food bloggers, fitness enthusiasts, fashion creators, and parenting voices with engaged Dwarka followings. Micro-influencers outperform macro-influencers in Dwarka because residents trust local voices over Delhi-wide celebrities. We have built Dwarka followings from zero to 200K, revived dormant accounts into active communities, and turned Instagram into the #1 lead source for Sector 12 clinics, Sector 6 boutiques, Sector 21 restaurants, and Dwarka Mor retailers. This is not posting for the sake of posting. This is social media engineered to drive measurable sector-level revenue.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Dwarka-native content",
      description:
        "We shoot in Sector 6, 12, 21 — not generic Delhi. Real local flavour that Dwarka residents recognise and engage with.",
    },
    {
      icon: "Users",
      title: "Community + RWA engagement",
      description:
        "We engage with Dwarka RWA Facebook groups and sector WhatsApp groups (with permission) — a channel wider Delhi agencies completely miss.",
    },
    {
      icon: "Sparkles",
      title: "Dwarka micro-influencer network",
      description:
        "50+ local micro-influencers across food, fitness, fashion, and parenting. Outperform macro-influencers because residents trust local voices.",
    },
    {
      icon: "BarChart3",
      title: "Sector-level ROAS reporting",
      description:
        "We track which sectors your customers come from — not just total conversions. Pin Code-level revenue attribution that wider agencies cannot match.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Strategy & Sector Audit",
      description:
        "Audit your current social, map 3 Dwarka competitors, define brand voice, content pillars, and target sectors. Deliverable: 90-day content calendar.",
    },
    {
      step: "02",
      title: "Content Production",
      description:
        "Reels, carousels, stories, YouTube shorts — shot in Dwarka locations, batch-produced monthly, edited, captioned, ready to schedule.",
    },
    {
      step: "03",
      title: "Community & Engagement",
      description:
        "Daily posting, DM/comment responses within 2 hours, sector WhatsApp + RWA Facebook engagement, lead routing to your WhatsApp.",
    },
    {
      step: "04",
      title: "Paid & Influencer",
      description:
        "Meta ads targeting Dwarka Pin Codes, micro-influencer activations from our 50+ Dwarka network, weekly optimisation, ROAS reporting by sector.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "200K+ Dwarka followers",
      description:
        "Across our Dwarka portfolio, we have built engaged followings from zero to 200K — organically, no bought followers, no engagement pods.",
    },
    {
      icon: "MessageCircle",
      title: "Sector-level WhatsApp leads",
      description:
        "Average Dwarka client sees 25+ qualified WhatsApp chats per week within 90 days — from residents who actually intend to buy.",
    },
    {
      icon: "Target",
      title: "3.5x average ROAS",
      description:
        "Higher than wider Delhi (3.2x) because Dwarka audiences are concentrated and easier to target by Pin Code and interest.",
    },
    {
      icon: "Users",
      title: "RWA + WhatsApp group reach",
      description:
        "Direct access to Dwarka RWA Facebook groups and sector WhatsApp groups (with permission) — a channel wider Delhi agencies miss entirely.",
    },
    {
      icon: "Sparkles",
      title: "Micro-influencer network",
      description:
        "50+ Dwarka micro-influencers across food, fitness, fashion, parenting — outperform macro-influencers on engagement and conversion.",
    },
    {
      icon: "MapPin",
      title: "Sector-level footfall",
      description:
        "We track which sectors your customers come from — so you know if your Sector 12 content is actually driving Sector 12 walk-ins.",
    },
  ],
  stats: [
    { value: 200, suffix: "K+", label: "Dwarka followers generated" },
    { value: 3.5, suffix: "x", label: "Avg ROAS on paid social" },
    { value: 50, suffix: "+", label: "Dwarka micro-influencers" },
    { value: 25, suffix: "+", label: "WhatsApp leads/week (avg)" },
  ],
  faqs: [
    {
      q: "How much does social media marketing cost in Dwarka?",
      a: "Our Dwarka social media retainers start at ₹25,000/month for 12 posts + community management, and scale to ₹1,20,000+/month for full-service with paid social and influencer activations. Most Dwarka SME engagements land in the ₹35,000 – ₹70,000/month range.",
    },
    {
      q: "Which platforms should my Dwarka business focus on?",
      a: "Instagram + WhatsApp Business is the winning combo for most Dwarka B2C businesses. Facebook remains relevant for RWA groups and older residents. LinkedIn for B2B/professional services. We will recommend the right mix after a free strategy call.",
    },
    {
      q: "Can you help me reach Dwarka RWA Facebook groups?",
      a: "Yes — we engage (with permission) with Dwarka RWA Facebook groups and sector WhatsApp groups where appropriate. This is a high-trust channel that wider Delhi agencies miss entirely, and it is especially powerful for service businesses targeting specific sectors.",
    },
    {
      q: "Do you have Dwarka influencers in your network?",
      a: "Yes — 50+ Dwarka-based micro-influencers across food, fitness, fashion, parenting, and lifestyle. We pre-vet them for engagement quality (not just follower count) and have negotiated rates. Micro-influencers outperform macro-influencers in Dwarka because residents trust local voices.",
    },
    {
      q: "How quickly will I see results from social media in Dwarka?",
      a: "Engagement lift in first 30 days. Follower growth meaningful by month 3. Sector-level footfall and WhatsApp leads usually show up in month 2–4. Paid social can drive leads within 2 weeks of launch. Dwarka results are typically faster than wider Delhi because audiences are more concentrated.",
    },
  ],
  relatedServices: [
    "paid-ads-dwarka",
    "branding-dwarka",
    "website-development-dwarka",
    "social-media-delhi",
  ],
};

const paidAdsDwarka: LocationServicePage = {
  slug: "paid-ads-dwarka",
  location: "dwarka",
  locationLabel: "Dwarka",
  serviceKey: "paid-ads",
  title: "Paid Advertising in Dwarka",
  h1: "Paid Advertising in Dwarka",
  targetKeyword: "paid ads dwarka",
  icon: "Target",
  heroSubtitle:
    "Google & Meta ads engineered for Dwarka sector-level targeting. Pin Code-level audience, 3.5x average ROAS.",
  metaTitle:
    "Paid Advertising in Dwarka | Google & Meta Ads | SOCIAL VIENS",
  metaDescription:
    "Dwarka's performance marketing agency. Google Ads, Meta Ads with Pin Code-level targeting. 3.5x avg ROAS. Free audit. Scale today.",
  overviewTitle: "Predictable revenue from Dwarka's paid ad channels",
  overviewText:
    "Dwarka is a uniquely targetable paid ad market. Unlike wider Delhi — where audiences are scattered across 32 million people and hundreds of Pin Codes — Dwarka's 1 million residents are concentrated in 29 sectors with predictable Pin Code patterns. This makes paid advertising in Dwarka more efficient, more measurable, and more profitable than wider Delhi campaigns, if you know how to target the sub-city correctly. Our paid advertising services in Dwarka are engineered to exploit this concentration. We do not run 'set-and-forget' campaigns. Every account we manage is daily-traded — bids, audiences, creative, landing pages — based on real-time performance data. Our Dwarka paid ads practice spans Google Ads (Search, Display, Performance Max, YouTube) and Meta Ads (Instagram + Facebook + Audience Network), with selective LinkedIn for B2B services targeting Dwarka professionals. We run daily-traded Dwarka ad accounts across real estate, healthcare, retail, education, food, and professional services — with portfolio ROAS of 3.5x (higher than wider Delhi because of audience concentration). Our methodology is built on three pillars: rigorous conversion tracking (server-side GA4, Meta Conversions API, offline conversion uploads for WhatsApp + call-based leads), aggressive creative testing (5+ ad variations per ad set, refreshed weekly), and Pin Code-level landing page optimisation. Pin Code-level targeting is the secret weapon. We do not target 'Dwarka' as a single audience — we target individual sectors by Pin Code, with separate ad sets, separate creative, and separate landing pages for each. A Sector 12 resident sees different ad creative than a Sector 21 resident, because the value propositions that convert them differ. Conversion tracking is non-negotiable. Dwarka consumers call and WhatsApp as often as they fill forms — you cannot optimise without offline conversion data. We wire up call tracking (CallRail, Knowlarity), WhatsApp Business lead tracking, CRM-based lead scoring, and server-side events to feed value-based bidding back into Google and Meta. Creative testing is relentless. Dwarka audiences fatigue fast — a winning Instagram ad typically has a 2-week shelf life before CPMs spike. We refresh creative weekly, test 5+ variations per ad set, and maintain a creative library of proven winners for scaling. Landing pages are built in-house on our own subdomains, A/B-tested weekly, and optimised for the specific Pin Code traffic source. Your Sector 6 traffic lands on a different page than your Sector 12 traffic, because the value propositions differ. We have generated 1,500+ qualified leads for Sector 12 clinics, and built restaurant customer acquisition funnels that deliver walk-ins efficiently. This is performance marketing engineered for Dwarka's concentrated, targetable market — not generic best practices.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Pin Code-level targeting",
      description:
        "We target individual Dwarka sectors by Pin Code, with separate ad sets and creative per sector. A Sector 12 resident sees different ads than a Sector 21 resident.",
    },
    {
      icon: "Target",
      title: "3.5x average ROAS in Dwarka",
      description:
        "We run daily-traded Dwarka ad accounts across real estate, healthcare, retail, education, food, and professional services. Portfolio ROAS: 3.5x.",
    },
    {
      icon: "Gauge",
      title: "WhatsApp + call tracking",
      description:
        "Dwarka consumers WhatsApp and call as often as they fill forms. We wire up call tracking, WhatsApp lead tracking, and CRM scoring — so we optimise for revenue.",
    },
    {
      icon: "Layers",
      title: "Pin Code-level landing pages",
      description:
        "Your Sector 6 traffic lands on a different page than your Sector 12 traffic. Pin Code-specific value propositions convert better than generic messaging.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Audit & Sector Mapping",
      description:
        "Full account audit, Pin Code-level competitor analysis, conversion tracking audit, and 90-day media plan with sector-level revenue targets.",
    },
    {
      step: "02",
      title: "Build & Launch",
      description:
        "Campaign structure with Pin Code-level ad sets, 5+ creative variations per ad set, sector-specific landing pages, conversion tracking — launched in 7 days.",
    },
    {
      step: "03",
      title: "Optimise & Scale",
      description:
        "Daily trading for first 30 days, weekly thereafter. Bid adjustments, audience refinement, creative rotation, landing page A/B tests, budget reallocation.",
    },
    {
      step: "04",
      title: "Report & Iterate",
      description:
        "Weekly performance report with sector-level breakdown, monthly business review with revenue attribution, quarterly strategy reset.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "3.5x average ROAS",
      description:
        "Higher than wider Delhi (3.2x) because Dwarka audiences are concentrated, easier to target by Pin Code, and convert at higher rates.",
    },
    {
      icon: "MapPin",
      title: "Sector-level lead tracking",
      description:
        "We track which sectors your leads come from — so you know if your Sector 12 ad spend is actually driving Sector 12 customers.",
    },
    {
      icon: "Phone",
      title: "Call + WhatsApp tracking",
      description:
        "Every call and WhatsApp chat from your ads is tracked, recorded, and fed back as an offline conversion — so we optimise for revenue.",
    },
    {
      icon: "Gauge",
      title: "Low CPAs in Dwarka",
      description:
        "Efficient cost-per-walk-in for Sector 12 restaurants, low CPL for clinics, optimised CPL for B2B services — benchmarks we hit consistently in Dwarka.",
    },
    {
      icon: "Layers",
      title: "Sector-specific landing pages",
      description:
        "Pin Code-specific landing pages convert better than generic messaging — included at no extra cost, hosted on our subdomains.",
    },
    {
      icon: "BarChart3",
      title: "Real-time Pin Code dashboards",
      description:
        "Looker Studio dashboards showing spend, ROAS, CPL, and revenue by sector. You see exactly which sectors are profitable.",
    },
  ],
  stats: [
    { value: 2000, suffix: "+", label: "Campaigns launched" },
    { value: 3.5, suffix: "x", label: "Average ROAS" },
    { value: 1500, suffix: "+", label: "Leads for Dwarka clinics" },
    { value: 4.9, suffix: "", label: "Client rating" },
  ],
  faqs: [
    {
      q: "How much do I need to spend on ads to see results in Dwarka?",
      a: "Minimum viable ad spend in Dwarka is ₹30,000/month for Search campaigns and ₹60,000/month for Meta — lower than wider Delhi because audiences are concentrated. Most Dwarka SME engagements start at ₹80,000 – ₹1,50,000/month in media spend, plus our management fee.",
    },
    {
      q: "How do you target Dwarka sectors specifically?",
      a: "Pin Code-level targeting. Each Dwarka sector has its own Pin Code (e.g., Sector 6 = 110075, Sector 12 = 110078). We build separate ad sets per Pin Code, with separate creative and separate landing pages. This is far more efficient than 'Delhi' or 'Dwarka' as a single audience.",
    },
    {
      q: "What is your management fee for paid ads?",
      a: "Flat retainer based on monthly ad spend tier — ₹25,000/month for spend up to ₹2 lakh, scaling to ₹80,000+/month for ₹10 lakh+ spend. We do not charge a percentage of media spend (that incentivises higher spend, not better performance).",
    },
    {
      q: "How long until I see results from paid ads in Dwarka?",
      a: "First conversions typically arrive within 5–10 days of launch (faster than wider Delhi due to audience concentration). Meaningful optimisation by day 21. Predictable ROAS by day 45. We do not recommend judging performance before day 21.",
    },
    {
      q: "Which ad platform is best for my Dwarka business?",
      a: "Depends on intent and audience. High-intent commercial queries: Google Search. Visual/consumer brands in Dwarka: Meta (Instagram). B2B services targeting Dwarka professionals: LinkedIn. Awareness for new launches: YouTube. We recommend after a free audit.",
    },
  ],
  relatedServices: [
    "social-media-dwarka",
    "seo-services-dwarka",
    "website-development-dwarka",
    "paid-ads-delhi",
  ],
};

const brandingDwarka: LocationServicePage = {
  slug: "branding-dwarka",
  location: "dwarka",
  locationLabel: "Dwarka",
  serviceKey: "branding",
  title: "Branding Services in Dwarka",
  h1: "Branding Services in Dwarka",
  targetKeyword: "branding services dwarka",
  icon: "Palette",
  heroSubtitle:
    "Distinctive brand identities built for Dwarka's residential sub-city market. Strategy, identity, voice, and rollout — locally relevant.",
  metaTitle:
    "Branding Services in Dwarka | Brand Identity Agency | SOCIAL VIENS",
  metaDescription:
    "Dwarka's branding agency. Strategy, identity, voice, and rollout for sub-city businesses. 15+ Dwarka brands launched. Free brand audit.",
  overviewTitle: "Brands built to stand out in Dwarka's tight community market",
  overviewText:
    "Dwarka is a tight-knit community market. Unlike wider Delhi — where customers are anonymous and brand loyalty is hard to build — Dwarka residents talk to each other. A Sector 12 family recommends their dentist to a Sector 21 family over WhatsApp. A boutique in Sector 6 survives on word-of-mouth from its first 100 loyal customers. A restaurant in Sector 21 lives or dies on whether its first 500 visitors become regulars. In this kind of market, branding is not a luxury — it is the foundation of trust, recognition, and word-of-mouth. Generic logos and templates will not earn the loyalty of Dwarka consumers. Our branding services in Dwarka are built for this community reality. We deliver complete brand systems: positioning strategy, narrative, visual identity, verbal identity (tone of voice, messaging frameworks, naming), brand guidelines, and rollout support — all calibrated for the Dwarka consumer's expectations and the sub-city's cultural context. Our process starts with deep discovery: stakeholder interviews, customer research (we interview actual Dwarka residents in target sectors), competitor audit (focussed on Dwarka competitors, not generic Delhi brands), and a positioning workshop where we identify the unique space your business can own in Dwarka's market. We use frameworks like the Brand Pyramid, Positioning Statement, and Category Edge to define exactly what makes you different — and credible — to Dwarka consumers. Visual identity follows. Our design team crafts logo systems, colour systems, typography, iconography, photographic direction, motion principles, and brand pattern systems. Every element is reviewed against the strategy — and against Dwarka's aesthetic expectations (which tend to favour clean, premium, slightly understated designs that signal quality without ostentation). Verbal identity is where we excel. We define your brand voice, write messaging frameworks for Dwarka-specific customer segments, craft taglines and value propositions, and create a brand lexicon. For Dwarka brands, we define Hinglish usage rules — Dwarka consumers respond to a mix of formal English and casual Hinglish, and getting the balance right matters. Brand guidelines are documented in a 50+ page brand book that becomes the source of truth for every team member, agency, and vendor. We deliver logo files, font licences, colour codes, icon libraries, templates, and usage examples — so the brand is applied consistently across web, social, print, signage, and packaging. Rollout support includes website redesign coordination, social media template creation, signage design for your Dwarka location, and team training. We have launched 15+ Dwarka brands across real estate, healthcare, retail, education, food, and professional services — from greenfield startups to rebrands of established sector businesses. Whether you are a Sector 12 clinic crafting a premium healthcare brand, a Sector 6 boutique building a fashion identity, or a Sector 21 restaurant creating a memorable F&B concept — our branding work gives you the foundation to win in Dwarka.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Dwarka market fluency",
      description:
        "We know what Dwarka residents respond to — premium but understated aesthetics, Hinglish tone, community-resonant messaging. Brands that feel local, not corporate.",
    },
    {
      icon: "Users",
      title: "Real customer research",
      description:
        "We do not guess. We interview actual Dwarka residents in your target sectors to understand what they value, what they distrust, and what makes them loyal.",
    },
    {
      icon: "Compass",
      title: "Strategy-first approach",
      description:
        "No design before positioning. We run discovery workshops, customer interviews, and competitive audits before a single logo concept is drawn.",
    },
    {
      icon: "PenTool",
      title: "Hinglish voice expertise",
      description:
        "Dwarka consumers respond to a mix of formal English and casual Hinglish. We define the balance and rules — a complete verbal identity, not just visuals.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "Stakeholder interviews, Dwarka customer research, competitor audit (Dwarka-focussed), positioning workshop. Deliverable: brand strategy document.",
    },
    {
      step: "02",
      title: "Visual Identity",
      description:
        "Logo concepts (3 directions), refinement, final logo system, colour palette, typography, iconography, photographic direction. Two revision rounds.",
    },
    {
      step: "03",
      title: "Verbal Identity",
      description:
        "Brand voice definition, messaging frameworks for Dwarka segments, tagline options, naming (if needed), Hinglish usage rules.",
    },
    {
      step: "04",
      title: "Guidelines & Rollout",
      description:
        "50+ page brand book, source files, templates for social/print/signage, rollout support across web, marketing, and team training.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "Premium positioning",
      description:
        "Strong brands command premium pricing. Dwarka clients report 20–30% price uplift after rebrand — accepted because the brand signals quality.",
    },
    {
      icon: "Users",
      title: "Word-of-mouth multiplier",
      description:
        "In Dwarka's tight community, strong branding makes word-of-mouth work harder. Residents recommend brands they recognise and trust.",
    },
    {
      icon: "Sparkles",
      title: "Stand out in your sector",
      description:
        "Dwarka sectors are dense with competitors. Distinctive branding is the cheapest way to differentiate — far cheaper than outspending on ads.",
    },
    {
      icon: "Layers",
      title: "Consistent touchpoints",
      description:
        "Brand guidelines ensure every touchpoint — web, social, print, signage, packaging — feels like one cohesive brand experience.",
    },
    {
      icon: "Award",
      title: "Team alignment",
      description:
        "A documented brand gives your Dwarka team a shared language and clear standards to execute against — consistent service, consistent messaging.",
    },
    {
      icon: "Heart",
      title: "Customer loyalty",
      description:
        "Brands build emotional connection. Repeat purchase rates lift 25–50% after a strategic rebrand — critical in Dwarka's repeat-business market.",
    },
  ],
  stats: [
    { value: 15, suffix: "+", label: "Dwarka brands launched" },
    { value: 25, suffix: "%", label: "Avg price uplift post-rebrand" },
    { value: 50, suffix: "+", label: "Pages in brand book" },
    { value: 100, suffix: "%", label: "Strategy-first projects" },
  ],
  faqs: [
    {
      q: "How much does branding cost in Dwarka?",
      a: "Our Dwarka branding engagements start at ₹1,00,000 for a startup identity package (logo, colours, type, basic guidelines) and scale to ₹5,00,000+ for full strategic rebrands. Most Dwarka SME brand projects land in the ₹1,50,000 – ₹3,50,000 range — slightly lower than wider Delhi due to scope differences.",
    },
    {
      q: "How long does a branding project take?",
      a: "6–10 weeks for a standard Dwarka brand identity project. 10–14 weeks for a full strategic rebrand with customer research and rollout. Discovery is weeks 1–2, visual identity weeks 3–5, verbal identity weeks 6–7, guidelines + rollout weeks 8–10.",
    },
    {
      q: "Do you research actual Dwarka customers before designing?",
      a: "Yes — we interview 5–10 actual Dwarka residents in your target sectors as part of discovery. We learn what they value, what they distrust, what brands they love and hate. This is critical in Dwarka's tight community market where word-of-mouth shapes perception fast.",
    },
    {
      q: "Can you rebrand my existing Dwarka business without losing customers?",
      a: "Yes — about 50% of our Dwarka work is rebrands. We audit your current brand equity (what to preserve), identify what to evolve, and craft a migration plan that does not alienate existing customers. We handle logo evolution, asset migration, and customer communication.",
    },
    {
      q: "Do you handle brand rollout — website, social, signage?",
      a: "Yes. We coordinate website redesign (in-house), social media template creation, marketing collateral design, signage design for your Dwarka location, and team training. You can also engage us for the identity only and roll out internally.",
    },
  ],
  relatedServices: [
    "website-development-dwarka",
    "social-media-dwarka",
    "google-business-profile-dwarka",
    "branding-delhi",
  ],
};

const googleBusinessProfileDwarka: LocationServicePage = {
  slug: "google-business-profile-dwarka",
  location: "dwarka",
  locationLabel: "Dwarka",
  serviceKey: "google-business-profile",
  title: "Google Business Profile in Dwarka",
  h1: "Google Business Profile in Dwarka",
  targetKeyword: "google business profile dwarka",
  icon: "MapPinned",
  heroSubtitle:
    "Own the Map Pack in your Dwarka sector. Sector-level optimisation, review flows, and geo-grid rank tracking for sub-city dominance.",
  metaTitle:
    "Google Business Profile in Dwarka | Local SEO & GMB | SOCIAL VIENS",
  metaDescription:
    "Dwarka's Google Business Profile agency. Sector-level Map Pack optimisation, review acquisition, geo-grid tracking. 44% local conversion. Free audit.",
  overviewTitle: "Win the Dwarka Map Pack — sector by sector",
  overviewText:
    "Dwarka is one of India's most Map-Pack-dependent markets. The 1 million residents of this sub-city use Google Maps on their phones for almost every local purchase decision — 'pharmacy near me', 'restaurant Sector 12 Dwarka', 'doctor Sector 6 Dwarka'. If your Google Business Profile is unverified, under-optimised, or review-poor, you are invisible to the highest-intent customers in your sector. Worse — your competitors are getting those customers instead. Our Google Business Profile services in Dwarka are built to put you in the top 3 of the Map Pack for every sector-relevant search — and keep you there, sector after sector. We do not 'set up your profile and walk away'. We treat GBP as a living, daily-managed channel — optimised, monitored, and grown week over week. Our Dwarka GBP practice covers six pillars: profile setup & verification, sector-level optimisation, review acquisition, Q&A management, post publishing, and geo-grid rank tracking. Setup & verification handles the basics right: NAP consistency across web and Dwarka citation sources (JustDial, IndiaMART, Sulekha), category selection (we use the GBP category audit tool to identify the highest-traffic categories for your Dwarka business), service area configuration by sector, hours, attributes, and product/service listings. For multi-sector Dwarka businesses (e.g., a clinic with patients from Sectors 6, 7, 11, 12, and 21), we build service-area pages and citation profiles for each sector. Optimisation is where most Dwarka businesses lose. We write keyword-rich business descriptions that mention your specific Dwarka sectors, upload 50+ geo-tagged photos (interior, exterior, team, products, before/after — shot in your actual sector location), add services with prices, add products with photos, configure attributes (women-led, LGBTQ+ friendly, outdoor seating, parking), and ensure every field is filled — Google rewards completeness. Review acquisition is engineered, not begged for. We deploy post-service SMS + WhatsApp + email review request flows (integrated with your CRM — critical in Dwarka where WhatsApp is the dominant communication channel), in-store QR code displays, and review response protocols (every review gets a thoughtful, brand-voice response within 24 hours). Dwarka clients see 25–60 new reviews per month within 90 days of launching these flows. Q&A management: we pre-seed the GBP Q&A section with 10–15 frequently asked questions (with brand-voice answers mentioning Dwarka relevance), monitor for new questions, and respond within 24 hours. Post publishing: weekly posts — offers, updates, events, products — that keep your profile active and surface in Google Discover for Dwarka users. Geo-grid rank tracking is the secret weapon. We track your Map Pack ranking sector-by-sector across Dwarka — every 500m grid in your service area — so you see exactly where you rank #1, #3, or off the map in each specific sector. This lets us target weak sectors with location-specific landing pages and citation building. We have moved Dwarka clinics from off-the-Map-Pack to top-3 in their target sectors in 45 days, restaurants to #1 in their sector, and professional services firms to consistent Map Pack dominance across all target sectors. In Dwarka's local search market, GBP is not optional — it is the single highest-ROI channel for any business that serves customers within a geographic area.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Sector-level targeting",
      description:
        "We track your Map Pack ranking by Dwarka sector — Sector 6 vs. Sector 12 vs. Sector 21 — and target weak sectors with hyper-local content and citations.",
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp review flows",
      description:
        "Dwarka consumers prefer WhatsApp over email or SMS. Our review request flows are WhatsApp-first — delivering 25–60 reviews per month within 90 days.",
    },
    {
      icon: "Clock",
      title: "24-hour response SLA",
      description:
        "Every review — including 1-star — gets a thoughtful, brand-voice response within 24 hours. Reviews are recovery opportunities, not threats.",
    },
    {
      icon: "BarChart3",
      title: "Sector-level geo-grid tracking",
      description:
        "Block-by-block Map Pack tracking across every 500m grid in your Dwarka service area. You see exactly where you rank #1 and where you need work.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Audit & Setup",
      description:
        "Profile audit (or fresh setup), verification, NAP consistency across Dwarka citations, category audit, competitor GBP benchmarking by sector.",
    },
    {
      step: "02",
      title: "Sector-Level Optimisation",
      description:
        "Every field filled, keyword-rich description mentioning sectors, 50+ geo-tagged photos, services/products with prices, attributes, service area by sector.",
    },
    {
      step: "03",
      title: "WhatsApp Review Engine",
      description:
        "Deploy WhatsApp-first review flows (with SMS + email backup), in-store QR displays, pre-seed Q&A with 10–15 FAQs, monitor and respond within 24 hours.",
    },
    {
      step: "04",
      title: "Posts & Sector Tracking",
      description:
        "Weekly post publishing, geo-grid rank tracking sector-by-sector, monthly performance review, ongoing optimisation focused on weak sectors.",
    },
  ],
  benefits: [
    {
      icon: "MapPinned",
      title: "Top-3 Map Pack in your sectors",
      description:
        "76% of local-search purchases go to the top 3 in the Map Pack. We get you there in 45–90 days, for your target Dwarka sectors.",
    },
    {
      icon: "TrendingUp",
      title: "44% conversion rate",
      description:
        "44% of local Google searches convert within 24 hours. Map Pack visibility is the highest-ROI channel for local Dwarka businesses.",
    },
    {
      icon: "MessageCircle",
      title: "25–60 reviews/month",
      description:
        "WhatsApp-first review flows deliver 25–60 new reviews per month within 90 days — without buying or incentivising, fully Google-compliant.",
    },
    {
      icon: "Phone",
      title: "More calls + directions",
      description:
        "Top-3 Map Pack positions see 3–5x more call/direction requests than positions 4–10. Direct revenue impact for your Dwarka business.",
    },
    {
      icon: "Layers",
      title: "Multi-sector management",
      description:
        "We manage GBP profiles for businesses serving multiple Dwarka sectors — each sector tracked and optimised individually.",
    },
    {
      icon: "BarChart3",
      title: "Sector-level reporting",
      description:
        "Geo-grid tracking shows your Map Pack position sector-by-sector across Dwarka. No more guessing where you rank.",
    },
  ],
  stats: [
    { value: 44, suffix: "%", label: "Local searches that convert" },
    { value: 3, suffix: "x", label: "More calls in top-3" },
    { value: 60, suffix: "+", label: "Reviews/month achievable" },
    { value: 45, suffix: " days", label: "To top-3 in target sectors" },
  ],
  faqs: [
    {
      q: "How much does Google Business Profile management cost in Dwarka?",
      a: "Our Dwarka GBP retainers start at ₹10,000/month for a single-sector business and scale to ₹35,000+/month for multi-sector businesses with active WhatsApp review flows and geo-grid tracking. Most single-sector Dwarka businesses land at ₹12,000 – ₹20,000/month — slightly lower than wider Delhi.",
    },
    {
      q: "How long until I see Map Pack ranking improvement in Dwarka?",
      a: "Optimisation is complete in 2 weeks. Map Pack movement typically starts in 21–30 days (faster than wider Delhi because sector-level keywords are less competitive). Top-3 placement for target sectors usually achieved in 45–90 days.",
    },
    {
      q: "How do you get more Google reviews from Dwarka customers?",
      a: "WhatsApp-first review request flows (Dwarka consumers prefer WhatsApp over email/SMS), in-store QR displays, post-service SMS/email backups, and review response protocols. We never pay for reviews or incentivise with discounts. 100% Google-compliant and sustainable.",
    },
    {
      q: "Can you help my business rank in the Map Pack for multiple Dwarka sectors?",
      a: "Yes — that is our specialty. We build service-area pages for each sector, configure your GBP to target multiple sectors, build sector-specific citations, and track your Map Pack ranking sector-by-sector. Most Dwarka businesses serve 3–8 sectors; we manage all of them.",
    },
    {
      q: "Do you respond to reviews on my behalf?",
      a: "Yes — within 24 hours, in your brand voice, including 1-star reviews (which we treat as recovery opportunities). You approve the response protocol upfront. We never post responses without your tone-of-voice guidelines being agreed.",
    },
  ],
  relatedServices: [
    "seo-services-dwarka",
    "website-development-dwarka",
    "branding-dwarka",
    "google-business-profile-delhi",
  ],
};

const appDevelopmentDwarka: LocationServicePage = {
  slug: "app-development-dwarka",
  location: "dwarka",
  locationLabel: "Dwarka",
  serviceKey: "app-development",
  title: "App Development in Dwarka",
  h1: "App Development in Dwarka",
  targetKeyword: "app development dwarka",
  icon: "Smartphone",
  heroSubtitle:
    "Native & cross-platform apps for Dwarka businesses. Built for sub-city consumers, sector-level features, and WhatsApp-first engagement.",
  metaTitle:
    "App Development in Dwarka | iOS, Android, React Native | SOCIAL VIENS",
  metaDescription:
    "Dwarka's mobile app development agency. Native iOS, Android, React Native, Flutter. 12+ apps shipped for Dwarka businesses. Free scope call.",
  overviewTitle: "Apps built for Dwarka's mobile-first consumers",
  overviewText:
    "Dwarka is one of India's most app-ready markets. The 1 million residents of this sub-city are predominantly middle-class, mobile-first, and have high smartphone adoption — but their app usage patterns differ from wider Delhi. They use apps for hyper-local services (grocery delivery within Dwarka, sector-specific pharmacy ordering, school bus tracking, RWA community engagement) where wider Delhi residents might use generic city-wide apps. For Dwarka-focussed businesses, a custom mobile app can be a powerful retention and revenue channel — if built correctly. Our app development in Dwarka is engineered for this sub-city reality. We do not build 'minimum viable products' that fall over at scale. We build production-grade apps from day one — with the architecture, performance, and observability needed to handle Dwarka's mobile network reality (intermittent 4G in lower sectors, background app kills on mid-range Android devices, low storage on budget phones). Our Dwarka app development practice covers four areas: native iOS (Swift), native Android (Kotlin), cross-platform (React Native and Flutter), and Progressive Web Apps (PWAs) for businesses that need app-like experiences without app store overhead. We pick the right technology based on your use case, budget, and team — not based on what we want to sell. Our process starts with a product discovery sprint: user research with actual Dwarka residents in your target sectors, competitive analysis (including 3 Dwarka/India competitor apps), feature prioritisation (MoSCoW), wireframes, and a product roadmap. We then move into UI/UX design — high-fidelity Figma prototypes that you can test on real Dwarka users before we write a single line of code. Development is in-house, no outsourcing: senior engineers with 5+ years of mobile experience, code reviews on every PR, automated testing on real devices (including mid-range Android phones that dominate Dwarka), and CI/CD pipelines that ship updates to TestFlight and Play Console daily. We integrate with the backends Dwarka businesses actually use: Firebase, AWS, Supabase, custom Node/Python services, Zoho, Razorpay, Stripe, WhatsApp Business API (essential for Dwarka consumers), and Google Maps with sector-level geofencing. We handle App Store and Play Store submission, review processes, and ongoing compliance — including India's DPDP Act requirements for data residency and consent. Post-launch, we offer maintenance retainers that include bug fixes, OS updates, performance monitoring (Crashlytics, Sentry), feature iterations, and quarterly business reviews. We have shipped 12+ apps for Dwarka businesses across e-commerce, healthcare, real estate, education, food delivery, and community services. Whether you are a Dwarka e-commerce brand needing a sector-aware delivery app, a healthcare chain building patient engagement, a real estate developer creating a property discovery app for Dwarka projects, or an RWA looking to build a community app for your sector — we have the depth to deliver. This is not 'we will build an MVP for you'. This is engineering partnership for the life of your product, calibrated for Dwarka's unique sub-city market.",
  whyChooseUs: [
    {
      icon: "MapPin",
      title: "Built for Dwarka's mobile reality",
      description:
        "Intermittent 4G in lower sectors, mid-range Android dominance, low storage on budget phones — we engineer for the conditions Dwarka users actually face.",
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp-first integration",
      description:
        "Dwarka consumers prefer WhatsApp for everything. Our apps integrate WhatsApp Business API for support, notifications, and order confirmations as standard.",
    },
    {
      icon: "Smartphone",
      title: "12+ Dwarka apps shipped",
      description:
        "We have shipped 12+ production apps for Dwarka businesses across e-commerce, healthcare, real estate, education, food delivery, and community services.",
    },
    {
      icon: "ShieldCheck",
      title: "DPDP Act compliant",
      description:
        "India's DPDP Act requires data residency, explicit consent, and user rights. We engineer for compliance from day one — not as an afterthought.",
    },
  ],
  processSteps: [
    {
      step: "01",
      title: "Product Discovery",
      description:
        "User research with actual Dwarka residents, competitive analysis (3 Dwarka/India apps), feature prioritisation (MoSCoW), wireframes, product roadmap.",
    },
    {
      step: "02",
      title: "UI/UX Design",
      description:
        "High-fidelity Figma prototypes, user testing on real Dwarka users, design system, motion specs. Two revision rounds.",
    },
    {
      step: "03",
      title: "Development & QA",
      description:
        "In-house dev (Swift/Kotlin/React Native/Flutter), code reviews, automated tests on mid-range Android, daily TestFlight/Play Console builds.",
    },
    {
      step: "04",
      title: "Launch & Maintain",
      description:
        "App Store + Play Store submission, review handling, post-launch monitoring (Crashlytics), bug fixes, OS updates, feature iterations.",
    },
  ],
  benefits: [
    {
      icon: "TrendingUp",
      title: "Built to scale",
      description:
        "Architecture that handles your first 1,000 Dwarka users and your first 100,000. No 'rebuild when we grow' tax.",
    },
    {
      icon: "Gauge",
      title: "Sub-2-second launches",
      description:
        "App cold-start under 2 seconds on mid-range Android devices (the dominant device class in Dwarka). Critical for retention.",
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp-first engagement",
      description:
        "WhatsApp Business API integration for support, notifications, and order confirmations — aligned with how Dwarka consumers actually communicate.",
    },
    {
      icon: "RefreshCw",
      title: "Offline-first",
      description:
        "Intermittent connectivity is common in Dwarka's lower sectors. We build offline-first with sync-on-reconnect, so users can browse and order without signal.",
    },
    {
      icon: "Bell",
      title: "Sector-aware notifications",
      description:
        "We design push notifications with sector-level segmentation — different messages for Sector 6 vs Sector 12 users based on context.",
    },
    {
      icon: "BarChart3",
      title: "Analytics & insights",
      description:
        "Firebase, Mixpanel, or Amplitude integrated — you see user flows, retention cohorts, and feature usage from day one.",
    },
  ],
  stats: [
    { value: 12, suffix: "+", label: "Dwarka apps shipped" },
    { value: 2, suffix: "s", label: "Avg cold-start time" },
    { value: 4.5, suffix: "★", label: "Avg app store rating" },
    { value: 250, suffix: "K+", label: "Dwarka users served" },
  ],
  faqs: [
    {
      q: "How much does app development cost in Dwarka?",
      a: "Our Dwarka app development projects start at ₹2,50,000 for an MVP with limited features and scale to ₹20,00,000+ for full-featured production apps with backend, admin panel, and integrations. Most Dwarka SME apps land in the ₹5,00,000 – ₹12,00,000 range. Fixed-quote proposal after discovery.",
    },
    {
      q: "How long does it take to build an app for my Dwarka business?",
      a: "8–14 weeks for an MVP. 14–20 weeks for a full-featured production app. Discovery is weeks 1–2, design weeks 3–5, development weeks 6–12, QA + store submission weeks 13–14. Slightly faster than wider Delhi because Dwarka-focussed apps tend to have tighter scope.",
    },
    {
      q: "Should I build native iOS/Android or cross-platform (React Native/Flutter)?",
      a: "Cross-platform (React Native or Flutter) is right for 80% of Dwarka SME apps — single codebase, faster shipping, lower cost. Native is right when you need maximum performance (gaming, AR/VR) or deep platform integrations. We recommend after discovery.",
    },
    {
      q: "Do you integrate WhatsApp Business API for Dwarka consumers?",
      a: "Yes — WhatsApp Business API integration is included as standard on every Dwarka app we build. Critical because Dwarka consumers prefer WhatsApp over phone calls or in-app chat for support, notifications, and order confirmations.",
    },
    {
      q: "Do you handle App Store and Play Store submission?",
      a: "Yes — included in every project. We handle store listings, screenshots, metadata, submission, review handling, and re-submission if rejected. 100% approval rate (after revisions) across our Dwarka portfolio.",
    },
  ],
  relatedServices: [
    "website-development-dwarka",
    "seo-services-dwarka",
    "branding-dwarka",
    "app-development-delhi",
  ],
};

/* ====================================================================== */
/*  EXPORTED ARRAY + HELPERS                                              */
/* ====================================================================== */

export const locationPages: LocationServicePage[] = [
  websiteDevelopmentDelhi,
  seoServicesDelhi,
  socialMediaDelhi,
  paidAdsDelhi,
  brandingDelhi,
  googleBusinessProfileDelhi,
  appDevelopmentDelhi,
  websiteDevelopmentDwarka,
  seoServicesDwarka,
  socialMediaDwarka,
  paidAdsDwarka,
  brandingDwarka,
  googleBusinessProfileDwarka,
  appDevelopmentDwarka,
];

export function getLocationBySlug(
  slug: string,
): LocationServicePage | undefined {
  return locationPages.find((p) => p.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locationPages.map((p) => p.slug);
}

export function getLocationsByLocation(
  location: LocationKey,
): LocationServicePage[] {
  return locationPages.filter((p) => p.location === location);
}

export function getSiblingService(
  serviceKey: string,
  location: LocationKey,
): LocationServicePage | undefined {
  return locationPages.find(
    (p) => p.serviceKey === serviceKey && p.location === location,
  );
}
